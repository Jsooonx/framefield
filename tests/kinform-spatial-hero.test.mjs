import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

const fromRoot = (path) => new URL(`../${path}`, import.meta.url);
const read = (path) => readFileSync(fromRoot(path), "utf8");

test("KINFORM has an isolated Hero package, metadata, and route", () => {
  const metadataPath = "library/sections/kinform-spatial-hero/metadata.ts";
  const routePath = "src/app/library/sections/kinform-spatial-hero/page.tsx";

  assert.equal(existsSync(fromRoot(metadataPath)), true);
  assert.equal(existsSync(fromRoot(routePath)), true);
  assert.equal(
    existsSync(fromRoot("library/sections/kinform-spatial-hero/source/KinformHero.tsx")),
    true,
  );
  const metadata = read(metadataPath);
  const route = read(routePath);
  assert.match(metadata, /slug:\s*"kinform-spatial-hero"/);
  assert.match(metadata, /sectionRoute\s*=\s*"\/library\/sections\/kinform-spatial-hero"/);
  assert.match(metadata, /route:\s*sectionRoute/);
  assert.match(metadata, /category:\s*"Hero"/);
  assert.match(metadata, /access:\s*"Free"/);
  assert.match(route, /KinformHero/);
});

test("KINFORM stages the Hero entrance and honors reduced motion", () => {
  const source = read("library/sections/kinform-spatial-hero/source/KinformHero.tsx");
  const css = read("library/sections/kinform-spatial-hero/source/kinform-hero.css");

  assert.match(source, /useReducedMotion/);
  assert.match(source, /KINFORM_EASE/);
  assert.match(source, /motion\.header/);
  assert.match(source, /motion\.h1/);
  assert.match(source, /clipPath/);
  assert.match(source, /delay:\s*reduceMotion \? 0 :/);
  assert.match(source, /Back to library/);
  assert.match(source, /ArrowLeft/);
  assert.match(css, /@media \(hover: hover\) and \(pointer: fine\)/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
  assert.doesNotMatch(css, /transition:\s*all/);
});

test("KINFORM protects the Hero at small widths without a Framefield shell", () => {
  const source = read("library/sections/kinform-spatial-hero/source/KinformHero.tsx");
  const css = read("library/sections/kinform-spatial-hero/source/kinform-hero.css");

  assert.match(source, /aria-expanded/);
  assert.match(source, /Escape/);
  assert.match(css, /100svh/);
  assert.match(css, /@media \(max-width: 720px\)/);
  assert.match(css, /min-height:\s*44px/);
  assert.match(css, /backdrop-filter:\s*blur/);
  assert.doesNotMatch(source, /Copy Prompt|Pricing|Footer/);
});

test("KINFORM renders the selected local interior image", () => {
  const source = read("library/sections/kinform-spatial-hero/source/KinformHero.tsx");

  assert.equal(
    existsSync(fromRoot("public/library/sections/kinform-spatial-hero/hero-poster.webp")),
    true,
  );
  assert.equal(
    existsSync(fromRoot("library/sections/kinform-spatial-hero/references/reference-01-interior-selection.png")),
    true,
  );
  assert.match(source, /hero-poster\.webp/);
  assert.doesNotMatch(source, /ArcSphere|Where Architecture Meets Experience|Dubai/i);
});
