"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView, useMotionValue, animate } from "framer-motion";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useRouter } from "@/lib/router";
import { whySolarContent } from "@/content/why-solar";
import {
  Sun,
  Leaf,
  Wallet,
  Clock,
  TrendingUp,
  Zap,
  Calculator,
  ArrowRight,
} from "lucide-react";

const inrFormatter = new Intl.NumberFormat("en-IN", {
  maximumFractionDigits: 0,
});

/**
 * Animated number counter driven by framer-motion's animate() API.
 * Animates from previous value to new value whenever `value` changes.
 */
function AnimatedNumber({
  value,
  format = true,
  prefix = "",
  suffix = "",
  decimals = 0,
}: {
  value: number;
  format?: boolean;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: false, amount: 0.4 });
  const mv = useMotionValue(0);
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!inView) return;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) {
      // Defer setState into a microtask to avoid synchronous set-state-in-effect
      const t = setTimeout(() => {
        const num = decimals > 0 ? parseFloat(value.toFixed(decimals)) : Math.floor(value);
        setDisplay(format ? inrFormatter.format(num) : num.toFixed(decimals));
      }, 0);
      return () => clearTimeout(t);
    }
    const controls = animate(mv, value, {
      duration: 0.9,
      ease: "easeOut",
      onUpdate: (latest) => {
        const num = decimals > 0 ? parseFloat(latest.toFixed(decimals)) : Math.floor(latest);
        setDisplay(
          format ? inrFormatter.format(num) : num.toFixed(decimals)
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

interface CalcResults {
  systemSizeKw: number;
  annualEnergyKwh: number;
  annualSavingsInr: number;
  systemCostInr: number;
  paybackYears: number;
  savings25yInr: number;
  co2Tons: number;
}

export function SolarROICalculator() {
  const c = whySolarContent.roiCalculator;
  const { navigate } = useRouter();

  // --- Input state ---
  const [bill, setBill] = useState(5000);
  const [roofArea, setRoofArea] = useState(1000);
  const [stateCode, setStateCode] = useState("GJ");
  const [moduleId, setModuleId] = useState<"topcon" | "monoperc">("topcon");

  // --- Derived data ---
  const selectedState = useMemo(
    () => c.states.find((s) => s.code === stateCode) || c.states[0],
    [stateCode, c.states]
  );
  const selectedModule = useMemo(
    () => c.moduleTypes.find((m) => m.id === moduleId) || c.moduleTypes[0],
    [moduleId, c.moduleTypes]
  );

  // --- Calculations ---
  const results: CalcResults = useMemo(() => {
    // Recommended system size based on roof area (1 kW ≈ 100 sq ft)
    const systemSizeKw = roofArea / 100;
    const safeSize = Math.max(systemSizeKw, 0.5); // floor to 0.5 kW

    // Annual energy generation: system size × state irradiance × module efficiency multiplier
    // (defaults to ~1500 kWh/kW/yr per the task spec; state values vary realistically)
    const irradiance = selectedState.irradiance;
    const annualEnergyKwh =
      safeSize * irradiance * selectedModule.efficiencyMultiplier;

    // Annual savings: energy × ₹8/kWh
    const tariffPerKwh = 8;
    const annualSavingsInr = annualEnergyKwh * tariffPerKwh;

    // System cost estimate: system size × 1000 W × cost per watt
    const systemCostInr = safeSize * 1000 * selectedModule.costPerWatt;

    // Payback period: system cost / annual savings
    const paybackYears =
      annualSavingsInr > 0 ? systemCostInr / annualSavingsInr : 0;

    // 25-year savings
    const savings25yInr = annualSavingsInr * 25;

    // CO₂ offset over 25 years (tons): annual kWh × 0.7 kg/kWh × 25 yrs / 1000
    const co2Tons = (annualEnergyKwh * 0.7 * 25) / 1000;

    return {
      systemSizeKw: safeSize,
      annualEnergyKwh,
      annualSavingsInr,
      systemCostInr,
      paybackYears,
      savings25yInr,
      co2Tons,
    };
  }, [roofArea, selectedState, selectedModule]);

  // Payback progress — full bar at 10 years (anything beyond that is still good)
  const paybackPct = Math.min((results.paybackYears / 10) * 100, 100);
  const paybackColor =
    results.paybackYears <= 4
      ? "from-emerald-500 to-solar-green"
      : results.paybackYears <= 6
        ? "from-solar-green to-solar-green-light"
        : "from-amber-500 to-solar-gold";

  const resultCards = [
    {
      label: "Recommended System",
      value: results.systemSizeKw,
      suffix: " kW",
      decimals: 1,
      icon: Zap,
      tint: "text-solar-green",
      bg: "bg-solar-green/10",
    },
    {
      label: "Annual Generation",
      value: results.annualEnergyKwh,
      suffix: " kWh",
      decimals: 0,
      icon: Sun,
      tint: "text-solar-gold",
      bg: "bg-solar-gold/10",
    },
    {
      label: "Annual Savings",
      value: results.annualSavingsInr,
      prefix: "₹ ",
      suffix: "",
      decimals: 0,
      icon: Wallet,
      tint: "text-solar-green",
      bg: "bg-solar-green/10",
    },
    {
      label: "System Cost (est.)",
      value: results.systemCostInr,
      prefix: "₹ ",
      suffix: "",
      decimals: 0,
      icon: Calculator,
      tint: "text-foreground",
      bg: "bg-muted",
    },
    {
      label: "Payback Period",
      value: results.paybackYears,
      suffix: " yrs",
      decimals: 1,
      icon: Clock,
      tint: "text-solar-gold",
      bg: "bg-solar-gold/10",
    },
    {
      label: "25-Year Savings",
      value: results.savings25yInr,
      prefix: "₹ ",
      suffix: "",
      decimals: 0,
      icon: TrendingUp,
      tint: "text-solar-green",
      bg: "bg-solar-green/10",
    },
  ];

  return (
    <ScrollRevealWrap>
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-solar-green/5 via-white to-solar-green/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Heading */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-solar-green/10 text-solar-green text-xs font-semibold uppercase tracking-wider mb-3">
              <Calculator className="w-3.5 h-3.5" />
              Interactive Tool
            </div>
            <h2 className="font-[family-name:var(--font-poppins)] text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3">
              {c.title}
            </h2>
            <div className="w-16 h-1 rounded-full bg-solar-green mx-auto mb-4" />
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              {c.subtitle}
            </p>
          </div>

          <Card className="overflow-hidden border-solar-green/15 shadow-xl">
            <CardContent className="p-0">
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-0">
                {/* INPUTS */}
                <div className="lg:col-span-2 p-6 sm:p-8 bg-solar-dark text-white relative overflow-hidden">
                  <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-solar-green/20 blur-3xl pointer-events-none" />
                  <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-solar-green/10 blur-3xl pointer-events-none" />
                  <div className="relative z-10 space-y-7">
                    <h3 className="font-[family-name:var(--font-poppins)] text-lg font-semibold flex items-center gap-2">
                      <span className="w-8 h-8 rounded-lg bg-solar-green/20 flex items-center justify-center">
                        <SlidersIcon />
                      </span>
                      Your Inputs
                    </h3>

                    {/* Monthly Bill */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label className="text-sm text-white/80">
                          Monthly Electricity Bill
                        </Label>
                        <span className="font-[family-name:var(--font-poppins)] text-base font-bold text-solar-green-light">
                          ₹ {inrFormatter.format(bill)}
                        </span>
                      </div>
                      <Slider
                        value={[bill]}
                        min={1000}
                        max={50000}
                        step={500}
                        onValueChange={(v) => setBill(v[0])}
                        className="cursor-pointer"
                        aria-label="Monthly electricity bill in rupees"
                      />
                      <div className="flex justify-between text-[10px] text-white/40">
                        <span>₹1,000</span>
                        <span>₹50,000</span>
                      </div>
                    </div>

                    {/* Roof Area */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label className="text-sm text-white/80">
                          Roof Area Available
                        </Label>
                        <span className="font-[family-name:var(--font-poppins)] text-base font-bold text-solar-green-light">
                          {inrFormatter.format(roofArea)} sq ft
                        </span>
                      </div>
                      <Slider
                        value={[roofArea]}
                        min={100}
                        max={5000}
                        step={50}
                        onValueChange={(v) => setRoofArea(v[0])}
                        className="cursor-pointer"
                        aria-label="Roof area in square feet"
                      />
                      <div className="flex justify-between text-[10px] text-white/40">
                        <span>100 sq ft</span>
                        <span>5,000 sq ft</span>
                      </div>
                    </div>

                    {/* State select */}
                    <div className="space-y-2">
                      <Label className="text-sm text-white/80">
                        State / Region
                      </Label>
                      <Select value={stateCode} onValueChange={setStateCode}>
                        <SelectTrigger className="w-full bg-white/5 border-white/15 text-white hover:bg-white/10 focus-visible:border-solar-green focus-visible:ring-solar-green/30">
                          <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                        <SelectContent className="max-h-72">
                          {c.states.map((s) => (
                            <SelectItem key={s.code} value={s.code}>
                              {s.name} · {s.irradiance} kWh/kW/yr
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Module type radio */}
                    <div className="space-y-2">
                      <Label className="text-sm text-white/80">
                        Solar Module Type
                      </Label>
                      <RadioGroup
                        value={moduleId}
                        onValueChange={(v: "topcon" | "monoperc") => setModuleId(v)}
                        className="grid grid-cols-1 gap-2"
                      >
                        {c.moduleTypes.map((m) => (
                          <label
                            key={m.id}
                            htmlFor={`m-${m.id}`}
                            className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
                              moduleId === m.id
                                ? "bg-solar-green/15 border-solar-green/50"
                                : "bg-white/5 border-white/10 hover:border-white/25"
                            }`}
                          >
                            <RadioGroupItem
                              id={`m-${m.id}`}
                              value={m.id}
                              className="mt-0.5 border-white/40 text-solar-green data-[state=checked]:border-solar-green"
                            />
                            <div className="min-w-0">
                              <p className="text-sm font-semibold text-white">
                                {m.label}
                              </p>
                              <p className="text-xs text-white/60 leading-snug">
                                {m.description}
                              </p>
                              <p className="text-[11px] text-solar-green-light mt-1">
                                ₹{m.costPerWatt}/W · {m.efficiencyMultiplier > 1 ? `+${Math.round((m.efficiencyMultiplier - 1) * 100)}% energy` : "baseline"}
                              </p>
                            </div>
                          </label>
                        ))}
                      </RadioGroup>
                    </div>
                  </div>
                </div>

                {/* RESULTS */}
                <div className="lg:col-span-3 p-6 sm:p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-[family-name:var(--font-poppins)] text-lg font-semibold text-foreground">
                      Estimated Results
                    </h3>
                    <span className="text-xs text-muted-foreground">
                      {selectedState.name} · {selectedModule.label}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                    {resultCards.map((r) => {
                      const Icon = r.icon;
                      return (
                        <motion.div
                          key={r.label}
                          initial={{ opacity: 0, y: 12 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4 }}
                          className={`rounded-xl p-3 sm:p-4 ${r.bg} border border-border/60`}
                        >
                          <div className="flex items-center gap-1.5 mb-2">
                            <Icon className={`w-3.5 h-3.5 ${r.tint}`} />
                            <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">
                              {r.label}
                            </p>
                          </div>
                          <p className={`font-[family-name:var(--font-poppins)] text-base sm:text-xl font-bold ${r.tint}`}>
                            <AnimatedNumber
                              value={r.value}
                              prefix={r.prefix}
                              suffix={r.suffix}
                              decimals={r.decimals}
                            />
                          </p>
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* Payback progress bar */}
                  <div className="mt-6 rounded-xl p-4 sm:p-5 bg-white border border-border/60">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-solar-green" />
                        <p className="text-sm font-semibold text-foreground">
                          Payback Period
                        </p>
                      </div>
                      <p className="font-[family-name:var(--font-poppins)] text-lg font-bold text-foreground">
                        <AnimatedNumber
                          value={results.paybackYears}
                          decimals={1}
                          suffix=" years"
                        />
                      </p>
                    </div>
                    <div className="relative h-2.5 w-full rounded-full bg-muted overflow-hidden">
                      <motion.div
                        className={`absolute inset-y-0 left-0 rounded-full bg-gradient-to-r ${paybackColor}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${paybackPct}%` }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                      />
                    </div>
                    <div className="flex justify-between mt-1.5 text-[10px] text-muted-foreground">
                      <span>0 yr</span>
                      <span>5 yr</span>
                      <span>10+ yr</span>
                    </div>
                  </div>

                  {/* CO2 offset highlight */}
                  <div className="mt-4 rounded-xl p-4 sm:p-5 bg-solar-green/10 border border-solar-green/20 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-solar-green/20 flex items-center justify-center shrink-0">
                      <Leaf className="w-5 h-5 text-solar-green" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
                        CO₂ Offset over 25 Years
                      </p>
                      <p className="font-[family-name:var(--font-poppins)] text-lg font-bold text-foreground">
                        <AnimatedNumber
                          value={results.co2Tons}
                          decimals={1}
                          suffix=" tons"
                        />
                      </p>
                    </div>
                    <span className="text-[10px] text-solar-green bg-solar-green/15 px-2 py-1 rounded-full">
                      ≈ {Math.round(results.co2Tons * 16)} trees planted
                    </span>
                  </div>

                  {/* CTA */}
                  <div className="mt-6 flex flex-col sm:flex-row gap-3">
                    <Button
                      onClick={() => navigate(c.ctaRoute)}
                      className="flex-1 bg-solar-green hover:bg-solar-green-dark text-white rounded-lg h-12 font-semibold shadow-lg shadow-solar-green/25 hover:shadow-xl hover:shadow-solar-green/30 transition-all duration-300 group"
                    >
                      {c.ctaLabel}
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>

                  <p className="mt-4 text-[11px] text-muted-foreground leading-relaxed">
                    {c.note}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </ScrollRevealWrap>
  );
}

/** Lightweight scroll-reveal wrapper to keep this component self-contained. */
function ScrollRevealWrap({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

function SlidersIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-4 h-4 text-solar-green-light"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="4" y1="21" x2="4" y2="14" />
      <line x1="4" y1="10" x2="4" y2="3" />
      <line x1="12" y1="21" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12" y2="3" />
      <line x1="20" y1="21" x2="20" y2="16" />
      <line x1="20" y1="12" x2="20" y2="3" />
      <line x1="1" y1="14" x2="7" y2="14" />
      <line x1="9" y1="8" x2="15" y2="8" />
      <line x1="17" y1="16" x2="23" y2="16" />
    </svg>
  );
}
