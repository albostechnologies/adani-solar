"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { homeContent } from "@/content/home";
import { SectionEyebrow } from "@/components/editorial/SectionEyebrow";
import { EditorialHeading } from "@/components/editorial/EditorialHeading";

export function ManufacturingProcessSection() {
  const c = homeContent.valueChain;
  const [activeStep, setActiveStep] = useState(0);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers = stepRefs.current.map((el, index) => {
      if (!el) return null;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveStep(index);
        },
        { rootMargin: "-35% 0px -35% 0px", threshold: 0.2 }
      );
      observer.observe(el);
      return observer;
    });

    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  const activeImage = c.steps[activeStep]?.image ?? c.steps[0].image;

  return (
    <section id="pv-value-chain" className="editorial-section bg-white">
      <div className="editorial-section-inner mb-12 sm:mb-16">
        <SectionEyebrow number="04" label="Integrated Manufacturing" className="mb-6" />
        <EditorialHeading size="section" className="max-w-4xl mb-4">
          {c.title}
        </EditorialHeading>
        <p className="editorial-body text-muted-foreground max-w-2xl">{c.subtitle}</p>
      </div>

      <div className="editorial-section-inner">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start space-y-0">
            {c.steps.map((step, index) => {
              const stepNum = String(index + 1).padStart(2, "0");
              const total = String(c.steps.length).padStart(2, "0");
              const isActive = index === activeStep;

              return (
                <div
                  key={step.id}
                  ref={(el) => {
                    stepRefs.current[index] = el;
                  }}
                  className="min-h-[40vh] lg:min-h-[55vh] flex items-center py-8 lg:py-12 editorial-divider border-t first:border-t-0"
                >
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-solar-green mb-4">
                      {stepNum} / {total}
                    </p>
                    <h3
                      className={`font-[family-name:var(--font-poppins)] text-2xl sm:text-3xl lg:text-4xl font-semibold mb-4 transition-colors duration-300 ${
                        isActive ? "text-foreground" : "text-muted-foreground/70"
                      }`}
                    >
                      {step.title}
                    </h3>
                    <p className="editorial-body text-muted-foreground max-w-md">{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="hidden lg:block sticky top-28 self-start">
            <motion.div
              key={activeImage}
              initial={{ opacity: 0.6, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-muted"
            >
              <Image
                src={activeImage}
                alt={c.steps[activeStep]?.title ?? "Manufacturing process"}
                fill
                className="object-cover"
                sizes="50vw"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
