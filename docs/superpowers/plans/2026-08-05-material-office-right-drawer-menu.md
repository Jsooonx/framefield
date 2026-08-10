# Material Office Right Drawer Menu Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Change the Material Office desktop menu into a right-side editorial drawer while preserving the existing mobile full-screen menu.

**Architecture:** Keep the existing `menuOpen` state and Motion mount boundary. Add a backdrop sibling inside the menu overlay, then constrain the menu content to a right-side drawer above `900px`; at smaller sizes, retain the full-canvas Editorial Index layout. Remove the desktop poster strip because the exposed hero is the visual counterpart.

**Tech Stack:** Next.js 15, React 19, TypeScript, Motion, CSS media queries, Node test runner.

## Global Constraints

- Desktop drawer begins at `min-width: 900px`, uses `34vw`, and has a maximum width of `520px`.
- Preserve menu items, utility copy, route, hero media, accessible labels, Escape handling, focus states, and body scroll locking.
- The exposed hero area must close the drawer when clicked; the drawer itself must not close from internal clicks.
- Mobile (`max-width: 899px`) preserves the full-screen Editorial Index without horizontal overflow.
- Motion exclusively controls menu-link opacity and transform; CSS may not transition either property on `.material-office__menu-link`.
- Do not add new assets, cards, CTAs, backend behaviour, or translucent/glass treatments.
- This workspace is not a Git repository; do not create commits.

---

### Task 1: Add the drawer interaction contract

**Files:**
- Modify: `tests/material-office.test.mjs`
- Modify: `library/sections/material-office/source/MaterialOffice.tsx`

**Interfaces:**
- Consumes: existing `menuOpen` state and `setMenuOpen` updater.
- Produces: `material-office__menu-backdrop` as the close target and `material-office__menu-panel` as the non-closing drawer surface.

- [x] **Step 1: Write the failing test**

```js
test("Material Office desktop menu exposes a separate drawer panel and backdrop", () => {
  const content = readFileSync(source, "utf8");

  assert.match(content, /material-office__menu-backdrop/);
  assert.match(content, /onClick=\{\(\) => setMenuOpen\(false\)\}/);
  assert.match(content, /material-office__menu-panel/);
});
```

- [x] **Step 2: Run test to verify it fails**

Run: `node --test tests/material-office.test.mjs`

Expected: the new test fails because the drawer backdrop and panel are not present.

- [x] **Step 3: Write minimal implementation**

```tsx
<motion.div className="material-office__menu" role="dialog" aria-modal="true">
  <button
    className="material-office__menu-backdrop"
    type="button"
    aria-label="Close menu"
    onClick={() => setMenuOpen(false)}
  />
  <div className="material-office__menu-panel">{/* existing menu content */}</div>
</motion.div>
```

- [x] **Step 4: Run test to verify it passes**

Run: `node --test tests/material-office.test.mjs`

Expected: all Material Office tests pass.

### Task 2: Apply responsive drawer layout

**Files:**
- Modify: `tests/material-office.test.mjs`
- Modify: `library/sections/material-office/source/material-office.css`

**Interfaces:**
- Consumes: `.material-office__menu`, `.material-office__menu-backdrop`, and `.material-office__menu-panel` from Task 1.
- Produces: a 34vw/520px desktop panel, an exposed clickable hero shade, and the existing full-screen menu at mobile widths.

- [x] **Step 1: Write the failing test**

```js
test("Material Office constrains the desktop menu to a right-side drawer", () => {
  const stylesheet = readFileSync(styles, "utf8");

  assert.match(stylesheet, /@media \(min-width: 900px\)[\s\S]*max-width:\s*520px/s);
  assert.match(stylesheet, /@media \(min-width: 900px\)[\s\S]*width:\s*34vw/s);
  assert.match(stylesheet, /material-office__menu-backdrop/);
  assert.match(stylesheet, /material-office__menu-panel/);
});
```

- [x] **Step 2: Run test to verify it fails**

Run: `node --test tests/material-office.test.mjs`

Expected: the new test fails because no desktop drawer breakpoint exists.

- [x] **Step 3: Write minimal implementation**

```css
.material-office__menu-backdrop { position: absolute; inset: 0; background: rgba(5, 6, 6, 0.32); }
.material-office__menu-panel { position: relative; z-index: 1; }

@media (min-width: 900px) {
  .material-office__menu { display: flex; justify-content: end; background: transparent; }
  .material-office__menu-panel { width: 34vw; max-width: 520px; height: 100%; background: #f3f0e7; }
  .material-office__menu-strip { display: none; }
}
```

- [x] **Step 4: Run focused tests and detector**

Run: `node --test tests/material-office.test.mjs`

Run: `node C:\\Users\\GIELANG\\.agents\\skills\\impeccable\\scripts\\detect.mjs --json library/sections/material-office/source/MaterialOffice.tsx library/sections/material-office/source/material-office.css`

Expected: all tests pass and detector returns `[]`.

### Task 3: Visual and production verification

**Files:**
- Modify: `library/sections/material-office/design.md`
- Modify: `docs/documentation-audit.md`

**Interfaces:**
- Consumes: the completed drawer implementation from Tasks 1 and 2.
- Produces: updated source-of-truth documentation and verified desktop/mobile behaviour.

- [x] **Step 1: Update decision records**

```md
### 2026-08-05 — Right-side desktop drawer

- Decision: Desktop navigation uses a 34vw right drawer while mobile retains the full-screen Editorial Index.
- Reason: The hero stays visible as the experience, and the menu becomes a precise control surface.
- Impact: The desktop poster strip is removed; click-away close joins the existing Escape and header-toggle paths.
```

- [x] **Step 2: Verify desktop and mobile interaction**

Run the local preview at `/library/sections/material-office`:

1. At `1440x960`, open the menu and verify the cream drawer is on the right, max `520px`, the hero remains visible, and clicking the exposed shade closes it.
2. At `390x844`, open the menu and verify it remains full-screen with no horizontal overflow.
3. At both sizes, press Escape and verify the dialog closes.

- [x] **Step 3: Run production verification**

Run: `npm run build`

Run: `node --test tests/*.mjs`

Expected: production build exits `0`; every test passes.
