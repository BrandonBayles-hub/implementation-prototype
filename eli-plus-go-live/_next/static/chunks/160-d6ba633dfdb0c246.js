"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[160],{27679:(e,t,n)=>{n.d(t,{i:()=>l,m:()=>d});var a=n(95155),i=n(12115);let r="janet-poc-workflows-v2",o=[{id:"1",name:"New lead → create task",enabled:!1,fromTemplate:"Lead response"},{id:"2",name:"Lease renewal reminder",enabled:!1},{id:"3",name:"Work order → notify resident",enabled:!1,fromTemplate:"Maintenance triage"}],s=(0,i.createContext)(null);function l({children:e}){let[t,n]=(0,i.useState)(o),[d,c]=(0,i.useState)(!1);(0,i.useEffect)(()=>{try{let e=localStorage.getItem(r);if(e){let t=JSON.parse(e);Array.isArray(t)&&n(t)}}catch{}c(!0)},[]),(0,i.useEffect)(()=>{if(d)try{localStorage.setItem(r,JSON.stringify(t))}catch{}},[t,d]);let u=(0,i.useCallback)(e=>{n(t=>t.map(t=>t.id===e?{...t,enabled:!t.enabled}:t))},[]),p=(0,i.useCallback)(e=>{n(t=>[...t,{...e,id:String(Date.now())}])},[]),m=t.some(e=>e.enabled);return(0,a.jsx)(s.Provider,{value:{recipes:t,setRecipes:n,toggleRecipe:u,addRecipe:p,atLeastOneEnabled:m},children:e})}function d(){let e=(0,i.useContext)(s);if(!e)throw Error("useWorkflows must be used within WorkflowsProvider");return e}},35865:(e,t,n)=>{n.d(t,{Gf:()=>a.Gf,Kj:()=>a.Kj,WW:()=>a.WW,Xs:()=>a.Xs});var a=n(5140)},41034:(e,t,n)=>{n.d(t,{Ex:()=>s,Wh:()=>c,xz:()=>l});var a=n(95155);n(12115);var i=n(18460),r=n(56482);let o=(0,i.F)("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xxs font-normal transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",{variants:{variant:{default:"border-transparent bg-primary text-primary-foreground",secondary:"border-transparent bg-secondary text-secondary-foreground",destructive:"border-transparent bg-destructive text-destructive-foreground",outline:"text-foreground",gray:"border-transparent bg-muted text-muted-foreground",yellow:"border-transparent bg-warning text-warning-foreground",green:"border-transparent bg-success text-success-foreground",red:"border-transparent bg-error text-error-foreground",ai:"border-eli-purple/30 bg-eli-warm-bg text-eli-purple dark:border-eli-purple/40 dark:text-eli-pink",aiVibrant:"border-transparent bg-black text-white",count:"whitespace-nowrap border-badge-count-border bg-badge-count px-2 text-2xs tabular-nums text-badge-count-foreground",attention:"border-attention-border bg-attention text-attention-foreground"}},defaultVariants:{variant:"default"}});function s({className:e,variant:t,...n}){return(0,a.jsx)("div",{className:(0,r.cn)(o({variant:t}),e),...n})}function l({count:e,noun:t,nounPlural:n,className:i,...r}){return(0,a.jsxs)(s,{variant:"count",className:i,...r,children:[e," ",1===e?t:n??`${t}s`]})}let d={success:{pill:"bg-success text-success-foreground border-success-border",dot:"bg-success-foreground"},warning:{pill:"bg-warning text-warning-foreground border-warning-border",dot:"bg-warning-foreground"},danger:{pill:"bg-error text-error-foreground border-error-border",dot:"bg-error-foreground"},info:{pill:"bg-info text-info-foreground border-info-border",dot:"bg-info-foreground"},exception:{pill:"bg-exception text-exception-foreground border-exception-border",dot:"bg-exception-foreground"},neutral:{pill:"bg-muted text-muted-foreground border-border",dot:"bg-muted-foreground"}};function c({tone:e,title:t,dot:n=!1,className:i,children:o,...s}){let l=d[e];return(0,a.jsxs)("span",{className:(0,r.cn)("inline-flex items-center gap-1 whitespace-nowrap rounded-full border px-2 py-0.5 text-xxs font-normal",l.pill,i),title:t,...s,children:[n&&(0,a.jsx)("span",{className:(0,r.cn)("h-1.5 w-1.5 rounded-full",l.dot)}),o]})}},42840:(e,t,n)=>{n.d(t,{Y:()=>s,a:()=>l});var a=n(95155),i=n(12115);let r="oxp-r1-release",o=(0,i.createContext)(null);function s({children:e}){let[t,n]=(0,i.useState)(!1);(0,i.useEffect)(()=>{try{let e=localStorage.getItem(r);null!==e&&n("true"===e)}catch{}},[]);let l=(0,i.useCallback)(e=>{n(e);try{localStorage.setItem(r,String(e))}catch{}},[]),d=(0,i.useCallback)(()=>{l(!t)},[t,l]);return(0,a.jsx)(o.Provider,{value:{isR1Release:t,toggleR1Release:d,setR1Release:l},children:e})}function l(){let e=(0,i.useContext)(o);if(!e)throw Error("useR1Release must be used within R1ReleaseProvider");return e}},56482:(e,t,n)=>{n.d(t,{cn:()=>o});var a=n(29722),i=n(622);n(41463);let r=(0,i.zu)({extend:{classGroups:{"font-size":[{text:["xxs","2xs","3xs"]}]}}});function o(...e){return r((0,a.$)(e))}},64982:(e,t,n)=>{n.d(t,{UQ:()=>c,_F:()=>u});var a=n(95155),i=n(12115);let r=[{value:"fully_autonomous",label:"L5 \xb7 Autonomous",level:5},{value:"autonomous",label:"L4 \xb7 Conversational",level:4},{value:"efficiency",label:"L3 \xb7 Processing at Scale",level:3},{value:"intelligence",label:"L2 \xb7 Operational Efficiency",level:2},{value:"operations",label:"L1 \xb7 ELI Essentials",level:1}],o=(e,t,n,a,i={})=>{let r=function(e,t,n){let a=0;for(let t=0;t<e.length;t++)a=31*a+e.charCodeAt(t)|0;a=Math.abs(a);let i=Math.round(("Active"===t?120+a%880:"Off"===t?0:a%40)*("autonomous"===n?1.6:"efficiency"===n?1.3:"operations"===n?1.1:1)),r=0===i?"flat":a%5<3?"up":a%5==3?"flat":"down";return{weeklyUsage:i,trendDirection:r}}(n,i.status??"Off",t);return{name:n,description:a,status:"Off",bucket:e,type:t,scope:"All properties",vaultBinding:"",channels:["Chat","Portal"],toolsAllowed:["Entrata Tools"],guardrails:"None",conversationCount:0,resolutionRate:"—",escalationsCount:0,revenueImpact:"—",labels:[],...r,..."autonomous"===t?{persona:"professional",maxSteps:10,fairHousingEnabled:!0,escalationKeywords:[],escalationDefault:"agent_handles",confidenceThreshold:70,deploymentMode:"active",slaFirstResponseMinutes:15,slaResolutionHours:24,slaBusinessHoursOnly:!0}:{},..."intelligence"===t&&i.prompt?{promptHistory:[{version:1,prompt:"Initial analysis setup.",changedAt:"2026-01-15T10:00:00Z",changedBy:"System",note:"Agent created"},{version:2,prompt:i.prompt.slice(0,100)+(i.prompt.length>100?"…":""),changedAt:"2026-02-01T09:00:00Z",changedBy:"Admin",note:"Refined analysis focus"}]}:{},...i}},s=[{id:"1",...o("Revenue & Financial Management","autonomous","Payments AI","Rent, fees, payment questions",{status:"Active",vaultBinding:"SOPs: Payments, Refund policy",toolsAllowed:["Entrata Tools","Work orders"],guardrails:"Approval gate for refunds >$500",conversationCount:42,resolutionRate:"88%",escalationsCount:5,revenueImpact:"$1.2K",labels:["Payments"]})},{id:"100",...o("Revenue & Financial Management","intelligence","Activate & Sync Templates","Push changes from a budget template to multiple linked budgets in one operation.",{status:"Active",labels:["Accounting"]})},{id:"101",...o("Revenue & Financial Management","intelligence","Advance Period Select All AP Agent","Select all checkbox automatically in AP period closing module of AP Payment.",{status:"Active",labels:["Accounting"]})},{id:"102",...o("Revenue & Financial Management","intelligence","AP Advance Checklist Bulk Completion","User selects post month and properties, clicks Load Properties, then deploys the agent. The agent checks all unchecked AP advance checklist items across all loaded properties.",{status:"Coming Soon",labels:["Accounting"]})},{id:"103",...o("Revenue & Financial Management","intelligence","AP Closing Checklist Bulk Completion","User selects post month and properties, clicks Load Properties, then deploys the agent. The agent checks all unchecked AP closing checklist items across all loaded properties.",{status:"Active",labels:["Accounting"]})},{id:"104",...o("Revenue & Financial Management","intelligence","Approve for Payment","Approve selected invoices for payment in bulk, moving them through the AP approval workflow.",{status:"Active",labels:["Accounting"]})},{id:"105",...o("Revenue & Financial Management","intelligence","AR Advance Checklist Bulk Completion","With the agent, the human performs the setup: they select the post month, select properties (default: all), and click Load Properties to populate the checklist. They deploy the agent.",{status:"Active",labels:["Accounting"]})},{id:"106",...o("Revenue & Financial Management","intelligence","AR Lock Checklist Bulk Completion","Human selects post month and properties, loads them, agent checks all AR checklist items across all properties, human reviews and clicks Lock AR.",{status:"Active",labels:["Accounting"]})},{id:"107",...o("Revenue & Financial Management","intelligence","Auto Revise FMO","Automate FMO revisions when residents pay after FMO.",{status:"Active",labels:["Accounting"]})},{id:"108",...o("Revenue & Financial Management","intelligence","Batch Post Late Fees","Post calculated late fees across all eligible leases in bulk for selected properties and billing periods.",{status:"Active",labels:["Accounting"]})},{id:"109",...o("Revenue & Financial Management","intelligence","Bulk Budget Export","The user selects which budgets to export (e.g. by fiscal year, property, or portfolio) and deploys the agent.",{status:"Active",labels:["Accounting"]})},{id:"110",...o("Revenue & Financial Management","intelligence","Bulk JE Creation from Manual Templates","Generate journal entries in bulk from selected manual templates.",{status:"Active",labels:["Accounting"]})},{id:"111",...o("Revenue & Financial Management","intelligence","Bulk Submit Worksheets for Approval","Submit multiple budget worksheets for approval in a single operation.",{status:"Active",labels:["Accounting"]})},{id:"112",...o("Revenue & Financial Management","intelligence","Cancel Expired Customer Invoices","Cancel all expired customer invoices for selected properties and date ranges in a single action.",{status:"Active",labels:["Accounting"]})},{id:"113",...o("Revenue & Financial Management","intelligence","Complete GL Advance Checklist","User selects post month and properties, clicks Load Properties, then deploys the agent. The agent checks all unchecked GL advance checklist items across all loaded properties.",{status:"Active",labels:["Accounting"]})},{id:"114",...o("Revenue & Financial Management","intelligence","Copy Priorities to All Properties","Synchronize charge code priority ordering from a source property to multiple target properties.",{status:"Active",labels:["Accounting"]})},{id:"115",...o("Revenue & Financial Management","intelligence","Create Draw Request","Create and submit draw requests for multiple jobs with configured defaults in one operation.",{status:"Active",labels:["Accounting"]})},{id:"116",...o("Revenue & Financial Management","intelligence","Create Journal Entries from Template","Create journal entry templates in bulk from selected posted journal entries.",{status:"Active",labels:["Accounting"]})},{id:"117",...o("Revenue & Financial Management","intelligence","Create Purchase Order from Contract","Add purchase orders to existing contracts by pre-populating from the contract and routing for approval.",{status:"Active",labels:["Accounting"]})},{id:"118",...o("Revenue & Financial Management","intelligence","Draw Update Documentation",'The user selects which draws need updated docs (e.g. "draws with payment after last generate" or a list) and deploys the agent.',{status:"Active",labels:["Accounting"]})},{id:"119",...o("Revenue & Financial Management","intelligence","Fee Transparency Enablement","Enable fee transparency settings across multiple properties in a single operation.",{status:"Active",labels:["Accounting"]})},{id:"120",...o("Revenue & Financial Management","intelligence","Generate Draw Document","Generate, download, or email draw documents across multiple draw requests at once.",{status:"Active",labels:["Accounting"]})},{id:"121",...o("Revenue & Financial Management","intelligence","GL Closing Checklist Bulk Completion","User selects post month and properties, clicks Load Properties, then deploys the agent. The agent checks all unchecked GL closing checklist items across all loaded properties.",{status:"Active",labels:["Accounting"]})},{id:"122",...o("Revenue & Financial Management","intelligence","Job Budget Approval","Submit job budgets for approval across multiple selected jobs in a single action.",{status:"Active",labels:["Accounting"]})},{id:"123",...o("Revenue & Financial Management","intelligence","Month-to-Month Rent Increases","Process month-to-month rent increases across eligible leases in bulk.",{status:"Active",labels:["Accounting"]})},{id:"124",...o("Revenue & Financial Management","intelligence","Post Deposit Interest Bulk","Calculate and post deposit interest for residents across selected properties in bulk.",{status:"Active",labels:["Accounting"]})},{id:"125",...o("Revenue & Financial Management","intelligence","Post Recurring Charges","Post recurring scheduled charges across all properties in a single action.",{status:"Active",labels:["Accounting"]})},{id:"126",...o("Revenue & Financial Management","intelligence","Purchase Orders > Receive Items","Receive remaining quantities on approved existing purchase orders in bulk.",{status:"Coming Soon",labels:["Accounting"]})},{id:"127",...o("Revenue & Financial Management","intelligence","Reforecast Budgets","Run the re-forecast action across multiple advanced budgets with consistent settings.",{status:"Active",labels:["Accounting"]})},{id:"128",...o("Revenue & Financial Management","intelligence","Report Generation","The Bulk Report Generation Agent generates multiple selected report instances sequentially from the Company Reports page. The user selects the instances they want to generate, can apply a Property Groups and/or Period filter override, and deploys the agent. The agent then processes each report.",{status:"Active",labels:["Accounting"]})},{id:"129",...o("Revenue & Financial Management","intelligence","Reverse Void Payments","Reverse void payments in bulk across selected transactions.",{status:"Active",labels:["Accounting"]})},{id:"130",...o("Revenue & Financial Management","intelligence","Revin Portfolio Setup Assistant","Scaling Revenue Intelligence across your portfolio shouldn’t mean repeating setup for every property. The Portfolio Setup Assistant clones your proven configuration, unit groups, pricing constraints, and optimization settings from one property to many, so you go live faster with confidence.",{status:"Active",labels:["Accounting"]})},{id:"131",...o("Revenue & Financial Management","intelligence","Revin Unit Type Set-Up Assistant","Stop configuring every unit type from scratch. Your Intelligent Settings Assistant learns your pricing strategy, turn costs, vacancy loss, rent constraints, and expiration rules - and applies it across your portfolio in seconds. You stay in control and the system does the heavy lifting.",{status:"Active",labels:["Accounting"]})},{id:"132",...o("Revenue & Financial Management","intelligence","Scheduled Charge Approvals","Approve scheduled charges in bulk, moving pending charges through the approval workflow.",{status:"Active",labels:["Accounting"]})},{id:"133",...o("Revenue & Financial Management","intelligence","Unapprove for Payment","Unapprove selected invoices for payment in bulk, moving them through the AP approval workflow.",{status:"Active",labels:["Accounting"]})},{id:"134",...o("Revenue & Financial Management","intelligence","Unapprove for Payment","Unapprove selected invoices for payment in bulk, moving them through the AP approval workflow.",{status:"Active",labels:["Accounting"]})},{id:"140",...o("Revenue & Financial Management","efficiency","ELI Invoice Entry","Uploads an invoice PDF and auto-fills the invoice-entry fields with AI so staff review instead of retype. Adds an authorized per-property contract for post authority.",{status:"Active",labels:["Accounting","Procure-through-Pay"]})},{id:"141",...o("Revenue & Financial Management","efficiency","Invoice Processing","Extracts invoice details and predicts property, vendor, and GL account with ~94% accuracy to cut manual entry and exceptions.",{status:"Active",labels:["Accounting","Procure-through-Pay"]})},{id:"142",...o("Revenue & Financial Management","efficiency","Bill Pay","Fast, easy, flexible, and secure vendor payments—built directly into your existing Entrata workflows.",{status:"Active",labels:["Accounting","Procure-through-Pay"]})},{id:"3",...o("Revenue & Financial Management","operations","Payments Operations","Automated payment processing, reconciliation, and ledger posting. Runs nightly to match payments to charges and flag discrepancies.",{labels:["Payments"],runsCompleted:142,lastRunAt:"2026-02-20T03:00:00Z",lastRunStatus:"success",errorCount:3,avgRunDuration:"4m 12s",schedule:"Daily at 3:00 AM"})},{id:"4",...o("Leasing & Marketing","autonomous","Leasing AI","Tours, applications, lease questions",{status:"Active",scope:"Pine Hill Residences, Oakwood Apartments",vaultBinding:"SOPs: Leasing, Fair housing",channels:["Chat","SMS","Portal"],toolsAllowed:["Entrata Tools","Lease lookup"],guardrails:"Required-docs: screening policy",conversationCount:89,resolutionRate:"92%",escalationsCount:7,revenueImpact:"$8.4K",labels:["Leasing"]})},{id:"200",...o("Leasing & Marketing","intelligence","30-Days Inactive Leads Cancel","Cancels leads after 30 days of inactivity to keep dashboards organized and up to date.",{status:"Active",labels:["Leasing"]})},{id:"201",...o("Leasing & Marketing","intelligence","Approve Applications","Approve rental applications in bulk, moving qualified applicants through the leasing pipeline.",{status:"Active",labels:["Leasing"]})},{id:"202",...o("Leasing & Marketing","intelligence","Approve Screening Decisions","Automatically match screening results to pre-configured decision criteria.",{status:"Active",labels:["Leasing"]})},{id:"203",...o("Leasing & Marketing","intelligence","Bulk Add-On Request Approval","Automatically processes pending add-on approval requests and generates lease addenda in bulk, eliminating the need to approve each request one by one.",{status:"Active",labels:["Leasing"]})},{id:"204",...o("Leasing & Marketing","intelligence","Bulk Countersign Leases","Approve leases in bulk, accelerating the lease execution process.",{status:"Active",labels:["Leasing"]})},{id:"205",...o("Leasing & Marketing","intelligence","Bulk Map Settings Sync","Copies your preferred map view and filter settings from one property to others across your portfolio in a single action.",{status:"Active",labels:["Leasing"]})},{id:"206",...o("Leasing & Marketing","intelligence","Bulk PetScreening Activation","Enables PetScreening across multiple properties at once using a configure-once, apply-to-many approach instead of setting up each property individually.",{status:"Active",labels:["Leasing"]})},{id:"207",...o("Leasing & Marketing","intelligence","Bulk PetScreening Follow-Up","Sends pet screening completion reminders to all pending applicants on the PetScreening Not Progressing dashboard with one click instead of one at a time.",{status:"Active",labels:["Leasing"]})},{id:"208",...o("Leasing & Marketing","intelligence","Copy Footer & Global Information","Copy footer content and global information across your ProspectPortal property websites.",{status:"Active",labels:["Leasing"]})},{id:"209",...o("Leasing & Marketing","intelligence","Copy Theme Settings","Copy theme settings across ProspectPortal property websites for consistent branding.",{status:"Active",labels:["Leasing"]})},{id:"210",...o("Leasing & Marketing","intelligence","Copy Widgets to Websites","Copy widgets from one website to other ProspectPortal property websites to maintain a consistent layout.",{status:"Active",labels:["Leasing"]})},{id:"211",...o("Leasing & Marketing","intelligence","Countersign Individual Docs","Countersign ad-hoc documents in bulk, completing the signing workflow.",{status:"Active",labels:["Leasing"]})},{id:"212",...o("Leasing & Marketing","intelligence","ELI Call Analysis Scorecard","This agent analyzes your scorecards and provides feedback to help make your questions more model and user-friendly. ELI Call Analysis product required for agent use.",{status:"Active",labels:["Leasing"]})},{id:"213",...o("Leasing & Marketing","intelligence","Mapping Intelligence Chat Starter","Opens a pre-filled support chat with Maps.AI for map requests, automatically providing your identity and request details so you can skip the manual setup.",{status:"Active",labels:["Leasing"]})},{id:"214",...o("Leasing & Marketing","intelligence","Marketing Price Update","Set marketing listing prices and descriptions for multiple homes at once.",{status:"Active",labels:["Leasing"]})},{id:"215",...o("Leasing & Marketing","intelligence","Populate Journey Settings","Configure journey call-to-action elements across ProspectPortal property websites.",{status:"Active",labels:["Leasing"]})},{id:"216",...o("Leasing & Marketing","intelligence","Send Invitation","Send rental application invitations to multiple prospects at once.",{status:"Active",labels:["Leasing"]})},{id:"217",...o("Leasing & Marketing","intelligence","Start Applications","Initiate rental applications for multiple prospects in a single action.",{status:"Active",labels:["Leasing"]})},{id:"218",...o("Leasing & Marketing","intelligence","Subscribe to Facebook Page","Agent automates bulk enablement of Facebook Page Syndication. Entrata will keep the property data on your Facebook page up to date after enablement. Facebook account must first be configured in property settings.",{status:"Active",labels:["Leasing"]})},{id:"219",...o("Leasing & Marketing","intelligence","Subscribe to Google My Business","Agent automates bulk enablement of Google Business Profile (GBP) Syndication. Entrata will keep the property data on your GBP up to date after enablement. Google account must first be configured in property settings.",{status:"Active",labels:["Leasing"]})},{id:"220",...o("Leasing & Marketing","intelligence","Subscribe to Yext Local Directories","Agent automates bulk enablement of Yext Local Directory Syndication. Entrata will keep the property data on various directories up to date through Yext after enablement.",{status:"Active",labels:["Leasing"]})},{id:"221",...o("Leasing & Marketing","intelligence","Update Insurance Enforcement Settings","From a property's Insurance Enforcement section, open the custom modal to select multiple properties and one setting/value. The agent GETs each property's insurance page in memory, merges the chosen value into the form data, and POSTs to the update API (no dialog or tab reload).",{status:"Active",labels:["Leasing"]})},{id:"6",...o("Leasing & Marketing","operations","Leasing Operations","Processes applications, runs screening, executes leases, and coordinates move-in tasks automatically.",{labels:["Leasing"],runsCompleted:89,lastRunAt:"2026-02-20T08:15:00Z",lastRunStatus:"success",errorCount:1,avgRunDuration:"2m 45s",schedule:"On new application"})},{id:"7",...o("Resident Relations & Retention","autonomous","Renewal AI","Renewal conversations and retention",{status:"Active",vaultBinding:"SOPs: Renewal, Lease terms",guardrails:"Controlled phrasing (Voice)",conversationCount:56,resolutionRate:"94%",escalationsCount:3,revenueImpact:"$5.1K",labels:["Resident relations"]})},{id:"300",...o("Resident Relations & Retention","intelligence","Anchor Tenant Bulk Update","Update anchor tenant designation across multiple tenants in a single action.",{status:"Active",labels:["Resident relations"]})},{id:"301",...o("Resident Relations & Retention","intelligence","Annual Revenue Range Bulk Update","Update the annual revenue range for multiple commercial tenants at once.",{status:"Active",labels:["Resident relations"]})},{id:"302",...o("Resident Relations & Retention","intelligence","Bulk Move-In","Process multiple move-ins simultaneously, completing the workflow for each resident.",{status:"Coming Soon",labels:["Resident relations"]})},{id:"303",...o("Resident Relations & Retention","intelligence","Business License Bulk Update","Apply business license details to multiple commercial tenants in a single action.",{status:"Active",labels:["Resident relations"]})},{id:"304",...o("Resident Relations & Retention","intelligence","Contact Type Bulk Update","Set contact types across multiple commercial tenant records at once.",{status:"Active",labels:["Resident relations"]})},{id:"305",...o("Resident Relations & Retention","intelligence","Expired Offer Extension","Extend the expiration date on multiple expired renewal offers at once.",{status:"Active",labels:["Resident relations"]})},{id:"306",...o("Resident Relations & Retention","intelligence","Generate Certifications","Apply gross rent changes across multiple affordable units to reflect updated rent schedules.",{status:"Active",labels:["Resident relations"]})},{id:"307",...o("Resident Relations & Retention","intelligence","Generate Recertification Notices","Send recertification notices to residents in bulk ahead of affordable housing compliance deadlines.",{status:"Active",labels:["Resident relations"]})},{id:"308",...o("Resident Relations & Retention","intelligence","Growth Stage Bulk Update","Update the growth stage classification for multiple commercial tenants at once.",{status:"Active",labels:["Resident relations"]})},{id:"309",...o("Resident Relations & Retention","intelligence","Is a Franchise Bulk Update","Update franchise status for multiple commercial tenants in a single action.",{status:"Active",labels:["Resident relations"]})},{id:"310",...o("Resident Relations & Retention","intelligence","Lease Type Update","Update lease type for multiple commercial tenants in a single operation.",{status:"Active",labels:["Resident relations"]})},{id:"311",...o("Resident Relations & Retention","intelligence","Legal Structure Bulk Update","Update the legal structure for multiple commercial tenants at once.",{status:"Active",labels:["Resident relations"]})},{id:"312",...o("Resident Relations & Retention","intelligence","Move-In Auto-Process","Auto-process move-in workflows, completing each step without manual intervention.",{status:"Coming Soon",labels:["Resident relations"]})},{id:"313",...o("Resident Relations & Retention","intelligence","Move-In Reviews Auto-Process","Automatically review and process move-in records, validating required items.",{status:"Active",labels:["Resident relations"]})},{id:"314",...o("Resident Relations & Retention","intelligence","Move-Out Auto-Process","Auto-process move-out workflows, completing each step without manual intervention.",{status:"Active",labels:["Resident relations"]})},{id:"315",...o("Resident Relations & Retention","intelligence","Non-Renewal Notice Email","Send non-renewal notice emails to multiple residents at once.",{status:"Active",labels:["Resident relations"]})},{id:"316",...o("Resident Relations & Retention","intelligence","Non-Renewal Notice Print","Generate printable non-renewal notices for multiple residents at once.",{status:"Active",labels:["Resident relations"]})},{id:"317",...o("Resident Relations & Retention","intelligence","Ownership Structure Update","Update ownership structure details for multiple commercial tenants in a single action.",{status:"Active",labels:["Resident relations"]})},{id:"318",...o("Resident Relations & Retention","intelligence","Renewal Offer Creation","Create renewal offers for multiple expiring leases in a single operation.",{status:"Active",labels:["Resident relations"]})},{id:"319",...o("Resident Relations & Retention","intelligence","Tenant Health Update","Update tenant health scores for multiple commercial tenants at once.",{status:"Active",labels:["Resident relations"]})},{id:"320",...o("Resident Relations & Retention","intelligence","Transfer Move-In","Auto-process the move-in side of unit transfers.",{status:"Active",labels:["Resident relations"]})},{id:"321",...o("Resident Relations & Retention","intelligence","Transfer Move-Out","Auto-process the move-out side of unit transfers.",{status:"Active",labels:["Resident relations"]})},{id:"9",...o("Resident Relations & Retention","operations","Renewal Operations","Sends renewal offers, generates lease documents, schedules follow-ups, and processes renewal executions.",{labels:["Resident relations"],runsCompleted:67,lastRunAt:"2026-02-19T10:00:00Z",lastRunStatus:"success",errorCount:0,avgRunDuration:"1m 30s",schedule:"Daily at 10:00 AM"})},{id:"10",...o("Operations & Maintenance","autonomous","Maintenance AI","Work orders, follow-up, scheduling",{status:"Active",vaultBinding:"SOPs: Maintenance escalation",channels:["Chat","Voice"],toolsAllowed:["Entrata Tools","Work orders"],conversationCount:78,resolutionRate:"89%",escalationsCount:8,revenueImpact:"$3.2K",labels:["Maintenance"]})},{id:"400",...o("Operations & Maintenance","intelligence","Add Baseline Images to Inspections","Automatically pulls images from the baseline inspection into the current inspection.",{status:"Active",labels:["Maintenance"]})},{id:"401",...o("Operations & Maintenance","intelligence","Add Home Warranty Agent","Enter warranty details for multiple homes at once with consistent information.",{status:"Active",labels:["Maintenance"]})},{id:"402",...o("Operations & Maintenance","intelligence","Bulk Enable Property Maps","Enable interactive map display settings across multiple properties at once.",{status:"Coming Soon",labels:["Maintenance"]})},{id:"403",...o("Operations & Maintenance","intelligence","Bulk Home Rented Agent","Update the rental status for multiple lots at once to reflect current occupancy.",{status:"Active",labels:["Maintenance"]})},{id:"404",...o("Operations & Maintenance","intelligence","Complete Make Readies","Automatically completes make readies that already have all subtasks complete.",{status:"Active",labels:["Maintenance"]})},{id:"405",...o("Operations & Maintenance","intelligence","Installation Complete Update","Mark home installations as complete across multiple records in a single action.",{status:"Active",labels:["Maintenance"]})},{id:"406",...o("Operations & Maintenance","intelligence","Inventory Status Update - Version 3","Manage student housing inventory, automating bed and room allocation across units.",{status:"Active",labels:["Maintenance"]})},{id:"407",...o("Operations & Maintenance","intelligence","Inventory Status Update - Version 4","Manage student housing inventory, automating bed and room allocation across units.",{status:"Active",labels:["Maintenance"]})},{id:"408",...o("Operations & Maintenance","intelligence","Lifecycle Status Update","Update lifecycle status for multiple manufactured homes to reflect current stage changes.",{status:"Active",labels:["Maintenance"]})},{id:"409",...o("Operations & Maintenance","intelligence","Lot Address Sync Agent","Synchronize lot addresses with property address records for consistency.",{status:"Active",labels:["Maintenance"]})},{id:"410",...o("Operations & Maintenance","intelligence","New/Used Update","The user selects which homes to update (from the Home Management listing) and the target New/Used value. The agent opens each home, enters edit mode, selects the value, saves, and moves to the next.",{status:"Active",labels:["Maintenance"]})},{id:"411",...o("Operations & Maintenance","intelligence","Suite Address Sync Agent","Synchronize suite addresses with property records for consistency across commercial properties.",{status:"Active",labels:["Maintenance"]})},{id:"412",...o("Operations & Maintenance","intelligence","Suite Sub-Type Bulk Update","Updates all selected suites to a chosen sub-type.",{status:"Active",labels:["Maintenance"]})},{id:"413",...o("Operations & Maintenance","intelligence","Update Home Condition Agent","The user selects which homes to update and the target Condition value. The agent opens each home, enters edit mode, selects the value in the Condition dropdown, saves, and moves to the next.",{status:"Active",labels:["Maintenance"]})},{id:"12",...o("Operations & Maintenance","operations","Maintenance Operations","Dispatches work orders to vendors, tracks SLA compliance, sends resident updates, and closes completed orders.",{labels:["Maintenance"],runsCompleted:234,lastRunAt:"2026-02-20T07:30:00Z",lastRunStatus:"success",errorCount:7,avgRunDuration:"3m 05s",schedule:"On new work order"})},{id:"500",...o("Risk Management & Compliance","operations","AI Settings","Currently AI settings allow users to set preferred words. These will allow users to set preferred words to replace words. For example, instead of 'tenant' use 'resident'. This list of words will then be taken into account where ELI is used to generate content i.e. blog, email and review responses.",{status:"Active",labels:["Compliance"]})},{id:"33",...o("Revenue & Financial Management","intelligence","Post Recurring Charges","Automatically posts recurring charges on your configured schedule each month — eliminating the need for manual charge posting across your entire portfolio.",{status:"Active",labels:["Accounting"],runsCompleted:1842,lastRunAt:"2026-05-14T06:00:00Z",lastRunStatus:"success",errorCount:4,avgRunDuration:"2m 18s",schedule:"Daily"})},{id:"34",...o("Resident Relations & Retention","intelligence","Generate Renewal Offers","Automatically generates renewal offers ahead of lease expirations, manages renewal pricing, controls approval workflows, and handles month-to-month options across your portfolio.",{status:"Active",labels:["Resident relations"],runsCompleted:968,lastRunAt:"2026-05-14T07:00:00Z",lastRunStatus:"success",errorCount:2,avgRunDuration:"3m 05s",schedule:"Daily"})},{id:"35",...o("Leasing & Marketing","intelligence","Automatically Assign a Leasing Agent","Controls how new leads are automatically assigned to leasing agents. Determines the logic used to distribute incoming leads across your team — from manual assignment to load-balanced auto-distribution.",{status:"Active",labels:["Leasing"],runsCompleted:3214,lastRunAt:"2026-05-14T09:30:00Z",lastRunStatus:"success",errorCount:1,avgRunDuration:"0m 08s",schedule:"On new lead"})},{id:"36",...o("Resident Relations & Retention","intelligence","Rebuild Renewal Offers When Pricing Changes","Automates the rebuilding of renewal offers whenever your rent pricing or any other pricing (e.g. fees, pet rent, parking charges, etc.) changes. Ensures residents always see current pricing until they lock in their renewal.",{status:"Active",labels:["Resident relations"],runsCompleted:587,lastRunAt:"2026-05-14T08:15:00Z",lastRunStatus:"success",errorCount:0,avgRunDuration:"1m 42s",schedule:"On pricing change"})},{id:"37",...o("Revenue & Financial Management","intelligence","Advance Accounting Periods","Automatically advances AR, AP, and GL accounting periods on your configured schedule each month — eliminating manual period advancement and ensuring your books stay on track without staff intervention.",{status:"Active",labels:["Accounting"],runsCompleted:426,lastRunAt:"2026-05-14T06:00:00Z",lastRunStatus:"success",errorCount:1,avgRunDuration:"1m 55s",schedule:"Monthly"})},{id:"38",...o("Revenue & Financial Management","intelligence","Lock Accounting Periods","Automatically locks AR, AP, and GL accounting periods on your configured schedule — preventing retroactive changes to closed periods and ensuring month-end reporting integrity across your portfolio.",{status:"Active",labels:["Accounting"],runsCompleted:398,lastRunAt:"2026-05-14T06:30:00Z",lastRunStatus:"success",errorCount:0,avgRunDuration:"1m 12s",schedule:"Monthly"})},{id:"39",...o("Operations & Maintenance","intelligence","L2 Bundled Settings Agent Template Example","A reference template demonstrating all available setting component types for L2 bundled-settings agents. Teams should follow this pattern when building new agents with per-property configuration.",{status:"Active",labels:["Template"],runsCompleted:0,lastRunAt:"2026-05-14T06:00:00Z",lastRunStatus:"success",errorCount:0,avgRunDuration:"0m 00s",schedule:"N/A"})},{id:"32",...o("Leasing & Marketing","fully_autonomous","Autonomous Lease Progression","Unified leasing intelligence — orchestrates application processing, screening decisions, lease execution, and resident communications through coordinated autonomous agents.",{status:"Active",labels:["Leasing"],runsCompleted:247,lastRunAt:"2026-05-13T08:00:00Z",lastRunStatus:"success",errorCount:2,avgRunDuration:"3m 42s",schedule:"Continuous"})},{id:"17",...o("Revenue & Financial Management","operations","Fees & Refunds Ops","Processes fee waivers, refund requests, and ledger adjustments based on approval rules.",{labels:["Payments"],runsCompleted:56,lastRunAt:"2026-02-19T14:00:00Z",lastRunStatus:"success",errorCount:1,avgRunDuration:"1m 15s",schedule:"On fee waiver request"})},{id:"19",...o("Leasing & Marketing","operations","Move-in Coordinator","Schedules move-ins, generates welcome packets, assigns parking, and triggers utility setup reminders.",{labels:["Leasing"],runsCompleted:34,lastRunAt:"2026-02-20T09:00:00Z",lastRunStatus:"success",errorCount:0,avgRunDuration:"2m 00s",schedule:"On lease execution"})},{id:"21",...o("Resident Relations & Retention","operations","Move-out Coordinator","Processes move-out notices, schedules inspections, calculates deposit returns, and initiates unit turnover.",{labels:["Resident relations"],runsCompleted:28,lastRunAt:"2026-02-19T16:00:00Z",lastRunStatus:"success",errorCount:2,avgRunDuration:"3m 30s",schedule:"On move-out notice"})},{id:"23",...o("Operations & Maintenance","operations","After-hours Dispatch","Routes after-hours emergency work orders to on-call vendors and sends resident status updates.",{labels:["Maintenance"],runsCompleted:19,lastRunAt:"2026-02-19T23:45:00Z",lastRunStatus:"success",errorCount:0,avgRunDuration:"45s",schedule:"On emergency work order (after 6 PM)"})},{id:"ee-experts",...o("Operations & Maintenance","intelligence","Entrata Experts","Conversational AI hub — Analyst, pre-built Assistants, and Report Analyzer for property teams.",{status:"Active",labels:["AI Hub"]})}],l="janet-poc-agents-v13",d=(0,i.createContext)(null);function c({children:e}){let[t,n]=(0,i.useState)(s),[o,u]=(0,i.useState)(!1);(0,i.useEffect)(()=>{try{let e=localStorage.getItem(l);if(e){let t=JSON.parse(e);if(Array.isArray(t)){let e=new Map(s.map(e=>[e.id,e]));r.map(e=>e.value);let a=new Set(s.map(e=>e.id)),i=t.filter(t=>a.has(t.id)||!1==!e.get(t.id)).map(t=>{let n,a=e.get(t.id);return a?{...a,...t,type:a.type,bucket:a.bucket,status:"Off"===a.status?"Off":(n=t.status,"Training"===n?"Active":n)}:null}).filter(Boolean),o=new Set(t.map(e=>e.id)),l=s.filter(e=>!o.has(e.id));n(l.length>0?[...i,...l]:i)}}}catch{}u(!0)},[]),(0,i.useEffect)(()=>{if(o)try{localStorage.setItem(l,JSON.stringify(t))}catch{}},[t,o]);let p=(0,i.useCallback)(e=>{n(t=>[...t,{...e,id:String(Date.now())}])},[]),m=(0,i.useCallback)((e,t)=>{n(n=>n.map(n=>n.id===e?{...n,...t}:n))},[]),g=(0,i.useCallback)(()=>{n(e=>e.map(e=>"Active"===e.status?{...e,status:"Suspended"}:e))},[]),h=t.filter(e=>"Active"===e.status).length,f=t.length>0&&t.every(e=>"Suspended"===e.status||"Off"===e.status);return(0,a.jsx)(d.Provider,{value:{agents:t,setAgents:n,addAgent:p,updateAgent:m,suspendAll:g,agentsEnabledCount:h,emergencySuspended:f},children:e})}function u(){let e=(0,i.useContext)(d);if(!e)throw Error("useAgents must be used within AgentsProvider");return e}},80910:(e,t,n)=>{n.d(t,{f:()=>s,z:()=>l});var a=n(95155),i=n(12115);let r="janet-poc-go-live-v2",o=(0,i.createContext)(null);function s({children:e}){let[t,n]=(0,i.useState)(!1),[l,d]=(0,i.useState)([]),[c,u]=(0,i.useState)(!1),[p,m]=(0,i.useState)(!1),[g,h]=(0,i.useState)(!1);(0,i.useEffect)(()=>{try{let e=localStorage.getItem(r);if(e){let t=JSON.parse(e);t.goLive&&n(!0),Array.isArray(t.steps)&&d(t.steps),t.entrataConnected&&u(!0),t.testRunDone&&m(!0)}}catch{}h(!0)},[]);let f=(0,i.useCallback)(e=>{n(e);try{let t=localStorage.getItem(r),n=t?JSON.parse(t):{};localStorage.setItem(r,JSON.stringify({...n,goLive:e}))}catch{}},[]),y=(0,i.useCallback)((e,t)=>{d(n=>{let a=t?n.includes(e)?n:[...n,e].sort((e,t)=>e-t):n.filter(t=>t!==e);try{let e=localStorage.getItem(r),t=e?JSON.parse(e):{};localStorage.setItem(r,JSON.stringify({...t,steps:a}))}catch{}return a})},[]),v=(0,i.useCallback)(e=>{u(e);try{let t=localStorage.getItem(r),n=t?JSON.parse(t):{};localStorage.setItem(r,JSON.stringify({...n,entrataConnected:e}))}catch{}},[]),b=(0,i.useCallback)(e=>{m(e);try{let t=localStorage.getItem(r),n=t?JSON.parse(t):{};localStorage.setItem(r,JSON.stringify({...n,testRunDone:e}))}catch{}},[]);return(0,i.useEffect)(()=>{if(!g)return;let e=localStorage.getItem(r),t=e?JSON.parse(e):{};localStorage.setItem(r,JSON.stringify({...t,steps:l,entrataConnected:c,testRunDone:p}))},[l,c,p,g]),(0,a.jsx)(o.Provider,{value:{goLiveComplete:t,setGoLiveComplete:f,completedSteps:l,setStepComplete:y,entrataConnected:c,setEntrataConnected:v,testRunDone:p,setTestRunDone:b},children:e})}function l(){let e=(0,i.useContext)(o);if(!e)throw Error("useSetup must be used within SetupProvider");return e}},82791:(e,t,n)=>{n.d(t,{c0:()=>a.c0});var a=n(15682)},83591:(e,t,n)=>{n.d(t,{Av:()=>m,uk:()=>p});var a=n(95155),i=n(12115),r=n(96192);let o="janet-poc-governance-v3",s=[{id:"screening",label:"Tenant Screening",risk:"high",description:"Application screening, background checks, and admission decisions.",defaultApprovalGate:!0,defaultPolicyCheck:!0,defaultRequiredDocs:["Tenant screening & background checks","Fair housing & anti-discrimination"]},{id:"eviction",label:"Eviction & Notices",risk:"critical",description:"Eviction filings, legal notices, and lease termination actions.",defaultApprovalGate:!0,defaultPolicyCheck:!0,defaultRequiredDocs:["Eviction & lease termination"]},{id:"accommodation",label:"Reasonable Accommodation",risk:"critical",description:"Disability accommodation requests, ESA processing, and modifications.",defaultApprovalGate:!0,defaultPolicyCheck:!0,defaultRequiredDocs:["Reasonable accommodation & assistive animals","Fair housing & anti-discrimination"]},{id:"refunds",label:"Refunds & Fee Waivers",risk:"medium",description:"Security deposit refunds, late fee waivers, and financial concessions.",defaultApprovalGate:!0,defaultPolicyCheck:!1,defaultRequiredDocs:["Security deposit handling","Rent collection & late fees"]},{id:"lease_terms",label:"Lease Terms & Enforcement",risk:"high",description:"Lease clause interpretation, rent adjustments, and term enforcement.",defaultApprovalGate:!1,defaultPolicyCheck:!0,defaultRequiredDocs:[]},{id:"advertising",label:"Advertising & Marketing",risk:"medium",description:"Listing content, ad targeting, and promotional communications.",defaultApprovalGate:!1,defaultPolicyCheck:!0,defaultRequiredDocs:["Fair housing & anti-discrimination"]}],l=[{id:"agent_response",label:"Agent Responses",description:"All AI-generated messages sent to residents or staff"},{id:"tool_call",label:"Tool & API Calls",description:"Every tool invocation and external API call"},{id:"document_retrieval",label:"Document Retrievals",description:"Which SOPs/docs were grounded on for each response"},{id:"escalation",label:"Escalations",description:"All escalation events, routing decisions, and outcomes"},{id:"approval",label:"Approval Decisions",description:"Human approve/deny actions on agent proposals"},{id:"config_change",label:"Configuration Changes",description:"Any changes to agent settings, guardrails, or governance"}],d=[{id:"humanReview",label:"Human-in-the-Loop Review",description:"Require human review for high-risk agent outputs before they reach residents.",settings:[{id:"hrHighRisk",label:"Require review for high-risk activities",default:!0},{id:"hrNewAgents",label:"Auto-enable shadow mode for newly deployed agents",default:!0},{id:"hrFinancial",label:"Require approval for financial transactions above threshold",default:!0}]},{id:"outputFilters",label:"Output Safety Filters",description:"Filters that prevent agents from generating harmful, non-compliant, or sensitive content.",settings:[{id:"ofPii",label:"PII redaction in logs and exports",default:!0},{id:"ofDiscriminatory",label:"Block discriminatory language patterns",default:!0},{id:"ofLegal",label:"Flag legal advice or liability-creating statements",default:!0},{id:"ofPromptInjection",label:"Prompt injection detection and blocking",default:!0}]},{id:"fairHousing",label:"Fair Housing Posture",description:"Aligned with HUD May 2024 guidance. Ensures screening criteria are consistent, transparent, and documented.",settings:[{id:"fhConsistentCriteria",label:"Enforce consistent screening criteria across properties",default:!0},{id:"fhApprovedDocsOnly",label:"Ground agent responses in approved documents only",default:!0},{id:"fhPolicyContradiction",label:"Check responses against policy before sending",default:!1},{id:"fhDisputeRights",label:"Inform applicants of dispute rights in screening decisions",default:!0}]},{id:"frameworks",label:"Industry Framework Alignment",description:"Track alignment with recognized AI governance frameworks to demonstrate responsible AI practices.",settings:[{id:"fwNistRmf",label:"NIST AI Risk Management Framework (AI RMF 1.0)",default:!0},{id:"fwEuAiAct",label:"EU AI Act — high-risk system requirements",default:!1},{id:"fwBidenEo",label:"Executive Order 14110 — Safe AI",default:!1},{id:"fwNaahq",label:"NAAHQ AI guidance for multifamily",default:!0}]}];function c(){let e={};for(let t of s)e[t.id]={enabled:!1,approvalGate:t.defaultApprovalGate,policyCheck:t.defaultPolicyCheck,requiredDocs:[...t.defaultRequiredDocs],scope:"all",scopedAgentIds:[]};return{activities:e,requiredDocs:r.$1.map(e=>({document:e,required:!0,activities:s.filter(t=>t.defaultRequiredDocs.includes(e)).map(e=>e.id)})),lifecycle:{enforceShadowMode:!0,shadowDurationDays:7,killSwitchEnabled:!0,autoSuspendOnErrors:!0,errorThreshold:5,requireApprovalForActivation:!0},audit:{enabledEvents:Object.fromEntries(l.map(e=>[e.id,!0])),retentionDays:365,exportFormat:"json",traceEnabled:!0,traceIdFormat:"uuid",realTimeAlerts:!0},generalAi:Object.fromEntries(d.flatMap(e=>e.settings.map(e=>[e.id,e.default])))}}let u=(0,i.createContext)(null);function p({children:e}){let[t,n]=(0,i.useState)(c);(0,i.useEffect)(()=>{try{let e=localStorage.getItem(o);if(e){let t=JSON.parse(e);n(e=>({activities:{...e.activities,...t.activities},requiredDocs:t.requiredDocs??e.requiredDocs,lifecycle:{...e.lifecycle,...t.lifecycle},audit:{...e.audit,...t.audit,enabledEvents:{...e.audit.enabledEvents,...t.audit?.enabledEvents}},generalAi:{...e.generalAi,...t.generalAi}}))}}catch{}},[]);let r=(0,i.useCallback)(e=>{try{localStorage.setItem(o,JSON.stringify(e))}catch{}},[]),s=(0,i.useCallback)(e=>{n(t=>{let n=e(t);return r(n),n})},[r]),l=(0,i.useCallback)((e,t)=>{s(n=>({...n,activities:{...n.activities,[e]:{...n.activities[e],...t}}}))},[s]),d=(0,i.useCallback)(e=>{s(t=>({...t,lifecycle:{...t.lifecycle,...e}}))},[s]),m=(0,i.useCallback)(e=>{s(t=>({...t,audit:{...t.audit,...e}}))},[s]),g=(0,i.useCallback)(e=>{s(t=>({...t,generalAi:{...t.generalAi,[e]:!t.generalAi[e]}}))},[s]),h=(0,i.useCallback)(e=>{s(t=>{let n=[...t.requiredDocs];return n[e]={...n[e],required:!n[e].required},{...t,requiredDocs:n}})},[s]),f=Object.values(t.activities).filter(e=>e.enabled).length;return(0,a.jsx)(u.Provider,{value:{state:t,updateState:s,updateActivity:l,updateLifecycle:d,updateAudit:m,toggleGeneralAi:g,toggleDocRequired:h,enabledGuardrailCount:f},children:e})}function m(){let e=(0,i.useContext)(u);if(!e)throw Error("useGovernance must be used within GovernanceProvider");return e}},96192:(e,t,n)=>{n.d(t,{$1:()=>T,EY:()=>F,Gy:()=>q});var a=n(95155),i=n(12115),r=n(8083);let o={view:["group:grp-admin"],edit:[],approve:[],approvalRouting:"new"},s=`RESIDENTIAL LEASE AGREEMENT
Bishop Arts Landing — Standard Form (prior)

1. PARTIES
This Lease Agreement ("Lease") is entered into between Kestrel Residential LLC ("Landlord") and the Resident(s) identified on the attached cover sheet ("Resident"). Landlord manages the property on behalf of the Owner identified in the cover sheet.

2. PREMISES
Landlord leases to Resident the dwelling unit identified on the cover sheet ("Premises"), together with the right to use common areas and community amenities in accordance with posted community rules.

3. TERM
The initial lease term is twelve (12) months, beginning on the Start Date and ending on the End Date specified on the cover sheet. If Resident holds over after the End Date without executing a renewal, this Lease converts to a month-to-month tenancy at 150% of the then-current monthly rent, terminable by either party with thirty (30) days written notice.

4. RENT AND CHARGES
  • Base rent is due on the 1st of each calendar month.
  • Late fees are assessed in accordance with the Kestrel Residential Late Fee SOP.
  • Returned or dishonored payments incur a $35 NSF fee per occurrence.
  • Rent payments may be made via the Entrata Resident Portal, check, or money order.

5. SECURITY DEPOSIT
  • A security deposit equal to one (1) month's rent is due at lease signing.
  • The deposit will be held in accordance with applicable state law.
  • Landlord will return the deposit less documented deductions within the timeframe required by state law (default 30 days).
  • An itemized statement of deductions will accompany any partial return.

6. PET DEPOSIT
  • A refundable pet deposit of $300 per approved animal is due prior to move-in.
  • Pets must be registered and approved through the Kestrel Residential pet screening process.
  • The pet deposit is refundable less documented damage attributable to the animal.

7. OCCUPANCY
Only the named Resident(s) and approved occupants may reside in the Premises. Guests staying more than fourteen (14) consecutive days require prior written approval from management.

8. MAINTENANCE AND REPAIRS
  • Resident must report maintenance issues promptly via the Entrata Resident Portal or by contacting the leasing office.
  • Emergency maintenance (no heat, flooding, gas leak, lockout after hours) is available 24/7.
  • Resident is responsible for maintaining the Premises in a clean and sanitary condition.

9. COMMUNITY RULES
Resident agrees to abide by community rules posted in the Entrata Resident Portal, including quiet hours (10 p.m. to 8 a.m.), parking assignments, and amenity reservations.

10. DEFAULT AND REMEDIES
Failure to pay rent or a material breach of this Lease may result in notices required by Texas law and, if uncured, eviction proceedings.

11. NOTICES
All notices required under this Lease shall be delivered in writing to the addresses on the cover sheet.`,l=`RESIDENTIAL LEASE AGREEMENT
Bishop Arts Landing — Standard Form

1. PARTIES
This Lease Agreement ("Lease") is entered into between Kestrel Residential LLC ("Landlord") and the Resident(s) identified on the attached cover sheet ("Resident"). Landlord manages the property on behalf of the Owner identified in the cover sheet.

2. PREMISES
Landlord leases to Resident the dwelling unit identified on the cover sheet ("Premises"), together with the right to use common areas, community amenities, and assigned parking (if applicable) in accordance with posted community rules.

3. TERM
The initial lease term is thirteen (13) months, beginning on the Start Date and ending on the End Date specified on the cover sheet. If Resident holds over after the End Date without executing a renewal, this Lease converts to a month-to-month tenancy at 150% of the then-current monthly rent, terminable by either party with thirty (30) days written notice.

4. RENT AND CHARGES
  • Base rent is due on the 1st of each calendar month.
  • Late fees are assessed in accordance with the Kestrel Residential Late Fee SOP. A grace period may apply as specified on the cover sheet.
  • Returned or dishonored payments incur a $35 NSF fee per occurrence.
  • Rent payments may be made via the Entrata Resident Portal, check, or money order. Cash is not accepted at the leasing office.
  • Resident may enroll in autopay through the Entrata Resident Portal; autopay does not waive late fees if funding fails.

5. SECURITY DEPOSIT
  • A security deposit equal to one (1) month's rent is due at lease signing.
  • The deposit will be held in accordance with applicable state law.
  • Landlord will return the deposit less documented deductions within the timeframe required by state law (default 30 days).
  • An itemized statement of deductions will accompany any partial return.
  • Deductions may include unpaid rent, cleaning beyond normal wear, damage repairs, and unreturned keys or access devices.

6. PET DEPOSIT
  • A refundable pet deposit of $400 per approved animal is due prior to move-in.
  • Pets must be registered and approved through the Kestrel Residential pet screening process prior to occupancy.
  • The pet deposit is refundable less documented damage attributable to the animal.
  • Breed, size, and quantity restrictions are detailed in the Kestrel Residential Pet Policy.
  • Assistive animals (service animals and emotional support animals with valid documentation) are not subject to pet deposits or breed restrictions.

7. OCCUPANCY
Only the named Resident(s) and approved occupants listed on the cover sheet may reside in the Premises. Guests staying more than fourteen (14) consecutive days or more than twenty-one (21) days in any sixty-day period require prior written approval from management.

8. MAINTENANCE AND REPAIRS
  • Resident must report maintenance issues promptly via the Entrata Resident Portal or by contacting the leasing office.
  • Emergency maintenance (no heat, flooding, gas leak, fire, lockout after hours) is available 24/7 through the emergency maintenance line.
  • Resident is responsible for maintaining the Premises in a clean and sanitary condition and for damage caused by Resident, occupants, or guests beyond normal wear and tear.
  • Landlord will make repairs within a commercially reasonable timeframe. Emergency repairs will be addressed within 24 hours.

9. COMMUNITY RULES
Resident agrees to abide by all community rules and policies posted in the Entrata Resident Portal, including but not limited to:
  • Quiet hours: 10:00 p.m. to 8:00 a.m.
  • Parking assignments and towing policy
  • Amenity reservation and usage guidelines
  • Trash and recycling procedures
  • Smoking is prohibited in the unit and in all indoor common areas.

10. UTILITIES
Resident is responsible for establishing and maintaining utility accounts for services specified on the cover sheet. Landlord-provided utilities (if any) are identified on the cover sheet and may be subject to a utility surcharge.

11. RENTERS INSURANCE
Resident is required to maintain renters insurance with a minimum coverage of $100,000 in personal liability throughout the lease term. Proof of insurance must be provided prior to key handover and must list Kestrel Residential LLC as an interested party.

12. DEFAULT AND REMEDIES
Failure to pay rent when due or a material breach of this Lease may result in notices as required by applicable state law and, if the breach remains uncured within the statutory period, eviction proceedings. Landlord reserves all remedies available under law.

13. NOTICES
All notices required under this Lease shall be delivered in writing to the addresses on the cover sheet, via personal delivery, first-class mail, or email to the addresses on file in Entrata.

14. ELECTRONIC SIGNATURES
This Lease may be executed electronically via the Entrata e-signature platform. An electronically signed PDF counterpart shall have the same legal force and effect as an original wet signature.`,d=`LEASING STANDARD OPERATING PROCEDURE
Kestrel Residential — All Properties

Effective Date: February 2025  |  Version 2.1  |  Owner: Director of Leasing

1. PURPOSE
This SOP establishes consistent standards for the leasing process across all Kestrel Residential properties, from initial lead intake through move-in completion.

2. LEAD INTAKE AND RESPONSE STANDARDS
  2.1. All leads must be entered in Entrata > Leasing > Leads within one (1) business hour of receipt.
  2.2. Response time standards:
    • Phone inquiries: answer within 3 rings or return call within 30 minutes
    • Email and web leads: respond within 2 hours during business hours
    • Walk-in prospects: greet within 2 minutes of arrival
    • After-hours inquiries: ELI+ leasing agent provides immediate automated response with next-day follow-up from on-site team
  2.3. All lead sources must be accurately tracked in Entrata for marketing attribution.
  2.4. AI Agent Guidelines: ELI+ leasing agents may qualify leads, answer availability and pricing questions, and schedule tours. Agents must not quote lease terms that differ from the current approved rate sheet.

3. TOUR SCHEDULING AND EXECUTION
  3.1. Tours should be offered within 24 hours of initial inquiry.
  3.2. Confirm all tours via email and text message 24 hours in advance using the Entrata communication templates.
  3.3. Tour route: leasing office > model or available unit > amenities > return to office for application discussion.
  3.4. Self-guided tours may be offered via smart lock access for prospects who complete identity verification in the Entrata Applicant Portal.
  3.5. Follow up with all toured prospects within 24 hours via their preferred contact method.
  3.6. Log tour outcome in Entrata > Leasing > Guest Cards with the appropriate status: toured, applied, lost (with reason code), or follow-up scheduled.

4. APPLICATION PROCESSING
  4.1. Application fee is non-refundable and must be collected at time of submission through Entrata.
  4.2. All applicants must complete the Kestrel Residential standard application form via the Entrata Applicant Portal.
  4.3. Required documentation: government-issued photo ID, proof of income (two most recent pay stubs or offer letter), and a completed application for each adult occupant age 18 and older.
  4.4. Applications must be submitted to screening within 4 business hours of receipt.

5. SCREENING CRITERIA
  5.1. Income requirement: combined gross monthly income must equal or exceed 3x the monthly rent.
  5.2. Credit: minimum score of 580. Applicants below 580 may qualify with an additional deposit equal to one month's rent.
  5.3. Rental history: no eviction filings in the past 5 years and no outstanding balances owed to prior landlords.
  5.4. Criminal background: evaluated per Kestrel Residential's individualized assessment policy in compliance with local fair housing regulations.
  5.5. All screening criteria must be applied uniformly. See the Fair Housing and Anti-Discrimination Policy for guidance.

6. APPROVAL AND DENIAL WORKFLOW
  6.1. Standard approvals: Leasing Consultant may approve applicants meeting all criteria.
  6.2. Conditional approvals (additional deposit or guarantor required): Leasing Manager approval required.
  6.3. Denials: Leasing Manager must review before an adverse action notice is issued.
  6.4. Adverse action notices must be generated through Entrata and sent within 24 hours of denial.
  6.5. All approval and denial decisions must be documented in Entrata > Leasing > Applications with the reason code.
  6.6. AI Agent Guidelines: ELI+ agents must not communicate approval or denial decisions directly. All disposition communication must come from a human team member.

7. LEASE PREPARATION
  7.1. Generate the lease document from the property-specific template in Entrata > Documents > Lease Templates.
  7.2. Verify all terms: unit number, lease start and end dates, monthly rent, concessions, pet addendum, and parking addendum.
  7.3. Lease must be reviewed by the Leasing Manager before sending to the applicant for signature.
  7.4. E-signatures are collected through the Entrata e-sign platform. Wet signatures are accepted if e-sign is unavailable.
  7.5. Lease must be fully executed (all parties signed) at least 48 hours before the scheduled move-in date.

8. MOVE-IN PROCEDURES
  8.1. Pre-move-in checklist must be completed in Entrata at least 3 business days before the move-in date:
    • All deposits and first month's rent collected
    • Renters insurance verification on file
    • Utility transfer confirmation received
    • Move-in inspection form generated
  8.2. Conduct unit walkthrough with Resident using the Entrata move-in inspection form. Photograph and document all pre-existing conditions.
  8.3. Key and access handover: issue all keys, fobs, mailbox keys, and parking credentials. Log all items in Entrata > Residents > Key Tracking.
  8.4. Provide welcome packet including emergency contacts, community rules, amenity information, and Entrata Resident Portal setup instructions.
  8.5. Update unit status in Entrata from "Approved" to "Moved In" on the move-in date.

9. DOCUMENTATION AND COMPLIANCE
  9.1. All leasing files must be complete in Entrata within 48 hours of move-in.
  9.2. Required file contents: signed lease, application, screening report, ID copy, income verification, move-in inspection, and insurance certificate.
  9.3. Review the Fair Housing and Anti-Discrimination Policy before every leasing interaction.
  9.4. All leasing staff must complete fair housing training annually through the Kestrel Residential learning management system.`,c=`REFUND POLICY — Standard Operating Procedure

1. SCOPE
This policy applies to all refund requests received from current and former residents across all managed properties.

2. ELIGIBILITY
Refunds may be issued for:
  • Security deposit returns (per state-specific timelines)
  • Overpayment of rent or fees
  • Duplicate payment corrections
  • Cancelled amenity or service fees (if within 48-hour window)

3. APPROVAL THRESHOLDS
  • Up to $200 — Site-level manager may approve
  • $200–$400 — Regional manager approval required
  • Over $400 — VP of Operations approval required

4. PROCESSING TIMELINE
  • Standard refunds: processed within 10 business days of approval
  • Security deposits: per applicable state law (default 30 days if not specified)

5. DOCUMENTATION REQUIREMENTS
All refunds must include:
  • Original payment reference or receipt
  • Written refund request from resident (email acceptable)
  • Manager approval notation in system`,u=`REFUND POLICY — Standard Operating Procedure
Kestrel Residential — All Properties

Effective Date: January 2025  |  Version 1.0  |  Owner: VP of Operations

1. SCOPE
This policy applies to all refund requests received from current and former residents across all Kestrel Residential managed properties.

2. ELIGIBILITY
Refunds may be issued for:
  • Security deposit returns (per state-specific timelines)
  • Overpayment of rent or fees
  • Duplicate payment corrections
  • Cancelled amenity or service fees (if within 48-hour window)
  • Move-in fee adjustments when unit condition differs materially from showing
  • Prorated rent adjustments for early lease termination under approved circumstances

3. APPROVAL THRESHOLDS
  • Up to $250 — Site-level Property Manager may approve
  • $250–$500 — Regional Manager approval required
  • Over $500 — VP of Operations approval required
  • Any refund involving a legal dispute or complaint to a regulatory agency requires Legal review regardless of amount

4. PROCESSING TIMELINE
  • Standard refunds: processed within 5 business days of final approval
  • Security deposits: per applicable state law (default 30 days from move-out if state does not specify)
  • Emergency or hardship refunds: processed within 2 business days
  • Refund checks are issued via the accounts payable cycle. Direct deposit refunds are available for residents with active Entrata payment profiles.

5. DOCUMENTATION REQUIREMENTS
All refunds must include:
  • Original payment reference or ledger transaction ID in Entrata
  • Written refund request from resident (email, portal message, or letter)
  • Manager approval notation and reason code in Entrata > Accounting > Refunds
  • Supporting documentation (photos, inspection report, or correspondence) if related to deposit deductions
  • Final account statement showing refund calculation

6. AI AGENT GUIDELINES
  • ELI+ agents may acknowledge refund requests, confirm receipt, and set expectations on processing timeline
  • Agents must NOT commit to specific refund amounts or approve/deny refund requests
  • Agents must NOT discuss deposit deduction details without manager review
  • Refund requests over $500 must be escalated to a human manager immediately
  • Agent should reference this policy when explaining the refund process to residents
  • If a resident disputes a deduction, the agent must create an escalation ticket and notify the Property Manager within 1 business hour

7. AI ESCALATION RULES
  • Tier 1 (ELI+ auto-handle): refund status inquiries, receipt confirmation, timeline updates
  • Tier 2 (escalate to site manager): refund requests under $250 with complete documentation, standard deposit return questions
  • Tier 3 (escalate to regional): refund requests $250–$500, disputes over deduction amounts, requests involving legal threats
  • Tier 4 (escalate to VP Operations + Legal): refund requests over $500, regulatory complaints, media-related inquiries, repeat disputes from the same resident
  • Escalation must include: resident name, unit, refund amount requested, reason, and all prior communication history

8. DOCUMENTATION RETENTION
  • All refund-related documents must be retained in Entrata for a minimum of 7 years
  • Security deposit itemization letters must be retained for the duration required by applicable state law (minimum 3 years)
  • Refund approval chains (email threads, system approvals) must be attached to the resident ledger in Entrata
  • Disputed refunds require a separate file note documenting the resolution and any concessions made

9. RESIDENT COMMUNICATION STANDARDS
  • Acknowledge all refund requests within 1 business day
  • Provide written confirmation of refund amount and expected timeline within 3 business days of approval
  • If a refund is denied or reduced, provide a written explanation with itemized deductions
  • Use the following communication templates in Entrata > Communications > Templates:
    - "Refund Request Received" — sent upon intake
    - "Refund Approved — Processing" — sent upon approval
    - "Refund Denied — Explanation" — sent with itemized reasoning
    - "Security Deposit Return" — sent with final deposit accounting
  • All refund communications must include the Kestrel Residential customer service phone number and a reference to the resident's right to dispute`,p=`MAINTENANCE ESCALATION STANDARD OPERATING PROCEDURE
Kestrel Residential — All Properties

Effective Date: August 2026  |  Version 1.2  |  Owner: Director of Maintenance

1. PURPOSE
This SOP defines triage categories, dispatch rules, vendor escalation paths, and communication standards for all maintenance requests across Kestrel Residential properties.

2. TRIAGE CATEGORIES
  2.1. Emergency (respond within 1 hour):
    • No heat (when outdoor temperature is below 55\xb0F)
    • Flooding or active water intrusion
    • Gas leak or carbon monoxide alarm
    • Fire or fire alarm malfunction
    • Sewage backup
    • Lock-out after business hours (if sole access is compromised)
    • Electrical hazard (exposed wiring, sparking outlet)
  2.2. Urgent (respond within 4 hours during business hours, next business day if after hours):
    • No hot water
    • HVAC failure (non-emergency temperature range)
    • Refrigerator or freezer not cooling
    • Toilet not functioning (single-bathroom unit)
    • Significant pest issue (e.g., rodents, bedbugs)
  2.3. Routine (respond within 48 business hours):
    • Minor plumbing (dripping faucet, running toilet in multi-bath unit)
    • Appliance repair (dishwasher, disposal, washer/dryer connections)
    • Cosmetic issues (paint, caulking, weather stripping)
    • Light fixture or ceiling fan replacement
    • Screen or window hardware repair

3. DISPATCH RULES
  3.1. All work orders must be entered in Entrata > Maintenance > Work Orders before dispatch.
  3.2. On-site maintenance technicians are dispatched first for all urgent and routine requests.
  3.3. If the on-site team cannot resolve within the response window, escalate to an approved vendor from the Kestrel Residential preferred vendor list.
  3.4. Emergency requests during business hours: dispatch on-site tech immediately and notify the Maintenance Supervisor.
  3.5. Emergency requests after hours: contact the on-call technician via the after-hours answering service. If no response within 15 minutes, dispatch the emergency vendor.

4. VENDOR ESCALATION
  4.1. Only vendors on the Kestrel Residential approved vendor list may be dispatched.
  4.2. Vendor dispatch requires a purchase order (PO) created in Entrata > Purchasing > Purchase Orders.
  4.3. PO thresholds: up to $500 — Maintenance Supervisor approval; $500–$2,500 — Property Manager approval; over $2,500 — Regional Manager approval.
  4.4. Emergency vendor dispatch may proceed before PO approval is obtained, but the PO must be created within 24 hours.

5. RESIDENT COMMUNICATION
  5.1. Acknowledge all maintenance requests within 2 hours during business hours via the Entrata Resident Portal or text.
  5.2. Notify the resident of estimated arrival time before dispatching a technician.
  5.3. If a repair requires a return visit or parts order, notify the resident of the expected timeline within 4 hours.
  5.4. Upon completion, update the work order status in Entrata and send a completion notification.
  5.5. AI Agent Guidelines: ELI+ agents may receive maintenance requests, triage based on the categories above, set timeline expectations, and create work orders in Entrata. Agents must escalate any request involving health, safety, or habitability to a human team member immediately.

6. AFTER-HOURS PROTOCOL
  6.1. After-hours is defined as weekdays 6:00 p.m. to 8:00 a.m., weekends, and observed holidays.
  6.2. Only Emergency-category requests are dispatched after hours.
  6.3. The on-call technician rotation is posted weekly in Entrata > Maintenance > On-Call Schedule.
  6.4. If the on-call technician does not respond within 15 minutes, the Maintenance Supervisor is contacted. If the Supervisor is unreachable, the Property Manager is the final escalation.
  6.5. All after-hours dispatches must be documented in the work order with the time of each contact attempt.

7. COMPLETION AND DOCUMENTATION
  7.1. Technicians must update work order notes in Entrata upon completion, including work performed, parts used, and time spent.
  7.2. Photograph completed work for all repairs involving plumbing, electrical, HVAC, or structural components.
  7.3. Resident satisfaction follow-up: send automated survey via Entrata within 24 hours of work order closure.
  7.4. Work orders must be closed in Entrata within 48 hours of completion. Open work orders older than 7 days are flagged for Maintenance Supervisor review.`,m=`FAIR HOUSING AND ANTI-DISCRIMINATION POLICY
Kestrel Residential — All Properties

Effective Date: January 2025  |  Version 1.2  |  Owner: Compliance Director

1. POLICY STATEMENT
Kestrel Residential is committed to full compliance with the federal Fair Housing Act, the Americans with Disabilities Act, and all applicable state and local fair housing laws. All team members, contractors, and AI agents acting on behalf of Kestrel Residential must adhere to this policy without exception.

2. PROTECTED CLASSES
It is illegal to discriminate in the sale, rental, or financing of housing based on:
  • Race or color
  • Religion
  • National origin
  • Sex (including sexual orientation and gender identity)
  • Familial status (families with children under 18, pregnant persons)
  • Disability (physical or mental)
  • Additional state and local protections may apply (e.g., source of income, veteran status, marital status). Consult the property-specific addendum in Entrata > Documents > Compliance for applicable local protections.

3. REASONABLE ACCOMMODATION AND MODIFICATION PROCEDURES
  3.1. Residents and applicants may request reasonable accommodations (changes to rules, policies, or services) or reasonable modifications (physical changes to the unit or common areas) at any time.
  3.2. Requests should be directed to the Property Manager and documented in Entrata > Residents > Accommodation Requests.
  3.3. Kestrel Residential will engage in an interactive process with the requestor. Responses must be provided within 10 business days.
  3.4. Accommodations may not be denied without review by the Compliance Director. If a request is denied, the denial must cite a specific, legally supported reason and offer alternatives when possible.
  3.5. Assistive animals (service animals and emotional support animals with valid documentation) must be approved regardless of pet policies, breed restrictions, or pet deposits.
  3.6. AI Agent Guidelines: ELI+ agents must not deny, discourage, or delay any accommodation request. All accommodation requests received by an AI agent must be immediately routed to the Property Manager.

4. ADVERTISING AND MARKETING GUIDELINES
  4.1. All advertising must use the Equal Housing Opportunity logo and statement.
  4.2. Do not reference preferences or limitations related to any protected class in listing descriptions, social media, or printed materials.
  4.3. Use inclusive imagery that represents diverse populations.
  4.4. Phrases to avoid: "perfect for young professionals," "no children," "Christian community," "walking distance to church," "able-bodied," or any language that could imply a preference or exclusion.
  4.5. All advertising content must be reviewed by the Marketing team and approved by the Compliance Director before publication.

5. APPLICATION AND SCREENING RULES
  5.1. Identical screening criteria must be applied to every applicant for the same unit type at the same property.
  5.2. Do not ask about disability, familial status, religion, national origin, or any protected class during the application process.
  5.3. Criminal background screening must follow the Kestrel Residential Individualized Assessment Policy, which evaluates the nature, severity, and recency of any offense rather than applying blanket disqualifications.
  5.4. Source-of-income protections: where local law prohibits discrimination based on source of income, housing vouchers and other lawful income sources must be accepted.
  5.5. All denial decisions must be documented with objective criteria and reviewed by the Leasing Manager.

6. DOCUMENTATION REQUIREMENTS
  6.1. Maintain records of all applications, screening results, and disposition decisions in Entrata for a minimum of 5 years.
  6.2. Accommodation request files (including interactive process notes and supporting documentation) must be retained for 3 years after the resident's lease ends.
  6.3. Any fair housing complaint or inquiry from a government agency must be immediately reported to the Compliance Director and retained indefinitely.

7. TRAINING REQUIREMENTS
  7.1. All leasing, management, and maintenance staff must complete fair housing training within 30 days of hire and annually thereafter.
  7.2. Training completion is tracked in the Kestrel Residential learning management system. Non-compliance is reported to the Regional Manager.
  7.3. AI agents operating in leasing, communications, or resident service roles must be trained on this policy and re-trained whenever the policy is updated.
  7.4. Managers are responsible for ensuring that all team members under their supervision have current fair housing training on file.`,g=`MAKE-READY CHECKLIST — STANDARD OPERATING PROCEDURE
Kestrel Residential — All Properties

Effective Date: March 2026  |  Version 2.0  |  Owner: Director of Maintenance

1. PURPOSE
This SOP defines the make-ready process for turning a vacated unit to rent-ready condition. Every step must be documented in Entrata > Maintenance > Make-Ready before the unit is released for showing or move-in.

2. PRE-MOVE-OUT INSPECTION
  2.1. Schedule a pre-move-out walkthrough with the departing resident 7–14 days before their move-out date.
  2.2. Use the Entrata Pre-Move-Out Inspection form to document existing damage and set expectations for deposit deductions.
  2.3. Photograph all areas during pre-move-out inspection using the Unit Turn Photo Standards.
  2.4. Note any items the resident plans to address before vacating (cleaning, patching nail holes, etc.).

3. POST-VACATE INSPECTION
  3.1. Conduct a post-vacate inspection within 24 hours of the resident surrendering keys.
  3.2. Complete the Entrata Move-Out Inspection form with condition ratings for every room and system.
  3.3. Photograph all areas for deposit itemization records. Label photos by room.
  3.4. Determine scope of make-ready work: basic turn, standard turn, or full renovation.
    • Basic turn: cleaning only, no repairs — target 3 days
    • Standard turn: cleaning plus minor repairs, paint touch-up, and carpet cleaning — target 5 days
    • Full renovation: major repairs, full repaint, flooring replacement, appliance swap — target 10–14 days

4. CLEANING STANDARDS
  4.1. All surfaces must be cleaned to a "move-in ready" standard:
    • Kitchen: degrease range hood, oven interior, refrigerator interior and coils, dishwasher interior, countertops, cabinets (inside and out), sink and fixtures
    • Bathrooms: disinfect and descale all surfaces, regrout or recaulk tub/shower as needed, replace toilet seat, clean exhaust fan
    • Living areas and bedrooms: dust all surfaces, clean window sills and tracks, clean blinds or replace if damaged, wipe baseboards, clean interior of all closets
    • Windows: clean interior glass on all windows
    • Floors: vacuum, mop, or steam-clean all hard surfaces; professional carpet clean or replace per section 7
  4.2. If cleaning is outsourced, use an approved vendor from the Kestrel preferred vendor list.

5. PAINT CRITERIA
  5.1. Touch-up only: minor scuffs, small nail holes (3 or fewer per wall), no staining
  5.2. Full repaint required: excessive holes, stains, smoke damage, unapproved paint colors, or any wall with more than 30% touch-up coverage
  5.3. Full repaint standard: two coats of Kestrel-approved interior paint (color code maintained in Entrata > Properties > Make-Ready > Paint Schedule)
  5.4. All units receive a full repaint at minimum every third turn regardless of condition.

6. APPLIANCE INSPECTION
  6.1. Test all appliances: refrigerator (temp check), oven/range (all burners and oven cycle), dishwasher (full cycle), garbage disposal, microwave (if provided), washer/dryer connections.
  6.2. Replace any appliance that does not function properly or shows significant cosmetic damage.
  6.3. Clean or replace range drip pans, oven racks, and refrigerator shelves as needed.

7. FLOORING ASSESSMENT
  7.1. Carpet: professional clean if under 5 years old with no stains or damage. Replace if over 5 years old or if staining, burns, or pet damage is present.
  7.2. Hard surface (vinyl, LVP, tile): repair or replace damaged sections. Full replacement if more than 20% of surface is damaged.
  7.3. Document flooring condition and decision (clean/repair/replace) in the make-ready work order.

8. FIXTURES AND HARDWARE
  8.1. Check and replace as needed: outlet covers, light switch plates, door stops, cabinet hardware, towel bars, toilet paper holders, and shower curtain rods.
  8.2. Test all light fixtures and replace bulbs. Replace fixtures if damaged.
  8.3. Test all outlets and GFCI receptacles. Reset or replace as needed.
  8.4. Replace HVAC filter. Test heating and cooling cycles.
  8.5. Check smoke detectors and carbon monoxide detectors — replace batteries or replace units if older than 10 years.
  8.6. Test all door locks, deadbolts, and sliding door locks. Rekey unit per company rekeying policy.

9. FINAL WALKTHROUGH
  9.1. Maintenance Supervisor conducts a final quality walkthrough using the Make-Ready Final Checklist in Entrata.
  9.2. All deficiencies must be corrected before the unit is released.
  9.3. Take final "after" photos of every room and upload to Entrata > Make-Ready > Photos.
  9.4. Update unit status in Entrata to "Ready" upon passing final walkthrough.

10. TIMELINE AND ACCOUNTABILITY
  10.1. Target turn time by scope: basic 3 days, standard 5 days, full renovation 10–14 days.
  10.2. Maintenance Supervisor is accountable for meeting turn-time targets. Delays must be reported to the Property Manager within 24 hours.
  10.3. Weekly turn-time reports are generated in Entrata > Reports > Make-Ready Summary and reviewed by the Regional Manager.`,h=`UNIT TURN PHOTO STANDARDS
Kestrel Residential — All Properties

Effective Date: March 2026  |  Version 1.0  |  Owner: Director of Maintenance

1. PURPOSE
Standardize photography documentation during the unit turn process to support deposit itemization, quality assurance, and dispute resolution. Photos are required at three stages: pre-turn (move-out condition), during-turn (work in progress), and post-turn (rent-ready condition).

2. REQUIRED PHOTOS PER ROOM
  2.1. Kitchen (minimum 6 photos): overview of kitchen, countertops and backsplash, interior of oven, interior of refrigerator, under-sink area, any damage or needed repairs
  2.2. Living Room / Dining Room (minimum 4 photos): each wall or corner, flooring condition, any damage
  2.3. Each Bedroom (minimum 4 photos): each wall or corner, closet interior, flooring condition, any damage
  2.4. Each Bathroom (minimum 5 photos): vanity and mirror, toilet area, tub/shower interior, flooring, any damage or mold/mildew
  2.5. Entryway and Hallways (minimum 2 photos): entry door interior, hallway overview
  2.6. Utility / Laundry Area (minimum 2 photos): connections and hookups, water heater or HVAC closet
  2.7. Exterior (if applicable, minimum 3 photos): patio or balcony, front door exterior, assigned parking space

3. NAMING CONVENTIONS
  3.1. File naming format: [PropertyCode]-[UnitNumber]-[Stage]-[Room]-[Sequence]
    • Stage codes: PRE (pre-turn), DUR (during-turn), POST (post-turn)
    • Example: BAL-204-PRE-Kitchen-01.jpg
  3.2. Use the naming convention consistently to support automated matching in Entrata.

4. BEFORE / DURING / AFTER REQUIREMENTS
  4.1. Pre-turn photos: taken within 24 hours of resident vacating, before any cleaning or repairs begin. These photos document move-out condition for deposit itemization.
  4.2. During-turn photos: taken for any repair or replacement work costing over $200 or involving structural, plumbing, or electrical work. Show the issue before the fix and after completion.
  4.3. Post-turn photos: taken after all make-ready work is complete and the unit passes final walkthrough. These confirm rent-ready condition.

5. UPLOAD PROCEDURES
  5.1. All photos must be uploaded to Entrata > Make-Ready > Unit Photos within 48 hours of being taken.
  5.2. Pre-turn photos are attached to the move-out inspection work order.
  5.3. Post-turn photos are attached to the make-ready completion work order.
  5.4. During-turn photos are attached to the specific repair work order.
  5.5. Do not delete or edit photos after upload. If a retake is needed, upload the new photo alongside the original.

6. QUALITY STANDARDS
  6.1. Photos must be taken in landscape orientation with adequate lighting.
  6.2. Each photo must clearly show the area or item documented — avoid blurry or dark images.
  6.3. Include a reference object (tape measure, paint swatch, business card) when documenting specific damage for scale.
  6.4. Do not include resident personal belongings in post-turn photos.
  6.5. The Maintenance Supervisor reviews photo sets for completeness before closing the make-ready work order.`,f=`RENEWAL OFFER PROCESS — STANDARD OPERATING PROCEDURE
Kestrel Residential — All Properties

Effective Date: May 2026  |  Version 1.1  |  Owner: Director of Leasing

1. PURPOSE
This SOP defines the timeline, pricing guidelines, and authority levels for resident renewal offers across all Kestrel Residential properties.

2. RENEWAL TIMELINE
  2.1. 120 Days Before Lease Expiration:
    • Run the Entrata > Leasing > Renewal Queue report to identify upcoming expirations.
    • Review resident account for lease violations, delinquency history, or pending maintenance issues.
    • Flag any residents who will not be offered renewal (non-renewal notices follow local notice requirements).
  2.2. 90 Days Before Lease Expiration:
    • Generate renewal offer letters using the Entrata renewal offer template.
    • Pricing must be set per the current approved renewal rate matrix (see section 3).
    • Deliver offer via email and Entrata Resident Portal notification.
    • ELI+ agents may deliver the offer letter and answer standard questions about renewal terms.
  2.3. 60 Days Before Lease Expiration:
    • Follow up with residents who have not responded. Contact via phone, email, and portal message.
    • Begin scheduling renewal meetings for residents who wish to discuss terms or request modifications.
    • If no response by day 60, send a reminder with the month-to-month conversion notice.
  2.4. 30 Days Before Lease Expiration:
    • Final follow-up for unsigned renewals. Escalate to Property Manager for personal outreach.
    • Residents who have not signed a renewal are converted to month-to-month at the rate specified in section 4.
    • Update unit status in Entrata to reflect renewal or month-to-month conversion.

3. PRICING GUIDELINES
  3.1. Renewal rates are set by the Revenue Management team using Entrata's yield management tools.
  3.2. Standard renewal increase range: 2%–6% based on market conditions, unit type, and lease length.
  3.3. Renewal offers must include at least two term options (e.g., 12-month and 14-month).
  3.4. Concessions (e.g., free month, reduced rate) require Regional Manager approval and must be documented in Entrata > Leasing > Concessions.

4. MONTH-TO-MONTH CONVERSION
  4.1. Residents who do not execute a renewal by lease expiration automatically convert to month-to-month.
  4.2. Month-to-month premium: 150% of the then-current renewal rate, unless a lower premium is approved by the Regional Manager.
  4.3. Month-to-month residents may be offered a new lease at any time. Conversion to a fixed-term lease removes the premium.

5. NEGOTIATION AUTHORITY
  5.1. Leasing Consultant: may offer renewal at the approved rate matrix with no deviation.
  5.2. Leasing Manager: may approve a discount of up to 3% below the matrix rate.
  5.3. Property Manager: may approve a discount of up to 5% below the matrix rate and approve concessions up to $500 in value.
  5.4. Regional Manager: approves any discount exceeding 5%, concessions over $500, or lease terms outside standard options.
  5.5. All negotiated terms must be documented in Entrata > Leasing > Renewal Notes.

6. TRANSFER REQUESTS
  6.1. Residents requesting a unit transfer at renewal must submit a transfer request in the Entrata Resident Portal or via the leasing office.
  6.2. Transfers are subject to availability, a $300 transfer fee (waivable by Property Manager), and a new application review if the current lease has had violations.
  6.3. Transfer requests must be processed as a new lease for the destination unit with the renewal rate applied.

7. AI AGENT GUIDELINES
  7.1. ELI+ agents may deliver renewal offers, answer questions about pricing and terms, and collect signed renewal agreements.
  7.2. Agents must not negotiate rates, offer concessions, or promise specific terms not in the approved offer.
  7.3. If a resident requests negotiation, the agent must schedule a meeting with the Leasing Manager or Property Manager.`,y=`MOVE-IN AND MOVE-OUT PROCEDURES
Kestrel Residential — All Properties

Effective Date: February 2026  |  Version 1.3  |  Owner: Director of Property Operations

1. PURPOSE
This SOP standardizes move-in and move-out procedures to ensure consistent documentation, a positive resident experience, and compliance with deposit return requirements.

MOVE-IN PROCEDURES

2. PRE-MOVE-IN REQUIREMENTS
  2.1. At least 3 business days before move-in, verify in Entrata:
    • Lease fully executed (all signatures collected)
    • Security deposit and first month's rent collected
    • Renters insurance certificate on file with Kestrel Residential listed as interested party
    • Utility transfer confirmed (resident responsible utilities)
    • Unit has passed make-ready final walkthrough
  2.2. Generate the Move-In Inspection form in Entrata > Residents > Move-In.

3. MOVE-IN DAY PROCEDURES
  3.1. Conduct unit walkthrough with resident using the Entrata Move-In Inspection form.
  3.2. Document all pre-existing conditions with the resident present. Note scuffs, marks, appliance condition, and any imperfections.
  3.3. Both resident and property representative sign the completed inspection form.
  3.4. Photograph all rooms and any noted pre-existing conditions. Upload to Entrata within 24 hours.
  3.5. Key and access handover — issue and log in Entrata > Residents > Key Tracking:
    • Unit keys (2 copies)
    • Mailbox key
    • Access fob or gate remote (if applicable)
    • Parking credential (if applicable)
    • Pool/amenity key or card (if applicable)
  3.6. Provide the welcome packet:
    • Emergency maintenance contact number
    • Community rules and quiet hours
    • Amenity information and reservation instructions
    • Entrata Resident Portal setup guide (login and app download)
    • Utility contact information
    • Move-in gift or welcome letter from the Property Manager

4. POST-MOVE-IN FOLLOW-UP
  4.1. Send a welcome email within 24 hours via the Entrata "Welcome New Resident" template.
  4.2. ELI+ agents send a check-in message 7 days after move-in asking if there are any questions or maintenance needs.
  4.3. Leasing staff make a personal check-in call or visit within 30 days.

MOVE-OUT PROCEDURES

5. MOVE-OUT NOTICE REQUIREMENTS
  5.1. Residents must provide written notice to vacate at least 30 days before the lease end date (or as specified in the lease).
  5.2. Notice can be submitted via the Entrata Resident Portal, email, or written letter to the leasing office.
  5.3. Upon receiving notice, update the unit status in Entrata to "Notice to Vacate" and schedule the pre-move-out inspection.

6. PRE-MOVE-OUT INSPECTION
  6.1. Schedule a walkthrough with the resident 7–14 days before their move-out date.
  6.2. Review cleaning expectations, damage responsibilities, and deposit return process.
  6.3. Provide a written checklist of items the resident should address before vacating (cleaning, patching nail holes, removing all belongings).

7. MOVE-OUT DAY
  7.1. Collect all keys, fobs, remotes, and access devices. Log returns in Entrata > Residents > Key Tracking.
  7.2. Conduct a move-out inspection within 24 hours of key surrender using the Entrata Move-Out Inspection form.
  7.3. Photograph all rooms and any damage for deposit itemization.
  7.4. Update unit status in Entrata to "Vacated" on the move-out date.

8. DEPOSIT RETURN
  8.1. Process deposit return per the Security Deposit Handling SOP and applicable state law.
  8.2. Itemized deduction statement must be mailed to the resident's forwarding address within the legally required timeframe.
  8.3. Collect forwarding address at move-out or from the Entrata Resident Portal.`,v=`EMERGENCY RESPONSE PROTOCOL
Kestrel Residential — All Properties

Effective Date: January 2026  |  Version 2.0  |  Owner: VP of Risk Management

1. PURPOSE
This protocol defines procedures for responding to life-safety and property emergencies at all Kestrel Residential properties. All staff must be familiar with this protocol and participate in annual emergency response training.

2. GENERAL EMERGENCY PROCEDURES
  2.1. Call 911 first for any situation involving immediate danger to life.
  2.2. Ensure the safety of residents and staff before addressing property damage.
  2.3. Notify the Property Manager immediately, then the Regional Manager, then the VP of Risk Management.
  2.4. Document all actions taken in Entrata > Maintenance > Emergency Log with timestamps and names.

3. FIRE
  3.1. Activate the fire alarm if not already sounding. Call 911.
  3.2. Evacuate residents from the affected building using posted evacuation routes.
  3.3. Account for all known residents using the Entrata resident roster for the affected building.
  3.4. Do not allow re-entry until the fire department gives clearance.
  3.5. Contact the Emergency Restoration vendor (listed in Entrata > Vendors > Emergency) for board-up and water extraction if needed.
  3.6. Notify the insurance carrier within 24 hours. File an incident report in Entrata.

4. FLOOD AND WATER INTRUSION
  4.1. Shut off the water supply if the source is within the property's control (main shutoff locations are posted in the maintenance shop and in Entrata > Properties > Emergency Info).
  4.2. Move residents away from standing water, especially if near electrical panels or outlets.
  4.3. Deploy wet vacuums and fans from the maintenance shop. Contact the Emergency Restoration vendor if the affected area exceeds 100 sq ft or involves multiple units.
  4.4. Document the source, affected areas, and units with photos and notes in the emergency work order.

5. GAS LEAK
  5.1. Evacuate the immediate area. Do not operate light switches, phones, or any electrical devices in the affected area.
  5.2. Call 911 and the gas utility company (number posted in Entrata > Properties > Emergency Info).
  5.3. Do not re-enter until cleared by the utility company or fire department.
  5.4. If gas odor is reported by a resident via phone or chat, instruct them to leave the unit immediately and call 911.
  5.5. AI Agent Guidelines: ELI+ agents receiving a gas leak report must immediately instruct the resident to evacuate and call 911. The agent must then escalate to the on-call maintenance team and Property Manager. Agents must not attempt to troubleshoot or diagnose the issue.

6. SEVERE WEATHER
  6.1. Monitor local weather alerts. When a severe weather warning is issued (tornado, hurricane, severe thunderstorm), send a mass notification via Entrata > Communications > Emergency Blast to all residents.
  6.2. Direct residents to interior rooms on the lowest floor, away from windows.
  6.3. After the event, conduct a property walk to assess damage before residents return to affected areas.
  6.4. Document all damage with photos and create work orders in Entrata.

7. CONTACT TREE
  7.1. Level 1: On-site Maintenance Technician (or on-call tech after hours)
  7.2. Level 2: Property Manager
  7.3. Level 3: Regional Manager
  7.4. Level 4: VP of Risk Management
  7.5. Level 5: Chief Operating Officer (major property loss or resident injury)
  7.6. All contact numbers are maintained in Entrata > Properties > Emergency Info and in the printed Emergency Binder at each property's front desk.

8. VENDOR DISPATCH FOR EMERGENCIES
  8.1. Pre-approved emergency vendors are listed in Entrata > Vendors > Emergency category:
    • Fire and water restoration
    • Emergency plumbing
    • Emergency electrical
    • Board-up and securing services
    • Emergency locksmith
  8.2. Emergency vendor dispatch does not require pre-approval for the first $5,000 in services. A PO must be created within 24 hours.

9. RESIDENT NOTIFICATION
  9.1. Use Entrata > Communications > Emergency Blast for property-wide emergencies.
  9.2. For unit-specific emergencies, contact the affected resident(s) by phone, followed by portal and text message.
  9.3. Post physical notices on affected building entrances if the emergency impacts common areas.
  9.4. Provide follow-up communication within 24 hours with status update and expected resolution timeline.

10. DOCUMENTATION
  10.1. All emergencies require an incident report filed in Entrata > Maintenance > Emergency Log within 24 hours.
  10.2. Photos of damage, work performed, and restored condition are required.
  10.3. Retain all emergency documentation for a minimum of 7 years.
  10.4. Insurance claims must be initiated within 48 hours of the incident with supporting documentation from Entrata.`,b=`RENT COLLECTION AND DELINQUENCY — STANDARD OPERATING PROCEDURE
Kestrel Residential — All Properties

Effective Date: January 2025  |  Version 2.2  |  Owner: Director of Property Accounting

1. PURPOSE
This SOP establishes uniform procedures for rent collection, late fee assessment, delinquency management, and escalation to legal action across all Kestrel Residential properties.

2. PAYMENT METHODS
  • Online via the Entrata Resident Portal (ACH, debit card, credit card)
  • Recurring autopay enrolled through the Entrata Resident Portal
  • Check or money order delivered to the leasing office
  • Cash is not accepted

3. DUE DATES AND GRACE PERIOD
  3.1. Rent is due on the 1st of each month.
  3.2. A grace period extends through the 3rd of the month (or as specified in the lease and per state law).
  3.3. Payments received after the grace period are subject to late fees.

4. LATE FEE STRUCTURE
  4.1. Initial late fee: assessed on the 4th of the month per the Kestrel Residential Late Fee SOP.
  4.2. Additional daily late fee (where permitted by state law): assessed per the schedule in the lease.
  4.3. Late fees are posted automatically by Entrata when "Automatically Post Late Fees" is enabled. Verify settings in Entrata > Setup > Properties > Financial > Delinquency.

5. DELINQUENCY TIMELINE
  5.1. Day 1 (rent due date): automated payment reminder sent via Entrata to residents without payment on file.
  5.2. Day 4 (grace period expired): late fee posted. ELI+ agent sends a courtesy notice via the Resident Portal reminding the resident of the balance due and payment options.
  5.3. Day 5: Leasing or property staff make a personal phone call to the resident. Document the call outcome in Entrata > Residents > Notes.
  5.4. Day 10: Property Manager reviews all delinquent accounts. A formal past-due letter is sent via Entrata > Communications > Templates > "Past Due Notice — Day 10."
  5.5. Day 15: Property Manager determines whether to offer a payment plan or proceed with legal notice. Payment plans require Regional Manager approval if the balance exceeds one month's rent.
  5.6. Day 20: If no payment or approved payment plan, serve the applicable legal notice (e.g., Notice to Pay or Quit) per state law requirements.
  5.7. Day 30+: If notice period expires without cure, refer to the approved eviction attorney. Create the referral in Entrata > Residents > Legal Actions.

6. PAYMENT PLAN AUTHORITY
  6.1. Property Manager: may approve payment plans for balances up to one month's rent, with full payoff within 60 days.
  6.2. Regional Manager: may approve payment plans for balances over one month's rent or payoff periods exceeding 60 days.
  6.3. All payment plans must be documented in writing, signed by the resident, and attached to the resident ledger in Entrata.

7. LEGAL NOTICES AND EVICTION REFERRAL
  7.1. Legal notices must be generated through Entrata using the state-specific templates.
  7.2. Serve notices per the method required by applicable state law (personal delivery, posting, certified mail).
  7.3. Document proof of service in Entrata > Residents > Legal Actions.
  7.4. Eviction filings are handled by the Kestrel Residential approved eviction attorney. The Property Manager initiates the referral; the Regional Manager must approve.

8. AI AGENT GUIDELINES
  8.1. ELI+ agents may send automated payment reminders on days 1, 4, and 10.
  8.2. Agents may provide account balance information and direct residents to payment options in the Entrata Resident Portal.
  8.3. Agents must not negotiate payment plans, waive late fees, or make promises regarding legal action.
  8.4. Agents must escalate any hardship or financial distress situations to the Property Manager for personal follow-up.
  8.5. Agents must never threaten eviction or provide legal advice.`,A=`VENDOR AND CONTRACTOR MANAGEMENT — STANDARD OPERATING PROCEDURE
Kestrel Residential — All Properties

Effective Date: April 2026  |  Version 1.1  |  Owner: Director of Procurement

1. PURPOSE
This SOP establishes standards for qualifying, engaging, and managing vendors and contractors across all Kestrel Residential properties.

2. VENDOR QUALIFICATION CRITERIA
  2.1. All vendors must be approved before performing work at any Kestrel Residential property.
  2.2. Qualification requirements:
    • Valid business license in the state where work is performed
    • General liability insurance: minimum $1,000,000 per occurrence
    • Workers compensation insurance (if vendor has employees)
    • Kestrel Residential listed as additional insured on the liability policy
    • W-9 on file for tax reporting
  2.3. Specialty trades (electrical, plumbing, HVAC, roofing) must hold applicable state or local trade licenses.
  2.4. Submit vendor qualification packages to the Procurement team for review. Approved vendors are added to the Entrata vendor directory.

3. INSURANCE REQUIREMENTS
  3.1. Certificates of insurance (COI) must be provided before vendor activation and renewed annually.
  3.2. Expired COIs result in automatic vendor suspension in Entrata until updated documentation is received.
  3.3. The Procurement team monitors COI expirations via Entrata > Vendors > Insurance Tracking.

4. PREFERRED VENDOR LIST
  4.1. Each property maintains a preferred vendor list in Entrata > Vendors > Preferred categorized by trade.
  4.2. Preferred vendors have demonstrated reliability, competitive pricing, and quality work.
  4.3. On-site staff should dispatch preferred vendors first. Non-preferred vendors require Property Manager approval.
  4.4. The preferred vendor list is reviewed quarterly by the Property Manager and Maintenance Supervisor.

5. PURCHASE ORDER THRESHOLDS
  5.1. All vendor work requires a purchase order (PO) created in Entrata > Purchasing > Purchase Orders before work begins (except emergencies per the Emergency Response Protocol).
  5.2. Approval levels:
    • Up to $500 — Maintenance Supervisor
    • $501–$2,500 — Property Manager
    • $2,501–$10,000 — Regional Manager
    • Over $10,000 — VP of Operations
  5.3. POs exceeding $25,000 require competitive bids from at least 3 qualified vendors.

6. INVOICE PROCESSING
  6.1. Vendors submit invoices referencing the PO number.
  6.2. The Maintenance Supervisor verifies work completion and quality before approving the invoice in Entrata.
  6.3. Invoices are processed through Entrata > Accounting > Accounts Payable. Standard payment terms are Net 30 unless otherwise negotiated.
  6.4. Discrepancies between PO and invoice must be resolved before payment. Contact the vendor to reconcile, and document the resolution in Entrata.

7. PERFORMANCE REVIEWS
  7.1. Conduct formal vendor performance reviews semi-annually for vendors with annual spend exceeding $10,000.
  7.2. Review criteria: quality of work, timeliness, communication, pricing accuracy, and professionalism.
  7.3. Performance scores are documented in Entrata > Vendors > Performance Reviews.
  7.4. Vendors with consecutive poor reviews are placed on probation or removed from the preferred list.

8. AI AGENT GUIDELINES
  8.1. ELI+ agents may look up vendor contact information and PO status in Entrata for team members.
  8.2. Agents must not authorize vendor work, approve POs, or modify vendor records.
  8.3. Agents must escalate any vendor complaint or dispute to the Property Manager.`,w=`PET POLICY
Kestrel Residential — All Properties

Effective Date: January 2025  |  Version 1.3  |  Owner: Director of Property Operations

1. PURPOSE
This policy establishes uniform standards for pet ownership, deposits, screening, and compliance across all Kestrel Residential properties.

2. APPROVED PETS
  2.1. Dogs and cats are permitted at all Kestrel Residential properties, subject to the restrictions below.
  2.2. Small caged animals (hamsters, guinea pigs, non-venomous reptiles, fish in tanks up to 20 gallons) are permitted without additional deposit.
  2.3. Maximum of 2 pets per unit.

3. BREED AND SIZE RESTRICTIONS
  3.1. Dogs must weigh 75 lbs or less at maturity.
  3.2. Restricted breeds: Pit Bull Terrier, Staffordshire Terrier, Rottweiler, Doberman Pinscher, Chow Chow, Wolf Hybrid, and any mix thereof. This list may be adjusted per property insurance requirements.
  3.3. Breed restrictions do not apply to assistance animals (see section 8).

4. DEPOSITS AND FEES
  4.1. Refundable pet deposit: $400 per approved pet, due before the pet occupies the unit.
  4.2. Non-refundable monthly pet fee: $25 per pet (if applicable per the lease addendum).
  4.3. The pet deposit is refundable less documented damage caused by the pet upon move-out.
  4.4. The pet deposit may not be applied toward last month's rent.

5. PET SCREENING REQUIREMENTS
  5.1. All pets must be screened through the Kestrel Residential pet screening partner (PetScreening or equivalent) before move-in.
  5.2. Residents must provide proof of current vaccinations (rabies, distemper) for dogs and cats.
  5.3. Dogs must be spayed or neutered unless a veterinary exemption is on file.
  5.4. Pet profiles are maintained in Entrata > Residents > Pet Records.

6. COMMON AREA RULES
  6.1. Dogs must be leashed at all times in common areas (maximum 6-foot leash).
  6.2. Pet owners must immediately clean up after their animals in all common areas, yards, and walking paths.
  6.3. Pets are not permitted in the pool area, fitness center, clubhouse interior, or business center.
  6.4. Pets must not be left unattended on balconies or patios if they are creating noise disturbances.
  6.5. Pet waste stations are provided at designated locations throughout the community.

7. VIOLATIONS AND REMEDIATION
  7.1. First violation (noise complaint, unleashed pet, failure to clean up): written warning documenting the incident, delivered via the Entrata Resident Portal.
  7.2. Second violation within 12 months: $100 fine posted to the resident ledger in Entrata.
  7.3. Third violation within 12 months: lease violation notice per the lease terms. Property Manager may require pet removal.
  7.4. Aggressive behavior (biting, attacking) by any pet: immediate lease violation notice. The pet must be removed within 48 hours or the lease is subject to termination.
  7.5. All violations are documented in Entrata > Residents > Violations.

8. ASSISTANCE ANIMAL ACCOMMODATIONS
  8.1. Service animals and emotional support animals (ESAs) with valid documentation are not subject to pet deposits, pet fees, breed restrictions, or weight limits.
  8.2. Residents requesting an assistance animal accommodation must submit the request to the Property Manager per the Fair Housing and Anti-Discrimination Policy.
  8.3. Valid documentation includes a letter from a licensed healthcare provider (for ESAs) or evidence of training or certification (for service animals).
  8.4. The interactive process and decision must be completed within 10 business days of request.
  8.5. AI Agent Guidelines: ELI+ agents must not deny or discourage any assistance animal request. All requests must be routed to the Property Manager immediately.`,R=`RESIDENT COMMUNICATION STANDARDS — STANDARD OPERATING PROCEDURE
Kestrel Residential — All Properties

Effective Date: June 2026  |  Version 1.0  |  Owner: Director of Resident Experience

1. PURPOSE
This SOP establishes response time standards, tone guidelines, and communication procedures for all resident interactions across Kestrel Residential properties.

2. RESPONSE TIME STANDARDS BY CHANNEL
  2.1. Phone calls: answer within 3 rings during business hours. If the call goes to voicemail, return within 2 hours.
  2.2. Entrata Resident Portal messages: respond within 4 business hours.
  2.3. Email: respond within 1 business day.
  2.4. Text message (where enabled): respond within 2 hours during business hours.
  2.5. Walk-in / in-person: acknowledge within 2 minutes of arrival at the leasing office.
  2.6. Social media (direct messages on property accounts): respond within 4 business hours. Do not discuss account-specific details on public posts — redirect to private channels.
  2.7. AI Agent Guidelines: ELI+ agents provide immediate responses on the Resident Portal and chat channels 24/7. For inquiries that require human judgment (complaints, legal questions, accommodation requests), ELI+ agents must acknowledge receipt, set a response-time expectation, and create an escalation for the appropriate team member.

3. TONE AND LANGUAGE GUIDELINES
  3.1. Use a professional, warm, and helpful tone in all communications.
  3.2. Address residents by name whenever possible.
  3.3. Avoid jargon, abbreviations, or internal terminology that residents would not understand.
  3.4. Use empathetic language when responding to complaints or frustrations (e.g., "I understand this is frustrating, and I want to help resolve it").
  3.5. Never use threatening, dismissive, or condescending language.
  3.6. Do not discuss other residents, their units, or their accounts in any communication.

4. NOTICE DELIVERY REQUIREMENTS
  4.1. Lease violations, rent notices, and legal notices must be delivered per state law requirements (typically personal delivery or certified mail).
  4.2. Community announcements (amenity closures, construction, events) may be delivered via Entrata mass communication and posted in common areas.
  4.3. Maintenance scheduling notifications must include date, time window, and scope of work.
  4.4. All notices must include the property name, date, and a contact number for questions.

5. EMERGENCY COMMUNICATION
  5.1. Use the Entrata Emergency Blast function for property-wide emergencies (severe weather, fire, water shutoff).
  5.2. Emergency communications are sent simultaneously via portal notification, text, and email.
  5.3. Provide updates every 2 hours during an active emergency until the situation is resolved.
  5.4. Post physical notices on affected building entrances when digital communication may not reach all residents.

6. SOCIAL MEDIA POLICY
  6.1. Only designated team members (Property Manager or Marketing Coordinator) may post on property social media accounts.
  6.2. Do not share resident photos or information without written consent.
  6.3. Respond to negative reviews professionally. Acknowledge the concern, avoid argumentative language, and invite the reviewer to contact the office directly.
  6.4. Do not discuss lease terms, legal actions, or account details on any social media platform.
  6.5. Escalate any social media post involving threats, harassment, or potential legal liability to the Regional Manager immediately.

7. DOCUMENTATION
  7.1. All resident communications regarding complaints, maintenance, or lease matters must be documented in Entrata > Residents > Notes.
  7.2. Phone call outcomes must be logged in Entrata within 4 hours of the call.
  7.3. Retain all written correspondence (emails, letters, portal messages) in the Entrata resident file.`,E=`SECURITY DEPOSIT HANDLING — STANDARD OPERATING PROCEDURE
Kestrel Residential — All Properties

Effective Date: February 2025  |  Version 1.1  |  Owner: Director of Property Accounting

1. PURPOSE
This SOP establishes procedures for collecting, holding, itemizing, and returning security deposits in compliance with applicable state law across all Kestrel Residential properties.

2. COLLECTION AMOUNTS
  2.1. Standard security deposit: one (1) month's rent, collected at lease signing.
  2.2. Additional deposits may be required for:
    • Applicants approved with conditions (below-threshold credit score): up to one additional month's rent
    • Pets: $400 per approved pet (see Pet Policy)
  2.3. Total deposit amount may not exceed the maximum permitted by applicable state law.
  2.4. All deposits must be collected via the Entrata payment system and recorded in the resident ledger.

3. HOLDING REQUIREMENTS
  3.1. Security deposits are held in a designated escrow or trust account as required by state law.
  3.2. In states requiring interest on deposits, interest must be paid or credited per the applicable statute.
  3.3. Deposit holding account information is maintained in Entrata > Setup > Properties > Financial > Deposits.
  3.4. Do not commingle deposit funds with operating accounts in states that prohibit commingling.

4. MOVE-OUT INSPECTION AND DEDUCTIONS
  4.1. Conduct a move-out inspection within 24 hours of key surrender using the Entrata Move-Out Inspection form.
  4.2. Document all damage, cleaning needs, and missing items with photographs.
  4.3. Compare move-out condition to the move-in inspection form. Only damage beyond normal wear and tear may be deducted.
  4.4. Normal wear and tear includes: minor scuffs on walls, small nail holes, light carpet wear in traffic areas, and minor fading. Normal wear and tear may not be charged to the resident.
  4.5. Allowable deductions include: damage to walls, fixtures, or appliances beyond normal wear; excessive cleaning; unreturned keys or access devices; unpaid rent or fees; and early termination fees per the lease.

5. ITEMIZED DEDUCTION STATEMENT
  5.1. Prepare an itemized statement listing each deduction with a description, cost, and supporting documentation (photos, receipts, or vendor invoices).
  5.2. The itemized statement must be mailed to the resident's forwarding address within the timeframe required by state law (see section 6).
  5.3. If the resident did not provide a forwarding address, mail to the last known address (the leased unit).
  5.4. Retain a copy of the itemized statement and proof of mailing in Entrata > Residents > Deposit Returns.

6. RETURN TIMELINES BY STATE (COMMON EXAMPLES)
  6.1. Texas: 30 days from move-out
  6.2. California: 21 days from move-out
  6.3. Colorado: 30 days from move-out (or 60 days if stated in the lease)
  6.4. Florida: 15 days if no deductions, 30 days if deductions apply
  6.5. New York: 14 days from move-out
  6.6. For all other states, consult the state-specific deposit guide maintained by the Legal team in Entrata > Documents > Compliance.
  6.7. Failure to return the deposit within the statutory timeframe may result in penalties. Prioritize timely processing.

7. DISPUTE RESOLUTION
  7.1. If a former resident disputes a deduction, direct them to submit a written dispute to the Property Manager.
  7.2. The Property Manager reviews the dispute against the move-in and move-out inspection forms, photographs, and receipts within 10 business days.
  7.3. If the dispute is valid, issue a supplemental refund and updated itemization. If the dispute is denied, provide a written explanation with supporting documentation.
  7.4. Disputes that cannot be resolved at the property level are escalated to the Regional Manager.
  7.5. If the resident files a complaint with a regulatory agency or pursues legal action, immediately notify the Compliance Director and retain all documentation.

8. AI AGENT GUIDELINES
  8.1. ELI+ agents may provide general information about the deposit return process and estimated timelines.
  8.2. Agents must not discuss specific deduction amounts or provide opinions on whether a charge is valid.
  8.3. Agents must direct all deposit disputes to the Property Manager and create an escalation ticket.`,S=`PROPERTY INSPECTION — STANDARD OPERATING PROCEDURE
Kestrel Residential — All Properties

Effective Date: July 2026  |  Version 1.0  |  Owner: Director of Property Operations

1. PURPOSE
This SOP defines inspection schedules, procedures, and documentation standards for units and common areas across all Kestrel Residential properties.

2. QUARTERLY UNIT INSPECTIONS
  2.1. Conduct interior inspections of occupied units on a quarterly rotation.
  2.2. Provide residents with at least 48 hours written notice before entry (or as required by state law).
  2.3. Use the Entrata Unit Inspection form to assess:
    • HVAC filter condition (replace if dirty)
    • Smoke and carbon monoxide detector function (test and replace batteries)
    • Plumbing — check for leaks under sinks, around toilets, and at water heater
    • Evidence of pests
    • Lease compliance — unauthorized occupants, pets, or prohibited items
    • General unit condition and cleanliness
  2.4. Photograph and document any maintenance issues or lease violations.
  2.5. Create work orders in Entrata for any identified maintenance needs.
  2.6. File the completed inspection form in Entrata > Residents > Inspections.

3. COMMON AREA INSPECTIONS
  3.1. Daily checks (performed by maintenance or grounds staff):
    • Trash and litter pickup in parking lots, walkways, and common areas
    • Pool area safety inspection (if seasonal, during pool season only)
    • Entrance and exit lighting verification
    • Package room and mailroom tidiness
  3.2. Weekly checks (performed by Maintenance Supervisor):
    • Fitness center equipment inspection and cleaning verification
    • Laundry room equipment test (if applicable)
    • Elevator inspection log review (if applicable)
    • Landscaping and irrigation system spot check
    • Signage and wayfinding condition check
  3.3. Document daily and weekly checks using the Entrata Common Area Checklist. Flag items needing attention and create work orders as needed.

4. ANNUAL PROPERTY ASSESSMENT
  4.1. Conduct a comprehensive property assessment annually, typically in Q1.
  4.2. Assessment covers:
    • Roof condition and drainage
    • Exterior paint, siding, and trim
    • Parking lot and sidewalk condition (cracks, potholes, ADA compliance)
    • Fencing and gates
    • Amenity areas (pool, clubhouse, fitness center, business center)
    • Building mechanical systems (HVAC units, water heaters, fire suppression)
    • Landscape and irrigation
    • ADA accessibility of common areas and accessible units
  4.3. The Property Manager and Maintenance Supervisor conduct the assessment together.
  4.4. Findings are documented in the Entrata Annual Property Assessment form and presented to the Regional Manager.
  4.5. Capital improvement recommendations from the assessment feed into the annual budget planning process.

5. DOCUMENTATION STANDARDS
  5.1. All inspection forms must be completed in Entrata, not on paper. Paper forms are only used as a backup if the mobile app is unavailable and must be entered into Entrata within 24 hours.
  5.2. Photographs are required for any deficiency, damage, or lease violation identified during inspection.
  5.3. Work orders created from inspections must reference the inspection ID.
  5.4. Inspection records are retained in Entrata for a minimum of 3 years after the inspection date.

6. FOLLOW-UP PROCEDURES
  6.1. Maintenance issues identified during unit inspections must have a work order created and scheduled within 48 hours.
  6.2. Lease violations identified during inspection must be documented with a written notice delivered to the resident within 5 business days.
  6.3. Common area deficiencies rated "urgent" (safety hazard) must be addressed within 24 hours.
  6.4. The Property Manager reviews all inspection reports monthly to track trends and recurring issues.
  6.5. Quarterly inspection completion rates and follow-up resolution rates are reported to the Regional Manager.

7. AI AGENT GUIDELINES
  7.1. ELI+ agents may notify residents of upcoming unit inspections and answer questions about the inspection process.
  7.2. Agents must not reschedule inspections without Property Manager approval.
  7.3. Agents must not discuss inspection findings with residents — findings are communicated by the Property Manager or Maintenance Supervisor in person or in writing.`,P=[{...r.QG},{id:"1",fileName:"Leasing SOP",documentType:"sop",property:"Portfolio",scopeLevel:"company",approvalStatus:"approved",trainedOn:"Yes",modified:"Aug 12, 2026",owner:"Admin",type:"file",version:"2.1",source:"upload",effectiveDate:"2025-02-01",body:d,fileFormat:"text",viewerAccess:{entries:["group:grp-admin","group:grp-regional","group:grp-property","user:h-comp-dir"]},relatedDocumentIds:["3","5"]},{id:"2",fileName:"Maintenance escalation",documentType:"sop",property:"Portfolio",scopeLevel:"company",approvalStatus:"approved",trainedOn:"Yes",modified:"Aug 10, 2026",owner:"Admin",type:"file",version:"1.2",source:"upload",body:p,fileFormat:"text",viewerAccess:{entries:["group:grp-admin","group:grp-regional"]},relatedDocumentIds:["1","14"]},{id:"3",fileName:"Fair housing & anti-discrimination",documentType:"policy",property:"Portfolio",scopeLevel:"company",approvalStatus:"approved",trainedOn:"Yes",modified:"Feb 10, 2025",owner:"Admin",type:"file",source:"upload",body:m,tags:["compliance"],fileFormat:"text",viewerAccess:{entries:["group:grp-admin","group:grp-regional","group:grp-property","group:grp-site-leasing","user:h-exec","user:h-comp-dir"]},relatedDocumentIds:["1","4","5","17"]},{id:"4",fileName:"Lease template",documentType:"lease",property:"Bishop Arts Landing",scopeLevel:"property",propertyId:"Bishop Arts Landing",approvalStatus:"review",trainedOn:"No",modified:"Feb 5, 2025",owner:"Admin",type:"file",version:"1.0",source:"upload",body:l,fileFormat:"pdf",viewerAccess:{entries:["group:grp-admin","group:grp-property","user:h-pm-a","user:h-leasing-mgr-a"]},relatedDocumentIds:["3"],linkedAgentIds:["4"],tags:["leasing"],versions:[{version:"0.9",body:s,approvedAt:"2024-11-01T00:00:00Z",approvedBy:"Admin",changeSummary:"Prior lease form before 13-month term, $400 pet deposit, and e-sign clause."}]},{id:"5",fileName:"Refund policy",documentType:"sop",property:"Portfolio",scopeLevel:"company",approvalStatus:"review",trainedOn:"No",modified:"Feb 20, 2025",owner:"Admin",type:"file",version:"1.0",source:"upload",body:u,fileFormat:"text",viewerAccess:{entries:["group:grp-admin"]},relatedDocumentIds:["1","3"],linkedAgentIds:["1"],tags:["deposits","move-out"],versions:[{version:"0.9",body:c,approvedAt:"2025-01-15T00:00:00Z",approvedBy:"Admin",changeSummary:"Prior approved refund policy before threshold and AI-guideline updates."}]},{id:"folder-turn-process",fileName:"Turn Process",documentType:"other",property:"—",approvalStatus:"approved",trainedOn:"—",modified:"Aug 11, 2026",owner:"Admin",type:"folder",viewerAccess:{entries:["group:grp-admin","group:grp-regional","group:grp-property"]}},{id:"10",fileName:"Make-Ready Checklist",documentType:"sop",property:"Portfolio",scopeLevel:"company",approvalStatus:"approved",trainedOn:"Yes",modified:"Mar 15, 2026",owner:"Lisa Nguyen",type:"file",version:"2.0",source:"upload",body:g,fileFormat:"text",folderId:"folder-turn-process",viewerAccess:{entries:["group:grp-admin","group:grp-regional","group:grp-property"]},relatedDocumentIds:["11","13"]},{id:"11",fileName:"Unit Turn Photo Standards",documentType:"sop",property:"Portfolio",scopeLevel:"company",approvalStatus:"approved",trainedOn:"Yes",modified:"Mar 18, 2026",owner:"Lisa Nguyen",type:"file",version:"1.0",source:"upload",body:h,fileFormat:"text",folderId:"folder-turn-process",viewerAccess:{entries:["group:grp-admin","group:grp-regional","group:grp-property"]},relatedDocumentIds:["10"]},{id:"12",fileName:"Renewal Offer Process",documentType:"sop",property:"Portfolio",scopeLevel:"company",approvalStatus:"approved",trainedOn:"Yes",modified:"May 22, 2026",owner:"Sarah Chen",type:"file",version:"1.1",source:"upload",body:f,fileFormat:"text",viewerAccess:{entries:["group:grp-admin","group:grp-regional","group:grp-property"]},relatedDocumentIds:["1","15"]},{id:"13",fileName:"Move-In / Move-Out Procedures",documentType:"sop",property:"Portfolio",scopeLevel:"company",approvalStatus:"approved",trainedOn:"Yes",modified:"Feb 8, 2026",owner:"Dana Park",type:"file",version:"1.3",source:"upload",body:y,fileFormat:"text",viewerAccess:{entries:["group:grp-admin","group:grp-regional","group:grp-property","group:grp-site-staff"]},relatedDocumentIds:["1","10","19"]},{id:"14",fileName:"Emergency Response Protocol",documentType:"policy",property:"Portfolio",scopeLevel:"company",approvalStatus:"approved",trainedOn:"Yes",modified:"Jan 14, 2026",owner:"Admin",type:"file",version:"2.0",source:"upload",body:v,fileFormat:"text",viewerAccess:{entries:["group:grp-admin","group:grp-regional","group:grp-property","group:grp-site-staff"]},relatedDocumentIds:["2"],tags:["safety","compliance"]},{id:"15",fileName:"Rent Collection & Delinquency",documentType:"sop",property:"Portfolio",scopeLevel:"company",approvalStatus:"approved",trainedOn:"Yes",modified:"Jan 5, 2025",owner:"Sarah Chen",type:"file",version:"2.2",source:"upload",body:b,fileFormat:"text",viewerAccess:{entries:["group:grp-admin","group:grp-regional","group:grp-property"]},relatedDocumentIds:["5","19"],tags:["payments","delinquency"]},{id:"16",fileName:"Vendor & Contractor Management",documentType:"sop",property:"Portfolio",scopeLevel:"company",approvalStatus:"approved",trainedOn:"Yes",modified:"Apr 3, 2026",owner:"Dana Park",type:"file",version:"1.1",source:"upload",body:A,fileFormat:"text",viewerAccess:{entries:["group:grp-admin","group:grp-regional"]},relatedDocumentIds:["2"]},{id:"17",fileName:"Pet Policy",documentType:"policy",property:"Portfolio",scopeLevel:"company",approvalStatus:"approved",trainedOn:"Yes",modified:"Jan 10, 2025",owner:"Admin",type:"file",version:"1.3",source:"upload",body:w,fileFormat:"text",viewerAccess:{entries:["group:grp-admin","group:grp-regional","group:grp-property","group:grp-site-leasing"]},relatedDocumentIds:["3","4"],tags:["policy","resident relations"]},{id:"18",fileName:"Resident Communication Standards",documentType:"sop",property:"Portfolio",scopeLevel:"company",approvalStatus:"approved",trainedOn:"Yes",modified:"Jun 1, 2026",owner:"Lisa Nguyen",type:"file",version:"1.0",source:"upload",body:R,fileFormat:"text",viewerAccess:{entries:["group:grp-admin","group:grp-regional","group:grp-property","group:grp-site-staff"]},relatedDocumentIds:["1"],tags:["resident relations"]},{id:"19",fileName:"Security Deposit Handling",documentType:"sop",property:"Portfolio",scopeLevel:"company",approvalStatus:"approved",trainedOn:"Yes",modified:"Feb 15, 2025",owner:"Sarah Chen",type:"file",version:"1.1",source:"upload",body:E,fileFormat:"text",viewerAccess:{entries:["group:grp-admin","group:grp-regional","group:grp-property"]},relatedDocumentIds:["5","13"],tags:["deposits","move-out","compliance"]},{id:"20",fileName:"Property Inspection Procedures",documentType:"sop",property:"Portfolio",scopeLevel:"company",approvalStatus:"approved",trainedOn:"Yes",modified:"Jul 8, 2026",owner:"Dana Park",type:"file",version:"1.0",source:"upload",body:S,fileFormat:"text",viewerAccess:{entries:["group:grp-admin","group:grp-regional","group:grp-property"]},relatedDocumentIds:["2","10"],tags:["operations"]},{id:"21",fileName:"Make-Ready Checklist (v2 draft)",documentType:"sop",property:"Portfolio",scopeLevel:"company",approvalStatus:"needs_review",trainedOn:"No",modified:"Aug 20, 2026",owner:"Lisa Nguyen",type:"file",version:"1.0",source:"upload",body:g,fileFormat:"text",folderId:"folder-turn-process",viewerAccess:{entries:["group:grp-admin","group:grp-regional"]},relatedDocumentIds:["10","11"],history:[{at:"2026-08-20T14:30:00Z",action:"submitted",by:"Lisa Nguyen",version:"1.0",note:"Submitted updated make-ready checklist for review — added HVAC filter and smoke detector sections."}]},{id:"22",fileName:"Unit Turn Photo Standards (draft)",documentType:"sop",property:"Portfolio",scopeLevel:"company",approvalStatus:"approved",trainedOn:"Yes",modified:"Aug 22, 2026",owner:"Lisa Nguyen",type:"file",version:"1.0",source:"upload",body:h,fileFormat:"text",folderId:"folder-turn-process",viewerAccess:{entries:["group:grp-admin","group:grp-regional"]},relatedDocumentIds:["10"],history:[{at:"2026-08-22T10:15:00Z",action:"submitted",by:"Lisa Nguyen",version:"1.0",note:"Submitted photo standards for review — new naming convention and quality requirements."}]},{id:"23",fileName:"Renewal Offer Matrix (draft)",documentType:"sop",property:"Portfolio",scopeLevel:"company",approvalStatus:"approved",trainedOn:"Yes",modified:"Aug 25, 2026",owner:"Sarah Chen",type:"file",version:"1.0",source:"upload",body:f,fileFormat:"text",viewerAccess:{entries:["group:grp-admin","group:grp-regional"]},relatedDocumentIds:["12"],history:[{at:"2026-08-25T09:00:00Z",action:"submitted",by:"Sarah Chen",version:"1.0",note:"Submitted renewal offer matrix draft for compliance and revenue team review."}]}],I={entries:["group:grp-admin"]},k={admin:"grp-admin",regional:"grp-regional",property:"grp-property",ic:"grp-site-staff",noaccess:"grp-site-staff"};function O(e){if(e.startsWith("role:")){let t=k[e.slice(5)];return t?`group:${t}`:e}return e}let T=["Fair housing & anti-discrimination","Reasonable accommodation & assistive animals","Tenant screening & background checks","Data privacy & PII handling","Security deposit handling","Rent collection & late fees","Eviction & lease termination","Maintenance & habitability standards"],C="janet-poc-vault-v7",N=(0,i.createContext)(null);function D(){return new Date().toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})}let M=0;function L(){let e=Date.now();return String(M=e>M?e:M+1)}let x="janet-poc-vault-activity-v2",U="janet-poc-vault-workforce-acks";function F({children:e}){let[t,n]=(0,i.useState)(P),[g,h]=(0,i.useState)(()=>Object.fromEntries(T.map(e=>[e,!1]))),[f,y]=(0,i.useState)({}),[v,b]=(0,i.useState)(()=>{let e;return[{at:(e=(e,t=9,n=0)=>{let a=new Date;return a.setDate(a.getDate()-e),a.setHours(t,n,0,0),a.toISOString()})(0,15,42),action:"Document edited",by:"David Park",documentId:"5",documentName:"Refund policy",detail:"Revised escalation thresholds per compliance feedback"},{at:e(0,10,15),action:"Document submitted for approval",by:"Sarah Chen",documentId:"23",documentName:"Renewal Offer Matrix (draft)",detail:"Submitted renewal offer matrix for compliance and revenue team review"},{at:e(1,11,5),action:"Agent trained",by:"Admin",documentId:"3",documentName:"Fair housing & anti-discrimination",detail:"Leasing Assistant retrained on v1.2"},{at:e(1,9,30),action:"Document submitted for approval",by:"Lisa Nguyen",documentId:"22",documentName:"Unit Turn Photo Standards (draft)",detail:"Submitted photo standards for review — new naming convention"},{at:e(2,9,20),action:"Document approved",by:"Marcus Webb",documentId:"3",documentName:"Fair housing & anti-discrimination",detail:"Approved v1.2 after annual compliance review"},{at:e(2,14,10),action:"Document submitted for approval",by:"Lisa Nguyen",documentId:"21",documentName:"Make-Ready Checklist (v2 draft)",detail:"Submitted updated make-ready checklist for review"},{at:e(3,16,10),action:"Training out of date",by:"System",documentId:"1",documentName:"Leasing SOP",detail:"3 agents flagged for retraining on v2.1"},{at:e(4,13,48),action:"New version published",by:"Sarah Chen",documentId:"1",documentName:"Leasing SOP",detail:"Published v2.1"},{at:e(5,10,2),action:"Document edited",by:"Sarah Chen",documentId:"1",documentName:"Leasing SOP",detail:"Updated screening criteria and AI agent guidelines"},{at:e(6,11,20),action:"Agent trained",by:"Admin",documentId:"15",documentName:"Rent Collection & Delinquency",detail:"Payments AI trained on v2.2"},{at:e(7,6,0),action:"Flagged for review",by:"System",documentId:"3",documentName:"Fair housing & anti-discrimination",detail:"Past due — annual review required"},{at:e(8,13,45),action:"Document approved",by:"Dana Park",documentId:"20",documentName:"Property Inspection Procedures",detail:"Approved v1.0 — new quarterly unit inspection schedule"},{at:e(9,14,33),action:"Workforce acknowledgment",by:"Priya Nair",documentId:"2",documentName:"Maintenance escalation",detail:"Acknowledged reading v1.2"},{at:e(10,9,0),action:"Document uploaded",by:"Lisa Nguyen",documentId:"18",documentName:"Resident Communication Standards",detail:"Uploaded communication standards SOP (v1.0)"},{at:e(12,9,15),action:"Review scheduled",by:"Sarah Chen",documentId:"1",documentName:"Leasing SOP",detail:"Next review set for Aug 1, 2026"},{at:e(15,15,27),action:"Document submitted for approval",by:"Lena Ortiz",documentId:"4",documentName:"Lease template",detail:"Submitted for property-manager review"},{at:e(18,11,41),action:"Document rejected",by:"Marcus Webb",documentId:"5",documentName:"Refund policy",detail:"Sent back — clarify $500 escalation threshold"},{at:e(21,10,8),action:"Document submitted for approval",by:"David Park",documentId:"5",documentName:"Refund policy",detail:"Submitted v1.0 for compliance review"},{at:e(33,13,12),action:"Connection updated",by:"Lena Ortiz",documentId:"1",documentName:"Leasing SOP",detail:"Linked to Fair housing policy and Refund policy"},{at:e(40,9,50),action:"Document downloaded",by:"Tom Bradley",documentId:"3",documentName:"Fair housing & anti-discrimination",detail:"Exported for owner audit packet"},{at:e(45,8,30),action:"Document uploaded",by:"David Park",documentId:"5",documentName:"Refund policy",detail:"Uploaded refund policy draft (v1.0)"},{at:e(60,14,5),action:"Label added",by:"Lena Ortiz",documentId:"1",documentName:"Leasing SOP",detail:"Added label 'Leasing'"},{at:e(74,10,45),action:"Agent trained",by:"Admin",documentId:"2",documentName:"Maintenance escalation",detail:"Maintenance Coordinator trained on v1.2"},{at:e(75,9,0),action:"Document approved",by:"Sarah Chen",documentId:"2",documentName:"Maintenance escalation",detail:"Approved v1.2"},{at:e(80,16,22),action:"Viewer access updated",by:"Admin",documentId:"3",documentName:"Fair housing & anti-discrimination",detail:"Added Regional Managers to viewers"},{at:e(88,8,15),action:"Document uploaded",by:"David Park",documentId:"4",documentName:"Lease template",detail:"Uploaded Bishop Arts Landing lease template (PDF)"}].map((e,t)=>({...e,id:`act-seed-${t+1}`}))}),[A,w]=(0,i.useState)([]),[R,E]=(0,i.useState)(!1);(0,i.useEffect)(()=>{try{let e=localStorage.getItem(C);if(e){let t=JSON.parse(e),a=Array.isArray(t.documents)?t.documents:t.docs,i=t.compliance,o=t.complianceSubjectDocumentIds;if(Array.isArray(a)){let e=new Set(a.map(e=>e.id)),t=a.map(t=>{let n=t;if("1"!==n.id||n.body||(n={...n,body:d}),"2"!==n.id||n.body||(n={...n,body:p}),"3"!==n.id||n.body||(n={...n,body:m}),"4"!==n.id||n.body||(n={...n,body:l}),"4"===n.id&&"Pine Hill Residences"===n.property&&(n={...n,property:"Bishop Arts Landing",propertyId:"Bishop Arts Landing"}),"4"!==n.id||n.versions&&n.versions.length>0||(n={...n,versions:[{version:"0.9",body:s,approvedAt:"2024-11-01T00:00:00Z",approvedBy:"Admin",changeSummary:"Prior lease form before 13-month term, $400 pet deposit, and e-sign clause."}]}),"4"===n.id&&(n.linkedAgentIds?.length||(n={...n,linkedAgentIds:["4"]}),n.tags?.length||(n={...n,tags:["leasing"]})),"5"!==n.id||n.body||(n={...n,body:u}),"5"!==n.id||n.versions&&n.versions.length>0||(n={...n,versions:[{version:"0.9",body:c,approvedAt:"2025-01-15T00:00:00Z",approvedBy:"Admin",changeSummary:"Prior approved refund policy before threshold and AI-guideline updates."}]}),"5"===n.id&&(n.linkedAgentIds?.length||(n={...n,linkedAgentIds:["1"]}),n.tags?.length||(n={...n,tags:["deposits","move-out"]})),"draft"===n.approvalStatus&&"file"===n.type&&(n={...n,approvalStatus:"review"}),n=function(e){let t=e.viewerAccess;if(!t)return e;if("entries"in t&&Array.isArray(t.entries)&&t.entries.length>0){let n=t.entries.filter(e=>"string"==typeof e).map(O);return n.length?{...e,viewerAccess:{entries:[...new Set(n)]}}:{...e,viewerAccess:I}}return"roles"in t&&Array.isArray(t.roles)&&t.roles.length>0?{...e,viewerAccess:{entries:[...new Set(t.roles.map(e=>O(`role:${e}`)))]}}:{...e,viewerAccess:I}}(n),n.relatedDocumentIds?.length){let t=[...new Set(n.relatedDocumentIds)].filter(t=>e.has(t)&&t!==n.id);n={...n,relatedDocumentIds:t.length?t:void 0}}return n});n((0,r.FK)(t))}if(i&&"object"==typeof i&&h(e=>({...e,...i})),o&&"object"==typeof o){let e={};for(let[t,n]of Object.entries(o))Array.isArray(n)?e[t]=n:"string"==typeof n&&n&&(e[t]=[n]);y(e)}}let t=localStorage.getItem(x);if(t){let e=JSON.parse(t);Array.isArray(e)&&e.length>0&&b(e)}let a=localStorage.getItem(U);if(a){let e=JSON.parse(a);Array.isArray(e)&&w(e)}}catch{}E(!0)},[]),(0,i.useEffect)(()=>{if(R)try{localStorage.setItem(C,JSON.stringify({documents:t,compliance:g,complianceSubjectDocumentIds:f}))}catch{}},[t,g,f,R]),(0,i.useEffect)(()=>{if(R)try{localStorage.setItem(x,JSON.stringify(v))}catch{}},[v,R]),(0,i.useEffect)(()=>{if(R)try{localStorage.setItem(U,JSON.stringify(A))}catch{}},[A,R]),(0,i.useEffect)(()=>{if(!R)return;let e=new Date;n(t=>t.map(t=>"file"===t.type&&t.nextReviewDate&&"approved"===t.approvalStatus&&new Date(t.nextReviewDate)<=e?{...t,approvalStatus:"needs_review"}:t))},[R]);let S=(0,i.useCallback)(e=>{let t={...e,id:`act-${Date.now()}-${Math.random().toString(36).slice(2,6)}`,at:new Date().toISOString()};b(e=>[t,...e].slice(0,200))},[]),k=(0,i.useCallback)((e,t)=>{y(n=>{let a=n[e]??[];return a.includes(t)?n:{...n,[e]:[...a,t]}})},[]),M=(0,i.useCallback)((e,t)=>{y(n=>{let a=(n[e]??[]).filter(e=>e!==t);if(0===a.length){let{[e]:t,...a}=n;return a}return{...n,[e]:a}})},[]),q=(0,i.useCallback)(e=>{h(t=>e(t))},[]),G=(0,i.useCallback)(e=>{let t=D(),a=L();return n(n=>[...n,{...e,id:a,modified:t,source:e.source??"upload",version:"sop"===e.documentType?e.version??"1.0":void 0}]),S({action:"Document added",by:e.owner||"Admin",documentId:a,documentName:e.fileName}),a},[S]),B=(0,i.useCallback)((e,t)=>{n(n=>n.map(n=>{if(n.id!==e)return n;let a={...n,...t,modified:t.modified??D()};return t.body&&t.body!==n.body&&n.trainingRecords?.length&&(a.trainingRecords=n.trainingRecords.map(e=>"trained"===e.status?{...e,status:"out_of_date"}:e)),a}))},[]),V=(0,i.useCallback)((e,t,a)=>{n(n=>n.map(n=>{if(n.id!==e)return n;let i=function(e){if(!e)return"1.0";let t=e.split("."),n=parseInt(t[0]??"1",10),a=parseInt(t[1]??"0",10);return`${n}.${a+1}`}(n.version),r={version:n.version??"1.0",body:n.body??"",approvedAt:new Date().toISOString(),approvedBy:t},o={at:new Date().toISOString(),action:"approved",by:t,version:i,note:a},s=(n.trainingRecords??[]).map(e=>"trained"===e.status?{...e,status:"out_of_date"}:e);return{...n,approvalStatus:"approved",version:i,modified:D(),versions:[...n.versions??[],r],history:[...n.history??[],o],trainingRecords:s}})),S({action:"Document approved",by:t,documentId:e,detail:a})},[S]),K=(0,i.useCallback)((e,t)=>{n(n=>n.map(n=>{if(n.id!==e)return n;let a=n.trainingRecords??[],i=a.findIndex(e=>e.agentId===t),r={agentId:t,status:"trained",trainedAt:new Date().toISOString(),trainedOnVersion:n.version??"1.0"},o=i>=0?a.map((e,t)=>t===i?r:e):[...a,r];return{...n,trainingRecords:o}}))},[]),H=(0,i.useCallback)((e,t)=>{let a=D();n(n=>[...n,{id:L(),fileName:e,documentType:"other",property:"—",approvalStatus:"approved",trainedOn:"—",modified:a,owner:"Admin",type:"folder",folderId:t,viewerAccess:I,folderAccess:{...o,view:[...o.view]}}])},[]),Y=(0,i.useCallback)((e,t)=>{n(n=>n.map(n=>n.id===e?{...n,folderId:t??void 0}:n))},[]),j=(0,i.useCallback)(e=>{n(t=>{let n=t.find(t=>t.id===e);return n?"folder"===n.type?t.filter(t=>t.id!==e).map(t=>t.folderId===e?{...t,folderId:void 0}:t):t.filter(t=>t.id!==e).map(t=>{let n=t.relatedDocumentIds?.filter(t=>t!==e);return t.relatedDocumentIds?.includes(e)?{...t,relatedDocumentIds:n?.length?n:void 0}:t}):t})},[]),$=(0,i.useCallback)(e=>{w(t=>[...t.filter(t=>t.memberId!==e.memberId||t.subject!==e.subject),{...e,acknowledgedAt:new Date().toISOString()}]),S({action:"Workforce acknowledgment",by:e.memberName,detail:`Acknowledged "${e.subject}"`})},[S]),W=(0,i.useCallback)((e,t)=>{w(n=>n.filter(n=>n.memberId!==e||n.subject!==t))},[]),z=t.filter(e=>"file"===e.type&&!e.isTemplate).length;return(0,a.jsx)(N.Provider,{value:{documents:t,setDocuments:n,addDocument:G,updateDocument:B,addFolder:H,moveToFolder:Y,complianceChecked:g,setComplianceChecked:q,complianceSubjectDocumentIds:f,addComplianceSubjectDocument:k,removeComplianceSubjectDocument:M,docCount:z,activityLog:v,addActivity:S,workforceAcks:A,addWorkforceAck:$,removeWorkforceAck:W,approveDocument:V,markAgentTrained:K,deleteDocument:j},children:e})}function q(){let e=(0,i.useContext)(N);if(!e)throw Error("useVault must be used within VaultProvider");return e}},99991:(e,t,n)=>{n.d(t,{bw:()=>h});var a=n(12115),i=n(64982),r=n(27679),o=n(82791),s=n(83591),l=n(80910),d=n(42840),c=n(83788),u=n(50362);let p=[{id:"ops-efficiency",title:"Activate Operational & Efficiency Agents",href:"/agent-studio/agent-roster"},{id:"train-workforce",title:"Train Your Workforce & Set Up Knowledge Base",href:"/agent-studio/knowledge-base"},{id:"academy",title:"Get Your Team Up to Speed in Entrata Academy",href:"/entrata-academy"},{id:"playbooks-tasks",title:"Create Playbooks & Tasks",href:"/agent-studio/escalations"},{id:"workforce",title:"Configure Your Workforce",href:"/agent-studio/workforce"},{id:"workflows",title:"Set up Agent Builder",href:"/agent-studio/builder"},{id:"voice-brand",title:"Configure Voice & Tone",href:"/agent-studio/voice"},{id:"brand-center",title:"Set Up Your Brand Center",href:"/agent-studio/brand-center"},{id:"oxp-mobile",title:"Preview the OXP Mobile Experience",href:"/agent-studio/oxp-mobile"},{id:"governance",title:"Set up Governance",href:"/agent-studio/governance"}],m=["governance","voice-brand","eli-essentials","ops-efficiency","eli-plus"],g={id:"activate-ai-agents",title:"Activate AI Agents",href:"/agent-studio/agent-roster"};function h(){let e=function(){let{isR1Release:e}=(0,d.a)(),{isSummit:t}=(0,c.oN)();return(0,a.useMemo)(()=>{let n=e=>e.filter(e=>!(t&&null!==e.href&&u.cw.includes(e.href)));return n(e?[g,...p.filter(e=>!m.includes(e.id)).map(e=>"review-golive"===e.id?{...e,title:"Review Activation Steps"}:{...e})]:p.map(e=>({...e})))},[e,t])}(),t=function(){let{agents:e}=(0,i._F)(),{atLeastOneEnabled:t}=(0,r.m)(),{configured:n}=(0,o.c0)(),{enabledGuardrailCount:l}=(0,s.Av)();return(0,a.useMemo)(()=>{let a=e.filter(e=>"operations"===e.type),i=e.filter(e=>"intelligence"===e.type||"efficiency"===e.type),r=e.filter(e=>"autonomous"===e.type);return{"eli-essentials":a.some(e=>"Active"===e.status),"ops-efficiency":i.some(e=>"Active"===e.status),"train-workforce":!1,academy:!1,"playbooks-tasks":!1,workforce:!1,"activate-ai-agents":r.some(e=>"Active"===e.status),workflows:t,"voice-brand":n,"brand-center":!1,"oxp-mobile":!1,governance:l>0,"brief-team":!1,"review-golive":!1}},[e,t,n,l])}(),{completedSteps:n,goLiveComplete:h}=(0,l.z)();return(0,a.useMemo)(()=>{let a=e.reduce((e,a,i)=>e+(n.includes(i)||t[a.id]?1:0),0);return{visibleSteps:e,completedCount:a,total:e.length,done:h}},[e,t,n,h])}}}]);