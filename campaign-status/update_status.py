#!/usr/bin/env python3
"""Refresh Paige's A2P campaign tracker from Twilio (read-only)."""

from __future__ import annotations

import base64
import json
import os
import re
import urllib.error
import urllib.parse
import urllib.request
from collections import Counter
from concurrent.futures import ThreadPoolExecutor, as_completed
from datetime import datetime, timezone
from pathlib import Path


ROOT = Path(__file__).resolve().parent
SOURCE_PATH = Path(os.environ.get("CAMPAIGN_SOURCE_PATH", ROOT / "campaigns-source.json"))
OXP_SOURCE_PATH = Path(
    os.environ.get("OXP_CLIENT_SOURCE_PATH", ROOT / "oxp-clients-source.json")
)
OUTPUT_PATH = Path(os.environ.get("CAMPAIGN_OUTPUT_PATH", ROOT / "data.json"))
MASTER_SID = os.environ["TWILIO_ACCOUNT_SID"]
MASTER_TOKEN = os.environ["TWILIO_AUTH_TOKEN"]


def normalize_name(value: str) -> str:
    value = value.casefold().replace("&", " and ")
    return " ".join(re.sub(r"[^a-z0-9]+", " ", value).split())


def request_json(url: str, sid: str, token: str, params: dict | None = None) -> dict:
    if params:
        url = f"{url}?{urllib.parse.urlencode(params)}"
    auth = base64.b64encode(f"{sid}:{token}".encode()).decode()
    request = urllib.request.Request(
        url,
        headers={"Authorization": f"Basic {auth}", "Accept": "application/json"},
    )
    try:
        with urllib.request.urlopen(request, timeout=40) as response:
            return json.load(response)
    except urllib.error.HTTPError as error:
        if error.code in {404, 422}:
            return {}
        raise


def paged(url: str, key: str, sid: str, token: str) -> list[dict]:
    rows: list[dict] = []
    params: dict | None = {"PageSize": 1000}
    while url:
        data = request_json(url, sid, token, params)
        rows.extend(data.get(key, []))
        next_url = data.get("next_page_uri") or data.get("meta", {}).get("next_page_url")
        if next_url and next_url.startswith("/"):
            next_url = f"https://api.twilio.com{next_url}"
        url = next_url
        params = None
    return rows


def subaccount_auth(account_sid: str) -> tuple[str, str]:
    account = request_json(
        f"https://api.twilio.com/2010-04-01/Accounts/{account_sid}.json",
        MASTER_SID,
        MASTER_TOKEN,
    )
    return account_sid, account["auth_token"]


def fetch_inventory(item: tuple[str, dict]) -> tuple[str, tuple[str, str], list[dict]]:
    cid, account = item
    auth = subaccount_auth(account["sid"])
    services = paged(
        "https://messaging.twilio.com/v1/Services",
        "services",
        *auth,
    )
    return cid, auth, services


def main() -> None:
    source = json.loads(SOURCE_PATH.read_text())
    oxp_source = json.loads(OXP_SOURCE_PATH.read_text())
    rows = source["rows"]
    tracked = [
        {
            **row,
            "cohortOrigins": ["Original property cohort"],
            "notOnOriginalMigration": False,
        }
        for row in rows
        if row["paigeStatus"] in {"Pending", "Approved", "Failed"}
    ]
    tracked_source_rows = [
        row
        for row in rows
        if row["paigeStatus"] in {"Pending", "Approved", "Failed"}
    ]
    excluded = [row for row in rows if row not in tracked_source_rows]

    cid_by_company = {
        normalize_name(row["company"]): row["cid"]
        for row in rows
    }
    overrides = oxp_source.get("clientCidOverrides", {})
    migration_names = {
        normalize_name(name)
        for name in oxp_source.get("originalMigrationClients", [])
    }
    oxp_clients = oxp_source["clients"]
    oxp_mappings = {
        client: cid_by_company.get(normalize_name(client)) or overrides.get(client)
        for client in oxp_clients
    }

    accounts = paged(
        "https://api.twilio.com/2010-04-01/Accounts.json",
        "accounts",
        MASTER_SID,
        MASTER_TOKEN,
    )
    account_by_cid = {}
    for account in accounts:
        match = re.search(r"Entrata_Subaccount_(\d+)", account.get("friendly_name") or "")
        if match:
            account_by_cid[match.group(1)] = account

    target_cids = sorted(
        {row["cid"] for row in tracked}
        | {cid for cid in oxp_mappings.values() if cid}
    )
    inventories: dict[str, list[dict]] = {}
    auth_by_cid: dict[str, tuple[str, str]] = {}
    scan_errors: list[dict] = []

    with ThreadPoolExecutor(max_workers=18) as pool:
        futures = {
            pool.submit(fetch_inventory, (cid, account_by_cid[cid])): cid
            for cid in target_cids
            if cid in account_by_cid
        }
        for future in as_completed(futures):
            cid = futures[future]
            try:
                resolved_cid, auth, services = future.result()
                auth_by_cid[resolved_cid] = auth
                inventories[resolved_cid] = services
            except Exception as error:
                scan_errors.append({"cid": cid, "error": str(error)})

    tracked_by_key = {
        (row["cid"], row["propertyId"]): row
        for row in tracked
    }
    for client, cid in oxp_mappings.items():
        if not cid or cid not in inventories:
            continue
        not_on_original = normalize_name(client) not in migration_names
        for service in inventories[cid]:
            match = re.fullmatch(
                rf"Entrata_{re.escape(cid)}_(\d+)",
                service.get("friendly_name") or "",
            )
            if not match:
                continue
            property_id = match.group(1)
            key = (cid, property_id)
            existing = tracked_by_key.get(key)
            if existing:
                if "OXP submitted client list" not in existing["cohortOrigins"]:
                    existing["cohortOrigins"].append("OXP submitted client list")
                existing["notOnOriginalMigration"] = not_on_original
                continue
            row = {
                "company": client,
                "cid": cid,
                "property": f"Property {property_id}",
                "propertyId": property_id,
                "paigeStatus": oxp_source["status"],
                "sourceDisposition": "client_level_expansion",
                "cohortOrigins": ["OXP submitted client list"],
                "notOnOriginalMigration": not_on_original,
            }
            tracked.append(row)
            tracked_by_key[key] = row

    def check(row: dict) -> dict:
        cid = row["cid"]
        result = {**row}
        services = inventories.get(cid, [])
        expected_name = f"Entrata_{cid}_{row['propertyId']}"
        exact = [
            service
            for service in services
            if (service.get("friendly_name") or "") == expected_name
        ]
        candidates = exact
        if not candidates:
            return {**result, "liveStatus": "SERVICE_NOT_FOUND", "submitted": False}

        service = max(candidates, key=lambda value: value.get("date_created") or "")
        result.update(
            {
                "serviceName": service.get("friendly_name"),
                "serviceCreated": service.get("date_created"),
            }
        )
        try:
            auth = auth_by_cid[cid]
            compliance = request_json(
                f"https://messaging.twilio.com/v1/Services/{service['sid']}/Compliance/Usa2p",
                *auth,
                params={"PageSize": 50},
            ).get("compliance", [])
            if not compliance:
                return {**result, "liveStatus": "NO_CAMPAIGN", "submitted": False}
            campaign = max(
                compliance,
                key=lambda value: value.get("date_updated")
                or value.get("date_created")
                or "",
            )
            errors = []
            for error in campaign.get("errors") or []:
                if isinstance(error, dict):
                    errors.append(
                        {
                            "code": error.get("error_code"),
                            "description": error.get("description"),
                        }
                    )
                else:
                    errors.append({"code": error})
            return {
                **result,
                "submitted": True,
                "liveStatus": campaign.get("campaign_status") or "UNKNOWN",
                "tcrCampaignId": campaign.get("campaign_id"),
                "dateCreated": campaign.get("date_created"),
                "dateUpdated": campaign.get("date_updated"),
                "errors": errors,
            }
        except Exception as error:
            return {**result, "liveStatus": "LOOKUP_ERROR", "error": str(error)}

    campaigns: list[dict] = []
    with ThreadPoolExecutor(max_workers=30) as pool:
        futures = [pool.submit(check, row) for row in tracked]
        for future in as_completed(futures):
            campaigns.append(future.result())

    campaigns.sort(key=lambda row: (row["company"].lower(), row["property"].lower()))
    excluded.sort(key=lambda row: (row["company"].lower(), row["property"].lower()))
    summary = Counter(row["liveStatus"] for row in campaigns)
    unmapped_clients = []
    for client, cid in oxp_mappings.items():
        if not cid:
            unmapped_clients.append(
                {"company": client, "reason": "No confident CID match"}
            )
        elif cid not in account_by_cid:
            unmapped_clients.append(
                {"company": client, "cid": cid, "reason": "Twilio subaccount not found"}
            )
    output = {
        "generatedAt": datetime.now(timezone.utc).isoformat(),
        "sourceWorkbook": "Campaign Reistration Draft + Eli+ OXP Reconciliation",
        "sourceTab": source["sourceTab"],
        "sourceGid": source["sourceGid"],
        "cohortDefinition": (
            "Original property cohort union OXP Submitted clients from Paige's reconciliation"
        ),
        "total": len(campaigns),
        "originalPropertyCount": len(tracked_source_rows),
        "oxpClientCount": len(oxp_clients),
        "oxpClientsAlreadyInOriginalCohort": sum(
            normalize_name(client) in cid_by_company
            for client in oxp_clients
        ),
        "oxpNetNewClientCount": sum(
            normalize_name(client) not in cid_by_company
            for client in oxp_clients
        ),
        "oxpNotOnOriginalMigrationCount": sum(
            normalize_name(client) not in migration_names
            for client in oxp_clients
        ),
        "oxpMappedClientCount": len(oxp_clients) - len(unmapped_clients),
        "oxpAddedPropertyCount": sum(
            "OXP submitted client list" in row["cohortOrigins"]
            and "Original property cohort" not in row["cohortOrigins"]
            for row in campaigns
        ),
        "unmappedClients": unmapped_clients,
        "excludedCount": len(excluded),
        "summary": dict(summary),
        "scanErrors": scan_errors,
        "campaigns": campaigns,
        "excluded": excluded,
    }
    OUTPUT_PATH.write_text(json.dumps(output, indent=2) + "\n")
    print(f"Updated {OUTPUT_PATH}: {dict(summary)}")


if __name__ == "__main__":
    main()
