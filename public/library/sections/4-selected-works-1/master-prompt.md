# MASTER PROMPT — 4 Selected Works (1) exact standalone rebuild

Build a standalone portfolio project-index section called 4 Selected Works (1) by following the canonical implementation below. This is a code-first prompt, not a prose design brief. Preserve the component structure, DOM order, class names, typography values, spacing values, breakpoints, easing arrays, motion timing, responsive behavior, accessibility attributes, and asset URLs exactly.

The result must work in any React/Next.js App Router project. It must not depend on the original Framefield repository, its homepage, its catalog shell, or any Framefield-only UI.

## Required stack

- Next.js App Router with React and TypeScript.
- motion/react.
- lucide-react.
- CSS imported by the section component and scoped through the selected-works- and work-detail- selectors.
- Use the host project's existing equivalent setup when available; do not add unrelated dependencies.

## Hosted raster assets

Use these exact hosted assets directly:

- https://assets.framefield.my.id/sections/4-selected-works-1/cinder-bureau/visual-01.webp
- https://assets.framefield.my.id/sections/4-selected-works-1/cinder-bureau/visual-02.webp
- https://assets.framefield.my.id/sections/4-selected-works-1/auralis/visual-01.webp
- https://assets.framefield.my.id/sections/4-selected-works-1/auralis/visual-02.webp
- https://assets.framefield.my.id/sections/4-selected-works-1/stillhouse/visual-01.webp
- https://assets.framefield.my.id/sections/4-selected-works-1/stillhouse/visual-02.webp
- https://assets.framefield.my.id/sections/4-selected-works-1/vela-objects/visual-01.webp
- https://assets.framefield.my.id/sections/4-selected-works-1/vela-objects/visual-02.webp

Do not replace these with SVG, CSS gradients, stock imagery, generated placeholders, inline data, or remote image-search results. The catalog recording at https://assets.framefield.my.id/sections/4-selected-works-1/preview.mp4 is catalog-only and is not a substitute for the raster studies inside the standalone section.

## Content and route contract

This is one section template containing four fictional case studies, not four separate templates:

- cinder-bureau — Cinder Bureau
- auralis — Auralis
- stillhouse — Stillhouse
- vela-objects — Vela Objects

The host may mount the section at /library/sections/4-selected-works-1 and the child pages at:

- /library/sections/4-selected-works-1/cinder-bureau
- /library/sections/4-selected-works-1/auralis
- /library/sections/4-selected-works-1/stillhouse
- /library/sections/4-selected-works-1/vela-objects

Keep the project labels fictional and do not present them as client work.

## Standalone integration exclusions

The canonical standalone result must contain only the section experience. Do not add a host catalog copy action, a host-library return control, a Framefield logo or brand shell, a catalog toolbar, a navbar, pricing, authentication, CMS, database, payment flow, or unrelated sections. Internal project navigation such as All projects, Previous, and Next is part of the section and must remain.

## Required files

Create these files, or place the same code in equivalent host paths without changing their internals:

- src/components/SelectedWorks.tsx
- src/components/SelectedWorksPreview.tsx
- src/components/SelectedWorkDetail.tsx
- src/components/selected-works-motion.ts
- src/components/selected-works.css
- src/components/metadata.ts

Render SelectedWorks for the index route and SelectedWorkDetail for each child route. Keep the metadata registry and the two visual studies per project.

## Canonical source

Use the following source as the implementation contract. Copy it exactly, changing only import paths needed by the host project and the route adapter. The hosted URL values in metadata.ts are intentional.
### metadata.ts

~~~~ts
export type SelectedWork = {
  slug: string;
  number: string;
  title: string;
  category: string;
  year: string;
  summary: string;
  brief: string;
  direction: string;
  stack: readonly string[];
  accent: string;
  fictionalLabel: string;
  route: string;
  visuals: readonly string[];
  visualCaptions: readonly string[];
  builtFrom: readonly string[];
};

const sectionRoute = "/library/sections/4-selected-works-1";

export const selectedWorksAsset = {
  slug: "4-selected-works-1",
  title: "4 Selected Works (1)",
  type: "section" as const,
  category: "Works",
  status: "review" as const,
  access: "Free" as const,
  tags: ["portfolio", "editorial", "case-study"],
  preview: "https://assets.framefield.my.id/sections/4-selected-works-1/cinder-bureau/visual-01.webp",
  previewVideo: "https://assets.framefield.my.id/sections/4-selected-works-1/preview.mp4",
  sourceAvailable: true,
  route: sectionRoute,
};

export const SELECTED_WORKS: readonly SelectedWork[] = [
  {
    slug: "cinder-bureau",
    number: "01",
    title: "Cinder Bureau",
    category: "Brand and spatial design practice",
    year: "2026",
    summary: "A tactile identity for a practice working between matter, place, and image.",
    brief: "Cinder Bureau needed a digital home with the same physical conviction as its work, without falling into the familiar portfolio of logo tiles and agency claims.",
    direction: "Graphite paper, mineral surfaces, and a quiet editorial index make the site feel collected rather than merely presented.",
    stack: ["Next.js", "Motion", "Image direction"],
    accent: "cinder",
    fictionalLabel: "Fictional case study â€” independent concept",
    route: `${sectionRoute}/cinder-bureau`,
    visuals: [
      "https://assets.framefield.my.id/sections/4-selected-works-1/cinder-bureau/visual-01.webp",
      "https://assets.framefield.my.id/sections/4-selected-works-1/cinder-bureau/visual-02.webp",
    ],
    visualCaptions: ["Graphite, stone, and printed matter", "An identity held in material"],
    builtFrom: ["Editorial hero", "Studio index", "Material-led type system"],
  },
  {
    slug: "auralis",
    number: "02",
    title: "Auralis",
    category: "Human-centred research laboratory",
    year: "2026",
    summary: "A luminous research identity that keeps human perception at the centre.",
    brief: "Auralis needed to make future-facing research feel open, sensitive, and understandable to the people invited to shape it.",
    direction: "Prismatic light, restrained interfaces, and close human crops trade a cold technology aesthetic for a quieter sense of discovery.",
    stack: ["Next.js", "Motion", "Editorial imagery"],
    accent: "auralis",
    fictionalLabel: "Fictional case study â€” independent concept",
    route: `${sectionRoute}/auralis`,
    visuals: [
      "https://assets.framefield.my.id/sections/4-selected-works-1/auralis/visual-01.webp",
      "https://assets.framefield.my.id/sections/4-selected-works-1/auralis/visual-02.webp",
    ],
    visualCaptions: ["Perception as a starting point", "Research translated through touch"],
    builtFrom: ["Luminous hero", "Research index", "Human signal studies"],
  },
  {
    slug: "stillhouse",
    number: "03",
    title: "Stillhouse",
    category: "Architecture practice",
    year: "2026",
    summary: "A composed digital space for architecture built from light, scale, and pause.",
    brief: "Stillhouse wanted its work to set the tempo online, so visitors could encounter proportion and atmosphere before an explanation.",
    direction: "Stone, plaster, and generous quiet space bring the sensation of walking through an unfinished room to the screen.",
    stack: ["React", "Editorial grid", "Image direction"],
    accent: "stillhouse",
    fictionalLabel: "Fictional case study â€” independent concept",
    route: `${sectionRoute}/stillhouse`,
    visuals: [
      "https://assets.framefield.my.id/sections/4-selected-works-1/stillhouse/visual-01.webp",
      "https://assets.framefield.my.id/sections/4-selected-works-1/stillhouse/visual-02.webp",
    ],
    visualCaptions: ["A room held by light", "A stair reduced to its rhythm"],
    builtFrom: ["Gallery hero", "Project index", "Spatial image studies"],
  },
  {
    slug: "vela-objects",
    number: "04",
    title: "Vela Objects",
    category: "Contemporary object label",
    year: "2026",
    summary: "A catalogue direction for objects that earn their place through ritual and material.",
    brief: "Vela Objects needed a storefront with the composure of a printed catalogue, where atmosphere arrives before a product grid.",
    direction: "Oxidized lacquer, brushed metal, and quiet crops give each object enough visual weight to feel considered.",
    stack: ["Next.js", "Commerce system", "Visual direction"],
    accent: "vela",
    fictionalLabel: "Fictional case study â€” independent concept",
    route: `${sectionRoute}/vela-objects`,
    visuals: [
      "https://assets.framefield.my.id/sections/4-selected-works-1/vela-objects/visual-01.webp",
      "https://assets.framefield.my.id/sections/4-selected-works-1/vela-objects/visual-02.webp",
    ],
    visualCaptions: ["A vessel with a quiet pull", "Objects arranged as an editorial field"],
    builtFrom: ["Product hero", "Editorial commerce grid", "Object detail system"],
  },
];

export function getSelectedWork(slug: string) {
  return SELECTED_WORKS.find((work) => work.slug === slug);
}
~~~~
### SelectedWorks.tsx

~~~~tsx
export { SelectedWorks } from "./SelectedWorksPreview";
export { SelectedWorkDetail } from "./SelectedWorkDetail";
~~~~
### SelectedWorksPreview.tsx

~~~~tsx
"use client";

import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { SELECTED_WORKS } from "../metadata";
import { EASE_OUT } from "./selected-works-motion";
import "./selected-works.css";

export function SelectedWorks() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <main className="selected-works-preview">
      <motion.section
        className="selected-works-masthead"
        initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.58, ease: EASE_OUT }}
      >
        <span className="selected-works-count">(04)</span>
        <div className="selected-works-masthead-lockup">
          <h1>Projects.</h1>
          <span>Â©2026</span>
        </div>
      </motion.section>

      <section className="selected-works-grid" aria-label="Selected projects">
        {SELECTED_WORKS.map((work, index) => (
          <motion.article
            className={`selected-work-card selected-work-card--${work.accent}`}
            key={work.slug}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.46, delay: shouldReduceMotion ? 0 : 0.12 + index * 0.07, ease: EASE_OUT }}
          >
            <div className="selected-work-title-rail">
              <span>{work.title}.</span>
              <span>{work.year}</span>
              <i aria-hidden="true">â€¢â€¢â€¢</i>
            </div>
            <a className="selected-work-media" href={work.route} aria-label={`Open ${work.title} case study`}>
              <img src={work.visuals[0]} alt="" />
              <span className="selected-work-lockup">
                <strong>{work.title}</strong>
                <ArrowUpRight aria-hidden="true" size={17} />
              </span>
            </a>
          </motion.article>
        ))}
      </section>

    </main>
  );
}
~~~~
### SelectedWorkDetail.tsx

~~~~tsx
"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { type SelectedWork } from "../metadata";
import { detailEnter, detailReveal } from "./selected-works-motion";

export function SelectedWorkDetail({
  work,
  previous,
  next,
}: {
  work: SelectedWork;
  previous: SelectedWork;
  next: SelectedWork;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <main className={`selected-work-detail selected-work-detail--${work.accent}`}>
      <section className="work-detail-archive" aria-labelledby="work-detail-title">
        <motion.div className="work-detail-context" {...detailEnter(shouldReduceMotion, 0.06)}>
          <span>{work.fictionalLabel}</span>
          <a className="work-template-back" href="/library/sections/4-selected-works-1">
            <ArrowLeft size={14} /> All projects
          </a>
        </motion.div>

        <motion.div className="work-detail-index" {...detailEnter(shouldReduceMotion, 0.14)}>
          <span className="work-detail-index-number">{work.number}</span>
          <span>{work.category}</span>
          <span>{work.year} / Archive index</span>
        </motion.div>

        <div className="work-detail-title-field">
          <motion.span className="work-detail-title-index" {...detailEnter(shouldReduceMotion, 0.22)} aria-hidden="true">
            {work.number}
          </motion.span>
          <motion.h1 id="work-detail-title" {...detailEnter(shouldReduceMotion, 0.28)}>
            {work.title}.
          </motion.h1>
          <motion.p className="work-detail-summary" {...detailEnter(shouldReduceMotion, 0.38)}>
            {work.summary}
          </motion.p>
        </div>

        <motion.figure className="work-detail-lead" {...detailEnter(shouldReduceMotion, 0.46)}>
          <div className="work-detail-lead-frame">
            <img src={work.visuals[0]} alt={`${work.title} primary visual study`} />
            <span className="work-detail-lead-marker">01 / primary study</span>
          </div>
          <figcaption>{work.visualCaptions[0]}</figcaption>
        </motion.figure>
      </section>

      <motion.section className="work-detail-meta" aria-label="Case study details" {...detailReveal(shouldReduceMotion, 0)}>
        <div><span>Archive no.</span><strong>{work.number} / 04</strong></div>
        <div><span>Practice</span><strong>{work.category}</strong></div>
        <div><span>Build language</span><strong>{work.stack.join(" / ")}</strong></div>
      </motion.section>

      <motion.section className="work-detail-story" aria-labelledby="work-story-title" {...detailReveal(shouldReduceMotion, 0.08)}>
        <div className="work-detail-story-rail">
          <span>Reading the work</span>
          <strong id="work-story-title">02</strong>
        </div>
        <div className="work-detail-story-copy">
          <p className="work-detail-kicker">The brief</p>
          <h2>{work.brief}</h2>
          <p className="work-detail-direction">{work.direction}</p>
        </div>
      </motion.section>

      <section className="work-detail-gallery" aria-label="Additional project studies">
        <motion.figure className="work-detail-gallery-visual" {...detailReveal(shouldReduceMotion, 0.04)}>
          <div className="work-detail-gallery-frame">
            <img src={work.visuals[1]} alt={`${work.title} secondary visual study`} />
            <span className="work-detail-lead-marker">03 / detail study</span>
          </div>
          <figcaption>{work.visualCaptions[1]}</figcaption>
        </motion.figure>

        <motion.div className="work-detail-build" {...detailReveal(shouldReduceMotion, 0.14)}>
          <p className="work-detail-kicker">Built as a systems study</p>
          <h2>One direction, shaped into a system.</h2>
          <div className="work-detail-built-links">
            {work.builtFrom.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </motion.div>
      </section>

      <motion.nav className="work-detail-navigation" aria-label="Project navigation" {...detailReveal(shouldReduceMotion, 0.1)}>
        <a className="work-detail-neighbor" href={previous.route}>
          <span><ArrowLeft size={15} /> Previous / {previous.number}</span>
          <strong>{previous.title}.</strong>
        </a>
        <a className="work-detail-neighbor work-detail-neighbor--next" href={next.route}>
          <span>Next / {next.number} <ArrowRight className="work-next-arrow" size={15} /></span>
          <strong>{next.title}.</strong>
        </a>
      </motion.nav>
    </main>
  );
}
~~~~
### selected-works-motion.ts

~~~~ts
const EASE_OUT = [0.22, 1, 0.36, 1] as const;
const DETAIL_EASE = [0.2, 0.8, 0.2, 1] as const;

export { DETAIL_EASE, EASE_OUT };

export function detailEnter(shouldReduceMotion: boolean | null, delay: number) {
  return {
    initial: shouldReduceMotion ? false : { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.72, delay: shouldReduceMotion ? 0 : delay, ease: DETAIL_EASE },
  };
}

export function detailReveal(shouldReduceMotion: boolean | null, delay: number) {
  return {
    initial: shouldReduceMotion ? false : { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.7, delay: shouldReduceMotion ? 0 : delay, ease: DETAIL_EASE },
  };
}
~~~~
### selected-works.css

~~~~css
:root {
  --works-paper: #f5f4f0;
  --works-ink: #0b0c0d;
  --works-muted: #797b78;
  --works-line: rgba(11, 12, 13, 0.14);
  --works-accent: #bbff31;
}

.selected-works-preview,
.selected-work-detail {
  min-height: 100vh;
  padding: 18px clamp(20px, 2.6vw, 42px) 32px;
  color: var(--works-ink);
  background: var(--works-paper);
  font-family: Manrope, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
}

.work-template-back:hover {
  color: #54780b;
}

.selected-works-masthead {
  position: relative;
  display: grid;
  grid-template-columns: minmax(80px, 0.6fr) minmax(0, 1.8fr) minmax(120px, 0.8fr);
  min-height: clamp(226px, 18vw, 255px);
  padding: 12px 0 26px;
}

.selected-works-count {
  align-self: end;
  padding-bottom: 5px;
  color: var(--works-muted);
  font-size: 14px;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
}

.selected-works-masthead-lockup {
  grid-column: 2;
  align-self: start;
  width: auto;
  margin: 4px 0 0;
  transform: none;
}

.selected-works-masthead h1 {
  margin: 0;
  font-size: clamp(82px, 10.6vw, 170px);
  font-weight: 700;
  letter-spacing: -0.04em;
  line-height: 0.78;
  text-wrap: balance;
}

.selected-works-masthead-lockup > span {
  position: absolute;
  right: 0;
  bottom: 26px;
  display: block;
  margin: 0;
  font-size: clamp(21px, 2vw, 30px);
  font-weight: 700;
  letter-spacing: -0.04em;
}

.selected-works-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
}

.selected-work-card { min-width: 0; }

.selected-work-title-rail {
  display: grid;
  grid-template-columns: 1fr auto auto;
  align-items: center;
  gap: 14px;
  min-height: 54px;
  padding: 0 20px;
  border-radius: 16px 16px 0 0;
  background: #fff;
  font-size: 15px;
  font-weight: 700;
  letter-spacing: -0.04em;
}

.selected-work-title-rail > span:nth-child(2),
.selected-work-title-rail i {
  color: var(--works-muted);
  font-size: 10px;
  font-style: normal;
  font-variant-numeric: tabular-nums;
  letter-spacing: 0;
}

.selected-work-title-rail i {
  color: #c5c6c1;
  letter-spacing: 2px;
}

.selected-work-media {
  display: block;
  position: relative;
  overflow: hidden;
  aspect-ratio: 1.28;
  outline: 1px solid rgba(0, 0, 0, 0.1);
  outline-offset: -1px;
  border-radius: 0 0 16px 16px;
  background: #1b1e1e;
}

.selected-work-media::after {
  position: absolute;
  inset: 0;
  content: "";
  opacity: 0.14;
  background: rgba(5, 6, 6, 0.44);
  transition: opacity 240ms ease;
}

.selected-work-media img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 520ms cubic-bezier(0.22, 1, 0.36, 1), filter 320ms ease;
}

.selected-work-lockup {
  position: absolute;
  z-index: 1;
  inset: 50% auto auto 50%;
  display: inline-flex;
  align-items: center;
  gap: 11px;
  width: max-content;
  max-width: calc(100% - 40px);
  color: #fff;
  text-align: center;
  transform: translate(-50%, -50%);
  transition: transform 260ms cubic-bezier(0.22, 1, 0.36, 1);
}

.selected-work-lockup strong {
  font-size: clamp(25px, 2.7vw, 42px);
  font-weight: 700;
  letter-spacing: -0.04em;
  line-height: 0.9;
  text-wrap: balance;
}

.selected-work-lockup svg {
  flex: 0 0 auto;
  padding: 8px;
  border-radius: 50%;
  color: var(--works-ink);
  background: rgba(255, 255, 255, 0.94);
  box-sizing: content-box;
  transition: transform 220ms cubic-bezier(0.22, 1, 0.36, 1);
}

.selected-work-card:hover .selected-work-media::after,
.selected-work-media:focus-visible::after { opacity: 0.36; }

.selected-work-card:hover .selected-work-media img,
.selected-work-media:focus-visible img {
  filter: saturate(1.06);
  transform: scale(1.024);
}

.selected-work-card:hover .selected-work-lockup { transform: translate(-50%, calc(-50% - 4px)); }
.selected-work-card:hover .selected-work-lockup svg { transform: translate(3px, -3px); }

.selected-work-detail--cinder { --works-accent: #6d716c; background: #eeece7; }
.selected-work-detail--auralis { --works-accent: #168dbe; background: #edf3f4; }
.selected-work-detail--stillhouse { --works-accent: #8a6649; background: #eee9e0; }
.selected-work-detail--vela { --works-accent: #b4412d; background: #f2e3d7; }

.work-detail-archive { padding: clamp(54px, 7vw, 110px) 0 0; }

.work-detail-context,
.work-detail-index {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  color: var(--works-muted);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.02em;
  text-transform: uppercase;
}

.work-detail-context > span { color: var(--works-accent); }

.work-template-back {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  min-height: 40px;
  color: inherit;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.02em;
  text-decoration: none;
  transition: color 160ms ease, transform 160ms ease;
}

.work-template-back:active { transform: scale(0.96); }

.work-detail-index {
  display: grid;
  grid-template-columns: 72px 1fr auto;
  margin-top: 28px;
  padding: 14px 0;
  border-top: 1px solid var(--works-line);
  border-bottom: 1px solid var(--works-line);
  font-variant-numeric: tabular-nums;
}

.work-detail-index-number { color: var(--works-ink); }

.work-detail-title-field {
  position: relative;
  min-height: clamp(312px, 36vw, 560px);
  padding: clamp(52px, 7vw, 112px) 0 clamp(42px, 6vw, 82px);
}

.work-detail-title-field h1 {
  position: relative;
  z-index: 1;
  max-width: 8ch;
  margin: 0;
  font-size: clamp(78px, 13.2vw, 204px);
  font-weight: 700;
  letter-spacing: -0.075em;
  line-height: 0.78;
  text-wrap: balance;
}

.work-detail-title-index {
  position: absolute;
  top: clamp(28px, 4vw, 64px);
  right: 1%;
  color: var(--works-accent);
  font-size: clamp(112px, 19vw, 300px);
  font-weight: 700;
  letter-spacing: -0.09em;
  line-height: 0.7;
  opacity: 0.5;
}

.work-detail-summary {
  position: absolute;
  right: 10%;
  bottom: clamp(38px, 6vw, 86px);
  width: min(280px, 32%);
  margin: 0;
  color: #5c625e;
  font-size: clamp(15px, 1.45vw, 20px);
  letter-spacing: -0.035em;
  line-height: 1.15;
  text-wrap: pretty;
}

.work-detail-lead,
.work-detail-gallery-visual { margin: 0; }

.work-detail-lead { padding-left: clamp(18px, 12vw, 172px); }

.work-detail-lead-frame,
.work-detail-gallery-frame {
  position: relative;
  overflow: hidden;
  outline: 1px solid rgba(0, 0, 0, 0.1);
  outline-offset: -1px;
  background: #1b1e1e;
}

.work-detail-lead-frame { aspect-ratio: 1.5; }

.work-detail-lead img,
.work-detail-gallery-visual img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.work-detail-lead-marker {
  position: absolute;
  right: 18px;
  bottom: 16px;
  padding: 7px 9px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 999px;
  color: #fff;
  background: rgba(11, 12, 13, 0.38);
  backdrop-filter: blur(10px);
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.work-detail-lead figcaption,
.work-detail-gallery-visual figcaption {
  margin-top: 10px;
  color: var(--works-muted);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.02em;
  text-transform: uppercase;
}

.work-detail-meta {
  display: grid;
  grid-template-columns: 0.7fr 1.1fr 1.2fr;
  margin-top: clamp(56px, 8vw, 118px);
  border-top: 1px solid var(--works-line);
  border-bottom: 1px solid var(--works-line);
}

.work-detail-meta > div {
  display: grid;
  gap: 12px;
  min-width: 0;
  padding: 18px 0;
}

.work-detail-meta > div + div {
  padding-left: 24px;
  border-left: 1px solid var(--works-line);
}

.work-detail-meta span,
.work-detail-kicker,
.work-detail-story-rail,
.work-detail-build > p,
.work-detail-neighbor span {
  color: var(--works-muted);
  font-size: 10px;
  font-variant-numeric: tabular-nums;
  font-weight: 700;
  letter-spacing: 0.02em;
  text-transform: uppercase;
}

.work-detail-meta strong { font-size: 13px; letter-spacing: -0.025em; }

.work-detail-story {
  display: grid;
  grid-template-columns: 0.7fr 1.3fr;
  gap: 40px;
  padding: clamp(92px, 13vw, 192px) 0;
}

.work-detail-story-rail {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  border-top: 1px solid var(--works-line);
  padding-top: 15px;
}

.work-detail-story-rail strong {
  color: var(--works-accent);
  font-size: 13px;
  font-variant-numeric: tabular-nums;
}

.work-detail-story-copy { max-width: 760px; }
.work-detail-kicker { margin: 0 0 18px; color: var(--works-accent); }

.work-detail-story-copy h2,
.work-detail-build h2 {
  max-width: 760px;
  margin: 0;
  font-size: clamp(35px, 5.1vw, 76px);
  font-weight: 700;
  letter-spacing: -0.065em;
  line-height: 0.92;
  text-wrap: balance;
}

.work-detail-direction {
  max-width: 460px;
  margin: 48px 0 0 22%;
  color: #676d69;
  font-size: clamp(19px, 2.1vw, 30px);
  letter-spacing: -0.04em;
  line-height: 1.08;
  text-wrap: pretty;
}

.work-detail-gallery {
  display: grid;
  grid-template-columns: 1.16fr 0.84fr;
  gap: clamp(24px, 6vw, 96px);
  align-items: end;
  padding-bottom: clamp(110px, 15vw, 220px);
}

.work-detail-gallery-frame { aspect-ratio: 1.35; }

.work-detail-build {
  padding-bottom: 7px;
  border-top: 1px solid var(--works-line);
  padding-top: 15px;
}

.work-detail-built-links {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 42px;
}

.work-detail-built-links span {
  display: inline-flex;
  align-items: center;
  min-height: 38px;
  padding: 0 12px;
  border: 1px solid var(--works-line);
  border-radius: 999px;
  color: inherit;
  background: rgba(255, 255, 255, 0.34);
  font-size: 11px;
}

.work-detail-navigation {
  display: grid;
  grid-template-columns: 1fr 1fr;
  border-top: 1px solid var(--works-line);
}

.work-detail-neighbor {
  display: grid;
  gap: 22px;
  padding: 20px 0 34px;
  color: inherit;
  text-decoration: none;
}

.work-detail-neighbor + .work-detail-neighbor {
  padding-left: 24px;
  border-left: 1px solid var(--works-line);
}

.work-detail-neighbor span {
  display: inline-flex;
  align-items: center;
  gap: 7px;
}

.work-detail-neighbor strong {
  font-size: clamp(30px, 4.7vw, 70px);
  letter-spacing: -0.065em;
  line-height: 0.86;
}

.work-detail-neighbor--next { text-align: right; }
.work-detail-neighbor--next span { justify-content: flex-end; }
.work-next-arrow { transition: transform 180ms ease; }
.work-detail-neighbor:hover .work-next-arrow { transform: translateX(5px); }

  .selected-work-media:focus-visible,
.work-template-back:focus-visible,
.work-detail-neighbor:focus-visible {
  outline: 2px solid #54780b;
  outline-offset: 4px;
}

@media (prefers-reduced-motion: reduce) {
      .selected-work-media::after,
  .selected-work-media img,
  .selected-work-lockup,
  .selected-work-lockup svg,
  .work-template-back,
  .work-next-arrow {
    transition: none;
  }

  .selected-work-card:hover .selected-work-media img,
  .selected-work-card:hover .selected-work-lockup,
  .selected-work-card:hover .selected-work-lockup svg,
  .work-detail-neighbor:hover .work-next-arrow {
    transform: none;
  }
}

@media (max-width: 720px) {
  .selected-works-preview,
  .selected-work-detail { padding: 16px 16px 28px; }

  .selected-works-masthead {
    grid-template-columns: 1fr;
    min-height: 260px;
    padding: 56px 0 28px;
  }

  .selected-works-count {
    align-self: start;
    padding-bottom: 0;
    font-size: 12px;
  }
  .selected-works-masthead-lockup { grid-column: auto; margin-top: 18px; }
  .selected-works-masthead h1 { font-size: clamp(74px, 21vw, 112px); }
  .selected-works-masthead-lockup > span { position: static; margin-top: 15px; }

  .selected-works-grid { grid-template-columns: 1fr; gap: 14px; }
  .selected-work-title-rail { min-height: 52px; padding-inline: 16px; }
  .selected-work-media { aspect-ratio: 1.12; }
  .selected-work-lockup strong { font-size: clamp(25px, 8vw, 38px); }

  .work-detail-archive { padding-top: 54px; }
  .work-detail-context { align-items: flex-start; flex-direction: column; gap: 10px; }
  .work-detail-index { grid-template-columns: 42px 1fr; gap: 6px 16px; margin-top: 24px; }
  .work-detail-index span:last-child { grid-column: 2; }
  .work-detail-title-field { min-height: 342px; padding-block: 62px 44px; }
  .work-detail-title-field h1 { max-width: 6.7ch; font-size: clamp(68px, 19vw, 108px); }
  .work-detail-title-index { top: 32px; right: 0; font-size: 150px; }
  .work-detail-summary { right: 0; bottom: 25px; width: 48%; font-size: 15px; }
  .work-detail-lead { padding-left: 0; }
  .work-detail-lead-frame { aspect-ratio: 1.08; }
  .work-detail-lead-marker { right: 12px; bottom: 12px; }

  .work-detail-meta,
  .work-detail-navigation { grid-template-columns: 1fr; }
  .work-detail-meta { margin-top: 58px; }
  .work-detail-meta > div { padding: 16px 0; }
  .work-detail-meta > div + div,
  .work-detail-neighbor + .work-detail-neighbor {
    padding-left: 0;
    border-top: 1px solid var(--works-line);
    border-left: 0;
  }

  .work-detail-story { grid-template-columns: 1fr; gap: 38px; padding-block: 92px; }
  .work-detail-story-rail { max-width: 100%; }
  .work-detail-story-copy h2 { font-size: clamp(35px, 10vw, 54px); }
  .work-detail-direction { margin: 38px 0 0 12%; font-size: 21px; }

  .work-detail-gallery { grid-template-columns: 1fr; gap: 70px; padding-bottom: 128px; }
  .work-detail-gallery-frame { aspect-ratio: 1.08; }
  .work-detail-build h2 { font-size: clamp(37px, 10vw, 54px); }
  .work-detail-built-links { margin-top: 30px; }
  .work-detail-neighbor { padding-block: 18px 28px; }
  .work-detail-neighbor--next { text-align: left; }
  .work-detail-neighbor--next span { justify-content: flex-start; }
}
~~~~
## Implementation rules

- Do not simplify or reinterpret the canonical source.
- Do not rename the CSS selectors.
- Do not change the project order, project slugs, copy, image URLs, breakpoints, easing, stagger delays, or reduced-motion behavior.
- Keep the section index as a two-column grid on desktop and one column on narrow screens.
- Keep the detail page sequence: archive context, index strip, title field, lead study, metadata, brief/direction story, secondary study, systems study, previous/next navigation.
- Keep image alt text and semantic labels.
- Keep the section free of host-specific controls; host integrations belong outside this standalone implementation.
