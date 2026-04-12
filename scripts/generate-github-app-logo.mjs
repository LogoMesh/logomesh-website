/**
 * Rasterizes the transparent SVG mark to PNG for GitHub App branding (512×512).
 * Run: node scripts/generate-github-app-logo.mjs
 * Requires: sharp (devDependency)
 */
import sharp from "sharp";
import { readFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const svgPath = join(root, "public/branding/logomesh-mark-transparent.svg");
const out512 = join(root, "public/branding/logomesh-github-app-512.png");
const out256 = join(root, "public/branding/logomesh-github-app-256.png");
const outMain = join(root, "public/branding/logomesh-github-app.png");

const svg = readFileSync(svgPath);

async function writePng(size, dest) {
  await sharp(svg, { density: 300 })
    .resize(size, size, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toFile(dest);
  console.log("Wrote", dest);
}

await writePng(512, out512);
await writePng(256, out256);
await writePng(512, outMain);
