# MASTER PROMPT — Material Office editorial studio hero (pixel-perfect rebuild)

Build a premium, dark, tactile, editorial landing page for the fictional design practice **Material Office**. The supplied screenshot references and media assets are the visual source of truth. Rebuild the page with high visual fidelity, including layout, typography, layering, responsive behavior, and motion.

This prompt is standalone and will be pasted into an AI coding agent by a different user. Do not mention or depend on any prompt library, marketplace, parent brand, or platform-specific navigation. Do not add a return-to-library control, external product branding, or unrelated sections.

## 1. Implementation target

- Framework: Next.js App Router, React 19, TypeScript.
- Animation: `motion/react`.
- Icons: `lucide-react`.
- Styling: isolated CSS scoped under `.material-office`.
- Use the existing project setup when one exists; do not introduce a second framework or duplicate toolchain.
- The page must render as a complete viewport-filling experience, not as a card or partial component.
- Keep the implementation production-ready, keyboard accessible, and free of horizontal overflow.

## 2. Visual source of truth and assets

Before writing UI code, inspect every attached screenshot and the supplied hero video. Match the screenshots' optical alignment and use the video as the actual moving background; do not approximate it with gradients, CSS shapes, SVG artwork, or a new AI-generated image.

Expected local asset names:

```text
/public/assets/material-office/hero-poster.webp
/public/assets/material-office/hero-video.mp4
```

Asset facts:

- `hero-video.mp4`: H.264 MP4, 1280×720, 24 fps, approximately 8 seconds, approximately 1.81 MB.
- `hero-poster.webp`: still fallback for loading, reduced motion, and video failure.

If the attached assets are missing, preserve the asset contract and report the missing files instead of inventing replacements.

Video requirements:

```tsx
<video autoPlay loop muted playsInline preload="metadata" poster="/assets/material-office/hero-poster.webp" />
```

The video must cover the canvas, remain behind all content, and receive a restrained dark shade for text legibility. Do not show video controls or audio UI.

## 3. Page composition

Create one rounded, viewport-filling dark canvas with a subtle outer margin. The visual hierarchy must remain close to the supplied hero reference while using the original Material Office identity below.

### Header

- top-left wordmark: `MATERIAL®`;
- centered desktop links: `Studio`, `Projects`, `Notes`, `Contact`;
- top-right menu button with a clean two-line menu icon;
- on small screens, hide the desktop links and keep the wordmark plus menu button.

The header is pinned to the top edge of the canvas. It must never drift into the vertical center of the hero.

### Hero lockup

Place the main lockup toward the left side of the canvas:

```text
INDEPENDENT DESIGN PRACTICE
MATERIAL®
OFFICE
```

`MATERIAL®` is the dominant display wordmark. `OFFICE` is smaller and sits beneath it, optically sharing the same left boundary as the superline. Do not center the lockup and do not let the visible glyphs drift away from the superline's left edge.

### Supporting content

- right-side service index:
  - `Brand Systems`
  - `Digital Experiences`
  - `Motion Direction`
  - `Editorial Web`
- lower-left statement: `A studio for brands with a physical point of view.`
- lower-right availability card:
  - `Now booking / Q4 2026`
  - `Select collaborations`
  - a small active status signal;
  - a restrained arrow affordance.

Do not add testimonials, client logos, metrics, portraits, social proof, pricing, blog sections, or a generic agency footer.

## 4. Menu interaction

The menu is a right-side drawer on desktop, approximately one-third of the viewport width. On mobile it may become a full-width panel.

Menu items:

```text
Home
Studio
Projects
Notes
Contact
```

Behavior requirements:

- menu opens from the top-right toggle;
- drawer enters from the right with a clean ease-out slide;
- backdrop fades in behind it;
- close button is aligned to the panel's top-right corner;
- clicking the backdrop closes the drawer;
- pressing `Escape` closes the drawer;
- body scrolling is locked while the drawer is open;
- close animation mirrors the opening direction;
- focus-visible states are clear and keyboard navigation remains usable;
- menu links enter with a short stagger;
- hover motion applies only to the visible text label, never the full row or its sequence number;
- no post-animation blink, jitter, delayed ghost text, or second settle animation.

On desktop, use a warm cream panel with near-black text. On mobile, preserve the same hierarchy without allowing any item to overflow a 320px viewport.

## 5. Motion direction

Use a restrained editorial entrance sequence:

1. header;
2. superline;
3. `MATERIAL® OFFICE` lockup;
4. service lines with a small internal stagger;
5. supporting statement;
6. availability card.

Motion rules:

- use one consistent smooth ease-out curve;
- use short opacity/translate reveals;
- no bounce or spring overshoot;
- no blur residue after the entrance;
- no delayed after-image or double blink;
- keep the video loop independent from content entrance;
- under `prefers-reduced-motion: reduce`, show the final layout immediately and use the poster instead of autoplay motion.

## 6. Responsive contract

Desktop target: 1440×900 or 1440×960.

Mobile target: 390×844.

Desktop:

- full-bleed hero canvas inside a thin page margin;
- header at the top;
- oversized wordmark remains the dominant visual;
- service index stays in the upper-right area;
- statement and availability card anchor the lower edge;
- menu drawer occupies roughly 34vw and never covers the entire experience unless the viewport is narrow.

Mobile:

- use `100svh` rather than a fixed `100vh` assumption;
- retain the video/poster and dark readability shade;
- hide centered desktop navigation;
- allow the wordmark to wrap intentionally while preserving its optical left edge;
- stack the statement, prompt utility if present, and availability card without overlap;
- keep all interactive targets at least 44×44px;
- ensure the menu drawer and close control fit safely inside 320px.

## 7. Optional prompt utility

If the host product asks for a prompt-copy utility, use a compact generic `Copy Prompt` button near the availability card. It must be a real accessible button, show `Copied` briefly after success, and never introduce platform branding or marketplace language into the page. This utility is not a substitute for the hero's primary visual hierarchy.

## 8. Engineering constraints

- Keep all selectors scoped to `.material-office`.
- Keep the media layer, shade layer, content layer, and menu layer independent so the drawer does not alter hero layout.
- Use semantic elements: `header`, `nav`, `main`, `section`, `aside`, and real `button` controls.
- Add `aria-label`, `aria-expanded`, `aria-controls`, and visible focus styles where appropriate.
- Use the poster as a resilient fallback if the video cannot load.
- Do not create a CMS, authentication, database, payment flow, or backend for this page.
- Do not modify unrelated routes or install an unnecessary UI kit.

## 9. Acceptance checklist

- [ ] The page reads as an independent Material Office landing page.
- [ ] No parent brand, marketplace, prompt-library, or platform-specific navigation appears.
- [ ] The supplied poster and hero video are used directly.
- [ ] Video covers the canvas, loops muted, and has a poster fallback.
- [ ] Header is pinned to the top edge.
- [ ] `MATERIAL®` and `OFFICE` align optically with the superline.
- [ ] Services, statement, and availability card match the specified hierarchy.
- [ ] Desktop menu is a right-side drawer with backdrop and mirrored close motion.
- [ ] Menu hover affects only visible labels.
- [ ] Entrance motion is staggered, smooth, and free of blink/jitter.
- [ ] Reduced motion shows a stable poster-based layout.
- [ ] Desktop and mobile targets have no horizontal overflow.
- [ ] All controls are keyboard accessible with visible focus states.
