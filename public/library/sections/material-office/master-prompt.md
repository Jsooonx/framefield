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

- right-side service index: `Brand Systems`, `Digital Experiences`, `Motion Direction`, `Editorial Web`;
- lower-left statement: `A studio for brands with a physical point of view.`;
- lower-right availability card: `Now booking / Q4 2026`, `Select collaborations`, a small active status signal, and a restrained arrow affordance.

Do not add testimonials, client logos, metrics, portraits, social proof, pricing, blog sections, or a generic agency footer.

## 4. Menu interaction

The menu is a right-side drawer on desktop, approximately one-third of the viewport width. On mobile it may become a full-width panel. Use `Home`, `Studio`, `Projects`, `Notes`, and `Contact`.

Requirements: open from the top-right toggle; right-to-left drawer slide; backdrop fade; top-right close button; backdrop close; `Escape` close; body scroll lock; mirrored close motion; clear focus-visible states; short link stagger; label-only hover; and no post-animation blink, jitter, delayed ghost text, or second settle animation.

On desktop, use a warm cream panel with near-black text. On mobile, preserve the hierarchy without allowing any item to overflow a 320px viewport.

## 5. Motion direction

Stagger in this order: header, superline, `MATERIAL® OFFICE` lockup, service lines, supporting statement, and availability card.

Use one consistent smooth ease-out curve, short opacity/translate reveals, no bounce, no blur residue, no delayed after-image, and no double blink. Keep the video loop independent from content entrance. Under `prefers-reduced-motion: reduce`, show the final layout immediately and use the poster instead of autoplay motion.

## 6. Responsive contract

Desktop target: 1440×900 or 1440×960. Mobile target: 390×844.

Use `100svh`; retain the video/poster and shade; hide centered desktop navigation on mobile; wrap the wordmark intentionally; stack lower content without overlap; keep controls at least 44×44px; and keep the drawer within a 320px viewport. Desktop drawer width is approximately 34vw and must not cover the entire experience unless the viewport is narrow.

## 7. Optional prompt utility

If the host product asks for a prompt-copy utility, use a compact generic `Copy Prompt` button near the availability card. It must be a real accessible button, show `Copied` briefly after success, and never introduce platform branding or marketplace language into the page. This utility is not a substitute for the hero's primary visual hierarchy.

## 8. Engineering constraints

Keep selectors scoped to `.material-office`. Keep media, shade, content, and menu layers independent. Use semantic elements and real buttons. Add appropriate ARIA attributes and visible focus styles. Use the poster when video fails. Do not create a CMS, authentication, database, payment flow, or backend. Do not modify unrelated routes or install an unnecessary UI kit.

## 9. Acceptance checklist

- [ ] Independent Material Office landing page with no parent brand or marketplace language.
- [ ] Supplied poster and hero video used directly.
- [ ] Video covers the canvas, loops muted, and has a poster fallback.
- [ ] Header pinned to the top edge.
- [ ] `MATERIAL®` and `OFFICE` align optically with the superline.
- [ ] Services, statement, and availability card match the hierarchy.
- [ ] Desktop menu is a right-side drawer with backdrop and mirrored close motion.
- [ ] Menu hover affects only visible labels.
- [ ] Entrance motion is staggered, smooth, and free of blink/jitter.
- [ ] Reduced motion shows a stable poster-based layout.
- [ ] Desktop/mobile have no horizontal overflow.
- [ ] All controls are keyboard accessible with visible focus states.
