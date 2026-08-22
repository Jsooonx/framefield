"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import "./kinform-hero.css";

const HERO_POSTER = "/library/sections/kinform-spatial-hero/hero-poster.webp";
const KINFORM_EASE = [0.16, 1, 0.3, 1] as const;
const KINFORM_NAV_ITEMS = ["Approach", "Residences", "Hospitality"] as const;

export function KinformHero() {
  const prefersReducedMotion = useReducedMotion();
  const reduceMotion = prefersReducedMotion ?? false;
  const [menuOpen, setMenuOpen] = useState(false);

  function entrance(delay: number, y = 14, blur = 0) {
    return {
      initial: {
        opacity: 0,
        y: reduceMotion ? 0 : y,
        filter: reduceMotion || blur === 0 ? "blur(0px)" : `blur(${blur}px)`,
      },
      animate: { opacity: 1, y: 0, filter: "blur(0px)" },
      transition: {
        delay: reduceMotion ? 0 : delay,
        duration: reduceMotion ? 0 : 0.48,
        ease: KINFORM_EASE,
      },
    };
  }

  function headlineEntrance(delay: number) {
    return {
      initial: {
        opacity: 0,
        y: reduceMotion ? 0 : 42,
        clipPath: reduceMotion ? "inset(0 0 0 0)" : "inset(0 0 115% 0)",
      },
      animate: { opacity: 1, y: 0, clipPath: "inset(0 0 0 0)" },
      transition: {
        delay: reduceMotion ? 0 : delay,
        duration: reduceMotion ? 0 : 0.7,
        ease: KINFORM_EASE,
      },
    };
  }

  useEffect(() => {
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setMenuOpen(false);
    }

    document.addEventListener("keydown", closeOnEscape);
    document.body.style.overflow = menuOpen ? "hidden" : "";

    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <main className="kinform-hero">
      <section className="kinform-hero__canvas" id="kinform-top" aria-label="KINFORM spatial studio Hero preview">
        <motion.div
          className="kinform-hero__media"
          aria-hidden="true"
          initial={{ opacity: 0, scale: reduceMotion ? 1 : 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: reduceMotion ? 0 : 0.9, ease: KINFORM_EASE }}
        >
          <img src={HERO_POSTER} alt="" />
          <div className="kinform-hero__scrim" />
        </motion.div>

        <motion.header className="kinform-hero__header" {...entrance(0.07, -8)}>
          <a className="kinform-hero__brand" href="#kinform-top" aria-label="KINFORM home">
            KINFORM
          </a>
          <nav className="kinform-hero__desktop-nav" aria-label="KINFORM navigation">
            {KINFORM_NAV_ITEMS.map((item) => (
              <a href="#kinform-top" key={item}>{item}</a>
            ))}
          </nav>
          <div className="kinform-hero__header-actions">
            <a className="kinform-hero__inquire" href="mailto:hello@kinform.studio">Inquire</a>
            <button
              className="kinform-hero__menu-toggle"
              type="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="kinform-menu"
              onClick={() => setMenuOpen((isOpen) => !isOpen)}
            >
              {menuOpen ? <X size={18} /> : <Menu size={19} />}
            </button>
          </div>
        </motion.header>

        <div className="kinform-hero__content">
          <motion.p className="kinform-hero__descriptor" {...entrance(0.16, 8)}>
            Spatial studio — residences and hospitality
          </motion.p>
          <motion.h1 className="kinform-hero__headline" {...entrance(0.22, 0)}>
            <span className="kinform-hero__headline-line"><motion.span {...headlineEntrance(0.22)}>Spaces with</motion.span></span>
            <span className="kinform-hero__headline-line"><motion.span {...headlineEntrance(0.3)}>a longer memory.</motion.span></span>
          </motion.h1>
        </div>

        <motion.div className="kinform-hero__actions" {...entrance(0.7, 16, 5)}>
          <p>KINFORM shapes residential and hospitality interiors into calm, durable experiences built around how people arrive, pause, and return.</p>
          <div className="kinform-hero__cta-row">
            <a className="kinform-hero__cta kinform-hero__cta--primary" href="#kinform-top">
              View selected spaces <ArrowUpRight size={16} aria-hidden="true" />
            </a>
            <a className="kinform-hero__cta kinform-hero__cta--secondary" href="mailto:hello@kinform.studio">
              Start a project
            </a>
          </div>
        </motion.div>

        <motion.div className="kinform-hero__baseline" aria-hidden="true" {...entrance(0.93, 0)} />

        <AnimatePresence initial={false}>
          {menuOpen && (
            <motion.div
              className="kinform-hero__menu-layer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.2, ease: KINFORM_EASE }}
            >
              <button className="kinform-hero__menu-backdrop" type="button" aria-label="Close menu" onClick={() => setMenuOpen(false)} />
              <motion.nav
                className="kinform-hero__menu"
                id="kinform-menu"
                aria-label="KINFORM mobile navigation"
                initial={{ y: reduceMotion ? 0 : -12, filter: reduceMotion ? "blur(0px)" : "blur(5px)" }}
                animate={{ y: 0, filter: "blur(0px)" }}
                exit={{ y: reduceMotion ? 0 : -12, filter: reduceMotion ? "blur(0px)" : "blur(5px)" }}
                transition={{ duration: reduceMotion ? 0 : 0.28, ease: KINFORM_EASE }}
              >
                {KINFORM_NAV_ITEMS.map((item) => (
                  <a href="#kinform-top" key={item} onClick={() => setMenuOpen(false)}>{item}</a>
                ))}
              </motion.nav>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      <motion.a className="kinform-hero__back" href="/#library" {...entrance(0.96, 8)}>
        <span className="kinform-hero__back-icon" aria-hidden="true"><ArrowLeft size={13} strokeWidth={2} /></span>
        Back to library
      </motion.a>
    </main>
  );
}
