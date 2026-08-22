"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { homeContent } from "@/content/home";
import { SectionEyebrow } from "@/components/editorial/SectionEyebrow";
import { EditorialHeading } from "@/components/editorial/EditorialHeading";

const exportDots = [
  { label: "Germany", x: "52%", y: "28%" },
  { label: "USA", x: "22%", y: "35%" },
  { label: "Japan", x: "82%", y: "32%" },
  { label: "UAE", x: "62%", y: "42%" },
  { label: "India (Mundra)", x: "68%", y: "42%" },
  { label: "Australia", x: "84%", y: "68%" },
] as const;

export function GlobalPresenceSection() {
  const c = homeContent.exportManufacturing;
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section id="export-manufacturing" className="editorial-section bg-[#f7f7f5]">
      <div className="editorial-section-inner">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <SectionEyebrow number="07" label="Global Presence" className="mb-6" />
            <EditorialHeading size="section" className="mb-5">
              Global solar technology delivered across 20+ markets.
            </EditorialHeading>
            <p className="editorial-body text-muted-foreground mb-8 max-w-lg">{c.subtitle}</p>

            <div className="grid grid-cols-2 gap-x-6 gap-y-4">
              {c.regions.map((region) => (
                <div key={region.name} className="py-3 editorial-divider border-t">
                  <p className="text-sm font-semibold text-foreground mb-1">{region.name}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{region.countries}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-muted">
            <Image
              src={c.image}
              alt="Countries where Adani Solar modules are exported"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-solar-dark/15" />
            {exportDots.map((dot) => (
              <div
                key={dot.label}
                className="absolute"
                style={{ left: dot.x, top: dot.y }}
                onMouseEnter={() => setHovered(dot.label)}
                onMouseLeave={() => setHovered(null)}
              >
                <span className="absolute -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-solar-green shadow-md" />
                <AnimatePresence>
                  {hovered === dot.label && (
                    <motion.span
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 4 }}
                      className="absolute left-1/2 -translate-x-1/2 top-4 whitespace-nowrap rounded-md bg-white px-2 py-1 text-xs font-medium text-solar-dark shadow"
                    >
                      {dot.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
