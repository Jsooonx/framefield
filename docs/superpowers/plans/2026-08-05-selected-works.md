# Selected Works / 04 Implementation Plan

> **Historical note:** This initial plan was superseded during implementation. Current truth: one `Selected Works` section package at `library/sections/selected-works/`, with four nested project routes; see `library/sections/selected-works/design.md`.

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a curated `Selected Works / 04` template set with four fictional case studies, dedicated detail routes, per-work visual studies, and restrained editorial micro-interactions.

**Architecture:** Keep reusable work data in `library/works/registry.ts`, serve four generated visual-study SVGs from `public/works/<slug>/`, add four data-driven entries to the Library catalog, and render one shared dynamic detail route at `src/app/works/[slug]/page.tsx`. The homepage shell remains unchanged.

**Tech Stack:** Next.js 15 App Router, React 19, TypeScript, Motion, Lucide React, CSS in `src/app/globals.css`, Node built-in test runner.

## Global Constraints

- Four works only: Material Office, Signal House, Quiet Form, and Ritual Objects.
- Every work is labeled as a fictional case study.
- Selected Works is a template subset inside the reusable asset Library.
- Work cards use local image motion and text-only action hover; no large custom cursor or row-wide text hover.
- Dedicated pages must preserve Framefield navigation, back-to-works, keyboard focus, mobile usability, and reduced-motion behavior.
- Visual studies are SVG assets with no external network dependency; Material Office may reuse its existing preview media.

---

### Task 1: Establish the works registry and regression contract

**Files:**
- Create: `library/works/registry.ts`
- Create: `tests/selected-works.test.mjs`

**Interfaces:**
- `SELECTED_WORKS`: readonly registry of four `SelectedWork` records.
- Each record exposes `slug`, `number`, `title`, `category`, `year`, `summary`, `brief`, `direction`, `stack`, `accent`, `visuals`, `route`, and `fictionalLabel`.

- [x] **Step 1: Write the failing test**

Assert that the registry contains exactly four unique slugs, every work has a dedicated route and at least two visual paths, and the expected fictional labels/titles exist.

- [x] **Step 2: Run the focused test to verify it fails**

Run `node --test tests/selected-works.test.mjs`.

Expected: FAIL because the registry file does not exist.

- [x] **Step 3: Add the minimal registry**

Create the four records with the approved fictional briefs and stable route paths under `/works/<slug>`.

- [x] **Step 4: Run the focused test to verify it passes**

Run `node --test tests/selected-works.test.mjs`.

Expected: PASS for registry shape and content.

---

### Task 2: Create per-work visual studies

**Files:**
- Create: `public/works/material-office/visual-01.svg`
- Create: `public/works/material-office/visual-02.svg`
- Create: `public/works/signal-house/visual-01.svg`
- Create: `public/works/signal-house/visual-02.svg`
- Create: `public/works/quiet-form/visual-01.svg`
- Create: `public/works/quiet-form/visual-02.svg`
- Create: `public/works/ritual-objects/visual-01.svg`
- Create: `public/works/ritual-objects/visual-02.svg`
- Modify: `library/works/registry.ts`
- Test: `tests/selected-works.test.mjs`

**Interfaces:**
- Every registry `visuals` entry must resolve to a public SVG path.
- SVGs are self-contained, accessible as decorative images, and use each work's unique palette/material language.

- [x] **Step 1: Extend the failing test**

Assert every visual path exists and ends in `.svg`.

- [x] **Step 2: Run the focused test to verify it fails**

Run `node --test tests/selected-works.test.mjs`.

Expected: FAIL because the visual files do not exist.

- [x] **Step 3: Add the visual studies**

Create two SVG compositions per work: one primary art-directed composition and one supporting system/detail composition.

- [x] **Step 4: Run the focused test to verify it passes**

Run `node --test tests/selected-works.test.mjs`.

Expected: PASS with eight visual files present.

---

### Task 3: Add the Selected Works homepage section

**Files:**
- Modify: `src/app/page.tsx`
- Modify: `src/app/globals.css`
- Test: `tests/selected-works.test.mjs`

**Interfaces:**
- Add `SelectedWorks` between `Library` and `Pricing` with `id="works"`.
- Cards link to each registry route and expose the exact `View work` action.
- Card motion uses existing `motion` and `EASE_OUT` conventions.

- [x] **Step 1: Extend the failing test**

Assert the page imports `SELECTED_WORKS`, renders `SelectedWorks`, includes `id="works"`, links all four routes, includes `View work`, and uses an `@media (prefers-reduced-motion: reduce)` rule for the work surface.

- [x] **Step 2: Run the focused test to verify it fails**

Run `node --test tests/selected-works.test.mjs`.

Expected: FAIL because the homepage has no Selected Works section.

- [x] **Step 3: Implement the section and styles**

Add four data-driven Selected Works entries to the Library catalog with local visual previews, dedicated route links, visible focus states, and existing catalog card interaction.

- [x] **Step 4: Run the focused test to verify it passes**

Run `node --test tests/selected-works.test.mjs`.

Expected: PASS for section structure and interaction hooks.

---

### Task 4: Add dedicated work detail pages

**Files:**
- Create: `src/app/works/[slug]/page.tsx`
- Create: `src/app/works/[slug]/work.css`
- Modify: `src/app/layout.tsx`
- Test: `tests/selected-works.test.mjs`

**Interfaces:**
- `generateStaticParams()` returns all four registry slugs.
- Unknown slugs call `notFound()`.
- Detail pages render hero, fictional label, brief, creative direction, visual studies, `Built from Framefield`, and previous/next work links.

- [x] **Step 1: Extend the failing test**

Assert the dynamic route exists, uses `generateStaticParams`, calls `notFound`, renders the required detail labels, and references the registry visual paths.

- [x] **Step 2: Run the focused test to verify it fails**

Run `node --test tests/selected-works.test.mjs`.

Expected: FAIL because the route does not exist.

- [x] **Step 3: Implement the shared detail page**

Render each case study from the registry with its own accent class, visual studies, metadata, built-from section links, and previous/next navigation. Use a restrained entrance sequence and local image hover captions; do not add scroll hijacking.

- [x] **Step 4: Run the focused test to verify it passes**

Run `node --test tests/selected-works.test.mjs`.

Expected: PASS for route generation and content contract.

---

### Task 5: Update documentation and validate the complete surface

**Files:**
- Modify: `docs/framefield-overview.md`
- Modify: `docs/element-implementation.md`
- Modify: `docs/development-workflow.md`
- Modify: `docs/documentation-audit.md`
- Create: `library/works/selected-works.md`

- [x] **Step 1: Document the Selected Works contract**

Record the showcase-vs-library boundary, four fictional case studies, route convention, visual-study package convention, and micro-interaction rules.

- [x] **Step 2: Run the full test suite**

Run `node --test tests/*.mjs`.

Expected: all tests pass.

- [x] **Step 3: Run the production build**

Run `npm run build`.

Expected: Next.js statically generates `/works/material-office`, `/works/signal-house`, `/works/quiet-form`, and `/works/ritual-objects` without type errors.

- [x] **Step 4: Run the UI detector**

Run `node C:\Users\GIELANG\.agents\skills\impeccable\scripts\detect.mjs --json src/app/page.tsx src/app/globals.css src/app/works/[slug]/page.tsx src/app/works/[slug]/work.css`.

Expected: no detector findings.
