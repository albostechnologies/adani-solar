"use client";

import React from "react";
import { motion } from "framer-motion";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  alignment?: "left" | "center" | "right";
  variant?: "light" | "dark";
  className?: string;
}

export function SectionHeading({
  title,
  subtitle,
  alignment = "center",
  variant = "light",
  className = "",
}: SectionHeadingProps) {
  const alignmentClasses = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  const isDark = variant === "dark";

  // Split title into words for staggered word-by-word reveal
  const words = title.split(" ");

  const underlineOriginClass =
    alignment === "right"
      ? "origin-right"
      : alignment === "left"
        ? "origin-left"
        : "origin-center";

  return (
    <div className={`${alignmentClasses[alignment]} ${className}`}>
      <h2
        className={`font-[family-name:var(--font-poppins)] text-2xl sm:text-3xl md:text-4xl font-bold leading-tight mb-3 ${
          isDark ? "text-white" : "text-foreground"
        }`}
      >
        {words.map((word, i) => (
          <React.Fragment key={`${word}-${i}`}>
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.4,
                delay: i * 0.06,
                ease: "easeOut",
              }}
              className="inline-block"
            >
              {word}
            </motion.span>
            {i < words.length - 1 ? " " : ""}
          </React.Fragment>
        ))}
      </h2>
      {/* Green underline */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
        className={`w-16 h-1 rounded-full bg-solar-green mb-4 ${underlineOriginClass} ${
          alignment === "center"
            ? "mx-auto"
            : alignment === "right"
              ? "ml-auto"
              : ""
        }`}
      />
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
          className={`text-base sm:text-lg leading-relaxed max-w-2xl ${
            alignment === "center" ? "mx-auto" : ""
          } ${isDark ? "text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.35)]" : "text-muted-foreground"}`}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
