"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { homeContent } from "@/content/home";
import { SectionEyebrow } from "@/components/editorial/SectionEyebrow";
import { EditorialHeading } from "@/components/editorial/EditorialHeading";
import { cn } from "@/lib/utils";

export function AncillaryListSection() {
  const c = homeContent.ancillaries;
  const [activeIndex, setActiveIndex] = useState(0);
  const active = c.items[activeIndex];

  return (
    <section className="editorial-section bg-[#f7f7f5]">
      <div className="editorial-section-inner">
        <SectionEyebrow number="04B" label="Ancillary Manufacturing" className="mb-6" />
        <EditorialHeading size="statement" className="max-w-3xl mb-10 sm:mb-14">
          Everything a module needs. Built together.
        </EditorialHeading>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <div role="list" className="divide-y divide-border/70">
            {c.items.map((item, index) => {
              const num = String(index + 1).padStart(2, "0");
              const isActive = index === activeIndex;
              return (
                <button
                  key={item.title}
                  type="button"
                  role="listitem"
                  data-active={isActive}
                  onMouseEnter={() => setActiveIndex(index)}
                  onFocus={() => setActiveIndex(index)}
                  onClick={() => setActiveIndex(index)}
                  className={cn(
                    "editorial-list-row w-full flex items-center justify-between gap-4 py-5 sm:py-6 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-solar-green focus-visible:ring-inset"
                  )}
                >
                  <div className="flex items-start gap-4 min-w-0">
                    <span className="text-sm tabular-nums text-muted-foreground pt-1">{num}</span>
                    <div>
                      <p className="font-[family-name:var(--font-poppins)] text-lg sm:text-xl font-semibold text-foreground">
                        {item.title}
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground lg:hidden">{item.description}</p>
                    </div>
                  </div>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                </button>
              );
            })}
          </div>

          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-muted">
            <Image
              key={active.title}
              src={active.image}
              alt={active.title}
              fill
              className="object-cover transition-opacity duration-500"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-solar-dark/80 to-transparent p-6 sm:p-8">
              <p className="text-xs uppercase tracking-[0.16em] text-solar-green-light mb-2">
                {active.title}
              </p>
              <p className="editorial-body text-white/85 max-w-md hidden lg:block">{active.description}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
