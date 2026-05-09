/**
 * Raster branding from `public/new_logo/` → `public/branding/`, favicon.ico, app icons.
 *
 * Inputs:
 * - AG1CN.jpg — app icon artwork (center-cropped to square → favicons + github-app PNGs)
 * - kQULq.jpg — horizontal logo lockup → wordmark PNG
 *
 * Run: npm run sync:branding
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import toIco from "to-ico";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const iconSrc = path.join(root, "public/new_logo/AG1CN.jpg");
const wordSrc = path.join(root, "public/new_logo/kQULq.jpg");
const outDir = path.join(root, "public/branding");

await (async () => {
  if (!fs.existsSync(iconSrc)) {
    console.error("Missing:", iconSrc);
    process.exit(1);
  }
  if (!fs.existsSync(wordSrc)) {
    console.error("Missing:", wordSrc);
    process.exit(1);
  }

  fs.mkdirSync(outDir, { recursive: true });

  const meta = await sharp(iconSrc).metadata();
  const W = meta.width ?? 1;
  const H = meta.height ?? 1;
  const side = Math.min(W, H);
  const left = Math.floor((W - side) / 2);
  const top = Math.floor((H - side) / 2);

  const sq = sharp(iconSrc)
    .flatten({ background: { r: 255, g: 255, b: 255 } })
    .extract({
      left,
      top,
      width: side,
      height: side,
    });

  await sq
    .clone()
    .resize(512, 512)
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toFile(path.join(outDir, "logomesh-github-app-512.png"));

  await sq
    .clone()
    .resize(512, 512)
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toFile(path.join(outDir, "logomesh-github-app.png"));

  await sq
    .clone()
    .resize(256, 256)
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toFile(path.join(outDir, "logomesh-github-app-256.png"));

  const icoSizes = [16, 32, 48];
  const icoBuffers = await Promise.all(
    icoSizes.map((s) => sq.clone().resize(s, s).png().toBuffer()),
  );
  fs.writeFileSync(path.join(root, "app/favicon.ico"), await toIco(icoBuffers));

  await sharp(wordSrc)
    .flatten({ background: { r: 255, g: 255, b: 255 } })
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toFile(path.join(outDir, "logomesh-wordmark.png"));

  console.log(
    "Wrote app/favicon.ico and public/branding/logomesh-*.png (from public/new_logo/)",
  );
})();
