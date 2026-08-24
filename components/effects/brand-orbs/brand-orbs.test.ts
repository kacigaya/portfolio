import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { expect, test } from "bun:test";
import {
  buildEngineModule,
  ENGINE_PATH,
  SOURCE_PATH,
  SOURCE_SHA256,
} from "@/scripts/build-brand-orbs-engine.mjs";
import { GAYA_MARK_PATH, GAYA_MARK_VIEWBOX } from "@/components/effects/brand-orbs/gaya-mark";
import { BRAND_ORBS_ENGINE } from "@/components/effects/brand-orbs/sources/engine.generated";

test("the vendored orb specimen is still the verified revision", () => {
  const digest = createHash("sha256").update(readFileSync(SOURCE_PATH)).digest("hex");
  expect(digest).toBe(SOURCE_SHA256);
});

test("the generated engine module is in sync with the specimen", () => {
  expect(readFileSync(ENGINE_PATH, "utf8")).toBe(buildEngineModule());
});

// BrandOrbs splices the site mark into the engine text by matching these two
// literals. They are asserted here as well as at runtime so a source bump is
// caught by `bun test` rather than by a blank canvas in the browser.
test("the mark injection anchors exist in the engine", () => {
  expect(BRAND_ORBS_ENGINE).toContain("  const MARK_PATHS = {\n    github:");
  expect(BRAND_ORBS_ENGINE).toContain("  const MODES = {\n    claude:");
});

test("the site mark matches the shipped logo", () => {
  const logo = readFileSync("public/logo_light.svg", "utf8");
  const fills = [...logo.matchAll(/<path\b[^>]* d="([^"]+)"/g)].map((m) => m[1]);
  // hair + glasses, the two #000 fills; the #d9d9d9 highlight path is excluded
  expect(GAYA_MARK_PATH).toBe(`${fills[0]} ${fills[2]}`);
  expect(logo).toContain(`viewBox="0 0 ${GAYA_MARK_VIEWBOX} 851"`);
});
