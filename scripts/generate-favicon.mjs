/**
 * Writes app/favicon.ico from the branding PNG (multi-size .ico for browsers).
 * Next.js serves app/favicon.ico at /favicon.ico — keep a single file here (not public/).
 * Run: npm run generate:favicon
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import toIco from "to-ico";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const src = path.join(root, "public/branding/logomesh-github-app-256.png");
const out = path.join(root, "app/favicon.ico");

const sizes = [16, 32, 48];
const buffers = await Promise.all(
  sizes.map((s) =>
    sharp(src).resize(s, s).png().toBuffer(),
  ),
);

const ico = await toIco(buffers);
fs.writeFileSync(out, ico);
console.log("Wrote", out);
