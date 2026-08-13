# NORTHSTAR Inline Metrics Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Move the NORTHSTAR metrics story below the testimonials bento on the main preview route and remove the redundant dedicated metrics route.

**Architecture:** Keep `NorthstarMetrics` as the metrics section component, but render it after the bento inside `NorthstarTestimonials`. Replace route navigation with an in-page `#metrics` anchor, remove the `/metrics` adapter, and update metadata, tests, and current-truth documentation to describe two remaining preview routes: overview and Atlas House case study.

**Tech Stack:** Next.js App Router, React/TypeScript, Framer Motion, scoped CSS, Node test runner.

## Global Constraints

- NORTHSTAR remains an independent section package; only the universal `Back to library` control connects it to Framefield.
- Non-hero preview pages keep no navbar or footer.
- The metrics content stays below the testimonials bento and retains staggered counters with reduced-motion-safe behavior.
- The Atlas House case study remains a separate nested route.
- Do not commit or push; the user authorized implementation on `main`, not repository delivery actions.

---

### Task 1: Lock the route and inline composition contract

**Files:**
- Modify: `tests/northstar-testimonials.test.mjs`
- Modify: `library/sections/northstar-testimonials/source/NorthstarTestimonials.tsx`
- Modify: `src/app/library/sections/northstar-testimonials/metrics/page.tsx` (delete)

**Interfaces:**
- `NorthstarTestimonials` imports and renders `NorthstarMetrics` below the bento.
- The CTA uses `/library/sections/northstar-testimonials#metrics` or an equivalent local anchor.
- The main route remains `/library/sections/northstar-testimonials`; `/atlas-house` remains available.

- [ ] **Step 1: Write the failing test**

Add assertions that the main source imports/renders `NorthstarMetrics`, includes an element with `id="metrics"`, and no longer links the CTA to `/metrics`. Change the route contract from three route adapters to two and assert the metrics adapter is absent.

- [ ] **Step 2: Run the focused test to verify it fails**

Run: `node --test tests/northstar-testimonials.test.mjs`

Expected: FAIL because the current main component does not render `NorthstarMetrics`, the CTA still targets `/metrics`, and the metrics adapter still exists.

- [ ] **Step 3: Implement the minimal composition change**

Import `NorthstarMetrics` in `NorthstarTestimonials.tsx`, render it after the closing bento section, add `id="metrics"` to the metrics section root, and change the CTA href to `#metrics`. Delete `src/app/library/sections/northstar-testimonials/metrics/page.tsx`.

- [ ] **Step 4: Run the focused test to verify it passes**

Run: `node --test tests/northstar-testimonials.test.mjs`

Expected: PASS for the updated route/composition contract.

### Task 2: Update package metadata, docs, and route references

**Files:**
- Modify: `library/sections/northstar-testimonials/metadata.ts`
- Modify: `library/sections/northstar-testimonials/design.md`
- Modify: `docs/documentation-audit.md`
- Modify: `docs/framefield-overview.md`
- Modify: `docs/README.md` if its route description needs the exact route count corrected
- Modify: `docs/superpowers/specs/2026-08-12-northstar-testimonials-design.md`
- Modify: `docs/superpowers/plans/2026-08-12-northstar-testimonials.md`

**Interfaces:**
- Metadata exposes only the overview and Atlas House routes; metrics is an inline anchor/section, not a preview route.
- Documentation consistently says the package has an overview testimonials page with metrics below it and a separate Atlas House case study.

- [ ] **Step 1: Update metadata**

Remove the `metricsRoute` registry field and keep the overview route plus Atlas House route data. Preserve all asset paths and fictional metrics data.

- [ ] **Step 2: Update current-truth documentation**

Replace “three routes,” “metrics route,” and dedicated metrics route references with “metrics section below the testimonials bento.” Update route lists and route-count wording without changing the no-navbar/footer or Back to library rules.

- [ ] **Step 3: Search for stale dedicated-route references**

Run: `rg -n "northstar-testimonials/metrics|metricsRoute|three preview route|three connected preview routes|dedicated metrics|metrics route" src library tests docs PRODUCT.md`

Expected: no stale implementation or current-truth references; historical plan text may be retained only if explicitly marked as an original implementation record, otherwise update it for consistency.

### Task 3: Fit and verify the combined page layout

**Files:**
- Modify: `library/sections/northstar-testimonials/source/northstar-testimonials.css`
- Modify: `library/sections/northstar-testimonials/source/NorthstarMetrics.tsx` only if the inline composition needs spacing/semantic adjustments
- Test: `tests/northstar-testimonials.test.mjs`

**Interfaces:**
- The bento remains visually bounded and unchanged in structure.
- The metrics section follows it with intentional vertical spacing and retains its own stagger/counter behavior.
- The combined page has no horizontal overflow at desktop or mobile widths.

- [ ] **Step 1: Add the layout regression assertions**

Assert the metrics root has `id="metrics"`, the overview stylesheet defines a transition from bento to metrics spacing, and the metrics component still includes its metrics row and reduced-motion motion contract.

- [ ] **Step 2: Run the focused test**

Run: `node --test tests/northstar-testimonials.test.mjs`

Expected: PASS after the composition and CSS contract are in place.

- [ ] **Step 3: Perform browser QA**

Start the production server on port 3102 and inspect `/library/sections/northstar-testimonials` at 1440×900 and 390×844. Confirm the bento ends before the metrics section begins, the anchor lands on the metrics heading, the counters animate once, the fixed Back to library control remains present, and there is no horizontal overflow.

### Task 4: Full validation and handoff

**Files:**
- Verify: all changed files above

- [ ] **Step 1: Run the full test suite**

Run: `node --test tests/*.mjs`

Expected: all existing tests pass, with the updated NORTHSTAR route contract included.

- [ ] **Step 2: Build the application**

Run: `npm run build`

Expected: Next.js compiles, type-checks, statically generates the remaining overview and Atlas House routes, and does not list `/metrics`.

- [ ] **Step 3: Run hygiene checks**

Run: `git diff --check` and `rg -n "northstar-testimonials/metrics|metricsRoute" src library tests docs PRODUCT.md`

Expected: no whitespace errors and no stale dedicated metrics implementation references.
