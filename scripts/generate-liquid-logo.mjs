// Run with: bun scripts/generate-liquid-logo.mjs
// Uses sharp already installed with Next.js. No runtime image processing.
// Bevel algorithm adapted from paper-design/liquid-logo at 689bb38a1e0d5a6a8baf2d34847635eefde19994.
// License: ../public/licenses/paper-liquid-logo.txt
import { readFile } from "node:fs/promises";
import sharp from "sharp";

const source = await readFile(new URL("../components/logo.tsx", import.meta.url), "utf8");
const paths = source.match(/<path[\s\S]*?\/>/g);
if (paths?.length !== 3) throw new Error("Logo geometry changed; review texture generation.");
const width = 951;
const height = 851;
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
<rect width="100%" height="100%" fill="white"/>
${paths.join("\n").replaceAll("var(--logo-ink)", "black").replaceAll("var(--logo-bg)", "white").replaceAll("fillRule", "fill-rule").replaceAll("clipRule", "clip-rule")}
</svg>`;
const pixels = await sharp(Buffer.from(svg)).removeAlpha().greyscale().raw().toBuffer();
const inside = Uint8Array.from(pixels, (value) => Number(value < 128));
const interior = [];
for (let y = 1; y < height - 1; y++) {
  for (let x = 1; x < width - 1; x++) {
    const i = y * width + x;
    if (!inside[i]) continue;
    let boundary = false;
    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        if (!inside[i + dy * width + dx]) boundary = true;
      }
    }
    if (!boundary) interior.push(i);
  }
}
let field = new Float32Array(width * height);
let next = new Float32Array(width * height);
for (let iteration = 0; iteration < 300; iteration++) {
  for (const i of interior) {
    next[i] = (0.01 + field[i - 1] + field[i + 1] + field[i - width] + field[i + width]) / 4;
  }
  [field, next] = [next, field];
}
let max = 0;
for (const value of field) max = Math.max(max, value);
if (!max) throw new Error("Logo mask is empty.");
const texture = Buffer.from(Uint8Array.from(field, (value) => Math.round(255 * (1 - (value / max) ** 2))));
await sharp(texture, { raw: { width, height, channels: 1 } })
  .toColourspace("b-w")
  .png({ compressionLevel: 9 })
  .toFile(new URL("../public/logo-liquid.png", import.meta.url).pathname);
