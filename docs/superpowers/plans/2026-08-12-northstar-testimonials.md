# NORTHSTAR Testimonials Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship NORTHSTAR Testimonials as one independent Framefield section with a bento proof index, a metrics story, and an Atlas House case-study route.

**Architecture:** Keep all NORTHSTAR content in a single typed package registry, with two thin Next.js App Router adapters. Render the overview and inline metrics story with focused client components that share counter/motion helpers, generated local raster assets, and one scoped stylesheet; keep the fixed `Back to library` control at the route level and register only the final stable asset as one homepage catalog card.

**Tech Stack:** Next.js 15 App Router, React 19, TypeScript, `motion/react`, `lucide-react`, CSS, Node test runner, ImageGen.

## Global Constraints

- Slug and R2 prefix are `northstar-testimonials` and `sections/northstar-testimonials/`.
- The only Framefield-specific UI is the fixed glass-pill `Back to library` control.
- Do not render a navbar or footer on either preview route.
- NORTHSTAR and Atlas House are explicitly fictional; do not use reference brand names, people, logos, copy, metrics, layouts, or images.
- Use four generated local raster assets: Atlas House editorial portrait, cobalt data field, monochrome performance orbit, and abstract pipeline texture.
- The bento index targets roughly `115vh`; the inline metrics story extends the overview page toward roughly `175vh`–`185vh` on a 1440×900 desktop viewport.
- Counters animate once when in view and render final values immediately under reduced motion.
- Use exact metadata access values `Free` or `Premium`.
- Do not add a homepage catalog card until package source, preview media, metadata, and route QA are complete.
- Follow the repository rule: commit or push only with separate explicit user authorization.

---

### Task 1: Establish the independent package contract and regression harness

**Files:**
- Create: `tests/northstar-testimonials.test.mjs`
- Create: `library/sections/northstar-testimonials/design.md`
- Create: `library/sections/northstar-testimonials/metadata.ts`
- Create: `src/app/library/sections/northstar-testimonials/page.tsx`
- Create: `src/app/library/sections/northstar-testimonials/atlas-house/page.tsx`
- Create: `library/sections/northstar-testimonials/references/reference-bento-desktop.png`
- Create: `library/sections/northstar-testimonials/references/reference-results-metrics.png`
- Create: `library/sections/northstar-testimonials/references/reference-results-case-study.png`

**Interfaces:**
- Produces `northstarTestimonialsAsset`, `NORTHSTAR_METRICS`, and `ATLAS_HOUSE_CASE_STUDY` for all components and homepage wiring.
- Produces route adapters that import `NorthstarTestimonials`, `NorthstarMetrics`, and `AtlasHouseCaseStudy` from the package barrel created in Task 3.

- [ ] **Step 1: Copy the provided reference images into the package**

Use these source files and preserve their meaning without using them at runtime:

```powershell
Copy-Item 'C:\Users\GIELANG\AppData\Local\Temp\codex-clipboard-263718b3-fa80-4222-88b7-464e497b5097.png' 'library/sections/northstar-testimonials/references/reference-bento-desktop.png'
Copy-Item 'C:\Users\GIELANG\AppData\Local\Temp\codex-clipboard-f57824c0-5403-477c-8053-49d9969be5de.png' 'library/sections/northstar-testimonials/references/reference-results-metrics.png'
Copy-Item 'C:\Users\GIELANG\AppData\Local\Temp\codex-clipboard-892ce427-1df5-43d2-810e-a537e4cdc106.png' 'library/sections/northstar-testimonials/references/reference-results-case-study.png'
```

- [ ] **Step 2: Write the failing package/route regression tests**

Create `tests/northstar-testimonials.test.mjs` with file URLs for package root, metadata, source modules, two routes, four generated assets, homepage, and scoped stylesheet. Assert the contract before source exists:

```js
test("NORTHSTAR Testimonials is one independent section with inline metrics and two routes", () => {
  assert.equal(existsSync(packageRoot), true);
  assert.equal(existsSync(indexRoute), true);
  assert.equal(existsSync(metricsRoute), false);
  assert.equal(existsSync(caseStudyRoute), true);
  assert.match(readFileSync(metadata, "utf8"), /slug:\s*"northstar-testimonials"/);
  assert.match(readFileSync(metadata, "utf8"), /title:\s*"NORTHSTAR Testimonials"/);
  assert.match(readFileSync(metadata, "utf8"), /status:\s*"review"/);
  assert.match(readFileSync(metadata, "utf8"), /access:\s*"Free"/);
});

test("NORTHSTAR keeps its section shell independent from Framefield", () => {
  const source = readSource();
  assert.match(source, /Back to library/);
  assert.doesNotMatch(source, /<header|<footer|Navigation|Framefield/);
  assert.equal((source.match(/href="\/#library"/g) ?? []).length, 1);
});
```

Add tests for the two route labels, four local `.webp` asset paths, `useReducedMotion`, one-time in-view counter state, bento/inline-metrics/case-study class hooks, and responsive/reduced-motion CSS rules.

- [ ] **Step 3: Run the focused test to confirm the missing package fails**

Run: `node --test tests/northstar-testimonials.test.mjs`

Expected: failing file existence assertions for `library/sections/northstar-testimonials/` and its route adapters.

- [ ] **Step 4: Add the typed metadata registry and thin route adapters**

Create the following public interface in `metadata.ts`:

```ts
export type NorthstarMetric = {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  detail: string;
};

export type NorthstarCaseStudy = {
  slug: "atlas-house";
  title: "Atlas House";
  fictionalLabel: "Fictional case study — independent concept";
  route: string;
  portrait: string;
  dataField: string;
  performanceOrbit: string;
  pipelineTexture: string;
  quote: string;
};

export const northstarTestimonialsAsset = {
  slug: "northstar-testimonials",
  title: "NORTHSTAR Testimonials",
  type: "section" as const,
  category: "Testimonials",
  status: "review" as const,
  access: "Free" as const,
  tags: ["testimonials", "performance", "bento"],
  preview: "/library/sections/northstar-testimonials/preview.webp",
  previewVideo: "/library/sections/northstar-testimonials/preview.mp4",
  sourceAvailable: true,
  route: "/library/sections/northstar-testimonials",
};
```

Define the four metrics exactly as `3.8×`, `42%`, `98`, and `+61%`. Keep every pathname local beneath `/library/sections/northstar-testimonials/`. Each page adapter must contain only the corresponding package component import and render.

- [ ] **Step 5: Document the approved package design**

Create `library/sections/northstar-testimonials/design.md` by carrying forward the current approved spec: independent NORTHSTAR identity, two exact routes with metrics inline below the bento, four generated assets, no navbar/footer, shared back control, page height targets, counter/reduced-motion contract, and no real-client claims.

- [ ] **Step 6: Run the focused test to confirm package and route contract passes**

Run: `node --test tests/northstar-testimonials.test.mjs`

Expected: package, metadata, and route existence assertions pass; source-behavior assertions can still fail until Task 3.

### Task 2: Generate and install the original visual asset set

**Files:**
- Create: `public/library/sections/northstar-testimonials/atlas-house/editorial-portrait.webp`
- Create: `public/library/sections/northstar-testimonials/atlas-house/cobalt-data-field.webp`
- Create: `public/library/sections/northstar-testimonials/atlas-house/performance-orbit.webp`
- Create: `public/library/sections/northstar-testimonials/atlas-house/pipeline-texture.webp`

**Interfaces:**
- Consumes the four exact metadata paths from Task 1.
- Produces local WebP assets used in Task 3 with no remote image dependency.

- [ ] **Step 1: Generate the Atlas House editorial portrait**

Use ImageGen to create a vertical `4:5` WebP-ready editorial image: an original, unidentified fashion-forward art director in a dark structured jacket, neutral expression, side-lit on a near-black studio background, restrained warm skin tones, large negative space on the left for text, high-end contemporary home-goods campaign mood, no typography, no logo, no watermark, no resemblance to any supplied portrait.

- [ ] **Step 2: Generate the three supporting performance textures**

Use ImageGen for three separate original raster assets:

```text
cobalt-data-field.webp: electric-cobalt translucent data layers and fine grid traces on warm off-white, sparse and editorial, no text or numbers.
performance-orbit.webp: monochrome graphite concentric performance orbit with faint technical tick marks on warm off-white, no text or numbers.
pipeline-texture.webp: abstract black-to-cobalt ascending modular pipeline forms on a warm off-white field, no text, bars, labels, or logos.
```

- [ ] **Step 3: Export and store the assets at the exact local paths**

Convert or retain the generated images as WebP, place them under `public/library/sections/northstar-testimonials/atlas-house/`, and verify all four with:

```powershell
Get-ChildItem 'public/library/sections/northstar-testimonials/atlas-house' -File | Select-Object Name,Length
```

- [ ] **Step 4: Run the focused test to confirm all generated assets exist**

Run: `node --test tests/northstar-testimonials.test.mjs`

Expected: all four `existsSync()` asset assertions pass.

### Task 3: Build the three route experiences and shared motion system

**Files:**
- Create: `library/sections/northstar-testimonials/source/NorthstarTestimonials.tsx`
- Create: `library/sections/northstar-testimonials/source/NorthstarMetrics.tsx`
- Create: `library/sections/northstar-testimonials/source/AtlasHouseCaseStudy.tsx`
- Create: `library/sections/northstar-testimonials/source/northstar-motion.ts`
- Create: `library/sections/northstar-testimonials/source/northstar-testimonials.css`
- Create: `library/sections/northstar-testimonials/source/index.ts`
- Modify: `tests/northstar-testimonials.test.mjs`

**Interfaces:**
- Consumes `northstarTestimonialsAsset`, `NORTHSTAR_METRICS`, and `ATLAS_HOUSE_CASE_STUDY` from Task 1 plus the four local images from Task 2.
- Produces `NorthstarTestimonials`, `NorthstarMetrics`, `AtlasHouseCaseStudy`, `NorthstarBack`, and `MetricCounter` exports from `source/index.ts`.

- [ ] **Step 1: Extend tests with exact visual and motion behavior assertions**

Add source assertions before implementation:

```js
test("NORTHSTAR uses staged bento entrances and once-only accessible counters", () => {
  const source = readSource();
  assert.match(source, /useReducedMotion/);
  assert.match(source, /whileInView/);
  assert.match(source, /once:\s*true/);
  assert.match(source, /MetricCounter/);
  assert.match(source, /northstar-bento-card/);
  assert.match(source, /northstar-metric-field/);
  assert.match(source, /northstar-case-study/);
});

test("NORTHSTAR CSS keeps bento and metrics responsive without a section navbar", () => {
  const css = readFileSync(styles, "utf8");
  assert.match(css, /@media\s*\(max-width:\s*720px\)/);
  assert.match(css, /prefers-reduced-motion/);
  assert.doesNotMatch(css, /northstar-header|northstar-footer/);
});
```

- [ ] **Step 2: Run the focused test and verify new behavior assertions fail**

Run: `node --test tests/northstar-testimonials.test.mjs`

Expected: failures naming the absent source files or required hooks/classes.

- [ ] **Step 3: Implement shared motion and the return control**

In `northstar-motion.ts`, export `NORTHSTAR_EASE`, `enterStagger`, and a client `MetricCounter` that:

```tsx
const shouldReduceMotion = useReducedMotion();
const hasStarted = useRef(false);
const [displayValue, setDisplayValue] = useState(shouldReduceMotion ? value : 0);

// Start only once when the visible metric group enters view.
// Format prefix, rounded integer display, and suffix without exposing intermediate values to screen readers.
```

`NorthstarBack` is a single `<a href="/#library">` exported once and rendered by every route. Match the fixed lower-right glass-pill, circular arrow, blur, focus-visible, hover, and active-scale contract already used by Selected Works; do not import its styles or components.

- [ ] **Step 4: Implement the bento index route**

In `NorthstarTestimonials.tsx`, render `Proof, in motion.`, the NORTHSTAR descriptor, a four-column bento grid, a `See the signals behind the work` link to `#metrics`, the inline `NorthstarMetrics` section, and a local Atlas House card link. Use `motion.section` plus 55–85ms child stagger. The index must contain score/rating proof and fictional reviewer text, not copied reference content.

- [ ] **Step 5: Implement the metrics story and case-study routes**

`NorthstarMetrics.tsx` renders the four exact metrics in the opening field, a short performance-partner statement, and result cards linking to Atlas House below the overview bento. `AtlasHouseCaseStudy.tsx` renders the fictional label, generated portrait, before/after conversion statement, performance score, quote, pipeline growth module, and a contextual link to `/library/sections/northstar-testimonials#metrics`. Neither preview route includes a nav/footer.

- [ ] **Step 6: Implement the scoped responsive stylesheet**

Create `northstar-testimonials.css` with all classes prefixed `northstar-`. Implement warm off-white/ink/cobalt tokens, `min-height: 115vh` index desktop behavior, `min-height: 175vh` metrics desktop behavior, four-column index and metrics row at desktop, compact tablet wrapping, mobile grid collapse at `720px`, no horizontal overflow, pointer/focus/active feedback, and a `prefers-reduced-motion` rule that disables non-essential transforms/transitions.

- [ ] **Step 7: Run the focused test and verify it passes**

Run: `node --test tests/northstar-testimonials.test.mjs`

Expected: all NORTHSTAR package, route, asset, shell, motion, and responsive contract assertions pass.

### Task 4: Register the finished asset, create catalog media, and reconcile current docs

**Files:**
- Modify: `src/app/page.tsx`
- Modify: `src/app/globals.css`
- Create: `public/library/sections/northstar-testimonials/preview.webp`
- Create: `public/library/sections/northstar-testimonials/preview.mp4`
- Modify: `library/sections/northstar-testimonials/metadata.ts`
- Modify: `library/sections/northstar-testimonials/design.md`
- Modify: `docs/framefield-overview.md`
- Modify: `docs/documentation-audit.md`
- Modify: `docs/README.md`
- Modify: `tests/northstar-testimonials.test.mjs`

**Interfaces:**
- Consumes the stable overview route and metadata from Tasks 1–3.
- Produces one homepage catalog item and published package metadata after visual/technical QA.

- [ ] **Step 1: Extend the failing regression test for catalog wiring**

Add assertions that the homepage imports `northstarTestimonialsAsset`, uses its `preview`, `previewVideo`, and `route`, and does not map fictional testimonials into separate catalog entries:

```js
assert.match(homepage, /northstarTestimonialsAsset/);
assert.match(homepage, /previewUrl:\s*northstarTestimonialsAsset\.route/);
assert.match(homepage, /previewVideo:\s*northstarTestimonialsAsset\.previewVideo/);
assert.doesNotMatch(homepage, /NORTHSTAR_TESTIMONIALS\.map/);
```

- [ ] **Step 2: Record catalog media from the overview route**

Open `/library/sections/northstar-testimonials` at 1440×900 after visual QA. Record a muted first-pass overview interaction as `preview.mp4`, export a representative still as `preview.webp`, and store both under `public/library/sections/northstar-testimonials/`.

- [ ] **Step 3: Wire the single catalog card and thumbnail styling**

Import `northstarTestimonialsAsset` in `src/app/page.tsx`, add one `Asset` record after the two existing live assets, and set `thumbnail: "northstar-testimonials"`, `previewImage`, `previewVideo`, and `previewUrl` from metadata. In `src/app/globals.css`, remove the generic thumbnail circle only for `.thumbnail.northstar-testimonials::after` when the card uses video.

- [ ] **Step 4: Promote metadata and package documentation after QA**

Set `northstarTestimonialsAsset.status` to `published`. Update the package definition-of-done checklist with actual generated asset paths, preview artifacts, route checks, and the verification commands that passed.

- [ ] **Step 5: Update current-truth documentation and feature ledger**

Add NORTHSTAR Testimonials to `docs/README.md`, the shipped status table in `docs/framefield-overview.md`, and the feature ledger plus change log in `docs/documentation-audit.md`. State that it is one section catalog asset with an overview route containing inline metrics plus one case-study route and fictional evidence data; do not describe it as a real-client testimonial system.

- [ ] **Step 6: Run focused test to verify catalog integration**

Run: `node --test tests/northstar-testimonials.test.mjs`

Expected: route, asset, catalog wiring, no-navbar/footer, and motion contracts pass.

### Task 5: Run release validation and visual QA

**Files:**
- Verify: `tests/northstar-testimonials.test.mjs`
- Verify: `tests/*.mjs`
- Verify: `src/app/library/sections/northstar-testimonials/page.tsx`
- Verify: `src/app/library/sections/northstar-testimonials/atlas-house/page.tsx`

- [ ] **Step 1: Run focused and full automated tests**

Run:

```powershell
node --test tests/northstar-testimonials.test.mjs
node --test tests/*.mjs
```

Expected: zero failed tests.

- [ ] **Step 2: Run a production build**

Ensure no `next dev` process is using `.next`, then run:

```powershell
npm run build
```

Expected: successful static generation for both NORTHSTAR preview routes.

- [ ] **Step 3: Smoke-test the routes**

Check both preview paths at desktop and mobile widths:

```text
/library/sections/northstar-testimonials
/library/sections/northstar-testimonials/atlas-house
```

Confirm each has exactly one fixed `Back to library`, no navbar/footer, no horizontal overflow, readable long copy, locally loaded images, once-only counters, visible keyboard focus, and reduced-motion final values.

- [ ] **Step 4: Run integrity and documentation checks**

Run:

```powershell
git diff --check
rg -n 'fabrica|James Carter|Anna Martinez|Emily Davis|Experiences\.' library/sections/northstar-testimonials public/library/sections/northstar-testimonials src/app/library/sections/northstar-testimonials tests/northstar-testimonials.test.mjs
```

Expected: no whitespace errors and no copied reference-brand/content matches.
