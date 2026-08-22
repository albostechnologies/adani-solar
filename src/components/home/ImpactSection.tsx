"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { aboutContent } from "@/content/about";
import { SectionEyebrow } from "@/components/editorial/SectionEyebrow";
import { EditorialHeading } from "@/components/editorial/EditorialHeading";

export function ImpactSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const stats = aboutContent.stats.items;

  return (
    <section ref={ref} className="editorial-section bg-white editorial-divider border-t">
      <div className="editorial-section-inner">
        <SectionEyebrow number="02" label="Impact" className="mb-6" />
        <EditorialHeading size="statement" className="max-w-3xl mb-12 sm:mb-16">
          Manufacturing solar at global scale.
        </EditorialHeading>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-6 lg:gap-x-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className={index > 0 ? "lg:border-l lg:border-border/60 lg:pl-10" : ""}
            >
              <p className="editorial-stat-value font-[family-name:var(--font-poppins)] font-semibold tabular-nums text-foreground">
                {stat.value}
                <span className="text-solar-green">{stat.unit}</span>
              </p>
              <p className="mt-2 text-xs sm:text-sm uppercase tracking-[0.14em] text-muted-foreground">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
