"use client";

import React, { useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, animate as fmAnimate } from "framer-motion";
import {
  Sun,
  Zap,
  Leaf,
  Shield,
  DollarSign,
  Users,
  Globe,
  TreePine,
  TrendingUp,
  Settings,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Sun,
  Zap,
  Leaf,
  Shield,
  DollarSign,
  Users,
  Globe,
  TreePine,
  TrendingUp,
  Settings,
};

interface StatItem {
  value: number;
  unit: string;
  label: string;
  icon: string;
}

interface StatsSectionProps {
  items: StatItem[];
  variant?: "light" | "dark";
  sectionTitle?: string;
}

function AnimatedCounter({
  target,
  duration = 2,
  isActive,
}: {
  target: number;
  duration?: number;
  isActive: boolean;
}) {
  const motionVal = useMotionValue(0);
  const [display, setDisplay] = React.useState(target); // Show target immediately
  const hasAnimatedRef = useRef(false);
  const isFloat = target % 1 !== 0;

  useEffect(() => {
    const unsubscribe = motionVal.on("change", (v) => {
      setDisplay(isFloat ? parseFloat(v.toFixed(1)) : Math.floor(v));
    });

    return unsubscribe;
  }, [motionVal, isFloat]);

  useEffect(() => {
    if (!isActive || hasAnimatedRef.current) return;
    hasAnimatedRef.current = true;

    // Reset to 0 first, then animate to target
    motionVal.set(0);
    const controls = fmAnimate(motionVal, target, {
      duration,
      ease: [0.25, 0.1, 0.25, 1], // ease-out cubic approximation
    });

    return () => {
      controls.stop();
    };
  }, [isActive, target, duration, motionVal]);

  return <>{display}</>;
}

export function StatsSection({
  items,
  variant = "light",
  sectionTitle,
}: StatsSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const isDark = variant === "dark";

  return (
    <section
      ref={ref}
      className={`py-12 sm:py-16 ${isDark ? "bg-solar-dark" : "bg-solar-green/5"}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {sectionTitle && (
          <h3
            className={`font-[family-name:var(--font-poppins)] text-lg font-semibold mb-8 text-center ${
              isDark ? "text-white/60" : "text-muted-foreground"
            }`}
          >
            {sectionTitle}
          </h3>
        )}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {items.map((item, index) => {
            const Icon = iconMap[item.icon] || Zap;
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.03 }}
                className={`text-center group rounded-2xl p-5 sm:p-6 transition-all duration-300 ${
                  isDark
                    ? "bg-white/[0.04] border border-white/[0.08] backdrop-blur-sm hover:bg-white/[0.07] hover:border-solar-green/20 hover:shadow-[0_8px_30px_rgba(0,166,81,0.1)]"
                    : "bg-white border border-solar-green/10 shadow-sm hover:border-solar-green/25 hover:shadow-md hover:shadow-solar-green/5"
                }`}
              >
                <div
                  className={`inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-xl mb-3 transition-all duration-300 ${
                    isDark
                      ? "bg-gradient-to-br from-solar-green/25 to-solar-green/10 text-solar-green-light group-hover:from-solar-green/35 group-hover:to-solar-green/15"
                      : "bg-gradient-to-br from-solar-green/15 to-solar-green/5 text-solar-green group-hover:from-solar-green/25 group-hover:to-solar-green/10"
                  }`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <div
                  className={`font-[family-name:var(--font-poppins)] text-3xl sm:text-4xl md:text-5xl font-bold mb-1 ${
                    isDark ? "text-white" : "text-foreground"
                  }`}
                >
                  <AnimatedCounter
                    target={item.value}
                    isActive={isInView}
                  />
                  <span className="text-solar-green">{item.unit}</span>
                </div>
                <p
                  className={`text-sm sm:text-base ${
                    isDark ? "text-white/60" : "text-muted-foreground"
                  }`}
                >
                  {item.label}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
