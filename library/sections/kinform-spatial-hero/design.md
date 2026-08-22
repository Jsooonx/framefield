# KINFORM Spatial Hero

> Status: review
> Type: section / Hero
> Slug: `kinform-spatial-hero`

## 1. Intent

KINFORM is a fictional spatial studio for residential and hospitality interiors. This Hero should feel like entering one composed, enduring room: quiet, tactile, architectural, and immediately legible.

## 2. Reference boundary

The supplied ArcSphere image is retained only in `references/` as hierarchy input: slim Hero navigation, full-bleed interior image, statement low-left, supporting copy/actions low-right. KINFORM does not reuse the reference brand, copy, interior arrangement, controls, assets, or styling details.

## 3. Identity and copy

- Wordmark: `KINFORM`
- Descriptor: `Spatial studio — residences and hospitality`
- Headline: `Spaces with a longer memory.`
- Supporting copy: `KINFORM shapes residential and hospitality interiors into calm, durable experiences built around how people arrive, pause, and return.`
- Navigation: `Approach`, `Residences`, `Hospitality`
- Actions: `View selected spaces`, `Start a project`, `Inquire`

All identity and content are fictional. No real client, project, award, location, or performance claim may appear.

## 4. Visual direction

- Pale limestone/ivory exterior frame; almost-black image field; soft-white type.
- One original 16:9 twilight interior with honed limestone, smoked oak, oxidized bronze, low mohair seating, sculptural table, and a single warm indirect light source.
- Dark/localized scrims protect type without a heavy artificial vignette.
- Large neutral display type is anchored low-left; utilitarian body/navigation copy and CTA group are anchored low-right against a thin common baseline.
- Smoked umber is reserved for hover/focus only. No Framefield lime or homepage palette is allowed.

## 5. Motion and interaction

First view arrives as one authored sequence with `cubic-bezier(0.16, 1, 0.3, 1)`: media settles at 0–900ms; header at 70ms; headline clip-reveal begins 220ms; supporting copy follows; CTA pair arrives at 790/860ms; baseline and return control settle last. Hover uses a clipped nav underline and a 2px CTA lift/elevation; press uses a 0.96 scale. There is no parallax, bounce, layout animation, or perpetual decorative loop.

Hover transforms run only on fine hover pointers. Reduced motion renders the final state immediately and removes blur, stagger, transforms, and drift while preserving focus/color feedback.

## 6. Responsive behavior

The canvas uses `100svh` and safe-area-aware padding. Desktop retains low-left/low-right anchoring; tablet narrows gaps before reflow; mobile reduces the header to wordmark, menu trigger, and inquiry action where space permits, then stacks headline/copy/CTA in the lower third with vertical 44px-minimum controls. The preview must not overflow at 1440×900, 820px, or 390×844.

## 7. Delivery contract

- Route: `/library/sections/kinform-spatial-hero`
- The Hero-owned slim navigation is allowed; no footer, catalog toolbar, pricing, or secondary page scope is added.
- The fixed `Back to library` control is the only Framefield navigation and remains outside the standalone master prompt.
- Browser assets are local under `public/library/sections/kinform-spatial-hero/`.
- Only visual assets (`hero-poster.webp`, `preview.webp`, `preview.mp4`) may be uploaded to R2 at `sections/kinform-spatial-hero/`; the master prompt remains local/public and is not uploaded.

## 8. Definition of done

- [ ] Reference, original local image, fallback image, and recording are present at the recorded paths.
- [ ] Source is scoped, responsive, keyboard usable, and reduced-motion aware.
- [ ] Route and catalog card render the same final Hero.
- [ ] Master prompt is standalone, code-first, and duplicated identically in its public path.
- [ ] R2 contains only the three visual artifacts.
- [ ] Focused tests, full suite, lint, build, desktop/mobile visual QA, and documentation audit pass.
