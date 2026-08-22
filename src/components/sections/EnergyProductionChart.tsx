"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Sun, Cloud, CloudRain, Zap, TrendingUp, Battery } from "lucide-react";

/**
 * Interactive hourly solar energy production curve.
 * Users select weather/season to see how a 5 kWp rooftop system generates power through the day.
 * All calculations are illustrative and based on typical irradiance curves.
 */

type WeatherKey = "sunny" | "cloudy" | "monsoon";
type SeasonKey = "summer" | "winter" | "monsoon";

const weatherProfiles: Record<WeatherKey, { label: string; icon: React.ElementType; factor: number; color: string }> = {
  sunny: { label: "Sunny Day", icon: Sun, factor: 1.0, color: "oklch(0.72 0.188 152.6)" },
  cloudy: { label: "Cloudy Day", icon: Cloud, factor: 0.55, color: "oklch(0.7 0.04 250)" },
  monsoon: { label: "Monsoon", icon: CloudRain, factor: 0.30, color: "oklch(0.65 0.12 240)" },
};

const seasonProfiles: Record<SeasonKey, { label: string; peakHour: number; duration: number; intensity: number }> = {
  summer: { label: "Summer", peakHour: 12.5, duration: 7, intensity: 1.15 },
  winter: { label: "Winter", peakHour: 12, duration: 5.5, intensity: 0.85 },
  monsoon: { label: "Monsoon", peakHour: 12, duration: 5, intensity: 0.70 },
};

// System assumptions
const SYSTEM_KWP = 5; // 5 kWp rooftop
const HOURLY_POINTS = Array.from({ length: 25 }, (_, i) => i); // 0..24 (hour boundaries)

function generateCurve(season: SeasonKey, weather: WeatherKey): number[] {
  const sp = seasonProfiles[season];
  const wp = weatherProfiles[weather];
  return HOURLY_POINTS.map((h) => {
    // Bell-curve irradiance centered at peakHour, width = duration
    const distance = (h - sp.peakHour) / (sp.duration / 2);
    if (Math.abs(distance) > 1) return 0;
    const bell = Math.cos(distance * (Math.PI / 2)); // 0..1..0
    // 5 kWp * 1 kW/m² * bell * seasonIntensity * weatherFactor
    const kw = SYSTEM_KWP * bell * sp.intensity * wp.factor;
    return Math.max(0, kw);
  });
}

export function EnergyProductionChart() {
  const [season, setSeason] = useState<SeasonKey>("summer");
  const [weather, setWeather] = useState<WeatherKey>("sunny");
  const [hoveredHour, setHoveredHour] = useState<number | null>(null);

  const curve = useMemo(() => generateCurve(season, weather), [season, weather]);

  // Stats
  const dailyKwh = useMemo(() => {
    // Trapezoidal integration (1-hour intervals)
    let sum = 0;
    for (let i = 0; i < curve.length - 1; i++) {
      sum += (curve[i] + curve[i + 1]) / 2;
    }
    return sum;
  }, [curve]);

  const peakKw = Math.max(...curve);
  const peakHourIdx = curve.indexOf(peakKw);
  const monthlyKwh = dailyKwh * 30;
  const annualKwh = dailyKwh * 365;
  const co2OffsetKg = annualKwh * 0.71; // ~0.71 kg CO2 per kWh in India grid
  const treesEquivalent = Math.floor(co2OffsetKg / 21); // 1 tree absorbs ~21 kg/yr

  // SVG chart dimensions
  const W = 720;
  const H = 280;
  const PAD = { top: 20, right: 24, bottom: 32, left: 44 };
  const innerW = W - PAD.left - PAD.right;
  const innerH = H - PAD.top - PAD.bottom;

  const maxKw = 5; // 5 kWp ceiling
  const xFor = (h: number) => PAD.left + (h / 24) * innerW;
  const yFor = (kw: number) => PAD.top + innerH - (kw / maxKw) * innerH;

  // Path
  const pathData = curve
    .map((kw, i) => `${i === 0 ? "M" : "L"} ${xFor(i).toFixed(1)} ${yFor(kw).toFixed(1)}`)
    .join(" ");
  const areaPath = `${pathData} L ${xFor(24).toFixed(1)} ${yFor(0).toFixed(1)} L ${xFor(0).toFixed(1)} ${yFor(0).toFixed(1)} Z`;

  const activeColor = weatherProfiles[weather].color;

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-dots-pattern opacity-40 pointer-events-none" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-10">
          <span className="inline-block px-3 py-1 mb-3 rounded-full bg-solar-green/10 border border-solar-green/20 text-xs uppercase tracking-wider font-semibold text-solar-green">
            Live Simulation
          </span>
          <h2 className="font-[family-name:var(--font-poppins)] text-2xl sm:text-3xl md:text-4xl font-bold mb-3 text-foreground heading-accent">
            Solar Energy Production, Hour by Hour
          </h2>
          <p className="text-base sm:text-lg max-w-3xl mx-auto text-muted-foreground leading-relaxed">
            See how a 5 kWp rooftop system generates power across the day. Adjust the season and weather to understand solar's reliable, predictable output.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-start">
          {/* Controls */}
          <div className="lg:col-span-1 space-y-6">
            {/* Season selector */}
            <div className="rounded-xl p-5 bg-solar-green/5 border border-solar-green/15">
              <h3 className="font-[family-name:var(--font-poppins)] text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                <span className="w-1 h-4 bg-solar-green rounded-full" /> Season
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {(Object.keys(seasonProfiles) as SeasonKey[]).map((s) => (
                  <button
                    key={s}
                    onClick={() => setSeason(s)}
                    className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                      season === s
                        ? "bg-solar-green text-white shadow-md shadow-solar-green/25"
                        : "bg-white text-muted-foreground hover:bg-solar-green/10 hover:text-solar-green border border-border"
                    }`}
                    aria-pressed={season === s}
                  >
                    {seasonProfiles[s].label}
                  </button>
                ))}
              </div>
            </div>

            {/* Weather selector */}
            <div className="rounded-xl p-5 bg-solar-green/5 border border-solar-green/15">
              <h3 className="font-[family-name:var(--font-poppins)] text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                <span className="w-1 h-4 bg-solar-green rounded-full" /> Weather
              </h3>
              <div className="space-y-2">
                {(Object.keys(weatherProfiles) as WeatherKey[]).map((w) => {
                  const WIcon = weatherProfiles[w].icon;
                  return (
                    <button
                      key={w}
                      onClick={() => setWeather(w)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                        weather === w
                          ? "bg-solar-green text-white shadow-md shadow-solar-green/25"
                          : "bg-white text-muted-foreground hover:bg-solar-green/10 hover:text-solar-green border border-border"
                      }`}
                      aria-pressed={weather === w}
                    >
                      <WIcon className="w-4 h-4" />
                      <span>{weatherProfiles[w].label}</span>
                      <span className={`ml-auto text-xs ${weather === w ? "text-white/80" : "text-muted-foreground/70"}`}>
                        {Math.round(weatherProfiles[w].factor * 100)}%
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* System info */}
            <div className="rounded-xl p-5 bg-solar-dark text-white">
              <h3 className="font-[family-name:var(--font-poppins)] text-sm font-semibold mb-3 flex items-center gap-2">
                <Battery className="w-4 h-4 text-solar-green-light" /> System Specs
              </h3>
              <dl className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <dt className="text-white/60">System size</dt>
                  <dd className="font-semibold tabular-nums">5 kWp rooftop</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-white/60">Module type</dt>
                  <dd className="font-semibold">TOPCon 580 W</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-white/60">Tilt</dt>
                  <dd className="font-semibold">23° (latitude tilt)</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-white/60">Orientation</dt>
                  <dd className="font-semibold">South-facing</dd>
                </div>
              </dl>
            </div>
          </div>

          {/* Chart + Stats */}
          <div className="lg:col-span-2 space-y-6">
            {/* Chart card */}
            <div className="rounded-2xl bg-white border border-border shadow-premium p-5 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-[family-name:var(--font-poppins)] text-base font-semibold text-foreground">
                    Hourly Power Output
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {seasonProfiles[season].label} · {weatherProfiles[weather].label} · Hover curve for details
                  </p>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: activeColor }} />
                  <span className="text-muted-foreground">kW output</span>
                </div>
              </div>

              <div className="w-full overflow-x-auto">
                <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto min-w-[600px]" role="img" aria-label="Hourly solar energy production chart">
                  <defs>
                    <linearGradient id="curve-area-grad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={activeColor} stopOpacity="0.45" />
                      <stop offset="100%" stopColor={activeColor} stopOpacity="0.02" />
                    </linearGradient>
                  </defs>

                  {/* Grid lines */}
                  {[0, 1, 2, 3, 4, 5].map((kw) => (
                    <g key={kw}>
                      <line
                        x1={PAD.left}
                        x2={W - PAD.right}
                        y1={yFor(kw)}
                        y2={yFor(kw)}
                        stroke="oklch(0.92 0.004 286)"
                        strokeWidth="1"
                      />
                      <text
                        x={PAD.left - 8}
                        y={yFor(kw) + 4}
                        textAnchor="end"
                        fontSize="11"
                        fill="oklch(0.55 0.01 286)"
                        className="tabular-nums"
                      >
                        {kw} kW
                      </text>
                    </g>
                  ))}

                  {/* X axis labels (every 3 hours) */}
                  {[0, 3, 6, 9, 12, 15, 18, 21, 24].map((h) => (
                    <text
                      key={h}
                      x={xFor(h)}
                      y={H - 10}
                      textAnchor="middle"
                      fontSize="11"
                      fill="oklch(0.55 0.01 286)"
                      className="tabular-nums"
                    >
                      {h.toString().padStart(2, "0")}:00
                    </text>
                  ))}

                  {/* Area fill */}
                  <motion.path
                    key={`area-${season}-${weather}`}
                    d={areaPath}
                    fill="url(#curve-area-grad)"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                  />

                  {/* Curve line */}
                  <motion.path
                    key={`line-${season}-${weather}`}
                    d={pathData}
                    fill="none"
                    stroke={activeColor}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  />

                  {/* Hover targets */}
                  {curve.map((kw, h) => (
                    <g key={h}>
                      {kw > 0.05 && (
                        <circle
                          cx={xFor(h)}
                          cy={yFor(kw)}
                          r={hoveredHour === h ? 5 : 3}
                          fill="white"
                          stroke={activeColor}
                          strokeWidth="2"
                          className="transition-all"
                        />
                      )}
                      <rect
                        x={xFor(h) - 14}
                        y={PAD.top}
                        width="28"
                        height={innerH}
                        fill="transparent"
                        onMouseEnter={() => setHoveredHour(h)}
                        onMouseLeave={() => setHoveredHour(null)}
                      />
                    </g>
                  ))}

                  {/* Tooltip */}
                  {hoveredHour !== null && curve[hoveredHour] > 0 && (
                    <g>
                      <line
                        x1={xFor(hoveredHour)}
                        x2={xFor(hoveredHour)}
                        y1={PAD.top}
                        y2={PAD.top + innerH}
                        stroke={activeColor}
                        strokeWidth="1"
                        strokeDasharray="3 3"
                        opacity="0.6"
                      />
                      <g
                        transform={`translate(${Math.min(xFor(hoveredHour) + 8, W - 130)}, ${Math.max(yFor(curve[hoveredHour]) - 50, PAD.top)})`}
                      >
                        <rect width="120" height="44" rx="6" fill="oklch(0.21 0.006 285.885)" opacity="0.95" />
                        <text x="10" y="18" fontSize="10" fill="white" opacity="0.7">
                          {hoveredHour.toString().padStart(2, "0")}:00 – {hoveredHour + 1}:00
                        </text>
                        <text x="10" y="34" fontSize="13" fill="white" fontWeight="600" className="tabular-nums">
                          {curve[hoveredHour].toFixed(2)} kW
                        </text>
                      </g>
                    </g>
                  )}
                </svg>
              </div>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <StatCard
                icon={Zap}
                label="Daily Output"
                value={dailyKwh.toFixed(1)}
                unit="kWh"
                hint={`Peak: ${peakKw.toFixed(2)} kW @ ${peakHourIdx}:00`}
              />
              <StatCard
                icon={TrendingUp}
                label="Monthly Output"
                value={monthlyKwh.toFixed(0)}
                unit="kWh"
                hint="Based on 30-day average"
              />
              <StatCard
                icon={Sun}
                label="Annual Output"
                value={annualKwh.toFixed(0)}
                unit="kWh"
                hint="Enough for 2-3 ACs year-round"
              />
              <StatCard
                icon={Battery}
                label="CO₂ Offset"
                value={(co2OffsetKg / 1000).toFixed(2)}
                unit="tons/yr"
                hint={`≈ ${treesEquivalent} trees planted`}
              />
            </div>

            <div className="rounded-xl p-4 bg-solar-green/5 border border-solar-green/15 text-xs text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Note:</strong> These are illustrative numbers based on typical Indian irradiance conditions (4.5–5.5 peak sun hours). Actual output varies with location, tilt, shading, and module temperature. Use our <span className="text-solar-green font-semibold">Solar ROI Calculator</span> above for personalized estimates.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  unit,
  hint,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  unit: string;
  hint?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="rounded-xl p-4 bg-white border border-border shadow-sm hover:shadow-md hover:border-solar-green/30 transition-all duration-300 group"
    >
      <div className="flex items-center justify-between mb-2">
        <Icon className="w-4 h-4 text-solar-green group-hover:scale-110 transition-transform" />
        <span className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</span>
      </div>
      <div className="flex items-baseline gap-1 mb-1">
        <span className="font-[family-name:var(--font-poppins)] text-xl sm:text-2xl font-bold text-foreground tabular-nums">
          {value}
        </span>
        <span className="text-xs font-semibold text-solar-green">{unit}</span>
      </div>
      {hint && <p className="text-[10px] text-muted-foreground leading-tight">{hint}</p>}
    </motion.div>
  );
}
