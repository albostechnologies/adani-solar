"use client";

import { homeContent } from "@/content/home";
import { manufacturingContent } from "@/content/manufacturing";
import { PageHero } from "@/components/editorial/PageHero";
import { PageSection } from "@/components/editorial/PageSection";
import { EditorialSplit } from "@/components/editorial/EditorialSplit";
import { SectionEyebrow } from "@/components/editorial/SectionEyebrow";
import { EditorialHeading } from "@/components/editorial/EditorialHeading";
import { FinalCTA } from "@/components/editorial/FinalCTA";
import { ArrowLink } from "@/components/editorial/ArrowLink";
import { FacilityVideoSection } from "@/components/sections/FacilityVideoSection";

export function WhatWeDoPage() {
  const steps = homeContent.valueChain.steps;
  const overview = manufacturingContent.overview;

  return (
    <main>
      <PageHero
        eyebrow="What We Do"
        title="From raw materials to solar modules."
        subtitle="Vertically integrated PV manufacturing across polysilicon, ingots, wafers, cells and modules at our Mundra campus."
        backgroundImage={manufacturingContent.hero.backgroundImage}
        breadcrumbs={[
          { label: "Home", route: "home" },
          { label: "About", route: "about" },
          { label: "What We Do" },
        ]}
      />

      <PageSection tone="muted">
        <SectionEyebrow number="02" label="Overview" className="mb-6" />
        <EditorialHeading size="statement" className="mb-4 max-w-3xl">
          {overview.title}
        </EditorialHeading>
        <p className="editorial-body text-muted-foreground max-w-3xl">{overview.subtitle}</p>
      </PageSection>

      {steps.map((step, index) => (
        <PageSection key={step.id} tone={index % 2 === 0 ? "white" : "muted"}>
          <EditorialSplit
            eyebrow={`Step ${String(index + 1).padStart(2, "0")}`}
            eyebrowNumber={String(index + 1).padStart(2, "0")}
            title={step.title}
            image={step.image}
            imageAlt={step.title}
            reverse={index % 2 === 1}
          >
            <p>{step.description}</p>
          </EditorialSplit>
        </PageSection>
      ))}

      <FacilityVideoSection
        title={manufacturingContent.facilityVideo.title}
        subtitle={manufacturingContent.facilityVideo.subtitle}
        poster={manufacturingContent.facilityVideo.poster}
        youtubeUrl={manufacturingContent.facilityVideo.youtubeUrl}
      />

      <PageSection tone="muted">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <div>
            <SectionEyebrow number="07" label="Manufacturing" className="mb-6" />
            <EditorialHeading size="statement" className="max-w-2xl">
              Explore the full manufacturing process in detail.
            </EditorialHeading>
          </div>
          <ArrowLink route="manufacturing">View Manufacturing Process</ArrowLink>
        </div>
      </PageSection>

      <FinalCTA
        eyebrow="Products"
        title="See how our integrated manufacturing powers TOPCon and MonoPERC modules."
        cta="Explore TOPCon Modules"
        route="product-topcon"
      />
    </main>
  );
}
