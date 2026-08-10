"use client";

import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { SELECTED_WORKS, type SelectedWork } from "../metadata";
import "./selected-works.css";

const EASE_OUT = [0.22, 1, 0.36, 1] as const;
const DETAIL_EASE = [0.2, 0.8, 0.2, 1] as const;

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
          <span>©2026</span>
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
              <i aria-hidden="true">•••</i>
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

      <PreviewBack />
    </main>
  );
}

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
          <a className="work-template-back" href="/library/sections/selected-works">
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

      <PreviewBack />
    </main>
  );
}

function detailEnter(shouldReduceMotion: boolean | null, delay: number) {
  return {
    initial: shouldReduceMotion ? false : { opacity: 0, y: 22, clipPath: "inset(0 0 20% 0)" },
    animate: { opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" },
    transition: { duration: 0.72, delay: shouldReduceMotion ? 0 : delay, ease: DETAIL_EASE },
  };
}

function detailReveal(shouldReduceMotion: boolean | null, delay: number) {
  return {
    initial: shouldReduceMotion ? false : { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.7, delay: shouldReduceMotion ? 0 : delay, ease: DETAIL_EASE },
  };
}

function PreviewBack() {
  return (
    <a className="selected-works-library-back" href="/#library">
      <span className="selected-works-library-back-icon" aria-hidden="true">
        <ArrowLeft size={13} strokeWidth={2} />
      </span>
      Back to library
    </a>
  );
}
