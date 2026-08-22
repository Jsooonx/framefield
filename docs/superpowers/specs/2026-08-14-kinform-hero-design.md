# KINFORM Spatial Hero — Design Contract

## Status

Approved direction; written-spec review complete and ready for implementation planning.

## Intent

Create a new independent Framefield Hero asset for `KINFORM`, a fictional spatial studio working across residential and hospitality interiors. The preview should feel like entering one composed room: quiet, tactile, architectural, and immediately legible as a premium studio experience.

The supplied ArcSphere reference informs only the broad hierarchy: a slim Hero navigation, a full-bleed interior visual, a large lower-left statement, lower-right supporting copy, and two actions. It must not contribute its name, copy, brand, image, room composition, controls, or visual assets.

## Package and route

- Asset type: `section` / Hero.
- Package slug: `kinform-spatial-hero`.
- Full preview route: `/library/sections/kinform-spatial-hero`.
- Package: `library/sections/kinform-spatial-hero/`.
- Public assets: `public/library/sections/kinform-spatial-hero/`.
- Because this is a Hero, its own slim navigation is permitted. The universal fixed `Back to library` control remains the only Framefield navigation and sits outside the KINFORM brand system.

## Brand and copy direction

- Studio name: `KINFORM`.
- Descriptor: `Spatial studio — residences and hospitality`.
- Headline: `Spaces with a longer memory.`
- Supporting copy: `KINFORM shapes residential and hospitality interiors into calm, durable experiences built around how people arrive, pause, and return.`
- Navigation: `Approach`, `Residences`, `Hospitality`.
- Primary action: `View selected spaces`.
- Secondary action: `Start a project`.
- Header action: `Inquire`.

KINFORM is fictional demonstration content. The preview must not claim real projects, real clients, awards, locations, or performance outcomes.

## Visual direction

- Mode: Experience.
- Surface: pale limestone/ivory outer frame with an almost-black interior image field.
- Hero visual: one original generated editorial interior, not a stock or reference-derived reconstruction. Use a twilight reception-room composition with honed limestone, dark smoked oak, oxidized bronze, a low mohair lounge chair, a sculptural table, and a single warm pool of light. Avoid the reference's walnut-panel/sofa/painting arrangement.
- Typography: large neutral sans display, soft white over the image; compact utilitarian sans for navigation and body copy.
- Composition: full-bleed image inside a gently rounded canvas; large statement anchored lower left; supporting copy and paired CTAs anchored lower right; a thin baseline gives the lower content a shared horizon.
- Accent: a restrained warm-metal or smoked-umber highlight only for hover/focus states. No acid lime or Framefield palette inside the Hero.
- Asset treatment: dark scrim and localized gradients protect type contrast without making the room look artificially vignetted. Image gets a low-opacity white outline and concentric radii with the outer frame.

## Motion direction

The hero has one authored first-view sequence. It should feel like the visitor enters an already-lit room; the image is the stable anchor and interface layers arrive over it.

| Order | Surface | Motion | Timing |
| --- | --- | --- | --- |
| 1 | Hero image and scrim | Opacity settle with `scale(1.02 → 1)` | 900ms, immediate |
| 2 | Header brand/navigation/action | `opacity 0 → 1`, `y -8px → 0`; items staggered | 360ms, 45ms stagger |
| 3 | Headline | Per-line clip reveal from below; stable final line wrapping | 700ms, starts after 220ms |
| 4 | Supporting copy | `opacity`, `y 16px → 0`, and `blur(5px → 0)` | 480ms, starts after headline |
| 5 | CTA pair | Same reveal, 70ms internal stagger | 420ms |
| 6 | Baseline/detail and Framefield return control | Soft opacity settle | 320ms, final layer |

- Use a strong authored ease-out such as `cubic-bezier(0.16, 1, 0.3, 1)` for entrances.
- Do not animate layout properties or use a perpetual decorative loop. A single very slow image drift is optional only if it remains nearly imperceptible; the first implementation should prefer a static image.
- Desktop hover: navigation reveals a clipped underline; CTAs move up 2px with a soft elevation change; all pressable controls use `scale(0.96)` on active.
- Do not use large cursor parallax, bouncing, page-wide transforms, or `transition: all`.
- Hover transforms only apply on `@media (hover: hover) and (pointer: fine)`.
- Reduced motion renders the final image and all content immediately, removes stagger/blur/transforms, and keeps color/focus feedback intact.

## Responsive behavior

- Desktop: image-led canvas fills the viewport; headline stays lower left and the action block stays lower right without colliding.
- Tablet: header navigation may reduce spacing but remains visible; the action block narrows before changing position.
- Mobile: header reduces to wordmark + compact menu trigger + inquiry action if space allows. Headline and supporting copy stack in the lower third; CTA pair becomes a vertical group with minimum 44px hit areas.
- Use `100svh`, safe-area-aware padding, balanced headline wrapping, and pretty body wrapping. No horizontal overflow at 390×844, 820px, or 1440×900.

## Architecture

- `metadata.ts` is the single catalog source of truth: title, Hero category, `Free` access, preview fallback, optional preview video, source availability, and route.
- `source/KinformHero.tsx` owns the Hero composition, navigation/menu state, entrance sequence, focus behavior, and media fallback.
- `source/kinform-hero.css` owns only scoped KINFORM styles.
- A thin route adapter renders the implementation; it does not add a catalog shell, pricing, or footer.
- The Hero navigation is KINFORM-only. `Back to library` is a universal route control and must match the existing shared preview contract.
- The catalog card is added only after the full preview, original visual asset, fallback image, and optional recording are stable.

## Asset plan

1. Generate one original 16:9 interior hero image at sufficient desktop resolution.
2. Save the final local asset under the package public path.
3. Use that image as the initial Hero and catalog fallback source.
4. Record the stable route into `preview.mp4` only after visual QA.
5. Upload only visual assets to R2; retain the standalone master prompt in package/public paths, not R2.

## Validation and definition of done

- Design reference is stored under `references/`.
- Hero has an original identity, image, copy, and composition.
- Desktop/mobile layout is readable and free of horizontal overflow.
- Navigation, buttons, menu, focus states, and return control are keyboard usable.
- Entrance choreography, local hover feedback, press states, and reduced-motion behavior match this contract.
- Catalog fallback and optional video preview match the final full-preview route.
- Focused tests, full suite, production build, route smoke test, and visual desktop/mobile checks pass.
- `design.md`, current-truth docs, and documentation audit are updated before published status.
