# Framefield Rebrand and Empty Library Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create an isolated `Framefield` project by preserving Stackframe's full editorial homepage structure, rebranding it, removing all seeded template assets, and adding a generated premium logo mark.

**Architecture:** Copy the existing Next.js/Cloudflare project into a sibling directory without generated build artifacts or dependencies. Keep the existing single-page composition and motion system, but make the catalog intentionally empty so the library renders its existing empty state. Store the generated logo mark in `public` and use it in the shared brand mark component while retaining text-based wordmark copy.

**Tech Stack:** Next.js 15, React 19, TypeScript, Motion, Lucide, MDX support, OpenNext Cloudflare, Node test runner, built-in image generation.

## Global Constraints

- The original `Stackframe` directory remains unchanged.
- The new project path is `D:\Productivity\Coding\Websites\Framefield`.
- Do not keep template preview videos or template URLs in the new catalog.
- The initial Framefield library must render an empty state rather than seeded assets.
- Preserve the existing page sections, responsive behavior, motion, and visual frame system.
- The generated logo asset must be copied into the new project before delivery.

### Task 1: Scaffold the isolated Framefield project

**Files:**
- Create: `D:\Productivity\Coding\Websites\Framefield\` from the existing Stackframe project, excluding `node_modules`, `.next`, `.next-build`, `.open-next`, `.wrangler`, `.git`, and other generated artifacts.

- [ ] **Step 1: Copy source directories and project configuration**

Copy `src`, `public`, `tests`, `docs`, and the root project/configuration files from Stackframe into Framefield. Do not copy generated build output, dependencies, or the original Git metadata.

- [ ] **Step 2: Verify the scaffold is isolated**

Run `rg --files D:\Productivity\Coding\Websites\Framefield -g '!node_modules' -g '!dist'` and confirm the new tree contains the source files but not `node_modules`, `.next`, or `.git`.

### Task 2: Add failing tests for Framefield's empty catalog

**Files:**
- Create: `D:\Productivity\Coding\Websites\Framefield\tests\framefield-structure.test.mjs`

**Interfaces:**
- Consumes: the copied `src/app/page.tsx` and `public` tree.
- Produces: assertions that define Framefield's brand, empty library, and absence of template media.

- [ ] **Step 1: Write the failing test**

```js
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

const root = new URL("..", import.meta.url);
const page = readFileSync(new URL("../src/app/page.tsx", import.meta.url), "utf8");

test("Framefield homepage uses the new brand and empty library", () => {
  assert.match(page, /Framefield/);
  assert.match(page, /No assets found|empty-state/);
  assert.doesNotMatch(page, /Aster|Radian Works|Cinder Atelier|Hushwork|Forma Common|Phase|Rouge/);
});

test("Framefield has no seeded template preview videos", () => {
  for (const file of ["aster.mp4", "radian.mp4", "phase.mp4", "hushwork.mp4", "forma-common.mp4", "cinder.mp4", "rouge.mp4"]) {
    assert.equal(existsSync(new URL(`../public/${file}`, import.meta.url)), false, file);
  }
});
```

- [ ] **Step 2: Run the focused test and verify it fails for the intended reason**

Run: `node --test tests/framefield-structure.test.mjs`

Expected: FAIL because the copied page still contains Stackframe/template content and the preview videos still exist.

### Task 3: Rebrand the page and make the library intentionally empty

**Files:**
- Modify: `D:\Productivity\Coding\Websites\Framefield\src\app\page.tsx`
- Modify: `D:\Productivity\Coding\Websites\Framefield\src\app\layout.tsx`
- Modify: `D:\Productivity\Coding\Websites\Framefield\src\app\globals.css` only where brand-specific selectors/copy require it
- Modify: `D:\Productivity\Coding\Websites\Framefield\README.md`
- Modify: `D:\Productivity\Coding\Websites\Framefield\branding.md`
- Modify: `D:\Productivity\Coding\Websites\Framefield\package.json`

**Interfaces:**
- Consumes: the existing `Asset` type, library filtering, and empty-state rendering.
- Produces: a Framefield-branded homepage with zero catalog entries and preserved page structure.

- [ ] **Step 1: Remove all seeded `ASSETS` entries and template preview references**

Set the catalog to an empty typed array, remove template video/url data, and retain the library component so its existing empty state is shown.

- [ ] **Step 2: Rename the public brand and metadata**

Replace visible `Stackframe` branding, page title, README positioning, and package name with `Framefield`. Preserve the existing dark editorial art direction and use the new positioning: curated website builds, sections, visual assets, and prompts.

- [ ] **Step 3: Update library labels for the empty Framefield shell**

Use `Sections`, `Visuals`, and `Prompts` as the empty library's content filters/labels where the existing filter structure allows it. Do not add placeholder catalog content.

- [ ] **Step 4: Run the focused test and verify it passes**

Run: `node --test tests/framefield-structure.test.mjs`

Expected: PASS.

### Task 4: Generate and integrate the Framefield logo mark

**Files:**
- Create: `D:\Productivity\Coding\Websites\Framefield\public\framefield-mark.png`
- Modify: `D:\Productivity\Coding\Websites\Framefield\src\app\page.tsx` or the existing brand component location to render the mark in navigation/footer.

**Interfaces:**
- Consumes: generated logo image.
- Produces: a reusable image-backed mark with the existing text wordmark.

- [ ] **Step 1: Generate a simple premium-modern logo mark**

Generate a square logo mark with an abstract layered-frame/field motif, near-black and acid-lime palette, crisp geometry, no slogan, no watermark, and generous negative space. Use the built-in image generation tool.

- [ ] **Step 2: Copy the selected generated asset into `public/framefield-mark.png`**

Validate that the file is readable and suitable for a small navigation mark.

- [ ] **Step 3: Replace the old inline brand mark usage**

Render the generated mark alongside the text `Framefield` in the navigation and footer without changing the layout geometry.

### Task 5: Remove obsolete media and verify the full project

**Files:**
- Delete from the new project only: `public/aster.mp4`, `public/radian.mp4`, `public/phase.mp4`, `public/hushwork.mp4`, `public/forma-common.mp4`, `public/cinder.mp4`, `public/rouge.mp4`.

- [ ] **Step 1: Remove only the copied template media**

Verify each target path is inside the new Framefield project before removal; do not modify Stackframe's media.

- [ ] **Step 2: Run all tests**

Run: `npm test` if the project exposes it; otherwise run `node --test tests/*.test.mjs` from the Framefield directory.

Expected: all tests pass.

- [ ] **Step 3: Run production build and lint**

Run: `npm run lint` and `npm run build` from `D:\Productivity\Coding\Websites\Framefield`.

Expected: both commands complete successfully without new warnings caused by the rebrand.

- [ ] **Step 4: Review the final diff and confirm Stackframe is unchanged**

Compare the new project's structure and run `git -C D:\Productivity\Coding\Websites\Stackframe-PromptLibrary status --short` to confirm the original project has no changes from this task.
