"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion, type MotionStyle } from "motion/react";
import { Menu, X, ArrowUpRight } from "lucide-react";

interface NavbarProps {
  onContactClick: () => void;
  style?: MotionStyle;
}

const VALEN_EASE = [0.16, 1, 0.3, 1] as const;

export const Navbar: React.FC<NavbarProps> = ({ onContactClick, style }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const reduceMotion = prefersReducedMotion ?? false;

  const navLinks = [
    { name: "DESIGN PHILOSOPHY", href: "#philosophy" },
    { name: "SELECTED SPACES", href: "#spaces" },
    { name: "ATELIER SERVICES", href: "#services" },
  ];

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  return (
    <motion.header 
      initial={{ opacity: 0, y: reduceMotion ? 0 : -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.8, ease: VALEN_EASE }}
      style={style}
      className="valen-header"
    >
      <div className="valen-nav-container">
        
        {/* Left Navigation Links (Desktop) */}
        <nav className="valen-nav-links" aria-label="Valen & Ochre Atelier navigation">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onMouseEnter={() => setHoveredNav(link.name)}
              onMouseLeave={() => setHoveredNav(null)}
              className="valen-nav-link"
            >
              {link.name}
              {hoveredNav === link.name && !reduceMotion && (
                <motion.div
                  layoutId="valen-navbar-underline"
                  className="valen-nav-underline"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </a>
          ))}
        </nav>

        {/* Center Logo */}
        <div className="valen-logo-wrapper">
          <a 
            href="#top" 
            className="valen-logo"
            aria-label="Valen & Ochre Atelier home"
          >
            <span>Valen & Ochre</span>
          </a>
        </div>

        {/* Right CTA Button (Desktop) */}
        <div className="valen-cta-wrapper">
          <motion.button
            whileTap={{ scale: reduceMotion ? 1 : 0.98 }}
            onClick={onContactClick}
            className="valen-contact-btn"
            type="button"
          >
            CONTACT ATELIER
          </motion.button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="valen-mobile-toggle"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
          type="button"
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.3 }}
            className="valen-mobile-drawer"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>{link.name}</span>
                <ArrowUpRight size={16} style={{ opacity: 0.5 }} />
              </a>
            ))}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onContactClick();
              }}
              className="valen-mobile-contact-btn"
              type="button"
            >
              CONTACT ATELIER
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
