"use client";

import React, { useEffect, useRef, useState } from "react";
import { whySolarContent } from "@/content/why-solar";
import { HeroSection } from "@/components/sections/HeroSection";
import { CardGrid } from "@/components/sections/CardGrid";
import { StatsSection } from "@/components/sections/StatsSection";
import { CTASection } from "@/components/sections/CTASection";
import { SolarROICalculator } from "@/components/sections/SolarROICalculator";
import { EnergyProductionChart } from "@/components/sections/EnergyProductionChart";
import { SolarTiltSimulator } from "@/components/sections/SolarTiltSimulator";
import { ScrollReveal } from "@/components/ScrollReveal";
import { motion, useInView } from "framer-motion";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { HelpCircle } from "lucide-react";

function AnimatedStat({ value, unit }: { value: string; unit: string }) {
  const numericValue = parseFloat(value);
  const isNumeric = !isNaN(numericValue);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [displayed, setDisplayed] = useState<string | number>(isNumeric ? 0 : value);

  useEffect(() => {
    if (!isNumeric || !isInView) return;
    const duration = 2000;
    let startTime: number | null = null;
    const isFloat = numericValue % 1 !== 0;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * numericValue;
      setDisplayed(isFloat ? current.toFixed(1) : Math.floor(current).toString());
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [isNumeric, numericValue, isInView]);

  return (
    <div ref={ref}>
      <span className="font-[family-name:var(--font-poppins)] text-3xl sm:text-4xl font-bold text-white">
        {isNumeric ? displayed : value}
      </span>
      <span className="text-solar-green-light">{unit}</span>
    </div>
  );
}

export function WhySolarPage() {
  const c = whySolarContent;

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

      {/* Intro */}
      <ScrollReveal>
        <section className="py-12 sm:py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-[family-name:var(--font-poppins)] text-2xl sm:text-3xl font-bold text-foreground mb-3">
              {c.intro.title}
            </h2>
            <div className="w-16 h-1 rounded-full bg-solar-green mx-auto mb-4" />
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              {c.intro.description}
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* Benefits - with proper icon mapping via CardGrid */}
      <CardGrid
        items={c.benefits.map((b) => ({
          title: b.title,
          description: b.description,
          icon: b.icon,
        }))}
        variant="light"
        columns={3}
      />

      {/* India Stats */}
      <ScrollReveal>
        <section className="py-16 sm:py-20 lg:py-24 bg-solar-dark relative grain-overlay">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h2 className="font-[family-name:var(--font-poppins)] text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
              {c.indiaStats.title}
            </h2>
            <div className="w-16 h-1 rounded-full bg-solar-green mx-auto mb-4" />
            <p className="text-white/70 max-w-xl mx-auto text-sm sm:text-base mb-10">
              {c.indiaStats.subtitle}
            </p>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {c.indiaStats.stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="mb-1">
                    <AnimatedStat value={stat.value} unit={stat.unit} />
                  </div>
                  <p className="text-sm text-white/60">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Solar ROI Calculator */}
      <div data-tour-id="tour-roi-calculator">
      <SolarROICalculator />
      </div>

      {/* Interactive Energy Production Chart */}
      <EnergyProductionChart />

      {/* Interactive Solar Panel Tilt Simulator */}
      <SolarTiltSimulator />

      {/* FAQ Accordion */}
      <ScrollReveal>
        <section className="py-16 sm:py-20 lg:py-24 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 rounded-full bg-solar-green/15 flex items-center justify-center">
                <HelpCircle className="w-6 h-6 text-solar-green" />
              </div>
            </div>
            <SectionHeading
              title={c.faqs.title}
              subtitle={c.faqs.subtitle}
              variant="light"
            />
            <Accordion
              type="single"
              collapsible
              className="mt-8 w-full bg-white rounded-xl border border-border px-4 sm:px-6"
            >
              {c.faqs.items.map((faq, idx) => (
                <AccordionItem
                  key={faq.question}
                  value={`item-${idx}`}
                  className={idx === 0 ? "border-t-0" : ""}
                >
                  <AccordionTrigger className="font-[family-name:var(--font-poppins)] text-sm sm:text-base font-semibold text-left hover:text-solar-green hover:no-underline transition-colors duration-200">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </ScrollReveal>

      {/* CTA */}
      <CTASection
        title={c.ctaSection.title}
        subtitle={c.ctaSection.subtitle}
        ctaLabel={c.ctaSection.ctaLabel}
        ctaRoute={c.ctaSection.ctaRoute}
        variant="green"
      />
    </main>
  );
}
