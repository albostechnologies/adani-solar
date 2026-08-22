"use client";

import React from "react";

/**
 * Animated wave divider between sections.
 * Provides a smooth visual transition between dark and light backgrounds.
 * `variant="top"` places wave at top of section (for light→dark transitions)
 * `variant="bottom"` places wave at bottom (for dark→light transitions)
 */
export function WaveDivider({
  variant = "bottom",
  color = "bg-white",
  flip = false,
  className = "",
}: {
  variant?: "top" | "bottom";
  color?: string;
  flip?: boolean;
  className?: string;
}) {
  const positionClass = variant === "top" ? "-mt-1" : "-mb-1";
  const scaleY = flip ? "-scale-y-100" : "";

  return (
    <div
      className={`relative w-full overflow-hidden leading-none ${positionClass} ${scaleY} ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className={`w-full h-[60px] sm:h-[80px] md:h-[100px] ${variant === "top" ? "-scale-y-100" : ""}`}
      >
        <path
          d="M0,64 C480,120 960,0 1440,64 L1440,120 L0,120 Z"
          className={color}
          fill="currentColor"
        />
      </svg>
    </div>
  );
}

/**
 * Diagonal slant divider for a modern geometric look.
 */
export function SlantDivider({
  direction = "right",
  color = "bg-white",
  className = "",
}: {
  direction?: "left" | "right";
  color?: string;
  className?: string;
}) {
  return (
    <div
      className={`relative w-full overflow-hidden leading-none ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        className={`w-full h-[40px] sm:h-[60px] ${direction === "left" ? "-scale-x-100" : ""}`}
      >
        <polygon
          points="0,80 1440,0 1440,80"
          className={color}
          fill="currentColor"
        />
      </svg>
    </div>
  );
}
