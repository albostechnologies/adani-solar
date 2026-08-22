"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Thin solar-green scroll progress bar fixed to the very top of the viewport.
 * Hidden when at the top, smooth spring animation as the user scrolls.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-solar-green via-solar-green-light to-solar-green"
      aria-hidden="true"
    />
  );
}
