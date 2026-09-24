#!/usr/bin/env node
/**
 * Slim static export of real Max Academy (EntrataAcademy + app shell)
 * into implementation-prototype/academy/ for GitHub Pages.
 *
 * BASE_PATH=/implementation-prototype/academy
 * Only / and /entrata-academy are prerendered — other page.tsx files are
 * stashed for the duration of the build so this is not a full-app export.
 */
import { execFileSync } from "node:child_process";
import {
  existsSync,
  renameSync,
  rmSync,
  cpSync,
  writeFileSync,
  readFileSync,
  readdirSync,
  statSync,
} from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const protoRoot = path.resolve(__dirname, "..");
const srcRoot = "/Users/bbayles/Developer/entrata-product/entrata-3.0-add-content-formats";
const destDir = path.join(protoRoot, "academy");
const stashSuffix = ".academy-export-stash";
const apiDir = path.join(srcRoot, "app", "api");
const apiStash = path.join(srcRoot, ".app-api.stash");

const KEEP_PAGES = new Set([
  path.join(srcRoot, "app", "page.tsx"),
  path.join(srcRoot, "app", "entrata-academy", "page.tsx"),
]);

const ROOT_PAGE = `"use client";

// Slim GitHub Pages landing: real EntrataAcademy inside Max app shell
// (sidebar + top bar + brand-v4). Seeds Regional + 2027 so My Team shows.
import { useEffect } from "react";
import { usePersona } from "@/lib/persona-context";
import { useTier } from "@/lib/tier-context";
import { EntrataAcademy } from "./agent-studio/trainings-sop/academy/EntrataAcademy";

const MY_TEAM_DEMO_SEED_KEY = "entrata.academy.myTeam.demoSeed.v1";

export default function AcademyShareLanding() {
  const { isHydrated, setPersona } = usePersona();
  const { setTier } = useTier();

  useEffect(() => {
    if (!isHydrated) return;
    try {
      if (window.sessionStorage.getItem(MY_TEAM_DEMO_SEED_KEY) === "1") return;
    } catch {
      /* continue */
    }
    const apply = () => {
      setPersona("regional");
      setTier("black");
      try {
        window.localStorage.setItem("demo-bar-collapsed", "0");
        window.sessionStorage.setItem(MY_TEAM_DEMO_SEED_KEY, "1");
      } catch {
        /* ignore */
      }
    };
    const t = window.setTimeout(apply, 0);
    return () => window.clearTimeout(t);
  }, [isHydrated, setPersona, setTier]);

  return (
    <div className="h-full overflow-y-auto">
      <div className="page-content px-6 pb-10 pt-5 sm:px-8 lg:px-10">
        <EntrataAcademy />
      </div>
    </div>
  );
}
`;

function walk(dir, out = []) {
  if (!existsSync(dir)) return out;
  for (const name of readdirSync(dir)) {
    if (name === "node_modules" || name === ".next") continue;
    const full = path.join(dir, name);
    const st = statSync(full);
    if (st.isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

function isPageFile(file) {
  const base = path.basename(file);
  // Do not stash app/api route.ts here — the whole api dir is moved aside.
  return (
    base === "page.tsx" ||
    base === "page.ts" ||
    base === "page.jsx" ||
    base === "page.js"
  );
}

const stashed = [];

function stash(file) {
  const dest = file + stashSuffix;
  if (existsSync(dest)) rmSync(dest, { force: true });
  renameSync(file, dest);
  stashed.push({ from: dest, to: file });
}

function restore() {
  for (const { from, to } of stashed.reverse()) {
    if (existsSync(from)) {
      if (existsSync(to)) rmSync(to, { force: true });
      renameSync(from, to);
    }
  }
  stashed.length = 0;
  if (existsSync(apiStash) && !existsSync(apiDir)) {
    renameSync(apiStash, apiDir);
  }
}

process.on("SIGINT", () => {
  restore();
  process.exit(1);
});

const originalPage = readFileSync(path.join(srcRoot, "app", "page.tsx"), "utf8");

try {
  const appDir = path.join(srcRoot, "app");
  for (const file of walk(appDir)) {
    if (!isPageFile(file)) continue;
    if (KEEP_PAGES.has(file)) continue;
    stash(file);
  }

  if (existsSync(apiDir)) {
    rmSync(apiStash, { recursive: true, force: true });
    renameSync(apiDir, apiStash);
  }

  writeFileSync(path.join(srcRoot, "app", "page.tsx"), ROOT_PAGE);

  const nextBin = path.join(srcRoot, "node_modules", ".bin", "next");
  execFileSync(nextBin, ["build", "--webpack"], {
    cwd: srcRoot,
    stdio: "inherit",
    env: {
      ...process.env,
      STATIC_EXPORT: "1",
      BASE_PATH: "/implementation-prototype/academy",
      NODE_OPTIONS: process.env.NODE_OPTIONS || "--max-old-space-size=8192",
    },
  });

  const outDir = path.join(srcRoot, "out");
  if (!existsSync(outDir)) {
    throw new Error("next export produced no out/");
  }

  rmSync(destDir, { recursive: true, force: true });
  cpSync(outDir, destDir, { recursive: true });
  writeFileSync(path.join(destDir, ".nojekyll"), "");
  writeFileSync(
    path.join(destDir, "README.md"),
    `# Academy (Max)

Live: https://brandonbayles-hub.github.io/implementation-prototype/academy/

Real \`EntrataAcademy\` + Max app shell (PageTop, sidebar, brand-v4, Inter).
Not the previous Vite toy slice.

- **My Team** — Regional + 2027 seeded on first open. Remind is local-only.
- **Add course** — SCORM / PDF / Video / Job aid / Link. Format follows uploadKind.
- Edit locks package structure (zip is not SCORM). Title/description stay on the same version; a package change can create a draft v2 while v1 stays published.

Demo data. Remind does not send email. Files are filenames only.
Sidebar links to other Max pages 404 in this slim export — use
[getting-started](https://brandonbayles-hub.github.io/implementation-prototype/eli-plus-go-live/agent-studio/getting-started/?tab=eli-plus) for the rest of the product.
`,
  );

  console.log("Exported academy →", destDir);
} finally {
  writeFileSync(path.join(srcRoot, "app", "page.tsx"), originalPage);
  restore();
}
