"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[7531],{7531:(e,t,o)=>{o.d(t,{$f:()=>b,Jl:()=>d,Pv:()=>A,Qw:()=>n,Qy:()=>$,Ss:()=>c,Tx:()=>l,UG:()=>N,VX:()=>f,WH:()=>s,YI:()=>g,Z3:()=>y,aT:()=>w,eL:()=>I,eq:()=>v,m4:()=>u,mW:()=>h,mj:()=>p,pX:()=>S,rE:()=>k,uG:()=>a,uR:()=>i,zW:()=>m});var r=o(44656);let n="metrics",a="datasets",s="alerts",i="briefings",l="schedules",u="reports",c="company-reports",p="workspace",d="report-templates",h="prompts",m="knowledge",f="skills";function w(e){return(0,r.SH)({root:".company"},`${n}/${e}.md`)}function y(e){return(0,r.SH)({root:".company"},`sources/${e}.md`)}let b=[{folder:"company-context",label:"Company Context",description:"How this operator works: org shape, naming, and the conventions behind the numbers."},{folder:"policies",label:"Policies",description:"Standing policy the AI should apply: pets, screening, concessions, collections."},{folder:"property-notes",label:"Property Notes",description:"What is true about one property that isn't true portfolio-wide."},{folder:"reports",label:"Report Notes",description:"How to read a report, what its columns mean, and the caveats that travel with it."},{folder:"packets",label:"Packet Notes",description:"Context for a recurring packet: who reads it, what they ask, what to lead with."},{folder:"vendor-docs",label:"Vendor Docs",description:"Vendor terms, scopes, and escalation paths referenced on maintenance answers."},{folder:"personal",label:"Personal",description:"Your own working notes. Saved to the repo, tagged to you."}],g="company-context";function k(e,t,o){return"personal"===t?(0,r.SH)({root:".user",userName:o??""},`${m}/${e}.md`):(0,r.SH)({root:".company"},`${m}/${e}.md`)}function $(e){return b.find(t=>t.folder===e)}function v(e){let t=e?.trim();return t&&$(t)?t:g}let H=[{path:(0,r.SH)({root:".company"},"AGENTS.md"),label:"Instructions",summary:"How the AI should talk about your numbers.",absentSummary:"Not created yet: how the AI should talk about your numbers.",scaffold:`# Instructions

How the AI should talk about our numbers. Read on every Analytics answer, so
keep this to things that hold across the portfolio.

## Naming

- Say "economic occupancy" in full; never "econ occ".

## Defaults

- When no period is given, use trailing three months.

## Cautions

- Never present a projection as an actual.

<!--
This file shapes LANGUAGE, not math. How a number is CALCULATED comes from the
\`formula:\` in that metric's file under metrics/.
-->
`},{path:(0,r.SH)({root:".company"},"rules.md"),label:"Rules",summary:"House rules the AI applies to every answer.",absentSummary:"Not created yet: house rules the AI applies to every answer.",scaffold:`# Rules

Standing rules for this portfolio: the things a new analyst would get wrong on
their first day. Short and specific beats thorough: everything here is read on
every answer.

## Always

- Exclude model and down units from occupancy.
- Report student properties by the bed, not the unit.

## Never

- Never blend conventional and student portfolios in one occupancy number.

## Ask first

- If a question spans more than one region, ask which one before answering.

<!--
Rules shape LANGUAGE and FRAMING, not math. To change how a number is
calculated, edit that metric's file under metrics/.
-->
`}],A=Object.fromEntries([...H,{path:(0,r.SH)({root:".company"},"branding/branding.md"),label:"Branding",summary:"How your reports should look.",absentSummary:"Not created yet: how your reports should look.",scaffold:`# Brand

How our reports should look. Prose is fine, Max reads this, it does not have
to be structured.

## Tone

## What to emphasize

## Footer / disclaimer
`}].map(e=>[e.path,e]));function N(e){var t,o;return t=e,o=n,(0,r.JB)(t,o)||t.startsWith(`${o}/`)}let S="root";function I(e,t){let o,a=(o=(0,r.UH)(e)??e,H.some(e=>(0,r.UH)(e.path)===o))?S:((0,r.UH)(e)??e).split("/")[0]??n;return`/analytics/data/metrics/${a}/${t}`}},44656:(e,t,o)=>{o.d(t,{FQ:()=>i,JB:()=>c,LU:()=>s,N2:()=>p,SH:()=>a,UH:()=>l,tB:()=>u});let r=[".entrata",".company",".user"];class n extends Error{constructor(e,t){super(e),this.code=t,this.name="KnowledgeArtifactPathError"}}function a(e,t){let o,r=!(o=d(t).replace(/^\/+|\/+$/g,""))||h(o)?"":o;if(!r)throw new n("A Knowledge Base artifact path needs a path below its namespace.","invalid_path");if(".user"===e.root){if(!e.userName.trim())throw new n("A personal Knowledge Base namespace needs an owner name.","invalid_path");let t=p(e.userName);return`.user/${t}/${r}`}return`${e.root}/${r}`}function s(e,t){let o=a(e,t).split("/").map(e=>encodeURIComponent(e)).join("/");return`/analytics/data/knowledge-base/${o}`}function i(e){if(!e)return null;let t=d(e);if(t!==e||!t||t.startsWith("/")||h(t))return null;let o=t.split("/"),n=o[0];if(!n||!r.includes(n))return null;if(".user"===n){let e=o[1],t=o.slice(2).join("/");if(!e||!t)return null;let r=p(e);return r!==e?null:{namespace:{root:n,userName:r},namespacePath:`.user/${r}`,relativePath:t,canonicalPath:`.user/${r}/${t}`}}let a=o.slice(1).join("/");return a?{namespace:{root:n},namespacePath:n,relativePath:a,canonicalPath:`${n}/${a}`}:null}function l(e){return i(e)?.relativePath??null}function u(e){return l(e)?.split("/")[0]??null}function c(e,t){let o=l(e);return o===t||!!o?.startsWith(`${t}/`)}function p(e){let t=e.trim().toLowerCase().replace(/[^a-z0-9._@-]+/g,"-").replace(/^-+|-+$/g,"").slice(0,80);return t&&"."!==t&&".."!==t?t:"unknown-user"}function d(e){return e.trim().replace(/\\/g,"/").replace(/\/{2,}/g,"/")}function h(e){return e.includes("\0")||e.split("/").some(e=>!e||"."===e||".."===e)}}}]);