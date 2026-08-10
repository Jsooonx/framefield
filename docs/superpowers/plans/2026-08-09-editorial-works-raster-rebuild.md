# Editorial Works Raster Rebuild Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the Selected Works SVG studies with eight generated raster images and recompose the section as a reference-led editorial portfolio index.

**Architecture:** Keep one `Selected Works` library asset and four nested static routes. `metadata.ts` becomes the single source for the fresh case-study names and project-local WebP paths. `SelectedWorks.tsx` consumes those records; its CSS owns the desktop and mobile reference-led composition plus the universal preview back control.

**Tech Stack:** Next.js 15 App Router, React 19, Motion, Lucide React, CSS, generated WebP raster assets, Node built-in test runner.

## Global Constraints

- Preserve `/library/sections/selected-works` and its four nested child routes.
- Use generated raster assets only; Selected Works must not consume `.svg` studies.
- Use Cinder Bureau, Auralis, Stillhouse, and Vela Objects as the four fictional works.
- Keep the works template out of the homepage body.
- Reuse the Material Office glass-pill visual contract for `Back to library`.
- Verify at desktop 1440×900 and mobile 390×844.

---

### Task 1: Protect the fresh raster asset contract

**Files:**
- Modify: `tests/selected-works.test.mjs`
- Modify: `library/sections/selected-works/metadata.ts`

**Interfaces:**
- Consumes: `SELECTED_WORKS` metadata records.
- Produces: a test that requires the four fresh names and no `.svg` paths in `preview` or `visuals`.

- [x] **Step 1: Write the failing test**

```js
test("Selected Works uses fresh case studies with raster visual paths", () => {
  assert.match(metadata, /title: "Cinder Bureau"/);
  assert.match(metadata, /title: "Auralis"/);
  assert.doesNotMatch(metadata, /selected-works\/.+\.svg/);
  assert.match(metadata, /selected-works\/cinder-bureau\/visual-01\.webp/);
});
```

- [x] **Step 2: Run the focused test to verify it fails**

Run: `node --test tests/selected-works.test.mjs`

Expected: FAIL because the incumbent metadata retains the older names and SVG paths.

- [x] **Step 3: Replace metadata records and paths**

Use four records named `Cinder Bureau`, `Auralis`, `Stillhouse`, and `Vela Objects`, each with `/library/sections/selected-works/<slug>/visual-01.webp` and `visual-02.webp` paths.

- [x] **Step 4: Run the focused test to verify it passes**

Run: `node --test tests/selected-works.test.mjs`

Expected: PASS.

### Task 2: Generate and install the eight editorial raster studies

**Files:**
- Create: `public/library/sections/selected-works/cinder-bureau/visual-01.webp`
- Create: `public/library/sections/selected-works/cinder-bureau/visual-02.webp`
- Create: `public/library/sections/selected-works/auralis/visual-01.webp`
- Create: `public/library/sections/selected-works/auralis/visual-02.webp`
- Create: `public/library/sections/selected-works/stillhouse/visual-01.webp`
- Create: `public/library/sections/selected-works/stillhouse/visual-02.webp`
- Create: `public/library/sections/selected-works/vela-objects/visual-01.webp`
- Create: `public/library/sections/selected-works/vela-objects/visual-02.webp`

**Interfaces:**
- Consumes: the subject and composition contract in the design specification.
- Produces: two image assets per project, with no embedded text, logo, UI, or watermark.

- [x] **Step 1: Generate each distinct study with the built-in image tool**

Generate one image per prompt, using the shared light-editorial photography direction and the eight subjects documented in the design specification.

- [x] **Step 2: Inspect each image before installation**

Confirm the image has a usable landscape crop, clear subject, no text/logos/watermarks, and enough local contrast for the hover lockup.

- [x] **Step 3: Copy assets into their project-local public paths**

Preserve the generated originals under Codex output and install only approved WebP files under `public/library/sections/selected-works/`.

### Task 3: Recompose the index and universal preview control

**Files:**
- Modify: `library/sections/selected-works/source/SelectedWorks.tsx`
- Modify: `library/sections/selected-works/source/selected-works.css`
- Test: `tests/selected-works.test.mjs`

**Interfaces:**
- Consumes: updated metadata raster paths and the `PreviewBack` component.
- Produces: a `Projects.` first viewport with a top nav, grid title rails, and a hero-equivalent glass back pill.

- [x] **Step 1: Write the failing layout-control test**

```js
test("Selected Works uses the universal hero-style library back control", () => {
  assert.match(source, /selected-works-library-back-icon/);
  assert.match(css, /position: fixed/);
  assert.match(css, /backdrop-filter: blur\(14px\)/);
  assert.match(css, /width: 22px/);
});
```

- [x] **Step 2: Run the focused test to verify it fails**

Run: `node --test tests/selected-works.test.mjs`

Expected: FAIL because the incumbent back control is a plain inline link.

- [x] **Step 3: Implement the new composition and control**

Render `Projects.` and `©2026`, keep the quiet header, reduce desktop masthead whitespace so the title rails enter a 1440×900 viewport, and use a 2×2 image grid with 10px gutters. Replace header-level `Back to library` with the universal fixed glass pill on overview and detail pages; retain `All projects` for child-page context.

- [x] **Step 4: Run the focused test to verify it passes**

Run: `node --test tests/selected-works.test.mjs`

Expected: PASS.

### Task 4: Synchronize docs and perform release validation

**Files:**
- Modify: `library/sections/selected-works/design.md`
- Modify: `docs/documentation-audit.md`
- Modify: `docs/superpowers/plans/2026-08-09-editorial-works-raster-rebuild.md`

**Interfaces:**
- Consumes: completed assets, metadata, and source behavior.
- Produces: current documentation that names raster studies and the universal back control without duplicating package contracts.

- [x] **Step 1: Update the design contract and audit ledger**

Record the four new names, generated raster asset contract, viewport target, and universal back control. Mark old SVG-study language obsolete.

- [x] **Step 2: Inspect desktop and mobile in browser**

At 1440×900 and 390×844, verify the first viewport composition, image crops, local hover treatment, and back-pill placement.

- [x] **Step 3: Run all automated checks**

Run: `node --test tests/*.mjs` and `npm run build`.

Expected: all tests pass and the build statically generates the preview plus each nested work route.
