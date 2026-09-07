import { expect, test } from "bun:test";
import sharp from "sharp";

test("prepared logo texture preserves cutouts and bevels", async () => {
  const { data, info } = await sharp(new URL("../../public/logo-liquid.png", import.meta.url).pathname)
    .greyscale()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const pixel = (x: number, y: number) => data[y * info.width + x];
  expect([info.width, info.height]).toEqual([951, 851]);
  // White is empty in the shader, including the overpainted hair highlight.
  for (const [x, y] of [[0, 0], [475, 570], [250, 720], [680, 720], [450, 70]]) {
    expect(pixel(x, y)).toBe(255);
  }
  expect(pixel(450, 250)).toBeLessThan(128);
  // A true bevel has intermediate values, not just a binary silhouette.
  expect(new Set(data).size).toBeGreaterThan(200);
  expect(pixel(250, 599)).toBeLessThan(128);
});
