import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

const page = readFileSync(new URL("../src/app/page.tsx", import.meta.url), "utf8");

test("Framefield homepage uses the new brand and curated library shell", () => {
  assert.match(page, /Framefield/);
  assert.match(page, /function Library/);
  assert.doesNotMatch(
    page,
    /Aster|Radian Works|Cinder Atelier|Hushwork|Forma Common|Phase|Rouge/,
  );
});

test("Framefield positions the library as a starting point", () => {
  assert.match(page, /Start from something worth building\./);
});

test("Framefield shows placeholder catalog entries before real assets", () => {
  assert.match(page, /const ASSETS: Asset\[\] = \[\s*{/);
  assert.match(page, /placeholder: true/);
  assert.match(page, /Coming soon/);
});

test("Framefield has no seeded template preview videos", () => {
  for (const file of [
    "aster.mp4",
    "radian.mp4",
    "phase.mp4",
    "hushwork.mp4",
    "forma-common.mp4",
    "cinder.mp4",
    "rouge.mp4",
  ]) {
    assert.equal(existsSync(new URL(`../public/${file}`, import.meta.url)), false, file);
  }
});
