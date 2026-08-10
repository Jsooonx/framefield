import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";
import { PHASE_DEVELOPMENT_SERVER, PHASE_PRODUCTION_BUILD } from "next/constants.js";

const nextConfigUrl = new URL("../next.config.mjs", import.meta.url).href;

test("Next isolates development artifacts from production build artifacts", async () => {
  const configModule = await import(`${nextConfigUrl}?test=${Date.now()}`);
  const resolveConfig = typeof configModule.default === "function"
    ? configModule.default
    : () => configModule.default;

  assert.equal(resolveConfig(PHASE_DEVELOPMENT_SERVER).distDir, ".next-dev");
  assert.equal(resolveConfig(PHASE_PRODUCTION_BUILD).distDir, ".next");
  assert.equal(resolveConfig(PHASE_DEVELOPMENT_SERVER).typescript.tsconfigPath, "tsconfig.dev.json");
});

test("production type checking ignores stale development route manifests", () => {
  const tsconfig = readFileSync(new URL("../tsconfig.json", import.meta.url), "utf8");
  const developmentTsconfigPath = new URL("../tsconfig.dev.json", import.meta.url);

  assert.doesNotMatch(tsconfig, /\.next-dev\/types/);
  assert.equal(existsSync(developmentTsconfigPath), true);
  assert.match(readFileSync(developmentTsconfigPath, "utf8"), /\.next-dev\/types/);
});
