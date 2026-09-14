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
OUTPUT_PATH = Path(os.environ.get("CAMPAIGN_OUTPUT_PATH", ROOT / "data.json"))
MASTER_SID = os.environ["TWILIO_ACCOUNT_SID"]
MASTER_TOKEN = os.environ["TWILIO_AUTH_TOKEN"]


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
    rows = source["rows"]
    tracked = [
        row
        for row in rows
        if row["paigeStatus"] in {"Pending", "Approved", "Failed"}
    ]
    excluded = [row for row in rows if row not in tracked]

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

    target_cids = sorted({row["cid"] for row in tracked})
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
    output = {
        "generatedAt": datetime.now(timezone.utc).isoformat(),
        "sourceWorkbook": "Campaign Reistration Draft",
        "sourceTab": source["sourceTab"],
        "sourceGid": source["sourceGid"],
        "cohortDefinition": (
            "Rows Paige marked Pending, Approved, or Failed in column B"
        ),
        "total": len(campaigns),
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
