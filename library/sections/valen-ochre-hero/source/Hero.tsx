"use client";

import React, { useState } from "react";
import {
  motion,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from "motion/react";
import { ArrowUpRight } from "lucide-react";

interface HeroProps {
  onViewProjects: () => void;
  onBookConsultation: () => void;
  scrollYProgress: MotionValue<number>;
}

const BG_IMAGE_1 = "/library/sections/valen-ochre-hero/hero-bg.jpg";
const BG_IMAGE_2 = "/library/sections/valen-ochre-hero/hero-bg-2.jpg";
const SPACE_01 = "/library/sections/valen-ochre-hero/space-01.webp";
const SPACE_02 = "/library/sections/valen-ochre-hero/space-02.webp";

const VALEN_EASE = [0.16, 1, 0.3, 1] as const;

const SCENES = [
  {
    id: "01",
    name: "01 Wide",
    src: BG_IMAGE_1,
    alt: "Valen & Ochre Nordic Living Pavilion Wide View",
  },
  {
    id: "02",
    name: "02 Center",
    src: BG_IMAGE_2,
    alt: "Valen & Ochre Bespoke Timber Lounge Center View",
  },
];

export const Hero: React.FC<HeroProps> = ({
  onViewProjects,
  onBookConsultation,
  scrollYProgress,
}) => {
  const [activeImage, setActiveImage] = useState<string>(BG_IMAGE_1);
  const [isHovered, setIsHovered] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const reduceMotion = prefersReducedMotion ?? false;

  // --- Scroll Transformations ---

  // 1. Text, CTAs, Spotlights & Scene Switcher Exit (0.00 -> 0.25)
  const rawTextY = useTransform(scrollYProgress, [0, 0.22], [0, 60]);
  const rawTextOpacity = useTransform(scrollYProgress, [0, 0.20], [1, 0]);
  const rawDividerOpacity = useTransform(scrollYProgress, [0, 0.16], [1, 0]);
  const rawSceneSwitcherOpacity = useTransform(scrollYProgress, [0, 0.16], [1, 0]);
  const rawSceneSwitcherY = useTransform(scrollYProgress, [0, 0.16], [0, -25]);
  const rawSpotlightsOpacity = useTransform(scrollYProgress, [0.04, 0.22], [1, 0]);
  const rawVignetteOpacity = useTransform(scrollYProgress, [0.08, 0.35], [1, 0.2]);

  // 2. Main Center Canvas Scaling & Radius (1.0 -> 0.48)
  const rawCanvasScale = useTransform(scrollYProgress, [0.10, 0.72], [1.0, 0.48]);
  const rawCanvasRadius = useTransform(scrollYProgress, [0.10, 0.72], [36, 22]);

  // 3. Side Flanking Gallery Cards Emergence (0.22 -> 0.78)
  const rawLeftX = useTransform(scrollYProgress, [0.22, 0.75], [-90, 0]);
  const rawLeftOpacity = useTransform(scrollYProgress, [0.26, 0.65], [0, 1]);

  const rawRightX = useTransform(scrollYProgress, [0.25, 0.78], [90, 0]);
  const rawRightOpacity = useTransform(scrollYProgress, [0.28, 0.68], [0, 1]);

  // 4. Gallery Section Header & Captions (0.45 -> 0.85)
  const rawGalleryHeaderOpacity = useTransform(scrollYProgress, [0.42, 0.72], [0, 1]);
  const rawGalleryHeaderY = useTransform(scrollYProgress, [0.42, 0.72], [-16, 0]);
  const rawCaptionsOpacity = useTransform(scrollYProgress, [0.50, 0.80], [0, 1]);

  // Apply reduced motion overrides
  const textY = reduceMotion ? 0 : rawTextY;
  const textOpacity = reduceMotion ? 1 : rawTextOpacity;
  const dividerOpacity = reduceMotion ? 1 : rawDividerOpacity;
  const sceneSwitcherOpacity = reduceMotion ? 1 : rawSceneSwitcherOpacity;
  const sceneSwitcherY = reduceMotion ? 0 : rawSceneSwitcherY;
  const spotlightsOpacity = reduceMotion ? 1 : rawSpotlightsOpacity;
  const vignetteOpacity = reduceMotion ? 1 : rawVignetteOpacity;
  const canvasScale = reduceMotion ? 1 : rawCanvasScale;
  const canvasRadius = reduceMotion ? 36 : rawCanvasRadius;
  const leftX = reduceMotion ? 0 : rawLeftX;
  const leftOpacity = reduceMotion ? 1 : rawLeftOpacity;
  const rightX = reduceMotion ? 0 : rawRightX;
  const rightOpacity = reduceMotion ? 1 : rawRightOpacity;
  const galleryHeaderOpacity = reduceMotion ? 1 : rawGalleryHeaderOpacity;
  const galleryHeaderY = reduceMotion ? 0 : rawGalleryHeaderY;
  const captionsOpacity = reduceMotion ? 1 : rawCaptionsOpacity;

  return (
    <section className="valen-hero-section" aria-label="Valen & Ochre Atelier Hero Canvas">
      
      {/* Gallery Section Header that fades in when zoom-out occurs */}
      <motion.div
        className="valen-gallery-header"
        style={{
          opacity: galleryHeaderOpacity,
          y: galleryHeaderY,
        }}
        aria-hidden={reduceMotion ? false : undefined}
      >
        <span className="valen-gallery-tag">SPATIAL MONOGRAPH / 2025—2026</span>
        <h2 className="valen-gallery-title">Curated Living Pavilions & Crafted Interiors</h2>
      </motion.div>

      {/* Gallery Stage: Houses Left Card, Center Canvas, and Right Card */}
      <div className="valen-gallery-stage">
        
        {/* Flanking Left Card: Holmen Residence */}
        <motion.div
          className="valen-side-card valen-side-left"
          style={{
            x: leftX,
            opacity: leftOpacity,
            pointerEvents: scrollYProgress.get() > 0.25 ? "auto" : "none",
          }}
          onClick={onViewProjects}
          role="button"
          tabIndex={0}
          aria-label="View Holmen Residence project details"
          onKeyDown={(e) => e.key === "Enter" && onViewProjects()}
        >
          <div className="valen-side-img-wrap">
            <img src={SPACE_01} alt="Holmen Coastal Timber Terrace" />
            <div className="valen-side-overlay" />
            <span className="valen-side-badge">
              <span>EXPLORE</span>
              <ArrowUpRight size={12} />
            </span>
          </div>
          <motion.div className="valen-card-caption" style={{ opacity: captionsOpacity }}>
            <div className="valen-caption-meta">
              <span className="valen-caption-idx">01 / COASTAL</span>
              <span className="valen-caption-year">2025</span>
            </div>
            <h3 className="valen-caption-name">Holmen Timber Residence</h3>
            <p className="valen-caption-loc">Copenhagen, Denmark</p>
          </motion.div>
        </motion.div>

        {/* Center Main Hero Canvas Container (100% pristine at scroll 0, scales down on scroll) */}
        <motion.div 
          initial={{ opacity: 0, y: reduceMotion ? 0 : 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.9, ease: VALEN_EASE }}
          className="valen-canvas valen-center-canvas"
          style={{
            scale: canvasScale,
            borderRadius: canvasRadius,
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Background Image with Smooth Crossfade */}
          <div className="valen-bg-container">
            {SCENES.map((scene) => {
              const isActive = activeImage === scene.src;
              return (
                <motion.img
                  key={scene.id}
                  src={scene.src}
                  alt={scene.alt}
                  className="valen-bg-image"
                  initial={false}
                  animate={{
                    opacity: isActive ? 1 : 0,
                    scale: isActive ? (isHovered && !reduceMotion ? 1.02 : 1) : 1.04,
                    filter: isActive ? "brightness(0.96) contrast(1.05)" : "brightness(0.9) contrast(1)",
                  }}
                  transition={{
                    opacity: { duration: reduceMotion ? 0 : 0.8, ease: [0.22, 1, 0.36, 1] },
                    scale: { duration: reduceMotion ? 0 : 1.2, ease: VALEN_EASE },
                    filter: { duration: reduceMotion ? 0 : 0.8, ease: [0.22, 1, 0.36, 1] },
                  }}
                  style={{
                    position: "absolute",
                    inset: 0,
                    pointerEvents: "none",
                  }}
                />
              );
            })}
          </div>

          {/* Realistic Architectural Lighting: Spotlights Cone Gradients */}
          <motion.div 
            className="valen-lighting-layer" 
            style={{ opacity: spotlightsOpacity }}
            aria-hidden="true"
          >
            <div className="valen-spotlight" style={{ left: "18%" }} />
            <div className="valen-spotlight" style={{ left: "34%" }} />
            <div className="valen-spotlight" style={{ left: "50%" }} />
            <div className="valen-spotlight" style={{ left: "66%" }} />
            <div className="valen-spotlight" style={{ left: "82%" }} />

            <div className="valen-top-vignette" />
          </motion.div>

          {/* Bottom Vignette with independent opacity */}
          <motion.div 
            className="valen-bottom-vignette"
            style={{ opacity: vignetteOpacity }}
            aria-hidden="true"
          />

          {/* Hero Content Layer (Normal 1x scale, slides and fades out on scroll) */}
          <motion.div 
            className="valen-content-layer"
            style={{
              opacity: textOpacity,
              y: textY,
              pointerEvents: scrollYProgress.get() > 0.20 ? "none" : "auto",
            }}
          >
            
            {/* Main Grid: Headline Left & Nordic Narrative Right */}
            <div className="valen-grid">
              
              {/* Left Headline */}
              <div className="valen-headline-col">
                <motion.div
                  initial={{ opacity: 0, y: reduceMotion ? 0 : 35 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: reduceMotion ? 0 : 0.9, delay: reduceMotion ? 0 : 0.2, ease: VALEN_EASE }}
                >
                  <h1 className="valen-headline">
                    <span className="valen-headline-line">
                      <motion.span
                        initial={{ y: reduceMotion ? 0 : "100%" }}
                        animate={{ y: 0 }}
                        transition={{ duration: reduceMotion ? 0 : 0.8, delay: reduceMotion ? 0 : 0.2, ease: VALEN_EASE }}
                        style={{ display: "block" }}
                      >
                        Where Architecture
                      </motion.span>
                    </span>
                    <span className="valen-headline-line">
                      <motion.span
                        initial={{ y: reduceMotion ? 0 : "100%" }}
                        animate={{ y: 0 }}
                        transition={{ duration: reduceMotion ? 0 : 0.8, delay: reduceMotion ? 0 : 0.35, ease: VALEN_EASE }}
                        style={{ display: "block" }}
                      >
                        Cultivates Stillness
                      </motion.span>
                    </span>
                  </h1>
                </motion.div>
              </div>

              {/* Right Paragraph & Action Buttons */}
              <div className="valen-narrative-col">
                
                {/* Paragraph Description */}
                <motion.p
                  initial={{ opacity: 0, y: reduceMotion ? 0 : 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: reduceMotion ? 0 : 0.8, delay: reduceMotion ? 0 : 0.5, ease: VALEN_EASE }}
                  className="valen-description"
                >
                  Based in Copenhagen and Zurich, we design residential sanctuaries and cultural spaces rooted in natural materiality, light, and quiet permanence
                </motion.p>

                {/* Action Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: reduceMotion ? 0 : 0.8, delay: reduceMotion ? 0 : 0.65, ease: VALEN_EASE }}
                  className="valen-actions"
                >
                  <motion.button
                    whileTap={{ scale: reduceMotion ? 1 : 0.98 }}
                    onClick={onViewProjects}
                    className="valen-btn-primary"
                    type="button"
                  >
                    EXPLORE SPACES
                  </motion.button>

                  <motion.button
                    whileTap={{ scale: reduceMotion ? 1 : 0.98 }}
                    onClick={onBookConsultation}
                    className="valen-btn-secondary"
                    type="button"
                  >
                    BOOK CONSULTATION
                  </motion.button>
                </motion.div>

              </div>
            </div>

            {/* Bottom Hairline Divider & Architectural 4-Point Star Icon */}
            <motion.div 
              initial={{ opacity: 0, scaleX: reduceMotion ? 1 : 0.8 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: reduceMotion ? 0 : 1.1, delay: reduceMotion ? 0 : 0.8, ease: VALEN_EASE }}
              className="valen-divider-row"
              style={{ opacity: dividerOpacity }}
            >
              <div className="valen-hairline" />

              <div className="valen-star-icon" aria-label="Valen & Ochre architectural signature accent">
                <motion.div
                  animate={reduceMotion ? {} : { 
                    scale: [1, 1.15, 1],
                    opacity: [0.75, 1, 0.75] 
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <svg 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    fill="currentColor"
                    style={{ filter: "drop-shadow(0 0 6px rgba(255,255,255,0.4))" }}
                  >
                    <path d="M12 0C12 6.627 6.627 12 0 12C6.627 12 12 17.373 12 24C12 17.373 17.373 12 24 12C17.373 12 12 6.627 12 0Z" />
                  </svg>
                </motion.div>
              </div>
            </motion.div>

          </motion.div>

          {/* Scene Switcher in top corner (fades out on scroll) */}
          <motion.div 
            className="valen-scene-switcher" 
            role="group" 
            aria-label="Scene selection"
            style={{
              opacity: sceneSwitcherOpacity,
              y: sceneSwitcherY,
              pointerEvents: scrollYProgress.get() > 0.16 ? "none" : "auto",
            }}
          >
            <span className="valen-scene-label">Scene:</span>
            {SCENES.map((scene) => {
              const isActive = activeImage === scene.src;
              return (
                <button 
                  key={scene.id}
                  type="button"
                  onClick={() => setActiveImage(scene.src)}
                  className={`valen-scene-btn ${isActive ? "active" : ""}`}
                  aria-pressed={isActive}
                  style={{ position: "relative" }}
                >
                  <span style={{ position: "relative", zIndex: 2 }}>{scene.name}</span>
                  {isActive && (
                    <motion.span
                      layoutId="valen-active-scene-pill"
                      style={{
                        position: "absolute",
                        inset: 0,
                        borderRadius: "999px",
                        backgroundColor: "rgba(255, 255, 255, 0.22)",
                        zIndex: 1,
                      }}
                      transition={{ type: "spring", stiffness: 450, damping: 32 }}
                    />
                  )}
                </button>
              );
            })}
          </motion.div>

        </motion.div>

        {/* Center Card Caption on zoom out */}
        <motion.div 
          className="valen-card-caption valen-center-caption" 
          style={{ opacity: captionsOpacity }}
        >
          <div className="valen-caption-meta">
            <span className="valen-caption-idx">02 / MAIN EXHIBIT</span>
            <span className="valen-caption-year">2026</span>
          </div>
          <h3 className="valen-caption-name">Nordic Living Pavilion</h3>
          <p className="valen-caption-loc">Valen & Ochre Atelier Archive</p>
        </motion.div>

        {/* Flanking Right Card: Zürichberg Salon */}
        <motion.div
          className="valen-side-card valen-side-right"
          style={{
            x: rightX,
            opacity: rightOpacity,
            pointerEvents: scrollYProgress.get() > 0.25 ? "auto" : "none",
          }}
          onClick={onViewProjects}
          role="button"
          tabIndex={0}
          aria-label="View Zürichberg Salon project details"
          onKeyDown={(e) => e.key === "Enter" && onViewProjects()}
        >
          <div className="valen-side-img-wrap">
            <img src={SPACE_02} alt="Zürichberg Stone Atelier" />
            <div className="valen-side-overlay" />
            <span className="valen-side-badge">
              <span>EXPLORE</span>
              <ArrowUpRight size={12} />
            </span>
          </div>
          <motion.div className="valen-card-caption" style={{ opacity: captionsOpacity }}>
            <div className="valen-caption-meta">
              <span className="valen-caption-idx">03 / SALON</span>
              <span className="valen-caption-year">2026</span>
            </div>
            <h3 className="valen-caption-name">Zürichberg Stone Pavilion</h3>
            <p className="valen-caption-loc">Zürich, Switzerland</p>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
};
