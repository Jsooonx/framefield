# Material Office Editorial Index Menu Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rework the Material Office overlay into the approved Editorial Index menu while preserving route behavior and accessibility.

**Architecture:** Keep menu state and existing navigation data in `MaterialOffice.tsx`. Expand only the rendered overlay structure and its scoped stylesheet. A static contract test guards the index panel, sequence labels, material strip, hover/focus affordances, and mobile layout without touching the hero or catalog.

**Tech Stack:** Next.js 15, React 19, TypeScript, Motion, Lucide React, scoped CSS, Node built-in test runner.

## Global Constraints

- Preserve the existing five menu destinations, Escape close, `aria-expanded`, dialog role, scroll lock, and reduced-motion behavior.
- Use the existing poster at `/library/sections/material-office/hero-poster.webp`; do not introduce any new image asset.
- Desktop must use a 70/30 index-panel/material-strip composition; mobile must convert the strip to a shallow full-width band.
- Do not add cards, additional CTAs, cursor effects, or client claims.
- Stop all Framefield dev servers before production build.

---

### Task 1: Define the Editorial Index contract

**Files:**
- Modify: `tests/material-office.test.mjs`
- Modify: `library/sections/material-office/source/MaterialOffice.tsx`
- Modify: `library/sections/material-office/source/material-office.css`

**Interfaces:**
- Consumes: existing `MENU_ITEMS` array and `menuOpen` state.
- Produces: index labels `01`–`05`, `material-office__menu-index`, `material-office__menu-strip`, and `material-office__menu-utility`.

- [ ] **Step 1: Write the failing test**

```js
test("Material Office menu is an editorial index", () => {
  assert.match(source, /material-office__menu-index/);
  assert.match(source, /material-office__menu-sequence/);
  assert.match(source, /material-office__menu-strip/);
  assert.match(source, /material-office__menu-utility/);
  assert.match(styles, /grid-template-columns:\s*minmax\(0,\s*7fr\)\s+minmax\(220px,\s*3fr\)/);
  assert.match(styles, /@media \(max-width: 720px\)[\s\S]*grid-template-columns:\s*1fr/);
});
```

- [ ] **Step 2: Run the focused test and verify it fails**

Run: `node --test tests/material-office.test.mjs`

Expected: FAIL because the approved index structure and responsive composition do not exist.

- [ ] **Step 3: Implement the minimal overlay structure**

Render a menu header with `MATERIAL®`, `INDEX 01—05`, and close control. Render each existing item as an anchor containing a two-digit sequence label and link text. Add a `material-office__menu-strip` image using the existing poster, plus a lower `material-office__menu-utility` grid containing the current location, email, privacy, and terms links.

- [ ] **Step 4: Implement scoped styles**

Use the approved 70/30 grid, left-aligned index links, lime hover/focus sequence label, and a small transform applied only to the material strip. At 720px and below, use a single-column grid and render the strip as a shallow band before the utility grid.

- [ ] **Step 5: Run the focused test and verify it passes**

Run: `node --test tests/material-office.test.mjs`

Expected: PASS.

### Task 2: Validate behavior and documentation

**Files:**
- Modify: `library/sections/material-office/design.md`
- Modify: `docs/documentation-audit.md`
- Test: `tests/production-runtime.test.mjs`

**Interfaces:**
- Consumes: overlay implementation from Task 1.
- Produces: design decision history that reflects the Editorial Index menu and validated route behavior.

- [ ] **Step 1: Update the design decision log**

Record that the menu was reworked from a centered link list to the Editorial Index composition, including why the poster becomes a strip rather than a background.

- [ ] **Step 2: Update documentation audit**

Add a UI change-log entry naming the menu rework and confirming that the route/video/WebP status did not change.

- [ ] **Step 3: Run full verification**

Run: with no `next dev` process active, `npm run build`, then `node --test tests/*.mjs`.

Expected: production build succeeds and all tests pass, including the production route smoke test.

- [ ] **Step 4: Inspect the route**

Open `/library/sections/material-office` at 1440x960 and 390x844. Check the material strip, sequence labels, header, utility grid, close control, Escape behavior, focus response, and absence of horizontal overflow.
