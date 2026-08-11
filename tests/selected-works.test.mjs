import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

const metadata = new URL("../library/sections/selected-works/metadata.ts", import.meta.url);
const sectionSource = new URL("../library/sections/selected-works/source/SelectedWorks.tsx", import.meta.url);
const sectionStyles = new URL("../library/sections/selected-works/source/selected-works.css", import.meta.url);
const sectionRoute = new URL("../src/app/library/sections/selected-works/page.tsx", import.meta.url);
const detailRoute = new URL("../src/app/library/sections/selected-works/[slug]/page.tsx", import.meta.url);
const homepage = new URL("../src/app/page.tsx", import.meta.url);
const legacyRoute = new URL("../src/app/works/[slug]/page.tsx", import.meta.url);

test("Selected Works is one section package with four child projects", () => {
  assert.equal(existsSync(metadata), true);
  const content = readFileSync(metadata, "utf8");

  assert.match(content, /selectedWorksAsset/);
  assert.match(content, /type:\s*"section"/);
  assert.match(content, /category:\s*"Works"/);
  assert.match(content, /const sectionRoute = "\/library\/sections\/selected-works"/);
  assert.match(content, /route:\s*sectionRoute/);
  assert.match(content, /SELECTED_WORKS/);
  assert.equal((content.match(/^    slug:/gm) ?? []).length, 4);
});

test("Library catalogs only the Selected Works section template", () => {
  const page = readFileSync(homepage, "utf8");

  assert.match(page, /selectedWorksAsset/);
  assert.match(page, /previewUrl:\s*selectedWorksAsset\.route/);
  assert.match(page, /previewVideo:\s*selectedWorksAsset\.previewVideo/);
  assert.doesNotMatch(page, /SELECTED_WORKS\.map/);
  assert.doesNotMatch(page, /\/works\//);
});

test("Selected Works catalog entry uses the named preview video", () => {
  const content = readFileSync(metadata, "utf8");

  assert.match(content, /title:\s*"4 Selected Works \(1\)"/);
  assert.match(content, /previewVideo:\s*"\/library\/sections\/selected-works\/preview\.mp4"/);
  assert.equal(existsSync(new URL("../public/library/sections/selected-works/preview.mp4", import.meta.url)), true);
});

test("Selected Works is the second catalog item", () => {
  const page = readFileSync(homepage, "utf8");
  const selectedIndex = page.indexOf("title: selectedWorksAsset.title");
  const saasIndex = page.indexOf('title: "SaaS launch system"');

  assert.ok(selectedIndex > -1);
  assert.ok(saasIndex > -1);
  assert.ok(selectedIndex < saasIndex);
});

test("Selected Works preview and details use nested section routes", () => {
  assert.equal(existsSync(sectionRoute), true);
  assert.equal(existsSync(detailRoute), true);
  assert.equal(existsSync(legacyRoute), false);

  const preview = readFileSync(sectionRoute, "utf8");
  const detail = readFileSync(detailRoute, "utf8");
  const source = readFileSync(sectionSource, "utf8");

  assert.match(preview, /SelectedWorks/);
  assert.match(detail, /generateStaticParams/);
  assert.match(detail, /notFound/);
  assert.match(detail, /selected-works/);
  assert.match(source, /Previous \/ \{previous\.number\}/);
  assert.match(source, /Next \/ \{next\.number\}/);
});

test("Selected Works uses fresh case studies with raster visual paths", () => {
  const content = readFileSync(metadata, "utf8");
  const slugs = ["cinder-bureau", "auralis", "stillhouse", "vela-objects"];

  for (const title of ["Cinder Bureau", "Auralis", "Stillhouse", "Vela Objects"]) {
    assert.match(content, new RegExp(`title: "${title}"`));
  }

  assert.doesNotMatch(content, /selected-works\/.+\.svg/);

  for (const slug of slugs) {
    assert.equal(existsSync(new URL(`../public/library/sections/selected-works/${slug}/visual-01.webp`, import.meta.url)), true);
    assert.equal(existsSync(new URL(`../public/library/sections/selected-works/${slug}/visual-02.webp`, import.meta.url)), true);
  }
});

test("Selected Works interactions remain scoped to the section implementation", () => {
  assert.equal(existsSync(sectionSource), true);
  assert.equal(existsSync(sectionStyles), true);
  const source = readFileSync(sectionSource, "utf8");
  const styles = readFileSync(sectionStyles, "utf8");

  assert.match(source, /selected-work-card/);
  assert.match(styles, /selected-work-card:hover \.selected-work-media img/);
  assert.match(styles, /work-detail-gallery/);
  assert.match(styles, /work-detail-neighbor:hover \.work-next-arrow/);
  assert.match(styles, /prefers-reduced-motion/);
});

test("Selected Works preview uses the approved editorial project-index composition", () => {
  const source = readFileSync(sectionSource, "utf8");
  const styles = readFileSync(sectionStyles, "utf8");

  assert.match(source, /Projects\./);
  assert.match(source, /©2026/);
  assert.match(source, /selected-work-title-rail/);
  assert.match(source, /selected-work-lockup/);
  assert.match(styles, /grid-template-columns:\s*repeat\(2/);
  assert.match(styles, /@media\s*\(max-width:\s*720px\)[\s\S]*selected-works-grid[\s\S]*grid-template-columns:\s*1fr/);
});

test("Selected Works uses the universal hero-style library back control", () => {
  const source = readFileSync(sectionSource, "utf8");
  const styles = readFileSync(sectionStyles, "utf8");

  assert.match(source, /selected-works-library-back-icon/);
  assert.match(styles, /position:\s*fixed/);
  assert.match(styles, /backdrop-filter:\s*blur\(14px\)/);
  assert.match(styles, /\.selected-works-library-back-icon\s*\{[\s\S]*width:\s*22px/);
});

test("Selected Works content is independent from Framefield branding", () => {
  const source = readFileSync(sectionSource, "utf8");
  const content = readFileSync(metadata, "utf8");

  assert.match(source, /Back to library/);
  assert.doesNotMatch(source, /Framefield archive|Built from Framefield/);
  assert.doesNotMatch(content, /created for Framefield/);
  assert.equal((source.match(/href=\"\/#library\"/g) ?? []).length, 1);
});

test("Selected Works details use the art-directed archive composition and staged motion", () => {
  const source = readFileSync(sectionSource, "utf8");
  const styles = readFileSync(sectionStyles, "utf8");

  for (const hook of [
    "work-detail-archive",
    "work-detail-context",
    "work-detail-index",
    "work-detail-lead",
    "work-detail-story",
    "work-detail-gallery",
    "work-detail-navigation",
  ]) {
    assert.match(source, new RegExp(hook));
  }

  assert.match(source, /whileInView/);
  assert.match(source, /once:\s*true/);
  assert.match(source, /useReducedMotion/);
  assert.match(source, /work-detail-lead/);
  assert.match(styles, /\.work-detail-lead/);
  assert.match(styles, /\.work-detail-story/);
  assert.match(styles, /\.work-detail-gallery/);
});

test("Selected Works detail titles reserve room for wrapped names", () => {
  const styles = readFileSync(sectionStyles, "utf8");

  assert.match(styles, /\.work-detail-title-field\s*\{[\s\S]*min-height:\s*clamp\(312px, 36vw, 560px\)/);
});

test("Selected Works detail text entrance does not clip glyphs", () => {
  const source = readFileSync(sectionSource, "utf8");

  assert.doesNotMatch(source, /clipPath/);
});

test("Selected Works does not render a section navbar", () => {
  const source = readFileSync(sectionSource, "utf8");
  const styles = readFileSync(sectionStyles, "utf8");

  assert.doesNotMatch(source, /PreviewHeader/);
  assert.doesNotMatch(source, /selected-works-header/);
  assert.doesNotMatch(styles, /\.selected-works-header/);
});

test("Selected Works masthead uses a left-to-right title and year composition", () => {
  const styles = readFileSync(sectionStyles, "utf8");

  assert.match(styles, /\.selected-works-masthead\s*\{[\s\S]*grid-template-columns:\s*minmax\(80px/);
  assert.match(styles, /\.selected-works-masthead-lockup\s*\{[\s\S]*margin:\s*4px 0 0;[\s\S]*transform:\s*none/);
  assert.match(styles, /\.selected-works-masthead-lockup > span\s*\{[\s\S]*position:\s*absolute[\s\S]*right:\s*0/);
});
