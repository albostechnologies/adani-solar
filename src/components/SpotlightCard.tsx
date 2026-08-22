"use client";

import React, { useRef } from "react";
import { cn } from "@/lib/utils";

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  /** color of the spotlight glow (any CSS color). Defaults to solar-green */
  color?: string;
}

/**
 * Card with a radial gradient spotlight that follows the cursor.
 * Falls back gracefully when prefers-reduced-motion is set.
 */
export function SpotlightCard({
  children,
  className,
  color = "rgba(0, 166, 81, 0.18)",
}: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    el.style.setProperty("--spot-x", `${x}px`);
    el.style.setProperty("--spot-y", `${y}px`);
    el.style.setProperty("--spot-color", color);
  };

  const handleLeave = () => {
    const el = ref.current;
    if (el) {
      el.style.setProperty("--spot-color", "transparent");
    }
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={cn(
        "relative overflow-hidden transition-colors duration-200",
        className
      )}
      style={{
        background:
          "radial-gradient(220px circle at var(--spot-x, -100px) var(--spot-y, -100px), var(--spot-color, transparent), transparent 60%)",
      }}
    >
      {children}
    </div>
  );
}
