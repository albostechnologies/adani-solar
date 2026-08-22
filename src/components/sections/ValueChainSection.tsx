"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "./SectionHeading";
import { Layers, Circle, Sun, LayoutGrid, type LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Layers,
  Circle,
  Sun,
  LayoutGrid,
};

interface ValueChainStep {
  id: string;
  title: string;
  description: string;
  icon: string;
  image?: string;
}

interface ValueChainSectionProps {
  title: string;
  subtitle?: string;
  steps: ValueChainStep[];
  variant?: "light" | "dark";
}

export function ValueChainSection({
  title,
  subtitle,
  steps,
  variant = "light",
}: ValueChainSectionProps) {
  const [activeStep, setActiveStep] = useState(0);
  const isDark = variant === "dark";

  return (
    <section
      className={`py-16 sm:py-20 lg:py-24 ${isDark ? "bg-solar-dark" : "bg-solar-green/5"}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title={title}
          subtitle={subtitle}
          variant={variant}
        />

        {/* Connected step tabs with progress line */}
        <div className="mt-8 sm:mt-10 relative">
          {/* Background progress line */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-solar-green/10 -translate-y-1/2 hidden sm:block" />
          {/* Active progress line */}
          <motion.div
            className="absolute top-1/2 left-0 h-0.5 bg-solar-green -translate-y-1/2 hidden sm:block"
            animate={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          />

          <div className="flex flex-wrap gap-2 sm:gap-0 justify-center relative z-10">
            {steps.map((step, index) => {
              const Icon = iconMap[step.icon] || Layers;
              const isActive = activeStep === index;
              return (
                <button
                  key={step.id}
                  onClick={() => setActiveStep(index)}
                  className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-full text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? "bg-solar-green text-white shadow-lg shadow-solar-green/25"
                      : isDark
                        ? "bg-white/10 text-white/70 hover:bg-white/20"
                        : "bg-white text-foreground hover:bg-solar-green/10 border border-border"
                  } ${index < steps.length - 1 ? "sm:mr-6 lg:mr-10" : ""}`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-white" : isDark ? "text-solar-green-light" : "text-solar-green"}`} />
                  <span className="hidden sm:inline">{step.title}</span>
                  <span className="sm:hidden">{step.title}</span>
                  {/* Step number badge for mobile */}
                  <span className={`inline-flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-bold sm:hidden ${
                    isActive ? "bg-white/30 text-white" : isDark ? "bg-white/10 text-white/50" : "bg-solar-green/10 text-solar-green"
                  }`}>
                    {index + 1}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active step content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="mt-8 sm:mt-10"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Image / Visual */}
              <div
                className={`rounded-2xl overflow-hidden aspect-[16/10] ${
                  isDark ? "bg-white/5" : "bg-white"
                } shadow-xl relative`}
              >
                {steps[activeStep].image ? (
                  <div
                    className="w-full h-full bg-cover bg-center"
                    style={{
                      backgroundImage: `url(${steps[activeStep].image})`,
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-solar-green/10 to-solar-green/5">
                    <div className="w-24 h-24 rounded-full bg-solar-green/20 flex items-center justify-center">
                      <span className="font-[family-name:var(--font-poppins)] text-4xl font-bold text-solar-green">
                        {activeStep + 1}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Text */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-solar-green text-white text-sm font-bold">
                    {activeStep + 1}
                  </span>
                  <span className="text-solar-green font-bold text-sm tracking-wider uppercase">
                    Step {activeStep + 1} of {steps.length}
                  </span>
                </div>
                <h3
                  className={`font-[family-name:var(--font-poppins)] text-xl sm:text-2xl md:text-3xl font-bold mb-4 ${
                    isDark ? "text-white" : "text-foreground"
                  }`}
                >
                  {steps[activeStep].title}
                </h3>
                <p
                  className={`text-sm sm:text-base leading-relaxed ${
                    isDark ? "text-white/70" : "text-muted-foreground"
                  }`}
                >
                  {steps[activeStep].description}
                </p>

                {/* Step navigation dots */}
                <div className="mt-6 flex items-center gap-2">
                  {steps.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveStep(index)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        activeStep === index
                          ? "w-8 bg-solar-green"
                          : "w-3 bg-solar-green/20 hover:bg-solar-green/40"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
