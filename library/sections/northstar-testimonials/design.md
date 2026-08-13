# NORTHSTAR Testimonials

> Status: published. This package uses fictional proof and original generated imagery.

## Scope

NORTHSTAR is a fictional digital performance partner. The package contains a bento testimonial index with an inline metric-led proof section, and one fictional Atlas House case study. The five supplied screenshots in `references/` inform hierarchy and pacing only; their brand, wording, people, metrics, and layout are not reproduced.

## Direction

- Warm off-white field, ink typography, mineral utility text, and electric cobalt for performance signals.
- Unequal cards create the testimonial index instead of a repeated review grid.
- The metrics section follows the bento on the same overview route and extends the page into a proof field using the same original visual language: an Atlas House portrait, cobalt conversion texture, performance orbit, and pipeline texture.
- The two preview routes contain only the universal fixed `Back to library` control—no navbar or footer. Its 34px glass pill, 22px circular arrow affordance, and responsive right/bottom offsets follow the shared Material Office / Selected Works preview contract.

## Content and evidence

All names, reviews, metrics, outcomes, and Atlas House statements are fictional illustrative content. The implementation identifies this in context. The four local original generated assets are used across the bento and metrics surfaces and live in `public/library/sections/northstar-testimonials/`:

- `atlas-house-portrait.webp`
- `cobalt-data-field.webp`
- `performance-orbit.webp`
- `pipeline-texture.webp`
- `preview.mp4` — catalog preview recording, also published to R2.
- `master-prompt.md` — standalone code-first rebuild prompt, kept in the repository and not uploaded to R2.

## Motion and responsive behavior

Headings and cards use a short blur-and-rise stagger. Counters begin once their group enters view and are never replayed on normal scroll. Reduced motion shows final values and removes non-essential transitions. The Experience Signal headline uses pretty wrapping, a relaxed 1.04 line-height, and a small inter-line group gap so its two outcome statements stay visually distinct on narrow cards. Desktop uses the deliberate bento and four-column metric field; tablet wraps metrics; mobile becomes a single-column proof narrative with no horizontal overflow.

## Done when

- Both preview routes render original NORTHSTAR content; metrics are inline below the bento.
- Keyboard focus, hover, active, and reduced-motion behavior are verified.
- Catalog media is recorded from the stable full preview and the registry is updated.
- The five visual assets are available under `https://assets.framefield.my.id/sections/northstar-testimonials/`.
- The standalone master prompt is available at `/library/sections/northstar-testimonials/master-prompt.md`.
