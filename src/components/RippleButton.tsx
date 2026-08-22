"use client";

import React, { useCallback, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface RippleButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  /** ripple color (CSS color). Defaults to white */
  rippleColor?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  "aria-label"?: string;
}

interface Ripple {
  id: number;
  x: number;
  y: number;
  size: number;
}

/**
 * Button with a ripple effect at the click position.
 * Respects prefers-reduced-motion (no ripples emitted).
 */
export function RippleButton({
  children,
  onClick,
  className,
  rippleColor = "rgba(255,255,255,0.45)",
  type = "button",
  disabled,
  ...rest
}: RippleButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const idRef = useRef(0);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (!prefersReduced && ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height) * 1.1;
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        const id = ++idRef.current;
        setRipples((prev) => [...prev, { id, x, y, size }]);
        // Auto-clear after animation finishes
        window.setTimeout(() => {
          setRipples((prev) => prev.filter((r) => r.id !== id));
        }, 650);
      }
      onClick?.();
    },
    [onClick]
  );

  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled}
      onClick={handleClick}
      className={cn(
        "relative overflow-hidden transition-transform duration-200 ease-out",
        className
      )}
      {...rest}
    >
      <span className="btn-premium-label relative z-[1] inline-flex items-center justify-center gap-2">
        {children}
      </span>
      {ripples.map((r) => (
        <span
          key={r.id}
          aria-hidden="true"
          style={{
            position: "absolute",
            left: r.x,
            top: r.y,
            width: r.size,
            height: r.size,
            background: rippleColor,
            borderRadius: "9999px",
            transform: "scale(0)",
            animation: "ripple-expand 600ms ease-out forwards",
            pointerEvents: "none",
          }}
        />
      ))}
    </button>
  );
}
