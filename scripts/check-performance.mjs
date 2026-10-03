import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";

const NEXT_DIR = path.resolve(".next");
const BUDGET_BYTES = 200 * 1024;

function walk(directory, predicate, results = []) {
  if (!fs.existsSync(directory)) return results;

  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) walk(full, predicate, results);
    else if (predicate(full, entry.name)) results.push(full);
  }

  return results;
}

function resolveChunk(file) {
  const normalized = file
    .split("?")[0]
    .replace(/^\/_next\//, "")
    .replace(/^_next\//, "")
    .replace(/^\/+/, "");

  const candidates = [
    path.join(NEXT_DIR, normalized),
    path.join(NEXT_DIR, "static", normalized.replace(/^static\//, "")),
  ];

  return candidates.find((candidate) => fs.existsSync(candidate));
}

function filesFromPrerenderedHtml() {
  const appDir = path.join(NEXT_DIR, "server", "app");
  const htmlFiles = walk(appDir, (_full, name) => name.endsWith(".html"));

  const preferred =
    htmlFiles.find((file) => file.endsWith(path.join("app", "page.html"))) ??
    htmlFiles.find((file) => /(^|[/\\])index\.html$/.test(file)) ??
    htmlFiles[0];

  if (!preferred) return [];

  const html = fs.readFileSync(preferred, "utf8");
  const matches = [
    ...html.matchAll(/(?:src|href)=["']([^"']+\.js(?:\?[^"']*)?)["']/g),
  ];

  return matches.map((match) => match[1]);
}

function filesFromBuildManifest() {
  const manifests = walk(
    NEXT_DIR,
    (_full, name) =>
      name === "app-build-manifest.json" || name === "build-manifest.json",
  );

  for (const manifestPath of manifests) {
    let manifest;
    try {
      manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
    } catch {
      continue;
    }

    const pages = manifest.pages ?? {};
    const root =
      pages["/page"] ??
      pages["/"] ??
      pages["page"] ??
      pages["app/page"];

    const shared = [
      ...(manifest.rootMainFiles ?? []),
      ...(manifest.polyfillFiles ?? []),
      ...(manifest.lowPriorityFiles ?? []),
    ];

    const files = [
      ...(Array.isArray(root) ? root : []),
      ...shared,
    ].filter((file) => typeof file === "string" && file.endsWith(".js"));

    if (files.length) return files;
  }

  return [];
}

const referencedFiles = filesFromPrerenderedHtml();
const fallbackFiles = referencedFiles.length
  ? referencedFiles
  : filesFromBuildManifest();

if (!fallbackFiles.length) {
  console.error(
    "Performance budget: could not resolve the root route initial JavaScript.",
  );
  process.exit(1);
}

const chunks = [...new Set(fallbackFiles)]
  .filter((file) => file.endsWith(".js") || file.includes(".js?"))
  .map(resolveChunk)
  .filter(Boolean);

if (!chunks.length) {
  console.error("Performance budget: no referenced JavaScript chunks exist on disk.");
  process.exit(1);
}

const totalGzip = chunks.reduce((total, file) => {
  const source = fs.readFileSync(file);
  return total + zlib.gzipSync(source, { level: 9 }).length;
}, 0);

const kb = (totalGzip / 1024).toFixed(1);
const budgetKb = (BUDGET_BYTES / 1024).toFixed(0);

console.log("Root initial JavaScript (gzip): " + kb + " KB");
console.log("Referenced chunks: " + chunks.length);
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
