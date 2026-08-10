# Material Office Right Drawer Menu

## Goal

Refine the Material Office navigation so the desktop menu behaves as a right-side editorial drawer rather than a full-canvas overlay. The hero remains visible and continues to carry the experience; the menu becomes a precise control surface.

## Approved direction

- At desktop widths (`min-width: 900px`), the menu occupies the right edge of the preview canvas at approximately one third of its width: `34vw`, capped at `520px`.
- The drawer is warm cream with ink text, a close control at the top, direct navigation links in the centre, and the existing location/contact/legal utility at the bottom.
- The current poster strip is removed from the desktop menu. The exposed hero serves as the visual counterpart, avoiding duplicate media.
- A restrained dark shade covers the remaining hero only while the drawer is open, maintaining contrast and making the drawer the foreground without hiding the work.
- The backdrop is an interactive close target; `Escape`, the header toggle, focus visibility, and body scroll locking remain intact.
- Drawer entry and exit use the existing Motion overlay with a single horizontal translation. Menu-link stagger is preserved; CSS must not animate properties owned by Motion.
- At mobile widths (`max-width: 899px`), preserve the existing full-screen Editorial Index composition so link size and touch targets remain comfortable.

## Non-goals

- Do not change routes, menu items, utility copy, hero media, or the video pipeline.
- Do not introduce new cards, CTAs, visual assets, or backend behaviour.
- Do not use a translucent/glass drawer or a second image strip.

## Acceptance criteria

- Desktop drawer is visually confined to the right side of the canvas and leaves the hero visible to its left.
- Drawer width is responsive and never exceeds `520px`.
- Clicking the exposed shaded hero closes the drawer.
- Keyboard Escape still closes the drawer and menu links remain accessible.
- Mobile keeps the full-screen editorial menu without horizontal overflow.
- Menu link opacity is controlled only by Motion; it does not double-blink after the stagger.
