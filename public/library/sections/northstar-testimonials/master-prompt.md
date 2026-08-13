# MASTER PROMPT — NORTHSTAR Testimonials exact code rebuild

Build the NORTHSTAR Testimonials section as a standalone React/Next.js implementation. This is a code-first prompt: preserve the DOM order, class names, values, motion timing, easing, responsive breakpoints, fictional-content disclaimers, and asset mapping. Do not add unrelated site chrome, branding, or return navigation inside the standalone rebuild.

## 1. Required stack

- Next.js App Router with React and TypeScript.
- `motion/react` and `lucide-react`.
- CSS imported by the section entry point and scoped under `.northstar-shell`.
- The section is an Experience surface: the bento and metrics story are the artifact.

## 2. Visual assets — use these exact URLs

- Atlas House portrait: https://assets.framefield.my.id/sections/northstar-testimonials/atlas-house-portrait.webp
- Cobalt data field: https://assets.framefield.my.id/sections/northstar-testimonials/cobalt-data-field.webp
- Performance orbit: https://assets.framefield.my.id/sections/northstar-testimonials/performance-orbit.webp
- Pipeline texture: https://assets.framefield.my.id/sections/northstar-testimonials/pipeline-texture.webp
- Optional preview video asset: https://assets.framefield.my.id/sections/northstar-testimonials/preview.mp4

The four images are original illustrative assets. NORTHSTAR names, testimonials, metrics, outcomes, and Atlas House are fictional demonstration content; keep that framing in the rendered section. The optional MP4 is a delivery preview asset and is not rendered inside the standalone section.

## 3. Required files

Create or adapt these files without changing the canonical internals below:

- `NorthstarTestimonials.tsx` — overview bento and inline metrics story.
- `NorthstarMetrics.tsx` — metric-led proof surfaces.
- `northstar-motion.tsx` — counters, shared easing, and motion helpers.
- `northstar-testimonials.css` — scoped visual system and responsive rules.

Keep any route adapter outside these files. The implementation must remain a single overview route plus the Atlas House detail route, with metrics inline below the bento.

## 4. Behavior contract

- No navbar or footer.
- The overview heading is `Proof, in motion.`.
- The bento uses an unequal desktop grid and collapses without horizontal overflow.
- Metric counters start once when their group enters view, settle cinematically, and show final values immediately under reduced motion.
- Pipeline bars enter from the baseline with a stagger.
- The Experience Signal card keeps `Page speed +48%` and `conversion lift +42%` as two visually distinct lines using 1.04 line-height, pretty wrapping, and a small inter-line gap.
- The Atlas House card remains explicitly fictional and links to the detail route.
- Keep navigation outside this standalone section.

## 5. Canonical source

Copy the following source exactly.

### library/sections/northstar-testimonials/source/NorthstarTestimonials.tsx

```tsx
"use client";

import { ArrowUpRight, MoveUpRight, Star } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { NORTHSTAR_TESTIMONIALS } from "../metadata";
import { MetricCounter, NORTHSTAR_EASE } from "./northstar-motion";
import { NorthstarMetrics } from "./NorthstarMetrics";
import "./northstar-testimonials.css";

const reveal = (reduced: boolean | null, delay: number) => ({
  initial: reduced ? false : { opacity: 0, y: 18, filter: "blur(8px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  transition: { duration: 0.64, delay: reduced ? 0 : delay, ease: NORTHSTAR_EASE },
});

export function NorthstarTestimonials() {
  const reduced = useReducedMotion();
  const [mira, theo, ari] = NORTHSTAR_TESTIMONIALS;

  return (
    <main className="northstar-shell northstar-overview">
      <motion.section className="northstar-overview-intro" {...reveal(reduced, 0.1)}>
        <h1>Proof, in motion.</h1>
        <p>Independent digital performance partner for demand, clarity, and faster decisions.</p>
      </motion.section>

      <section className="northstar-bento" aria-label="Fictional client feedback">
        <motion.article className="northstar-card northstar-card--confidence" {...reveal(reduced, 0.18)}>
          <img className="northstar-confidence-art" src="https://assets.framefield.my.id/sections/northstar-testimonials/atlas-house-portrait.webp" alt="" aria-hidden="true" />
          <div>
            <span className="northstar-card-label">Client confidence</span>
            <div className="northstar-score"><MetricCounter value={4.9} suffix="/5" /><span>average signal</span></div>
            <p>Built around decisions that earn attention and make the next step feel clear.</p>
          </div>
          <div className="northstar-trust-row">
            <div className="northstar-avatar-stack" aria-label="Fictional project partners"><span>AL</span><span>MS</span><span>TR</span><span>+24</span></div>
            <small>fictional teams, illustrative results</small>
          </div>
        </motion.article>

        <motion.article className="northstar-card northstar-card--quote-one" {...reveal(reduced, 0.25)}>
          <div className="northstar-card-media-tile" aria-hidden="true"><img src="https://assets.framefield.my.id/sections/northstar-testimonials/cobalt-data-field.webp" alt="" /></div>
          <div className="northstar-person"><span className="northstar-initials">{mira.initials}</span><div><strong>{mira.name}</strong><small>{mira.role}</small></div></div>
          <StarRating />
          <p>â€œ{mira.quote}â€</p>
        </motion.article>

        <motion.article className="northstar-card northstar-card--statement" {...reveal(reduced, 0.32)}>
          <img className="northstar-statement-image" src="https://assets.framefield.my.id/sections/northstar-testimonials/performance-orbit.webp" alt="" aria-hidden="true" />
          <p>â€œA cleaner system. A faster way from intent to action.â€</p>
          <span>â€” fictional client signal</span>
        </motion.article>

        <motion.article className="northstar-card northstar-card--quote-two" {...reveal(reduced, 0.39)}>
          <div className="northstar-person"><span className="northstar-initials northstar-initials--blue">{theo.initials}</span><div><strong>{theo.name}</strong><small>{theo.role}</small></div></div>
          <p>â€œ{theo.quote}â€</p>
          <div className="northstar-quote-footer"><StarRating /><small>Illustrative review</small></div>
        </motion.article>

        <motion.a className="northstar-card northstar-card--cta" href="#metrics" {...reveal(reduced, 0.46)}>
          <span>See the signals behind the work</span><ArrowUpRight size={23} aria-hidden="true" />
        </motion.a>

        <motion.article className="northstar-card northstar-card--note" {...reveal(reduced, 0.53)}>
          <img className="northstar-note-image" src="https://assets.framefield.my.id/sections/northstar-testimonials/pipeline-texture.webp" alt="" aria-hidden="true" />
          <MoveUpRight size={18} aria-hidden="true" />
          <p>{ari.quote}</p>
          <small>{ari.name} Â· fictional feedback</small>
        </motion.article>
      </section>
      <NorthstarMetrics />
    </main>
  );
}

function StarRating() {
  return (
    <span className="northstar-rating" aria-label="Five-star illustrative rating">
      {Array.from({ length: 5 }, (_, index) => <Star key={index} size={14} fill="currentColor" aria-hidden="true" />)}
    </span>
  );
}


```

### library/sections/northstar-testimonials/source/NorthstarMetrics.tsx

```tsx
"use client";

import { ArrowUpRight, MoveUpRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { ATLAS_HOUSE_CASE_STUDY, NORTHSTAR_METRICS } from "../metadata";
import { MetricCounter, NORTHSTAR_EASE } from "./northstar-motion";
import "./northstar-testimonials.css";

const inView = (reduced: boolean | null, delay: number) => ({
  initial: reduced ? false : { opacity: 0, y: 22, filter: "blur(8px)" },
  whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
  viewport: { once: true, amount: 0.22 },
  transition: { duration: 0.68, delay: reduced ? 0 : delay, ease: NORTHSTAR_EASE },
});

const PIPELINE_BAR_HEIGHTS = [28, 42, 33, 58, 76, 100] as const;

export function NorthstarMetrics() {
  const reduced = useReducedMotion();
  return (
    <section id="metrics" className="northstar-metrics-section" aria-labelledby="northstar-metrics-title">
      <section className="northstar-metrics-lead">
        <motion.h1 id="northstar-metrics-title" {...inView(reduced, 0.08)}>The numbers only matter when the system holds.</motion.h1>
        <div className="northstar-metrics-row" aria-label="Illustrative performance metrics">
          {NORTHSTAR_METRICS.map((metric, index) => <motion.article key={metric.label} {...inView(reduced, 0.14 + index * 0.07)}><MetricCounter value={metric.value} prefix={metric.prefix} suffix={metric.suffix} /><span>{metric.label}</span><small>{metric.detail}</small></motion.article>)}
        </div>
      </section>

      <section className="northstar-approach">
        <span>How the work moves</span>
        <p>We shape the path between attention and actionâ€”then remove the friction that keeps good intent from becoming qualified demand.</p>
      </section>

      <section className="northstar-results-grid" aria-label="Illustrative NORTHSTAR results">
        <motion.a className="northstar-result-card northstar-result-card--atlas" href={ATLAS_HOUSE_CASE_STUDY.route} {...inView(reduced, 0.06)}>
          <img src={ATLAS_HOUSE_CASE_STUDY.portrait} alt="Original editorial portrait created for the fictional Atlas House case study" />
          <div><span>{ATLAS_HOUSE_CASE_STUDY.fictionalLabel}</span><h2>{ATLAS_HOUSE_CASE_STUDY.title}</h2><p>Faster discovery, a more decisive collection story.</p><strong>Open study <ArrowUpRight size={17} /></strong></div>
        </motion.a>
        <motion.article className="northstar-result-card northstar-result-card--conversion" {...inView(reduced, 0.13)}>
          <img src="https://assets.framefield.my.id/sections/northstar-testimonials/cobalt-data-field.webp" alt="Abstract cobalt conversion data field" />
          <span>Experience signal</span>
          <h2 className="northstar-conversion-headline">
            <span className="northstar-conversion-line">Page speed <MetricCounter value={48} prefix="+" suffix="%" /></span>
            <span className="northstar-conversion-line">conversion lift <MetricCounter value={42} prefix="+" suffix="%" /></span>
          </h2>
          <p>Illustrative before / after outcome from a redesigned discovery path.</p>
          <strong className="northstar-conversion-before-after"><MetricCounter value={2.9} suffix="%" /> <MoveUpRight size={18} /> <MetricCounter value={4.1} suffix="%" /></strong>
        </motion.article>
        <motion.article className="northstar-result-card northstar-result-card--score" {...inView(reduced, 0.2)}>
          <img src="https://assets.framefield.my.id/sections/northstar-testimonials/performance-orbit.webp" alt="Abstract monochrome performance orbit" />
          <div className="northstar-performance-score"><MetricCounter value={98} /><span>Performance<br />score</span></div>
        </motion.article>
        <motion.article className="northstar-result-card northstar-result-card--pipeline" {...inView(reduced, 0.27)}>
          <img src="https://assets.framefield.my.id/sections/northstar-testimonials/pipeline-texture.webp" alt="Abstract cobalt pipeline texture" />
          <span>Pipeline signal</span><h2>+61%</h2><p>qualified pipeline</p>
          <div className="northstar-bars" aria-hidden="true">
            {PIPELINE_BAR_HEIGHTS.map((height, index) => (
              <motion.i
                key={height}
                style={{ height: `${height}%`, transformOrigin: "bottom" }}
                initial={reduced ? false : { scaleY: 0, opacity: 0, filter: "blur(4px)" }}
                whileInView={{ scaleY: 1, opacity: 1, filter: "blur(0px)" }}
                viewport={{ once: true, amount: 0.7 }}
                transition={{ duration: 0.82, delay: reduced ? 0 : index * 0.08, ease: NORTHSTAR_EASE }}
              />
            ))}
          </div>
        </motion.article>
      </section>
    </section>
  );
}


```

### library/sections/northstar-testimonials/source/northstar-motion.tsx

```tsx
"use client";

import { useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

export const NORTHSTAR_EASE = [0.16, 1, 0.3, 1] as const;

type MetricCounterProps = {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
};

export function MetricCounter({ value, prefix = "", suffix = "", decimals = Number.isInteger(value) ? 0 : 1 }: MetricCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const visible = useInView(ref, { once: true, amount: 0.6 });
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState(reduced ? value : 0);

  useEffect(() => {
    if (!visible) return;
    if (reduced) {
      setDisplay(value);
      return;
    }

    const duration = 1050;
    const startedAt = performance.now();
    let frame = 0;
    const update = (now: number) => {
      const progress = Math.min((now - startedAt) / duration, 1);
      const eased = 1 - (1 - progress) ** 5;
      setDisplay(value * eased);
      if (progress < 1) frame = requestAnimationFrame(update);
    };
    frame = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frame);
  }, [reduced, value, visible]);

  return (
    <span ref={ref} className="northstar-counter" aria-label={`${prefix}${value.toFixed(decimals)}${suffix}`}>
      {prefix}{display.toFixed(decimals)}{suffix}
    </span>
  );
}

```

### library/sections/northstar-testimonials/source/northstar-testimonials.css

```css
.northstar-shell {
  --northstar-paper: #f1eee7;
  --northstar-ink: #111216;
  --northstar-muted: #62646b;
  --northstar-line: rgba(17, 18, 22, 0.15);
  --northstar-blue: #2457ff;
  --northstar-blue-deep: #1735a5;
  min-height: 100svh;
  box-sizing: border-box;
  position: relative;
  overflow: clip;
  padding: clamp(1.25rem, 2.4vw, 2.5rem);
  background: var(--northstar-paper);
  color: var(--northstar-ink);
  letter-spacing: -0.025em;
}

.northstar-shell *,
.northstar-shell *::before,
.northstar-shell *::after { box-sizing: border-box; }

.northstar-shell a { color: inherit; text-decoration: none; }

.northstar-wordmark {
  position: relative;
  z-index: 2;
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.09em;
}

.northstar-overview { min-height: 115svh; }

.northstar-overview-intro {
  max-width: 56rem;
  margin: clamp(3.4rem, 8vh, 7rem) auto clamp(2.25rem, 5vh, 4.25rem);
  text-align: center;
}

.northstar-overview-intro h1,
.northstar-metrics-lead h1,
.northstar-case-head h1 {
  margin: 0;
  font-size: clamp(3.8rem, 9.4vw, 8.5rem);
  font-weight: 800;
  line-height: 0.82;
  letter-spacing: -0.065em;
  text-wrap: balance;
}

.northstar-overview-intro p {
  max-width: 34rem;
  margin: 1.1rem auto 0;
  color: var(--northstar-muted);
  font-size: clamp(0.88rem, 1.15vw, 1.05rem);
  line-height: 1.35;
  text-wrap: balance;
}

.northstar-bento {
  display: grid;
  grid-template-columns: 1.12fr 1.08fr 1.08fr 1fr;
  grid-template-areas:
    "confidence quote-one statement quote-two"
    "confidence cta note quote-two";
  grid-template-rows: repeat(2, minmax(0, 1fr));
  gap: 0.5rem;
  max-width: 96rem;
  min-height: clamp(31rem, 58svh, 43rem);
  margin: 0 auto;
}

.northstar-card,
.northstar-result-card,
.northstar-case-outcomes article {
  position: relative;
  overflow: hidden;
  border: 1px solid var(--northstar-line);
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.55);
}

.northstar-card { min-height: 0; padding: clamp(1.15rem, 2vw, 1.8rem); }

.northstar-card--confidence {
  grid-area: confidence;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: var(--northstar-ink);
  color: white;
}

.northstar-confidence-art {
  position: absolute;
  z-index: 0;
  top: 4.2rem;
  right: 1.2rem;
  width: 31%;
  height: 8.8rem;
  border-radius: 10px;
  object-fit: cover;
  object-position: 68% center;
  opacity: 0.64;
  mix-blend-mode: screen;
  outline: 1px solid rgba(255, 255, 255, 0.1);
}
.northstar-card--confidence > div:not(.northstar-trust-row) { position: relative; z-index: 1; max-width: 66%; }

.northstar-card-label,
.northstar-result-card > span,
.northstar-case-head > div > span,
.northstar-approach > span {
  display: block;
  color: inherit;
  font-size: 0.66rem;
  font-weight: 700;
  letter-spacing: 0.075em;
  text-transform: uppercase;
}

.northstar-score { display: grid; gap: 0.05rem; margin-top: clamp(2rem, 5vh, 4rem); }
.northstar-score .northstar-counter { display: block; white-space: nowrap; font-size: clamp(3.8rem, 6vw, 5.3rem); line-height: 0.78; font-weight: 800; letter-spacing: -0.075em; font-variant-numeric: tabular-nums; }
.northstar-score span { color: rgba(255,255,255,0.6); font-size: 0.7rem; letter-spacing: 0; }
.northstar-card--confidence p { max-width: 16rem; margin: 1.6rem 0 0; color: rgba(255,255,255,0.7); font-size: 0.95rem; line-height: 1.35; }

.northstar-trust-row { display: grid; gap: 0.65rem; }
.northstar-avatar-stack { display: flex; align-items: center; }
.northstar-avatar-stack span { display: grid; width: 2rem; height: 2rem; margin-left: -0.35rem; place-items: center; border: 2px solid var(--northstar-ink); border-radius: 50%; background: #d6d5d2; color: var(--northstar-ink); font-size: 0.58rem; font-weight: 800; }
.northstar-avatar-stack span:first-child { margin-left: 0; background: #f4b48f; }.northstar-avatar-stack span:nth-child(2) { background: #9bb7c3; }.northstar-avatar-stack span:nth-child(3) { background: #d3be8f; }.northstar-avatar-stack span:last-child { background: var(--northstar-blue); color: white; }
.northstar-trust-row small { color: rgba(255,255,255,0.56); font-size: 0.67rem; letter-spacing: 0; }

.northstar-card--quote-one,
.northstar-card--quote-two { display: flex; flex-direction: column; justify-content: space-between; }
.northstar-card--quote-one { grid-area: quote-one; }
.northstar-card--quote-two { grid-area: quote-two; }
.northstar-card-media-tile { position: absolute; top: 1.2rem; right: 1.2rem; width: 6.25rem; height: 3.4rem; overflow: hidden; border-radius: 8px; background: #0d1d56; outline: 1px solid rgba(0, 0, 0, 0.1); }
.northstar-card-media-tile img { width: 100%; height: 100%; object-fit: cover; opacity: 0.82; }
.northstar-card--quote-one .northstar-person { padding-right: 6.5rem; }
.northstar-person { display: flex; align-items: center; gap: 0.7rem; }.northstar-person strong { display: block; font-size: 0.9rem; letter-spacing: -0.04em; }.northstar-person small { display: block; margin-top: 0.2rem; color: var(--northstar-muted); font-size: 0.67rem; letter-spacing: 0; }
.northstar-initials { display: grid; width: 2.25rem; height: 2.25rem; place-items: center; border-radius: 50%; background: #d2b8a9; color: #3d251b; font-size: 0.64rem; font-weight: 800; letter-spacing: 0; }.northstar-initials--blue { background: #b5c5ff; color: var(--northstar-blue-deep); }
.northstar-rating { display: inline-flex; gap: 0.12rem; color: var(--northstar-blue); }
.northstar-card--quote-one p,.northstar-card--quote-two p { max-width: 21ch; margin: 1rem 0 0; font-size: clamp(1.18rem, 1.6vw, 1.65rem); font-weight: 650; line-height: 0.98; letter-spacing: -0.06em; text-wrap: balance; }
.northstar-quote-footer { display: flex; justify-content: space-between; align-items: end; margin-top: 1rem; }.northstar-quote-footer small { color: var(--northstar-muted); font-size: 0.63rem; letter-spacing: 0; }

.northstar-card--statement { display: flex; flex-direction: column; justify-content: end; background: var(--northstar-blue); color: white; }.northstar-card--statement::after { position: absolute; inset: 0; background: linear-gradient(180deg, rgba(25, 69, 214, 0.16), rgba(12, 33, 126, 0.68)); content: ""; }.northstar-statement-image { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; opacity: 0.48; mix-blend-mode: screen; }.northstar-card--statement p { position: relative; z-index: 1; max-width: 11ch; margin: 0; font-size: clamp(1.7rem, 2.7vw, 2.7rem); font-weight: 700; line-height: 0.92; letter-spacing: -0.065em; text-wrap: balance; }.northstar-card--statement > span { position: relative; z-index: 1; margin-top: 1rem; color: rgba(255,255,255,0.72); font-size: 0.69rem; letter-spacing: 0; }

.northstar-card--cta { grid-area: cta; display: flex; min-height: 0; align-items: center; justify-content: space-between; gap: 1rem; padding: 1.35rem 1.5rem; border-color: var(--northstar-blue); background: var(--northstar-blue); color: white; font-size: 1rem; font-weight: 700; line-height: 1; letter-spacing: -0.045em; transition: background-color 180ms ease, color 180ms ease, transform 180ms ease, box-shadow 180ms ease; }.northstar-card--cta:hover { background: white; box-shadow: 0 12px 20px rgba(17,18,22,0.15); color: var(--northstar-ink); transform: translateY(-3px); }.northstar-card--cta:hover svg { transform: translate(3px, -3px); }.northstar-card--cta svg { flex: none; transition: transform 180ms ease; }.northstar-card--cta:active { transform: scale(0.98); }
.northstar-card--note { grid-area: note; background: #111216; color: white; }.northstar-card--note::after { position: absolute; z-index: 1; inset: 0; background: linear-gradient(180deg, rgba(17, 18, 22, 0.12), rgba(17, 18, 22, 0.9)); content: ""; }.northstar-note-image { position: absolute; z-index: 0; inset: 0; width: 100%; height: 100%; object-fit: cover; opacity: 0.82; }.northstar-card--note > *:not(.northstar-note-image) { position: relative; z-index: 2; }.northstar-card--note > svg { color: white; }.northstar-card--note p { max-width: 20ch; margin: 0.95rem 0 1.4rem; color: white; font-size: 1rem; font-weight: 650; line-height: 1.03; }.northstar-card--note small { color: rgba(255, 255, 255, 0.72); font-size: 0.68rem; letter-spacing: 0; }

.northstar-metrics-section { max-width: 96rem; margin: 0 auto; padding: clamp(8rem, 16vh, 14rem) 0 5rem; scroll-margin-top: 2rem; }.northstar-metrics-lead { max-width: 96rem; margin: 0 auto; }.northstar-metrics-lead h1 { max-width: 15ch; font-size: clamp(3.3rem, 7.1vw, 6.6rem); }.northstar-metrics-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; margin-top: clamp(3rem, 9vh, 8rem); }.northstar-metrics-row article { min-width: 0; }.northstar-metrics-row .northstar-counter { display: block; font-size: clamp(3.1rem, 5.6vw, 5.7rem); font-weight: 800; line-height: 0.8; letter-spacing: -0.075em; font-variant-numeric: tabular-nums; }.northstar-metrics-row article > span { display: block; max-width: 9ch; margin-top: 1rem; font-size: 0.9rem; font-weight: 700; line-height: 1; }.northstar-metrics-row small { display: block; max-width: 13ch; margin-top: 0.55rem; color: var(--northstar-muted); font-size: 0.67rem; letter-spacing: 0; line-height: 1.15; }
.northstar-approach { display: grid; grid-template-columns: 0.95fr 2.05fr; gap: 2rem; max-width: 96rem; margin: clamp(7rem, 18vh, 15rem) auto clamp(4rem, 9vh, 8rem); padding: 0 clamp(0.25rem, 3vw, 4rem); }.northstar-approach p { max-width: 34ch; margin: 0; font-size: clamp(1.9rem, 3.5vw, 3.9rem); font-weight: 700; line-height: 0.94; letter-spacing: -0.065em; text-wrap: balance; }
.northstar-results-grid { display: grid; grid-template-columns: 1.55fr 0.78fr 0.78fr; grid-template-rows: minmax(19rem, 1fr) minmax(14rem, 0.75fr); gap: 0.55rem; max-width: 96rem; margin: 0 auto; }.northstar-result-card { min-height: 15rem; padding: clamp(1.2rem, 2vw, 1.9rem); }.northstar-result-card img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }.northstar-result-card--atlas { grid-row: span 2; min-height: 36rem; background: #141416; color: white; }.northstar-result-card--atlas img { object-position: 70% center; opacity: 0.84; transition: transform 500ms cubic-bezier(0.16,1,0.3,1), opacity 300ms ease; }.northstar-result-card--atlas::after { position: absolute; inset: 0; background: linear-gradient(90deg, rgba(0,0,0,0.86), rgba(0,0,0,0.12) 72%); content: ""; }.northstar-result-card--atlas div { position: relative; z-index: 1; display: flex; height: 100%; max-width: 17rem; flex-direction: column; justify-content: end; }.northstar-result-card--atlas h2 { margin: 0.6rem 0; font-size: clamp(2.5rem, 4vw, 4rem); line-height: 0.85; letter-spacing: -0.07em; }.northstar-result-card--atlas p { margin: 0; color: rgba(255,255,255,0.72); font-size: 0.85rem; line-height: 1.25; }.northstar-result-card--atlas strong { display: inline-flex; align-items: center; gap: 0.4rem; margin-top: 2rem; font-size: 0.76rem; }.northstar-result-card--atlas:hover img { opacity: 1; transform: scale(1.035); }
.northstar-result-card--conversion { grid-row: span 2; color: white; }.northstar-result-card--conversion::after, .northstar-result-card--pipeline::after { position: absolute; inset: 0; background: linear-gradient(180deg, rgba(5,13,40,0.35), rgba(4,8,19,0.9)); content: ""; }.northstar-result-card--conversion > *:not(img) { position: relative; z-index: 1; }.northstar-result-card--conversion h2 { margin: 4.6rem 0 0; font-size: clamp(1.45rem, 2.1vw, 2.4rem); line-height: 1.04; letter-spacing: -0.07em; }.northstar-conversion-line { display: block; text-wrap: pretty; }.northstar-conversion-line + .northstar-conversion-line { margin-top: 0.24em; }.northstar-conversion-line .northstar-counter { display: inline; font-size: inherit; font-weight: inherit; letter-spacing: inherit; line-height: inherit; font-variant-numeric: tabular-nums; }.northstar-result-card--conversion p { position: absolute !important; right: 1.4rem; bottom: 4.2rem; left: 1.4rem; margin: 0; color: rgba(255,255,255,0.7); font-size: 0.76rem; line-height: 1.25; }.northstar-result-card--conversion strong { position: absolute !important; z-index: 1; bottom: 1.4rem; display: flex; align-items: center; gap: 0.45rem; font-size: 1.7rem; letter-spacing: -0.06em; }.northstar-conversion-before-after .northstar-counter { display: inline; font-size: inherit; font-variant-numeric: tabular-nums; }
.northstar-result-card--score { padding: 0; background: #dedbd4; }.northstar-result-card--score img { mix-blend-mode: multiply; opacity: 0.66; }.northstar-performance-score { position: absolute; inset: 0; z-index: 1; display: grid; place-content: center; text-align: center; }.northstar-performance-score .northstar-counter { font-size: clamp(3.2rem, 4.5vw, 4.8rem); font-weight: 800; line-height: 0.8; letter-spacing: -0.07em; font-variant-numeric: tabular-nums; }.northstar-performance-score span { margin-top: 0.8rem; font-size: 0.68rem; font-weight: 700; letter-spacing: -0.02em; line-height: 1.1; }
.northstar-result-card--pipeline { color: white; }.northstar-result-card--pipeline::after { background: linear-gradient(180deg, rgba(4,7,16,0.2), rgba(4,7,16,0.88)); }.northstar-result-card--pipeline > *:not(img) { position: relative; z-index: 1; }.northstar-result-card--pipeline h2 { margin: 1rem 0 0; font-size: clamp(3.2rem, 5vw, 5rem); line-height: 0.8; letter-spacing: -0.075em; }.northstar-result-card--pipeline p { margin: 0.5rem 0 0; color: rgba(255,255,255,0.72); font-size: 0.78rem; }.northstar-bars { position: absolute !important; z-index: 1; right: 1.4rem; bottom: 1.4rem; left: 1.4rem; display: flex; height: 5rem; align-items: end; gap: 0.45rem; }.northstar-bars i { display: block; flex: 1; border-radius: 4px 4px 1px 1px; background: rgba(255,255,255,0.3); }.northstar-bars i:nth-child(6) { background: white; }

.northstar-case-page { min-height: 125svh; padding-bottom: 5.8rem; }.northstar-case-head { display: flex; align-items: end; justify-content: space-between; gap: 2rem; max-width: 96rem; margin: clamp(3rem, 8vh, 6.5rem) auto clamp(2rem, 5vh, 4rem); }.northstar-case-head h1 { margin-top: 0.8rem; }.northstar-case-head p { max-width: 35ch; margin: 1rem 0 0; color: var(--northstar-muted); font-size: 0.95rem; line-height: 1.3; }.northstar-case-head > a { display: inline-flex; flex: none; align-items: center; gap: 0.4rem; padding-bottom: 0.4rem; border-bottom: 1px solid var(--northstar-ink); font-size: 0.78rem; font-weight: 700; }.northstar-case-grid { display: grid; grid-template-columns: 1.55fr 0.92fr; gap: 0.55rem; max-width: 96rem; margin: 0 auto; }.northstar-case-image { position: relative; min-height: 37rem; margin: 0; overflow: hidden; border-radius: 14px; background: #151519; }.northstar-case-image img { width: 100%; height: 100%; object-fit: cover; object-position: 68% center; }.northstar-case-image figcaption { position: absolute; right: 1.3rem; bottom: 1.1rem; left: 1.3rem; color: rgba(255,255,255,0.65); font-size: 0.65rem; letter-spacing: 0; }.northstar-case-story { display: flex; min-height: 23rem; flex-direction: column; justify-content: space-between; padding: clamp(1.4rem, 2.6vw, 2.4rem); border: 1px solid var(--northstar-line); border-radius: 14px; background: white; }.northstar-case-quote { max-width: 14ch; margin: 0; font-size: clamp(1.8rem, 3.1vw, 3.4rem); font-weight: 700; line-height: 0.92; letter-spacing: -0.065em; text-wrap: balance; }.northstar-case-story > span { margin-top: 1rem; color: var(--northstar-muted); font-size: 0.7rem; letter-spacing: 0; }.northstar-case-story > p:last-child { max-width: 39ch; margin: 2rem 0 0; color: var(--northstar-muted); font-size: 0.86rem; line-height: 1.35; letter-spacing: -0.015em; }.northstar-case-outcomes { display: grid; grid-column: span 2; grid-template-columns: repeat(3, 1fr); gap: 0.55rem; }.northstar-case-outcomes article { display: grid; min-height: 10rem; align-content: space-between; padding: 1.25rem 1.4rem; background: #e4e1da; }.northstar-case-outcomes .northstar-counter { font-size: clamp(2.6rem, 4vw, 4.2rem); font-weight: 800; line-height: 0.8; letter-spacing: -0.075em; font-variant-numeric: tabular-nums; }.northstar-case-outcomes span { max-width: 14ch; font-size: 0.75rem; font-weight: 700; line-height: 1.02; }.northstar-case-next { display: flex; grid-column: span 2; min-height: 6rem; align-items: center; justify-content: space-between; padding: 1.35rem 1.5rem; border-radius: 14px; background: var(--northstar-blue); color: white !important; font-size: clamp(1.3rem, 2vw, 2rem); font-weight: 700; letter-spacing: -0.055em; transition: transform 180ms ease, background-color 180ms ease; }.northstar-case-next:hover { background: var(--northstar-blue-deep); transform: translateY(-3px); }.northstar-case-next:active { transform: scale(0.98); }

@media (max-width: 820px) {
  .northstar-bento { grid-template-columns: 1fr 1fr; grid-template-areas: "confidence quote-one" "confidence statement" "cta note" "quote-two quote-two"; grid-template-rows: repeat(4, minmax(13rem, auto)); min-height: 0; }.northstar-card--statement { min-height: 0; }.northstar-metrics-row { grid-template-columns: repeat(2, 1fr); row-gap: 2.5rem; }.northstar-approach { grid-template-columns: 1fr; gap: 1rem; padding: 0; }.northstar-results-grid { grid-template-columns: 1fr 1fr; grid-template-rows: auto; }.northstar-result-card--atlas { grid-row: span 2; }.northstar-result-card--conversion { grid-row: span 2; }.northstar-case-grid { grid-template-columns: 1fr; }.northstar-case-outcomes,.northstar-case-next { grid-column: auto; }
}

@media (max-width: 560px) {
  .northstar-shell { padding: 1rem; }.northstar-overview-intro { margin-top: 4.2rem; text-align: left; }.northstar-overview-intro h1 { font-size: clamp(3.8rem, 20vw, 5.1rem); }.northstar-overview-intro p { margin-left: 0; }.northstar-bento { grid-template-columns: 1fr; grid-template-areas: "confidence" "quote-one" "statement" "quote-two" "cta" "note"; grid-template-rows: auto; }.northstar-card { min-height: 13rem; }.northstar-card--confidence { min-height: 25rem; }.northstar-card--statement { min-height: 19rem; }.northstar-card--quote-two { min-height: 17rem; }.northstar-metrics-section { padding-top: 7rem; padding-bottom: 3rem; }.northstar-metrics-lead h1 { font-size: clamp(3.25rem, 15vw, 4.35rem); }.northstar-metrics-row { gap: 2.3rem 1rem; margin-top: 4rem; }.northstar-metrics-row .northstar-counter { font-size: clamp(3rem, 17vw, 4.6rem); }.northstar-approach { margin: 7rem 0 4rem; }.northstar-approach p { font-size: clamp(2.05rem, 11vw, 3rem); }.northstar-results-grid { grid-template-columns: 1fr; }.northstar-result-card--atlas,.northstar-result-card--conversion { grid-row: auto; min-height: 27rem; }.northstar-result-card--score,.northstar-result-card--pipeline { min-height: 15rem; }.northstar-case-head { display: block; margin-top: 4.3rem; }.northstar-case-head h1 { font-size: clamp(4rem, 19vw, 5.4rem); }.northstar-case-head > a { margin-top: 1.7rem; }.northstar-case-image { min-height: 31rem; }.northstar-case-story { min-height: 25rem; }.northstar-case-outcomes { grid-template-columns: 1fr; }.northstar-case-outcomes article { min-height: 8rem; }.northstar-case-next { grid-column: auto; min-height: 5rem; }
}

.northstar-conversion-headline { line-height: 1.04; }

@media (prefers-reduced-motion: reduce) {
  .northstar-shell *, .northstar-shell *::before, .northstar-shell *::after { scroll-behavior: auto !important; transition-duration: 0.01ms !important; animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; }
}


```

## 6. Acceptance criteria

- The route renders the bento, inline metrics, results grid, and fictional Atlas House link.
- No navbar, footer, unrelated branding, site CTA, or return navigation is present inside the standalone section.
- All four image URLs are used in their intended surfaces.
- Animated numbers use tabular numerals and respect reduced motion.
- The experience-signal headline does not overlap or create an awkward third line at 390px or 1440px.
- The layout has no horizontal overflow at 390×844, 820px, and 1440×900.
- The optional `preview.mp4` URL is only a delivery preview artifact; the standalone section uses the four image assets above.
