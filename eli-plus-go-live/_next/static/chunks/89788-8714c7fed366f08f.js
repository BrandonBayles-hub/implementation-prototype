"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[89788],{42595:(e,t,a)=>{a.d(t,{FK:()=>d,Gm:()=>p,QG:()=>c,aN:()=>o,dI:()=>r,nG:()=>l,pv:()=>s,zH:()=>i});let r="First Late Fee Waiver — 12-Month Courtesy",o="gap-late-fee-year-one",n="LATEFEE",i=["Dana Whitfield","Jasmine Wright","Alex Johnson","Nicole Park","Taylor Kim","Abe Kashiwagi","Priya Patel","Jordan Rivera"],s=["Brookside Commons","Oakwood Apartments","Sunset Ridge","Lakeview Terrace","Sunset Ridge","Sunset Ridge"],l="Kestrel waives the first late fee after twelve months of occupancy. Post the waiver to GL 4210 Late Fee Income using charge code LATEFEE. Send the resident the Late Fee Courtesy Waiver notice the same day. Exception: do not waive a late fee assessed in month one of a new lease, including transfers — the twelve-month clock starts on original move-in.",c={id:"6",fileName:r,documentType:"sop",property:"Portfolio",scopeLevel:"company",approvalStatus:"approved",trainedOn:"Yes",modified:"Aug 18, 2026",owner:"Lisa Nguyen",type:"file",version:"1.0",source:"upload",effectiveDate:"2026-08-01",tags:["Payments","Policy","Resident relations"],body:`<h1>First Late Fee Waiver — 12-Month Courtesy</h1>
<p><strong>Kestrel Residential</strong> \xb7 SOP-FIN-014 \xb7 Effective August 1, 2026 \xb7 Owner: Lisa Nguyen, Director of Revenue</p>
<p>This is Kestrel's standing rule for the first late fee after a resident's first year. It is not a generic Entrata default. Site teams and ELI Console both run off this document.</p>

<h2>1. The rule</h2>
<p>Waive the <strong>first</strong> late fee assessed after the household has been in residency for <strong>twelve (12) consecutive months</strong>. One waiver per twelve-month period. No regional approval is required — this is standing policy, not a one-off courtesy.</p>

<h2>2. Accounting</h2>
<ul>
<li>Charge code: <strong>${n}</strong></li>
<li>Post the waiver as a credit to <strong>GL 4210 Late Fee Income</strong></li>
<li>Do not net the waiver against rent. Do not reclass to a concession GL.</li>
<li>Reason code in Entrata: <em>12-month courtesy — SOP-FIN-014</em></li>
</ul>

<h2>3. Resident notice</h2>
<p>Send the <strong>Late Fee Courtesy Waiver</strong> notice the same day the credit posts — portal message and email. The notice must say this is Kestrel's first-year courtesy, that it applies once per twelve-month period, and that the next late fee will post per the lease.</p>

<h2>4. Exception — month one of a new lease</h2>
<p><strong>Do not waive</strong> a late fee assessed in the first 30 days of a new lease, including unit transfers and roommate-add leases treated as new contracts. The twelve-month clock starts on the household's <strong>original move-in date</strong>, not the transfer date.</p>

<h2>5. What ELI and site staff may do</h2>
<ul>
<li>ELI Console and Payments AI may confirm eligibility from the lease start date and post the ${n} credit when the rule matches.</li>
<li>If the resident is inside month one of a new lease, say so and do not waive. Offer a payment arrangement if they ask.</li>
<li>A second late fee in the same twelve-month window is not waived under this SOP. Escalate to the property manager.</li>
</ul>`,fileFormat:"text",linkedAgentIds:["1"],viewerAccess:{entries:["group:grp-admin","group:grp-regional","group:grp-property","group:grp-site-leasing"]},relatedDocumentIds:["5"]};function d(e){let t=e.findIndex(e=>"6"===e.id);if(-1===t)return[c,...e];let a=e.slice();if(a[t]={...e[t],...c},0!==t){let[e]=a.splice(t,1);a.unshift(e)}return a}function p(e){let t=e.toLowerCase();return!!/late[\s-]?fee/.test(t)&&(/waiv/.test(t)||/policy/.test(t)||/year one|first year|twelve month|12 month|after a year|after year/.test(t))}},89788:(e,t,a)=>{a.d(t,{$1:()=>l,Bk:()=>d,Gy:()=>w,Su:()=>i,VaultProvider:()=>S,cB:()=>c,iA:()=>s});var r=a(49556),o=a(95576),n=a(42595);function i(e){return"review"===e||"needs_review"===e?"Needs review":"approved"===e?"Approved":e}let s={entries:["role:admin"]},l=["Fair housing & anti-discrimination","Reasonable accommodation & assistive animals","Tenant screening & background checks","Data privacy & PII handling","Security deposit handling","Rent collection & late fees","Eviction & lease termination","Maintenance & habitability standards"],c=["Portfolio","Pine Hill Residences","Oakwood Apartments","Sunset Ridge"],d=["Leasing","Maintenance","Compliance","Payments","Policy","Resident relations","Operations"],p="janet-poc-vault-v5",u=`ENTRATA | GO DARK STEPS
The steps below must be completed prior to migration/transition to the new
management system.
● Setup > Properties > select property > Financial > Charges > General
○ Ensure "Automatically Post Scheduled Charges" is set to NO
● Setup > Properties > select property > Financial > Payments > Merchant Accounts > Charge
Code Specific Merchant Accounts
○ Change all "Charge Code Specific Merchant Accounts" to DEFAULT
○ This needs to be accomplished before the merchant account is changed to null
otherwise an error is received.
● Setup > Properties > select property > Financial > Payments > Merchant Accounts > Default
Merchant Account
○ Change "Default Merchant Account" to NULL by having the BLANK field selected at the
top of the list
● Setup > Properties > select property > Financial > Closings > Period Advance
○ Change the following 3 settings to NO
■ - AR Auto Update Post Month
■ - AP Auto Update Post Month
■ - GL Auto Update Post Month
● Setup > Properties > select property > Financial > Delinquency > Delinquency
○ Ensure "Automatically Post Late Fees" is set to NO
● Setup > Users & Groups
○ Disable user access for any on-site team members
● Setup > Properties > select property > ResidentPortal > Payments > General
○ Change "Enable Resident Pay" to NO
○ Change "Payments Tab" to DISABLED
● Setup > Properties > select property > ResidentPortal > Payments > Payment Block Days
○ Remove all dates from "Accept Online Payments On:"
● Setup > Properties > select property > ResidentPortal > Payments > Auto Payments
○ Remove all dates from "Allow Scheduled Payments on:"
● Setup > Properties > select property > ResidentPortal > Maintenance > Standard:
○ Change "Maintenance Tab" to DISABLED
● Setup > Properties > select property > ResidentPortal > Enrollment/Login > Login:
○ Change "Resident Portal App Login" to DISABLED
○ Change "Allow Applicant Login" to NO
● Setup > Properties > select property > Data Management > Leasing > Lease
○ Click Edit Lease Forms Integration Settings
○ Delete all information or choose the blank/null option from any drop down lists > Click
Save
● Setup > Properties > select property > Data Management > Leasing > Revenue Management
○ Click Edit Revenue Management Vendor
○ Delete all information or choose the blank/null option from any drop down lists. Turn all
Yes/No settings to No > Click Save

The steps below are recommended to be completed prior to
migration/transition to the new management system.
● Reports > Recurring Payments
○ Select property & generate report
○ Delete all individual recurring payments
● Apps > API Access
○ Remove all associated vendors
■ From the Property list dropdown, select the property > Click Filter
■ Click Manage > search for property > Click Remove
● Setup > Company > Data Management > Integration Settings > Transmission Vendors
○ Search for property > click Edit > click Delete to remove the integration from Bluemoon
● Setup > Company > Document
○ Select property from list on the left
○ Delete application by clicking red X Delete
● Setup > Properties > select property > Property > Floor Plans & Units > Unit Availability /
Search:
○ Set "Allow/Require Floor Plan Selection" to No/No
○ Set "Allow / Require Unit Selection" to No/No
● Setup > Properties > select property > Financial > Payments > General > Payment Types
○ Turn all to NO. They will show as red stop signs once saved
● Setup > Properties > select property > Communication > Contact Points
○ Go through all tabs (Leads, Applicants, Residents, Payments, Renewals & Lease
Modifications, and Maintenance) and remove all contact points. Click the Edit Pencil >
uncheck any check boxes & change anything set to Yes to No > Save
● Setup > Properties > select property > Communication > From Addresses
○ Remove all email addresses
○ Change "Email Relay "From" address:" to include historical within the email address (i.e.
1515flatshistorical@emailrelay.com)
● Setup > Properties > select property > Communication > Notification Recipients
○ Delete all System Messages set up under Notification Recipients
○ Click Edit Pencil next to each email > click Delete
● Tools > Message Center > Scheduled
○ Remove any scheduled emails for the property. Click Advanced > select the community >
click Apply > edit the message to remove the property from the email if multiple
properties are associated with it OR select "No" under Is Active if it's the only property
associated with it
● Setup > Company > Communication > Documents > Packets
○ Filter for property & disassociate property from all associated packets
○ DO NOT delete packets - if all properties associated to a packet are terminated, mark the
packet as Inactive
○ Search for Blue Moon Packet and mark as Inactive
● Setup > Company > Communication > Documents > Templates
○ Filter for property & remove property from all associated templates
○ DO NOT delete any templates - if all properties associated to a template are terminated,
disable the template`,m=`REFUND POLICY — Standard Operating Procedure

1. SCOPE
This policy applies to all refund requests received from current and former residents across all managed properties.

2. ELIGIBILITY
Refunds may be issued for:
  • Security deposit returns (per state-specific timelines)
  • Overpayment of rent or fees
  • Duplicate payment corrections
  • Cancelled amenity or service fees (if within 48-hour window)
  • Move-in fee adjustments when unit condition differs from showing

3. APPROVAL THRESHOLDS
  • Up to $250 — Site-level manager may approve
  • $250–$500 — Regional manager approval required
  • Over $500 — VP of Operations approval required; AI agent must escalate

4. PROCESSING TIMELINE
  • Standard refunds: processed within 5 business days of approval
  • Security deposits: per applicable state law (default 30 days if not specified)
  • Emergency / hardship refunds: processed within 2 business days

5. DOCUMENTATION REQUIREMENTS
All refunds must include:
  • Original payment reference or receipt
  • Written refund request from resident (email acceptable)
  • Manager approval notation in system
  • Reason code selected in Entrata

6. AI AGENT GUIDELINES
  • Agents may acknowledge refund requests and set expectations on timeline
  • Agents must NOT commit to specific refund amounts without manager approval
  • Refund requests over $500 must be escalated immediately
  • Agent should reference this policy when explaining the process to residents`,f=[{...n.QG},{id:"1",fileName:"Leasing SOP",documentType:"sop",property:"Portfolio",scopeLevel:"company",approvalStatus:"approved",trainedOn:"Yes",modified:"Feb 18, 2025",owner:"Admin",type:"file",version:"2.1",source:"upload",effectiveDate:"2025-02-01",body:u,fileFormat:"text",viewerAccess:{entries:["role:admin","role:regional","role:property","user:h-comp-dir"]},relatedDocumentIds:["3","5"]},{id:"2",fileName:"Maintenance escalation",documentType:"sop",property:"Portfolio",scopeLevel:"company",approvalStatus:"approved",trainedOn:"Yes",modified:"Feb 15, 2025",owner:"Admin",type:"file",version:"1.0",source:"upload",fileFormat:"text",viewerAccess:{entries:["role:admin","role:regional"]},relatedDocumentIds:["1"]},{id:"3",fileName:"Fair housing & anti-discrimination",documentType:"policy",property:"Portfolio",scopeLevel:"company",approvalStatus:"approved",trainedOn:"Yes",modified:"Feb 10, 2025",owner:"Admin",type:"file",source:"upload",tags:["compliance"],fileFormat:"pdf",viewerAccess:{entries:["role:admin","role:regional","role:property","role:ic","user:h-exec","user:h-comp-dir"]},relatedDocumentIds:["1","4","5"]},{id:"4",fileName:"Lease template",documentType:"lease",property:"Pine Hill Residences",scopeLevel:"property",propertyId:"Pine Hill Residences",approvalStatus:"review",trainedOn:"No",modified:"Feb 5, 2025",owner:"Admin",type:"file",source:"upload",fileFormat:"pdf",viewerAccess:{entries:["role:admin","role:property","user:h-pm-a","user:h-leasing-mgr-a"]},relatedDocumentIds:["3"]},{id:"5",fileName:"Refund policy",documentType:"sop",property:"Portfolio",scopeLevel:"company",approvalStatus:"review",trainedOn:"No",modified:"Feb 20, 2025",owner:"Admin",type:"file",version:"1.0",source:"upload",body:m,fileFormat:"text",viewerAccess:{entries:["role:admin"]},relatedDocumentIds:["1","3"]}],y=(0,o.createContext)(null);function h(){return new Date().toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})}let g="janet-poc-vault-activity",v="janet-poc-vault-workforce-acks";function S({children:e}){let[t,a]=(0,o.useState)(f),[i,c]=(0,o.useState)(()=>Object.fromEntries(l.map(e=>[e,!1]))),[d,w]=(0,o.useState)({}),[A,P]=(0,o.useState)([]),[b,I]=(0,o.useState)([]),[D,C]=(0,o.useState)(!1);(0,o.useEffect)(()=>{try{let e=localStorage.getItem(p);if(e){let t=JSON.parse(e),r=Array.isArray(t.documents)?t.documents:t.docs,o=t.compliance,i=t.complianceSubjectDocumentIds;if(Array.isArray(r)){let e=new Set(r.map(e=>e.id)),t=r.map(t=>{let a=t;if("1"!==a.id||a.body||(a={...a,body:u}),"5"!==a.id||a.body||(a={...a,body:m}),"draft"===a.approvalStatus&&"file"===a.type&&(a={...a,approvalStatus:"review"}),a=function(e){let t=e.viewerAccess;if(!t)return e;if("entries"in t&&Array.isArray(t.entries)&&t.entries.length>0){let a=t.entries.filter(e=>"string"==typeof e);return a.length?{...e,viewerAccess:{entries:[...new Set(a)]}}:{...e,viewerAccess:s}}return"roles"in t&&Array.isArray(t.roles)&&t.roles.length>0?{...e,viewerAccess:{entries:[...new Set(t.roles.map(e=>`role:${e}`))]}}:{...e,viewerAccess:s}}(a),a.relatedDocumentIds?.length){let t=[...new Set(a.relatedDocumentIds)].filter(t=>e.has(t)&&t!==a.id);a={...a,relatedDocumentIds:t.length?t:void 0}}return a});a((0,n.FK)(t))}if(o&&"object"==typeof o&&c(e=>({...e,...o})),i&&"object"==typeof i){let e={};for(let[t,a]of Object.entries(i))Array.isArray(a)?e[t]=a:"string"==typeof a&&a&&(e[t]=[a]);w(e)}}let t=localStorage.getItem(g);if(t){let e=JSON.parse(t);Array.isArray(e)&&P(e)}let r=localStorage.getItem(v);if(r){let e=JSON.parse(r);Array.isArray(e)&&I(e)}}catch{}C(!0)},[]),(0,o.useEffect)(()=>{if(D)try{localStorage.setItem(p,JSON.stringify({documents:t,compliance:i,complianceSubjectDocumentIds:d}))}catch{}},[t,i,d,D]),(0,o.useEffect)(()=>{if(D)try{localStorage.setItem(g,JSON.stringify(A))}catch{}},[A,D]),(0,o.useEffect)(()=>{if(D)try{localStorage.setItem(v,JSON.stringify(b))}catch{}},[b,D]),(0,o.useEffect)(()=>{if(!D)return;let e=new Date;a(t=>t.map(t=>"file"===t.type&&t.nextReviewDate&&"approved"===t.approvalStatus&&new Date(t.nextReviewDate)<=e?{...t,approvalStatus:"needs_review"}:t))},[D]);let k=(0,o.useCallback)(e=>{let t={...e,id:`act-${Date.now()}-${Math.random().toString(36).slice(2,6)}`,at:new Date().toISOString()};P(e=>[t,...e].slice(0,200))},[]),R=(0,o.useCallback)((e,t)=>{w(a=>{let r=a[e]??[];return r.includes(t)?a:{...a,[e]:[...r,t]}})},[]),O=(0,o.useCallback)((e,t)=>{w(a=>{let r=(a[e]??[]).filter(e=>e!==t);if(0===r.length){let{[e]:t,...r}=a;return r}return{...a,[e]:r}})},[]),E=(0,o.useCallback)(e=>{c(t=>e(t))},[]),N=(0,o.useCallback)(e=>{let t=h(),r=String(Date.now());return a(a=>[...a,{...e,id:r,modified:t,source:e.source??"upload",version:"sop"===e.documentType?e.version??"1.0":void 0}]),k({action:"Document added",by:e.owner||"Admin",documentId:r,documentName:e.fileName}),r},[k]),L=(0,o.useCallback)((e,t)=>{a(a=>a.map(a=>{if(a.id!==e)return a;let r={...a,...t,modified:t.modified??h()};return t.body&&t.body!==a.body&&a.trainingRecords?.length&&(r.trainingRecords=a.trainingRecords.map(e=>"trained"===e.status?{...e,status:"out_of_date"}:e)),r}))},[]),F=(0,o.useCallback)((e,t,r)=>{a(a=>a.map(a=>{if(a.id!==e)return a;let o=function(e){if(!e)return"1.0";let t=e.split("."),a=parseInt(t[0]??"1",10),r=parseInt(t[1]??"0",10);return`${a}.${r+1}`}(a.version),n={version:a.version??"1.0",body:a.body??"",approvedAt:new Date().toISOString(),approvedBy:t},i={at:new Date().toISOString(),action:"approved",by:t,version:o,note:r},s=(a.trainingRecords??[]).map(e=>"trained"===e.status?{...e,status:"out_of_date"}:e);return{...a,approvalStatus:"approved",version:o,modified:h(),versions:[...a.versions??[],n],history:[...a.history??[],i],trainingRecords:s}})),k({action:"Document approved",by:t,documentId:e,detail:r})},[k]),T=(0,o.useCallback)((e,t)=>{a(a=>a.map(a=>{if(a.id!==e)return a;let r=a.trainingRecords??[],o=r.findIndex(e=>e.agentId===t),n={agentId:t,status:"trained",trainedAt:new Date().toISOString(),trainedOnVersion:a.version??"1.0"},i=o>=0?r.map((e,t)=>t===o?n:e):[...r,n];return{...a,trainingRecords:i}}))},[]),M=(0,o.useCallback)(e=>{let t=h();a(a=>[...a,{id:String(Date.now()),fileName:e,documentType:"other",property:"—",approvalStatus:"approved",trainedOn:"—",modified:t,owner:"Admin",type:"folder"}])},[]),x=(0,o.useCallback)((e,t)=>{a(a=>a.map(a=>a.id===e?{...a,folderId:t??void 0}:a))},[]),G=(0,o.useCallback)(e=>{a(t=>{let a=t.find(t=>t.id===e);return a?"folder"===a.type?t.filter(t=>t.id!==e).map(t=>t.folderId===e?{...t,folderId:void 0}:t):t.filter(t=>t.id!==e).map(t=>{let a=t.relatedDocumentIds?.filter(t=>t!==e);return t.relatedDocumentIds?.includes(e)?{...t,relatedDocumentIds:a?.length?a:void 0}:t}):t})},[]),U=(0,o.useCallback)(e=>{I(t=>[...t.filter(t=>t.memberId!==e.memberId||t.subject!==e.subject),{...e,acknowledgedAt:new Date().toISOString()}]),k({action:"Workforce acknowledgment",by:e.memberName,detail:`Acknowledged "${e.subject}"`})},[k]),j=(0,o.useCallback)((e,t)=>{I(a=>a.filter(a=>a.memberId!==e||a.subject!==t))},[]),$=t.filter(e=>"file"===e.type&&!e.isTemplate).length;return(0,r.jsx)(y.Provider,{value:{documents:t,setDocuments:a,addDocument:N,updateDocument:L,addFolder:M,moveToFolder:x,complianceChecked:i,setComplianceChecked:E,complianceSubjectDocumentIds:d,addComplianceSubjectDocument:R,removeComplianceSubjectDocument:O,docCount:$,activityLog:A,addActivity:k,workforceAcks:b,addWorkforceAck:U,removeWorkforceAck:j,approveDocument:F,markAgentTrained:T,deleteDocument:G},children:e})}function w(){let e=(0,o.useContext)(y);if(!e)throw Error("useVault must be used within VaultProvider");return e}}}]);