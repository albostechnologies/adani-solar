"use client";

import { aboutContent } from "@/content/about";
import { PageHero } from "@/components/editorial/PageHero";
import { PageSection } from "@/components/editorial/PageSection";
import { EditorialSplit } from "@/components/editorial/EditorialSplit";
import { MetricRow } from "@/components/editorial/MetricRow";
import { Timeline } from "@/components/editorial/Timeline";
import { FeatureList } from "@/components/editorial/FeatureList";
import { FinalCTA } from "@/components/editorial/FinalCTA";
import { SectionEyebrow } from "@/components/editorial/SectionEyebrow";
import { EditorialHeading } from "@/components/editorial/EditorialHeading";
import { RevealImage } from "@/components/editorial/RevealImage";
import Image from "next/image";

export function AboutPage() {
  const c = aboutContent;

  return (
    <main>
      <PageHero
        eyebrow="About Adani Solar"
        title="Building India's integrated solar manufacturing ecosystem."
        subtitle={c.hero.subtitle}
        backgroundImage={c.hero.backgroundImage}
        breadcrumbs={[{ label: "Home", route: "home" }, { label: "About" }]}
      />

      <PageSection tone="muted">
        <EditorialSplit
          eyebrow="Company"
          eyebrowNumber="02"
          title={c.aboutSection.title}
          image={c.aboutSection.image}
          imageAlt={c.aboutSection.title}
        >
          {c.aboutSection.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 40)}>{paragraph}</p>
          ))}
        </EditorialSplit>
      </PageSection>

      <PageSection>
        <SectionEyebrow number="03" label="Impact" className="mb-6" />
        <EditorialHeading size="statement" className="mb-10 sm:mb-12">
          Manufacturing solar at global scale.
        </EditorialHeading>
        <MetricRow
          items={c.stats.items.map((item) => ({
            value: item.value,
            unit: item.unit,
            label: item.label,
          }))}
        />
      </PageSection>

      <PageSection tone="muted">
        <SectionEyebrow number="04" label={c.milestones.sectionTitle} className="mb-6" />
        <EditorialHeading size="statement" className="mb-8 sm:mb-10">
          {c.milestones.title}
        </EditorialHeading>
        <Timeline items={c.milestones.items} />
      </PageSection>

      <PageSection tone="dark">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <SectionEyebrow number="05" label={c.sustainability.sectionTitle} variant="dark" className="mb-6" />
            <EditorialHeading size="statement" variant="dark" className="mb-5">
              {c.sustainability.title}
            </EditorialHeading>
            <p className="editorial-body text-white/70 mb-6">{c.sustainability.description}</p>
            <ul className="space-y-3">
              {c.sustainability.highlights.map((highlight) => (
                <li key={highlight} className="text-sm text-white/75 flex gap-3">
                  <span className="text-solar-green-light">—</span>
                  {highlight}
                </li>
              ))}
            </ul>
          </div>
          <RevealImage
            src={c.sustainability.image}
            alt={c.sustainability.title}
            aspectClass="aspect-[4/3]"
          />
        </div>
      </PageSection>

      <PageSection>
        <SectionEyebrow number="06" label={c.vision.sectionTitle} className="mb-6" />
        <EditorialHeading size="statement" className="mb-4 max-w-3xl">
          {c.vision.title}
        </EditorialHeading>
        <p className="editorial-body text-muted-foreground max-w-3xl mb-10">{c.vision.description}</p>
        <FeatureList items={c.vision.pillars} />
      </PageSection>

      <PageSection tone="muted">
        <SectionEyebrow number="07" label={c.mdMessage.sectionTitle} className="mb-6" />
        <EditorialHeading size="statement" className="mb-8">
          {c.mdMessage.title}
        </EditorialHeading>
        <div className="grid grid-cols-1 lg:grid-cols-[160px_1fr] gap-8 items-start">
          <div className="relative w-32 h-32 lg:w-40 lg:h-40 rounded-full overflow-hidden bg-muted shrink-0">
            <Image src={c.mdMessage.image} alt={c.mdMessage.name} fill className="object-cover" sizes="160px" />
          </div>
          <div>
            <div className="editorial-body text-muted-foreground whitespace-pre-line space-y-4">
              {c.mdMessage.message.split("\n\n").map((para) => (
                <p key={para.slice(0, 30)}>{para}</p>
              ))}
            </div>
            <p className="mt-6 font-[family-name:var(--font-poppins)] font-semibold text-foreground">
              {c.mdMessage.name}
            </p>
            <p className="text-sm text-muted-foreground">{c.mdMessage.designation}</p>
          </div>
        </div>
      </PageSection>

      <FinalCTA
        eyebrow="Explore"
        title="Discover our products and manufacturing capabilities."
        cta="Explore Products"
        route="product-topcon"
      />
    </main>
  );
}
