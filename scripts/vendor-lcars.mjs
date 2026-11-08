// Regenerates src/styles/vendor/lcars-classic.css from a downloaded copy of the
// LCARS Inspired Website Template's Classic theme stylesheet.
//
// Usage:
//   curl -sL https://www.thelcars.com/assets/classic-2702.css -o /tmp/classic.css
//   node scripts/vendor-lcars.mjs /tmp/classic.css
//
// The template's EULA forbids hotlinking, so the site serves its own copy. The
// changes made here are listed in the header this script writes, as the EULA's
// attribution clause asks.

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const [source] = process.argv.slice(2);
if (!source) {
  console.error("usage: node scripts/vendor-lcars.mjs <path-to-classic.css>");
  process.exit(1);
}

const out = new URL("../src/styles/vendor/lcars-classic.css", import.meta.url);
let css = readFileSync(source, "utf8").replace(/\r\n/g, "\n");

// 1. Drop the template's @font-face rules; Antonio comes from @fontsource/antonio.
const before = css.length;
css = css.replace(/@font-face\s*\{[^}]*\}\s*/g, "");
if (css.length === before) throw new Error("expected @font-face rules to remove");

// 2. Let <a class="lcars"> links wear the same styles as <button>, so navigation
//    uses real links instead of onclick redirects.
const buttonSelectors = [
  [/^button \{/m, ":is(button, a.lcars) {"],
  [/^button:hover \{/m, ":is(button, a.lcars):hover {"],
  [/^button:active \{/m, ":is(button, a.lcars):active {"],
  [/^nav button\t\{/m, "nav :is(button, a.lcars)\t{"],
  [/^\.buttons button\t\{/m, ".buttons :is(button, a.lcars)\t{"],
  [/^\.sidebar-nav button,/m, ".sidebar-nav :is(button, a.lcars),"],
  [/^button\[class\^="panel-"\] \{/m, ':is(button, a.lcars)[class^="panel-"] {'],
];
for (const [pattern, replacement] of buttonSelectors) {
  if (!pattern.test(css)) throw new Error(`selector not found: ${pattern}`);
  css = css.replace(pattern, replacement);
}

const header = `/*
  Vendored from the LCARS Inspired Website Template (Classic theme)
  by Jim Robertus, https://www.thelcars.com, used under its EULA:
  https://www.thelcars.com/license/

  Modified for the Museum of Cool Science by scripts/vendor-lcars.mjs:
  - removed @font-face rules (Antonio is self-hosted via @fontsource/antonio)
  - extended button selectors to also match <a class="lcars"> links

  Do not edit by hand; rerun the script instead.
*/
`;

mkdirSync(dirname(fileURLToPath(out)), { recursive: true });
writeFileSync(out, header + css.replace(/^@charset "utf-8";\n/, ""));
console.log(`wrote ${fileURLToPath(out)}`);
