import { expect, test } from "bun:test";
import { certifications, foundational } from "./certifications";

test("names are unique, so React keys stay stable", () => {
  const names = [...certifications, ...foundational].map((c) => c.name);
  expect(new Set(names).size).toBe(names.length);
});

test("every credential link points at credly", () => {
  for (const cert of [...certifications, ...foundational]) {
    if (cert.url) expect(cert.url).toStartWith("https://www.credly.com/badges/");
  }
});
