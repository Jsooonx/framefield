import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

const fromRoot = (path) => new URL(`../${path}`, import.meta.url);
const read = (path) => readFileSync(fromRoot(path), "utf8");

test("Valen & Ochre Hero has an isolated package, metadata, and route", () => {
  const metadataPath = "library/sections/valen-ochre-hero/metadata.ts";
  const routePath = "src/app/library/sections/valen-ochre-hero/page.tsx";

  assert.equal(existsSync(fromRoot(metadataPath)), true);
  assert.equal(existsSync(fromRoot(routePath)), true);
  assert.equal(
    existsSync(fromRoot("library/sections/valen-ochre-hero/source/ValenOchreHero.tsx")),
    true,
  );
  assert.equal(
    existsSync(fromRoot("library/sections/valen-ochre-hero/source/Navbar.tsx")),
    true,
  );
  assert.equal(
    existsSync(fromRoot("library/sections/valen-ochre-hero/source/Hero.tsx")),
    true,
  );
  assert.equal(
    existsSync(fromRoot("library/sections/valen-ochre-hero/source/Modal.tsx")),
    true,
  );
  assert.equal(
    existsSync(fromRoot("library/sections/valen-ochre-hero/source/valen-ochre-hero.css")),
    true,
  );

  const metadata = read(metadataPath);
  const route = read(routePath);
  assert.match(metadata, /slug:\s*"valen-ochre-hero"/);
  assert.match(metadata, /sectionRoute\s*=\s*"\/library\/sections\/valen-ochre-hero"/);
  assert.match(metadata, /route:\s*sectionRoute/);
  assert.match(metadata, /category:\s*"Hero"/);
  assert.match(metadata, /access:\s*"Free"/);
  assert.match(metadata, /preview:\s*"\/library\/sections\/valen-ochre-hero\/hero-bg\.jpg"/);
  assert.match(metadata, /previewVideo:\s*"\/library\/sections\/valen-ochre-hero\/preview\.mp4"/);
  assert.match(metadata, /promptUrl:\s*"\/library\/sections\/valen-ochre-hero\/master-prompt\.md"/);
  assert.match(route, /ValenOchreHero/);
});

test("Valen & Ochre Hero stages entrance and honors scroll-driven zoom-out & accessibility", () => {
  const rootSource = read("library/sections/valen-ochre-hero/source/ValenOchreHero.tsx");
  const heroSource = read("library/sections/valen-ochre-hero/source/Hero.tsx");
  const navbarSource = read("library/sections/valen-ochre-hero/source/Navbar.tsx");
  const modalSource = read("library/sections/valen-ochre-hero/source/Modal.tsx");
  const css = read("library/sections/valen-ochre-hero/source/valen-ochre-hero.css");

  // Scroll orchestration in root
  assert.match(rootSource, /useScroll/);
  assert.match(rootSource, /useTransform/);
  assert.match(rootSource, /valen-scroll-track/);
  assert.match(rootSource, /valen-sticky-stage/);

  // Scroll animations in Hero
  assert.match(heroSource, /useReducedMotion/);
  assert.match(heroSource, /useTransform/);
  assert.match(heroSource, /VALEN_EASE/);
  assert.match(heroSource, /motion\.div/);
  assert.match(heroSource, /motion\.img/);
  assert.match(heroSource, /Where Architecture/);
  assert.match(heroSource, /Cultivates Stillness/);
  assert.match(heroSource, /valen-gallery-stage/);
  assert.match(heroSource, /valen-side-card/);
  assert.match(heroSource, /valen-center-caption/);

  assert.match(navbarSource, /useReducedMotion/);
  assert.match(navbarSource, /Escape/);

  assert.match(modalSource, /useReducedMotion/);
  assert.match(modalSource, /Escape/);
  assert.match(modalSource, /overflow\s*=\s*"hidden"/);
  assert.match(modalSource, /role="dialog"/);

  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(css, /\.valen-scroll-track/);
  assert.match(css, /\.valen-sticky-stage/);
  assert.match(css, /\.valen-gallery-stage/);
  assert.match(css, /\.valen-side-card/);
  assert.match(css, /\.valen-library-back/);
  assert.match(css, /\.valen-library-back-icon/);
});

test("Valen & Ochre public assets and master prompt are in sync", () => {
  assert.equal(
    existsSync(fromRoot("public/library/sections/valen-ochre-hero/hero-bg.jpg")),
    true,
  );
  assert.equal(
    existsSync(fromRoot("public/library/sections/valen-ochre-hero/hero-bg-2.jpg")),
    true,
  );
  assert.equal(
    existsSync(fromRoot("public/library/sections/valen-ochre-hero/space-01.webp")),
    true,
  );
  assert.equal(
    existsSync(fromRoot("public/library/sections/valen-ochre-hero/space-02.webp")),
    true,
  );
  assert.equal(
    existsSync(fromRoot("public/library/sections/valen-ochre-hero/preview.mp4")),
    true,
  );
  assert.equal(
    existsSync(fromRoot("public/library/sections/valen-ochre-hero/master-prompt.md")),
    true,
  );
  assert.equal(
    existsSync(fromRoot("library/sections/valen-ochre-hero/master-prompt.md")),
    true,
  );

  const prompt = read("public/library/sections/valen-ochre-hero/master-prompt.md");
  assert.match(prompt, /https:\/\/assets\.framefield\.my\.id\/sections\/valen-ochre-hero\/hero-bg\.jpg/);
  assert.match(prompt, /https:\/\/assets\.framefield\.my\.id\/sections\/valen-ochre-hero\/hero-bg-2\.jpg/);
  assert.match(prompt, /https:\/\/assets\.framefield\.my\.id\/sections\/valen-ochre-hero\/space-01\.webp/);
  assert.match(prompt, /https:\/\/assets\.framefield\.my\.id\/sections\/valen-ochre-hero\/space-02\.webp/);
  assert.match(prompt, /https:\/\/assets\.framefield\.my\.id\/sections\/valen-ochre-hero\/preview\.mp4/);
});
