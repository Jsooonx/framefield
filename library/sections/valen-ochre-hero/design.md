# Valen & Ochre Studio Hero

> Status: published  
> Type: section / Hero  
> Slug: `valen-ochre-hero`  
> Category: Hero  
> Access: Free  

## 1. Intent

Valen & Ochre is a luxury architectural and interior design studio demonstration based in Copenhagen and Zurich. This Hero embodies a tactile, Nordic modernism experience: vertical fluted walnut timber, warm downlight spotlights, bespoke seating, architectural typography, dual-scene crossfade switching, interactive consultation/portfolio drawers, and a seamless **scroll-driven zoom-out transition** that docks the center hero canvas into an art-directed spatial gallery with emerging side cards.

## 2. Visual Direction & Hierarchy

- **Color Atmosphere**: Warm sand stone exterior background (`#ECE7E1`), rich walnut dark tones (`#1A1715`), ambient amber cone lighting, crisp off-white and warm cream typography.
- **Top Navigation**: Valen & Ochre serif wordmark, uppercase tracked links (`DESIGN PHILOSOPHY`, `SELECTED SPACES`, `ATELIER SERVICES`), and pill `CONTACT ATELIER` action (slides up and fades out on scroll).
- **Hero Canvas**: Rounded viewport container (`clamp(22px, 2.6vw, 44px)`) with dark overlay, downward cone lighting hotspots, and dual-scene switcher (`01 Wide`, `02 Center`).
- **Typography & Headline**: Staggered clip entrance for "Where Architecture Cultivates Stillness", accompanied by Nordic design narrative and dual CTA pills (`EXPLORE SPACES`, `BOOK CONSULTATION`).
- **Accent**: Hairline baseline divider with an animated 4-point architectural diamond star.
- **Spatial Gallery Emergence**: Flanking side cards (`Holmen Timber Residence` on the left, `Zürichberg Stone Pavilion` on the right) slide in on scroll with staggered asymmetric elevations, metadata tags, and glowing ochre hover states.

## 3. Motion & Interactivity

- Powered by `motion/react` with sticky scroll orchestration (`valen-scroll-track` of `240vh`).
- Progress 0.00 → 0.30: Navbar slides up, hero typography & CTAs slide down and fade out.
- Progress 0.15 → 0.80: Center canvas scales down smoothly to 0.60, deepening its ambient drop shadow.
- Progress 0.30 → 0.90: Flanking side gallery cards slide in from left and right.
- Interactive drawers for Inquiries, Consultation booking, and Featured Spaces portfolio with body scroll locking and Escape key dismiss.
- Universal Framefield `Back to library` glass pill anchored at the bottom-right corner.

## 4. Hosted R2 Assets & Local Fallbacks

- **01 Wide Scene (Hero Main)**: `https://assets.framefield.my.id/sections/valen-ochre-hero/hero-bg.jpg` (Local: `/library/sections/valen-ochre-hero/hero-bg.jpg`)
- **02 Center Scene (Hero Alt)**: `https://assets.framefield.my.id/sections/valen-ochre-hero/hero-bg-2.jpg` (Local: `/library/sections/valen-ochre-hero/hero-bg-2.jpg`)
- **Side Gallery Space 01 (Left Card)**: `https://assets.framefield.my.id/sections/valen-ochre-hero/space-01.webp` (Local: `/library/sections/valen-ochre-hero/space-01.webp`)
- **Side Gallery Space 02 (Right Card)**: `https://assets.framefield.my.id/sections/valen-ochre-hero/space-02.webp` (Local: `/library/sections/valen-ochre-hero/space-02.webp`)
- **Preview Video**: `https://assets.framefield.my.id/sections/valen-ochre-hero/preview.mp4` (Local: `/library/sections/valen-ochre-hero/preview.mp4`)

## 5. Delivery Contract

- **Route**: `/library/sections/valen-ochre-hero`
- **Metadata**: `library/sections/valen-ochre-hero/metadata.ts`
- **Master Prompt**: `library/sections/valen-ochre-hero/master-prompt.md` & `public/library/sections/valen-ochre-hero/master-prompt.md`
- **Return Control**: Universal `Back to library` linking to `/#library`.
