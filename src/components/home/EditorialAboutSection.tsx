"use client";

import { homeContent } from "@/content/home";
import { SectionEyebrow } from "@/components/editorial/SectionEyebrow";
import { EditorialHeading } from "@/components/editorial/EditorialHeading";
import { RevealImage } from "@/components/editorial/RevealImage";
import { ArrowLink } from "@/components/editorial/ArrowLink";

export function EditorialAboutSection() {
  const c = homeContent.about;

  return (
    <section className="editorial-section bg-[#f7f7f5]">
      <div className="editorial-section-inner">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <RevealImage src={c.image} alt={c.title} aspectClass="aspect-[4/3] lg:aspect-[5/6]" />

          <div className="lg:pl-4 xl:pl-10">
            <SectionEyebrow number="03" label={c.sectionTitle} className="mb-6" />
            <EditorialHeading size="section" className="mb-6">
              Building the backbone of India&apos;s solar future.
            </EditorialHeading>
            <p className="editorial-body text-muted-foreground mb-4">{c.description}</p>
            <p className="editorial-body text-foreground/80 mb-8">{c.highlight}</p>
            <ArrowLink route={c.ctaRoute}>Discover Adani Solar</ArrowLink>
          </div>
        </div>
      </div>
    </section>
  );
}
