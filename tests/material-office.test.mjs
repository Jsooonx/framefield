import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

const route = new URL(
  "../src/app/library/sections/material-office/page.tsx",
  import.meta.url,
);
const metadata = new URL(
  "../library/sections/material-office/metadata.ts",
  import.meta.url,
);
const source = new URL(
  "../library/sections/material-office/source/MaterialOffice.tsx",
  import.meta.url,
);
const styles = new URL(
  "../library/sections/material-office/source/material-office.css",
  import.meta.url,
);
const homepageStyles = new URL(
  "../src/app/globals.css",
  import.meta.url,
);
const poster = new URL(
  "../public/library/sections/material-office/hero-poster.webp",
  import.meta.url,
);
const videoMp4 = new URL(
  "../public/library/sections/material-office/hero-video.mp4",
  import.meta.url,
);
const videoWebm = new URL(
  "../public/library/sections/material-office/hero-video.webm",
  import.meta.url,
);
const previewWebp = new URL(
  "../public/library/sections/material-office/preview.webp",
  import.meta.url,
);
const previewMp4 = new URL(
  "../public/library/sections/material-office/preview.mp4",
  import.meta.url,
);
const homepage = new URL("../src/app/page.tsx", import.meta.url);
const masterPrompt = new URL(
  "../library/sections/material-office/master-prompt.md",
  import.meta.url,
);

test("Material Office has a dedicated section route", () => {
  assert.equal(existsSync(route), true);
  assert.match(readFileSync(route, "utf8"), /MaterialOffice/);
});

test("Material Office metadata identifies the preview route", () => {
  assert.equal(existsSync(metadata), true);
  const content = readFileSync(metadata, "utf8");

  assert.match(content, /slug:\s*"material-office"/);
  assert.match(content, /route:\s*"\/library\/sections\/material-office"/);
});

test("Material Office exposes a copy-prompt CTA backed by its master prompt", () => {
  assert.equal(existsSync(masterPrompt), true);
  const prompt = readFileSync(masterPrompt, "utf8");
  const content = readFileSync(source, "utf8");

  assert.match(prompt, /Material Office/i);
  assert.match(prompt, /pixel-perfect|source code|canonical implementation/i);
  assert.match(prompt, /https:\/\/assets\.framefield\.my\.id\/sections\/material-office\/hero-poster\.webp/);
  assert.match(prompt, /https:\/\/assets\.framefield\.my\.id\/sections\/material-office\/hero-video\.mp4/);
  assert.match(prompt, /https:\/\/assets\.framefield\.my\.id\/sections\/material-office\/hero-video\.webm/);
  assert.match(prompt, /```tsx/);
  assert.match(prompt, /```css/);
  assert.match(prompt, /material-office__canvas/);
  assert.match(prompt, /ENTRANCE_EASE/);
  assert.match(prompt, /@media \(min-width: 900px\)/);
  assert.match(content, /Copy Prompt/);
  assert.match(content, /navigator\.clipboard/);
  assert.match(content, /material-office__prompt-copy/);
});

test("Material Office provides the full preview interaction contract", () => {
  assert.equal(existsSync(source), true);
  const content = readFileSync(source, "utf8");

  assert.match(content, /hero-poster\.webp/);
  assert.match(content, /hero-video\.mp4/);
  assert.match(content, /assets\.framefield\.my\.id\/sections\/material-office\/hero-video\.webm/);
  assert.match(content, /available:\s*true/);
  assert.match(content, /aria-expanded/);
  assert.match(content, /Escape/);
  assert.match(content, /Back to library/);
  assert.match(content, /ArrowLeft/);
  assert.match(content, /MATERIAL/);
  assert.match(content, /Brand Systems/);
});

test("Material Office uses a reduced-motion-aware staggered hero entrance", () => {
  const content = readFileSync(source, "utf8");

  assert.match(content, /useReducedMotion/);
  assert.match(content, /motion\.header/);
  assert.match(content, /motion\.h1/);
  assert.match(content, /motion\.ul/);
  assert.match(content, /motion\.div/);
  assert.match(content, /motion\.a/);
  assert.match(content, /delay: reduceMotion \? 0 : delay/);
  assert.match(content, /0\.12/);
  assert.match(content, /0\.98/);
});

test("Material Office back control uses a polished glass treatment", () => {
  const stylesheet = readFileSync(styles, "utf8");

  assert.match(stylesheet, /\.material-office__back\s*\{[\s\S]*border-radius:\s*999px;/);
  assert.match(stylesheet, /\.material-office__back\s*\{[\s\S]*backdrop-filter:\s*blur\(/);
  assert.match(stylesheet, /\.material-office__back:hover \.material-office__back-icon/);
});

test("Material Office pins the navbar to the preview canvas top edge", () => {
  const stylesheet = readFileSync(styles, "utf8");

  assert.match(
    stylesheet,
    /\.material-office__header\s*\{[^}]*position:\s*absolute;[^}]*top:\s*0;/s,
  );
});

test("Material Office aligns OFFICE with the MATERIAL wordmark", () => {
  const stylesheet = readFileSync(styles, "utf8");
  const desktopHeroRule = stylesheet.match(/\.material-office__hero h1\s*\{([^}]*)\}/);
  const desktopHeroSubline = stylesheet.match(/\.material-office__hero h1 span\s*\{([^}]*)\}/);

  assert.ok(desktopHeroRule, "expected the hero wordmark style rule");
  assert.ok(desktopHeroSubline, "expected the hero subline style rule");
  assert.match(desktopHeroRule[1], /margin:\s*0\s+0\s+0\s+-0\.08em;/);
  assert.match(desktopHeroSubline[1], /margin-left:\s*0\.18em;/);
});

test("Material Office menu is an editorial index instead of a centered link list", () => {
  const content = readFileSync(source, "utf8");
  const stylesheet = readFileSync(styles, "utf8");

  assert.match(content, /material-office__menu-index/);
  assert.match(content, /material-office__menu-sequence/);
  assert.match(content, /material-office__menu-strip/);
  assert.match(content, /material-office__menu-utility/);
  assert.match(content, /String\(index \+ 1\)\.padStart\(2, "0"\)/);
  assert.match(
    stylesheet,
    /grid-template-columns:\s*minmax\(0,\s*7fr\)\s+minmax\(220px,\s*3fr\)/,
  );
  assert.match(stylesheet, /\.material-office__menu-link:has\(\.material-office__menu-label:hover\) \.material-office__menu-label/);
  assert.doesNotMatch(stylesheet, /\.material-office__menu-link:hover \.material-office__menu-label/);
  assert.doesNotMatch(
    stylesheet,
    /\.material-office__menu-link:hover\s*\{[^}]*transform:/s,
  );
  assert.doesNotMatch(
    stylesheet,
    /\.material-office__menu-link:hover[\s\S]*\.material-office__menu-sequence/s,
  );
  assert.match(
    stylesheet,
    /@media \(max-width: 720px\)[\s\S]*\.material-office__menu-index\s*\{[^}]*grid-template-columns:\s*1fr;/s,
  );
});

test("Material Office leaves menu-link opacity exclusively to Motion", () => {
  const stylesheet = readFileSync(styles, "utf8");
  const menuLinkRule = stylesheet.match(/\.material-office__menu-link\s*\{([\s\S]*?)\n\}/);

  assert.ok(menuLinkRule, "expected a menu-link style rule");
  assert.doesNotMatch(menuLinkRule[1], /transition:\s*[^;]*opacity/);
});

test("Material Office desktop menu exposes a separate drawer panel and backdrop", () => {
  const content = readFileSync(source, "utf8");

  assert.match(content, /material-office__menu-backdrop/);
  assert.match(content, /onClick=\{\(\) => setMenuOpen\(false\)\}/);
  assert.match(content, /material-office__menu-panel/);
});

test("Material Office menu animates closed by sliding the drawer out", () => {
  const content = readFileSync(source, "utf8");

  assert.match(
    content,
    /className="material-office__menu material-office__menu-panel"[\s\S]*?initial=\{\{ x: "100%" \}\}[\s\S]*?animate=\{\{ x: "0%" \}\}[\s\S]*?exit=\{\{ x: "100%" \}\}/,
  );
});

test("Material Office constrains the desktop menu to a right-side drawer", () => {
  const stylesheet = readFileSync(styles, "utf8");

  assert.match(stylesheet, /@media \(min-width: 900px\)[\s\S]*max-width:\s*520px/s);
  assert.match(stylesheet, /@media \(min-width: 900px\)[\s\S]*width:\s*34vw/s);
  assert.match(stylesheet, /material-office__menu-backdrop/);
});

test("Material Office keeps the close control right-aligned and limits hover motion to labels", () => {
  const content = readFileSync(source, "utf8");
  const stylesheet = readFileSync(styles, "utf8");
  const labelRule = stylesheet.match(/\.material-office__menu-label\s*\{([^}]*)\}/);

  assert.match(content, /material-office__menu-label/);
  assert.ok(labelRule, "expected a menu-label style rule");
  assert.match(labelRule[1], /justify-self:\s*start;/);
  assert.match(labelRule[1], /width:\s*fit-content;/);
  assert.match(
    stylesheet,
    /@media \(min-width: 900px\)[\s\S]*\.material-office__menu-header\s*\{[^}]*grid-template-columns:\s*1fr auto;/s,
  );
  assert.match(stylesheet, /\.material-office__menu-link:has\(\.material-office__menu-label:hover\) \.material-office__menu-label/);
  assert.doesNotMatch(stylesheet, /\.material-office__menu-link:hover \.material-office__menu-label/);
  assert.doesNotMatch(
    stylesheet,
    /\.material-office__menu-link:hover\s*\{[^}]*transform:/s,
  );
});

test("Material Office is a live catalog item with image and video previews", () => {
  assert.equal(existsSync(poster), true);
  assert.equal(existsSync(videoMp4), true);
  assert.equal(existsSync(videoWebm), true);
  assert.equal(existsSync(previewWebp), true);
  assert.equal(existsSync(previewMp4), true);
  const content = readFileSync(homepage, "utf8");

  assert.match(content, /materialOfficeAsset/);
  assert.match(content, /previewUrl:\s*materialOfficeAsset\.route/);
  assert.match(content, /previewImage:\s*materialOfficeAsset\.preview/);
  assert.match(content, /previewVideo:\s*materialOfficeAsset\.previewVideo/);
  assert.match(content, /thumbnail-video/);
});

test("Library cards use Copy Prompt instead of source language", () => {
  const content = readFileSync(homepage, "utf8");

  assert.match(content, /Copy Prompt/);
  assert.doesNotMatch(content, /Get source/);
});

test("Material Office video thumbnail removes the generic catalog circle", () => {
  const stylesheet = readFileSync(homepageStyles, "utf8");

  assert.match(stylesheet, /\.thumbnail\.material-office::after\s*\{\s*display:\s*none;/);
});
