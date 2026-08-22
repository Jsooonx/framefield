"use client";

import React, { useRef, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useScroll, useTransform, useReducedMotion } from "motion/react";
import { Navbar } from "./Navbar";
import { Hero } from "./Hero";
import { Modal } from "./Modal";
import "./valen-ochre-hero.css";

export function ValenOchreHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const reduceMotion = prefersReducedMotion ?? false;

  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    type: "contact" | "consultation" | "projects";
  }>({
    isOpen: false,
    type: "contact",
  });

  const handleOpenModal = (type: "contact" | "consultation" | "projects") => {
    setModalState({ isOpen: true, type });
  };

  const handleCloseModal = () => {
    setModalState((prev) => ({ ...prev, isOpen: false }));
  };

  // Scroll timeline progress across the sticky track
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Navbar exit on scroll (0.00 -> 0.25)
  const rawNavY = useTransform(scrollYProgress, [0, 0.22], [0, -90]);
  const rawNavOpacity = useTransform(scrollYProgress, [0, 0.20], [1, 0]);

  const navStyle = {
    y: reduceMotion ? 0 : rawNavY,
    opacity: reduceMotion ? 1 : rawNavOpacity,
    pointerEvents: (scrollYProgress.get() > 0.2 ? "none" : "auto") as "none" | "auto",
  };

  return (
    <div className="valen-root">
      
      {/* Scroll track container providing the scroll depth */}
      <div ref={containerRef} className="valen-scroll-track">
        
        {/* Sticky viewport stage */}
        <div className="valen-sticky-stage">
          
          {/* Header & Navigation */}
          <Navbar 
            onContactClick={() => handleOpenModal("contact")} 
            style={navStyle}
          />

          {/* Main Architectural Hero Section */}
          <main className="valen-main">
            <Hero
              onViewProjects={() => handleOpenModal("projects")}
              onBookConsultation={() => handleOpenModal("consultation")}
              scrollYProgress={scrollYProgress}
            />
          </main>

        </div>
      </div>

      {/* Interactive Modal Drawer */}
      <Modal
        isOpen={modalState.isOpen}
        onClose={handleCloseModal}
        type={modalState.type}
      />

      {/* Universal Framefield Preview Return Control */}
      <a
        className="valen-library-back"
        href="/#library"
        aria-label="Return to Framefield library"
      >
        <span className="valen-library-back-icon" aria-hidden="true">
          <ArrowLeft size={13} strokeWidth={2} />
        </span>
        Back to library
      </a>
    </div>
  );
}

export default ValenOchreHero;
