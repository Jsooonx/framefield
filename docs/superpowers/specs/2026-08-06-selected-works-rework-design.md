# Selected Works Rework — Design

## Decision

Rebuild the `Selected Works` preview from scratch as a light editorial portfolio index based on the supplied references. Keep the route contract, the four fictional projects, and the Framefield library return path. Replace the current darkish, metadata-heavy preview composition.

## Visual world

- Mode: Experience.
- Scene: an independent creative studio presenting a concise yearly project index on an off-white studio wall.
- Surface: near-white field, black typography, thin neutral dividers, one restrained Framefield lime signal only for keyboard focus and a small availability status.
- Composition: a quiet top bar; oversized `Works.` masthead with year; then a 2×2 visual grid. Each project uses a slim title rail directly above its media, rather than a caption card below it.
- Type: Manrope retains consistency with Framefield; display size is controlled, with dense but readable tracking and no decorative eyebrow above the masthead.

## Information hierarchy

1. Utility header: Framefield / template title / back to library.
2. Masthead: `Works.` and `©2026`.
3. Project index: title rail, media, minimal centered project name overlay.
4. Child detail: project title, visual, concise metadata, story, supporting visual, adjacent project navigation.

## Interaction

- Card media crossfades a dark overlay and shifts its centered project lockup by a few pixels on hover or keyboard focus.
- The title rail is static; hover belongs to the media and label only.
- Detail next/previous links use directional arrow nudges only.
- A single entrance sequence reveals header, masthead, then cards with short stagger.
- Reduced motion removes transform and opacity choreography while leaving all content visible.

## Constraints

- Keep `/library/sections/selected-works` as the one catalog preview route.
- Keep project pages nested under `/library/sections/selected-works/<slug>`.
- Do not add root `/works/*` routes or new catalog entries.
- Use the current local SVG studies until replacement imagery is supplied.
