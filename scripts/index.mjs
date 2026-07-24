#!/usr/bin/env node
// Regenerate the compact active index in a Context directory's AGENTS.md and
// validate active markup frontmatter along the way.
//
// Usage: node scripts/index.mjs <path-to-Context>
//
// The block is guard-delimited and idempotent. Content outside the block is
// preserved. The Archive tree is skipped entirely.

import { readFileSync, writeFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join, relative, resolve, basename, extname } from "node:path";

const BEGIN = "<!-- BEGIN context-directory-opinions index (generated, do not edit) -->";
const END = "<!-- END context-directory-opinions index -->";
const MARKUP = new Set([".md", ".html"]);
const ARCHIVE = "Archive";
const DATE = /^\d{4}-\d{2}-\d{2}$/;
const INDEX_WARNING_BYTES = 24 * 1024;
const COMBINED_WARNING_BYTES = 32 * 1024;

if (process.argv.includes("--help")) {
  console.log(
    "Usage: node scripts/index.mjs <path-to-Context>\n" +
      "Regenerates the compact active index in <path>/AGENTS.md and validates active frontmatter. Archive is skipped. Exits 1 on active errors.",
  );
  process.exit(0);
}

const args = process.argv.slice(2).filter((a) => a !== "--force");
const force = process.argv.includes("--force");
const root = resolve(args[0] ?? "./Context");
if (!existsSync(root) || !statSync(root).isDirectory()) {
  console.error(`ERROR: ${root} is not a directory`);
  process.exit(1);
}
if (basename(root) !== "Context" && !force) {
  console.error(
    `ERROR: ${root} is not named Context. The index block belongs only in a Context directory's AGENTS.md. Pass --force to override.`,
  );
  process.exit(1);
}

const docs = [];
const assets = [];
const skippedTrees = [];
const broken = [];
const errors = [];

function parseFrontmatter(raw, ext) {
  let block = null;
  if (ext === ".md") {
    const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    if (match) block = match[1];
  } else {
    const match = raw.match(/^<!--\r?\n([\s\S]*?)\r?\n-->/);
    if (match) block = match[1].replace(/^---\r?\n/, "").replace(/\r?\n---$/, "");
  }
  if (block === null) return null;

  const fields = {};
  const badLines = [];
  for (const line of block.split(/\r?\n/)) {
    if (!line.trim()) continue;
    const match = line.match(/^([\w-]+):\s*(.*)$/);
    if (!match) {
      badLines.push(line.trim());
      continue;
    }
    const value = match[2].trim();
    if (/^[|>][+-]?$/.test(value)) {
      badLines.push(`${match[1]}: block scalars are unsupported, use a single-line value`);
      continue;
    }
    fields[match[1]] = value.replace(/^"(.*)"$/s, "$1").replace(/^'(.*)'$/s, "$1");
  }
  return { fields, badLines };
}

function walk(dir) {
  for (const entry of readdirSync(dir).sort()) {
    const full = join(dir, entry);
    const rel = relative(root, full).replaceAll("\\", "/");
    if (statSync(full).isDirectory()) {
      const firstSegment = rel.split("/")[0];
      if (firstSegment === ARCHIVE) {
        skippedTrees.push(firstSegment);
        continue;
      }
      walk(full);
      continue;
    }
    if (entry === "AGENTS.md") continue;

    const ext = extname(entry).toLowerCase();
    if (!MARKUP.has(ext)) {
      assets.push(rel);
      continue;
    }

    const parsed = parseFrontmatter(readFileSync(full, "utf8"), ext);
    if (!parsed) {
      broken.push(rel);
      errors.push(`${rel}: missing frontmatter block`);
      continue;
    }

    const { fields, badLines } = parsed;
    const problems = badLines.map((line) => `unparseable frontmatter line: ${line}`);
    if (!fields.name) problems.push("missing `name`");
    if (!fields.description) problems.push("missing `description`");
    else if (fields.description.length > 1024) problems.push("`description` over 1024 characters");

    for (const key of ["date_created", "date_modified"]) {
      const value = fields[key];
      if (!value) {
        problems.push(`missing \`${key}\``);
        continue;
      }
      const date = new Date(`${value}T00:00:00Z`);
      if (!DATE.test(value) || Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== value) {
        problems.push(`\`${key}\` is not a real YYYY-MM-DD date`);
      }
    }

    if (problems.length) {
      broken.push(rel);
      for (const problem of problems) errors.push(`${rel}: ${problem}`);
      continue;
    }
    docs.push({ rel, ...fields });
  }
}

walk(root);

const lines = [
  BEGIN,
  "",
  "# Context Index",
  "",
  "Read `Context/AGENTS.md` before working in this directory. Follow any durable project instructions outside this generated block, use each description below as the trigger for what to read, and regenerate the index after any change.",
  "",
];

for (const doc of docs) {
  lines.push(`- [${doc.name}](<${doc.rel}>) → ${doc.description}`);
}

if (broken.length) {
  lines.push("", "## Unindexed (fix frontmatter)", "");
  for (const rel of broken) lines.push(`- \`${rel}\``);
}

lines.push("", END);
const block = lines.join("\n");

const agentsPath = join(root, "AGENTS.md");
let content = existsSync(agentsPath) ? readFileSync(agentsPath, "utf8") : "";
const eol = content.includes("\r\n") ? "\r\n" : "\n";
const guardPattern = new RegExp(
  `${BEGIN.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}[\\s\\S]*?${END.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`,
);

if (!content.trim()) content = `${block}\n`;
else if (guardPattern.test(content)) content = content.replace(guardPattern, () => block);
else content = `${content.trimEnd()}\n\n${block}\n`;
if (eol === "\r\n") content = content.replace(/\r?\n/g, "\r\n");
writeFileSync(agentsPath, content);

const indexBytes = Buffer.byteLength(content, "utf8");
if (indexBytes > INDEX_WARNING_BYTES) {
  console.warn(`WARNING: ${agentsPath} is ${indexBytes} bytes. Review active index scope and Context organization.`);
}

const parentAgentsPath = resolve(root, "..", "AGENTS.md");
if (existsSync(parentAgentsPath)) {
  const combinedBytes = indexBytes + Buffer.byteLength(readFileSync(parentAgentsPath, "utf8"), "utf8");
  if (combinedBytes > COMBINED_WARNING_BYTES) {
    console.warn(`WARNING: root and Context AGENTS.md total ${combinedBytes} bytes. Some clients may truncate project instructions.`);
  }
}

const skipped = [...new Set(skippedTrees)].sort();
console.log(
  `Indexed ${docs.length} active doc(s), omitted ${assets.length} active asset(s), skipped ${skipped.length ? skipped.join(" and ") : "no historical trees"}, ${broken.length} unindexed in ${agentsPath}`,
);
for (const error of errors) console.error(`ERROR: ${error}`);
if (errors.length) process.exit(1);
