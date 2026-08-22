"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView, useMotionValue, animate, AnimatePresence } from "framer-motion";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Sun,
  Zap,
  TrendingUp,
  IndianRupee,
  RotateCcw,
  MapPin,
  ThermometerSun,
  ThermometerSnowflake,
  CloudRain,
  Gauge,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────
type Season = "summer" | "winter" | "monsoon";
type ModuleType = "topcon" | "monoperc";

interface LocationPreset {
  name: string;
  latitude: number;
}

// ─── Constants ───────────────────────────────────────────────────────
const DEG = Math.PI / 180;

const LOCATION_PRESETS: LocationPreset[] = [
  { name: "Delhi", latitude: 28.6 },
  { name: "Mumbai", latitude: 19.1 },
  { name: "Chennai", latitude: 13.1 },
  { name: "Jodhpur", latitude: 26.3 },
  { name: "Mundra", latitude: 22.8 },
];

const SEASON_DATA: Record<
  Season,
  {
    label: string;
    icon: React.ElementType;
    sunAltitude: number; // degrees
    optimalOffset: number; // subtract from latitude
    peakSunHours: number;
    avgTempC: number;
    seasonalFactor: number;
    color: string;
  }
> = {
  summer: {
    label: "Summer",
    icon: ThermometerSun,
    sunAltitude: 78,
    optimalOffset: 15,
    peakSunHours: 6.5,
    avgTempC: 35,
    seasonalFactor: 1.15,
    color: "oklch(0.769 0.188 70.08)",
  },
  winter: {
    label: "Winter",
    icon: ThermometerSnowflake,
    sunAltitude: 42,
    optimalOffset: -15,
    peakSunHours: 5.2,
    avgTempC: 18,
    seasonalFactor: 0.82,
    color: "oklch(0.65 0.15 240)",
  },
  monsoon: {
    label: "Monsoon",
    icon: CloudRain,
    sunAltitude: 60,
    optimalOffset: 0,
    peakSunHours: 4.0,
    avgTempC: 28,
    seasonalFactor: 0.65,
    color: "oklch(0.58 0.12 200)",
  },
};

const MODULE_DATA: Record<
  ModuleType,
  { label: string; efficiency: number; description: string }
> = {
  topcon: {
    label: "TOPCon",
    efficiency: 0.228,
    description: "22.8% efficiency , latest Gen-N technology",
  },
  monoperc: {
    label: "MonoPERC",
    efficiency: 0.213,
    description: "21.3% efficiency , proven reliable technology",
  },
};

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];
const DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

// Season weight per month (approximate for India)
const MONTH_SEASON: Season[] = [
  "winter", "winter", "summer", "summer", "summer", "monsoon",
  "monsoon", "monsoon", "monsoon", "summer", "winter", "winter",
];

const TARIFF_PER_KWH = 3.5; // ₹/kWh

// ─── Helpers ─────────────────────────────────────────────────────────
const inrFmt = new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 });
const numFmt = new Intl.NumberFormat("en-IN", { maximumFractionDigits: 1 });

function tempDerate(avgTempC: number): number {
  // 0.4% loss per °C above 25°C
  const excess = Math.max(avgTempC - 25, 0);
  return 1 - 0.004 * excess;
}

function calcDailyOutput(
  systemKwp: number,
  tiltDeg: number,
  latitude: number,
  season: Season,
  moduleType: ModuleType
): number {
  const sd = SEASON_DATA[season];
  const sunZenith = 90 - sd.sunAltitude; // zenith angle

  // Angle of incidence between sun and panel normal
  // For a south-facing panel tilted at `tiltDeg` from horizontal,
  // with sun at zenith `sunZenith`:
  // cos(θ) = cos(sunZenith - tiltDeg)
  const thetaRad = (sunZenith - tiltDeg) * DEG;
  const cosTheta = Math.max(Math.cos(thetaRad), 0);

  const efficiency = MODULE_DATA[moduleType].efficiency;
  const derate = tempDerate(sd.avgTempC);
  const systemDerate = 0.85; // inverter, wiring, soiling losses

  const dailyKwh =
    systemKwp * sd.peakSunHours * cosTheta * (efficiency / 0.20) * derate * systemDerate;

  return Math.max(dailyKwh, 0);
}

function calcMonthlyOutput(
  systemKwp: number,
  tiltDeg: number,
  latitude: number,
  moduleType: ModuleType,
  monthIndex: number
): number {
  const season = MONTH_SEASON[monthIndex];
  const sd = SEASON_DATA[season];
  const sunZenith = 90 - sd.sunAltitude;
  const thetaRad = (sunZenith - tiltDeg) * DEG;
  const cosTheta = Math.max(Math.cos(thetaRad), 0);

  const efficiency = MODULE_DATA[moduleType].efficiency;
  const derate = tempDerate(sd.avgTempC);
  const systemDerate = 0.85;

  const dailyKwh =
    systemKwp * sd.peakSunHours * cosTheta * (efficiency / 0.20) * derate * systemDerate;

  return Math.max(dailyKwh * DAYS_IN_MONTH[monthIndex] * sd.seasonalFactor, 0);
}

function getOptimalTilt(latitude: number, season: Season): number {
  const offset = SEASON_DATA[season].optimalOffset;
  return Math.max(Math.min(latitude - offset, 90), 0);
}

// ─── AnimatedNumber ──────────────────────────────────────────────────
function AnimatedNumber({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  format = true,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  format?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: false, amount: 0.3 });
  const mv = useMotionValue(0);
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!inView) return;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) {
      const t = setTimeout(() => {
        const num =
          decimals > 0
            ? parseFloat(value.toFixed(decimals))
            : Math.floor(value);
        setDisplay(format ? inrFmt.format(num) : num.toFixed(decimals));
      }, 0);
      return () => clearTimeout(t);
    }
    const controls = animate(mv, value, {
      duration: 0.8,
      ease: "easeOut",
      onUpdate: (latest) => {
        const num =
          decimals > 0
            ? parseFloat(latest.toFixed(decimals))
            : Math.floor(latest);
        setDisplay(
          format ? inrFmt.format(num) : num.toFixed(decimals)
        );
      },
    });
    return () => controls.stop();
  }, [value, inView, mv, format, decimals]);

  return (
    <span ref={ref}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

// ─── EfficiencyBar ───────────────────────────────────────────────────
function EfficiencyBar({ pct }: { pct: number }) {
  const color =
    pct >= 90
      ? "bg-solar-green"
      : pct >= 70
        ? "bg-solar-gold"
        : "bg-red-500";
  return (
    <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden mt-2">
      <motion.div
        className={`h-full rounded-full ${color}`}
        initial={{ width: 0 }}
        animate={{ width: `${Math.min(pct, 100)}%` }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />
    </div>
  );
}

// ─── ResultCard ──────────────────────────────────────────────────────
function ResultCard({
  icon: Icon,
  label,
  value,
  unit,
  prefix = "",
  suffix = "",
  decimals = 0,
  efficiencyPct,
  hint,
}: {
  icon: React.ElementType;
  label: string;
  value: number;
  unit: string;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  efficiencyPct: number;
  hint?: string;
}) {
  const accentColor =
    efficiencyPct >= 90
      ? "text-solar-green-light"
      : efficiencyPct >= 70
        ? "text-solar-gold"
        : "text-red-400";
  const bgColor =
    efficiencyPct >= 90
      ? "bg-solar-green/15"
      : efficiencyPct >= 70
        ? "bg-solar-gold/15"
        : "bg-red-500/15";
  const borderColor =
    efficiencyPct >= 90
      ? "border-solar-green/25"
      : efficiencyPct >= 70
        ? "border-solar-gold/25"
        : "border-red-500/25";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`rounded-xl p-4 ${bgColor} border ${borderColor}`}
    >
      <div className="flex items-center gap-1.5 mb-2">
        <Icon className={`w-4 h-4 ${accentColor}`} />
        <p className="text-[10px] uppercase tracking-wider text-white/60 font-medium">
          {label}
        </p>
      </div>
      <div className="flex items-baseline gap-1">
        <span
          className={`font-[family-name:var(--font-poppins)] text-xl sm:text-2xl font-bold ${accentColor} tabular-nums`}
        >
          <AnimatedNumber
            value={value}
            prefix={prefix}
            suffix={suffix}
            decimals={decimals}
            format
          />
        </span>
        <span className="text-xs font-semibold text-white/50">{unit}</span>
      </div>
      <EfficiencyBar pct={efficiencyPct} />
      <p className="text-[10px] text-white/40 mt-1">
        {efficiencyPct.toFixed(0)}% of optimal
        {hint && ` · ${hint}`}
      </p>
    </motion.div>
  );
}

// ─── SVG Visualization ──────────────────────────────────────────────
function PanelVisualization({
  tiltAngle,
  season,
}: {
  tiltAngle: number;
  season: Season;
}) {
  const sd = SEASON_DATA[season];
  const sunAlt = sd.sunAltitude;

  // SVG viewport
  const W = 400;
  const H = 320;
  const groundY = 270;
  const panelPivotX = 200;
  const panelPivotY = groundY;

  // Sun position (arc from east to west at altitude)
  const sunX = 200;
  const sunY = 30;

  // Panel geometry - draw as parallelogram
  const panelLength = 140;
  const panelThickness = 6;
  const tiltRad = tiltAngle * DEG;

  // Panel endpoints from pivot
  const panelEndX = panelPivotX + panelLength * Math.cos(tiltRad);
  const panelEndY = panelPivotY - panelLength * Math.sin(tiltRad);

  // Normal vector (perpendicular to panel, pointing upward)
  const normalLen = 70;
  const normalEndX = panelPivotX + (panelLength / 2) * Math.cos(tiltRad) - normalLen * Math.sin(tiltRad);
  const normalEndY = panelPivotY - (panelLength / 2) * Math.sin(tiltRad) - normalLen * Math.cos(tiltRad);
  const normalStartX = panelPivotX + (panelLength / 2) * Math.cos(tiltRad);
  const normalStartY = panelPivotY - (panelLength / 2) * Math.sin(tiltRad);

  // Sun ray direction (from sun to panel center)
  const sunZenith = 90 - sunAlt;
  const sunRayAngleRad = sunZenith * DEG; // angle from vertical

  // Angle arc for tilt angle
  const arcR = 40;
  const arcStartX = panelPivotX + arcR;
  const arcStartY = panelPivotY;
  const arcEndX = panelPivotX + arcR * Math.cos(tiltRad);
  const arcEndY = panelPivotY - arcR * Math.sin(tiltRad);

  // Create arc path
  const largeArc = tiltAngle > 180 ? 1 : 0;
  const arcPath = `M ${arcStartX} ${arcStartY} A ${arcR} ${arcR} 0 ${largeArc} 0 ${arcEndX} ${arcEndY}`;

  // Sun rays hitting panel (3 parallel lines from top)
  const rayTargets = [0.25, 0.5, 0.75];
  const sunRayDirX = Math.sin(sunRayAngleRad);
  const sunRayDirY = Math.cos(sunRayAngleRad);

  // Angle between sun rays and panel normal (angle of incidence)
  const incidenceAngle = Math.abs(sunZenith - tiltAngle);
  const incArcR = 25;
  // Draw the incidence angle arc at the normal vector start
  const normalAngle = tiltAngle + 90; // normal is perpendicular to panel
  const sunRayAngleFromHoriz = sunAlt; // sun altitude from horizontal
  // Both measured from horizontal going CCW

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="w-full h-auto"
      role="img"
      aria-label={`Solar panel visualization at ${tiltAngle}° tilt`}
    >
      <defs>
        <radialGradient id="sun-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={sd.color} stopOpacity="0.6" />
          <stop offset="100%" stopColor={sd.color} stopOpacity="0" />
        </radialGradient>
        <linearGradient id="panel-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.35 0.05 250)" />
          <stop offset="100%" stopColor="oklch(0.25 0.03 250)" />
        </linearGradient>
      </defs>

      {/* Background glow */}
      <rect width={W} height={H} fill="transparent" />

      {/* Sun glow */}
      <circle cx={sunX} cy={sunY} r="40" fill="url(#sun-glow)" />

      {/* Sun circle */}
      <circle cx={sunX} cy={sunY} r="16" fill={sd.color} opacity="0.9" />
      {/* Sun rays */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
        const rad = angle * DEG;
        const innerR = 20;
        const outerR = 28;
        return (
          <line
            key={angle}
            x1={sunX + innerR * Math.cos(rad)}
            y1={sunY + innerR * Math.sin(rad)}
            x2={sunX + outerR * Math.cos(rad)}
            y2={sunY + outerR * Math.sin(rad)}
            stroke={sd.color}
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.7"
          />
        );
      })}

      {/* Sun altitude label */}
      <text
        x={sunX + 24}
        y={sunY + 4}
        fontSize="11"
        fill="white"
        opacity="0.7"
        className="tabular-nums"
      >
        {sunAlt}° alt
      </text>

      {/* Ground line */}
      <line
        x1="20"
        y1={groundY}
        x2={W - 20}
        y2={groundY}
        stroke="white"
        strokeWidth="1.5"
        opacity="0.3"
      />
      {/* Ground hatching */}
      {Array.from({ length: 18 }, (_, i) => {
        const x = 30 + i * 20;
        return (
          <line
            key={i}
            x1={x}
            y1={groundY}
            x2={x - 8}
            y2={groundY + 8}
            stroke="white"
            strokeWidth="0.8"
            opacity="0.15"
          />
        );
      })}

      {/* Sun rays hitting panel */}
      {rayTargets.map((t, i) => {
        const targetX = panelPivotX + panelLength * t * Math.cos(tiltRad);
        const targetY = panelPivotY - panelLength * t * Math.sin(tiltRad);
        const rayLen = 200;
        const sourceX = targetX - sunRayDirX * rayLen;
        const sourceY = targetY - sunRayDirY * rayLen;
        return (
          <motion.line
            key={i}
            x1={sourceX}
            y1={sourceY}
            x2={targetX}
            y2={targetY}
            stroke={sd.color}
            strokeWidth="1.5"
            strokeDasharray="6 4"
            opacity="0.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          />
        );
      })}

      {/* Panel (thick line) */}
      <motion.line
        x1={panelPivotX}
        y1={panelPivotY}
        x2={panelEndX}
        y2={panelEndY}
        stroke="url(#panel-grad)"
        strokeWidth={panelThickness}
        strokeLinecap="round"
        initial={false}
        animate={{
          x2: panelEndX,
          y2: panelEndY,
        }}
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
      />
      {/* Panel surface highlight */}
      <motion.line
        x1={panelPivotX}
        y1={panelPivotY - panelThickness / 2}
        x2={panelEndX}
        y2={panelEndY - panelThickness / 2}
        stroke="oklch(0.55 0.12 152.6)"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.6"
        initial={false}
        animate={{
          x2: panelEndX,
          y2: panelEndY - panelThickness / 2,
        }}
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
      />

      {/* Panel cells (grid lines on panel) */}
      {Array.from({ length: 5 }, (_, i) => {
        const frac = (i + 1) / 6;
        const cx = panelPivotX + panelLength * frac * Math.cos(tiltRad);
        const cy = panelPivotY - panelLength * frac * Math.sin(tiltRad);
        const perpX = -Math.sin(tiltRad) * (panelThickness / 2);
        const perpY = -Math.cos(tiltRad) * (panelThickness / 2);
        return (
          <motion.line
            key={i}
            x1={cx - perpX}
            y1={cy - perpY}
            x2={cx + perpX}
            y2={cy + perpY}
            stroke="oklch(0.4 0.05 250)"
            strokeWidth="0.5"
            initial={false}
            animate={{
              x1: cx - perpX,
              y1: cy - perpY,
              x2: cx + perpX,
              y2: cy + perpY,
            }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
          />
        );
      })}

      {/* Pivot point */}
      <circle cx={panelPivotX} cy={panelPivotY} r="4" fill="white" opacity="0.8" />
      <circle cx={panelPivotX} cy={panelPivotY} r="2" fill="oklch(0.55 0.12 152.6)" />

      {/* Normal vector (dashed) */}
      <motion.line
        x1={normalStartX}
        y1={normalStartY}
        x2={normalEndX}
        y2={normalEndY}
        stroke="oklch(0.72 0.188 152.6)"
        strokeWidth="1.5"
        strokeDasharray="5 3"
        opacity="0.7"
        initial={false}
        animate={{
          x1: normalStartX,
          y1: normalStartY,
          x2: normalEndX,
          y2: normalEndY,
        }}
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
      />
      {/* Normal label */}
      <motion.text
        x={normalEndX + 5}
        y={normalEndY - 5}
        fontSize="10"
        fill="oklch(0.72 0.188 152.6)"
        opacity="0.8"
        initial={false}
        animate={{
          x: normalEndX + 5,
          y: normalEndY - 5,
        }}
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
      >
        normal
      </motion.text>

      {/* Tilt angle arc */}
      {tiltAngle > 1 && (
        <motion.path
          d={arcPath}
          fill="none"
          stroke="oklch(0.769 0.188 70.08)"
          strokeWidth="1.5"
          opacity="0.8"
          initial={false}
          animate={{ d: arcPath }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
        />
      )}

      {/* Tilt angle label */}
      {tiltAngle > 5 && (
        <motion.g
          initial={false}
          animate={{
            x: panelPivotX + (arcR + 14) * Math.cos(tiltRad / 2) - panelPivotX,
            y: panelPivotY - (arcR + 14) * Math.sin(tiltRad / 2) - panelPivotY,
          }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
        >
          <text
            x={panelPivotX + (arcR + 14) * Math.cos(tiltRad / 2)}
            y={panelPivotY - (arcR + 14) * Math.sin(tiltRad / 2) + 4}
            fontSize="13"
            fill="oklch(0.769 0.188 70.08)"
            fontWeight="600"
            textAnchor="middle"
            className="tabular-nums"
          >
            {tiltAngle.toFixed(0)}°
          </text>
        </motion.g>
      )}

      {/* Incidence angle indicator */}
      <text
        x={normalStartX}
        y={normalStartY + 18}
        fontSize="10"
        fill="white"
        opacity="0.5"
        textAnchor="middle"
        className="tabular-nums"
      >
        θ = {incidenceAngle.toFixed(0)}°
      </text>

      {/* Angle of incidence arc between normal and sun ray */}
      {incidenceAngle > 2 && (
        <IncidenceArc
          cx={normalStartX}
          cy={normalStartY}
          normalAngle={tiltAngle + 90}
          sunAngle={sunAlt}
          r={18}
        />
      )}
    </svg>
  );
}

/** Small arc showing the angle of incidence between normal and sun ray. */
function IncidenceArc({
  cx,
  cy,
  normalAngle,
  sunAngle,
  r,
}: {
  cx: number;
  cy: number;
  normalAngle: number;
  sunAngle: number;
  r: number;
}) {
  // normalAngle and sunAngle are degrees from horizontal (CCW)
  // Convert to SVG angles (CW from east)
  const startRad = -normalAngle * DEG;
  const endRad = -sunAngle * DEG;
  const x1 = cx + r * Math.cos(startRad);
  const y1 = cy + r * Math.sin(startRad);
  const x2 = cx + r * Math.cos(endRad);
  const y2 = cy + r * Math.sin(endRad);
  const largeArc = Math.abs(normalAngle - sunAngle) > 180 ? 1 : 0;
  const sweep = normalAngle > sunAngle ? 0 : 1;
  const d = `M ${x1} ${y1} A ${r} ${r} 0 ${largeArc} ${sweep} ${x2} ${y2}`;

  return (
    <path
      d={d}
      fill="none"
      stroke="oklch(0.769 0.188 70.08)"
      strokeWidth="1"
      opacity="0.5"
      strokeDasharray="3 2"
    />
  );
}

// ─── Monthly Comparison Bar Chart ────────────────────────────────────
function MonthlyBarChart({
  currentMonthly,
  optimalMonthly,
}: {
  currentMonthly: number[];
  optimalMonthly: number[];
}) {
  const W = 600;
  const H = 200;
  const PAD = { top: 16, right: 16, bottom: 28, left: 44 };
  const innerW = W - PAD.left - PAD.right;
  const innerH = H - PAD.top - PAD.bottom;

  const maxVal = Math.max(...optimalMonthly, ...currentMonthly, 1);

  const barGroupWidth = innerW / 12;
  const barWidth = barGroupWidth * 0.35;
  const gap = barGroupWidth * 0.1;

  const xFor = (i: number) => PAD.left + i * barGroupWidth;
  const yFor = (v: number) => PAD.top + innerH - (v / maxVal) * innerH;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="w-full h-auto"
      role="img"
      aria-label="Monthly output comparison chart"
    >
      {/* Grid lines */}
      {[0, 0.25, 0.5, 0.75, 1].map((frac) => {
        const y = PAD.top + innerH * (1 - frac);
        const val = Math.round(maxVal * frac);
        return (
          <g key={frac}>
            <line
              x1={PAD.left}
              x2={W - PAD.right}
              y1={y}
              y2={y}
              stroke="white"
              strokeWidth="0.5"
              opacity="0.1"
            />
            <text
              x={PAD.left - 6}
              y={y + 3}
              textAnchor="end"
              fontSize="9"
              fill="white"
              opacity="0.4"
              className="tabular-nums"
            >
              {val}
            </text>
          </g>
        );
      })}

      {/* Bars */}
      {MONTHS.map((month, i) => {
        const gx = xFor(i);
        const currentH = (currentMonthly[i] / maxVal) * innerH;
        const optimalH = (optimalMonthly[i] / maxVal) * innerH;

        return (
          <g key={month}>
            {/* Optimal bar */}
            <motion.rect
              x={gx + gap}
              y={PAD.top + innerH}
              width={barWidth}
              height={0}
              fill="oklch(0.588 0.193 152.6)"
              opacity="0.6"
              rx="2"
              initial={{ y: PAD.top + innerH, height: 0 }}
              animate={{
                y: PAD.top + innerH - optimalH,
                height: optimalH,
              }}
              transition={{ duration: 0.5, delay: i * 0.04, ease: "easeOut" }}
            />
            {/* Current bar */}
            <motion.rect
              x={gx + gap + barWidth + 2}
              y={PAD.top + innerH}
              width={barWidth}
              height={0}
              fill="oklch(0.72 0.188 152.6)"
              rx="2"
              initial={{ y: PAD.top + innerH, height: 0 }}
              animate={{
                y: PAD.top + innerH - currentH,
                height: currentH,
              }}
              transition={{ duration: 0.5, delay: i * 0.04, ease: "easeOut" }}
            />
            {/* Month label */}
            <text
              x={gx + barGroupWidth / 2}
              y={H - 8}
              textAnchor="middle"
              fontSize="9"
              fill="white"
              opacity="0.5"
            >
              {month}
            </text>
          </g>
        );
      })}

      {/* Legend */}
      <rect x={W - 160} y={6} width={10} height={10} rx="2" fill="oklch(0.588 0.193 152.6)" opacity="0.6" />
      <text x={W - 146} y={15} fontSize="9" fill="white" opacity="0.6">Optimal</text>
      <rect x={W - 90} y={6} width={10} height={10} rx="2" fill="oklch(0.72 0.188 152.6)" />
      <text x={W - 76} y={15} fontSize="9" fill="white" opacity="0.6">Current</text>
    </svg>
  );
}

// ─── Main Component ──────────────────────────────────────────────────
export function SolarTiltSimulator() {
  // State
  const [tiltAngle, setTiltAngle] = useState(23);
  const [latitude, setLatitude] = useState(23);
  const [season, setSeason] = useState<Season>("summer");
  const [moduleType, setModuleType] = useState<ModuleType>("topcon");
  const [systemKwp, setSystemKwp] = useState(5);
  const [isResetting, setIsResetting] = useState(false);

  // Optimal tilt for current latitude & season
  const optimalTilt = useMemo(() => getOptimalTilt(latitude, season), [latitude, season]);

  // Daily output at current tilt
  const dailyOutput = useMemo(
    () => calcDailyOutput(systemKwp, tiltAngle, latitude, season, moduleType),
    [systemKwp, tiltAngle, latitude, season, moduleType]
  );

  // Daily output at optimal tilt
  const optimalDailyOutput = useMemo(
    () => calcDailyOutput(systemKwp, optimalTilt, latitude, season, moduleType),
    [systemKwp, optimalTilt, latitude, season, moduleType]
  );

  // Monthly outputs for current tilt
  const currentMonthly = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) =>
        calcMonthlyOutput(systemKwp, tiltAngle, latitude, moduleType, i)
      ),
    [systemKwp, tiltAngle, latitude, moduleType]
  );

  // Monthly outputs for optimal tilt
  const optimalMonthly = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) =>
        calcMonthlyOutput(systemKwp, optimalTilt, latitude, moduleType, i)
      ),
    [systemKwp, optimalTilt, latitude, moduleType]
  );

  // Annual
  const annualOutput = useMemo(() => currentMonthly.reduce((a, b) => a + b, 0), [currentMonthly]);
  const optimalAnnualOutput = useMemo(() => optimalMonthly.reduce((a, b) => a + b, 0), [optimalMonthly]);

  // Monthly average
  const monthlyOutput = annualOutput / 12;
  const optimalMonthlyOutput = optimalAnnualOutput / 12;

  // Revenue
  const annualRevenue = annualOutput * TARIFF_PER_KWH;
  const optimalAnnualRevenue = optimalAnnualOutput * TARIFF_PER_KWH;

  // Efficiency percentages
  const dailyEffPct = optimalDailyOutput > 0 ? (dailyOutput / optimalDailyOutput) * 100 : 100;
  const monthlyEffPct = optimalMonthlyOutput > 0 ? (monthlyOutput / optimalMonthlyOutput) * 100 : 100;
  const annualEffPct = optimalAnnualOutput > 0 ? (annualOutput / optimalAnnualOutput) * 100 : 100;
  const revenueEffPct = optimalAnnualRevenue > 0 ? (annualRevenue / optimalAnnualRevenue) * 100 : 100;

  // Season month mapping for hint
  const seasonMonthHint = useMemo(() => {
    const m = SEASON_DATA[season];
    return `${m.peakSunHours}h peak sun · ${m.avgTempC}°C avg`;
  }, [season]);

  // Reset handler
  const handleReset = useCallback(() => {
    setIsResetting(true);
    const start = tiltAngle;
    const end = optimalTilt;
    const duration = 600;
    const startTime = performance.now();

    function step(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setTiltAngle(Math.round(start + (end - start) * eased));
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setIsResetting(false);
      }
    }
    requestAnimationFrame(step);
  }, [tiltAngle, optimalTilt]);

  // Location preset handler
  const handleLocationPreset = useCallback((loc: LocationPreset) => {
    setLatitude(loc.latitude);
    // Don't auto-set tilt , let user see the effect
  }, []);

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-solar-dark relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-solar-green/5 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-solar-green/3 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Heading */}
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-2 px-3 py-1 mb-3 rounded-full bg-solar-green/15 border border-solar-green/25 text-xs uppercase tracking-wider font-semibold text-solar-green-light">
            <Gauge className="w-3.5 h-3.5" />
            Interactive Tool
          </span>
          <h2 className="font-[family-name:var(--font-poppins)] text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Interactive Solar Panel Tilt Simulator
          </h2>
          <div className="w-16 h-1 rounded-full bg-solar-green mx-auto mb-4" />
          <p className="text-sm sm:text-base text-white/60 leading-relaxed max-w-2xl mx-auto">
            Adjust the tilt angle of your solar panel and see how energy output changes in real-time.
            Find the optimal angle for your location to maximize generation.
          </p>
        </div>

        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* LEFT: Visualization */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card className="bg-solar-dark-secondary/60 border-white/10 backdrop-blur-sm overflow-hidden">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-[family-name:var(--font-poppins)] text-sm font-semibold text-white flex items-center gap-2">
                    <span className="w-1.5 h-5 bg-solar-green rounded-full" />
                    Panel Visualization
                  </h3>
                  <span className="text-[10px] text-white/40 uppercase tracking-wider">
                    {SEASON_DATA[season].label} · {tiltAngle}° tilt
                  </span>
                </div>

                <PanelVisualization tiltAngle={tiltAngle} season={season} />

                {/* Quick info below visualization */}
                <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                  <div className="rounded-lg bg-white/5 p-2">
                    <p className="text-[10px] text-white/40 uppercase">Optimal</p>
                    <p className="font-[family-name:var(--font-poppins)] text-sm font-bold text-solar-green-light tabular-nums">
                      {optimalTilt.toFixed(0)}°
                    </p>
                  </div>
                  <div className="rounded-lg bg-white/5 p-2">
                    <p className="text-[10px] text-white/40 uppercase">Current</p>
                    <p className="font-[family-name:var(--font-poppins)] text-sm font-bold text-solar-gold tabular-nums">
                      {tiltAngle}°
                    </p>
                  </div>
                  <div className="rounded-lg bg-white/5 p-2">
                    <p className="text-[10px] text-white/40 uppercase">Difference</p>
                    <p className="font-[family-name:var(--font-poppins)] text-sm font-bold text-white/80 tabular-nums">
                      {Math.abs(tiltAngle - optimalTilt).toFixed(0)}°
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* RIGHT: Controls + Results */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            {/* Controls Card */}
            <Card className="bg-solar-dark-secondary/60 border-white/10 backdrop-blur-sm overflow-hidden">
              <CardContent className="p-4 sm:p-6 space-y-5">
                <h3 className="font-[family-name:var(--font-poppins)] text-sm font-semibold text-white flex items-center gap-2">
                  <span className="w-1.5 h-5 bg-solar-green rounded-full" />
                  Controls
                </h3>

                {/* Tilt Angle Slider */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm text-white/80">Tilt Angle</Label>
                    <span className="font-[family-name:var(--font-poppins)] text-2xl font-bold text-solar-green-light tabular-nums">
                      {tiltAngle}°
                    </span>
                  </div>
                  <Slider
                    value={[tiltAngle]}
                    min={0}
                    max={90}
                    step={1}
                    onValueChange={(v) => setTiltAngle(v[0])}
                    className="cursor-pointer"
                    aria-label="Panel tilt angle in degrees"
                    disabled={isResetting}
                  />
                  <div className="flex justify-between text-[10px] text-white/30">
                    <span>0° (Flat)</span>
                    <span>45°</span>
                    <span>90° (Vertical)</span>
                  </div>
                </div>

                {/* Latitude + System Size in row */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm text-white/80">Latitude (°)</Label>
                    <Input
                      type="number"
                      min={0}
                      max={90}
                      step={0.1}
                      value={latitude}
                      onChange={(e) => {
                        const v = parseFloat(e.target.value);
                        if (!isNaN(v) && v >= 0 && v <= 90) setLatitude(v);
                      }}
                      className="bg-white/5 border-white/15 text-white tabular-nums focus-visible:border-solar-green focus-visible:ring-solar-green/30"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm text-white/80">System Size (kWp)</Label>
                    <Input
                      type="number"
                      min={1}
                      max={100}
                      step={0.5}
                      value={systemKwp}
                      onChange={(e) => {
                        const v = parseFloat(e.target.value);
                        if (!isNaN(v) && v >= 1 && v <= 100) setSystemKwp(v);
                      }}
                      className="bg-white/5 border-white/15 text-white tabular-nums focus-visible:border-solar-green focus-visible:ring-solar-green/30"
                    />
                  </div>
                </div>

                {/* Season Selector */}
                <div className="space-y-2">
                  <Label className="text-sm text-white/80">Season</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {(Object.keys(SEASON_DATA) as Season[]).map((s) => {
                      const sd = SEASON_DATA[s];
                      const SIcon = sd.icon;
                      return (
                        <button
                          key={s}
                          onClick={() => setSeason(s)}
                          className={`flex flex-col items-center gap-1 p-2.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                            season === s
                              ? "bg-solar-green/20 border-solar-green/50 text-white border"
                              : "bg-white/5 border-white/10 text-white/50 border hover:border-white/20 hover:text-white/70"
                          }`}
                          aria-pressed={season === s}
                        >
                          <SIcon className="w-4 h-4" />
                          <span>{sd.label}</span>
                          <span className="text-[9px] opacity-60">{sd.sunAltitude}° sun</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Module Type Selector */}
                <div className="space-y-2">
                  <Label className="text-sm text-white/80">Module Type</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {(Object.keys(MODULE_DATA) as ModuleType[]).map((m) => {
                      const md = MODULE_DATA[m];
                      return (
                        <button
                          key={m}
                          onClick={() => setModuleType(m)}
                          className={`p-3 rounded-lg text-left transition-all duration-200 border ${
                            moduleType === m
                              ? "bg-solar-green/15 border-solar-green/40"
                              : "bg-white/5 border-white/10 hover:border-white/20"
                          }`}
                          aria-pressed={moduleType === m}
                        >
                          <p className="text-sm font-semibold text-white">{md.label}</p>
                          <p className="text-[10px] text-white/50 leading-snug mt-0.5">
                            {md.description}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Location Presets */}
                <div className="space-y-2">
                  <Label className="text-sm text-white/80 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" />
                    Location Presets
                  </Label>
                  <div className="flex flex-wrap gap-2">
                    {LOCATION_PRESETS.map((loc) => (
                      <button
                        key={loc.name}
                        onClick={() => handleLocationPreset(loc)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 border ${
                          Math.abs(latitude - loc.latitude) < 0.2
                            ? "bg-solar-green/20 border-solar-green/40 text-solar-green-light"
                            : "bg-white/5 border-white/10 text-white/50 hover:border-white/20 hover:text-white/70"
                        }`}
                      >
                        {loc.name} ({loc.latitude}°)
                      </button>
                    ))}
                  </div>
                </div>

                {/* Reset button */}
                <Button
                  onClick={handleReset}
                  disabled={isResetting || tiltAngle === Math.round(optimalTilt)}
                  className="w-full bg-solar-green/15 hover:bg-solar-green/25 text-solar-green-light border border-solar-green/30 hover:border-solar-green/50 rounded-lg h-10 font-semibold transition-all duration-300 group"
                  variant="outline"
                >
                  <RotateCcw className={`w-4 h-4 mr-2 ${isResetting ? "animate-spin" : "group-hover:-rotate-45 transition-transform"}`} />
                  Reset to Optimal ({optimalTilt.toFixed(0)}°)
                </Button>
              </CardContent>
            </Card>

            {/* Results Dashboard */}
            <Card className="bg-solar-dark-secondary/60 border-white/10 backdrop-blur-sm overflow-hidden">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-[family-name:var(--font-poppins)] text-sm font-semibold text-white flex items-center gap-2">
                    <span className="w-1.5 h-5 bg-solar-green rounded-full" />
                    Results Dashboard
                  </h3>
                  <span className="text-[10px] text-white/40">
                    {seasonMonthHint}
                  </span>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${tiltAngle}-${season}-${moduleType}-${systemKwp}-${latitude}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="grid grid-cols-2 gap-3">
                      <ResultCard
                        icon={Zap}
                        label="Daily Output"
                        value={dailyOutput}
                        unit="kWh"
                        decimals={1}
                        efficiencyPct={dailyEffPct}
                        hint="per day"
                      />
                      <ResultCard
                        icon={TrendingUp}
                        label="Monthly Output"
                        value={monthlyOutput}
                        unit="kWh"
                        decimals={0}
                        efficiencyPct={monthlyEffPct}
                        hint="avg/month"
                      />
                      <ResultCard
                        icon={Sun}
                        label="Annual Output"
                        value={annualOutput}
                        unit="kWh"
                        decimals={0}
                        efficiencyPct={annualEffPct}
                        hint={`${annualEffPct.toFixed(0)}% efficiency`}
                      />
                      <ResultCard
                        icon={IndianRupee}
                        label="Revenue"
                        value={annualRevenue}
                        unit="/yr"
                        prefix="₹"
                        decimals={0}
                        efficiencyPct={revenueEffPct}
                        hint={`@ ₹${TARIFF_PER_KWH}/kWh`}
                      />
                    </div>
                  </motion.div>
                </AnimatePresence>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Annual Output Comparison Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8"
        >
          <Card className="bg-solar-dark-secondary/60 border-white/10 backdrop-blur-sm overflow-hidden">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-[family-name:var(--font-poppins)] text-sm font-semibold text-white flex items-center gap-2">
                  <span className="w-1.5 h-5 bg-solar-green rounded-full" />
                  Annual Output Comparison
                </h3>
                <div className="flex items-center gap-4 text-[10px] text-white/50">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-sm bg-solar-green/60" />
                    Optimal ({optimalTilt.toFixed(0)}°)
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-sm bg-solar-green-light" />
                    Current ({tiltAngle}°)
                  </span>
                </div>
              </div>
              <MonthlyBarChart
                currentMonthly={currentMonthly}
                optimalMonthly={optimalMonthly}
              />
              <p className="text-[10px] text-white/30 mt-3 text-center">
                Monthly energy output in kWh · Current tilt vs. optimal tilt for your latitude ({latitude}°)
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Bottom note */}
        <p className="mt-6 text-[11px] text-white/30 leading-relaxed text-center max-w-3xl mx-auto">
          <strong className="text-white/50">Note:</strong> Calculations use a simplified irradiance model
          (I = I₀ × cos(θ)) with temperature derating (0.4%/°C above 25°C), system losses (15%),
          and seasonal factors. Actual output depends on local shading, soiling, inverter efficiency,
          and real-time weather conditions.
        </p>
      </div>
    </section>
  );
}
