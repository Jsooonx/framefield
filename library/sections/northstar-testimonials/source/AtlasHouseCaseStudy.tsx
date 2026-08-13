"use client";

import { ArrowUpRight, ChevronLeft } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { ATLAS_HOUSE_CASE_STUDY } from "../metadata";
import { MetricCounter, NORTHSTAR_EASE, NorthstarBack } from "./northstar-motion";
import "./northstar-testimonials.css";

const enter = (reduced: boolean | null, delay: number) => ({
  initial: reduced ? false : { opacity: 0, y: 20, filter: "blur(7px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  transition: { duration: 0.68, delay: reduced ? 0 : delay, ease: NORTHSTAR_EASE },
});

export function AtlasHouseCaseStudy() {
  const reduced = useReducedMotion();
  return (
    <main className="northstar-shell northstar-case-page">
      <motion.div className="northstar-wordmark" {...enter(reduced, 0.03)}>NORTHSTAR</motion.div>
      <section className="northstar-case-head">
        <motion.div {...enter(reduced, 0.1)}><span>{ATLAS_HOUSE_CASE_STUDY.fictionalLabel}</span><h1>{ATLAS_HOUSE_CASE_STUDY.title}</h1><p>Making a considered home-goods collection easier to discover, understand, and choose.</p></motion.div>
        <motion.a href={ATLAS_HOUSE_CASE_STUDY.signalsRoute} {...enter(reduced, 0.17)}><ChevronLeft size={17} />Return to the signals</motion.a>
      </section>
      <section className="northstar-case-grid">
        <motion.figure className="northstar-case-image" {...enter(reduced, 0.23)}><img src={ATLAS_HOUSE_CASE_STUDY.portrait} alt="Original editorial portrait for the fictional Atlas House case study" /><figcaption>Atlas House campaign direction · original generated visual</figcaption></motion.figure>
        <motion.div className="northstar-case-story" {...enter(reduced, 0.3)}><p className="northstar-case-quote">“{ATLAS_HOUSE_CASE_STUDY.quote}”</p><span>{ATLAS_HOUSE_CASE_STUDY.author} · fictional</span><p>Atlas House had the right objects and a loyal audience, but discovery stalled between editorial interest and product clarity. We rebuilt the entry points around collection intent, delivery confidence, and a lighter decision path.</p></motion.div>
        <motion.div className="northstar-case-outcomes" {...enter(reduced, 0.37)}><article><MetricCounter value={48} prefix="+" suffix="%" /><span>faster first view</span></article><article><MetricCounter value={42} prefix="+" suffix="%" /><span>illustrative conversion lift</span></article><article><MetricCounter value={61} prefix="+" suffix="%" /><span>qualified pipeline</span></article></motion.div>
        <motion.a className="northstar-case-next" href={ATLAS_HOUSE_CASE_STUDY.signalsRoute} {...enter(reduced, 0.44)}>See the full result field <ArrowUpRight size={20} /></motion.a>
      </section>
      <NorthstarBack />
    </main>
  );
}
