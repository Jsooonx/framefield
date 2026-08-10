# Material Office Editorial Index Menu Design

> Status: approved for implementation
> Surface: `/library/sections/material-office`
> Last updated: 2026-08-05

## Intent

Replace the current generic, centered cream menu with an editorial index that feels like the internal contents page of a material-focused design studio. The menu must remain a full-screen overlay, preserve every existing navigation destination and accessibility behavior, and keep the Material Office hero visible only as a controlled visual strip.

## Chosen direction

The overlay uses an asymmetric two-column composition.

- **Index panel:** warm cream field occupying the primary reading area. Links are vertically stacked, left-aligned, oversized, and paired with sequence labels `01` through `05`.
- **Material strip:** a narrow right-hand crop of the existing generated poster. It is not a second card; it is the visual spine of the index.
- **Utility grid:** product information occupies the lower left in a compact two-column grid. It contains `Jakarta / Global`, `hello@materialoffice.studio`, `Privacy`, and `Terms`.
- **Header:** `MATERIAL®` at left, `INDEX 01—05` in the centre, close control at right. It uses the same safe padding as the hero header.

## Interaction

- Hovering or focusing a menu link makes its sequence label lime and shifts the material strip by a small, interruptible horizontal transform.
- Link text does not translate; the reading column remains stable.
- The selected/current item has the same lime sequence treatment without needing a separate underline.
- Open and close retain the existing clip-path transition, Escape key, scroll lock, `aria-expanded`, focus handling, and reduced-motion behavior.

## Responsive behavior

- **Desktop (above 720px):** index panel is approximately 70% of the overlay and material strip is approximately 30%.
- **Mobile (720px and below):** one cream column; the material strip moves to a shallow full-width band above the utility grid. Links retain their numeric labels and fit without horizontal overflow at 320px.
- All controls retain a 44px minimum hit target. The close control is visually aligned with the Material Office header.

## Non-goals

- Do not add a secondary CTA, additional pages, client claims, or a cursor-following effect.
- Do not use a card grid, glass panel, or centered menu list.
- Do not replace the existing hero visual, navigation labels, mail link, or Framefield preview shell.

## Acceptance criteria

1. The overlay has a visible index panel, material strip, and utility grid.
2. Every navigation link has a numeric sequence label.
3. Hover/focus changes the active label and shifts only the material strip.
4. The 390px layout has no horizontal overflow and preserves a legible utility grid.
5. The existing Escape close, `aria-expanded`, and reduced-motion rules remain intact.
6. Focused tests, full test suite, production build, and desktop/mobile visual review pass.
