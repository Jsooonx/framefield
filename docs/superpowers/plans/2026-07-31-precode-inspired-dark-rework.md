# Stackframe Editorial Rework Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rework Stackframe's complete homepage into a dark editorial landing page inspired by Precode's narrative structure while retaining Stackframe's catalog behavior and lime identity.

**Architecture:** Keep the existing client-side page state, filtering, saved assets, live previews, and video cards. Recompose the page into a framed editorial narrative: hero, rationale, workflow, library, collections, and closing CTA; CSS owns visual layout and responsive presentation.

**Tech Stack:** Next.js, React, TypeScript, Motion, Lucide, CSS.

## Global Constraints

- Keep the visual identity dark with Stackframe lime (`#c8ff4a`) as the principal accent.
- Preserve catalog filters, search, saved state, live template previews, and video playback.
- Do not push or deploy.
- Respect `prefers-reduced-motion` through Motion's reduced-motion support and CSS fallback.

---

### Task 1: Recompose the landing-page narrative

**Files:**
- Modify: `src/app/page.tsx`
- Test: `npx tsc --noEmit`

**Interfaces:**
- Consumes: Existing `ASSETS`, filter state, `AssetCard` preview behavior.
- Produces: Semantic `Hero`, `Problem`, `Workflow`, `Library`, `Collections`, and `Footer` sections with stable anchors.

- [x] **Step 1: Verify the current page type-checks**

Run: `npx tsc --noEmit`

- [x] **Step 2: Recompose page sections without changing catalog state interfaces**

Add editorial sections around the existing library. Preserve `Library` props, `AssetCard` external preview links, search field ID, and filter callbacks.

- [x] **Step 3: Verify the page type-checks**

Run: `npx tsc --noEmit`

### Task 2: Replace the visual system

**Files:**
- Modify: `src/app/globals.css`
- Test: `npm run build`

**Interfaces:**
- Consumes: Semantic class names from `page.tsx`.
- Produces: Dark framed layout, responsive typography, structured cards, and catalog treatment.

- [x] **Step 1: Define dark editorial tokens and framed section primitives**

Create reusable frame, corner, divider, metadata, and button rules using explicit transition properties.

- [x] **Step 2: Add responsive composition and reduced-motion handling**

Collapse the framed grids to a single-column mobile narrative while retaining filter and search usability.

- [x] **Step 3: Verify production build**

Run: `npm run build`

### Task 3: Review and local handoff

**Files:**
- Modify: `src/app/page.tsx`, `src/app/globals.css`
- Test: `npx tsc --noEmit`, `npm run build`

**Interfaces:**
- Consumes: The reworked section and CSS system.
- Produces: A local-only complete page ready for the user to run with `npm run dev`.

- [x] **Step 1: Confirm all catalog interactions remain wired**

Check that filter, search, save, prompt-copy, and preview rendering code remain present.

- [x] **Step 2: Run final verification**

Run: `npx tsc --noEmit` and `npm run build`.

- [x] **Step 3: Leave changes uncommitted and unpushed**

Report affected files and exact local run command.
