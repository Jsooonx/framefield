"use client";

import { ArrowLeft, ArrowUpRight } from "lucide-react";
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

export function PreviewBack() {
  return (
    <a className="selected-works-library-back" href="/#library">
      <span className="selected-works-library-back-icon" aria-hidden="true">
        <ArrowLeft size={13} strokeWidth={2} />
      </span>
      Back to library
    </a>
  );
}
