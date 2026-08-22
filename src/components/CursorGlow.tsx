"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CursorGlowProps {
  children: React.ReactNode;
  className?: string;
  /** Opacity of the glow (default 0.05) */
  intensity?: number;
  /** Radius of the glow in px (default 400) */
  radius?: number;
}

/**
 * CursorGlow adds a subtle radial glow that follows the mouse cursor
 * within a container. Only visible on desktop (no touch devices).
 * Respects prefers-reduced-motion.
 * Very subtle - solar-green at 0.05 opacity, 400px radius.
 * Uses framer-motion for smooth position interpolation.
 */
export function CursorGlow({
  children,
  className = "",
  intensity = 0.05,
  radius = 400,
}: CursorGlowProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);
  const [enabled, setEnabled] = useState(true);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Check for reduced motion preference
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    // Detect touch device
    const touchQuery = window.matchMedia("(pointer: coarse)");

    const updateEnabled = () => {
      setEnabled(!motionQuery.matches && !touchQuery.matches);
    };

    updateEnabled();

    motionQuery.addEventListener("change", updateEnabled);
    touchQuery.addEventListener("change", updateEnabled);

    return () => {
      motionQuery.removeEventListener("change", updateEnabled);
      touchQuery.removeEventListener("change", updateEnabled);
    };
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!enabled || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      if (!isActive) setIsActive(true);
    },
    [enabled, isActive]
  );

  const handleMouseLeave = useCallback(() => {
    setIsActive(false);
  }, []);

  if (!enabled) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div
      ref={containerRef}
      className={`cursor-glow relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      <AnimatePresence>
        {isActive && (
          <motion.div
            key="cursor-glow"
            className="pointer-events-none absolute inset-0 z-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            aria-hidden="true"
          >
            {/* Glow div that follows cursor with spring-like motion */}
            <motion.div
              className="absolute"
              animate={{
                left: pos.x - radius,
                top: pos.y - radius,
              }}
              transition={{
                type: "spring",
                stiffness: 150,
                damping: 25,
                mass: 0.5,
              }}
              style={{
                width: radius * 2,
                height: radius * 2,
                borderRadius: "50%",
                background: `radial-gradient(circle, oklch(0.588 0.193 152.6 / ${intensity}) 0%, transparent 70%)`,
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
