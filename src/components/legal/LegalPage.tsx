"use client";

import { legalContent } from "@/content/legal";
import { PageHero } from "@/components/editorial/PageHero";
import { PageSection } from "@/components/editorial/PageSection";

interface LegalPageProps {
  title: string;
  lastUpdated: string;
  sections: Array<{ number: number; title: string; content: string }>;
}

export function LegalPage({ title, lastUpdated, sections }: LegalPageProps) {
  return (
    <main>
      <PageHero
        variant="legal"
        eyebrow="Legal"
        title={title}
        subtitle={`Last updated: ${lastUpdated}`}
        breadcrumbs={[{ label: "Home", route: "home" }, { label: title }]}
      />

      <PageSection>
        <div className="max-w-[820px] mx-auto space-y-10">
          {sections.map((section) => (
            <article key={section.number} id={`section-${section.number}`}>
              <h2 className="font-[family-name:var(--font-poppins)] text-xl sm:text-2xl font-semibold text-foreground mb-4">
                {section.number}. {section.title}
              </h2>
              <div className="editorial-body text-muted-foreground whitespace-pre-line">
                {section.content}
              </div>
            </article>
          ))}
        </div>
      </PageSection>
    </main>
  );
}

export function PrivacyPage() {
  return (
    <LegalPage
      title={legalContent.privacy.title}
      lastUpdated={legalContent.privacy.lastUpdated}
      sections={legalContent.privacy.sections}
    />
  );
}

export function TermsPage() {
  return (
    <LegalPage
      title={legalContent.terms.title}
      lastUpdated={legalContent.terms.lastUpdated}
      sections={legalContent.terms.sections}
    />
  );
}
