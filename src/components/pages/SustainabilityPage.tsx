"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView, AnimatePresence, useMotionValue, animate } from "framer-motion";
import { sustainabilityContent } from "@/content/sustainability";
import { useRouter } from "@/lib/router";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Button } from "@/components/ui/button";
import {
  CloudOff,
  TreePine,
  Zap,
  Droplets,
  Mountain,
  Recycle,
  TrendingDown,
  Sun,
  Leaf,
  Trophy,
  Target,
  Cpu,
  Globe2,
  Handshake,
  Download,
  ArrowRight,
  ChevronRight,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";

const ICON_MAP: Record<string, LucideIcon> = {
  CloudOff,
  TreePine,
  Zap,
  Droplets,
  Mountain,
  Recycle,
  TrendingDown,
  Sun,
  Leaf,
  Trophy,
  Target,
  Cpu,
  Globe2,
  Handshake,
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
      {(0).toFixed(decimals)}{suffix}
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

  const currentProgress = ((circumference - currentOffset) / circumference) * 100;

  const gradientId = `progress-grad-${color.replace("#", "")}`;

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
      {/* Background circle */}
      <circle
        cx={center}
        cy={center}
        r={radius}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        className="text-white/10"
      />
      {/* Progress circle */}
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

// ─── Impact Metric Card ──────────────────────────────────────────────
function ImpactMetricCard({
  metric,
  index,
}: {
  metric: (typeof sustainabilityContent.impactMetrics)[0];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const inView = useInView(cardRef, { once: true, amount: 0.3 });
  const Icon = ICON_MAP[metric.icon] || Zap;
  const percentage = Math.round((metric.value / metric.target) * 100);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className="group glass-premium rounded-2xl p-5 sm:p-6 border border-white/10 hover:border-solar-green/30 hover:shadow-lg hover:shadow-solar-green/10 transition-all duration-300"
    >
      {/* Icon */}
      <div className="flex items-center justify-between mb-4">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: `${metric.color}20` }}
        >
          <Icon className="w-5 h-5" style={{ color: metric.color }} />
        </div>
        <span className="text-xs font-medium text-solar-green-light bg-solar-green/10 px-2 py-1 rounded-full">
          {percentage}%
        </span>
      </div>

      {/* Circular progress */}
      <div className="flex justify-center mb-4 relative">
        <CircularProgressRing
          percentage={percentage}
          color={metric.color}
          size={100}
          strokeWidth={7}
          inView={inView}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <AnimatedCounter
            target={percentage}
            duration={2}
            suffix="%"
          />
        </div>
      </div>

      {/* Label */}
      <h3 className="text-sm font-semibold text-white/90 text-center mb-1">
        {metric.label}
      </h3>

      {/* Value */}
      <p className="text-xl font-bold text-white text-center mb-1">
        <AnimatedCounter
          target={metric.value}
          duration={2}
          decimals={metric.value % 1 !== 0 ? 1 : 0}
        />{" "}
        <span className="text-sm font-medium text-white/60">{metric.unit}</span>
      </p>

      {/* Target */}
      <p className="text-xs text-white/40 text-center mb-2">
        Target: {metric.target}{metric.unit.includes("%") ? "%" : ""}
      </p>

      {/* Description */}
      <p className="text-xs text-white/50 text-center leading-relaxed line-clamp-2">
        {metric.description}
      </p>
    </motion.div>
  );
}

// ─── SVG Trend Chart ─────────────────────────────────────────────────
function TrendChart({ data }: { data: typeof sustainabilityContent.annualData }) {
  const chartRef = useRef<SVGSVGElement>(null);
  const inView = useInView(chartRef, { once: true, amount: 0.2 });
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const W = 800;
  const H = 400;
  const padL = 60;
  const padR = 30;
  const padT = 30;
  const padB = 50;
  const innerW = W - padL - padR;
  const innerH = H - padT - padB;

  const years = data.map((d) => d.year);
  const xScale = (i: number) => padL + (i / (data.length - 1)) * innerW;

  // Lines to draw
  const lines = [
    {
      key: "co2Offset",
      label: "CO₂ Offset (M Tonnes)",
      color: "#00a651",
      data: data.map((d) => d.co2Offset),
      maxVal: 20,
    },
    {
      key: "capacity",
      label: "Capacity (GW)",
      color: "#eab308",
      data: data.map((d) => d.capacity),
      maxVal: 15,
    },
    {
      key: "investment",
      label: "Investment (B$)",
      color: "#3b82f6",
      data: data.map((d) => d.investment),
      maxVal: 8,
    },
  ];

  const yScale = (val: number, maxVal: number) =>
    padT + innerH - (val / maxVal) * innerH;

  const gridLines = 5;

  return (
    <div className="w-full overflow-x-auto">
      <svg
        ref={chartRef}
        viewBox={`0 0 ${W} ${H}`}
        className="w-full min-w-[600px] h-auto"
        role="img"
        aria-label="Annual sustainability trend chart showing CO₂ offset, capacity, and investment over years"
      >
        {/* Grid lines */}
        {Array.from({ length: gridLines + 1 }, (_, i) => {
          const y = padT + (i / gridLines) * innerH;
          return (
            <line
              key={`grid-${i}`}
              x1={padL}
              y1={y}
              x2={W - padR}
              y2={y}
              stroke="#e5e7eb"
              strokeWidth={0.5}
              strokeDasharray={i === gridLines ? "0" : "4 4"}
            />
          );
        })}

        {/* Y-axis labels (left for CO₂) */}
        {Array.from({ length: gridLines + 1 }, (_, i) => {
          const val = lines[0].maxVal - (i / gridLines) * lines[0].maxVal;
          const y = padT + (i / gridLines) * innerH;
          return (
            <text
              key={`ylabel-${i}`}
              x={padL - 8}
              y={y + 4}
              textAnchor="end"
              className="text-[10px] fill-gray-500"
            >
              {val}
            </text>
          );
        })}

        {/* X-axis labels */}
        {years.map((year, i) => (
          <text
            key={`x-${year}`}
            x={xScale(i)}
            y={H - 10}
            textAnchor="middle"
            className="text-[10px] fill-gray-500"
          >
            {year}
          </text>
        ))}

        {/* Data lines */}
        {lines.map((line) => {
          const pathD = line.data
            .map((val, i) => {
              const x = xScale(i);
              const y = yScale(val, line.maxVal);
              return `${i === 0 ? "M" : "L"} ${x} ${y}`;
            })
            .join(" ");

          // Area fill
          const areaD =
            pathD +
            ` L ${xScale(data.length - 1)} ${padT + innerH} L ${padL} ${padT + innerH} Z`;

          return (
            <React.Fragment key={line.key}>
              {/* Area fill */}
              <motion.path
                d={areaD}
                fill={line.color}
                fillOpacity={0.08}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={
                  inView
                    ? { pathLength: 1, opacity: 1 }
                    : { pathLength: 0, opacity: 0 }
                }
                transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
              />
              {/* Line */}
              <motion.path
                d={pathD}
                fill="none"
                stroke={line.color}
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
                transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
              />
              {/* Dots */}
              {line.data.map((val, i) => (
                <motion.circle
                  key={`${line.key}-dot-${i}`}
                  cx={xScale(i)}
                  cy={yScale(val, line.maxVal)}
                  r={hoverIndex === i ? 5 : 3}
                  fill={line.color}
                  stroke="white"
                  strokeWidth={1.5}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={
                    inView
                      ? { opacity: 1, scale: 1 }
                      : { opacity: 0, scale: 0 }
                  }
                  transition={{ duration: 0.3, delay: 0.5 + i * 0.1 }}
                />
              ))}
            </React.Fragment>
          );
        })}

        {/* Hover vertical line + tooltip */}
        {hoverIndex !== null && (
          <>
            <line
              x1={xScale(hoverIndex)}
              y1={padT}
              x2={xScale(hoverIndex)}
              y2={padT + innerH}
              stroke="#9ca3af"
              strokeWidth={1}
              strokeDasharray="3 3"
            />
            <rect
              x={xScale(hoverIndex) - 55}
              y={padT - 5}
              width={110}
              height={20}
              rx={4}
              fill="white"
              stroke="#e5e7eb"
              strokeWidth={1}
            />
            <text
              x={xScale(hoverIndex)}
              y={padT + 8}
              textAnchor="middle"
              className="text-[10px] font-semibold fill-gray-700"
            >
              {years[hoverIndex]}
            </text>
          </>
        )}
      </svg>

      {/* Invisible hover area overlay */}
      <div className="relative -mt-[400px] h-[400px] w-full min-w-[600px]" style={{ marginBottom: "-400px" }}>
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="w-full h-full"
          style={{ pointerEvents: "all" }}
        >
          {data.map((_, i) => (
            <rect
              key={`hover-${i}`}
              x={xScale(i) - innerW / (data.length * 2)}
              y={0}
              width={innerW / data.length}
              height={H}
              fill="transparent"
              onMouseEnter={() => setHoverIndex(i)}
              onMouseLeave={() => setHoverIndex(null)}
              className="cursor-pointer"
            />
          ))}
        </svg>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-4 mt-4">
        {lines.map((line) => (
          <div key={line.key} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: line.color }}
            />
            <span className="text-xs text-gray-600">{line.label}</span>
          </div>
        ))}
      </div>

      {/* Hover detail tooltip */}
      <AnimatePresence>
        {hoverIndex !== null && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            className="flex flex-wrap justify-center gap-4 mt-2"
          >
            {lines.map((line) => (
              <div key={line.key} className="text-xs text-gray-600">
                <span className="font-semibold" style={{ color: line.color }}>
                  {line.label.split(" (")[0]}:
                </span>{" "}
                {line.data[hoverIndex]} {line.label.includes("(") ? `(${line.label.match(/\(([^)]+)\)/)?.[1] ?? ""})` : ""}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Milestone Timeline ──────────────────────────────────────────────
function MilestoneTimeline({
  milestones,
}: {
  milestones: typeof sustainabilityContent.milestones;
}) {
  return (
    <div className="relative max-w-4xl mx-auto">
      {/* Central gradient line */}
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-solar-green via-solar-green-light to-solar-green/30 md:-translate-x-px" />

      {milestones.map((m, i) => {
        const Icon = ICON_MAP[m.icon] || Zap;
        const isLeft = i % 2 === 0;

        return (
          <ScrollReveal key={m.year} delay={i * 0.1} direction={isLeft ? "left" : "right"}>
            <div
              className={`relative flex items-start mb-10 last:mb-0 ${
                isLeft ? "md:flex-row" : "md:flex-row-reverse"
              } flex-row`}
            >
              {/* Year badge on the line */}
              <div className="absolute left-0 md:left-1/2 z-10 w-9 h-9 rounded-full bg-solar-green flex items-center justify-center md:-translate-x-1/2 shadow-lg shadow-solar-green/30">
                <span className="text-[10px] font-bold text-white">
                  {String(m.year).slice(2)}
                </span>
              </div>

              {/* Card */}
              <div
                className={`ml-14 md:ml-0 md:w-[calc(50%-2rem)] ${
                  isLeft ? "md:pr-8 md:text-right" : "md:pl-8 md:text-left"
                }`}
              >
                <div className="glass-premium rounded-xl p-5 border border-white/10 hover:border-solar-green/30 transition-all duration-300 group">
                  <div className={`flex items-center gap-2 mb-2 ${isLeft ? "md:justify-end" : "md:justify-start"}`}>
                    <Icon className="w-4 h-4 text-solar-green-light" />
                    <span className="text-sm font-bold text-solar-green-light">
                      {m.year}
                    </span>
                  </div>
                  <h3 className="text-base font-semibold text-white mb-1 group-hover:text-solar-green-light transition-colors">
                    {m.title}
                  </h3>
                  <p className="text-sm text-white/60 leading-relaxed mb-2">
                    {m.description}
                  </p>
                  <span className="inline-block text-xs font-medium text-solar-green bg-solar-green/10 px-3 py-1 rounded-full">
                    {m.metric}
                  </span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        );
      })}
    </div>
  );
}

// ─── SDG Goals Section ───────────────────────────────────────────────
function SDGGoalsSection({ goals }: { goals: typeof sustainabilityContent.sdgGoals }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {goals.map((goal, i) => {
        const Icon = ICON_MAP[goal.icon] || Globe2;
        return (
          <ScrollReveal key={goal.number} delay={i * 0.08}>
            <motion.div
              whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
              className="glass-premium rounded-xl p-5 border border-white/10 hover:border-white/20 transition-all duration-300 group cursor-default h-full"
            >
              <div className="flex items-start gap-3 mb-3">
                <div
                  className="w-11 h-11 rounded-lg flex items-center justify-center shrink-0 text-white font-bold text-lg shadow-md"
                  style={{ backgroundColor: goal.color }}
                >
                  {goal.number}
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white group-hover:text-solar-green-light transition-colors">
                    {goal.title}
                  </h3>
                  <Icon className="w-4 h-4 text-white/40 mt-1" />
                </div>
              </div>
              <p className="text-xs text-white/55 leading-relaxed">
                {goal.description}
              </p>
            </motion.div>
          </ScrollReveal>
        );
      })}
    </div>
  );
}

// ─── Initiative Card ─────────────────────────────────────────────────
function InitiativeCard({
  initiative,
  index,
}: {
  initiative: (typeof sustainabilityContent.initiatives)[0];
  index: number;
}) {
  return (
    <ScrollReveal delay={index * 0.1}>
      <motion.div
        whileHover={{ y: -4, transition: { duration: 0.2 } }}
        className="bg-white rounded-xl overflow-hidden border border-gray-100 hover:border-solar-green/30 hover:shadow-lg hover:shadow-solar-green/5 transition-all duration-300 group h-full"
      >
        {/* Image */}
        <div className="relative h-44 overflow-hidden">
          <Image
            src={initiative.image}
            alt={initiative.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="text-base font-semibold text-gray-900 mb-2 group-hover:text-solar-green-dark transition-colors">
            {initiative.title}
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-3">
            {initiative.description}
          </p>

          {/* Stats */}
          <div className="space-y-2.5">
            {initiative.stats.map((stat) => (
              <div key={stat.label}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-500">{stat.label}</span>
                  <span className="font-semibold text-solar-green-dark">
                    {stat.value}
                  </span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-solar-green to-solar-green-light"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${stat.progress}%` }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </ScrollReveal>
  );
}

// ─── Main Page Component ─────────────────────────────────────────────
export function SustainabilityPage() {
  const c = sustainabilityContent;
  const { navigate } = useRouter();
  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true });

  // Hero stat badges data
  const heroStats = [
    { value: 13.6, unit: "M Tonnes", label: "CO₂ Offset", icon: CloudOff, decimals: 1 },
    { value: 340, unit: "M Trees", label: "Trees Equivalent", icon: TreePine, decimals: 0 },
    { value: 10, unit: "GW", label: "Clean Energy", icon: Zap, decimals: 0 },
  ];

  return (
    <main>
      {/* ─── HERO SECTION ──────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-solar-dark via-solar-dark-secondary to-solar-dark"
      >
        {/* Animated particles */}
        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
          {[
            { size: "w-64 h-64", pos: "top-[-10%] left-[10%]", delay: 0, duration: 20 },
            { size: "w-48 h-48", pos: "top-[60%] left-[80%]", delay: 3, duration: 25 },
            { size: "w-56 h-56", pos: "top-[20%] left-[70%]", delay: 6, duration: 22 },
            { size: "w-40 h-40", pos: "top-[70%] left-[5%]", delay: 2, duration: 18 },
          ].map((p, i) => (
            <motion.div
              key={i}
              className={`absolute ${p.size} ${p.pos} rounded-full bg-solar-green/8 blur-[80px]`}
              animate={{
                x: [0, 30, -20, 0],
                y: [0, -25, 15, 0],
                scale: [1, 1.1, 0.95, 1],
              }}
              transition={{
                duration: p.duration,
                delay: p.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Grain overlay */}
        <div className="absolute inset-0 grain-overlay opacity-30" aria-hidden="true" />

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
          {/* Word-by-word title reveal */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            {c.hero.title.split(" ").map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                animate={
                  heroInView
                    ? { opacity: 1, y: 0, filter: "blur(0px)" }
                    : { opacity: 0, y: 20, filter: "blur(4px)" }
                }
                transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
                className="inline-block bg-gradient-to-r from-white via-white to-solar-green-light bg-clip-text text-transparent mr-[0.3em]"
              >
                {word}
              </motion.span>
            ))}
          </h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
            className="text-base sm:text-lg text-white/70 max-w-2xl mx-auto mb-8 leading-relaxed drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]"
          >
            {c.hero.subtitle}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{ duration: 0.6, delay: 0.7, ease: "easeOut" }}
            className="flex flex-wrap justify-center gap-4 mb-10"
          >
            <Button
              onClick={() => navigate(c.hero.primaryCta.route)}
              className="bg-solar-green hover:bg-solar-green-dark text-white px-6 py-3 text-sm font-semibold shadow-lg shadow-solar-green/25 hover:shadow-xl hover:shadow-solar-green/30 transition-all duration-300"
            >
              <Download className="w-4 h-4 mr-2" />
              {c.hero.primaryCta.label}
            </Button>
            <Button
              onClick={() => navigate(c.hero.secondaryCta.route)}
              variant="outline"
              className="border-2 border-white/40 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 hover:border-white/60 px-6 py-3 text-sm font-semibold transition-all duration-300"
            >
              {c.hero.secondaryCta.label}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>

          {/* Animated stat badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.9, ease: "easeOut" }}
            className="flex flex-wrap justify-center gap-3 sm:gap-4"
          >
            {heroStats.map((stat) => {
              const StatIcon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="flex items-center gap-2 bg-white/8 backdrop-blur-sm border border-white/15 rounded-full px-4 py-2"
                >
                  <StatIcon className="w-4 h-4 text-solar-green-light" />
                  <span className="text-sm font-bold text-white">
                    <AnimatedCounter
                      target={stat.value}
                      duration={2}
                      decimals={stat.decimals}
                    />
                  </span>
                  <span className="text-xs text-white/60">{stat.unit}</span>
                  <span className="text-xs text-white/40 hidden sm:inline">
                    {stat.label}
                  </span>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <span className="text-xs text-white/40">Scroll to Explore</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronRight className="w-4 h-4 text-white/40 rotate-90" />
          </motion.div>
        </motion.div>
      </section>

      {/* ─── IMPACT METRICS GRID ────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-solar-dark relative">
        <div className="absolute inset-0 grain-overlay opacity-20" aria-hidden="true" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeading
            title="Environmental Impact Metrics"
            subtitle="Real-time progress toward our sustainability targets — every number represents tangible environmental change."
            align="center"
            variant="dark"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 mt-12">
            {c.impactMetrics.map((metric, i) => (
              <ImpactMetricCard key={metric.id} metric={metric} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── ANNUAL TREND SECTION ───────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <SectionHeading
            title="Annual Growth Trends"
            subtitle="Year-over-year progress across our key sustainability indicators — from CO₂ offset to investment in clean energy."
            align="center"
          />

          <ScrollReveal>
            <div className="mt-10 bg-white rounded-2xl p-4 sm:p-6 border border-gray-100 shadow-sm">
              <TrendChart data={c.annualData} />
            </div>
          </ScrollReveal>

          {/* Summary cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
            {[
              { label: "Total CO₂ Offset", value: "68M T", icon: CloudOff, color: "text-solar-green" },
              { label: "Peak Capacity", value: "11.5 GW", icon: Zap, color: "text-yellow-500" },
              { label: "Total Investment", value: "$28.1B", icon: TrendingDown, color: "text-blue-500" },
              { label: "Jobs Created", value: "26,400+", icon: Leaf, color: "text-emerald-500" },
            ].map((item) => {
              const ItemIcon = item.icon;
              return (
                <ScrollReveal key={item.label}>
                  <div className="bg-white rounded-xl p-4 border border-gray-100 text-center hover:shadow-md transition-shadow">
                    <ItemIcon className={`w-5 h-5 mx-auto mb-2 ${item.color}`} />
                    <p className="text-lg font-bold text-gray-900">{item.value}</p>
                    <p className="text-xs text-gray-500">{item.label}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── MILESTONES TIMELINE ────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-solar-dark relative">
        <div className="absolute inset-0 grain-overlay opacity-20" aria-hidden="true" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeading
            title="Sustainability Milestones"
            subtitle="Key moments in our journey toward a greener future — from our first solar plant to our 20 GW ambition."
            align="center"
            variant="dark"
          />

          <div className="mt-12">
            <MilestoneTimeline milestones={c.milestones} />
          </div>
        </div>
      </section>

      {/* ─── SDG GOALS SECTION ──────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-solar-dark-secondary relative">
        <div className="absolute inset-0 grain-overlay opacity-15" aria-hidden="true" />
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
          <SectionHeading
            title="UN Sustainable Development Goals"
            subtitle="Our sustainability strategy directly contributes to six UN SDGs, aligning our impact with global development priorities."
            align="center"
            variant="dark"
          />

          <div className="mt-12">
            <SDGGoalsSection goals={c.sdgGoals} />
          </div>
        </div>
      </section>

      {/* ─── KEY INITIATIVES SECTION ────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <SectionHeading
            title="Key Sustainability Initiatives"
            subtitle="From zero-liquid-discharge manufacturing to rural electrification — concrete programs driving measurable change."
            align="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            {c.initiatives.map((initiative, i) => (
              <InitiativeCard key={initiative.title} initiative={initiative} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA SECTION ───────────────────────────────────────────── */}
      <section className="relative py-16 sm:py-20 bg-gradient-to-br from-solar-green-dark via-solar-green to-solar-green-light overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-white/5 blur-2xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-white/5 blur-0xl" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <ScrollReveal>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
              Join Our Sustainability Journey
            </h2>
            <p className="text-white/80 mb-8 max-w-xl mx-auto leading-relaxed">
              Whether you&apos;re a partner, investor, or customer — there&apos;s a place for you in building a
              carbon-neutral future. Let&apos;s create impact together.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                onClick={() => navigate("contact")}
                className="bg-white text-solar-green-dark hover:bg-white/90 px-6 py-3 text-sm font-semibold shadow-lg transition-all duration-300"
              >
                Contact Our Team
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button
                onClick={() => navigate("contact")}
                variant="outline"
                className="border-2 border-white/50 text-white hover:bg-white/10 hover:border-white/80 px-6 py-3 text-sm font-semibold transition-all duration-300"
              >
                <Download className="w-4 h-4 mr-2" />
                Download ESG Report
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
