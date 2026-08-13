import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const fromRoot = (path) => `${root}/${path}`;
const read = (path) => readFileSync(fromRoot(path), "utf8");

const packageFiles = [
  "library/sections/northstar-testimonials/metadata.ts",
  "library/sections/northstar-testimonials/design.md",
  "library/sections/northstar-testimonials/source/NorthstarTestimonials.tsx",
  "library/sections/northstar-testimonials/source/NorthstarMetrics.tsx",
  "library/sections/northstar-testimonials/source/AtlasHouseCaseStudy.tsx",
  "library/sections/northstar-testimonials/source/northstar-motion.tsx",
  "library/sections/northstar-testimonials/source/northstar-testimonials.css",
  "src/app/library/sections/northstar-testimonials/page.tsx",
  "src/app/library/sections/northstar-testimonials/atlas-house/page.tsx",
];

test("NORTHSTAR Testimonials is an independently packaged section with an inline metrics story", () => {
  for (const path of packageFiles) {
    assert.ok(existsSync(fromRoot(path)), `Missing ${path}`);
  }

  const metadata = read("library/sections/northstar-testimonials/metadata.ts");
  assert.match(metadata, /slug:\s*"northstar-testimonials"/);
  assert.match(metadata, /access:\s*"Free"/);
  assert.match(metadata, /fictional/i);
  assert.doesNotMatch(metadata, /metricsRoute/);
  assert.equal(existsSync(fromRoot("src/app/library/sections/northstar-testimonials/metrics/page.tsx")), false);
});

test("NORTHSTAR routes retain only the universal library return control", () => {
  const motion = read("library/sections/northstar-testimonials/source/northstar-motion.tsx");
  const sources = [
    "library/sections/northstar-testimonials/source/NorthstarTestimonials.tsx",
    "library/sections/northstar-testimonials/source/AtlasHouseCaseStudy.tsx",
  ].map(read);

  assert.match(motion, /Back to library/);
  for (const source of sources) {
    assert.match(source, /NorthstarBack/);
    assert.doesNotMatch(source, /<(nav|footer)\b/i);
    assert.doesNotMatch(source, /Framefield/);
  }
});

test("NORTHSTAR library return control matches the shared preview contract", () => {
  const motion = read("library/sections/northstar-testimonials/source/northstar-motion.tsx");
  const styles = read("library/sections/northstar-testimonials/source/northstar-testimonials.css");

  assert.match(motion, /<ArrowLeft size=\{13\} strokeWidth=\{2\}/);
  assert.match(styles, /\.northstar-library-back\s*\{[^}]*position:\s*fixed/);
  assert.match(styles, /\.northstar-library-back\s*\{[^}]*right:\s*clamp\(24px, 3\.7vw, 56px\)/);
  assert.match(styles, /\.northstar-library-back\s*\{[^}]*bottom:\s*14px/);
  assert.match(styles, /\.northstar-library-back\s*\{[^}]*min-height:\s*34px/);
  assert.match(styles, /\.northstar-library-back\s*\{[^}]*gap:\s*9px/);
  assert.match(styles, /\.northstar-library-back\s*\{[^}]*padding:\s*5px 11px 5px 6px/);
  assert.match(styles, /\.northstar-library-back\s*\{[^}]*backdrop-filter:\s*blur\(14px\)/);
  assert.match(styles, /\.northstar-library-back:focus-visible\s*\{[^}]*outline:\s*2px solid #c8ff4a[^}]*outline-offset:\s*4px/);
  assert.match(styles, /\.northstar-library-back-icon\s*\{[^}]*width:\s*22px[^}]*height:\s*22px/);
  assert.match(styles, /\.northstar-library-back:hover \.northstar-library-back-icon,[\s\S]*?transform:\s*translateX\(-2px\)/);
  assert.match(styles, /@media \(max-width: 560px\)[\s\S]*\.northstar-library-back \{ right: 20px; bottom: 16px; \}/);
});

test("NORTHSTAR uses local original visual assets and reduced-motion-safe counters", () => {
  for (const asset of [
    "public/library/sections/northstar-testimonials/atlas-house-portrait.webp",
    "public/library/sections/northstar-testimonials/cobalt-data-field.webp",
    "public/library/sections/northstar-testimonials/performance-orbit.webp",
    "public/library/sections/northstar-testimonials/pipeline-texture.webp",
  ]) {
    assert.ok(existsSync(fromRoot(asset)), `Missing ${asset}`);
  }

  const motion = read("library/sections/northstar-testimonials/source/northstar-motion.tsx");
  assert.match(motion, /useReducedMotion/);
  assert.match(motion, /useInView/);
  assert.match(motion, /once:\s*true/);
});

test("NORTHSTAR counters use a slower cinematic settle", () => {
  const motion = read("library/sections/northstar-testimonials/source/northstar-motion.tsx");

  assert.match(motion, /const duration = 1050/);
  assert.match(motion, /1 - \(1 - progress\) \*\* 5/);
});

test("NORTHSTAR pipeline bars rise in a staggered entrance", () => {
  const source = read("library/sections/northstar-testimonials/source/NorthstarMetrics.tsx");

  assert.match(source, /motion\.i/);
  assert.match(source, /scaleY:\s*0/);
  assert.match(source, /index \* 0\.08/);
  assert.match(source, /reduced \? false/);
});

test("NORTHSTAR experience signal keeps type separated and counts its outcomes", () => {
  const source = read("library/sections/northstar-testimonials/source/NorthstarMetrics.tsx");
  const styles = read("library/sections/northstar-testimonials/source/northstar-testimonials.css");

  assert.match(source, /MetricCounter value=\{48\} prefix="\+" suffix="%"/);
  assert.match(source, /MetricCounter value=\{42\} prefix="\+" suffix="%"/);
  assert.match(source, /MetricCounter value=\{2\.9\} suffix="%"/);
  assert.match(source, /MetricCounter value=\{4\.1\} suffix="%"/);
  assert.match(styles, /northstar-conversion-line/);
  assert.match(styles, /northstar-conversion-headline\s*\{[^}]*line-height:\s*1\.04/);
  assert.match(styles, /northstar-conversion-line\s*\{[^}]*text-wrap:\s*pretty/);
  assert.match(styles, /northstar-conversion-line \+ \.northstar-conversion-line\s*\{[^}]*margin-top:\s*0\.24em/);
});

test("NORTHSTAR is one review-ready catalog card, not a homepage redesign", () => {
  const homepage = read("src/app/page.tsx");
  const metadata = read("library/sections/northstar-testimonials/metadata.ts");

  assert.match(homepage, /northstarTestimonialsAsset/);
  assert.match(homepage, /title:\s*northstarTestimonialsAsset\.title/);
  assert.match(homepage, /previewImage:\s*northstarTestimonialsAsset\.preview/);
  assert.match(homepage, /previewVideo:\s*northstarTestimonialsAsset\.previewVideo/);
  assert.match(homepage, /promptUrl:\s*northstarTestimonialsAsset\.promptUrl/);
  assert.match(homepage, /previewUrl:\s*northstarTestimonialsAsset\.route/);
  assert.match(metadata, /status:\s*"published"/);
  assert.match(metadata, /previewVideo:\s*"\/library\/sections\/northstar-testimonials\/preview\.mp4"/);
  assert.match(metadata, /promptUrl:\s*"\/library\/sections\/northstar-testimonials\/master-prompt\.md"/);
});

test("NORTHSTAR catalog delivery keeps visual assets local and the prompt out of R2", () => {
  for (const asset of [
    "public/library/sections/northstar-testimonials/preview.mp4",
    "public/library/sections/northstar-testimonials/atlas-house-portrait.webp",
    "public/library/sections/northstar-testimonials/cobalt-data-field.webp",
    "public/library/sections/northstar-testimonials/performance-orbit.webp",
    "public/library/sections/northstar-testimonials/pipeline-texture.webp",
    "library/sections/northstar-testimonials/master-prompt.md",
    "public/library/sections/northstar-testimonials/master-prompt.md",
  ]) {
    assert.ok(existsSync(fromRoot(asset)), `Missing ${asset}`);
  }

  const packagePrompt = read("library/sections/northstar-testimonials/master-prompt.md");
  const publicPrompt = read("public/library/sections/northstar-testimonials/master-prompt.md");
  assert.equal(packagePrompt, publicPrompt);
  for (const asset of [
    "atlas-house-portrait.webp",
    "cobalt-data-field.webp",
    "performance-orbit.webp",
    "pipeline-texture.webp",
    "preview.mp4",
  ]) {
    const hostedUrl = `https://assets.framefield.my.id/sections/northstar-testimonials/${asset}`;
    assert.match(packagePrompt, new RegExp(hostedUrl.replace(/[.*+?^${}()|[\\]\\\\]/g, "\\\\$&")));
  }
});

test("NORTHSTAR master prompt is standalone and has no host navigation residue", () => {
  const packagePrompt = read("library/sections/northstar-testimonials/master-prompt.md");
  const publicPrompt = read("public/library/sections/northstar-testimonials/master-prompt.md");

  for (const prompt of [packagePrompt, publicPrompt]) {
    assert.doesNotMatch(prompt, /Framefield|NorthstarBack|northstar-library-back|Back to library|href=["']\/#library["']/);
    assert.doesNotMatch(prompt, /host wrapper|host CTA|host-only|catalog wrapper|Copy Prompt|payment UI/i);
  }
});

test("NORTHSTAR bento keeps every card in a bounded area and uses the generated imagery", () => {
  const source = read("library/sections/northstar-testimonials/source/NorthstarTestimonials.tsx");
  const styles = read("library/sections/northstar-testimonials/source/northstar-testimonials.css");

  for (const asset of ["atlas-house-portrait.webp", "cobalt-data-field.webp", "performance-orbit.webp", "pipeline-texture.webp"]) {
    assert.match(source, new RegExp(asset.replace(".", "\\.")));
  }
  assert.match(styles, /grid-template-areas:/);
  assert.match(styles, /"confidence quote-one statement quote-two"/);
  assert.match(styles, /"confidence cta note quote-two"/);
  assert.doesNotMatch(styles, /\.northstar-card--statement\s*\{[^}]*min-height:\s*24rem/);
});

test("NORTHSTAR keeps metrics below the testimonials bento on the overview route", () => {
  const source = read("library/sections/northstar-testimonials/source/NorthstarTestimonials.tsx");
  const metrics = read("library/sections/northstar-testimonials/source/NorthstarMetrics.tsx");

  assert.match(source, /NorthstarMetrics/);
  assert.match(source, /href=["']#metrics["']/);
  assert.match(source, /<NorthstarMetrics\s*\/>/);
  assert.match(metrics, /id=["']metrics["']/);
  assert.match(metrics, /northstar-metrics-row/);
});

test("NORTHSTAR overview keeps the upper-left field clear", () => {
  const source = read("library/sections/northstar-testimonials/source/NorthstarTestimonials.tsx");

  assert.doesNotMatch(source, /northstar-wordmark/);
});
