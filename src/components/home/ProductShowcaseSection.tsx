"use client";

import { useState } from "react";
import Image from "next/image";
import { homeContent } from "@/content/home";
import { SectionEyebrow } from "@/components/editorial/SectionEyebrow";
import { EditorialHeading } from "@/components/editorial/EditorialHeading";
import { ArrowLink } from "@/components/editorial/ArrowLink";
import { cn } from "@/lib/utils";
import type { RouteName } from "@/lib/routes";

export function ProductShowcaseSection() {
  const c = homeContent.products;
  const [activeId, setActiveId] = useState<"topcon" | "monoperc">("topcon");
  const activeTab = c.tabs.find((t) => t.id === activeId) ?? c.tabs[0];
  const route: RouteName = activeId === "topcon" ? "product-topcon" : "product-monoperc";
  const tabIndex = c.tabs.findIndex((t) => t.id === activeId) + 1;

  return (
    <section className="editorial-section bg-solar-dark text-white">
      <div className="editorial-section-inner">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6 mb-10 sm:mb-14">
          <div className="flex-1 min-w-0 sm:pr-10">
            <SectionEyebrow number="05" label="Products" variant="dark" className="mb-6" />
            <EditorialHeading size="section" variant="dark" className="max-w-none lg:max-w-[85%]">
              Technology engineered for the next generation of solar power.
            </EditorialHeading>
          </div>
          <p className="shrink-0 text-sm uppercase tracking-[0.16em] text-white/45 sm:pt-10">
            {String(tabIndex).padStart(2, "0")} / {String(c.tabs.length).padStart(2, "0")}
          </p>
        </div>

        <div className="flex gap-2 mb-10">
          {c.tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveId(tab.id as "topcon" | "monoperc")}
              className={cn(
                "rounded-full px-5 py-2.5 text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-solar-green-light",
                activeId === tab.id
                  ? "bg-white text-solar-dark"
                  : "bg-white/10 text-white/75 hover:bg-white/15 hover:text-white"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <h3 className="font-[family-name:var(--font-poppins)] text-2xl sm:text-3xl font-semibold mb-4">
              {activeTab.title}
            </h3>
            <p className="editorial-body text-white/70 mb-8 max-w-lg">{activeTab.subtitle}</p>

            <div className="grid grid-cols-2 gap-6 mb-8 editorial-divider border-t border-white/10 pt-8">
              <div>
                <p className="editorial-stat-value font-[family-name:var(--font-poppins)] font-semibold text-white">
                  {activeTab.powerRange}
                </p>
                <p className="mt-2 text-xs uppercase tracking-[0.14em] text-white/45">Power Range</p>
              </div>
              <div>
                <p className="editorial-stat-value font-[family-name:var(--font-poppins)] font-semibold text-white">
                  {activeTab.efficiency.replace("Up to ", "")}
                </p>
                <p className="mt-2 text-xs uppercase tracking-[0.14em] text-white/45">Efficiency</p>
              </div>
            </div>

            <ul className="space-y-2 mb-8">
              {activeTab.features.slice(0, 4).map((feature) => (
                <li key={feature} className="text-sm text-white/65 flex gap-2">
                  <span className="text-solar-green-light">—</span>
                  {feature}
                </li>
              ))}
            </ul>

            <ArrowLink route={route} variant="primary" className="on-dark">
              Explore Product
            </ArrowLink>
          </div>

          <div className="relative aspect-[4/5] sm:aspect-[5/6] rounded-2xl overflow-hidden bg-white/5">
            <Image
              key={activeTab.image}
              src={activeTab.image}
              alt={activeTab.title}
              fill
              className="object-contain p-6 sm:p-10"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
