"use client";

import React from "react";
import { aboutContent } from "@/content/about";
import { HeroSection } from "@/components/sections/HeroSection";
import { ImageTextSection } from "@/components/sections/ImageTextSection";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { StatsSection } from "@/components/sections/StatsSection";
import { ScrollReveal } from "@/components/ScrollReveal";
import { motion } from "framer-motion";
import { Target, Cpu, Globe2, Heart } from "lucide-react";
import Image from "next/image";

const visionIcons = [Target, Cpu, Globe2, Heart];

export function AboutPage() {
  const c = aboutContent;

  return (
    <main>
      {/* Hero */}
      <HeroSection
        variant="dark"
        title={c.hero.title}
        subtitle={c.hero.subtitle}
        backgroundImage={c.hero.backgroundImage}
        fullViewport={false}
      />

      {/* About Section */}
      <ImageTextSection
        title={c.aboutSection.title}
        description={c.aboutSection.paragraphs}
        image={c.aboutSection.image}
        imagePosition="right"
        variant="light"
      />

      {/* Sustainability */}
      <ScrollReveal>
        <section className="py-16 sm:py-20 lg:py-24 bg-solar-dark relative grain-overlay">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
              <div>
                <h2 className="font-[family-name:var(--font-poppins)] text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
                  {c.sustainability.title}
                </h2>
                <div className="w-12 h-1 rounded-full bg-solar-green mb-4" />
                <p className="text-sm sm:text-base text-white/70 leading-relaxed mb-6">
                  {c.sustainability.description}
                </p>
                <ul className="space-y-3">
                  {c.sustainability.highlights.map((highlight, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 }}
                      className="flex items-start gap-2.5 text-sm text-white/80"
                    >
                      <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-solar-green/20 text-solar-green-light shrink-0 mt-0.5">
                        <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="3">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </span>
                      {highlight}
                    </motion.li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl overflow-hidden aspect-[4/3] shadow-xl relative">
                <Image
                  src="/assets/home/solar-plant-aerial.webp"
                  alt="Sustainability at Adani Solar"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Milestones */}
      <ScrollReveal>
        <section className="py-16 sm:py-20 lg:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              title={c.milestones.title}
              variant="light"
            />
            <div className="mt-8 sm:mt-10 relative">
              {/* Timeline line */}
              <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-solar-green/20 via-solar-green/40 to-solar-green/20 -translate-x-0.5" />

              <div className="space-y-6 lg:space-y-0">
                {c.milestones.items.map((milestone, index) => (
                  <motion.div
                    key={milestone.year}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.08 }}
                    className={`flex flex-col lg:flex-row items-start lg:items-center gap-4 lg:gap-8 ${
                      index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                    }`}
                  >
                    <div
                      className={`flex-1 ${
                        index % 2 === 0 ? "lg:text-right" : "lg:text-left"
                      }`}
                    >
                      <div className="rounded-xl p-5 bg-solar-green/5 border border-solar-green/10 shadow-sm hover:shadow-lg hover:border-solar-green/30 hover:-translate-y-0.5 transition-all duration-300">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-solar-green/10 text-solar-green font-bold text-xs mb-2">
                          {milestone.year}
                        </span>
                        <h3 className="font-[family-name:var(--font-poppins)] text-base font-semibold text-foreground mt-1">
                          {milestone.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {milestone.description}
                        </p>
                      </div>
                    </div>
                    {/* Timeline dot */}
                    <div className="hidden lg:flex w-5 h-5 rounded-full bg-solar-green border-4 border-solar-green/20 shrink-0 shadow-md shadow-solar-green/30" />
                    <div className="flex-1" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Vision */}
      <ScrollReveal>
        <section className="py-16 sm:py-20 lg:py-24 bg-solar-dark relative grain-overlay">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <SectionHeading
              title={c.vision.title}
              variant="dark"
            />
            <p className="text-center text-white/70 max-w-2xl mx-auto mt-4 text-sm sm:text-base leading-relaxed">
              {c.vision.description}
            </p>
            <div className="mt-8 sm:mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {c.vision.pillars.map((pillar, index) => {
                const Icon = visionIcons[index] || Target;
                return (
                  <motion.div
                    key={pillar.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="rounded-xl p-6 bg-white/5 border border-white/10 hover:border-solar-green/30 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,166,81,0.12)] transition-all duration-300 group relative overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-solar-green/40 to-transparent" />
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-solar-green/25 to-solar-green/10 flex items-center justify-center mb-3 group-hover:from-solar-green/35 group-hover:to-solar-green/15 transition-all duration-300">
                      <Icon className="w-5 h-5 text-solar-green-light" />
                    </div>
                    <h3 className="font-[family-name:var(--font-poppins)] text-sm font-semibold text-white mb-2">
                      {pillar.title}
                    </h3>
                    <p className="text-xs text-white/60 leading-relaxed">
                      {pillar.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* MD's Message */}
      <ScrollReveal>
        <section className="py-16 sm:py-20 lg:py-24 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              title={c.mdMessage.title}
              variant="light"
            />
            <div className="mt-6 sm:mt-8 rounded-xl p-6 sm:p-8 bg-solar-green/5 border border-solar-green/10 shadow-sm">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full overflow-hidden bg-solar-green/20 shrink-0 relative">
                  <Image
                    src={c.mdMessage.image}
                    alt={c.mdMessage.name}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </div>
                <div>
                  <p className="font-[family-name:var(--font-poppins)] font-semibold text-foreground">
                    {c.mdMessage.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {c.mdMessage.designation}
                  </p>
                </div>
              </div>
              {c.mdMessage.message.split("\n\n").map((para, i) => (
                <p
                  key={i}
                  className="text-sm text-muted-foreground leading-relaxed mb-4 last:mb-0"
                >
                  {para}
                </p>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Stats */}
      <StatsSection
        items={c.stats.items}
        variant="dark"
        sectionTitle={c.stats.sectionTitle}
      />
    </main>
  );
}
