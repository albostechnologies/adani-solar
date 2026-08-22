"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useRouter, type RouteName } from "@/lib/router";
import Image from "next/image";

interface ImageTextSectionProps {
  title: string;
  description: string | string[];
  image: string;
  imagePosition?: "left" | "right";
  cta?: string;
  ctaRoute?: RouteName;
  variant?: "light" | "dark";
  highlight?: string;
}

export function ImageTextSection({
  title,
  description,
  image,
  imagePosition = "right",
  cta,
  ctaRoute,
  variant = "light",
  highlight,
}: ImageTextSectionProps) {
  const { navigate } = useRouter();
  const isDark = variant === "dark";
  const descriptions = Array.isArray(description) ? description : [description];
  const [imgError, setImgError] = useState(false);

  return (
    <section
      className={`py-16 sm:py-20 lg:py-24 ${isDark ? "bg-solar-dark" : "bg-white"}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center ${
            imagePosition === "right" ? "" : ""
          }`}
        >
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: imagePosition === "left" ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className={`${
              imagePosition === "right" ? "lg:order-2" : "lg:order-1"
            }`}
          >
            <div className="rounded-2xl overflow-hidden aspect-[4/3] shadow-lg relative">
              {!imgError ? (
                <Image
                  src={image}
                  alt={title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  onError={() => setImgError(true)}
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-solar-green/20 to-solar-dark/30 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-solar-green/30 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" className="w-8 h-8 text-solar-green/60" fill="currentColor" aria-hidden="true">
                      <circle cx="12" cy="12" r="5" />
                      <g stroke="currentColor" strokeWidth="2" fill="none">
                        <line x1="12" y1="1" x2="12" y2="4" />
                        <line x1="12" y1="20" x2="12" y2="23" />
                        <line x1="1" y1="12" x2="4" y2="12" />
                        <line x1="20" y1="12" x2="23" y2="12" />
                      </g>
                    </svg>
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: imagePosition === "left" ? 30 : -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className={`${
              imagePosition === "right" ? "lg:order-1" : "lg:order-2"
            }`}
          >
            <h2
              className={`font-[family-name:var(--font-poppins)] text-2xl sm:text-3xl md:text-4xl font-bold leading-tight mb-4 ${
                isDark ? "text-white" : "text-foreground"
              }`}
            >
              {title}
            </h2>
            <div className="w-12 h-1 rounded-full bg-solar-green mb-4" />

            {descriptions.map((desc, i) => (
              <p
                key={i}
                className={`text-sm sm:text-base leading-relaxed mb-3 ${
                 ( isDark ? "text-white" : "text-muted-foreground" )
                }`}
              >
                {desc}
              </p>
            ))}

            {highlight && (
              <p
                className={`text-sm sm:text-base leading-relaxed mt-4 p-4 rounded-lg border-l-4 border-solar-green ${
                  isDark
                    ? "bg-white/5 text-white/80"
                    : "bg-solar-green/5 text-foreground"
                }`}
              >
                {highlight}
              </p>
            )}

            {cta && (
              <Button
                onClick={() => ctaRoute && navigate(ctaRoute)}
                className="mt-6 bg-solar-green hover:bg-solar-green-dark text-white rounded-lg px-6 h-11 text-sm font-semibold transition-all duration-300"
              >
                {cta}
              </Button>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
