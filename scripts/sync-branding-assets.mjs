/**
 * Raster branding from `public/new_logo/` → `public/branding/`, favicon.ico, app icons.
 *
 * Inputs:
 * - AG1CN.jpg — app icon artwork (rounded dark tile on a checkerboard-shape
 *   backdrop JPG). We auto-detect the dark tile bounding box and crop tight,
 *   so the final icons are pure tile + glyph with no checker bleed.
 * - kQULq.jpg — horizontal logo lockup → wordmark PNG (auto-trimmed to content).
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

/**
 * Locate the bounding box of the dark rounded-tile region in the source JPG.
 * The checkerboard backdrop has per-pixel luminance ≥ ~200 (light gray or
 * white); the icon tile is near-black (luminance ≤ ~40). A cheap threshold
 * scan gives us a reliable bounding box without alpha-matting gymnastics.
 */
async function findDarkBounds(filePath, { threshold = 80, pad = 0 } = {}) {
  const { data, info } = await sharp(filePath)
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;

  let minX = width,
    minY = height,
    maxX = -1,
    maxY = -1;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * channels;
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      // Relative luminance. We only care about "dark vs light" so
      // Rec.709 weights are overkill — unweighted mean is fine.
      const lum = (r + g + b) / 3;
      if (lum < threshold) {
        if (x < minX) minX = x;
        if (y < minY) minY = y;
        if (x > maxX) maxX = x;
        if (y > maxY) maxY = y;
      }
    }
  }

  if (maxX < 0) throw new Error(`No dark region found in ${filePath}`);

  minX = Math.max(0, minX - pad);
  minY = Math.max(0, minY - pad);
  maxX = Math.min(width - 1, maxX + pad);
  maxY = Math.min(height - 1, maxY + pad);

  return {
    left: minX,
    top: minY,
    width: maxX - minX + 1,
    height: maxY - minY + 1,
  };
}

/**
 * Expand a rectangle to square by extending the shorter side symmetrically.
 * Clamps to the parent canvas so we never extract beyond bounds.
 */
function squareOut(box, parent) {
  const side = Math.max(box.width, box.height);
  const cx = box.left + box.width / 2;
  const cy = box.top + box.height / 2;
  let left = Math.round(cx - side / 2);
  let top = Math.round(cy - side / 2);
  left = Math.max(0, Math.min(parent.width - side, left));
  top = Math.max(0, Math.min(parent.height - side, top));
  return { left, top, width: side, height: side };
}

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

  const iconMeta = await sharp(iconSrc).metadata();
  const parent = { width: iconMeta.width ?? 1, height: iconMeta.height ?? 1 };

  // Tight bounds around the dark tile, then square out so we preserve the
  // tile's rounded-square aspect.
  const darkBox = await findDarkBounds(iconSrc, { threshold: 80, pad: 2 });
  const cropBox = squareOut(darkBox, parent);

  // Composite a rounded-rect mask so the transparent corners are clean —
  // otherwise the JPG's checker-pattern backdrop peeks through at the
  // corners of the bounding-box square. Bake the mask into a PNG buffer
  // first so downstream resizes don't fight with composite input sizing.
  const side = cropBox.width;
  const cornerRadius = Math.round(side * 0.22); // iOS-style app-icon radius
  const mask = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${side}" height="${side}">` +
      `<rect x="0" y="0" width="${side}" height="${side}" ` +
      `rx="${cornerRadius}" ry="${cornerRadius}" fill="#000"/></svg>`,
  );

  const tileBuffer = await sharp(iconSrc)
    .extract(cropBox)
    .ensureAlpha()
    .composite([{ input: mask, blend: "dest-in" }])
    .png()
    .toBuffer();

  const tile = () => sharp(tileBuffer);

  await tile()
    .resize(512, 512)
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toFile(path.join(outDir, "logomesh-github-app-512.png"));

  await tile()
    .resize(512, 512)
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toFile(path.join(outDir, "logomesh-github-app.png"));

  await tile()
    .resize(256, 256)
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toFile(path.join(outDir, "logomesh-github-app-256.png"));

  const icoSizes = [16, 32, 48];
  const icoBuffers = await Promise.all(
    icoSizes.map((s) =>
      tile()
        .resize(s, s)
        .png()
        .toBuffer(),
    ),
  );
  fs.writeFileSync(path.join(root, "app/favicon.ico"), await toIco(icoBuffers));

  // Wordmark: trim() collapses the near-white margin around the lockup so
  // the PNG hugs the art instead of shipping with a hundred pixels of
  // empty white on each side. Keep a small pad for breathing room when
  // the wordmark lands next to other chrome.
  await sharp(wordSrc)
    .flatten({ background: { r: 255, g: 255, b: 255 } })
    .trim({ threshold: 10 })
    .extend({
      top: 24,
      bottom: 24,
      left: 36,
      right: 36,
      background: { r: 255, g: 255, b: 255 },
    })
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toFile(path.join(outDir, "logomesh-wordmark.png"));

  console.log(
    `Wrote app/favicon.ico, public/branding/logomesh-*.png ` +
      `(tile crop ${cropBox.width}x${cropBox.height} @ ${cropBox.left},${cropBox.top})`,
  );
})();
