"use client";

import { whySolarContent } from "@/content/why-solar";
import { PageHero } from "@/components/editorial/PageHero";
import { PageSection } from "@/components/editorial/PageSection";
import { FeatureList } from "@/components/editorial/FeatureList";
import { MetricRow } from "@/components/editorial/MetricRow";
import { FinalCTA } from "@/components/editorial/FinalCTA";
import { SectionEyebrow } from "@/components/editorial/SectionEyebrow";
import { EditorialHeading } from "@/components/editorial/EditorialHeading";
import { RevealImage } from "@/components/editorial/RevealImage";
import { SolarROICalculator } from "@/components/sections/SolarROICalculator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function WhySolarPage() {
  const c = whySolarContent;

  return (
    <main>
      <PageHero
        eyebrow="Why Solar"
        title="Energy that moves the world forward."
        subtitle={c.hero.subtitle}
        backgroundImage={c.hero.backgroundImage}
        breadcrumbs={[{ label: "Home", route: "home" }, { label: "Why Solar" }]}
      />

      <PageSection tone="muted">
        <SectionEyebrow number="02" label="Overview" className="mb-6" />
        <EditorialHeading size="statement" className="mb-4 max-w-3xl">
          {c.intro.title}
        </EditorialHeading>
        <p className="editorial-body text-muted-foreground max-w-3xl">{c.intro.description}</p>
      </PageSection>

      <PageSection>
        <SectionEyebrow number="03" label="Benefits" className="mb-6" />
        <EditorialHeading size="statement" className="mb-8 sm:mb-10">
          Why solar matters now.
        </EditorialHeading>
        <FeatureList items={c.benefits} />
      </PageSection>

      <PageSection tone="dark">
        <SectionEyebrow number="04" label="India Opportunity" variant="dark" className="mb-6" />
        <EditorialHeading size="statement" variant="dark" className="mb-8">
          {c.indiaStats.title}
        </EditorialHeading>
        <MetricRow
          variant="dark"
          items={c.indiaStats.stats.map((s) => ({
            value: s.value,
            unit: s.unit,
            label: s.label,
          }))}
        />
      </PageSection>

      <PageSection tone="muted">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <RevealImage src="/assets/why-solar/carbon-reduction.webp" alt="Environmental impact of solar energy" aspectClass="aspect-[4/3]" />
          <div>
            <SectionEyebrow number="05" label="Environment" className="mb-6" />
            <EditorialHeading size="statement" className="mb-4">
              {c.benefits[0]?.title ?? "Clean & Renewable"}
            </EditorialHeading>
            <p className="editorial-body text-muted-foreground">{c.benefits[0]?.description}</p>
          </div>
        </div>
      </PageSection>

      <PageSection>
        <SectionEyebrow number="06" label="Savings Calculator" className="mb-6" />
        <EditorialHeading size="statement" className="mb-8 max-w-2xl">
          Estimate your solar savings.
        </EditorialHeading>
        <SolarROICalculator />
      </PageSection>

      {c.faqs.items.length > 0 && (
        <PageSection tone="muted">
          <SectionEyebrow number="FAQ" label="Questions" className="mb-6" />
          <EditorialHeading size="statement" className="mb-8">
            {c.faqs.title}
          </EditorialHeading>
          <Accordion type="single" collapsible className="divide-y divide-border/70">
            {c.faqs.items.slice(0, 6).map((item, index) => (
              <AccordionItem key={item.question} value={`faq-${index}`} className="border-0">
                <AccordionTrigger className="py-5 text-left font-[family-name:var(--font-poppins)] text-base sm:text-lg font-semibold hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="editorial-body text-muted-foreground pb-5">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </PageSection>
      )}

      <FinalCTA
        eyebrow="Products"
        title="Ready to explore high-performance Adani Solar modules?"
        cta="Explore Products"
        route="product-topcon"
      />
    </main>
  );
}
