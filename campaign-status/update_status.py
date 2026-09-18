#!/usr/bin/env python3
"""Refresh Paige's A2P campaign tracker from Twilio (read-only)."""

from __future__ import annotations

import base64
import json
import os
import re
import sys
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
# Measured, per-CID results of rendering every submitted website and reading its privacy
# policy. Without this the tracker inferred "client must publish a policy" from the carrier
# code alone and told clients to publish pages that were already live.
EVIDENCE_PATH = Path(os.environ.get("WEBSITE_EVIDENCE_PATH", ROOT / "website-evidence.json"))
WEBSITE_EVIDENCE = (
    json.loads(EVIDENCE_PATH.read_text()) if EVIDENCE_PATH.exists() else {}
)
OUTPUT_PATH = Path(os.environ.get("CAMPAIGN_OUTPUT_PATH", ROOT / "data.json"))
MASTER_SID = os.environ["TWILIO_ACCOUNT_SID"]
MASTER_TOKEN = os.environ["TWILIO_AUTH_TOKEN"]

TEMPLATE_A_MARKER = "will be live post campaign approval"
COPY_ERROR_CODES = {30886, 30893, 30896, 30909, 30917}
CLIENT_BLOCKER_CODES = {30882, 30908, 30919, 30921}
TRIAGE_CODES = {30880, 30891, 30907, 30922}
KNOWN_BRAND_RECORD_FIXES = {
    "Advanced Management Group": {
        "registeredUrl": "https://www.amgnevada.com",
        "correctedUrl": "https://amgnevada.com",
        "remainingBlocker": (
            "The corrected site loads and exposes a Privacy Policy, but no public Terms page was "
            "found; affected property sites also need their claimed opt-in controls verified."
        ),
    },
    "Aztex Management Group": {
        "registeredUrl": "https://www/aztexmgmt.com",
        "correctedUrl": "https://aztexmgmt.com",
        "remainingBlocker": (
            "The corrected site loads, but no public Privacy Policy or Terms page was found."
        ),
    },
}

BUCKET_LABELS = {
    "fix_confident": "Fix now, high confidence",
    "fix_will_still_fail": "Fix now, but will still fail",
    "client_blocked": "Blocked on client",
    "needs_triage": "Needs triage",
}


def confidence_bucket(campaign: dict, company: str) -> dict:
    """Classify failures by approval confidence, not by nominal action owner."""
    codes = {
        int(error.get("error_code"))
        for error in campaign.get("errors") or []
        if isinstance(error, dict) and error.get("error_code")
    }
    if company in KNOWN_BRAND_RECORD_FIXES:
        bucket = "fix_will_still_fail"
        detail = (
            "Entrata can correct the registered brand URL, but the empirically tested replacement "
            "still lacks required public evidence. Do not expect re-review to pass after that fix alone."
        )
    elif codes & CLIENT_BLOCKER_CODES:
        bucket = "client_blocked"
        detail = (
            "The carrier found a defect in the client's public website: access, business information, "
            "Privacy Policy, or Terms. Nothing changed only in Twilio can make that evidence valid."
        )
    elif codes & TRIAGE_CODES:
        bucket = "needs_triage"
        detail = (
            "The rejection does not prove whether the registered value, submitted URL, or public site "
            "is wrong. Compare all three before assigning or resubmitting."
        )
    else:
        bucket = "fix_will_still_fail"
        detail = (
            "Entrata can correct rejected submission text, but the live target did not pass the full "
            "HTTPS + Privacy + Terms + claimed opt-in-control verification. Fixing copy alone is unsafe."
        )
    return {
        "confidenceBucket": bucket,
        "confidenceBucketLabel": BUCKET_LABELS[bucket],
        "confidenceBucketDetail": detail,
    }


def first_website(message_flow: str | None) -> str:
    match = re.search(r"https?://[^\s)\"]+", message_flow or "")
    return match.group(0).rstrip(".,") if match else "the website named in the submission"


def evidence_action(cid: str, codes: set[int]) -> dict:
    """Prefer measured website evidence over inferring the fix from the carrier code.

    Every site we rendered for these CIDs loaded publicly with a reachable privacy policy,
    so "publish a privacy policy" and "make the site public" are both wrong. What the
    policies lack is the mobile/SMS disclosure block that A2P review requires.
    """
    ev = WEBSITE_EVIDENCE.get(cid)
    if not ev:
        return {}
    tested = ev.get("sitesTested") or 0
    if not tested or ev.get("sitesPubliclyReachable") != tested:
        return {}
    missing = ev.get("privacyMissingSmsClause") or 0
    reachable = ev.get("sitesWithReachablePrivacy") or 0

    if 30921 in codes:
        return {
            "actionCategory": "Carrier — contradicted by evidence",
            "actionOwner": "Entrata (challenge with Twilio)",
            "actionItem": "Do not send this to the client — the site is public. Challenge the rejection with Twilio.",
            "actionDetail": (
                f"The carrier rejected this as 'website requires authentication', but all "
                f"{tested} submitted sites for this client were rendered on {ev['testedAt']} and "
                "every one loaded publicly with no login and a reachable privacy policy. The "
                "rejection does not match the live site, so asking the client to unlock a website "
                "that is already public will not resolve it. Open a Twilio support case with the "
                "campaign SID and the rendered evidence, and separately add the mobile/SMS "
                "disclosure block to the privacy policy, which is the one real gap we measured."
            ),
            "evidence": ev,
        }

    if codes & {30908, 30882, 30919, 30922, 30891} and reachable and missing:
        return {
            "actionCategory": "Client — privacy policy wording",
            "actionOwner": "Client (wording change only)",
            "actionItem": "Policy is already published — it needs the text-messaging paragraph added.",
            "actionDetail": (
                f"Tested on {ev['testedAt']}: all {tested} submitted sites loaded publicly and "
                f"{reachable} had a reachable privacy policy, so the client does NOT need to "
                f"publish a policy or unlock a website. However {missing} of those policies "
                "contain no text-messaging language at all. A2P review requires the policy to "
                "state that mobile phone numbers are collected for text messages, that mobile "
                "information is not sold or shared with third parties for marketing, the expected "
                "message frequency, and that STOP ends messages and HELP gets help. Ask the client "
                "to add that paragraph to the policy they already have."
                + (
                    f" Note: {ev['privacyPdfOnly']} of these policies are PDFs; reviewers prefer an "
                    "HTML page, so publishing it as a web page reduces the chance of another rejection."
                    if ev.get("privacyPdfOnly")
                    else ""
                )
            ),
            "evidence": ev,
        }
    return {}


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

    # Measured evidence wins over code-based inference.
    measured = evidence_action(campaign.get("_cid", ""), codes)
    if measured:
        return measured

    if company == "Advanced Management Group" and 30891 in codes:
        detail = (
            "Entrata registered AMG's company website as https://www.amgnevada.com, which the "
            "reviewer could not open because its security certificate does not cover that address. "
            "Correct the registered company-website field to https://amgnevada.com for accuracy, but "
            "do not resubmit yet: the corrected site has a public Privacy Policy but no public Terms "
            "page. For rows also "
            "showing a sign-up rejection, compare the public form with the submitted sign-up "
            "description and remove any claim about a phone field or consent checkbox that is not "
            "actually visible. The client must publish the missing website evidence before re-review "
            "is likely to pass."
        )
        return {
            "actionCategory": "Entrata — wrong URL registered",
            "actionOwner": "Entrata + client",
            "actionItem": "Fix AMG's URL for accuracy; client website work is still required before resubmission.",
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
    freeze_path = ROOT / "freeze.json"
    if freeze_path.exists() and os.environ.get("CAMPAIGN_TRACKER_UNFREEZE") != "1":
        freeze = json.loads(freeze_path.read_text())
        if freeze.get("frozen"):
            print(
                "FROZEN: refusing to refresh or add campaigns. "
                "Brandon must ask to add campaigns, then set CAMPAIGN_TRACKER_UNFREEZE=1."
            )
            sys.exit(0)
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

    # Clients under active A2P remediation that are on neither source list. Without these
    # the tracker silently reported zero rows for them (RISE had 12 live campaigns).
    extra_clients = oxp_source.get("additionalTrackedClients", {})
    client_mappings = dict(oxp_mappings)
    client_origin = {client: "OXP submitted client list" for client in oxp_clients}
    client_status = {client: oxp_source["status"] for client in oxp_clients}
    for client, meta in extra_clients.items():
        client_mappings[client] = meta["cid"]
        client_origin[client] = meta.get("origin", "Active remediation list")
        client_status[client] = meta.get("status", "Active remediation")

    accounts = paged(
        "https://api.twilio.com/2010-04-01/Accounts.json",
        "accounts",
        MASTER_SID,
        MASTER_TOKEN,
    )
    # A CID can have several subaccounts with the identical Entrata_Subaccount_{cid}
    # friendly name (Green Alpha/102127 has seven). Last-wins picked an empty shell and
    # made the client vanish from the tracker, so keep every candidate and resolve later.
    accounts_by_cid: dict[str, list[dict]] = {}
    for account in accounts:
        match = re.search(r"Entrata_Subaccount_(\d+)", account.get("friendly_name") or "")
        if match:
            accounts_by_cid.setdefault(match.group(1), []).append(account)

    target_cids = sorted(
        {row["cid"] for row in tracked}
        | {cid for cid in client_mappings.values() if cid}
    )
    inventories: dict[str, list[dict]] = {}
    auth_by_cid: dict[str, tuple[str, str]] = {}
    scan_errors: list[dict] = []

    duplicate_subaccounts: list[dict] = []
    with ThreadPoolExecutor(max_workers=18) as pool:
        futures = {}
        for cid in target_cids:
            for account in accounts_by_cid.get(cid, []):
                futures[pool.submit(fetch_inventory, (cid, account))] = cid
        per_cid: dict[str, list[tuple[tuple[str, str], list[dict]]]] = {}
        for future in as_completed(futures):
            cid = futures[future]
            try:
                resolved_cid, auth, services = future.result()
                per_cid.setdefault(resolved_cid, []).append((auth, services))
            except Exception as error:
                scan_errors.append({"cid": cid, "error": str(error)})

    # Prefer the subaccount that actually holds messaging services.
    for cid, results in per_cid.items():
        auth, services = max(results, key=lambda pair: len(pair[1]))
        auth_by_cid[cid] = auth
        inventories[cid] = services
        if len(results) > 1:
            duplicate_subaccounts.append(
                {
                    # Deliberately no account SID: this file is published publicly.
                    "cid": cid,
                    "subaccountCount": len(results),
                    "serviceCount": len(services),
                    "allEmpty": all(not svc for _, svc in results),
                }
            )

    tracked_by_key = {
        (row["cid"], row["propertyId"]): row
        for row in tracked
    }
    tracked_by_service: dict[tuple[str, str], dict] = {}
    for client, cid in client_mappings.items():
        origin = client_origin[client]
        if not cid:
            continue
        not_on_original = normalize_name(client) not in migration_names
        if cid not in inventories:
            # The client maps to a Twilio subaccount we could not read, or to none at all.
            # Emit a visible row instead of dropping the client from the tracker.
            tracked.append(
                {
                    "company": client,
                    "cid": cid,
                    "property": "No Twilio subaccount reachable",
                    "propertyId": "",
                    "paigeStatus": client_status[client],
                    "sourceDisposition": "client_level_expansion",
                    "cohortOrigins": [origin],
                    "notOnOriginalMigration": not_on_original,
                    "forcedLiveStatus": "NO_SUBACCOUNT",
                }
            )
            continue

        matched_any = False
        for service in inventories[cid]:
            # Service names carry an optional numeric suffix (Entrata_18068_1136553_16602).
            # Requiring a bare propertyId hid five of RISE's twelve live campaigns.
            match = re.fullmatch(
                rf"Entrata_{re.escape(cid)}_(\d+)(?:_(\d+))?",
                service.get("friendly_name") or "",
            )
            if not match:
                continue
            matched_any = True
            property_id = match.group(1)
            existing = tracked_by_key.get((cid, property_id))
            if existing:
                if origin not in existing["cohortOrigins"]:
                    existing["cohortOrigins"].append(origin)
                existing["notOnOriginalMigration"] = not_on_original
                continue
            key = (cid, service["friendly_name"])
            if key in tracked_by_service:
                continue
            row = {
                "company": client,
                "cid": cid,
                "property": f"Property {property_id}",
                "propertyId": property_id,
                "serviceNameMatch": service["friendly_name"],
                "paigeStatus": client_status[client],
                "sourceDisposition": "client_level_expansion",
                "cohortOrigins": [origin],
                "notOnOriginalMigration": not_on_original,
            }
            tracked.append(row)
            tracked_by_service[key] = row

        if not matched_any and not any(
            row["cid"] == cid and row["company"] == client for row in tracked
        ):
            tracked.append(
                {
                    "company": client,
                    "cid": cid,
                    "property": "No Entrata messaging service in Twilio",
                    "propertyId": "",
                    "paigeStatus": client_status[client],
                    "sourceDisposition": "client_level_expansion",
                    "cohortOrigins": [origin],
                    "notOnOriginalMigration": not_on_original,
                    "forcedLiveStatus": "NO_SERVICE",
                }
            )

    def check(row: dict) -> dict:
        cid = row["cid"]
        result = {**row}
        if row.get("forcedLiveStatus"):
            return {**result, "liveStatus": row["forcedLiveStatus"], "submitted": False}
        services = inventories.get(cid, [])
        expected_name = f"Entrata_{cid}_{row['propertyId']}"
        if row.get("serviceNameMatch"):
            candidates = [
                service
                for service in services
                if (service.get("friendly_name") or "") == row["serviceNameMatch"]
            ]
        else:
            candidates = [
                service
                for service in services
                if (service.get("friendly_name") or "") == expected_name
            ] or [
                # Suffixed variants (Entrata_18068_1136553_16602) are the same property.
                service
                for service in services
                if (service.get("friendly_name") or "").startswith(f"{expected_name}_")
            ]
        if not candidates:
            return {**result, "liveStatus": "SERVICE_NOT_FOUND", "submitted": False}

        candidates.sort(key=lambda value: value.get("date_created") or "", reverse=True)
        try:
            auth = auth_by_cid[cid]
            # A property can own several identically named services (RISE 1224822 has three).
            # Reading only the newest reported NO_CAMPAIGN over a live VERIFIED campaign, so
            # read every candidate and keep the service that actually holds a campaign.
            compliance: list[dict] = []
            service = candidates[0]
            for option in candidates:
                found = request_json(
                    f"https://messaging.twilio.com/v1/Services/{option['sid']}/Compliance/Usa2p",
                    *auth,
                    params={"PageSize": 50},
                ).get("compliance", [])
                if found:
                    service, compliance = option, found
                    break
            result.update(
                {
                    "serviceName": service.get("friendly_name"),
                    "serviceCreated": service.get("date_created"),
                    "serviceSid": service.get("sid"),
                    "duplicateServiceCount": len(candidates),
                }
            )
            if not compliance:
                return {**result, "liveStatus": "NO_CAMPAIGN", "submitted": False}
            campaign = max(
                compliance,
                key=lambda value: value.get("date_updated")
                or value.get("date_created")
                or "",
            )
            action = action_for_campaign({**campaign, "_cid": cid}, row["company"])
            bucket = confidence_bucket(campaign, row["company"])
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
                **bucket,
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
    confidence_bucket_summary = Counter(
        row.get("confidenceBucket", "needs_triage") for row in failed
    )
    brand_website_rollup = []
    for company, fix in KNOWN_BRAND_RECORD_FIXES.items():
        affected = sum(row["company"] == company for row in failed)
        if affected:
            brand_website_rollup.append(
                {
                    "company": company,
                    "affectedCampaigns": affected,
                    **fix,
                }
            )
    template_a_failed = [row for row in failed if row.get("usesTemplateA")]
    unmapped_clients = []
    for client, cid in oxp_mappings.items():
        if not cid:
            unmapped_clients.append(
                {"company": client, "reason": "No confident CID match"}
            )
        elif cid not in accounts_by_cid:
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
        "remediationAddedPropertyCount": sum(
            "Original property cohort" not in row["cohortOrigins"]
            and "OXP submitted client list" not in row["cohortOrigins"]
            for row in campaigns
        ),
        "oxpAddedPropertyCount": sum(
            "OXP submitted client list" in row["cohortOrigins"]
            and "Original property cohort" not in row["cohortOrigins"]
            for row in campaigns
        ),
        "unmappedClients": unmapped_clients,
        "additionalTrackedClients": [
            {
                "company": client,
                "cid": meta["cid"],
                "origin": client_origin[client],
                "propertiesFound": sum(
                    row["company"] == client and row["cid"] == meta["cid"]
                    for row in campaigns
                ),
            }
            for client, meta in extra_clients.items()
        ],
        "duplicateSubaccounts": sorted(
            duplicate_subaccounts, key=lambda row: -row["subaccountCount"]
        ),
        "excludedCount": len(excluded),
        "summary": dict(summary),
        "failureActionSummary": dict(failure_action_summary),
        "confidenceBucketSummary": {
            key: confidence_bucket_summary.get(key, 0)
            for key in BUCKET_LABELS
        },
        "confidenceBucketLabels": BUCKET_LABELS,
        "siteVerification": {
            "testedAt": "2026-09-16T15:57:00Z",
            "uniqueTargetsTested": 23,
            "fullyPassed": 0,
            "requirements": [
                "valid HTTPS",
                "public Privacy Policy",
                "public Terms",
                "served opt-in control when claimed",
            ],
            "note": (
                "Headless browser verification covered all 21 unique property URLs in the possible "
                "Entrata-copy-fix set plus corrected AMG and Aztex brand targets. None passed every check."
            ),
        },
        "brandWebsiteRollup": brand_website_rollup,
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
