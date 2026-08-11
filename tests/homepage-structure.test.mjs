import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

const page = readFileSync(new URL("../src/app/page.tsx", import.meta.url), "utf8");
const styles = readFileSync(
  new URL("../src/app/globals.css", import.meta.url),
  "utf8",
);
const heroVideo = new URL("../public/library/hero/framefield-hero-ambient.mp4", import.meta.url);

test("homepage contains the editorial narrative anchors", () => {
  for (const anchor of ["#top", "#library", "#pricing", "#footer"]) {
    assert.match(page, new RegExp(`id=\"${anchor.slice(1)}\"`));
  }
});

test("homepage keeps the intentionally reduced section order", () => {
  assert.match(page, /<Hero[\s\S]*<Library[\s\S]*<Pricing[\s\S]*<Footer \/>/);
  assert.doesNotMatch(page, /<Problem \/>|<Workflow|<Collections \/>/);
});

test("homepage keeps the library controls available", () => {
  assert.match(page, /id="library-search"/);
  assert.match(page, /onFilterChange/);
  assert.match(page, /previewVideo/);
});

test("copy prompt uses a loading morph before the copied state", () => {
  assert.match(page, /copyingAssetId/);
  assert.match(page, /isCopying={copyingAssetId === asset\.id}/);
  assert.match(page, /disabled={isCopying}/);
  assert.match(page, /<AnimatePresence initial={false} mode="wait">/);
  assert.match(page, /LoaderCircle/);
  assert.match(page, /className="copy-action-spinner"/);
  assert.match(styles, /\.copy-action-state\s*\{/);
  assert.match(styles, /\.copy-action-spinner\s*\{/);
});

test("homepage uses the Framefield frame system", () => {
  assert.match(page, /function FrameDetails/);
  assert.match(page, /function SectionSeparator/);
  assert.match(page, /className="framefield-site"/);
  assert.match(page, /className="stripe-separator"/);
});

test("hero uses the ambient background video inside the framed canvas", () => {
  assert.equal(existsSync(heroVideo), true);
  assert.match(page, /className="hero-video"/);
  assert.match(page, /src="\/library\/hero\/framefield-hero-ambient\.mp4"/);
  assert.match(page, /autoPlay/);
  assert.match(page, /loop/);
  assert.match(page, /muted/);
  assert.match(styles, /\.hero-video\s*\{[\s\S]*object-fit:\s*cover/);
  assert.match(styles, /\.hero-video-overlay\s*\{[\s\S]*pointer-events:\s*none/);
});

test("hero does not render the retired arc decorations", () => {
  assert.doesNotMatch(page, /hero-arc/);
  assert.doesNotMatch(styles, /\.hero-arc/);
});

test("navbar follows the framed Precode composition", () => {
  const navigation = page.slice(
    page.indexOf("function Navigation"),
    page.indexOf("type LibraryProps"),
  );

  assert.match(page, /className="navbar-slot"/);
  assert.match(navigation, /<FrameDetails \/>/);
  assert.doesNotMatch(navigation, /search-trigger/);
});

test("framed sections keep all four corner markers inside their borders", () => {
  assert.match(styles, /\.frame-corner-tl \{ top: 0; left: 0; \}/);
  assert.match(styles, /\.frame-corner-tr \{ top: 0; right: 0;/);
  assert.match(styles, /\.frame-corner-br \{ right: 0; bottom: 0;/);
  assert.match(styles, /\.frame-corner-bl \{ bottom: 0; left: 0;/);
});

test("hero uses viewport-aware centering instead of a fixed tall offset", () => {
  assert.match(styles, /min-height: clamp\(680px, calc\(100svh - 150px\), 820px\)/);
  assert.match(styles, /place-items: center/);
  assert.match(styles, /\.hero-content \{[\s\S]*?margin: 0 auto;/);
});

test("category ticker reserves enough width for its longest label", () => {
  assert.match(styles, /width: clamp\(280px, 33vw, 420px\)/);
});

test("homepage uses the Lichen Editorial palette tokens", () => {
  assert.match(styles, /--canvas: #101214/);
  assert.match(styles, /--ink: #f3f0e7/);
  assert.match(styles, /--iris: #a89bff/);
  assert.match(styles, /--clay: #e2785b/);
  assert.match(styles, /--moss: #7faf99/);
});

test("CTA labels use a per-letter rolling hover treatment", () => {
  assert.match(page, /function RollingText/);
  assert.match(page, /className="rolling-text"/);
  assert.match(page, /className="rolling-space"/);
  assert.match(page, /className="rolling-glyph-track"/);
  assert.doesNotMatch(page, /const glyph = character === " " \? "\\u00a0" : character;/);
  assert.match(styles, /\.rolling-glyph-current/);
  assert.match(styles, /\.rolling-space[\s\S]*width: 0\.2em/);
  assert.match(styles, /--roll-delay/);
  assert.match(styles, /transition: transform 220ms linear/);
  assert.match(styles, /\.rolling-glyph-track[\s\S]*grid-template-rows: repeat\(2, 1\.3em\)/);
  assert.match(styles, /\.rolling-glyph-next[\s\S]*grid-row: 2/);
  assert.match(styles, /height: 1\.3em;\n  overflow: hidden;\n  vertical-align: bottom;/);
  assert.match(styles, /\.rolling-glyph \{[\s\S]*clip-path: inset\(0\)/);
  assert.match(styles, /\.secondary-button:hover .rolling-glyph-track[\s\S]*transform: translateY\(-50%\)/);
  assert.match(styles, /\.primary-button:hover[\s\S]*background: var\(--ink\)/);
  assert.match(styles, /\.secondary-button:hover[\s\S]*background: var\(--ink\)/);
});

test("CTA rolling tracks reserve room for glyph ink during the vertical handoff", () => {
  assert.match(styles, /\.rolling-text \{[\s\S]*height: 1\.3em;[\s\S]*line-height: 1\.3;/);
  assert.match(styles, /\.rolling-glyph \{[\s\S]*height: 1\.3em;[\s\S]*clip-path: inset\(0\)/);
  assert.match(styles, /\.rolling-glyph-track \{[\s\S]*grid-template-rows: repeat\(2, 1\.3em\)/);
  assert.match(styles, /\.rolling-glyph-current,[\s\S]*line-height: 1\.3;/);
});
