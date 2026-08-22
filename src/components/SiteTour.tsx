"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Compass, X, ChevronRight, ChevronLeft } from "lucide-react";

// ─── Tour Step Definition ─────────────────────────────────────────────
interface TourStep {
  targetId: string;
  title: string;
  description: string;
  position?: "top" | "bottom" | "left" | "right";
}

const TOUR_STEPS: TourStep[] = [
  {
    targetId: "tour-header-nav",
    title: "Explore Our Pages",
    description:
      "Use the navigation bar to explore different sections of our website. Each menu item uses hash-based routing for instant page transitions.",
    position: "bottom",
  },
  {
    targetId: "tour-hero-section",
    title: "India's Largest Solar Manufacturer",
    description:
      "Adani Solar is India's first and largest vertically integrated solar PV manufacturer with 10 GW capacity at Mundra, Gujarat.",
    position: "bottom",
  },
  {
    targetId: "tour-products-section",
    title: "TOPCon & MonoPERC Modules",
    description:
      "Browse our high-performance solar module products. TOPCon modules reach up to 22.5% efficiency while MonoPERC offers proven reliability.",
    position: "top",
  },
  {
    targetId: "tour-roi-calculator",
    title: "Calculate Your Solar Savings",
    description:
      "Visit the Why Solar page to use our interactive ROI calculator — estimate energy savings, payback period and CO₂ offset for your project.",
    position: "top",
  },
  {
    targetId: "tour-contact-form",
    title: "Get in Touch",
    description:
      "Have questions? Our Ask Our Expert form connects you with a solar specialist who responds within 24 hours.",
    position: "top",
  },
  {
    targetId: "tour-search-chat",
    title: "Quick Access Tools",
    description:
      "Use Cmd+K (Ctrl+K) to search any page instantly. The chat widget (bottom-right) provides quick answers about products, pricing and more.",
    position: "top",
  },
];

const STORAGE_KEY = "adani-solar-tour-completed";
const TOTAL_STEPS = TOUR_STEPS.length;

// ─── Check prefers-reduced-motion ─────────────────────────────────────
function usePrefersReducedMotion() {
  const [prefersReduced, setPrefersReduced] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return prefersReduced;
}

// ─── Helper: compute tooltip position from a DOMRect ─────────────────
function computeTooltipPos(rect: DOMRect, position: TourStep["position"]) {
  const padding = 16;
  const tooltipWidth = 320;
  const tooltipHeight = 200;
  const isMobile = window.innerWidth < 768;
  const pos = position || "bottom";

  let top = 0;
  let left = 0;

  if (isMobile || pos === "bottom" || pos === "top") {
    if (pos === "top") {
      top = rect.top - tooltipHeight - padding;
    } else {
      top = rect.bottom + padding;
    }
    left = rect.left + rect.width / 2 - tooltipWidth / 2;
    left = Math.max(padding, Math.min(left, window.innerWidth - tooltipWidth - padding));
    if (top < padding) top = rect.bottom + padding;
    if (top + tooltipHeight > window.innerHeight - padding) top = rect.top - tooltipHeight - padding;
  } else {
    if (pos === "left") {
      left = rect.left - tooltipWidth - padding;
    } else {
      left = rect.right + padding;
    }
    top = rect.top + rect.height / 2 - tooltipHeight / 2;
    top = Math.max(padding, Math.min(top, window.innerHeight - tooltipHeight - padding));
  }

  return { top, left };
}

// ─── SiteTour Component ───────────────────────────────────────────────
export function SiteTour() {
  const [tourCompleted, setTourCompleted] = useState(() => {
    if (typeof window === "undefined") return true;
    try {
      return localStorage.getItem(STORAGE_KEY) === "true";
    } catch {
      return true;
    }
  });
  const [tourActive, setTourActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
  const prefersReduced = usePrefersReducedMotion();
  const tooltipRef = useRef<HTMLDivElement>(null);

  // Refs for latest values used in callbacks
  const currentStepRef = useRef(currentStep);
  useEffect(() => {
    currentStepRef.current = currentStep;
  }, [currentStep]);

  // Close tour handler (stable reference)
  const closeTour = useCallback(() => {
    setTourActive(false);
    setTourCompleted(true);
    try {
      localStorage.setItem(STORAGE_KEY, "true");
    } catch {
      // ignore
    }
  }, []);

  const goNext = useCallback(() => {
    const step = currentStepRef.current;
    if (step < TOTAL_STEPS - 1) {
      setCurrentStep(step + 1);
    } else {
      setTourActive(false);
      setTourCompleted(true);
      try {
        localStorage.setItem(STORAGE_KEY, "true");
      } catch {
        // ignore
      }
    }
  }, []);

  const goPrev = useCallback(() => {
    const step = currentStepRef.current;
    if (step > 0) {
      setCurrentStep(step - 1);
    }
  }, []);

  // Update target position via event handlers (not in effect body)
  const handlePositionUpdate = useCallback(() => {
    const stepIdx = currentStepRef.current;
    const stepData = TOUR_STEPS[stepIdx];
    const el = document.querySelector(`[data-tour-id="${stepData.targetId}"]`);
    if (!el) {
      setTargetRect(null);
      return;
    }
    const rect = el.getBoundingClientRect();
    setTargetRect(rect);
    setTooltipPos(computeTooltipPos(rect, stepData.position));
  }, []);

  // Listen for resize/scroll to update position; schedule initial position
  useEffect(() => {
    if (!tourActive) return;
    // Schedule initial position update via rAF (not direct setState in effect)
    const raf = requestAnimationFrame(handlePositionUpdate);
    window.addEventListener("resize", handlePositionUpdate);
    window.addEventListener("scroll", handlePositionUpdate, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", handlePositionUpdate);
      window.removeEventListener("scroll", handlePositionUpdate);
    };
  }, [tourActive, currentStep, handlePositionUpdate]);

  // Keyboard navigation
  useEffect(() => {
    if (!tourActive) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeTour();
      } else if (e.key === "ArrowRight") {
        goNext();
      } else if (e.key === "ArrowLeft") {
        goPrev();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [tourActive, closeTour, goNext, goPrev]);

  const startTour = useCallback(() => {
    setTourActive(true);
    setCurrentStep(0);
  }, []);

  const skipTour = closeTour;

  const step = TOUR_STEPS[currentStep];
  const shouldAnimate = !prefersReduced;

  return (
    <>
      {/* ── "Take a Tour" floating button ── */}
      <AnimatePresence>
        {!tourCompleted && !tourActive && (
          <motion.button
            initial={shouldAnimate ? { opacity: 0, x: -20, scale: 0.9 } : undefined}
            animate={shouldAnimate ? { opacity: 1, x: 0, scale: 1 } : undefined}
            exit={shouldAnimate ? { opacity: 0, x: -20, scale: 0.9 } : undefined}
            transition={{ duration: 0.3 }}
            onClick={startTour}
            className="fixed bottom-36 left-4 sm:bottom-28 sm:left-6 z-40 flex items-center gap-2 px-4 py-3 rounded-full bg-solar-green hover:bg-solar-green-dark text-white shadow-lg shadow-solar-green/25 transition-colors duration-300 group"
            aria-label="Take a guided tour of the website"
          >
            <Compass className="w-5 h-5 group-hover:rotate-45 transition-transform duration-300" />
            <span className="text-sm font-medium hidden sm:inline">Take a Tour</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── Tour Overlay + Spotlight + Tooltip ── */}
      <AnimatePresence>
        {tourActive && (
          <>
            {/* Overlay with spotlight cutout */}
            <motion.div
              initial={shouldAnimate ? { opacity: 0 } : undefined}
              animate={shouldAnimate ? { opacity: 1 } : undefined}
              exit={shouldAnimate ? { opacity: 0 } : undefined}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-50 pointer-events-auto"
              onClick={closeTour}
            >
              {targetRect && (
                <div
                  className="absolute bg-transparent"
                  style={{
                    left: targetRect.left - 8,
                    top: targetRect.top - 8,
                    width: targetRect.width + 16,
                    height: targetRect.height + 16,
                    borderRadius: 12,
                    border: "2px solid rgba(0, 166, 81, 0.6)",
                    boxShadow: "0 0 0 9999px rgba(0,0,0,0.7)",
                  }}
                />
              )}
            </motion.div>

            {/* Tooltip Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                ref={tooltipRef}
                initial={shouldAnimate ? { opacity: 0, y: 10, scale: 0.95 } : undefined}
                animate={shouldAnimate ? { opacity: 1, y: 0, scale: 1 } : undefined}
                exit={shouldAnimate ? { opacity: 0, y: -10, scale: 0.95 } : undefined}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="fixed z-[60] w-[300px] sm:w-[340px] rounded-2xl bg-white border border-border shadow-2xl p-5 pointer-events-auto"
                style={{
                  top: tooltipPos.top,
                  left: tooltipPos.left,
                }}
              >
                {/* Step indicator */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-medium text-solar-green bg-solar-green/10 px-2 py-1 rounded-full">
                    Step {currentStep + 1} of {TOTAL_STEPS}
                  </span>
                  <button
                    onClick={closeTour}
                    className="w-6 h-6 rounded-full hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="Close tour"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Progress dots */}
                <div className="flex gap-1.5 mb-3">
                  {TOUR_STEPS.map((_, idx) => (
                    <div
                      key={idx}
                      className={`h-1 rounded-full transition-all duration-300 ${
                        idx === currentStep
                          ? "bg-solar-green w-6"
                          : idx < currentStep
                          ? "bg-solar-green/40 w-1.5"
                          : "bg-muted w-1.5"
                      }`}
                    />
                  ))}
                </div>

                {/* Title */}
                <h3 className="font-[family-name:var(--font-poppins)] text-base font-semibold text-foreground mb-2">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                  {step.description}
                </p>

                {/* Arrow pointer to target */}
                {targetRect && (
                  <div
                    className="absolute w-3 h-3 bg-white border-l border-b border-border rotate-45"
                    style={{
                      left: Math.min(
                        Math.max(targetRect.left + targetRect.width / 2 - tooltipPos.left - 6, 12),
                        300 - 12
                      ),
                      top: step.position === "top" ? "auto" : -7,
                      bottom: step.position === "top" ? -7 : "auto",
                    }}
                  />
                )}

                {/* Action buttons */}
                <div className="flex items-center justify-between">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={skipTour}
                    className="text-muted-foreground hover:text-foreground text-xs"
                  >
                    Skip Tour
                  </Button>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={currentStep === 0}
                      onClick={goPrev}
                      className="h-8 px-3"
                    >
                      <ChevronLeft className="w-3.5 h-3.5 mr-0.5" />
                      Back
                    </Button>
                    <Button
                      size="sm"
                      onClick={goNext}
                      className="h-8 px-3 bg-solar-green hover:bg-solar-green-dark text-white"
                    >
                      {currentStep === TOTAL_STEPS - 1 ? "Finish" : "Next"}
                      {currentStep < TOTAL_STEPS - 1 && <ChevronRight className="w-3.5 h-3.5 ml-0.5" />}
                    </Button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
