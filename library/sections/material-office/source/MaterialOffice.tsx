"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowUpRight, Copy, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import "./material-office.css";

const HERO_POSTER = "https://assets.framefield.my.id/sections/material-office/hero-poster.webp";
const HERO_VIDEO = {
  mp4: "https://assets.framefield.my.id/sections/material-office/hero-video.mp4",
  webm: "https://assets.framefield.my.id/sections/material-office/hero-video.webm",
  available: true,
};
const MASTER_PROMPT_URL = "/library/sections/material-office/master-prompt.md";

const MENU_ITEMS = ["Home", "Studio", "Projects", "Notes", "Contact"];
const SERVICES = [
  "Brand Systems",
  "Digital Experiences",
  "Motion Direction",
  "Editorial Web",
];

const ENTRANCE_EASE = [0.22, 1, 0.36, 1] as const;

export function MaterialOffice() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [promptState, setPromptState] = useState<"idle" | "copying" | "copied" | "error">("idle");
  const prefersReducedMotion = useReducedMotion();
  const reduceMotion = prefersReducedMotion ?? false;

  function entrance(delay: number, y = 14) {
    return {
      initial: { opacity: 0, y: reduceMotion ? 0 : y },
      animate: { opacity: 1, y: 0 },
      transition: {
        delay: reduceMotion ? 0 : delay,
        duration: reduceMotion ? 0 : 0.58,
        ease: ENTRANCE_EASE,
      },
    };
  }

  useEffect(() => {
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    }

    document.addEventListener("keydown", closeOnEscape);
    document.body.style.overflow = menuOpen ? "hidden" : "";

    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  function handleKeyDown(event: React.KeyboardEvent<HTMLElement>) {
    if (event.key === "Escape") {
      setMenuOpen(false);
    }
  }

  async function copyMasterPrompt() {
    if (promptState === "copying") return;

    setPromptState("copying");

    try {
      const response = await fetch(MASTER_PROMPT_URL);
      if (!response.ok) throw new Error("Unable to load master prompt");

      const prompt = await response.text();
      if (!navigator.clipboard?.writeText) throw new Error("Clipboard unavailable");

      await navigator.clipboard.writeText(prompt);
      setPromptState("copied");
      window.setTimeout(() => setPromptState("idle"), 1800);
    } catch {
      setPromptState("error");
      window.setTimeout(() => setPromptState("idle"), 2200);
    }
  }

  return (
    <main className="material-office" onKeyDown={handleKeyDown}>
      <section className="material-office__canvas" aria-label="Material Office hero preview">
        <div className="material-office__media" aria-hidden="true">
          <img src={HERO_POSTER} alt="" className="material-office__poster" />
          {HERO_VIDEO.available && (
            <video
              className="material-office__video"
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              poster={HERO_POSTER}
            >
                  <source src={HERO_VIDEO.mp4} type="video/mp4" />
                  <source src={HERO_VIDEO.webm} type="video/webm" />
            </video>
          )}
          <div className="material-office__shade" />
        </div>

        <motion.header className="material-office__header" {...entrance(0.12, -8)}>
          <a className="material-office__brand" href="#material-office-top" aria-label="Material Office home">
            MATERIAL<sup>®</sup>
          </a>
          <nav className="material-office__desktop-nav" aria-label="Material Office navigation">
            {MENU_ITEMS.slice(1).map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`}>
                {item}
              </a>
            ))}
          </nav>
          <button
            className="material-office__menu-toggle"
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="material-office-menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span>{menuOpen ? <X size={21} strokeWidth={1.8} /> : <Menu size={22} strokeWidth={1.8} />}</span>
          </button>
        </motion.header>

        <div className="material-office__hero" id="material-office-top">
          <motion.p className="material-office__superline" {...entrance(0.28, 10)}>
            Independent design practice
          </motion.p>
          <motion.h1 {...entrance(0.38, 18)}>
            MATERIAL<sup>®</sup>
            <span>OFFICE</span>
          </motion.h1>
        </div>

        <motion.ul className="material-office__services" aria-label="Services" {...entrance(0.56, 10)}>
          {SERVICES.map((service, index) => (
            <motion.li key={service} {...entrance(0.60 + index * 0.055, 8)}>
              {service}
            </motion.li>
          ))}
        </motion.ul>

        <motion.p className="material-office__statement" {...entrance(0.76, 10)}>
          A studio for brands with a physical point of view.
        </motion.p>

        <motion.div className="material-office__actions" {...entrance(0.88, 12)}>
          <button
            className="material-office__prompt-copy"
            type="button"
            onClick={copyMasterPrompt}
            disabled={promptState === "copying"}
          >
            <Copy size={15} strokeWidth={1.8} aria-hidden="true" />
            {promptState === "copied" ? "Copied" : promptState === "error" ? "Try again" : "Copy Prompt"}
          </button>
          <aside className="material-office__availability" aria-label="Availability">
            <span className="material-office__availability-signal" aria-hidden="true" />
            <div>
              <p>Now booking / Q4 2026</p>
              <strong>Select collaborations</strong>
            </div>
            <ArrowUpRight size={17} aria-hidden="true" />
          </aside>
        </motion.div>

        <motion.a className="material-office__back" href="/#library" {...entrance(0.98, 8)}>
          <span className="material-office__back-icon" aria-hidden="true">
            <ArrowLeft size={13} strokeWidth={2} />
          </span>
          Back to library
        </motion.a>

        <AnimatePresence initial={false}>
          {menuOpen && (
            <motion.div
              className="material-office__menu-layer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            >
              <button
                className="material-office__menu-backdrop"
                type="button"
                aria-label="Close menu"
                onClick={() => setMenuOpen(false)}
              />
              <motion.div
                id="material-office-menu"
                className="material-office__menu material-office__menu-panel"
                role="dialog"
                aria-modal="true"
                aria-label="Material Office menu"
                initial={{ x: "100%" }}
                animate={{ x: "0%" }}
                exit={{ x: "100%" }}
                transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="material-office__menu-header">
                  <span>MATERIAL<sup>®</sup></span>
                  <span className="material-office__menu-count" aria-hidden="true">INDEX 01—05</span>
                  <button type="button" onClick={() => setMenuOpen(false)} aria-label="Close menu">
                    <X size={21} strokeWidth={1.8} />
                  </button>
                </div>
                <div className="material-office__menu-layout">
                  <div className="material-office__menu-index">
                    <nav className="material-office__menu-links" aria-label="Menu links">
                      {MENU_ITEMS.map((item, index) => (
                        <motion.a
                          key={item}
                          className="material-office__menu-link"
                          href={`#${item.toLowerCase()}`}
                          initial={{ opacity: 0, y: 16 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 + index * 0.045, duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                          onClick={() => setMenuOpen(false)}
                        >
                          <span className="material-office__menu-sequence">{String(index + 1).padStart(2, "0")}</span>
                          <span className="material-office__menu-label">{item}</span>
                        </motion.a>
                      ))}
                    </nav>
                  </div>
                  <div className="material-office__menu-strip" aria-hidden="true">
                    <img src={HERO_POSTER} alt="" />
                  </div>
                  <div className="material-office__menu-utility">
                    <div>
                      <span>Jakarta / Global</span>
                      <a href="mailto:hello@materialoffice.studio">hello@materialoffice.studio</a>
                    </div>
                    <div>
                      <a href="#privacy">Privacy</a>
                      <a href="#terms">Terms</a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </main>
  );
}
