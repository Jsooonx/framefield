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
        <p>We shape the path between attention and action—then remove the friction that keeps good intent from becoming qualified demand.</p>
      </section>

      <section className="northstar-results-grid" aria-label="Illustrative NORTHSTAR results">
        <motion.a className="northstar-result-card northstar-result-card--atlas" href={ATLAS_HOUSE_CASE_STUDY.route} {...inView(reduced, 0.06)}>
          <img src={ATLAS_HOUSE_CASE_STUDY.portrait} alt="Original editorial portrait created for the fictional Atlas House case study" />
          <div><span>{ATLAS_HOUSE_CASE_STUDY.fictionalLabel}</span><h2>{ATLAS_HOUSE_CASE_STUDY.title}</h2><p>Faster discovery, a more decisive collection story.</p><strong>Open study <ArrowUpRight size={17} /></strong></div>
        </motion.a>
        <motion.article className="northstar-result-card northstar-result-card--conversion" {...inView(reduced, 0.13)}>
          <img src="/library/sections/northstar-testimonials/cobalt-data-field.webp" alt="Abstract cobalt conversion data field" />
          <span>Experience signal</span>
          <h2 className="northstar-conversion-headline">
            <span className="northstar-conversion-line">Page speed <MetricCounter value={48} prefix="+" suffix="%" /></span>
            <span className="northstar-conversion-line">conversion lift <MetricCounter value={42} prefix="+" suffix="%" /></span>
          </h2>
          <p>Illustrative before / after outcome from a redesigned discovery path.</p>
          <strong className="northstar-conversion-before-after"><MetricCounter value={2.9} suffix="%" /> <MoveUpRight size={18} /> <MetricCounter value={4.1} suffix="%" /></strong>
        </motion.article>
        <motion.article className="northstar-result-card northstar-result-card--score" {...inView(reduced, 0.2)}>
          <img src="/library/sections/northstar-testimonials/performance-orbit.webp" alt="Abstract monochrome performance orbit" />
          <div className="northstar-performance-score"><MetricCounter value={98} /><span>Performance<br />score</span></div>
        </motion.article>
        <motion.article className="northstar-result-card northstar-result-card--pipeline" {...inView(reduced, 0.27)}>
          <img src="/library/sections/northstar-testimonials/pipeline-texture.webp" alt="Abstract cobalt pipeline texture" />
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
