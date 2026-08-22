"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter, type RouteName } from "@/lib/router";

interface CTASectionProps {
  title: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaRoute?: RouteName;
  variant?: "green" | "dark";
}

export function CTASection({
  title,
  subtitle,
  ctaLabel = "Contact Us",
  ctaRoute = "contact",
  variant = "green",
}: CTASectionProps) {
  const { navigate } = useRouter();

  const isGreen = variant === "green";

  return (
    <section
      className={`py-12 sm:py-16 ${isGreen ? "bg-solar-green" : "bg-solar-dark"}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2
          className={`font-[family-name:var(--font-poppins)] text-2xl sm:text-3xl md:text-4xl font-bold mb-3 ${
            isGreen ? "text-white" : "text-white"
          }`}
        >
          {title}
        </h2>
        {subtitle && (
          <p
            className={`text-base sm:text-lg mb-6 sm:mb-8 max-w-2xl mx-auto ${
              isGreen ? "text-white/90" : "text-white/70"
            }`}
          >
            {subtitle}
          </p>
        )}
        <Button
          onClick={() => navigate(ctaRoute)}
          size="lg"
          className={`rounded-lg px-8 h-12 text-base font-semibold ${
            isGreen
              ? "bg-white text-solar-green hover:bg-white/90"
              : "bg-solar-green text-white hover:bg-solar-green-dark"
          }`}
        >
          {ctaLabel}
        </Button>
      </div>
    </section>
  );
}
