"use client";

import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  AUTOPLAY_DELAY,
  TRANSITION_DURATION_MS,
  heroSlides,
} from "@/content/heroSlides";
import { SectionEyebrow } from "@/components/editorial/SectionEyebrow";
import { EditorialHeading } from "@/components/editorial/EditorialHeading";
import { ArrowLink } from "@/components/editorial/ArrowLink";
import { cn } from "@/lib/utils";

function usePrefersReducedMotion() {
  return useSyncExternalStore(
    (onStoreChange) => {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      mq.addEventListener("change", onStoreChange);
      return () => mq.removeEventListener("change", onStoreChange);
    },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false
  );
}

export function HomeHeroSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reducedMotion = usePrefersReducedMotion();
  const slide = heroSlides[activeIndex];

  const goToSlide = useCallback((index: number) => {
    setActiveIndex(index);
    setPaused(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setPaused(false), AUTOPLAY_DELAY * 2);
  }, []);

  useEffect(() => {
    if (reducedMotion || paused) return;

    timerRef.current = setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % heroSlides.length);
    }, AUTOPLAY_DELAY);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [activeIndex, paused, reducedMotion]);

  const duration = reducedMotion ? 0 : TRANSITION_DURATION_MS / 1000;

  return (
    <section
      className="relative min-h-[88vh] lg:min-h-[92vh] bg-solar-dark text-white overflow-hidden"
      aria-roledescription="carousel"
      aria-label="Featured stories"
    >
      {/* Background images */}
      <div className="absolute inset-0">
        <AnimatePresence mode="sync">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, scale: reducedMotion ? 1 : 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 editorial-hero-image"
          >
            <Image
              src={slide.backgroundImage}
              alt=""
              fill
              priority={activeIndex === 0}
              className="object-cover"
              sizes="100vw"
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-r from-solar-dark via-solar-dark/85 to-solar-dark/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-solar-dark via-transparent to-solar-dark/40" />
      </div>

      <div className="editorial-section-inner relative z-10 pt-28 sm:pt-32 pb-12 lg:pb-16 min-h-[88vh] lg:min-h-[92vh] flex flex-col">
        <div className="grid flex-1 grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-16 items-end lg:items-center">
          {/* Left content */}
          <div className="max-w-3xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={slide.id}
                initial={reducedMotion ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reducedMotion ? undefined : { opacity: 0, y: -12 }}
                transition={{ duration: duration || 0.01 }}
                className="editorial-hero-text"
              >
                <SectionEyebrow
                  number={slide.index}
                  label={slide.eyebrow}
                  variant="dark"
                  className="mb-6 sm:mb-8"
                />
                <EditorialHeading as="h1" size="hero" variant="dark" className="mb-5 sm:mb-6">
                  {slide.title}
                </EditorialHeading>
                <p className="editorial-body text-white/75 max-w-xl mb-8 sm:mb-10">
                  {slide.subtitle}
                </p>
                <ArrowLink route={slide.ctaRoute} variant="primary" className="on-dark">
                  {slide.cta}
                </ArrowLink>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right slide cards — desktop stacked, mobile horizontal snap */}
          <div className="w-full">
            <div
              className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible snap-x snap-mandatory no-scrollbar pb-2 lg:pb-0"
              role="tablist"
              aria-label="Hero slides"
            >
              {heroSlides.map((item, index) => {
                const isActive = index === activeIndex;
                return (
                  <button
                    key={item.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={`hero-panel-${item.id}`}
                    id={`hero-tab-${item.id}`}
                    onClick={() => goToSlide(index)}
                    className={cn(
                      "snap-start shrink-0 w-[min(85vw,320px)] lg:w-full text-left rounded-xl overflow-hidden border transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-solar-green-light focus-visible:ring-offset-2 focus-visible:ring-offset-solar-dark",
                      isActive
                        ? "border-white/30 bg-white/10 shadow-none scale-[1.02] lg:scale-100"
                        : "border-white/10 bg-white/5 hover:bg-white/8 hover:border-white/20"
                    )}
                  >
                    <div className="flex items-stretch min-h-[88px]">
                      <div className="relative w-24 sm:w-28 shrink-0 min-h-[88px] self-stretch">
                        <Image
                          src={item.cardImage}
                          alt=""
                          fill
                          className="object-cover"
                          sizes="120px"
                        />
                      </div>
                      <div className="flex flex-col justify-center px-4 py-3 min-w-0">
                        <span className="text-[10px] uppercase tracking-[0.16em] text-solar-green-light mb-1">
                          {item.index} / {String(heroSlides.length).padStart(2, "0")}
                        </span>
                        <span className="text-xs text-white/55 truncate">{item.cardLabel}</span>
                        <span className="font-[family-name:var(--font-poppins)] text-sm font-semibold text-white truncate">
                          {item.cardTitle}
                        </span>
                      </div>
                    </div>
                    {isActive && (
                      <div className="h-0.5 bg-solar-green-light" aria-hidden="true" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
