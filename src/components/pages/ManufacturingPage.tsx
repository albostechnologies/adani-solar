"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import {
  motion,
  useInView,
  AnimatePresence,
  useMotionValue,
  animate,
} from "framer-motion";
import { manufacturingContent } from "@/content/manufacturing";
import { useRouter } from "@/lib/router";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { ScrollReveal } from "@/components/ScrollReveal";
import { FacilityVideoSection } from "@/components/sections/FacilityVideoSection";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Atom,
  Boxes,
  Scissors,
  Cpu,
  Gauge,
  LayoutGrid,
  ShieldCheck,
  Package,
  Brain,
  Bot,
  Activity,
  Wifi,
  CheckCircle2,
  ChevronRight,
  ArrowRight,
  MapPin,
  Users,
  Factory,
  Calendar,
  Globe2,
  Zap,
  Play,
  Pause,
  Download,
  type LucideIcon,
} from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  Atom,
  Boxes,
  Scissors,
  Cpu,
  Gauge,
  LayoutGrid,
  ShieldCheck,
  Package,
  Brain,
  Bot,
  Activity,
  Wifi,
};

// ─── Animated Counter ────────────────────────────────────────────────
function AnimatedCounter({
  target,
  duration = 2,
  decimals = 0,
  suffix = "",
}: {
  target: number;
  duration?: number;
  decimals?: number;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const mv = useMotionValue(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, target, {
      duration,
      ease: [0.25, 0.46, 0.45, 0.94],
    });
    return () => controls.stop();
  }, [inView, target, duration, mv]);

  useEffect(() => {
    const unsubscribe = mv.on("change", (v) => {
      if (ref.current) {
        ref.current.textContent = v.toFixed(decimals) + suffix;
      }
    });
    return unsubscribe;
  }, [mv, decimals, suffix]);

  return (
    <span ref={ref} className="tabular-nums">
      {(0).toFixed(decimals)}
      {suffix}
    </span>
  );
}

// ─── Circular Progress Ring ──────────────────────────────────────────
function CircularProgressRing({
  percentage,
  color,
  size = 120,
  strokeWidth = 8,
  inView,
}: {
  percentage: number;
  color: string;
  size?: number;
  strokeWidth?: number;
  inView: boolean;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const center = size / 2;
  const progressOffset = circumference - (percentage / 100) * circumference;
  const dashOffset = useMotionValue(circumference);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(dashOffset, progressOffset, {
      duration: 2,
      ease: [0.25, 0.46, 0.45, 0.94],
      delay: 0.2,
    });
    return () => controls.stop();
  }, [inView, progressOffset, dashOffset]);

  const [currentOffset, setCurrentOffset] = useState(circumference);
  useEffect(() => {
    const unsubscribe = dashOffset.on("change", (v) => setCurrentOffset(v));
    return unsubscribe;
  }, [dashOffset]);

  const gradientId = `mfg-grad-${color.replace("#", "")}-${size}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="transform -rotate-90"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={color} />
          <stop offset="100%" stopColor="#86efac" />
        </linearGradient>
      </defs>
      <circle
        cx={center}
        cy={center}
        r={radius}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        className="text-white/10"
      />
      <circle
        cx={center}
        cy={center}
        r={radius}
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={currentOffset}
        style={{ transition: "none" }}
      />
    </svg>
  );
}

// ─── Stat Card Icons ─────────────────────────────────────────────────
const STAT_ICONS: LucideIcon[] = [Zap, Factory, Users, MapPin, Calendar, Globe2];

// ─── Manufacturing Page ──────────────────────────────────────────────
export function ManufacturingPage() {
  const c = manufacturingContent;
  const { navigate } = useRouter();
  const [activeStep, setActiveStep] = useState(0);
  const [autoPlay, setAutoPlay] = useState(false);

  // Auto-advance
  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % c.processSteps.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [autoPlay, c.processSteps.length]);

  return (
    <main>
      {/* ─── Hero Section ─── */}
      <ManufacturingHero />

      {/* ─── Facility Overview ─── */}
      <FacilityOverview />

      <FacilityVideoSection
        title={c.facilityVideo.title}
        subtitle={c.facilityVideo.subtitle}
        poster={c.facilityVideo.poster}
        youtubeUrl={c.facilityVideo.youtubeUrl}
      />

      {/* ─── Manufacturing Process Steps ─── */}
      <ProcessStepper
        steps={c.processSteps}
        activeStep={activeStep}
        setActiveStep={setActiveStep}
        autoPlay={autoPlay}
        setAutoPlay={setAutoPlay}
      />

      {/* ─── Quality Metrics Dashboard ─── */}
      <QualityDashboard metrics={c.qualityMetrics} />

      {/* ─── Automation & Smart Factory ─── */}
      <AutomationSection items={c.automation} />

      {/* ─── CTA Section ─── */}
      <CTASection />
    </main>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────
function ManufacturingHero() {
  const c = manufacturingContent;
  const { navigate } = useRouter();

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center bg-solar-dark overflow-hidden">
      {c.hero.backgroundImage && (
        <>
          <Image
            src={c.hero.backgroundImage}
            alt="Adani Solar Mundra manufacturing facility"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-solar-dark/70" />
        </>
      )}
      {/* Animated factory SVG background */}
      <div className="absolute inset-0 opacity-15">
        <svg
          className="w-full h-full"
          viewBox="0 0 1200 600"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          {/* Conveyor belt */}
          <motion.line
            x1="0" y1="400" x2="1200" y2="400"
            stroke="#00a651" strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
          {/* Factory buildings */}
          <rect x="100" y="200" width="180" height="200" fill="none" stroke="#00a651" strokeWidth="1.5" rx="4" />
          <rect x="340" y="150" width="200" height="250" fill="none" stroke="#00a651" strokeWidth="1.5" rx="4" />
          <rect x="600" y="180" width="160" height="220" fill="none" stroke="#00a651" strokeWidth="1.5" rx="4" />
          <rect x="820" y="160" width="220" height="240" fill="none" stroke="#00a651" strokeWidth="1.5" rx="4" />
          {/* Roof details */}
          <polygon points="100,200 190,140 280,200" fill="none" stroke="#00a651" strokeWidth="1" />
          <polygon points="340,150 440,80 540,150" fill="none" stroke="#00a651" strokeWidth="1" />
          <polygon points="600,180 680,120 760,180" fill="none" stroke="#00a651" strokeWidth="1" />
          <polygon points="820,160 930,90 1040,160" fill="none" stroke="#00a651" strokeWidth="1" />
          {/* Animated solar panels on roofs */}
          {[190, 440, 680, 930].map((cx, i) => (
            <motion.circle
              key={i}
              cx={cx}
              cy={i % 2 === 0 ? 130 : 75}
              r="8"
              fill="#00a651"
              initial={{ opacity: 0.2, scale: 0.5 }}
              animate={{ opacity: [0.2, 0.8, 0.2], scale: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
            />
          ))}
          {/* Gear cogs */}
          {[
            { cx: 150, cy: 300 },
            { cx: 440, cy: 280 },
            { cx: 680, cy: 300 },
            { cx: 930, cy: 280 },
          ].map((gear, i) => (
            <motion.g key={i} animate={{ rotate: 360 }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }} style={{ transformOrigin: `${gear.cx}px ${gear.cy}px` }}>
              <circle cx={gear.cx} cy={gear.cy} r="25" fill="none" stroke="#00a651" strokeWidth="1.5" />
              <circle cx={gear.cx} cy={gear.cy} r="8" fill="#00a651" opacity="0.3" />
              {[0, 60, 120, 180, 240, 300].map((angle) => (
                <line
                  key={angle}
                  x1={gear.cx + 20 * Math.cos((angle * Math.PI) / 180)}
                  y1={gear.cy + 20 * Math.sin((angle * Math.PI) / 180)}
                  x2={gear.cx + 30 * Math.cos((angle * Math.PI) / 180)}
                  y2={gear.cy + 30 * Math.sin((angle * Math.PI) / 180)}
                  stroke="#00a651"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              ))}
            </motion.g>
          ))}
        </svg>
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-solar-dark via-transparent to-solar-dark/50" />
      <div className="absolute inset-0 bg-gradient-to-r from-solar-dark/60 via-transparent to-solar-dark/60" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-solar-green/10 border border-solar-green/20 text-solar-green-light text-sm font-medium mb-6">
            <Factory className="w-4 h-4" />
            Mundra, Gujarat , India&apos;s Largest Solar PV Facility
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-[family-name:var(--font-poppins)] text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
        >
          {c.hero.title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg sm:text-xl text-white max-w-2xl mx-auto mb-10 leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)]"
        >
          {c.hero.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button
            size="lg"
            className="bg-solar-green hover:bg-solar-green-dark text-white font-semibold px-8 shadow-lg shadow-solar-green/25"
            onClick={() => {
              document.getElementById("process-stepper")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Explore Process
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10 hover:text-white px-8"
            onClick={() => navigate("contact")}
          >
            Download Brochure
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Facility Overview ────────────────────────────────────────────────
function FacilityOverview() {
  const c = manufacturingContent;

  return (
    <ScrollReveal>
      <section className="py-16 sm:py-20 lg:py-24 bg-white relative">
        {/* Subtle map-like background */}
        <div className="absolute inset-0 opacity-[0.03]">
          <svg className="w-full h-full" viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
            <circle cx="400" cy="200" r="180" fill="none" stroke="#00a651" strokeWidth="1" strokeDasharray="4 4" />
            <circle cx="400" cy="200" r="120" fill="none" stroke="#00a651" strokeWidth="1" strokeDasharray="4 4" />
            <circle cx="400" cy="200" r="60" fill="none" stroke="#00a651" strokeWidth="1" strokeDasharray="4 4" />
            <line x1="100" y1="200" x2="700" y2="200" stroke="#00a651" strokeWidth="0.5" strokeDasharray="2 6" />
            <line x1="400" y1="50" x2="400" y2="350" stroke="#00a651" strokeWidth="0.5" strokeDasharray="2 6" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeading
            title={c.overview.title}
            subtitle={c.overview.subtitle}
            variant="light"
          />
          <div className="mt-10 sm:mt-12 grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {c.overview.stats.map((stat, index) => {
              const Icon = STAT_ICONS[index] || Zap;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="rounded-2xl p-5 sm:p-6 bg-gradient-to-br from-solar-green/5 to-white border border-border hover:border-solar-green/30 shadow-sm hover:shadow-md transition-all duration-300 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-solar-green/10 flex items-center justify-center mb-3 group-hover:bg-solar-green/20 transition-colors">
                    <Icon className="w-5 h-5 text-solar-green" />
                  </div>
                  <div className="font-[family-name:var(--font-poppins)] text-3xl sm:text-4xl font-bold text-solar-dark mb-1">
                    <AnimatedCounter
                      target={stat.value}
                      duration={2}
                      decimals={stat.value % 1 !== 0 ? 1 : 0}
                      suffix={stat.unit}
                    />
                  </div>
                  <h3 className="font-[family-name:var(--font-poppins)] text-sm font-semibold text-foreground mb-1">
                    {stat.label}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {stat.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </ScrollReveal>
  );
}

// ─── Process Stepper ──────────────────────────────────────────────────
function ProcessStepper({
  steps,
  activeStep,
  setActiveStep,
  autoPlay,
  setAutoPlay,
}: {
  steps: typeof manufacturingContent.processSteps;
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  autoPlay: boolean;
  setAutoPlay: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  // Scroll active step into view on desktop horizontal timeline
  useEffect(() => {
    if (isMobile || !scrollRef.current) return;
    const container = scrollRef.current;
    const stepNodes = container.querySelectorAll("[data-step-node]");
    const target = stepNodes[activeStep] as HTMLElement | undefined;
    if (target) {
      const containerRect = container.getBoundingClientRect();
      const targetRect = target.getBoundingClientRect();
      const scrollLeft = container.scrollLeft + targetRect.left - containerRect.left - containerRect.width / 2 + targetRect.width / 2;
      container.scrollTo({ left: scrollLeft, behavior: "smooth" });
    }
  }, [activeStep, isMobile]);

  const activeData = steps[activeStep];
  const ActiveIcon = ICON_MAP[activeData.icon] || Cpu;

  return (
    <section id="process-stepper" className="py-16 sm:py-20 lg:py-24 bg-solar-dark relative grain-overlay">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          title="The Manufacturing Journey"
          subtitle="8 precision steps from raw polysilicon to export-ready solar modules , each step engineered for quality and efficiency."
          variant="dark"
        />

        {/* Controls */}
        <div className="mt-6 flex items-center justify-between">
          <span className="text-sm text-white/50">
            Step {activeStep + 1} of {steps.length}
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setAutoPlay(!autoPlay)}
            className="text-solar-green-light hover:text-solar-green hover:bg-solar-green/10"
          >
            {autoPlay ? <Pause className="w-4 h-4 mr-1" /> : <Play className="w-4 h-4 mr-1" />}
            {autoPlay ? "Pause" : "Auto Play"}
          </Button>
        </div>

        {/* ── Horizontal Timeline (Desktop) / Vertical (Mobile) ── */}
        {isMobile ? (
          /* Mobile: Vertical timeline */
          <div className="mt-8 relative">
            {/* Vertical line */}
            <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-white/10" />
            <div
              className="absolute left-5 top-0 w-0.5 bg-solar-green transition-all duration-500"
              style={{ height: `${((activeStep + 1) / steps.length) * 100}%` }}
            />

            <div className="space-y-4">
              {steps.map((step, idx) => {
                const StepIcon = ICON_MAP[step.icon] || Cpu;
                const isActive = idx === activeStep;
                return (
                  <div key={idx} className="relative flex gap-4">
                    {/* Node */}
                    <button
                      onClick={() => setActiveStep(idx)}
                      className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                        isActive
                          ? "bg-solar-green text-white shadow-lg shadow-solar-green/30"
                          : idx < activeStep
                          ? "bg-solar-green/20 text-solar-green-light"
                          : "bg-solar-dark-secondary text-white/40 border border-white/10"
                      }`}
                    >
                      <StepIcon className="w-4 h-4" />
                    </button>

                    {/* Content */}
                    <div
                      onClick={() => setActiveStep(idx)}
                      className={`flex-1 rounded-xl p-4 cursor-pointer transition-all duration-300 ${
                        isActive
                          ? "bg-white/5 border border-solar-green/30"
                          : "bg-transparent border border-transparent hover:bg-white/[0.02]"
                      }`}
                    >
                      <h4 className={`font-[family-name:var(--font-poppins)] text-sm font-semibold ${isActive ? "text-white" : "text-white/60"}`}>
                        {step.title}
                      </h4>
                      {isActive && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="text-xs text-white/50 mt-1 leading-relaxed"
                        >
                          {step.description}
                        </motion.p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          /* Desktop: Horizontal timeline */
          <div
            ref={scrollRef}
            className="mt-8 overflow-x-auto scrollbar-thin"
          >
            <div className="flex items-start gap-0 min-w-max pb-4">
              {steps.map((step, idx) => {
                const StepIcon = ICON_MAP[step.icon] || Cpu;
                const isActive = idx === activeStep;
                const isCompleted = idx < activeStep;
                return (
                  <React.Fragment key={idx}>
                    {/* Node */}
                    <button
                      data-step-node
                      onClick={() => setActiveStep(idx)}
                      className={`relative z-10 flex flex-col items-center gap-2 w-28 shrink-0 transition-all duration-300 group ${
                        isActive ? "scale-110" : ""
                      }`}
                    >
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                          isActive
                            ? "bg-solar-green text-white shadow-lg shadow-solar-green/30 ring-4 ring-solar-green/20"
                            : isCompleted
                            ? "bg-solar-green/20 text-solar-green-light"
                            : "bg-solar-dark-secondary text-white/40 border border-white/10 group-hover:border-solar-green/30"
                        }`}
                      >
                        <StepIcon className="w-5 h-5" />
                      </div>
                      <span
                        className={`text-xs font-medium text-center leading-tight transition-colors duration-300 ${
                          isActive ? "text-white" : isCompleted ? "text-solar-green-light" : "text-white/40"
                        }`}
                      >
                        {step.title}
                      </span>
                    </button>

                    {/* Connector line */}
                    {idx < steps.length - 1 && (
                      <div className="flex items-center self-start mt-5 w-12 shrink-0">
                        <div className="w-full h-0.5 rounded-full bg-white/10 relative overflow-hidden">
                          <motion.div
                            className="absolute inset-y-0 left-0 bg-solar-green rounded-full"
                            initial={{ width: isCompleted ? "100%" : "0%" }}
                            animate={{
                              width: isCompleted ? "100%" : isActive ? "50%" : "0%",
                            }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                          />
                        </div>
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        )}

        {/* ── Expanded Step Detail Card ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="mt-10 rounded-2xl overflow-hidden border border-white/10"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Image placeholder */}
              <div
                className="aspect-[4/3] lg:aspect-auto relative"
                style={{
                  background: `linear-gradient(135deg, ${activeData.imageGradient[0]}, ${activeData.imageGradient[1]})`,
                }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="w-24 h-24 rounded-3xl bg-white/10 backdrop-blur-sm flex items-center justify-center"
                  >
                    <ActiveIcon className="w-12 h-12 text-white" />
                  </motion.div>
                </div>
                {/* Step number badge */}
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-solar-green text-white font-bold text-sm shadow-lg">
                    {activeStep + 1}
                  </span>
                </div>
              </div>

              {/* Detail content */}
              <div className="p-6 sm:p-8 lg:p-10 bg-solar-dark-secondary/50 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-solar-green/20 text-solar-green-light text-xs font-bold">
                    {activeStep + 1}
                  </span>
                  <h3 className="font-[family-name:var(--font-poppins)] text-xl sm:text-2xl font-bold text-white">
                    {activeData.title}
                  </h3>
                </div>

                <p className="text-white/60 leading-relaxed mb-6">
                  {activeData.description}
                </p>

                <ul className="space-y-3">
                  {activeData.details.map((detail, dIdx) => (
                    <motion.li
                      key={dIdx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 + dIdx * 0.08 }}
                      className="flex items-start gap-2 text-sm text-white/70"
                    >
                      <CheckCircle2 className="w-4 h-4 text-solar-green shrink-0 mt-0.5" />
                      <span>{detail}</span>
                    </motion.li>
                  ))}
                </ul>

                {/* Navigation */}
                <div className="flex items-center gap-3 mt-8 pt-6 border-t border-white/10">
                  <Button
                    variant="ghost"
                    size="sm"
                    disabled={activeStep === 0}
                    onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
                    className="text-white/50 hover:text-white hover:bg-white/5 disabled:opacity-30"
                  >
                    ← Previous
                  </Button>
                  <div className="flex gap-1.5">
                    {steps.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveStep(idx)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          idx === activeStep
                            ? "bg-solar-green w-6"
                            : idx < activeStep
                            ? "bg-solar-green/40"
                            : "bg-white/20"
                        }`}
                        aria-label={`Go to step ${idx + 1}`}
                      />
                    ))}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    disabled={activeStep === steps.length - 1}
                    onClick={() => setActiveStep(Math.min(steps.length - 1, activeStep + 1))}
                    className="text-white/50 hover:text-white hover:bg-white/5 disabled:opacity-30"
                  >
                    Next →
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

// ─── Quality Metrics Dashboard ────────────────────────────────────────
function QualityDashboard({ metrics }: { metrics: typeof manufacturingContent.qualityMetrics }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const sectionInView = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <ScrollReveal>
      <section ref={sectionRef} className="py-16 sm:py-20 lg:py-24 bg-white relative">
        {/* Dots pattern background */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle, #00a651 1px, transparent 1px)", backgroundSize: "24px 24px" }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeading
            title="Quality Metrics Dashboard"
            subtitle="Every module shipped meets the highest international quality standards , here are the numbers that prove it."
            variant="light"
          />
          <div className="mt-10 sm:mt-12 grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {metrics.map((metric, index) => {
              const isHigh = metric.percentage >= 95;
              const color = isHigh ? "#00a651" : "#d97706";
              return (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="rounded-2xl p-5 sm:p-6 bg-gradient-to-br from-solar-green/5 to-white border border-border hover:border-solar-green/30 shadow-sm hover:shadow-md transition-all duration-300 text-center"
                >
                  {/* Circular progress */}
                  <div className="flex justify-center mb-4 relative">
                    <CircularProgressRing
                      percentage={metric.percentage}
                      color={color}
                      size={90}
                      strokeWidth={6}
                      inView={sectionInView}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-[family-name:var(--font-poppins)] text-lg font-bold text-foreground">
                        {metric.label === "EL Imaging"
                          ? "0"
                          : metric.label === "PID Resistance"
                          ? "<1%"
                          : `${metric.value}${metric.unit}`}
                      </span>
                    </div>
                  </div>

                  <h3 className="font-[family-name:var(--font-poppins)] text-sm font-semibold text-foreground mb-1">
                    {metric.label}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {metric.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </ScrollReveal>
  );
}

// ─── Automation & Smart Factory ───────────────────────────────────────
function AutomationSection({ items }: { items: typeof manufacturingContent.automation }) {
  return (
    <ScrollReveal>
      <section className="py-16 sm:py-20 lg:py-24 bg-solar-dark relative grain-overlay">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeading
            title="Automation & Smart Factory"
            subtitle="Industry 4.0 technologies powering our next-generation manufacturing , AI, robotics, IoT and real-time analytics."
            variant="dark"
          />
          <div className="mt-10 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {items.map((item, index) => {
              const Icon = ICON_MAP[item.icon] || Cpu;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                  className="group relative rounded-2xl p-6 bg-white/5 border border-white/10 hover:border-solar-green/30 transition-all duration-300 overflow-hidden"
                >
                  {/* Animated border glow */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: "conic-gradient(from 0deg, transparent, #00a651, transparent, transparent)",
                      padding: "1px",
                    }}
                  >
                    <div className="w-full h-full rounded-2xl bg-solar-dark" />
                  </motion.div>

                  {/* Glow effect on hover */}
                  <div className="absolute -top-20 -right-20 w-40 h-40 bg-solar-green/0 group-hover:bg-solar-green/10 rounded-full blur-3xl transition-all duration-500" />

                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-xl bg-solar-green/10 flex items-center justify-center mb-4 group-hover:bg-solar-green/20 transition-colors">
                      <Icon className="w-6 h-6 text-solar-green-light" />
                    </div>
                    <h3 className="font-[family-name:var(--font-poppins)] text-base font-semibold text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-white/50 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </ScrollReveal>
  );
}

// ─── CTA Section ──────────────────────────────────────────────────────
function CTASection() {
  const c = manufacturingContent;
  const { navigate } = useRouter();

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-solar-green to-solar-green-dark relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <pattern id="cta-grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
          </pattern>
          <rect width="800" height="400" fill="url(#cta-grid)" />
        </svg>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-[family-name:var(--font-poppins)] text-3xl sm:text-4xl font-bold text-white mb-4"
        >
          {c.ctaSection.title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-lg text-white/80 mb-10 leading-relaxed"
        >
          {c.ctaSection.subtitle}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button
            size="lg"
            className="bg-white text-solar-green hover:bg-white/90 font-semibold px-8 shadow-lg"
            onClick={() => navigate("contact")}
          >
            Visit Our Facility
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white/30 text-white hover:bg-white/10 hover:text-white px-8"
            onClick={() => navigate("contact")}
          >
            <Download className="w-4 h-4 mr-2" />
            Manufacturing Brochure
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Utility: useIsMobile ─────────────────────────────────────────────
function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < breakpoint);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, [breakpoint]);

  return isMobile;
}
