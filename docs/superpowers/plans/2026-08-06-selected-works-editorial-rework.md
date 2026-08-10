# Selected Works Editorial Rework Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the Selected Works preview visual composition with a reference-led light editorial project index while preserving its single section package and nested project routes.

**Architecture:** Keep `metadata.ts` and Next routes unchanged. Replace only `source/SelectedWorks.tsx` and `source/selected-works.css`, then update the section design contract. The homepage remains untouched because Selected Works is one Library asset.

**Tech Stack:** Next.js 15 App Router, React 19, Motion, Lucide React, CSS, Node built-in test runner.

## Global Constraints

- One catalog asset and one preview route only: `/library/sections/selected-works`.
- Four fictional child project routes remain nested under the preview route.
- The visual direction is light editorial, based on the two supplied references.
- Header → oversized masthead → title rails → media grid; no homepage work section.
- Motion is local and reduced-motion-safe.

---

### Task 1: Lock the new composition with a regression test

**Files:**
- Modify: `tests/selected-works.test.mjs`

- [x] **Step 1: Write the failing test**

Assert `SelectedWorks.tsx` includes `Works.`, `©2026`, `selected-work-title-rail`, and `selected-work-lockup`, and assert its CSS includes a two-column grid plus mobile single-column fallback.

- [x] **Step 2: Run focused test to verify it fails**

Run: `node --test tests/selected-works.test.mjs`

Expected: FAIL because the incumbent source still has the previous intro and card-meta composition.

---

### Task 2: Replace the preview composition

**Files:**
- Modify: `library/sections/selected-works/source/SelectedWorks.tsx`
- Modify: `library/sections/selected-works/source/selected-works.css`

- [x] **Step 1: Rebuild the preview markup**

Render a minimal utility header, masthead, and four project items where each item contains a title rail above an image-led link and centered project lockup.

- [x] **Step 2: Rebuild the preview stylesheet**

Use an off-white canvas, black type, restrained separators, desktop two-column grid, mobile one-column grid, focus-visible state, local media hover overlay, and reduced-motion fallback.

- [x] **Step 3: Run focused test to verify it passes**

Run: `node --test tests/selected-works.test.mjs`

Expected: PASS.

---

### Task 3: Synchronize documentation and validate

**Files:**
- Modify: `library/sections/selected-works/design.md`
- Modify: `docs/documentation-audit.md`

- [x] **Step 1: Update the section design contract**

Record the masthead, title rails, light editorial surface, and local hover behavior.

- [x] **Step 2: Run validation**

Run: `node --test tests/*.mjs` and `npm run build`.

Expected: all tests pass and Next.js statically generates the preview plus all four nested child routes.
