"use client";

import React, { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useRouter, type RouteName } from "@/lib/router";
import { Zap, Globe, TreePine, TrendingUp, ChevronDown } from "lucide-react";
import { RippleButton } from "@/components/RippleButton";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

interface HeroStat {
  value: number;
  unit: string;
  label: string;
  icon: React.ElementType;
  /** Optional tooltip describing what the stat measures */
  hint?: string;
}

const defaultStats: HeroStat[] = [
  { value: 4, unit: "GW", label: "Capacity", icon: Zap, hint: "Cells and modules manufacturing capacity at Mundra, Gujarat" },
  { value: 20, unit: "+", label: "Countries", icon: Globe, hint: "Adani Solar modules exported to 20+ countries across 4 continents" },
  { value: 340, unit: "M", label: "Trees Saved", icon: TreePine, hint: "CO₂ offset equivalent to 340 million trees over the lifetime of installed modules" },
  { value: 13.6, unit: "M T", label: "CO₂ Avoided", icon: TrendingUp, hint: "13.6 million tonnes of CO₂ emissions avoided annually" },
];

interface HeroSectionProps {
  variant?: "image" | "video" | "dark" | "split";
  title: string;
  subtitle?: string;
  cta?: string;
  ctaRoute?: RouteName;
  secondaryCta?: string;
  secondaryCtaRoute?: RouteName;
  backgroundImage?: string;
  fullViewport?: boolean;
  overlayOpacity?: number;
  stats?: HeroStat[];
}

function AnimatedHeroCounter({ target, isActive }: { target: number; isActive: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isActive) return;
    const duration = 2000;
    let startTime: number | null = null;
    const isFloat = target % 1 !== 0;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(isFloat ? parseFloat((eased * target).toFixed(1)) : Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [isActive, target]);

  return <>{count}</>;
}

/** Word-by-word fade-in reveal. Renders full text in DOM (no truncation), animates opacity per word. */
function WordReveal({
  text,
  className,
  speed = 0.04,
  startDelay = 0.15,
}: {
  text: string;
  className?: string;
  speed?: number;
  startDelay?: number;
}) {
  const prefersReduced = usePrefersReducedMotion();
  const mounted = useMounted();

  const words = text.split(" ");

  // Before mount or when reduced motion: render plain text (no animation) so SSR & SEO see full text
  if (!mounted || prefersReduced) {
    return <span className={className}>{text}</span>;
  }

  return (
    <span className={className}>
      {words.map((word, i) => (
        <React.Fragment key={i}>
          <motion.span
            initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              duration: 0.35,
              delay: startDelay + i * speed,
              ease: "easeOut",
            }}
            className="inline-block"
          >
            {word}
          </motion.span>
          {i < words.length - 1 ? " " : ""}
        </React.Fragment>
      ))}
    </span>
  );
}

/** Subscribe to prefers-reduced-motion without triggering the set-state-in-effect lint rule. */
function usePrefersReducedMotion() {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      const handler = () => onChange();
      mq.addEventListener("change", handler);
      return () => mq.removeEventListener("change", handler);
    },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false, // SSR snapshot
  );
}

/** Track mount state without triggering set-state-in-effect lint rule. */
function useMounted() {
  return useSyncExternalStore(
    (onChange) => {
      // Fires once on hydration complete
      onChange();
      return () => {};
    },
    () => true,
    () => false,
  );
}

/** Floating solar-themed orbs/particles in the background */
function FloatingParticles({ isDark }: { isDark: boolean }) {
  const particles = [
    { top: "12%", left: "8%", size: 80, delay: 0, duration: 18, opacity: 0.12 },
    { top: "22%", left: "82%", size: 110, delay: 2, duration: 22, opacity: 0.14 },
    { top: "70%", left: "10%", size: 90, delay: 4, duration: 20, opacity: 0.10 },
    { top: "78%", left: "88%", size: 70, delay: 1, duration: 16, opacity: 0.12 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            top: p.top,
            left: p.left,
            width: p.size,
            height: p.size,
            background: isDark
              ? `radial-gradient(circle, rgba(0,200,120,${p.opacity}) 0%, transparent 70%)`
              : `radial-gradient(circle, rgba(0,166,81,${p.opacity * 0.6}) 0%, transparent 70%)`,
            filter: "blur(12px)",
          }}
          animate={{
            x: [0, 15, -10, 18, 0],
            y: [0, -20, 15, -8, 0],
            scale: [1, 1.1, 0.95, 1.05, 1],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
      {/* Tiny sparkles - corner-only */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.span
          key={`spark-${i}`}
          className="absolute w-1 h-1 rounded-full bg-solar-green-light/50"
          style={{
            top: `${10 + (i * 11) % 80}%`,
            left: `${5 + (i * 17) % 90}%`,
          }}
          animate={{ opacity: [0, 0.6, 0], scale: [0, 1.2, 0] }}
          transition={{
            duration: 3,
            delay: (i % 4) * 0.6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

export function HeroSection({
  variant = "dark",
  title,
  subtitle,
  cta,
  ctaRoute,
  secondaryCta,
  secondaryCtaRoute,
  backgroundImage,
  fullViewport = true,
  overlayOpacity = 0.7,
  stats = defaultStats,
}: HeroSectionProps) {
  const { navigate } = useRouter();
  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-50px" });
  const sectionRef = useRef<HTMLElement>(null);

  // Subtle parallax — background translateY as user scrolls past hero
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const overlayOpacityMotion = useTransform(scrollYProgress, [0, 1], [1, 0.6]);

  const isDark = variant === "dark" || variant === "video";
  const isSplit = variant === "split";

  return (
    <section
      ref={sectionRef}
      className={`relative overflow-hidden ${
        fullViewport ? "min-h-screen" : "min-h-[60vh]"
      } flex items-center ${isSplit ? "" : "justify-center"}`}
    >
      {/* Background Image (with parallax) */}
      {backgroundImage && (
        <motion.div className="absolute inset-0" style={{ y: bgY }}>
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
            style={{ backgroundImage: `url(${backgroundImage})` }}
            role="img"
            aria-label="Solar manufacturing facility"
          />
          <motion.div
            className="absolute inset-0"
            style={{
              opacity: overlayOpacityMotion,
              background: isDark
                ? `linear-gradient(180deg, rgba(10, 22, 40, ${overlayOpacity}) 0%, rgba(10, 22, 40, ${overlayOpacity + 0.15}) 50%, rgba(10, 22, 40, ${overlayOpacity + 0.25}) 100%)`
                : `linear-gradient(180deg, rgba(255,255,255, ${overlayOpacity * 0.2}) 0%, rgba(255,255,255, ${overlayOpacity * 0.4}) 100%)`,
            }}
          />
        </motion.div>
      )}

      {/* Fallback gradient for no image */}
      {!backgroundImage && isDark && (
        <div className="absolute inset-0 bg-gradient-to-br from-solar-dark via-solar-dark-secondary to-solar-dark" />
      )}

      {/* Floating particles / orbs */}
      <FloatingParticles isDark={isDark} />

      {/* Subtle grain texture overlay */}
      {isDark && (
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '128px 128px',
        }} />
      )}

      {/* Content */}
      <div
        className={`relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full ${
          isSplit ? "grid grid-cols-1 lg:grid-cols-2 gap-12 items-center" : ""
        }`}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`${isSplit ? "" : "text-center max-w-4xl mx-auto"}`}
        >
          <h1
            className={`font-[family-name:var(--font-poppins)] text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-4 sm:mb-6 ${
              isDark
                ? "text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-solar-green-light"
                : "text-foreground"
            }`}
          >
            {title}
          </h1>

          {subtitle && (
            <p
              className={`relative text-base sm:text-lg md:text-xl leading-relaxed mb-6 sm:mb-8 max-w-2xl ${isSplit ? "" : "mx-auto"} ${
                isDark ? "text-white/90" : "text-muted-foreground"
              }`}
            >
              <span className="relative inline-block drop-shadow-[0_1px_3px_rgba(0,0,0,0.7)] before:absolute before:inset-x-0 before:-inset-y-2 before:bg-gradient-to-r before:from-black/40 before:via-black/30 before:to-black/40 before:-z-10 before:backdrop-blur-[1px]">
                <WordReveal text={subtitle} />
              </span>
            </p>
          )}

          {/* Animated Stats Badges with tooltips */}
          {fullViewport && (
            <div ref={statsRef} className={`flex flex-wrap gap-2 sm:gap-3 md:gap-4 mb-8 sm:mb-10 ${isSplit ? "" : "justify-center"}`}>
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                const badge = (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={statsInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                    className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-full border backdrop-blur-sm cursor-help ${
                      isDark
                        ? "bg-white/10 border-white/20 text-white hover:border-solar-green/40 hover:bg-white/15"
                        : "bg-solar-green/10 border-solar-green/20 text-foreground hover:border-solar-green/50"
                    } transition-colors duration-200`}
                  >
                    <Icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isDark ? "text-solar-green-light" : "text-solar-green"}`} />
                    <span className="font-[family-name:var(--font-poppins)] text-xs sm:text-sm md:text-base font-bold">
                      <AnimatedHeroCounter target={stat.value} isActive={statsInView} />
                      <span className={isDark ? "text-solar-green-light" : "text-solar-green"}>{stat.unit}</span>
                    </span>
                    <span className={`text-[10px] sm:text-xs hidden sm:inline ${isDark ? "text-white/60" : "text-muted-foreground"}`}>{stat.label}</span>
                  </motion.div>
                );
                if (stat.hint) {
                  return (
                    <Tooltip key={stat.label} delayDuration={150}>
                      <TooltipTrigger asChild>{badge}</TooltipTrigger>
                      <TooltipContent
                        side="bottom"
                        className="max-w-xs text-xs leading-relaxed shadow-lg"
                      >
                        {stat.hint}
                      </TooltipContent>
                    </Tooltip>
                  );
                }
                return <div key={stat.label}>{badge}</div>;
              })}
            </div>
          )}

          {/* CTA buttons */}
          {(cta || secondaryCta) && (
            <div className={`flex flex-col sm:flex-row gap-3 sm:gap-4 ${isSplit ? "" : "items-center sm:justify-center"}`}>
              {cta && (
                <RippleButton
                  onClick={() => ctaRoute && navigate(ctaRoute)}
                  className="btn-premium text-white rounded-lg w-full sm:w-auto px-8 sm:px-10 h-13 sm:h-14 text-base sm:text-lg font-semibold shadow-lg shadow-solar-green/30 hover:shadow-xl hover:shadow-solar-green/40"
                  rippleColor="rgba(255,255,255,0.5)"
                  aria-label={cta}
                >
                  {cta}
                </RippleButton>
              )}
              {secondaryCta && (
                <Button
                  onClick={() => secondaryCtaRoute && navigate(secondaryCtaRoute)}
                  variant="outline"
                  size="lg"
                  className={`rounded-lg w-full sm:w-auto px-8 sm:px-10 h-13 sm:h-14 text-base sm:text-lg font-semibold transition-all duration-300 backdrop-blur-sm ${
                    isDark
                      ? "border-2 border-white/40 bg-white/10 text-white hover:bg-white/20 hover:text-white hover:border-white/70 shadow-lg shadow-black/20"
                      : "border-2 border-solar-green/40 text-solar-green hover:bg-solar-green/10 hover:border-solar-green"
                  }`}
                >
                  {secondaryCta}
                </Button>
              )}
            </div>
          )}
        </motion.div>

        {/* Split layout: right side for image/video */}
        {isSplit && (
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="hidden lg:block"
          >
            {backgroundImage && (
              <div
                className="rounded-2xl overflow-hidden shadow-2xl aspect-[4/3] bg-cover bg-center"
                style={{ backgroundImage: `url(${backgroundImage})` }}
              />
            )}
          </motion.div>
        )}
      </div>

      {/* Scroll indicator for full viewport hero */}
      {fullViewport && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        >
          <motion.button
            onClick={() =>
              window.scrollTo({ top: window.innerHeight - 64, behavior: "smooth" })
            }
            className="flex flex-col items-center gap-1 group cursor-pointer"
            aria-label="Scroll to explore"
          >
            <span className="text-xs text-white/50 uppercase tracking-widest group-hover:text-white/80 transition-colors">
              Scroll to Explore
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            >
              <ChevronDown className="w-6 h-6 text-solar-green-light group-hover:text-solar-green transition-colors" />
            </motion.div>
          </motion.button>
        </motion.div>
      )}
    </section>
  );
}
