# Material Office Implementation Plan

> Historical plan snapshot. This plan was written before the supplied hero video and catalog recording existed; current status is maintained in `library/sections/material-office/design.md`, `docs/framefield-overview.md`, and `docs/documentation-audit.md`.

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship Framefield's first dedicated, video-ready section preview: an original Material Office hero with an accessible editorial menu overlay.

**Architecture:** Keep the asset implementation self-contained in `library/sections/material-office/source/`, where one client component owns menu state and resilient media fallback. The App Router route renders that source inside a small Framefield preview shell. The homepage catalog receives one real Section entry that links to the route but uses a static temporary thumbnail until recorded WebP exists.

**Tech Stack:** Next.js 15 App Router, React 19, TypeScript, CSS Modules-free scoped CSS file imported by the component, Motion, Lucide React, Node's built-in test runner.

## Global Constraints

- Preserve the existing Framefield homepage and its placeholder catalog entries; add one real item rather than replacing the catalog.
- Route must be exactly `/library/sections/material-office`.
- Use `MATERIAL®` / `OFFICE` and the copy specified in `library/sections/material-office/design.md`; do not reuse any names or content from the supplied reference.
- Render `/library/sections/material-office/hero-poster.webp` when the final video files are absent; autoplay motion must respect `prefers-reduced-motion`.
- Menu is keyboard-accessible: semantic button, `aria-expanded`, Escape close, visible focus, and background scroll lock while open.
- Preview shell must have a Framefield mark and a link to `/#library` labelled `Back to library`.
- Do not run `npm run build` while `npm run dev` is running.

---

## File Structure

| Path | Responsibility |
| --- | --- |
| `library/sections/material-office/source/MaterialOffice.tsx` | Client-side hero, media choice, menu state, Escape handler, and preview-shell composition. |
| `library/sections/material-office/source/material-office.css` | Isolated Material Office visual system, responsive layout, overlay motion, and reduced-motion fallback. |
| `library/sections/material-office/metadata.ts` | Typed asset metadata reused by the homepage catalog entry. |
| `src/app/library/sections/material-office/page.tsx` | App Router route that renders `MaterialOffice`. |
| `public/library/sections/material-office/hero-poster.webp` | Temporary generated poster used before Google Flow video is supplied. |
| `src/app/page.tsx` | Imports metadata and adds the first non-placeholder catalog entry linking to the dedicated route. |
| `tests/material-office.test.mjs` | Static contract tests for files, route, media fallback, preview shell, and accessibility hooks. |
| `tests/production-runtime.test.mjs` | Adds the Material Office route to production smoke coverage. |
| `docs/documentation-audit.md` | Records implemented route/catalog status and defers final video/WebP recording. |

### Task 1: Lock the route and metadata contract

**Files:**
- Create: `library/sections/material-office/metadata.ts`
- Create: `src/app/library/sections/material-office/page.tsx`
- Test: `tests/material-office.test.mjs`

**Interfaces:**
- Produces: `materialOfficeAsset`, whose fields are `slug`, `title`, `type`, `category`, `status`, `access`, `tags`, `preview`, `sourceAvailable`, and `route`.
- Produces: a page route that returns `<MaterialOffice />` from the asset source module.

- [ ] **Step 1: Write the failing test**

```js
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

const route = new URL("../src/app/library/sections/material-office/page.tsx", import.meta.url);
const metadata = new URL("../library/sections/material-office/metadata.ts", import.meta.url);

test("Material Office has a dedicated section route and metadata", () => {
  assert.equal(existsSync(route), true);
  assert.equal(existsSync(metadata), true);
  assert.match(readFileSync(route, "utf8"), /MaterialOffice/);
  assert.match(readFileSync(metadata, "utf8"), /slug:\s*"material-office"/);
  assert.match(readFileSync(metadata, "utf8"), /route:\s*"\/library\/sections\/material-office"/);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test tests/material-office.test.mjs`

Expected: FAIL because the route and metadata files do not exist.

- [ ] **Step 3: Write minimal implementation**

```tsx
import { MaterialOffice } from "../../../../../library/sections/material-office/source/MaterialOffice";

export default function MaterialOfficePage() {
  return <MaterialOffice />;
}
```

```ts
export const materialOfficeAsset = {
  slug: "material-office",
  title: "Material Office",
  type: "section" as const,
  category: "Hero + menu",
  status: "review" as const,
  access: "Free" as const,
  tags: ["editorial", "studio", "video-ready"],
  preview: "/library/sections/material-office/preview.webp",
  sourceAvailable: true,
  route: "/library/sections/material-office",
};
```

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test tests/material-office.test.mjs`

Expected: PASS for the route and metadata contract after Task 2 source exists.

### Task 2: Build the self-contained Material Office surface

**Files:**
- Create: `library/sections/material-office/source/MaterialOffice.tsx`
- Create: `library/sections/material-office/source/material-office.css`
- Modify: `tests/material-office.test.mjs`

**Interfaces:**
- Consumes: poster and future video paths defined by the approved design document.
- Produces: `export function MaterialOffice(): JSX.Element`, rendered directly by the route in Task 1.

- [ ] **Step 1: Extend the failing test with surface expectations**

```js
const source = readFileSync(
  new URL("../library/sections/material-office/source/MaterialOffice.tsx", import.meta.url),
  "utf8",
);

test("Material Office provides video fallback, menu semantics, and Framefield preview shell", () => {
  assert.match(source, /hero-poster\.webp/);
  assert.match(source, /hero-video\.mp4/);
  assert.match(source, /aria-expanded/);
  assert.match(source, /onKeyDown/);
  assert.match(source, /Back to library/);
  assert.match(source, /MATERIAL/);
  assert.match(source, /Brand Systems/);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test tests/material-office.test.mjs`

Expected: FAIL because the source component has not been created.

- [ ] **Step 3: Write minimal implementation**

```tsx
"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import "./material-office.css";

const poster = "/library/sections/material-office/hero-poster.webp";
const video = "/library/sections/material-office/hero-video.mp4";

export function MaterialOffice() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => event.key === "Escape" && setMenuOpen(false);
    document.addEventListener("keydown", closeOnEscape);
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.removeEventListener("keydown", closeOnEscape); document.body.style.overflow = ""; };
  }, [menuOpen]);

  return <main className="material-office">{/* hero, poster, future video, menu, preview shell */}</main>;
}
```

- [ ] **Step 4: Implement CSS contract**

Use viewport-filling canvas, concentric 28px/20px media radius, responsive typography, dedicated `@media (prefers-reduced-motion: reduce)` rules, `:focus-visible` lime rings, and 44px menu target. Scope every selector under `.material-office` so the homepage CSS cannot be affected.

- [ ] **Step 5: Run focused test to verify it passes**

Run: `node --test tests/material-office.test.mjs`

Expected: PASS for route, metadata, media fallback, menu semantics, Framefield shell, and content markers.

### Task 3: Add a poster and connect the catalog

**Files:**
- Create: `public/library/sections/material-office/hero-poster.webp`
- Modify: `src/app/page.tsx`
- Modify: `tests/material-office.test.mjs`

**Interfaces:**
- Consumes: `materialOfficeAsset` from Task 1.
- Produces: first non-placeholder `Asset` in the existing `ASSETS` array with `previewUrl: materialOfficeAsset.route`.

- [ ] **Step 1: Add failing assertions**

```js
const homepage = readFileSync(new URL("../src/app/page.tsx", import.meta.url), "utf8");

test("Material Office is a live catalog item with a usable poster", () => {
  assert.equal(existsSync(new URL("../public/library/sections/material-office/hero-poster.webp", import.meta.url)), true);
  assert.match(homepage, /materialOfficeAsset/);
  assert.match(homepage, /previewUrl:\s*materialOfficeAsset\.route/);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test tests/material-office.test.mjs`

Expected: FAIL because no poster and catalog entry exist.

- [ ] **Step 3: Add poster and catalog data**

Generate an original high-contrast, abstract warm-monochrome material poster at the target public path. Import `materialOfficeAsset` into `src/app/page.tsx`, append an asset with title/category/access from metadata, `placeholder: false`, `thumbnail: "material-office"`, and `previewUrl: materialOfficeAsset.route`. Do not set `previewVideo` until Google Flow output exists.

- [ ] **Step 4: Run focused test to verify it passes**

Run: `node --test tests/material-office.test.mjs`

Expected: PASS.

### Task 4: Expand runtime coverage and reconcile documentation

**Files:**
- Modify: `tests/production-runtime.test.mjs`
- Modify: `docs/documentation-audit.md`
- Modify: `docs/framefield-overview.md`

**Interfaces:**
- Consumes: `/library/sections/material-office` from Task 1 and the screenshot-ready page from Task 2.
- Produces: production smoke coverage for the preview route and truthful product status.

- [ ] **Step 1: Write the failing route smoke assertion**

```js
const [homepage, icon, materialOffice] = await Promise.all([
  fetch(`http://localhost:${PORT}/`),
  fetch(`http://localhost:${PORT}/icon.svg`),
  fetch(`http://localhost:${PORT}/library/sections/material-office`),
]);

assert.equal(materialOffice.status, 200);
```

- [ ] **Step 2: Run the production smoke test after an isolated build**

Run: stop all Framefield `next dev` processes, then `npm run build`, then `node --test tests/production-runtime.test.mjs`.

Expected: initial smoke assertion fails before the route is complete, then returns 200 once Tasks 1–3 are finished.

- [ ] **Step 3: Update product docs**

Set `Dedicated full preview routes` and `Material Office hero + menu` to `Shipped` only after the smoke route succeeds. Keep Google Flow integration and WebP recording as `Planned`, since no final video is supplied in this task.

- [ ] **Step 4: Run full verification**

Run: `node --test tests/*.mjs`, then (with no dev server running) `npm run build`, then `node --test tests/production-runtime.test.mjs`.

Expected: all tests pass, Next production build completes, and homepage/icon/Material Office return HTTP 200.

- [ ] **Step 5: Record visual QA state**

Open `/library/sections/material-office` at 1440x960 and 390x844. Check: wordmark legibility, menu toggle and Escape close, focus ring, no layout overflow, static poster with reduced motion, and preview-shell link. Do not make a WebP catalog recording until the final Google Flow video is provided.
