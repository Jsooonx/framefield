# Brand Foundation

> **Status:** Working brand guide  
> **Brand name:** Framefield  
> **Product:** A curated library of art-directed website builds, reusable sections, visual assets, prompts, and production-ready source code.

This document is the source of truth for product, design, and marketing decisions. It should make the product feel like one coherent brand as it grows.

---

## 1. Brand Idea

### Core promise

**Help modern builders find a better starting point, then ship faster.**

The product is not a generic template dump and not an AI agency. It is a carefully selected library for people who care about both speed and taste.

### Positioning

> Curated website prompts and production-ready code for people who build.

### Primary tagline

> **Rare starting points for the web.**

### Supporting tagline options

- Build with better taste.
- Find your next starting point.
- Templates, prompts, and code worth building on.
- Build websites worth shipping.

Use the primary tagline in high-visibility brand moments. Use the supporting lines as contextual marketing copy, not as competing taglines.

---

## 2. Audience

### Primary audience

- Indie hackers and founders launching products quickly.
- Frontend developers who want a strong visual and technical starting point.
- Designers who use AI tools to explore and build web experiences.
- Freelancers and agencies building client sites under time constraints.

### What they want

- A shortcut without sacrificing quality.
- A design direction they can trust.
- Assets they can actually use: prompts, source code, sections, and live previews.
- Clear licensing and straightforward setup.

### What they should feel

Confident, inspired, and ready to startâ€”not overwhelmed by an endless, uncurated catalog.

---

## 3. Brand Personality and Voice

### Personality

**Precise. Curated. Modern. Calm. Capable.**

The brand has taste, but never acts exclusive for the sake of it. It is direct and practical; it respects the visitor's time.

### Voice principles

- Write short, useful sentences.
- Lead with what the visitor can do or get.
- Use builder language: explore, preview, copy, customize, launch, ship.
- Be confident without hype.
- Explain technical details plainly.

### Avoid

- Generic AI claims such as â€œrevolutionize your workflow.â€
- Robot imagery, excessive â€œfutureâ€ language, or gimmicky jargon.
- Loud sales copy and artificial urgency.
- Treating prompts as magic; focus on practical outcomes.

### Copy examples

**Good**

- â€œA polished starting point for your next launch.â€
- â€œCopy the prompt, customize the build, and ship.â€
- â€œProduction-ready source code with a clear setup path.â€

**Avoid**

- â€œUnlock unlimited AI-powered creativity.â€
- â€œThe ultimate template marketplace for everyone.â€

---

## 4. Visual Direction

### Creative direction

**Dark, editorial, and tool-like.**

The interface should feel like a premium digital library: quiet enough for build previews to stand out, structured enough to make discovery effortless, and refined enough to signal that every asset is curated.

Do not make the product look like a crypto dashboard, a gaming UI, or a generic neon-AI product.

### Color system

| Role             | Color                    | Use                                             |
| ---------------- | ------------------------ | ----------------------------------------------- |
| Canvas           | `#0B0C0E`                | Main page background                            |
| Elevated surface | `#15171A`                | Cards, menus, modal surfaces                    |
| Soft surface     | `#1C1F23`                | Hover states, secondary panels                  |
| Primary text     | `#F4F5F6`                | Headings and high-priority text                 |
| Secondary text   | `#9AA0A6`                | Metadata and supporting copy                    |
| Border           | `rgba(255,255,255,0.10)` | Dividers and card outlines                      |
| Accent           | `#C8FF4A`                | Primary actions, active state, small highlights |
| Accent dark      | `#A6D93B`                | Hover/pressed states                            |

Use acid lime deliberately. It is an accent, not a background replacement. Template artwork and screenshots must remain the visual focus.

### Typography

- Use a clean, contemporary sans-serif with strong screen readability.
- Headlines: bold, tightly tracked, high contrast, with clear hierarchy.
- Body and metadata: neutral, compact, and calm.
- Use tabular figures for counts, prices, and metrics where relevant.
- Avoid overly rounded, playful display fonts.

Suggested direction: **Geist**, **Inter**, or a similar modern grotesk. Choose one family before implementation and use it consistently.

### Shape, borders, and depth

- Large hero container: generous rounding (`24â€“32px`).
- Cards: moderate rounding (`14â€“18px`).
- Buttons and filters: pill-shaped only when they represent an action or a compact control.
- Borders should be subtle; use depth through layered dark surfaces rather than heavy shadows.
- Shadows should be soft and low-opacity. Avoid floating, exaggerated cards.

### Logo direction

**Selected concept: Option 2 â€” Stacked Frames.**

- The mark uses three offset, open rectangular frames.
- Two supporting frames are off-white; the primary top frame is acid lime (`#C8FF4A`).
- It should suggest layers, a design system, and a browser canvas without drawing literal browser chrome.
- Pair the mark with the `Framefield` wordmark in a clean contemporary sans-serif.
- Keep it flat, geometric, and recognizable at favicon size.

Avoid robot imagery, gradients, 3D effects, literal code brackets, and generic AI symbols.

---

## 5. Homepage Art Direction

### Hero layout reference

The supplied reference image is the approved **layout inspiration**:

- A large rounded hero panel within a page margin.
- A compact navigation bar visually integrated near the top of the hero.
- A centered, oversized two-line headline.
- A small category badge above the headline.
- Supporting copy and two concise CTAs below it.
- A sculptural, abstract visual treatment that frames the content from one side.
- A subtle scroll cue at the bottom edge.

### Required reinterpretation

This is a structural reference only. Do not recreate its white background, red/orange visual, icon cluster, copy, or AI-agency positioning.

For this product, reinterpret it as:

- A near-black hero with layered charcoal surfaces.
- A restrained acid-lime glow or a cool electric-blue secondary glow, never both as dominant colors.
- Abstract grid, folded-paper, browser-window, or code-inspired formsâ€”not a literal AI orb or robot.
- Messaging around templates, prompts, source code, and launching.
- A hero that is visually premium but short enough that the library begins close to the fold.

### Recommended hero copy

**Eyebrow**  
`CURATED FOR MODERN BUILDERS`

**Headline**  
`Build websites worth shipping.`

**Supporting copy**  
`Explore polished templates, practical AI prompts, and production-ready source code for your next launch.`

**Primary CTA**  
`Explore library`

**Secondary CTA**  
`Browse prompts`

### Homepage flow

1. Hero: clear promise and first action.
2. Discovery toolbar: tabs, category filters, stack filters, and sort.
3. Template grid: visual, dense enough to browse, never cramped.
4. Featured collections: for example, â€œSaaS launches,â€ â€œPortfolios,â€ or â€œAI-ready prompts.â€
5. A concise value statement explaining prompts + code together.
6. Newsletter or membership CTA, only after demonstrating useful content.

---

## 6. UI Content Rules

### Template cards must show

- High-quality preview image or video.
- Title.
- One clear category.
- Relevant stack or format labels.
- Access state: Free, Premium, Prompt, Source Code, or both.
- One primary next action: Preview, Copy Prompt, or Get Source.

### Labels

Prefer short, literal labels:

- `Free`
- `Premium`
- `Prompt included`
- `Source code`
- `Copy prompt`
- `Live preview`

Do not overload a card with tags. Use two or three visible tags; place the rest in the detail view.

### Product structure

The core library should be understandable through these content types:

- **Templates** â€” complete website starting points.
- **Sections** â€” reusable hero, pricing, footer, and content blocks.
- **Prompts** â€” prompts to create, recreate, or customize a design.
- **Source Code** â€” downloadable or repository-based implementations.

Every premium asset should make its included deliverables immediately clear.

---

## 7. Motion Principles

- Motion should guide attention, not demonstrate technical ability.
- Use quick, soft transitions for filters, card hover states, menus, and modal entry.
- Prefer opacity, small vertical movement, and subtle scale changes.
- Use longer, ambient movement only inside the hero background.
- Respect reduced-motion preferences.

Avoid dramatic page transitions, continuous motion in every card, and distracting parallax while browsing the library.

---

## 8. Brand Guardrails

Before approving a page, feature, or piece of copy, check:

1. Does it help a builder discover, decide, or launch?
2. Does it feel curated rather than crowded?
3. Are build previews still the stars of the screen?
4. Is acid lime used as a focused accent, not decoration everywhere?
5. Does the copy sound useful and confident without AI hype?
6. Does it look distinctly ours rather than like the supplied layout reference?

If the answer is no, simplify or revise before shipping.
