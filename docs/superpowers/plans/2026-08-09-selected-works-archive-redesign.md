# Selected Works Archive Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the Selected Works visual studies and nested project detail composition with an original art-directed archive and proper staggered entrance motion.

**Architecture:** Keep `metadata.ts` as the single project registry and keep one overview route plus one static-generated nested detail route. Replace the shared detail JSX/CSS, keep project-specific content in metadata, and use Motion for semantic entrance groups with reduced-motion fallbacks.

**Tech Stack:** Next.js 15 App Router, React 19, Motion, Lucide React, scoped CSS, generated WebP raster assets, Node built-in test runner.

## Global Constraints

- Preserve `/library/sections/selected-works` and the four nested project routes.
- Use only local WebP visual assets for active project imagery.
- Keep the works template out of the homepage body.
- Preserve the universal Material Office-style `Back to library` pill.
- Do not add a dependency or use `transition: all`.
- Verify at 1440×900 and 390×844.

---

### Task 1: Protect the new archive contract with tests

**Files:**
- Modify: `tests/selected-works.test.mjs`

**Interfaces:**
- Consumes: current Selected Works source, metadata, and scoped CSS.
- Produces: regression coverage for the new image identity, detail layout hooks, motion hooks, and route contract.

- [x] **Step 1: Add failing assertions**

Add assertions for `work-detail-archive`, `work-detail-lead`, `work-detail-index`, `whileInView`, `once: true`, and the new image filenames or metadata contract while retaining route and universal back assertions.

- [x] **Step 2: Run the focused test**

Run: `node --test tests/selected-works.test.mjs`

Expected: FAIL because the current detail source does not contain the archive layout or in-view motion hooks.

- [x] **Step 3: Keep the test narrow**

Do not assert implementation-private pixel values. Assert semantic classes, route strings, local WebP paths, reduced-motion references, and Motion behavior hooks only.

### Task 2: Generate and install the new image set

**Files:**
- Create/replace: `public/library/sections/selected-works/{cinder-bureau,auralis,stillhouse,vela-objects}/visual-01.webp`
- Create/replace: `public/library/sections/selected-works/{cinder-bureau,auralis,stillhouse,vela-objects}/visual-02.webp`
- Modify: `library/sections/selected-works/metadata.ts` only if captions need to match the new studies.

**Interfaces:**
- Consumes: the visual direction in the spec.
- Produces: eight local WebP images with distinct subject/composition language and no text, logo, UI, or watermark.

- [x] **Step 1: Generate eight distinct raster studies**

Use built-in image generation with one prompt per slot: one cover and one detail study for each project. Prompts must explicitly avoid typography, logos, interface, watermark, and the supplied reference composition.

- [x] **Step 2: Inspect generated output**

Check each image for subject clarity, strong crop, usable contrast, no accidental text, and clear differentiation from the reference before installing it.

- [x] **Step 3: Convert and install WebP assets**

Use the existing ffmpeg workflow to write the approved images into the eight project-local paths. Keep the generated originals outside the project package.

### Task 3: Rebuild the shared detail page

**Files:**
- Modify: `library/sections/selected-works/source/SelectedWorks.tsx`
- Modify: `library/sections/selected-works/source/selected-works.css`
- Test: `tests/selected-works.test.mjs`

**Interfaces:**
- Consumes: `SelectedWork` records and the existing `PreviewBack`/`PreviewHeader` primitives.
- Produces: shared archive detail markup with lead field, archive index strip, narrative modules, gallery/build module, and previous/next archive navigation.

- [x] **Step 1: Implement semantic detail sections**

Use classes `work-detail-archive`, `work-detail-context`, `work-detail-index`, `work-detail-lead`, `work-detail-meta`, `work-detail-story`, `work-detail-gallery`, `work-detail-build`, and `work-detail-navigation` so the structure visibly differs from the reference split layout.

- [x] **Step 2: Add staged Motion entrance**

Use a shared `DETAIL_EASE`, a `detailReveal` variant, `motion.header`, `motion.div`, `motion.figure`, and `motion.nav`. Use `whileInView={{ once: true }}` for below-fold groups and `useReducedMotion()` to disable movement while retaining readable opacity.

- [x] **Step 3: Recompose responsive CSS**

Create an offset title lockup, a dominant lead image with floating caption, archive metadata strip, asymmetric story modules, and a two-part gallery/build row. Keep mobile one-column behavior and avoid horizontal overflow.

- [x] **Step 4: Run the focused test**

Run: `node --test tests/selected-works.test.mjs`

Expected: PASS.

### Task 4: Update docs and validate the release

**Files:**
- Modify: `library/sections/selected-works/design.md`
- Modify: `docs/framefield-overview.md`
- Modify: `docs/documentation-audit.md`
- Modify: `docs/superpowers/plans/2026-08-09-selected-works-archive-redesign.md`

**Interfaces:**
- Consumes: installed image set and final implementation.
- Produces: current documentation for the archive visual world and detail page behavior.

- [x] **Step 1: Update current-truth docs**

Record the new art-directed archive direction, distinct image prompts, detail composition, Motion entrance sequence, and the preserved route/back-control contracts. Keep older rework entries historical.

- [x] **Step 2: Run full verification**

Run: `node --test tests/*.mjs` and `npm run build`.

Expected: all tests pass and static generation includes the overview plus four nested project pages.

- [x] **Step 3: Inspect bounded desktop/mobile visual passes**

At 1440×900 and 390×844, verify the lead title/image relationship, staggered entrance, gallery/build composition, fixed back pill, and no horizontal overflow. Run the Impeccable detector on the changed source files.
