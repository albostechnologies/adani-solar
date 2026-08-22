"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sun, Zap, Clock, ArrowRight } from "lucide-react";

/** Solar irradiance multiplier per state (relative to average) */
const STATE_IRRADIANCE: Record<string, number> = {
  Gujarat: 1.15,
  Rajasthan: 1.3,
  "Tamil Nadu": 1.05,
  Karnataka: 1.1,
  Maharashtra: 1.0,
};

/** Roof type efficiency multiplier */
const ROOF_EFFICIENCY: Record<string, number> = {
  Rooftop: 1.0,
  "Ground-mounted": 1.15,
  Carport: 0.9,
};

const BILL_PRESETS = [
  { label: "₹2,000", value: 2000 },
  { label: "₹5,000", value: 5000 },
  { label: "₹10,000", value: 10000 },
  { label: "₹20,000", value: 20000 },
  { label: "₹50,000", value: 50000 },
];

const ROOF_TYPES = ["Rooftop", "Ground-mounted", "Carport"] as const;
const STATES = Object.keys(STATE_IRRADIANCE);

interface SavingsResult {
  monthlySavings: number;
  systemSizeKw: number;
  paybackYears: number;
}

/** Animated counter that counts up from 0 to target */
function AnimatedCounter({
  value,
  suffix = "",
  prefix = "",
  duration = 1200,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    if (start === end) return;

    const startTime = performance.now();
    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(start + (end - start) * eased);
      setDisplay(current);
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);
  }, [value, duration]);

  const formatted =
    display >= 1000
      ? display.toLocaleString("en-IN")
      : display.toString();

  return (
    <span className="tabular-nums">
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}

/** Sun rays SVG pattern for background */
function SunRaysSVG() {
  return (
    <svg
      className="absolute inset-0 w-full h-full opacity-[0.07] pointer-events-none"
      viewBox="0 0 800 400"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="oklch(0.85 0.15 90)" stopOpacity="0.8" />
          <stop offset="100%" stopColor="oklch(0.85 0.15 90)" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* Central glow */}
      <circle cx="400" cy="200" r="160" fill="url(#sunGlow)" />
      {/* Rays */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i * 30 * Math.PI) / 180;
        const x1 = 400 + Math.cos(angle) * 80;
        const y1 = 200 + Math.sin(angle) * 80;
        const x2 = 400 + Math.cos(angle) * 220;
        const y2 = 200 + Math.sin(angle) * 220;
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="oklch(0.85 0.15 90)"
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.5"
          />
        );
      })}
    </svg>
  );
}

export function SolarSavingsBanner() {
  const [billAmount, setBillAmount] = useState<string>("5000");
  const [roofType, setRoofType] = useState<string>("Rooftop");
  const [state, setState] = useState<string>("Gujarat");
  const [results, setResults] = useState<SavingsResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const calculate = useCallback(() => {
    setIsCalculating(true);
    // Simulate brief computation
    setTimeout(() => {
      const bill = parseInt(billAmount, 10);
      const irradiance = STATE_IRRADIANCE[state] || 1.0;
      const roofEff = ROOF_EFFICIENCY[roofType] || 1.0;

      // Simplified solar savings model:
      // Average Indian electricity rate: ~₹8/kWh
      // Solar generation per kW per month: ~120 kWh * irradiance * roofEff
      // Monthly savings = generation * rate * 0.7 (accounting for self-consumption)
      const avgRatePerKwh = 8;
      const genPerKwPerMonth = 120 * irradiance * roofEff;
      const systemSizeKw = Math.round(
        (bill / avgRatePerKwh) / genPerKwPerMonth * 10
      ) / 10;
      const monthlySavings = Math.round(
        systemSizeKw * genPerKwPerMonth * avgRatePerKwh * 0.7
      );
      // System cost: ~₹50,000/kW, payback = cost / (monthly savings * 12)
      const systemCost = systemSizeKw * 50000;
      const paybackYears =
        Math.round((systemCost / (monthlySavings * 12)) * 10) / 10;

      setResults({ monthlySavings, systemSizeKw, paybackYears });
      setIsCalculating(false);
    }, 600);
  }, [billAmount, roofType, state]);

  const resultCards = results
    ? [
        {
          icon: Zap,
          label: "Monthly Savings",
          value: results.monthlySavings,
          prefix: "₹",
          suffix: "",
        },
        {
          icon: Sun,
          label: "System Size",
          value: results.systemSizeKw,
          prefix: "",
          suffix: " kW",
        },
        {
          icon: Clock,
          label: "Payback Period",
          value: results.paybackYears,
          prefix: "",
          suffix: " yrs",
        },
      ]
    : [];

  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-solar-green via-solar-green-dark to-solar-dark py-12 sm:py-16 lg:py-18">
      {/* Animated background */}
      <SunRaysSVG />
      <div className="absolute inset-0 bg-gradient-to-r from-solar-green/90 via-solar-green-dark/80 to-solar-dark/90 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left: Headline */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 border border-white/20 text-white/90 text-xs font-medium mb-4">
              <Sun className="w-3.5 h-3.5 text-solar-gold" />
              Quick Savings Estimator
            </div>
            <h2 className="font-[family-name:var(--font-poppins)] text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-white leading-tight">
              See How Much{" "}
              <span className="text-gradient-animated bg-clip-text text-transparent bg-gradient-to-r from-solar-gold via-white to-solar-gold">
                You Can Save
              </span>
            </h2>
            <p className="mt-3 text-white/70 text-base sm:text-lg leading-relaxed max-w-md">
              Get an instant estimate of your solar savings. Switch to clean
              energy and reduce your electricity bills by up to 70%.
            </p>
          </motion.div>

          {/* Right: Calculator */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
          >
            <div className="rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 p-5 sm:p-6 shadow-2xl">
              {/* Monthly Bill */}
              <div className="mb-4">
                <label className="block text-white/80 text-xs font-medium mb-1.5">
                  Monthly Electricity Bill
                </label>
                <Select
                  value={billAmount}
                  onValueChange={setBillAmount}
                >
                  <SelectTrigger className="w-full bg-white/10 border-white/20 text-white hover:bg-white/15 focus-visible:ring-solar-green-light data-[placeholder]:text-white/50">
                    <SelectValue placeholder="Select bill amount" />
                  </SelectTrigger>
                  <SelectContent className="bg-solar-dark border-white/20">
                    {BILL_PRESETS.map((preset) => (
                      <SelectItem
                        key={preset.value}
                        value={String(preset.value)}
                        className="text-white focus:bg-solar-green/30 focus:text-white"
                      >
                        {preset.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Roof Type - Pill Buttons */}
              <div className="mb-4">
                <label className="block text-white/80 text-xs font-medium mb-1.5">
                  Roof Type
                </label>
                <div className="flex gap-2 flex-wrap">
                  {ROOF_TYPES.map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setRoofType(type)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 border ${
                        roofType === type
                          ? "bg-white text-solar-green-dark border-white shadow-sm"
                          : "bg-white/10 text-white/70 border-white/20 hover:bg-white/20 hover:text-white"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* State Select */}
              <div className="mb-5">
                <label className="block text-white/80 text-xs font-medium mb-1.5">
                  State
                </label>
                <Select value={state} onValueChange={setState}>
                  <SelectTrigger className="w-full bg-white/10 border-white/20 text-white hover:bg-white/15 focus-visible:ring-solar-green-light data-[placeholder]:text-white/50">
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent className="bg-solar-dark border-white/20">
                    {STATES.map((s) => (
                      <SelectItem
                        key={s}
                        value={s}
                        className="text-white focus:bg-solar-green/30 focus:text-white"
                      >
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Calculate Button */}
              <button
                type="button"
                onClick={calculate}
                disabled={isCalculating}
                className={`w-full py-3 rounded-xl font-semibold text-sm transition-all duration-300 breathe-glow ${
                  isCalculating
                    ? "bg-white/50 text-solar-green-dark/50 cursor-wait"
                    : "bg-white text-solar-green-dark hover:bg-white/90 hover:shadow-lg active:scale-[0.98]"
                }`}
              >
                {isCalculating ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="animate-spin w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeDasharray="31.4 31.4"
                        strokeLinecap="round"
                      />
                    </svg>
                    Calculating...
                  </span>
                ) : (
                  "Calculate Savings"
                )}
              </button>

              {/* Results */}
              <AnimatePresence>
                {results && (
                  <motion.div
                    initial={{ opacity: 0, y: 20, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: "auto" }}
                    exit={{ opacity: 0, y: -10, height: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="overflow-hidden"
                  >
                    <div className="mt-5 pt-5 border-t border-white/15">
                      <div className="grid grid-cols-3 gap-3">
                        {resultCards.map((card, index) => {
                          const Icon = card.icon;
                          return (
                            <motion.div
                              key={card.label}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{
                                delay: index * 0.12,
                                type: "spring",
                                stiffness: 200,
                                damping: 15,
                              }}
                              className="rounded-xl bg-white/10 backdrop-blur-md border border-white/15 p-3 text-center hover-lift-rotate cursor-default"
                            >
                              <Icon className="w-5 h-5 text-solar-gold mx-auto mb-1.5" />
                              <div className="text-solar-green-light font-bold text-lg sm:text-xl leading-none">
                                <AnimatedCounter
                                  value={card.value}
                                  prefix={card.prefix}
                                  suffix={card.suffix}
                                />
                              </div>
                              <div className="text-white/60 text-[10px] sm:text-xs mt-1 leading-tight">
                                {card.label}
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>

                      {/* CTA Link */}
                      <motion.a
                        href="/why-solar"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-white/90 hover:text-white animated-underline transition-colors"
                      >
                        Get Detailed Quote
                        <ArrowRight className="w-4 h-4" />
                      </motion.a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
