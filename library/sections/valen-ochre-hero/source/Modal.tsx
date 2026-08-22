"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { X, MapPin, ArrowRight } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "contact" | "consultation" | "projects";
}

const BG_IMAGE_1 = "/library/sections/valen-ochre-hero/hero-bg.jpg";
const BG_IMAGE_2 = "/library/sections/valen-ochre-hero/hero-bg-2.jpg";
const VALEN_EASE = [0.16, 1, 0.3, 1] as const;

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, type }) => {
  const prefersReducedMotion = useReducedMotion();
  const reduceMotion = prefersReducedMotion ?? false;

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    }

    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          className="valen-modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-label={
            type === "projects"
              ? "Selected Nordic Spaces"
              : type === "consultation"
              ? "Book Atelier Consultation"
              : "Contact Valen & Ochre Atelier"
          }
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="valen-modal-backdrop"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.95, y: reduceMotion ? 0 : 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: reduceMotion ? 1 : 0.95, y: reduceMotion ? 0 : 20 }}
            transition={{ duration: reduceMotion ? 0 : 0.3, ease: VALEN_EASE }}
            className="valen-modal-card"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="valen-modal-close"
              aria-label="Close modal"
              type="button"
            >
              <X size={20} />
            </button>

            {type === "projects" ? (
              <div>
                <span className="valen-modal-tag">Atelier Portfolio</span>
                <h2 className="valen-modal-title">Selected Nordic & Alpine Spaces</h2>
                <p className="valen-modal-desc">
                  A curated collection of private residential pavilions, alpine retreats, and bespoke interior architecture crafted with honest materiality.
                </p>

                <div className="valen-projects-grid">
                  <div className="valen-project-card">
                    <div className="valen-project-img-wrap">
                      <img src={BG_IMAGE_1} alt="Holmen Timber Residence" />
                    </div>
                    <h3 className="valen-project-name">Holmen Timber Residence</h3>
                    <p className="valen-project-type">Copenhagen · Private Coastal Villa</p>
                  </div>
                  <div className="valen-project-card">
                    <div className="valen-project-img-wrap">
                      <img src={BG_IMAGE_2} alt="Zürichberg Stone Pavilion" />
                    </div>
                    <h3 className="valen-project-name">Zürichberg Stone Pavilion</h3>
                    <p className="valen-project-type">Zürich · Alpine Living Sanctuary</p>
                  </div>
                </div>

                <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "16px" }}>
                  <button 
                    onClick={onClose}
                    className="valen-modal-btn"
                    style={{ display: "flex", alignItems: "center", gap: "8px" }}
                    type="button"
                  >
                    <span>Close Showcase</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <span className="valen-modal-tag">
                  {type === "consultation" ? "Private Commission" : "Atelier Inquiry"}
                </span>
                <h2 className="valen-modal-title">
                  {type === "consultation" ? "Schedule Architectural Consultation" : "Connect with Valen & Ochre"}
                </h2>
                <p className="valen-modal-desc">
                  {type === "consultation"
                    ? "Book a private discovery dialogue with our founding partners at our Copenhagen atelier or via virtual review."
                    : "We welcome architectural commissions and thoughtful spatial collaborations worldwide."}
                </p>

                <div className="valen-form-fields">
                  <div className="valen-form-row">
                    <input 
                      type="text" 
                      placeholder="Your Full Name" 
                      className="valen-input"
                    />
                    <input 
                      type="email" 
                      placeholder="Email Address" 
                      className="valen-input"
                    />
                  </div>
                  <input 
                    type="text" 
                    placeholder="Project Location & Type (e.g. Private Residence, Pavilion)" 
                    className="valen-input"
                  />
                  <textarea 
                    rows={3} 
                    placeholder="Describe your site, timeline & architectural vision..." 
                    className="valen-textarea"
                    style={{ resize: "none" }}
                  ></textarea>
                </div>

                <div className="valen-modal-footer">
                  <div className="valen-location-tag">
                    <MapPin size={14} style={{ color: "#D4A373" }} />
                    <span>Copenhagen & Zürich Atelier</span>
                  </div>
                  <button 
                    onClick={() => {
                      alert("Thank you for your inquiry. Valen & Ochre Atelier will respond within two business days.");
                      onClose();
                    }}
                    className="valen-modal-btn"
                    type="button"
                  >
                    Send Commission Inquiry
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
