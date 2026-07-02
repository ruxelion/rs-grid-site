#!/usr/bin/env node
// Mechanical i18n parity check: every file under docs/en/ must have an
// identically-pathed counterpart under docs/fr/, and vice versa. This only
// checks existence, not translation freshness/content — see AGENTS.md's
// "every page exists in both en/ and fr/" rule.
import { readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");
const EN_DIR = join(ROOT, "docs", "en");
const FR_DIR = join(ROOT, "docs", "fr");

function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else out.push(relative(dir, full).split("\\").join("/"));
  }
  return out;
}

const en = new Set(walk(EN_DIR));
const fr = new Set(walk(FR_DIR));

const missingInFr = [...en].filter((p) => !fr.has(p)).sort();
const missingInEn = [...fr].filter((p) => !en.has(p)).sort();

if (missingInFr.length === 0 && missingInEn.length === 0) {
  console.log(`i18n parity OK — ${en.size} pages in both docs/en/ and docs/fr/.`);
  process.exit(0);
}

if (missingInFr.length) {
  console.error("Missing in docs/fr/:");
  for (const p of missingInFr) console.error(`  - ${p}`);
}
if (missingInEn.length) {
  console.error("Missing in docs/en/:");
  for (const p of missingInEn) console.error(`  - ${p}`);
}
process.exit(1);
