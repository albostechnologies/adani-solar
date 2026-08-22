"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export interface MetricItem {
  value: string | number;
  unit?: string;
  label: string;
}

interface MetricRowProps {
  items: MetricItem[];
  variant?: "light" | "dark";
}

export function MetricRow({ items, variant = "light" }: MetricRowProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const isDark = variant === "dark";
  const columnClass =
    items.length <= 2
      ? "grid-cols-2"
      : items.length === 3
        ? "grid-cols-2 lg:grid-cols-3"
        : "grid-cols-2 lg:grid-cols-4";

  return (
    <div
      ref={ref}
      className={`grid ${columnClass} gap-y-8 gap-x-6 lg:gap-x-10`}
    >
      {items.map((item, index) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45, delay: index * 0.06 }}
          className={index > 0 ? "lg:border-l lg:border-border/60 lg:pl-8" : ""}
        >
          <p
            className={`editorial-stat-value font-[family-name:var(--font-poppins)] font-semibold tabular-nums ${
              isDark ? "text-white" : "text-foreground"
            }`}
          >
            {item.value}
            {item.unit && <span className="text-solar-green">{item.unit}</span>}
          </p>
          <p
            className={`mt-2 text-xs sm:text-sm uppercase tracking-[0.14em] ${
              isDark ? "text-white/50" : "text-muted-foreground"
            }`}
          >
            {item.label}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
