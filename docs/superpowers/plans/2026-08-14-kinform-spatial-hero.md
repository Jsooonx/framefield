# KINFORM Spatial Hero Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship KINFORM as a standalone, fictional, image-led architecture and interior Hero section with original media, cinematic but accessible motion, and one catalog card.

**Architecture:** The asset is isolated in `library/sections/kinform-spatial-hero/`: metadata is the single catalog contract, `KinformHero.tsx` owns the client-side composition and menu/motion state, and `kinform-hero.css` scopes every visual rule under `.kinform-hero`. A thin App Router adapter only renders the package. The shared catalog learns about the asset through its metadata after the route, original visual, fallback image, and recording have passed QA.

**Tech Stack:** Next.js 15 App Router, React 19, TypeScript, Motion (`motion/react`), Lucide React, CSS, Node test runner, ImageGen, Cloudflare R2.

## Global Constraints

- Package slug is exactly `kinform-spatial-hero`; route is exactly `/library/sections/kinform-spatial-hero`.
- This is a `section` / Hero with `Free` access and fictional KINFORM content only; do not make real project, client, location, award, or performance claims.
- The ArcSphere reference informs hierarchy only. Do not reuse its name, copy, image, interior composition, controls, or styling details.
- Only the fixed universal `Back to library` control connects the preview to Framefield. The KINFORM Hero must not import Framefield branding, palette, homepage shell, catalog controls, footer, or pricing.
- KINFORM's slim navigation is permitted because this asset is a Hero. Do not add any secondary site page, section, footer, or case-study scope.
- Use one original, generated 16:9 interior visual; no stock asset, logo, watermark, readable text, or reference reconstruction.
- Never use `transition: all`, layout animation, large pointer parallax, bounce, or looping decorative movement. Hover transforms run only inside `@media (hover: hover) and (pointer: fine)`.
- All interactive controls have visible keyboard focus, 44px minimum mobile hit areas, and `:active { transform: scale(0.96); }` where visually appropriate.
- `useReducedMotion()` and CSS `prefers-reduced-motion` must render the completed layout immediately with no blur, stagger, transform, or media drift.
- Keep source and public browser assets local in the repository; upload only visual raster/video assets to R2 after visual QA. The standalone master prompt remains in repository/public paths and never goes to R2.
- Validate 1440×900, 820px, and 390×844 without horizontal overflow, and keep all changes inside this asset, its catalog registration, focused test, and current-truth docs.

---

### Task 1: Establish the KINFORM package contract and regression boundary

**Files:**
- Create: `tests/kinform-spatial-hero.test.mjs`
- Create: `library/sections/kinform-spatial-hero/metadata.ts`
- Create: `src/app/library/sections/kinform-spatial-hero/page.tsx`
- Create: `library/sections/kinform-spatial-hero/design.md`
- Modify: `docs/superpowers/specs/2026-08-14-kinform-hero-design.md`

**Interfaces:**
- Produces `kinformSpatialHeroAsset` with the metadata shape consumed by `src/app/page.tsx` in Task 4.
- Produces the dedicated route adapter that consumes the `KinformHero` export added in Task 3.
- Establishes `HERO_POSTER` and `KINFORM_NAV_ITEMS` names that Task 3 uses verbatim.

- [ ] **Step 1: Write the failing package and route contract test**

Create `tests/kinform-spatial-hero.test.mjs` with these initial assertions:

```js
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

const fromRoot = (path) => new URL(`../${path}`, import.meta.url);
const read = (path) => readFileSync(fromRoot(path), "utf8");

test("KINFORM has an isolated Hero package, metadata, and route", () => {
  const metadata = read("library/sections/kinform-spatial-hero/metadata.ts");
  const route = read("src/app/library/sections/kinform-spatial-hero/page.tsx");

  assert.equal(existsSync(fromRoot("library/sections/kinform-spatial-hero/source/KinformHero.tsx")), true);
  assert.match(metadata, /slug:\s*"kinform-spatial-hero"/);
  assert.match(metadata, /route:\s*"\/library\/sections\/kinform-spatial-hero"/);
  assert.match(metadata, /category:\s*"Hero"/);
  assert.match(metadata, /access:\s*"Free"/);
  assert.match(route, /KinformHero/);
});
```

- [ ] **Step 2: Run the focused test to verify it fails before the source exists**

Run: `node --test tests/kinform-spatial-hero.test.mjs`

Expected: FAIL because the package source and route contract have not been created yet.

- [ ] **Step 3: Create metadata, route adapter, and package design contract**

Create `library/sections/kinform-spatial-hero/metadata.ts` with this exact export shape; retain `status: "review"` until Task 4 finishes visual QA:

```ts
const sectionRoute = "/library/sections/kinform-spatial-hero";

export const kinformSpatialHeroAsset = {
  slug: "kinform-spatial-hero",
  title: "KINFORM Spatial Hero",
  type: "section" as const,
  category: "Hero",
  status: "review" as const,
  access: "Free" as const,
  tags: ["hero", "architecture", "interior"],
  preview: "/library/sections/kinform-spatial-hero/hero-poster.webp",
  previewVideo: "/library/sections/kinform-spatial-hero/preview.mp4",
  promptUrl: "/library/sections/kinform-spatial-hero/master-prompt.md",
  sourceAvailable: true,
  route: sectionRoute,
  fictionalLabel: "Fictional spatial-studio demonstration",
} as const;
```

Create the route adapter with no wrapper UI:

```tsx
import { KinformHero } from "../../../../../library/sections/kinform-spatial-hero/source/KinformHero";

export default function KinformSpatialHeroPage() {
  return <KinformHero />;
}
```

Create `design.md` from `docs/templates/element-design.md`, carrying the approved identity/copy, reference exclusions, original visual brief, motion table, desktop/tablet/mobile behavior, R2-only-visual rule, and definition-of-done from the approved spec. Mark it `> Status: review`; link the spec as historical decision context rather than duplicating unrelated Framefield documentation. Update the spec status line to state that written review is complete.

- [ ] **Step 4: Re-run the focused test to confirm the first contract passes**

Run: `node --test tests/kinform-spatial-hero.test.mjs`

Expected: FAIL only on the missing `source/KinformHero.tsx`; metadata and route assertions pass.

### Task 2: Generate and install the original KINFORM interior visual

**Files:**
- Create: `library/sections/kinform-spatial-hero/references/reference-01-arcsphere-hierarchy.png`
- Create: `public/library/sections/kinform-spatial-hero/hero-poster.webp`
- Modify: `tests/kinform-spatial-hero.test.mjs`

**Interfaces:**
- Produces the `hero-poster.webp` pathname declared by `kinformSpatialHeroAsset.preview` and consumed by `HERO_POSTER` in Task 3.
- Keeps the supplied reference in the package for audit only; the browser never renders the supplied reference.

- [ ] **Step 1: Preserve the supplied reference as audit-only input**

Copy the supplied ArcSphere screenshot into `library/sections/kinform-spatial-hero/references/reference-01-arcsphere-hierarchy.png`. Do not use it under `public/`, import it into the Hero, or put it in the catalog.

- [ ] **Step 2: Generate the original hero image with ImageGen**

Generate one 16:9 image, at least 1920px wide, using this prompt:

```text
Original editorial architectural-interior photograph for a fictional spatial studio website, wide 16:9 twilight reception room, honed pale limestone floor and wall planes, dark smoked oak joinery, one oxidized-bronze sculptural table, one low warm-gray mohair lounge chair, restrained linen curtain, a single warm pool of indirect light, quiet negative space, cinematic but natural editorial art direction, deep graphite shadow detail, no sofa, no framed wall art, no walnut-panel showroom composition, no people, no text, no signage, no logo, no watermark, no UI, no letters, no symbols. Compose the chair and table off-centre so the lower left supports headline contrast and the lower right supports a small copy/action block.
```

Reject any result that resembles the supplied room layout, includes readable text, or loses the lower-third type-safe areas. Save the selected result as optimized WebP at `public/library/sections/kinform-spatial-hero/hero-poster.webp`.

- [ ] **Step 3: Add an asset-existence and reference-exclusion regression test**

Append these assertions:

```js
test("KINFORM uses an original local poster and keeps the supplied reference out of runtime", () => {
  const source = read("library/sections/kinform-spatial-hero/source/KinformHero.tsx");

  assert.equal(existsSync(fromRoot("public/library/sections/kinform-spatial-hero/hero-poster.webp")), true);
  assert.equal(existsSync(fromRoot("library/sections/kinform-spatial-hero/references/reference-01-arcsphere-hierarchy.png")), true);
  assert.match(source, /hero-poster\.webp/);
  assert.doesNotMatch(source, /ArcSphere|Where Architecture Meets Experience|Dubai/i);
});
```

- [ ] **Step 4: Run the focused test to confirm the asset contract is ready for the Hero**

Run: `node --test tests/kinform-spatial-hero.test.mjs`

Expected: FAIL only because `KinformHero.tsx` has not been implemented; the local WebP and audit reference are present.

### Task 3: Build the responsive KINFORM Hero and authored motion system

**Files:**
- Create: `library/sections/kinform-spatial-hero/source/KinformHero.tsx`
- Create: `library/sections/kinform-spatial-hero/source/kinform-hero.css`
- Modify: `tests/kinform-spatial-hero.test.mjs`

**Interfaces:**
- Consumes `hero-poster.webp` from Task 2.
- Exports `KinformHero` for the route adapter from Task 1.
- Produces all `.kinform-hero*` visual, interaction, menu, motion, and universal return-control behavior used by QA in Task 5.

- [ ] **Step 1: Extend the focused test with exact source and CSS behavior checks**

Append these tests before implementation:

```js
test("KINFORM stages the hero entrance and honors reduced motion", () => {
  const source = read("library/sections/kinform-spatial-hero/source/KinformHero.tsx");
  const css = read("library/sections/kinform-spatial-hero/source/kinform-hero.css");

  assert.match(source, /useReducedMotion/);
  assert.match(source, /KINFORM_EASE/);
  assert.match(source, /motion\.header/);
  assert.match(source, /motion\.h1/);
  assert.match(source, /clipPath/);
  assert.match(source, /delay:\s*reduceMotion \? 0 :/);
  assert.match(source, /Back to library/);
  assert.match(source, /ArrowLeft/);
  assert.match(css, /@media \(hover: hover\) and \(pointer: fine\)/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
  assert.doesNotMatch(css, /transition:\s*all/);
});

test("KINFORM protects the hero at small widths without a Framefield shell", () => {
  const source = read("library/sections/kinform-spatial-hero/source/KinformHero.tsx");
  const css = read("library/sections/kinform-spatial-hero/source/kinform-hero.css");

  assert.match(source, /aria-expanded/);
  assert.match(source, /Escape/);
  assert.match(css, /100svh/);
  assert.match(css, /@media \(max-width: 720px\)/);
  assert.match(css, /min-height:\s*44px/);
  assert.doesNotMatch(source, /Framefield|Copy Prompt|Pricing|Footer/);
  assert.doesNotMatch(css, /framefield-|--lime|#c8ff4a/i);
});
```

- [ ] **Step 2: Run the focused test and verify the new behavior assertions fail**

Run: `node --test tests/kinform-spatial-hero.test.mjs`

Expected: FAIL with missing source/style files or absent required Hero behavior.

- [ ] **Step 3: Implement the client component with an explicit entrance sequence**

Create `KinformHero.tsx` as a client component. Use this source outline and exact content vocabulary:

```tsx
"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import "./kinform-hero.css";

const HERO_POSTER = "/library/sections/kinform-spatial-hero/hero-poster.webp";
const KINFORM_EASE = [0.16, 1, 0.3, 1] as const;
const KINFORM_NAV_ITEMS = ["Approach", "Residences", "Hospitality"] as const;

export function KinformHero() {
  const prefersReducedMotion = useReducedMotion();
  const reduceMotion = prefersReducedMotion ?? false;
  const [menuOpen, setMenuOpen] = useState(false);
  // Close on Escape; lock body scroll only while the mobile overlay is open.
  // Use a single first-view `motion` sequence: media 0ms, header 70ms,
  // headline 220ms, copy 700ms, CTAs 790/860ms, return control 960ms.
}
```

Render one `<main className="kinform-hero">` containing a `.kinform-hero__canvas` at `id="kinform-top"`, local `<img>` media plus type-protecting scrims, a `motion.header`, desktop navigation from `KINFORM_NAV_ITEMS`, `Inquire`, mobile menu trigger/overlay, the exact descriptor/headline/body copy, `View selected spaces` and `Start a project` buttons, baseline, and fixed `/\#library` return link. Use a local `entrance(delay, y)` helper that gives zero delay/duration and no blur/scale whenever `reduceMotion` is true. Reveal headline lines inside overflow-hidden wrappers; size those wrappers to protect glyph descenders and never clip after the animation settles.

For mobile, the navigation may become an overlay containing the same three labels. Keep the labels presentational until a complete KINFORM site is explicitly scoped: do not point them to invented routes or nonexistent pages. The `Inquire` control uses `mailto:hello@kinform.studio` and the CTA buttons scroll to `#kinform-top`, so no control emits a broken internal link.

- [ ] **Step 4: Implement the scoped stylesheet and interaction states**

Create `kinform-hero.css` with every selector beginning `.kinform-hero`. Implement these concrete layout rules:

```css
.kinform-hero { min-height: 100svh; padding: clamp(8px, 1.2vw, 18px); }
.kinform-hero__canvas { min-height: calc(100svh - clamp(16px, 2.4vw, 36px)); overflow: hidden; border-radius: clamp(18px, 2vw, 30px); }
.kinform-hero__media img { width: 100%; height: 100%; object-fit: cover; }
.kinform-hero__headline-line { display: block; overflow: hidden; padding-bottom: 0.12em; }
.kinform-hero__control { min-height: 44px; }
```

Use pale limestone/ivory around the canvas, nearly black media overlays, soft-white type, and a restrained smoked-umber custom property for hover/focus only. Position desktop headline at the lower left and supporting copy/CTA group at the lower right above the shared baseline. Add localized linear/radial scrims rather than a heavy global vignette. At `max-width: 720px`, stack text and buttons into the lower third, make CTA buttons full width/vertical, reduce header density, and retain safe-area padding. At tablet width, reduce gaps before reflowing the action block. Add `focus-visible`, active-scale, clipped nav underline, and CTA elevation transitions with individual properties only. The reduced-motion block must disable transitions and transforms for the component while leaving readable final content and focus colors intact.

- [ ] **Step 5: Run the focused test to verify package, interaction, and motion contracts pass**

Run: `node --test tests/kinform-spatial-hero.test.mjs`

Expected: all current KINFORM tests pass, confirming a local original poster, dedicated route, scoped Hero, motion hooks, reduced-motion guard, mobile menu contract, and no copied reference or Framefield shell residue.

### Task 4: Create the standalone delivery prompt, catalog media, and catalog registration

**Files:**
- Create: `library/sections/kinform-spatial-hero/master-prompt.md`
- Create: `public/library/sections/kinform-spatial-hero/master-prompt.md`
- Create: `public/library/sections/kinform-spatial-hero/preview.webp`
- Create: `public/library/sections/kinform-spatial-hero/preview.mp4`
- Modify: `library/sections/kinform-spatial-hero/metadata.ts`
- Modify: `library/sections/kinform-spatial-hero/design.md`
- Modify: `src/app/page.tsx`
- Modify: `src/app/globals.css`
- Modify: `tests/kinform-spatial-hero.test.mjs`

**Interfaces:**
- Consumes the stable route/component and `hero-poster.webp` from Tasks 1–3.
- Produces one `published` catalog asset with a working video preview, WebP fallback, and a standalone code-first master prompt.

- [ ] **Step 1: Write the failing catalog and prompt-delivery regression tests**

Append these tests:

```js
test("KINFORM is one published catalog asset with local preview media", () => {
  const metadata = read("library/sections/kinform-spatial-hero/metadata.ts");
  const homepage = read("src/app/page.tsx");

  assert.equal(existsSync(fromRoot("public/library/sections/kinform-spatial-hero/preview.webp")), true);
  assert.equal(existsSync(fromRoot("public/library/sections/kinform-spatial-hero/preview.mp4")), true);
  assert.match(metadata, /status:\s*"published"/);
  assert.match(homepage, /kinformSpatialHeroAsset/);
  assert.match(homepage, /previewUrl:\s*kinformSpatialHeroAsset\.route/);
  assert.match(homepage, /previewImage:\s*kinformSpatialHeroAsset\.preview/);
  assert.match(homepage, /previewVideo:\s*kinformSpatialHeroAsset\.previewVideo/);
});

test("KINFORM master prompt is standalone and mirrors its public copy", () => {
  const packagePrompt = read("library/sections/kinform-spatial-hero/master-prompt.md");
  const publicPrompt = read("public/library/sections/kinform-spatial-hero/master-prompt.md");

  assert.equal(packagePrompt, publicPrompt);
  assert.match(packagePrompt, /KINFORM/);
  assert.match(packagePrompt, /hero-poster\.webp/);
  assert.match(packagePrompt, /```tsx/);
  assert.match(packagePrompt, /```css/);
  assert.doesNotMatch(packagePrompt, /Framefield|Back to library|Copy Prompt|navigator\.clipboard/);
});
```

- [ ] **Step 2: Run the focused test to verify catalog/prompt checks fail before artifacts exist**

Run: `node --test tests/kinform-spatial-hero.test.mjs`

Expected: the new assertions fail because the recording, fallback still, prompt files, published status, and homepage registration do not exist yet.

- [ ] **Step 3: Record the stable Hero and export its catalog fallback**

Open `/library/sections/kinform-spatial-hero` at 1440×900 after visual QA. Record a muted, inline-safe first-view sequence that includes the completed entrance without pointer movement, export it as `preview.mp4`, and export a matching still as `preview.webp`. Store both at the exact public paths above. Keep `hero-poster.webp` as the implementation fallback and use `preview.webp` as the catalog fallback in metadata.

- [ ] **Step 4: Write and mirror the standalone code-first master prompt**

Write `library/sections/kinform-spatial-hero/master-prompt.md` as a fully standalone rebuild artifact: original KINFORM brief and copy, exact `hero-poster.webp` R2 URL after upload, complete canonical TSX and CSS code blocks from Tasks 2–3, responsive breakpoints, motion timings/easing, focus and reduced-motion behavior. Exclude the route adapter, catalog card, Framefield, the fixed return control, clipboard code, payment/source-delivery claims, and all reference-brand material. Copy the identical content to `public/library/sections/kinform-spatial-hero/master-prompt.md`.

- [ ] **Step 5: Register the asset and promote it only after the route/recording match**

In `src/app/page.tsx`, add the metadata import beside the three current package imports and append one catalog record after NORTHSTAR:

```ts
{
  id: 9,
  title: kinformSpatialHeroAsset.title,
  description: "A composed spatial-studio hero with an original twilight interior and cinematic entrance.",
  kind: "Section",
  category: kinformSpatialHeroAsset.category,
  stack: "Next.js",
  access: kinformSpatialHeroAsset.access,
  accent: "umber",
  thumbnail: "kinform-spatial-hero",
  previewImage: kinformSpatialHeroAsset.preview,
  previewVideo: kinformSpatialHeroAsset.previewVideo,
  previewUrl: kinformSpatialHeroAsset.route,
  promptUrl: kinformSpatialHeroAsset.promptUrl,
},
```

Set metadata `status` to `published` only after the recorded media accurately represents the route. In `src/app/globals.css`, add only `.thumbnail.kinform-spatial-hero::after { display: none; }` so the generic placeholder circle cannot cover the video preview. Mark the package `design.md` definition-of-done entries with the actual generated/recorded artifact paths and validation results.

- [ ] **Step 6: Run the focused test to verify catalog and prompt delivery pass**

Run: `node --test tests/kinform-spatial-hero.test.mjs`

Expected: all KINFORM tests pass, including package, route, local asset, Hero motion, catalog video/fallback, master-prompt parity, and standalone exclusion assertions.

### Task 5: Upload visual assets, reconcile current-truth docs, and run release validation

**Files:**
- Modify: `docs/README.md`
- Modify: `docs/framefield-overview.md`
- Modify: `docs/documentation-audit.md`
- Modify: `library/sections/kinform-spatial-hero/design.md`
- Verify: `public/library/sections/kinform-spatial-hero/hero-poster.webp`
- Verify: `public/library/sections/kinform-spatial-hero/preview.webp`
- Verify: `public/library/sections/kinform-spatial-hero/preview.mp4`

**Interfaces:**
- Consumes the completed and published package from Task 4.
- Produces a documented asset entry, R2 visual delivery, and a release-quality validation record.

- [ ] **Step 1: Upload only visual assets to the existing R2 section prefix**

Upload these exact files to bucket `framefield-assets` under `sections/kinform-spatial-hero/`:

```text
hero-poster.webp
preview.webp
preview.mp4
```

Do not upload either `master-prompt.md`, source TSX/CSS, reference image, metadata, or design document. Verify that the public URLs resolve under `https://assets.framefield.my.id/sections/kinform-spatial-hero/`; include those three asset URLs in `design.md` and the master prompt's asset mapping.

- [ ] **Step 2: Update current-truth documentation and feature ledger**

Update `docs/README.md`, `docs/framefield-overview.md`, and `docs/documentation-audit.md` to state that KINFORM is the fourth shipped library asset: one independent Hero package with an original fictional spatial-studio identity, dedicated preview route, permitted Hero-only navigation, universal return control, local catalog fallback/recording, and visual-only R2 delivery. Update counts from three to four only where they describe the shipped catalog. Do not describe the ArcSphere reference as source media or KINFORM as a real studio.

- [ ] **Step 3: Run focused and full automated validation**

Run:

```powershell
node --test tests/kinform-spatial-hero.test.mjs
node --test tests/*.mjs
npm run lint
```

Expected: zero failed tests and no lint errors.

- [ ] **Step 4: Run the production build without a concurrent dev server**

Ensure no `next dev` process is using `.next`, then run:

```powershell
npm run build
```

Expected: successful static generation for `/library/sections/kinform-spatial-hero` with no asset/path errors.

- [ ] **Step 5: Perform route, motion, and visual smoke tests**

Test `/library/sections/kinform-spatial-hero` at 1440×900, 820px, and 390×844. Confirm: one fixed shared return control; no Framefield shell/footer; original image fills its rounded canvas; headline/copy/CTA never collide; mobile menu opens/closes via trigger, backdrop, and Escape; all keyboard focus states are visible; nav underline and CTA hover/active feedback only occur on fine hover pointers; no horizontal scroll; full entrance plays once without double-flash; and reduced motion opens in the final state without blur, transform, stagger, or drift. Check the KINFORM catalog video plus fallback card against the final route.

- [ ] **Step 6: Run integrity checks and record final delivery status**

Run:

```powershell
git diff --check
rg -n "ArcSphere|Where Architecture Meets Experience|Dubai|fabrica|Framefield|Back to library" library/sections/kinform-spatial-hero public/library/sections/kinform-spatial-hero src/app/library/sections/kinform-spatial-hero tests/kinform-spatial-hero.test.mjs
```

Expected: no whitespace errors. The only allowed `Framefield`/`Back to library` match is the actual preview route return-control source/test; neither string appears in either master prompt. No supplied-reference brand or copy appears anywhere in the new package.
