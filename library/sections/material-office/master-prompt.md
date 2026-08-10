# MASTER PROMPT — Material Office exact code rebuild

Build the Material Office page by following the canonical implementation below. This is a code-first prompt, not a prose design brief. The supplied TSX and CSS are the source of truth. Copy the structure, class names, values, timing, easing, breakpoints, DOM order, and interaction logic exactly. Do not simplify, reinterpret, refactor, or replace the code with an approximation.

The result must be a standalone Material Office page that can be placed in any React/Next.js project. It does not require the original repository. The only external dependencies are the listed npm packages and the hosted media assets below.

## 1. Required stack

- Next.js App Router with React and TypeScript.
- motion/react.
- lucide-react.
- CSS imported by the component and scoped under .material-office.
- If the target repository already has an equivalent setup, preserve it and adapt only the entry-point import.

## 2. Hosted assets — use these exact URLs

- Poster: https://assets.framefield.my.id/sections/material-office/hero-poster.webp
- Primary video: https://assets.framefield.my.id/sections/material-office/hero-video.mp4
- WebM fallback: https://assets.framefield.my.id/sections/material-office/hero-video.webm

The poster and both videos are already hosted and must be used directly. Do not recreate the material visual with CSS, SVG, gradients, stock imagery, or a new generated image. Keep the MP4 as the first source. The hero MP4 is H.264, 1280x720, 24 fps, approximately 8 seconds, and approximately 1.81 MB.

## 3. Required files

Create these files, or place the same code in equivalent files without changing the component internals:

- src/components/MaterialOffice.tsx
- src/components/material-office.css

Render MaterialOffice as a full viewport page. The page shell may be adapted to the host application, but the component DOM, CSS selectors, media behavior, timing values, and responsive rules below are canonical.

## 4. Host adapter rules

- Keep the hosted asset URLs exactly as written.
- The prompt-copy utility may read the prompt from /master-prompt.md in the host project, or may be replaced by the host application’s own prompt-copy mechanism without changing the visual layout.
- The Back to library href in the code block is a neutral host adapter. Replace only its destination if the host application needs another return URL; do not alter its position, dimensions, styling, icon, or entrance timing.
- Do not add a different navbar, footer, CMS, authentication, database, payment flow, or unrelated sections.

## 5. Canonical implementation

Use the following TSX verbatim. Do not change class names, DOM order, constants, delays, easing arrays, menu behavior, asset URLs, or accessibility attributes unless the host adapter rules explicitly allow it.

```tsx
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
const MASTER_PROMPT_URL = "/master-prompt.md";

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
            MATERIAL<sup>Â®</sup>
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
            MATERIAL<sup>Â®</sup>
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

        <motion.a className="material-office__back" href="#material-office-top" {...entrance(0.98, 8)}>
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
                  <span>MATERIAL<sup>Â®</sup></span>
                  <span className="material-office__menu-count" aria-hidden="true">INDEX 01â€”05</span>
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
```

## 6. Canonical stylesheet

Use the following CSS verbatim. Do not change dimensions, colors, breakpoints, z-index values, transitions, typography values, or selectors. The stylesheet is intentionally scoped so it can be dropped into another project safely.

```css
.material-office {
  min-height: 100svh;
  padding: clamp(10px, 1.6vw, 24px);
  color: #f3f0e7;
  background: #101214;
  font-family: Manrope, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
}

.material-office *,
.material-office *::before,
.material-office *::after {
  box-sizing: border-box;
}

.material-office__canvas {
  position: relative;
  isolation: isolate;
  display: grid;
  min-height: calc(100svh - clamp(20px, 3.2vw, 48px));
  overflow: hidden;
  border-radius: 28px;
  background: #1d1b18;
}

.material-office__media,
.material-office__poster,
.material-office__video,
.material-office__shade {
  position: absolute;
  inset: 0;
}

.material-office__poster,
.material-office__video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.material-office__poster {
  filter: saturate(0.28) contrast(1.12) brightness(0.68);
}

.material-office__video {
  z-index: 1;
}

.material-office__shade {
  z-index: 2;
  background: linear-gradient(120deg, rgba(5, 6, 6, 0.64) 0%, rgba(5, 6, 6, 0.1) 54%, rgba(5, 6, 6, 0.46) 100%);
}

.material-office__header,
.material-office__hero,
.material-office__services,
.material-office__statement,
.material-office__actions,
.material-office__availability,
.material-office__back {
  position: relative;
  z-index: 4;
}

.material-office__header {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  padding: 24px 28px;
}

.material-office__brand,
.material-office__menu-header span {
  color: inherit;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: -0.055em;
  text-decoration: none;
}

.material-office sup {
  position: relative;
  top: -0.55em;
  margin-left: 0.04em;
  font-size: 0.28em;
  letter-spacing: 0;
}

.material-office__desktop-nav {
  display: flex;
  gap: clamp(22px, 3vw, 46px);
  align-items: center;
}

.material-office__desktop-nav a,
.material-office__menu-footer a {
  color: inherit;
  font-size: 12px;
  text-decoration: none;
}

.material-office__desktop-nav a {
  opacity: 0.78;
  transition: opacity 160ms ease;
}

.material-office__desktop-nav a:hover { opacity: 1; }

.material-office__menu-toggle,
.material-office__menu-header button {
  display: grid;
  width: 44px;
  height: 44px;
  padding: 0;
  place-items: center;
  border: 0;
  border-radius: 50%;
  color: inherit;
  background: transparent;
  cursor: pointer;
  transition: background-color 160ms ease, color 160ms ease, transform 160ms ease;
}

.material-office__menu-toggle { justify-self: end; }

.material-office__menu-toggle:hover,
.material-office__menu-header button:hover {
  color: #101214;
  background: #f3f0e7;
}

.material-office__menu-toggle:active,
.material-office__menu-header button:active { transform: scale(0.96); }

.material-office a:focus-visible,
.material-office button:focus-visible {
  outline: 2px solid #c8ff4a;
  outline-offset: 4px;
}

.material-office__hero {
  align-self: center;
  margin-top: clamp(6px, 7vh, 78px);
  padding: 0 clamp(24px, 3.7vw, 56px);
}

.material-office__superline {
  margin: 0 0 12px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.06em;
  opacity: 0.7;
  text-transform: uppercase;
}

.material-office__hero h1 {
  max-width: min-content;
  margin: 0 0 0 -0.08em;
  font-size: clamp(4.4rem, 15.8vw, 16.4rem);
  font-weight: 700;
  line-height: 0.72;
  letter-spacing: -0.075em;
  text-wrap: balance;
}

.material-office__hero h1 span {
  display: block;
  margin-top: 0.16em;
  margin-left: 0.18em;
  font-size: 0.32em;
  letter-spacing: -0.07em;
}

.material-office__services {
  position: absolute;
  top: 26%;
  right: clamp(24px, 4.3vw, 66px);
  display: grid;
  gap: 7px;
  margin: 0;
  padding: 0;
  font-size: clamp(11px, 1vw, 14px);
  font-weight: 600;
  line-height: 1.25;
  list-style: none;
}

.material-office__statement {
  position: absolute;
  bottom: clamp(30px, 5vw, 64px);
  left: clamp(24px, 3.7vw, 56px);
  max-width: 31ch;
  margin: 0;
  font-size: clamp(15px, 1.35vw, 20px);
  line-height: 1.1;
  letter-spacing: -0.045em;
  text-wrap: pretty;
}

.material-office__actions {
  position: absolute;
  right: clamp(24px, 3.7vw, 56px);
  bottom: clamp(30px, 5vw, 64px);
  display: flex;
  gap: 10px;
  align-items: stretch;
}

.material-office__prompt-copy {
  display: inline-flex;
  min-width: 132px;
  gap: 9px;
  align-items: center;
  justify-content: center;
  padding: 16px 17px;
  border: 1px solid rgba(243, 240, 231, 0.38);
  border-radius: 15px;
  color: #f3f0e7;
  background: rgba(16, 18, 20, 0.5);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.18);
  backdrop-filter: blur(14px);
  font: inherit;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: -0.03em;
  cursor: pointer;
  transition: border-color 180ms ease, background-color 180ms ease, color 180ms ease, transform 180ms ease;
}

.material-office__prompt-copy:hover,
.material-office__prompt-copy:focus-visible {
  border-color: #f3f0e7;
  color: #101214;
  background: #f3f0e7;
}

.material-office__prompt-copy:active { transform: scale(0.98); }
.material-office__prompt-copy:disabled { cursor: wait; opacity: 0.7; }

.material-office__availability {
  display: grid;
  min-width: min(288px, calc(100% - 48px));
  grid-template-columns: auto 1fr auto;
  gap: 14px;
  align-items: center;
  padding: 16px 17px;
  border-radius: 15px;
  color: #101214;
  background: #f3f0e7;
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.22);
}

.material-office__availability-signal {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #c8ff4a;
  box-shadow: 0 0 0 4px rgba(200, 255, 74, 0.24);
}

.material-office__availability p,
.material-office__availability strong { display: block; }
.material-office__availability p { margin: 0 0 4px; font-size: 10px; font-weight: 600; letter-spacing: 0.03em; text-transform: uppercase; }
.material-office__availability strong { font-size: 14px; letter-spacing: -0.04em; }

.material-office__back {
  position: absolute;
  right: clamp(24px, 3.7vw, 56px);
  bottom: 14px;
  display: inline-flex;
  gap: 9px;
  align-items: center;
  padding: 5px 11px 5px 6px;
  border: 1px solid rgba(243, 240, 231, 0.28);
  border-radius: 999px;
  color: inherit;
  background: rgba(16, 18, 20, 0.46);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.18);
  backdrop-filter: blur(14px);
  font-size: 10px;
  font-weight: 600;
  letter-spacing: -0.02em;
  text-decoration: none;
  transition: border-color 180ms ease, background-color 180ms ease, color 180ms ease;
}

.material-office__back:hover,
.material-office__back:focus-visible {
  border-color: rgba(243, 240, 231, 0.58);
  color: #c8ff4a;
  background: rgba(16, 18, 20, 0.72);
}

.material-office__back-icon {
  display: grid;
  width: 22px;
  height: 22px;
  place-items: center;
  border: 1px solid rgba(243, 240, 231, 0.48);
  border-radius: 50%;
  color: #c8ff4a;
  background: rgba(200, 255, 74, 0.08);
  transition: border-color 180ms ease, background-color 180ms ease, transform 220ms cubic-bezier(0.22, 1, 0.36, 1);
}

.material-office__back:hover .material-office__back-icon,
.material-office__back:focus-visible .material-office__back-icon {
  border-color: rgba(200, 255, 74, 0.72);
  background: rgba(200, 255, 74, 0.16);
  transform: translateX(-2px);
}

.material-office__menu-layer {
  position: absolute;
  z-index: 10;
  inset: 0;
}

.material-office__menu-backdrop {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  padding: 0;
  border: 0;
  background: rgba(5, 6, 6, 0.32);
  cursor: pointer;
}

.material-office__menu {
  position: absolute;
  z-index: 1;
  inset: 0;
  display: grid;
  grid-template-rows: auto minmax(0, 1fr);
  padding: 24px 28px;
  color: #101214;
  background: #f3f0e7;
}

.material-office__menu-header {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
}

.material-office__menu-header button { color: #101214; }

.material-office__menu-header button { justify-self: end; }

.material-office__menu-count {
  justify-self: center;
  color: rgba(16, 18, 20, 0.56);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.07em;
}

.material-office__menu-layout {
  display: grid;
  min-height: 0;
  grid-template-columns: minmax(0, 7fr) minmax(220px, 3fr);
  grid-template-rows: minmax(0, 1fr) auto;
  gap: clamp(24px, 3vw, 48px);
  padding-top: clamp(28px, 5vw, 72px);
}

.material-office__menu-index {
  min-width: 0;
}

.material-office__menu-links {
  display: grid;
  align-content: center;
  justify-items: start;
  gap: clamp(0px, 0.45vw, 4px);
  padding: 0;
}

.material-office__menu-link {
  display: grid;
  width: 100%;
  grid-template-columns: 44px auto;
  gap: clamp(14px, 2vw, 30px);
  align-items: baseline;
  color: #101214;
  font-size: clamp(3rem, 5.3vw, 5.8rem);
  font-weight: 700;
  line-height: 0.9;
  letter-spacing: -0.035em;
  text-decoration: none;
}

.material-office__menu-sequence {
  color: rgba(16, 18, 20, 0.4);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.08em;
  line-height: 1;
  font-variant-numeric: tabular-nums;
  transition: color 180ms ease;
}

.material-office__menu-label {
  display: inline-block;
  width: fit-content;
  justify-self: start;
  color: #101214;
  transition: color 180ms ease, transform 220ms cubic-bezier(0.22, 1, 0.36, 1);
}

.material-office__menu-link:has(.material-office__menu-label:hover) .material-office__menu-label,
.material-office__menu-link:focus-visible .material-office__menu-label {
  color: rgba(16, 18, 20, 0.54);
  transform: translateX(6px);
}

.material-office__menu-utility {
  display: grid;
  grid-column: 1;
  grid-row: 2;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;
  padding-top: 18px;
  border-top: 1px solid rgba(16, 18, 20, 0.14);
  font-size: 12px;
}

.material-office__menu-utility > div { display: grid; gap: 6px; align-content: start; }
.material-office__menu-utility > div:last-child { display: flex; gap: 22px; align-items: start; justify-content: end; }

.material-office__menu-strip {
  position: relative;
  grid-column: 2;
  grid-row: 1 / span 2;
  min-height: 0;
  overflow: hidden;
  border: 1px solid #101214;
  border-radius: 15px;
  background: #161515;
}

.material-office__menu-strip::after {
  position: absolute;
  inset: 0;
  content: "";
  background: linear-gradient(180deg, rgba(5, 6, 6, 0.08), rgba(5, 6, 6, 0.56));
}

.material-office__menu-strip img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: saturate(0.2) contrast(1.08) brightness(0.68);
}

.material-office__menu-utility a { color: inherit; font-size: inherit; }

@media (max-width: 720px) {
  .material-office__canvas { min-height: calc(100svh - 20px); border-radius: 20px; }
  .material-office__header { grid-template-columns: 1fr auto; padding: 18px 18px; }
  .material-office__desktop-nav { display: none; }
  .material-office__hero { align-self: start; margin-top: clamp(70px, 15vh, 130px); padding: 0 20px; }
  .material-office__hero h1 { font-size: clamp(4rem, 20vw, 6.6rem); line-height: 0.76; }
  .material-office__hero h1 span { margin-left: 0.18em; }
  .material-office__services { position: relative; top: auto; right: auto; align-self: end; margin: 0 20px 168px; gap: 4px; }
  .material-office__statement { right: 20px; bottom: 88px; left: 20px; font-size: 16px; }
  .material-office__actions { right: 20px; bottom: 18px; left: 20px; gap: 8px; }
  .material-office__prompt-copy { min-width: 0; padding: 15px 14px; }
  .material-office__availability { min-width: 0; flex: 1; padding: 15px 14px; }
  .material-office__back { right: 20px; bottom: 128px; }
  .material-office__menu { padding: 18px 20px; }
  .material-office__menu-count { display: none; }
  .material-office__menu-layout { grid-template-columns: 1fr; grid-template-rows: minmax(0, 1fr) 112px auto; gap: 18px; padding-top: 24px; }
  .material-office__menu-index { grid-template-columns: 1fr; }
  .material-office__menu-link { grid-template-columns: 32px auto; gap: 12px; font-size: clamp(3.1rem, 16vw, 4.8rem); }
  .material-office__menu-utility { grid-column: 1; grid-row: 3; gap: 14px; padding-top: 14px; }
  .material-office__menu-utility > div:last-child { gap: 16px; justify-content: start; }
  .material-office__menu-strip { grid-column: 1; grid-row: 2; border-radius: 12px; }
}

@media (min-width: 900px) {
  .material-office__menu-header {
    grid-template-columns: 1fr auto;
  }

  .material-office__menu {
    left: auto;
    width: 34vw;
    max-width: 520px;
    padding: 24px;
    box-shadow: -18px 0 36px rgba(5, 6, 6, 0.16);
  }

  .material-office__menu-count { display: none; }

  .material-office__menu-layout {
    grid-template-columns: 1fr;
    grid-template-rows: minmax(0, 1fr) auto;
    gap: 20px;
    padding-top: 38px;
  }

  .material-office__menu-link {
    grid-template-columns: 32px auto;
    gap: 14px;
    font-size: clamp(2.2rem, 3.2vw, 3.5rem);
  }

  .material-office__menu-strip { display: none; }

  .material-office__menu-utility {
    grid-column: 1;
    grid-row: 2;
    gap: 14px;
    padding-top: 14px;
  }

  .material-office__menu-utility > div:last-child {
    gap: 16px;
    justify-content: start;
  }
}

@media (prefers-reduced-motion: reduce) {
  .material-office__video { display: none; }
  .material-office *, .material-office *::before, .material-office *::after {
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
  }
}
```

## 7. Non-negotiable acceptance criteria

- The page uses the exact hosted poster, MP4, and WebM assets.
- The MP4 source appears before the WebM source.
- The hero canvas fills the viewport with the exact rounded frame and dark overlay.
- The header stays pinned to the top edge.
- MATERIAL and OFFICE use the exact wordmark hierarchy and optical alignment from the code.
- The services, statement, availability card, Copy Prompt control, and Back to library control retain their exact positions and timing.
- The menu is a right-side drawer on desktop and uses the exact backdrop, close, Escape, body-scroll-lock, stagger, and mirrored exit behavior.
- Menu hover affects only the visible label text.
- No horizontal overflow appears at the desktop and mobile target viewports.
- Reduced-motion mode hides the moving video and retains the stable poster layout.
- Do not claim pixel-perfect completion until the page has been checked at 1440x960 and 390x844.
