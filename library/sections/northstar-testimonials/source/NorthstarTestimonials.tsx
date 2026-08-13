"use client";

import { ArrowUpRight, MoveUpRight, Star } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { NORTHSTAR_TESTIMONIALS } from "../metadata";
import { MetricCounter, NORTHSTAR_EASE, NorthstarBack } from "./northstar-motion";
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
          <img className="northstar-confidence-art" src="/library/sections/northstar-testimonials/atlas-house-portrait.webp" alt="" aria-hidden="true" />
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
          <div className="northstar-card-media-tile" aria-hidden="true"><img src="/library/sections/northstar-testimonials/cobalt-data-field.webp" alt="" /></div>
          <div className="northstar-person"><span className="northstar-initials">{mira.initials}</span><div><strong>{mira.name}</strong><small>{mira.role}</small></div></div>
          <StarRating />
          <p>“{mira.quote}”</p>
        </motion.article>

        <motion.article className="northstar-card northstar-card--statement" {...reveal(reduced, 0.32)}>
          <img className="northstar-statement-image" src="/library/sections/northstar-testimonials/performance-orbit.webp" alt="" aria-hidden="true" />
          <p>“A cleaner system. A faster way from intent to action.”</p>
          <span>— fictional client signal</span>
        </motion.article>

        <motion.article className="northstar-card northstar-card--quote-two" {...reveal(reduced, 0.39)}>
          <div className="northstar-person"><span className="northstar-initials northstar-initials--blue">{theo.initials}</span><div><strong>{theo.name}</strong><small>{theo.role}</small></div></div>
          <p>“{theo.quote}”</p>
          <div className="northstar-quote-footer"><StarRating /><small>Illustrative review</small></div>
        </motion.article>

        <motion.a className="northstar-card northstar-card--cta" href="#metrics" {...reveal(reduced, 0.46)}>
          <span>See the signals behind the work</span><ArrowUpRight size={23} aria-hidden="true" />
        </motion.a>

        <motion.article className="northstar-card northstar-card--note" {...reveal(reduced, 0.53)}>
          <img className="northstar-note-image" src="/library/sections/northstar-testimonials/pipeline-texture.webp" alt="" aria-hidden="true" />
          <MoveUpRight size={18} aria-hidden="true" />
          <p>{ari.quote}</p>
          <small>{ari.name} · fictional feedback</small>
        </motion.article>
      </section>
      <NorthstarMetrics />
      <NorthstarBack />
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
