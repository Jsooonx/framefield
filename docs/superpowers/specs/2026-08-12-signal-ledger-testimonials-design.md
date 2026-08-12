# Signal Ledger — Testimonials Section Design

> Status: approved
> Type: section
> Slug: `signal-ledger`
> Display title: Signal Ledger
> Owner: Framefield library package
> Last updated: 2026-08-12

## 1. Intent

Signal Ledger is a standalone, fictional testimonial section template for creative studios, digital teams, and service businesses that need to present social proof with more editorial weight than a basic review carousel.

The page is intentionally taller than one viewport. It turns testimonials into a scrollable proof narrative: first the visitor encounters voices and trust signals, then measurable-looking fictional metrics, then a concrete case-study proof section. Every claim is synthetic template content and must be labeled as such in the package documentation; it must never imply real clients, results, or endorsements.

This is a new library element. It is not a Framefield homepage section, does not inherit Framefield branding, and does not depend on Material Office, 4 Selected Works (1), or any other package. Its only host integration is the universal `Back to library` control.

## 2. References

The four supplied screenshots are reference material for information hierarchy, vertical pacing, testimonial mosaic structure, metric transition, and proof/case-study composition only. They are not source assets and must not be reproduced pixel-for-pixel.

During implementation, preserve the supplied references in the package at:

```text
library/sections/signal-ledger/references/
  reference-testimonial-mosaic.png
  reference-metrics.png
  reference-proof-intro.png
  reference-proof-grid.png
```

Reference influence:

- Keep the three-part narrative: testimonials → metrics → proof/case study.
- Keep the editorial mosaic logic where cards have different roles and heights.
- Keep the tall scroll rhythm and generous quiet space between major chapters.
- Keep the idea of compact profile rows, ratings, and a review CTA.

Deliberately discard:

- The reference brand name, logo, copy, and fictional identities.
- The exact four-column geometry, card dimensions, spacing, and title placement.
- The reference white-on-white palette and orange-only rating treatment.
- The supplied portraits and case-study imagery.
- Any implication that the numbers represent actual business performance.

## 3. Rebrand / rebuild direction

### Direction: Signal Ledger

The visual metaphor is a carefully edited record of signals: voices, patterns, and outcomes collected into a calm but confident proof system. The page should feel like an evidence ledger rather than a testimonial widget.

### Preserve

- A large editorial masthead introducing the testimonial section.
- A mixed mosaic of summary, profile, quote, rating, and action cards.
- A metrics chapter with four large numbers.
- A short approach statement before the proof grid.
- A featured case-study visual supported by outcome cards.

### Change

- Use a mineral-grey canvas with deep ink type and cobalt as the primary interaction accent.
- Use signal orange sparingly for ratings, chart highlights, and small data markers.
- Replace the reference title with `Proof, in their own words.` and the section marker with `TESTIMONIALS / 01`.
- Use fresh fictional names, organizations, quotes, metrics, and visual assets.
- Make the mosaic less symmetrical: one anchored summary rail, two quote columns, and an offset proof card.
- Use a compact chapter index and subtle rules to create a ledger-like reading structure.

### Remove

- Any navbar inside the section preview.
- Any Framefield logo, Framefield CTA, Framefield palette token, or Framefield copy.
- Any `Copy Prompt` CTA inside the dedicated preview.
- Any `Back to library` text inside the standalone master prompt. The host preview may render it outside the standalone implementation.
- Any stock or reused image from the supplied screenshots.

### Add

- New generated raster portraits and case-study imagery.
- Fictional-content label in the design documentation, not as intrusive body copy in the visual composition.
- Count-up metric animation triggered once by viewport intersection.
- Staggered entrance sequencing across chapter, card, text, and metric layers.
- Small interaction details: rating star emphasis, avatar stack separation, card lift, review CTA morph, chart growth, and proof-card focus state.

## 4. Visual system

- Typography: geometric grotesk display with a compact neutral grotesk for supporting copy. Use the existing project font loading strategy only as a technical fallback; the section must remain visually independent from Framefield's brand tokens.
- Color: mineral `#E8E9E5` canvas, deep ink `#101215` text, cobalt `#365CFF` action/accent, muted slate `#737A83` secondary text, signal orange `#F28C38` rating/data accent, and white card surfaces.
- Strategy: restrained base with committed cobalt and controlled orange. Accent colors belong to meaningful states and metrics, not decoration everywhere.
- Spacing: large chapter breathing room; compact card internals; a consistent 12-column desktop grid with intentional asymmetric spans.
- Shape/radius: 18–24px card radius, thin mineral borders, minimal shadow, no glossy glass treatment.
- Border/depth: one-pixel low-contrast rules and small inset separators; cards should feel like placed paper/data plates rather than floating app panels.
- Image treatment: generated raster imagery only; portraits are close-cropped editorial headshots with varied lighting, while the case-study visual uses a dark, art-directed studio scene. No SVG replacement for image slots.

## 5. Content direction

All content is fictional and written as template/demo content.

- Heading: `Proof, in their own words.`
- Supporting copy: `A running record of clearer launches, sharper systems, and teams that knew what to do next.`
- Section marker: `TESTIMONIALS / 01`.
- Summary rating: `4.9` with `58 fictional teams represented`.
- Sample fictional reviewers: Mina Park, Theo Laurent, Ana Rios, Jules Bennett, and Nia Okafor.
- Sample fictional quotes should be concise, specific, and varied in voice. Avoid generic claims such as “best team ever.”
- Metrics: `3.2m+`, `42+`, `96%`, and `18k+`; each receives a clear label and a small `illustrative template metric` note in accessible metadata or documentation.
- Primary section CTA: `Leave a review`.
- Proof chapter heading: `The work should leave evidence behind.`
- Case-study labels: `Case study`, `Signal / 01`, `Illustrative outcome`.
- No real client names, logos, performance claims, external links, or contact details.

## 6. Layout and responsive behavior

### Desktop

1. Framed full-width page canvas with a small top-left marker, no navbar, and the universal return control anchored in the lower-right viewport shell.
2. Masthead chapter: small marker at left, oversized `Proof, in their own words.` title in the upper-middle, and a small year/index marker offset from the title.
3. Testimonial mosaic: a left summary rail, two quote/profile columns, and a taller offset quote card. The first viewport should show the title and the opening edge of the mosaic; the page must invite scrolling.
4. Metrics chapter: four large values across a quiet horizontal band. Values count up only when the band enters the viewport.
5. Approach chapter: small wordmark-like text label on the left, editorial statement on the right, with generous vertical space.
6. Proof grid: large dark generated case-study visual, result statement card, circular score card, and a compact growth chart card. The visual leads; data cards support it.
7. Closing whitespace and a restrained chapter footer, without adding a second CTA system or navbar.

### Mobile

- Collapse to one column while preserving chapter order.
- Move the summary rail above quotes.
- Keep quote cards readable with a maximum line length and comfortable vertical padding.
- Metrics become a two-column grid, then one column below narrow widths if necessary.
- Proof visual becomes full-width before outcome cards.
- Keep the return control reachable without covering content.

### Edge cases

- Long quote: clamp only decorative preview text; full quote content must remain accessible, and card height must grow rather than clip glyphs.
- Missing image: render a neutral image-surface fallback with an explicit `Image pending` development state, never a broken URL icon.
- Reduced motion: show content in its final position, skip count-up interpolation, and use opacity-only or no entrance transition.
- Narrow viewport: prevent horizontal overflow, title clipping, and metric digit collisions.
- Slow image load: preserve card dimensions with aspect-ratio boxes to prevent layout shift.

## 7. Interaction and motion

- Default: all content is visible and semantically present; animation enhances the reading sequence only.
- Entrance: use a parent chapter reveal followed by staggered child reveals. Recommended rhythm: chapter 80ms, cards 55ms, inner content 35ms. Use transform distance under 20px and a single decelerating ease.
- Metrics: count from zero or a short neutral baseline to the displayed value once, on first intersection. Do not restart on every scroll pass.
- Rating: stars reveal with a compact left-to-right stagger; hover slightly brightens the active rating without shifting layout.
- Profile stack: avatar stack separates by a few pixels on hover/focus, then returns smoothly.
- Cards: hover raises the card by 2–4px and deepens the border; quote text does not jitter or roll.
- `Leave a review`: use the established compact CTA language of the package, with a fill inversion and per-letter straight roll only if the final button remains legible and stable.
- Proof grid: chart bars grow once on intersection; score ring fills once; case-study visual receives a restrained image scale/focus effect on hover.
- Focus: all interactive cards and CTA controls must have visible keyboard focus styles.
- Exit: no elaborate page transition is required; leaving the section should be immediate and predictable.

## 8. Implementation contract

- Full preview route: `/library/sections/signal-ledger`.
- New independent package: `library/sections/signal-ledger/`.
- Public media: `public/library/sections/signal-ledger/`.
- R2 prefix: `sections/signal-ledger/` when hosted assets are published.
- Universal return control: `Back to library` as the only Framefield connection in the host preview.
- Navbar: `None`.
- Source entry point: `library/sections/signal-ledger/source/Testimonials.tsx`.
- Suggested source boundaries: preview, metrics motion helper, content registry, scoped CSS, and standalone `master-prompt.md`.
- Required dependencies: existing React/Next runtime, `motion/react` for motion, and `lucide-react` only for icons that materially fit the visual grammar.
- Generated assets: minimum five raster images—four portraits and one case-study visual—plus optional avatar stack crops if composition benefits from them.
- Preview recording: long desktop scroll capture plus mobile capture; catalog preview should use a lightweight WebP or MP4 recording, not the raw source implementation.
- Metadata fields: slug, title, type, category, status, access, tags, preview, optional previewVideo, promptUrl, sourceAvailable.
- Standalone master prompt: must include the section's exact source structure, generated R2 asset URLs, motion behavior, and responsive rules, while excluding host-only `Back to library` and catalog-only `Copy Prompt` controls.

## 9. Definition of done

```text
[x] Design direction approved
[x] Fresh identity and fictional content direction defined
[x] Reference influence and deliberately discarded parts documented
[ ] References stored in package
[ ] Source implementation complete
[ ] Full preview route works
[ ] Universal Back to library control present in host preview
[x] Navbar decision recorded as None
[ ] Generated raster imagery integrated
[ ] Count-up metrics work once on intersection
[ ] Staggered entrance animation works across chapters
[ ] Desktop checked
[ ] Mobile checked
[ ] Reduced-motion checked
[ ] Preview WebP/MP4 recorded
[ ] Metadata registered
[ ] Standalone master prompt written
[ ] Tests/build pass
[ ] Documentation audit updated
```

## 10. Decision log

### 2026-08-12 — Approved Signal Ledger direction

- Decision: Build a fresh testimonials section around a three-layer proof narrative: testimonial mosaic, count-up metrics, and case-study evidence grid.
- Reason: Preserve the useful storytelling structure of the references while making the section visibly independent and more distinctive.
- Impact: The package is a standalone `signal-ledger` library element with no homepage integration and no navbar.
- Content constraint: All names, quotes, metrics, and imagery are fictional template content.
