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

TEMPLATE_A_MARKER = "will be live post campaign approval"
COPY_ERROR_CODES = {30886, 30893, 30896, 30909, 30917}


def first_website(message_flow: str | None) -> str:
    match = re.search(r"https?://[^\s)\"]+", message_flow or "")
    return match.group(0).rstrip(".,") if match else "the website named in the submission"


def action_for_campaign(campaign: dict, company: str) -> dict:
    """Translate carrier failures into a short owner/action plus expandable detail."""
    status = (campaign.get("campaign_status") or "UNKNOWN").upper()
    if status in {"IN_PROGRESS", "PENDING", "PENDING_REVIEW"}:
        return {
            "actionCategory": "Twilio/Carrier — waiting",
            "actionOwner": "Twilio/Carrier",
            "actionItem": "Nothing to do — carrier review is still in progress.",
            "actionDetail": (
                "No correction is requested. The registration has been submitted and is waiting "
                "for the mobile carriers' reviewer. Do not resubmit or edit it while review is open."
            ),
        }
    if status != "FAILED":
        return {}

    errors = campaign.get("errors") or []
    codes = {
        int(error.get("error_code"))
        for error in errors
        if isinstance(error, dict) and error.get("error_code")
    }
    website = first_website(campaign.get("message_flow"))

    if company == "Advanced Management Group" and 30891 in codes:
        detail = (
            "Entrata registered AMG's company website as https://www.amgnevada.com, which the "
            "reviewer could not open because its security certificate does not cover that address. "
            "Correct the registered company-website field to https://amgnevada.com. For rows also "
            "showing a sign-up rejection, compare the public form with the submitted sign-up "
            "description and remove any claim about a phone field or consent checkbox that is not "
            "actually visible. Follow the approved-template change process, then resubmit for a new "
            "carrier review. The tracker data does not provide a reliable review-time estimate."
        )
        return {
            "actionCategory": "Entrata — wrong URL registered",
            "actionOwner": "Entrata",
            "actionItem": "Correct AMG website to https://amgnevada.com; verify the sign-up claim; resubmit.",
            "actionDetail": detail,
        }

    if company == "Aztex Management Group" and 30891 in codes:
        detail = (
            "Entrata registered https://www/aztexmgmt.com with a slash where the dot after 'www' "
            "should be, so the reviewer reached no website. Correct the registered company-website "
            "field to https://aztexmgmt.com. Aztex must also publish public Privacy Policy and Terms "
            "pages that cover text messaging before approval is likely. Brownstone additionally has "
            "rejected example messages: the approved-template owner must replace bracketed "
            "fill-in-the-blank text with realistic examples. After all applicable fixes, Entrata "
            "resubmits for carrier review. The tracker data does not provide a reliable review-time estimate."
        )
        return {
            "actionCategory": "Entrata — wrong URL registered",
            "actionOwner": "Entrata + client",
            "actionItem": "Fix Aztex URL typo; client publishes Privacy + Terms pages; then resubmit.",
            "actionDetail": detail,
        }

    if company == "Greystar Student Living" and 30908 in codes:
        return {
            "actionCategory": "Entrata — website publishing",
            "actionOwner": "Entrata",
            "actionItem": "Publish Greystar's existing privacy policy on Tropicana's public site; resubmit.",
            "actionDetail": (
                "The reviewer opened Tropicana's privacy-policy page expecting a real policy and found "
                "placeholder content. Greystar already has a public policy at https://www.greystar.com/privacy. "
                "Entrata should replace the placeholder with that approved policy or a working link to it, "
                "remove the broken /privacy/us-policy link, confirm the page opens without a login, and then "
                "resubmit for carrier review."
            ),
        }

    if 30921 in codes:
        return {
            "actionCategory": "Client — website",
            "actionOwner": "Client",
            "actionItem": "Client must make its company website publicly viewable without a password.",
            "actionDetail": (
                "Please publish a company page that anyone can open without a username or password. "
                "The page must show your legal business name, physical address, phone number, business "
                "email, and a link to your privacy policy. The carrier reviewer reached a login screen "
                "instead of public business information, so it could not verify the company. Send Paige "
                "or Brandon the public URL once it is live; Entrata will then resubmit it for carrier review."
            ),
        }

    if 30908 in codes:
        return {
            "actionCategory": "Client — website",
            "actionOwner": "Client",
            "actionItem": "Client must publish a complete, public text-messaging privacy policy.",
            "actionDetail": (
                f"Please publish a Privacy Policy page linked from {website} that opens without a login. "
                "It must explain what personal information is collected, how phone numbers are used for "
                "text messages, that mobile information is not sold or shared with third parties for "
                "marketing, expected message frequency, how to stop messages by replying STOP, how to get "
                "help, and how to contact your company. The reviewer could not find a compliant policy. "
                "Send Paige or Brandon the final public URL; Entrata will verify it and resubmit for review."
            ),
        }

    if 30882 in codes:
        return {
            "actionCategory": "Client — website",
            "actionOwner": "Client",
            "actionItem": "Client must publish public text-messaging Terms & Conditions.",
            "actionDetail": (
                f"Please publish a Terms & Conditions page linked from {website} that opens without a login. "
                "It must name the company sending texts, describe the messages, state expected frequency, "
                "say that message and data rates may apply, explain HELP and STOP, and link to the Privacy "
                "Policy. The reviewer looked for these terms and could not verify them. Send Paige or Brandon "
                "the final public URL; Entrata will verify it and resubmit for carrier review."
            ),
        }

    if 30907 in codes or 30922 in codes or 30891 in codes:
        return {
            "actionCategory": "Unknown — needs triage",
            "actionOwner": "Entrata",
            "actionItem": "Compare the submitted website with the registered business; correct the mismatch.",
            "actionDetail": (
                f"The reviewer checked {website} against the legal business registered for messaging and "
                "could not validate that they belong together. Entrata must open the submitted site, compare "
                "its business name and domain with the registered legal company, and check the exact website "
                "stored in the business profile. If the submitted URL is wrong, replace it with the correct "
                "public property URL; if the business profile is wrong, correct that profile through the "
                "approved support path. The rejection does not identify which value is wrong, so do not guess. "
                "After the values match and the site is public, resubmit for carrier review."
            ),
        }

    if codes & COPY_ERROR_CODES:
        parts = []
        if 30893 in codes:
            parts.append("replace bracketed placeholders in both example texts with realistic names and details")
        if 30886 in codes:
            parts.append("rewrite the submitted purpose so it plainly names the property and the messages sent")
        if 30917 in codes:
            parts.append("describe every sign-up route separately, including the exact consent shown in each")
        if 30896 in codes or 30909 in codes:
            parts.append(
                f"compare the public sign-up form at {website} with the submitted description and describe only what is visible"
            )
        instruction = "; ".join(parts) or "review the rejected submission fields"
        return {
            "actionCategory": "Entrata — template/copy",
            "actionOwner": "Entrata",
            "actionItem": "Correct the rejected submission text to match the live sign-up experience; resubmit.",
            "actionDetail": (
                f"The reviewer expected our submitted wording and examples to match a real, public customer "
                f"sign-up experience and rejected the content. Entrata must {instruction}. Do not edit the "
                "locked template ad hoc: document the mismatch, obtain the approved-template owner's change, "
                "apply it consistently, and then resubmit for carrier review. The tracker data does not "
                "provide a reliable review-time estimate."
            ),
        }

    return {
        "actionCategory": "Unknown — needs triage",
        "actionOwner": "Entrata",
        "actionItem": "Needs triage — inspect the carrier's rejected fields before changing anything.",
        "actionDetail": (
            "The available rejection does not identify a safe correction. Entrata must open the read-only "
            "carrier record, note every rejected field, compare each value with the public website and "
            "registered business, and document the exact mismatch before choosing a fix. Do not guess or resubmit unchanged."
        ),
    }


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
            action = action_for_campaign(campaign, row["company"])
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
                "usesTemplateA": TEMPLATE_A_MARKER in (campaign.get("message_flow") or "").lower(),
                **action,
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
    failed = [row for row in campaigns if row["liveStatus"] == "FAILED"]
    failure_action_summary = Counter(
        row.get("actionCategory", "Unknown — needs triage") for row in failed
    )
    template_a_failed = [row for row in failed if row.get("usesTemplateA")]
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
        "failureActionSummary": dict(failure_action_summary),
        "templateAVerdict": {
            "failedUsingTemplateA": len(template_a_failed),
            "knownWebsiteOrUrlPrimary": sum(
                row.get("actionCategory")
                in {
                    "Client — website",
                    "Entrata — website publishing",
                    "Entrata — wrong URL registered",
                }
                for row in template_a_failed
            ),
            "needsUrlTriage": sum(
                row.get("actionCategory") == "Unknown — needs triage"
                for row in template_a_failed
            ),
            "contentErrorRows": sum(
                any(
                    int(error.get("code")) in COPY_ERROR_CODES
                    for error in row.get("errors", [])
                    if error.get("code")
                )
                for row in template_a_failed
            ),
        },
        "scanErrors": scan_errors,
        "campaigns": campaigns,
        "excluded": excluded,
    }
    OUTPUT_PATH.write_text(json.dumps(output, indent=2) + "\n")
    print(f"Updated {OUTPUT_PATH}: {dict(summary)}")


if __name__ == "__main__":
    main()
