# MASTER PROMPT — Material Office section rebuild

Build a premium, editorial studio-hero section called **Material Office**. This is a standalone library element. The supplied references are layout and interaction inspiration only; do not reproduce their brand, copy, imagery, exact composition, or spacing.

## 1. Goal

Create a full-viewport preview route at:

```text
/library/sections/material-office
```

The section must feel like an independent design practice with a dark, tactile, material-led visual language. It must be fully previewable on its own and must not inherit Framefield's homepage identity.

The only Framefield connection allowed inside the element is the universal `Back to library` control.

## 2. Technical contract

- Framework: Next.js App Router, React, TypeScript.
- Motion: `motion/react`.
- Icons: `lucide-react`.
- Styling: isolated CSS scoped under `.material-office`.
- Route: `/library/sections/material-office`.
- Component source: `library/sections/material-office/source/MaterialOffice.tsx`.
- Stylesheet: `library/sections/material-office/source/material-office.css`.
- Respect `prefers-reduced-motion`.
- Prevent horizontal overflow at every supported viewport.

## 3. Asset contract

Use the R2 custom-domain assets in production:

```text
https://assets.framefield.my.id/sections/material-office/hero-poster.webp
https://assets.framefield.my.id/sections/material-office/hero-video.mp4
```

The hero video is an 8-second, 1280×720 H.264 MP4. It must be `autoPlay`, `loop`, `muted`, and `playsInline`, with the poster visible as the fallback. Keep local assets available for development fallback when needed.

Do not create SVG artwork for the visual. Use raster imagery/video only.

## 4. Layout

Build one rounded, viewport-filling dark canvas with:

- a top-left `MATERIAL®` wordmark;
- centered desktop navigation: `Studio`, `Projects`, `Notes`, `Contact`;
- a top-right menu toggle;
- a left-aligned hero wordmark: `MATERIAL®` with `OFFICE` beneath it and aligned to the same optical left edge as the supporting superline;
- a right-side services list: `Brand Systems`, `Digital Experiences`, `Motion Direction`, `Editorial Web`;
- a lower-left statement: `A studio for brands with a physical point of view.`;
- a lower-right availability card: `Now booking / Q4 2026` and `Select collaborations`;
- a universal `Back to library` control near the lower-right edge;
- a visible `Copy Prompt` CTA near the availability card.

The hero should remain readable over the moving material video through a subtle dark shade and restrained contrast treatment.

## 5. Menu behavior

The menu is a right-side drawer on desktop, approximately one-third of the viewport width. On smaller screens it can become a full-width panel.

Menu requirements:

- items: `Home`, `Studio`, `Projects`, `Notes`, `Contact`;
- close button aligned to the top-right corner of the panel;
- clicking the backdrop closes the menu;
- pressing `Escape` closes the menu;
- body scroll locks while open;
- opening and closing use a clean opacity/backdrop fade plus horizontal drawer slide;
- menu-item hover animation affects only the visible label text, never the full row or sequence number;
- menu items enter with a short stagger and do not blink after settling.

## 6. Motion direction

Use a restrained editorial entrance sequence:

1. header;
2. superline;
3. `MATERIAL® OFFICE` wordmark;
4. services, staggered per line;
5. statement;
6. availability card;
7. `Copy Prompt` and `Back to library` controls.

Use one smooth ease-out curve, short durations, no bounce, no delayed after-image, and no repeated blink. Under reduced motion, remove translate/opacity animation while retaining the final layout.

## 7. Copy Prompt behavior

The CTA must be a real button, not a decorative link. Clicking it should copy this master prompt to the clipboard. Show `Copied` briefly after success, then return to `Copy Prompt`. Keep the control keyboard accessible and provide a visible focus state.

The library catalog card for Material Office must also use the label `Copy Prompt`; it must not say `Get source`.

## 8. Quality bar

- The result should feel authored rather than template-like.
- Keep typography tight, high contrast, and optically aligned.
- Use generous negative space around the oversized wordmark.
- Keep controls discoverable without competing with the hero.
- Do not add Framefield navigation, Framefield logo, Framefield palette, or homepage sections inside this element.
- Verify desktop and mobile layouts, keyboard focus, Escape close, reduced motion, clipboard state, remote MP4 loading, and absence of horizontal overflow.
