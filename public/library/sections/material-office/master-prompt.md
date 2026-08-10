# MASTER PROMPT — Material Office section rebuild

Build a premium, editorial studio-hero section called **Material Office**. This is a standalone library element. The supplied references are layout and interaction inspiration only; do not reproduce their brand, copy, imagery, exact composition, or spacing.

## 1. Goal

Create a full-viewport preview route at `/library/sections/material-office` with an independent design-practice identity. The only Framefield connection allowed inside the element is the universal `Back to library` control.

## 2. Technical contract

- Next.js App Router, React, TypeScript.
- Motion: `motion/react`; icons: `lucide-react`.
- Isolated CSS scoped under `.material-office`.
- Respect `prefers-reduced-motion` and prevent horizontal overflow.
- Component: `library/sections/material-office/source/MaterialOffice.tsx`.
- Styles: `library/sections/material-office/source/material-office.css`.

## 3. Assets

Use these R2 assets in production:

```text
https://assets.framefield.my.id/sections/material-office/hero-poster.webp
https://assets.framefield.my.id/sections/material-office/hero-video.mp4
```

The hero is an 8-second, 1280×720 H.264 MP4. Use `autoPlay`, `loop`, `muted`, `playsInline`, and the poster as fallback. Use raster imagery/video only; do not create SVG artwork for the visual.

## 4. Layout

Use one rounded, viewport-filling dark canvas containing:

- top-left `MATERIAL®`;
- centered desktop nav: `Studio`, `Projects`, `Notes`, `Contact`;
- top-right menu toggle;
- left-aligned `MATERIAL®` with `OFFICE` beneath it;
- right-side services: `Brand Systems`, `Digital Experiences`, `Motion Direction`, `Editorial Web`;
- lower-left statement: `A studio for brands with a physical point of view.`;
- lower-right availability card: `Now booking / Q4 2026` and `Select collaborations`;
- universal `Back to library` near the lower-right edge;
- visible `Copy Prompt` CTA near the availability card.

Use a subtle dark shade over the moving material video so the typography stays readable.

## 5. Menu

Implement a right-side drawer on desktop, about one-third viewport width, with a full-width mobile fallback. Include `Home`, `Studio`, `Projects`, `Notes`, and `Contact`; a top-right close button; backdrop close; Escape close; body scroll lock; opacity/backdrop fade; and horizontal drawer slide. Menu hover must affect only the label text, never the full row or sequence number. Use a short staggered entrance without post-animation blinking.

## 6. Motion

Stagger in this order: header, superline, wordmark, service lines, statement, availability card, `Copy Prompt`, then `Back to library`. Use one smooth ease-out curve, short durations, no bounce, no delayed after-image, and no repeated blink. Under reduced motion, show the final layout immediately.

## 7. Copy Prompt

`Copy Prompt` must be a real, keyboard-accessible button. On click, copy this master prompt to the clipboard, show `Copied` briefly, then restore the label. Include a visible focus state. The Material Office catalog card must also say `Copy Prompt`, never `Get source`.

## 8. Quality bar

Keep the work authored, editorial, spacious, tight in typography, and optically aligned. Do not add Framefield navigation, logo, palette, homepage sections, or other Framefield identity inside the element. Verify desktop/mobile layouts, keyboard focus, Escape close, reduced motion, clipboard state, remote MP4 loading, and no horizontal overflow.
