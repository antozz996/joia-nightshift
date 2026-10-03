import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";

const NEXT_DIR = path.resolve(".next");
const BUDGET_BYTES = 200 * 1024;

function findFiles(directory, target, results = []) {
  if (!fs.existsSync(directory)) return results;

  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) findFiles(full, target, results);
    else if (entry.name === target) results.push(full);
  }

  return results;
}

function resolveChunk(file) {
  const normalized = file
    .replace(/^\/_next\//, "")
    .replace(/^_next\//, "")
    .replace(/^\/+/, "");

  const candidates = [
    path.join(NEXT_DIR, normalized),
    path.join(NEXT_DIR, "static", normalized.replace(/^static\//, "")),
  ];

  return candidates.find((candidate) => fs.existsSync(candidate));
}

const manifests = findFiles(NEXT_DIR, "app-build-manifest.json");

if (!manifests.length) {
  console.error("Performance budget: app-build-manifest.json not found.");
  process.exit(1);
}

let rootFiles = [];

for (const manifestPath of manifests) {
  const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
  const pages = manifest.pages ?? {};
  const root =
    pages["/page"] ??
    pages["page"] ??
    pages["app/page"] ??
    pages["/(root)/page"];

  if (Array.isArray(root) && root.length) {
    rootFiles = root;
    break;
  }
}

if (!rootFiles.length) {
  console.error(
    "Performance budget: root App Router entry not found in build manifests.",
  );
  process.exit(1);
}

const chunks = [...new Set(rootFiles)]
  .filter((file) => file.endsWith(".js"))
  .map(resolveChunk)
  .filter(Boolean);

if (!chunks.length) {
  console.error("Performance budget: no root JavaScript chunks resolved.");
  process.exit(1);
}

const totalGzip = chunks.reduce((total, file) => {
  const source = fs.readFileSync(file);
  return total + zlib.gzipSync(source, { level: 9 }).length;
}, 0);

const kb = (totalGzip / 1024).toFixed(1);
const budgetKb = (BUDGET_BYTES / 1024).toFixed(0);

console.log("Root initial JavaScript (gzip): " + kb + " KB");
console.log("Budget: " + budgetKb + " KB");

if (totalGzip > BUDGET_BYTES) {
  console.error(
    "Performance budget exceeded by " +
      ((totalGzip - BUDGET_BYTES) / 1024).toFixed(1) +
      " KB.",
  );
  process.exit(1);
}

console.log("Performance budget passed.");
