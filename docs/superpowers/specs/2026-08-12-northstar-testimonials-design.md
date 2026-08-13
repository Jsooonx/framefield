# NORTHSTAR Testimonials — Design Spec

> Status: approved design direction; implementation in review.

## Goal

Create a standalone Testimonials section for Framefield that turns fictional client proof into one overview route with a bento testimonial index followed by a results-and-metrics story, plus one case-study detail route. It should feel like a sharp digital performance partner, not a derivative of the supplied reference.

## Identity and scope

- **Identity:** NORTHSTAR, a fictional digital performance partner that improves conversion, website speed, qualified demand, and growth systems.
- **Element type:** `section`.
- **Package slug:** `northstar-testimonials`.
- **User-facing title:** `NORTHSTAR Testimonials`.
- **Brand separation:** NORTHSTAR is entirely fictional and independent from Framefield. Framefield appears only in the universal `Back to library` control.
- **Out of scope:** navbar, footer, real-client claims, real logos, real testimonials, a generic contact form, pricing, or a homepage redesign.

## Reference interpretation

The five supplied screenshots are layout and interaction references only.

Keep:

- the idea of a compact, unequal bento field for social proof;
- a separate data-led results surface with large metrics;
- a desktop canvas slightly taller than one viewport for the index and just under two viewports for the results route;
- calm staggered entrances, counting metrics, and restrained CTA/card feedback.

Deliberately change:

- all reference branding, wording, people, portraits, logo treatment, metrics, exact card arrangement, spacing, radius, and color system;
- the reference's navigation into no navbar at all;
- the generic agency framing into NORTHSTAR's performance-partner narrative.

## Routes

```text
/library/sections/northstar-testimonials
/library/sections/northstar-testimonials/atlas-house
```

### 1. Bento index

- Target desktop height: approximately `115vh` before the section ends.
- Heading: `Proof, in motion.`
- Small supporting label identifies NORTHSTAR as a digital performance partner.
- Four-column bento composition contains a client-confidence score, fictional reviewer cards, a trusted-team signal, a concise satisfaction statement, and a `Start a project` CTA.
- CTA does not open a form. It scrolls to the metrics section below the bento, keeping this element self-contained.

### 2. Metrics story

- Target desktop height: approximately `175vh` to `185vh`.
- Top metric field: `3.8× qualified demand`, `42% conversion lift`, `98 performance score`, and `+61% qualified pipeline`.
- Mid-page statement explains NORTHSTAR's performance approach in short, direct language.
- Results bento contains an Atlas House case-study card, a speed/conversion before-and-after module, a circular performance score, and a pipeline bar chart.
- The case-study card links to the detail route.

### 3. Atlas House case study

- Atlas House is a fictional premium home-goods label that needed faster discovery and clearer product storytelling.
- The route contains a dominant generated editorial portrait/image, outcome cards, a fictional quote, a concise before/after narrative, and a link back to the overview metrics section.
- It remains one screen-oriented section preview rather than a full website page.

## Visual system

- **Surface:** warm off-white, ink-black typography, muted mineral-gray utility text, and electric cobalt used only for performance signals and active accents.
- **Type:** oversized, compact neo-grotesk display headlines; direct sans-serif body copy; tabular numerals for metrics.
- **Geometry:** noticeably different card proportions from the reference, with moderate rather than exaggerated rounding, thin hairline borders, and generous negative space.
- **Generated assets:** create four original raster assets: one high-contrast Atlas House editorial portrait, one cobalt data-field texture for the conversion card, one monochrome performance-orbit texture for the score card, and one abstract pipeline texture for the growth card. No stock imagery, copied people, or reference-derived logos.
- **Catalog media:** implementation route remains source of truth; after visual QA, record `preview.mp4` for the catalog card and export `preview.webp` as its fallback image.

## Interaction and motion

- Initial load: heading and section label enter first, then each bento card enters with a 55–85ms stagger using opacity, a short vertical translation, and a restrained blur handoff.
- Metric counters begin once per route when their group enters the viewport. They animate from zero to the final formatted value in 650–900ms and never replay on ordinary scrolling.
- CTA: foreground/background inversion, arrow translation, and a 0.98 active scale. Card hover uses only local border, shadow, and 2–4px lift feedback.
- Case-study card receives a small media zoom and overlay shift, not a page-wide cursor effect.
- `prefers-reduced-motion`: render final numbers immediately; remove counting, transforms, and non-essential transitions while retaining clear focus styles.

## Responsive behavior

- Desktop (1440×900): index shows the complete heading and first bento field within a compact 115vh composition; the inline metrics section begins below it with four large values in one row.
- Tablet: metric field wraps into two columns; bento cards retain hierarchy rather than shrinking copy below readable sizes.
- Mobile (390×844): all grids become one column or a deliberate two-column metric pair; no horizontal overflow; CTA is full-width only where it improves touch usability; `Back to library` remains fixed without blocking primary content.
- Long testimonials: clamp only index excerpts; full fictional quote remains readable in the case-study route.

## Implementation contract

- Package: `library/sections/northstar-testimonials/`.
- Metadata: one package registry for the asset, routes, fictional testimonial data, metrics, and Atlas House case-study data.
- Source modules: overview bento, metrics story, case-study detail, shared counter/motion helpers, and one scoped stylesheet.
- Public assets: `public/library/sections/northstar-testimonials/`.
- Universal navigation: `Back to library` is the only Framefield-specific control and uses the existing fixed glass-pill visual contract.
- Navbar/footer: none on either preview route.
- Homepage integration: exactly one catalog card after the preview is visually stable; no other homepage layout changes.

## Validation

- Focused tests verify both preview routes, a single metadata registry, no navbar/footer markup, one universal return control per route, generated asset paths, and reduced-motion-aware counter behavior.
- Run `node --test tests/*.mjs` and `npm run build`.
- Visually inspect desktop 1440×900 and mobile 390×844.
- Check keyboard focus, hover/active feedback, no-overflow behavior, and that counters do not restart after entering view.

## Definition of done

```text
[ ] New package and two preview routes render independently, with metrics inline on the overview
[ ] NORTHSTAR and Atlas House remain explicitly fictional
[ ] No navbar or footer is rendered
[ ] Back to library uses the shared visual contract on every route
[ ] Bento, metric, and case-study surfaces use original content and composition
[ ] Required generated visual assets are original and locally stored
[ ] Entrance, counter, CTA, and card motion respect reduced motion
[ ] Desktop and mobile layouts are verified
[ ] Catalog fallback preview is recorded and metadata is registered
[ ] Focused tests, full suite, and production build pass
[ ] Documentation audit and current product docs are updated
```
