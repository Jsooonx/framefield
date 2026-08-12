"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { type SelectedWork } from "../metadata";
import { detailEnter, detailReveal } from "./selected-works-motion";
import { PreviewBack } from "./SelectedWorksPreview";

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

      <PreviewBack />
    </main>
  );
}
