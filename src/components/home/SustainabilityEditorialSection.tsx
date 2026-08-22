"use client";

import Image from "next/image";
import { homeContent } from "@/content/home";
import { SectionEyebrow } from "@/components/editorial/SectionEyebrow";
import { EditorialHeading } from "@/components/editorial/EditorialHeading";
import { ArrowLink } from "@/components/editorial/ArrowLink";

export function SustainabilityEditorialSection() {
  const c = homeContent.sustainability;
  const featured = c.businesses[0];

  return (
    <section className="relative editorial-section min-h-[70vh] flex items-end overflow-hidden">
      <Image
        src={featured.image}
        alt=""
        fill
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-solar-dark via-solar-dark/55 to-solar-dark/20" />

      <div className="editorial-section-inner relative z-10 pb-4">
        <SectionEyebrow number="08" label="Sustainability" variant="dark" className="mb-6" />
        <EditorialHeading size="section" variant="dark" className="max-w-3xl mb-5">
          Powering progress without compromising the future.
        </EditorialHeading>
        <p className="editorial-body text-white/70 max-w-2xl mb-8">
          {c.subtitle} Wider Adani Group businesses shown reflect the broader clean energy ecosystem.
        </p>
        <ArrowLink route="sustainability" variant="primary" className="on-dark">
          Explore Sustainability
        </ArrowLink>
      </div>
    </section>
  );
}
