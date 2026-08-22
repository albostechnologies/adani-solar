"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { homeContent } from "@/content/home";
import { HeroSection } from "@/components/sections/HeroSection";
import { ImageTextSection } from "@/components/sections/ImageTextSection";
import { ValueChainSection } from "@/components/sections/ValueChainSection";
import { ProductTabs } from "@/components/sections/ProductTabs";
import { ContactFormSection } from "@/components/sections/ContactFormSection";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { StatsSection } from "@/components/sections/StatsSection";
import { TrustBadges } from "@/components/sections/TrustBadges";
import { FAQAccordion } from "@/components/sections/FAQAccordion";
import { SolarSavingsBanner } from "@/components/sections/SolarSavingsBanner";
import { WaveDivider } from "@/components/WaveDivider";
import { ScrollReveal } from "@/components/ScrollReveal";
import { CursorGlow } from "@/components/CursorGlow";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { MapPin, Box, GlassWater, Shield, Layers, Plug } from "lucide-react";
import { aboutContent } from "@/content/about";
import Image from "next/image";

const ancillaryIcons = [Box, GlassWater, Shield, Layers, Plug];

/** Export destination dots positioned roughly on a world map */
const exportDots = [
  { label: "Germany", x: "52%", y: "28%" },
  { label: "Spain", x: "47%", y: "38%" },
  { label: "Netherlands", x: "50%", y: "26%" },
  { label: "Italy", x: "53%", y: "36%" },
  { label: "USA", x: "22%", y: "35%" },
  { label: "Brazil", x: "32%", y: "62%" },
  { label: "Japan", x: "82%", y: "32%" },
  { label: "Australia", x: "84%", y: "68%" },
  { label: "South Korea", x: "80%", y: "30%" },
  { label: "UAE", x: "62%", y: "42%" },
  { label: "Saudi Arabia", x: "60%", y: "40%" },
  { label: "South Africa", x: "55%", y: "72%" },
  { label: "India (Mundra)", x: "68%", y: "42%" },
] as const;

function ExportMapWithDots({ image }: { image: string }) {
  const [hoveredDot, setHoveredDot] = useState<string | null>(null);

  return (
    <div className="rounded-2xl overflow-hidden aspect-[4/3] shadow-xl relative">
      <Image
        src={image}
        alt="Countries where Adani Solar modules are exported"
        fill
        className="object-cover"
        sizes="(max-width: 1024px) 100vw, 50vw"
      />
      {/* Semi-transparent overlay to help dots stand out */}
      <div className="absolute inset-0 bg-solar-dark/20" />

      {/* Animated pulsing dots */}
      {exportDots.map((dot) => {
        const isIndia = dot.label === "India (Mundra)";
        return (
          <div
            key={dot.label}
            className="absolute"
            style={{ left: dot.x, top: dot.y }}
            onMouseEnter={() => setHoveredDot(dot.label)}
            onMouseLeave={() => setHoveredDot(null)}
          >
            {/* Pulse ring */}
            <span
              className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                width: isIndia ? 28 : 20,
                height: isIndia ? 28 : 20,
                background: isIndia
                  ? "rgba(0,166,81,0.3)"
                  : "rgba(0,166,81,0.2)",
                animation: "map-dot-pulse 2s ease-in-out infinite",
              }}
            />
            {/* Solid dot */}
            <span
              className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full shadow-lg ${
                isIndia
                  ? "w-3.5 h-3.5 bg-solar-green"
                  : "w-2.5 h-2.5 bg-solar-green"
              }`}
              style={{ zIndex: 2 }}
            />
            {/* Hover label */}
            <AnimatePresence>
              {hoveredDot === dot.label && (
                <motion.span
                  initial={{ opacity: 0, y: 4, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 4, scale: 0.9 }}
                  transition={{ duration: 0.15 }}
                  className={`absolute -translate-x-1/2 top-3 whitespace-nowrap text-xs font-semibold px-2 py-1 rounded-md shadow-md z-10 ${
                    isIndia
                      ? "bg-solar-green text-white"
                      : "bg-white text-solar-dark"
                  }`}
                >
                  {dot.label}
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

export function HomePage() {
  const c = homeContent;

  return (
    <main>
      {/* 1. Hero */}
      <HeroSection
        variant="dark"
        title={c.hero.title}
        subtitle={c.hero.subtitle}
        cta={c.hero.cta}
        ctaRoute={c.hero.ctaRoute}
        secondaryCta={c.hero.secondaryCta}
        secondaryCtaRoute={c.hero.secondaryCtaRoute}
        backgroundImage={c.hero.backgroundImage}
        fullViewport
      />

      {/* 2. Stats Bar */}
      <StatsSection
        items={aboutContent.stats.items}
        variant="dark"
        sectionTitle={aboutContent.stats.sectionTitle}
      />

      {/* Wave transition: dark stats → light trust badges */}
      <WaveDivider variant="bottom" color="text-solar-dark" flip />

      {/* 2b. Trust Badges / Certifications */}
      <TrustBadges
        title={c.trustBadges.title}
        subtitle={c.trustBadges.subtitle}
        badges={c.trustBadges.badges}
      />

      {/* 2c. Solar Savings Calculator Banner */}
      <SolarSavingsBanner />

      {/* 3. About Adani Solar */}
      <CursorGlow className="bg-solar-dark">
        <ImageTextSection
          title={c.about.title}
          description={c.about.description}
          highlight={c.about.highlight}
          image={c.about.image}
          imagePosition="right"
          cta={c.about.cta}
          ctaRoute={c.about.ctaRoute}
          variant="dark"
        />
      </CursorGlow>

      {/* Wave transition: dark about → light value chain */}
      <WaveDivider variant="bottom" color="text-solar-dark" flip />

      {/* 4. PV Value Chain */}
      <div id="pv-value-chain">
      <CursorGlow>
        <ValueChainSection
          title={c.valueChain.title}
          subtitle={c.valueChain.subtitle}
          steps={c.valueChain.steps}
          variant="light"
        />
      </CursorGlow>
      </div>

      {/* 5. Ancillaries */}
      <WaveDivider variant="top" color="text-solar-dark" />
      <section className="py-16 sm:py-20 lg:py-24 bg-solar-dark relative grain-overlay">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeading
            title={c.ancillaries.title}
            subtitle={c.ancillaries.subtitle}
            variant="dark"
          />
          <div className="mt-8 sm:mt-10">
            <Carousel
              opts={{ align: "start", loop: true }}
              className="w-full"
            >
              <CarouselContent className="-ml-4">
                {c.ancillaries.items.map((item, index) => {
                  const Icon = ancillaryIcons[index] || Box;
                  return (
                    <CarouselItem
                      key={item.title}
                      className="pl-4 sm:basis-1/2 md:basis-1/3 lg:basis-1/5"
                    >
                      <div className="rounded-xl overflow-hidden bg-white/5 border border-white/10 hover:border-solar-green/30 transition-all duration-300 group hover:-translate-y-1 h-full">
                        <div className="aspect-[4/3] bg-gradient-to-br from-solar-green/10 to-solar-dark-secondary flex items-center justify-center relative">
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className="object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-300"
                            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                          />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-12 h-12 rounded-full bg-solar-green/20 flex items-center justify-center group-hover:bg-solar-green/30 transition-colors">
                              <Icon className="w-6 h-6 text-solar-green-light" />
                            </div>
                          </div>
                        </div>
                        <div className="p-4">
                          <h3 className="font-[family-name:var(--font-poppins)] text-sm font-semibold text-white mb-1">
                            {item.title}
                          </h3>
                          <p className="text-xs text-white/60 leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
              <CarouselPrevious className="hidden sm:flex -left-4 bg-solar-dark-secondary border-white/20 text-white hover:bg-white/10" />
              <CarouselNext className="hidden sm:flex -right-4 bg-solar-dark-secondary border-white/20 text-white hover:bg-white/10" />
            </Carousel>
          </div>
        </div>
      </section>

      {/* 6. Our Products */}
      <ProductTabs
        title={c.products.title}
        subtitle={c.products.subtitle}
        tabs={c.products.tabs}
        variant="light"
      />

      {/* Ask Our Expert */}
      <ContactFormSection
        title={c.askExpert.title}
        subtitle={c.askExpert.subtitle}
        subjectOptions={[
          "Product Inquiry",
          "Technical Support",
          "Partnership",
          "Careers",
          "Other",
        ]}
        variant="dark"
      />

      {/* Export Oriented Manufacturing */}
      <ScrollReveal>
        <section id="export-manufacturing" className="py-16 sm:py-20 lg:py-24 bg-solar-green/5 mesh-gradient-green">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              title={c.exportManufacturing.title}
              subtitle={c.exportManufacturing.subtitle}
              variant="light"
            />
            <div className="mt-8 sm:mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* World Map with animated export dots */}
              <ExportMapWithDots image={c.exportManufacturing.image} />

              {/* Regions */}
              <div className="grid grid-cols-2 gap-4">
                {c.exportManufacturing.regions.map((region, index) => (
                  <motion.div
                    key={region.name}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="rounded-xl p-4 bg-white border border-border shadow-sm hover:shadow-md hover:border-solar-green/30 transition-all duration-300"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="w-4 h-4 text-solar-green" />
                      <h4 className="font-[family-name:var(--font-poppins)] text-sm font-semibold text-foreground">
                        {region.name}
                      </h4>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {region.countries}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* FAQ */}
      <FAQAccordion
        title={c.faq.title}
        subtitle={c.faq.subtitle}
        items={c.faq.items}
        variant="light"
      />

      {/* 15. Sustainability */}
      <ScrollReveal>
        <section className="py-16 sm:py-20 lg:py-24 bg-solar-dark relative grain-overlay">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <SectionHeading
              title={c.sustainability.title}
              subtitle={c.sustainability.subtitle}
              variant="dark"
            />
            <div className="mt-8 sm:mt-10">
              <Carousel
                opts={{ align: "start", loop: true }}
                className="w-full"
              >
                <CarouselContent className="-ml-4">
                  {c.sustainability.businesses.map((biz) => (
                    <CarouselItem
                      key={biz.title}
                      className="pl-4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                    >
                      <div className="rounded-xl overflow-hidden bg-white/5 border border-white/10 hover:border-solar-green/30 transition-all duration-300 group hover:-translate-y-1">
                        <div className="aspect-[4/3] bg-gradient-to-br from-solar-green/10 to-solar-dark-secondary relative">
                          <Image
                            src={biz.image}
                            alt={biz.title}
                            fill
                            className="object-cover opacity-40 group-hover:opacity-60 transition-opacity"
                            sizes="(max-width: 768px) 50vw, 25vw"
                          />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-12 h-12 rounded-full bg-solar-green/20 flex items-center justify-center">
                              <svg
                                viewBox="0 0 24 24"
                                className="w-6 h-6 text-solar-green-light"
                                fill="currentColor"
                              >
                                <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66L7 17h5v-3H9l1-4h4V7h-2.5L13 3c-1.58 0-3.04.53-4.21 1.42L7 3C4.42 3 2.33 5.08 2.33 7.67c0 1.58.78 2.97 1.97 3.83L4 12c0 4.42 3.58 8 8 8s8-3.58 8-8c0-1.58-.46-3.05-1.25-4.28L17 8z" />
                              </svg>
                            </div>
                          </div>
                        </div>
                        <div className="p-4">
                          <h3 className="font-[family-name:var(--font-poppins)] text-sm font-semibold text-white mb-1">
                            {biz.title}
                          </h3>
                          <p className="text-xs text-white/60">
                            {biz.description}
                          </p>
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="hidden sm:flex -left-4 bg-solar-dark-secondary border-white/20 text-white hover:bg-white/10" />
                <CarouselNext className="hidden sm:flex -right-4 bg-solar-dark-secondary border-white/20 text-white hover:bg-white/10" />
              </Carousel>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </main>
  );
}
