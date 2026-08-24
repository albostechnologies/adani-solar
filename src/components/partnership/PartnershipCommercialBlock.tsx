"use client";

import Image from "next/image";
import { ArrowDownRight, ArrowRight } from "lucide-react";
import { partnershipContent as c } from "@/content/partnership";
import { SectionEyebrow } from "@/components/editorial/SectionEyebrow";
import { EditorialHeading } from "@/components/editorial/EditorialHeading";
import { MetricRow } from "@/components/editorial/MetricRow";
import { ArrowLink } from "@/components/editorial/ArrowLink";
import { PageSection } from "@/components/editorial/PageSection";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from "@/lib/router";
import { cn } from "@/lib/utils";
import { PartnershipAnchorNav } from "./PartnershipAnchorNav";
import { PricingTable } from "./PricingTable";
import { PartnershipEnquiryForm } from "./PartnershipEnquiryForm";

export function PartnershipCommercialBlock() {
  return (
    <div className="partnership-commercial">
      <PartnershipIntroSection />
      <PartnershipAnchorNav />
      <RequirementsSection />
      <RegistrationSection />
      <SupportSection />
      <ProductRangeSection />
      <InvestmentSection />
      <PaymentSection />
      <PricingSection />
      <SavingsSection />
      <ComponentsSection />
      <WarrantySection />
      <TermsSection />
      <PartnershipCtaSection />
      <EnquireSection />
    </div>
  );
}

function PartnershipIntroSection() {
  const { navigate } = useRouter();
  const intro = c.intro;

  return (
    <section id={intro.id} className="editorial-section bg-[#f7f7f5] scroll-mt-28">
      <div className="editorial-section-inner">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <SectionEyebrow number={intro.number} label={intro.eyebrow} className="mb-6" />
            <EditorialHeading size="section" className="mb-5 max-w-xl">
              {intro.title}
            </EditorialHeading>
            <p className="editorial-body text-muted-foreground mb-8 max-w-lg">{intro.subtitle}</p>
            <div className="flex flex-wrap gap-3 sm:gap-4">
              <a
                href={intro.primaryHref}
                className="editorial-btn-primary group inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm sm:text-base font-medium"
              >
                {intro.primaryCta}
                <ArrowDownRight className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
              </a>
              <button
                type="button"
                onClick={() => navigate(intro.secondaryRoute)}
                className="group inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm sm:text-base font-medium text-foreground hover:bg-white transition-colors min-h-11"
              >
                {intro.secondaryCta}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>
          </div>
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-muted">
            <Image
              src={intro.image}
              alt={intro.imageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function RequirementsSection() {
  const section = c.requirements;
  return (
    <PageSection id={section.id} tone="white" className="scroll-mt-36">
      <SectionEyebrow number={section.number} label={section.eyebrow} className="mb-6" />
      <EditorialHeading size="statement" className="mb-10 sm:mb-14 max-w-2xl">
        {section.title}
      </EditorialHeading>
      <div className="divide-y divide-border/70">
        {section.items.map((item) => (
          <div
            key={item.label}
            className="editorial-list-row grid grid-cols-1 sm:grid-cols-[72px_1fr] gap-3 sm:gap-8 py-7 sm:py-9"
          >
            <p className="text-sm tabular-nums text-muted-foreground">{item.number}</p>
            <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-2 md:gap-8">
              <h3 className="font-[family-name:var(--font-poppins)] text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground pt-1">
                {item.label}
              </h3>
              <div>
                <p className="font-[family-name:var(--font-poppins)] text-2xl sm:text-3xl font-semibold text-foreground">
                  {item.value}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">{item.detail}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </PageSection>
  );
}

function RegistrationSection() {
  const section = c.registration;
  return (
    <PageSection id={section.id} tone="muted" className="scroll-mt-36">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        <div>
          <SectionEyebrow number={section.number} label={section.eyebrow} className="mb-6" />
          <EditorialHeading size="statement" className="mb-10 max-w-md">
            {section.title}
          </EditorialHeading>
          <div className="space-y-8">
            {section.fees.map((fee) => (
              <div key={fee.label} className="border-t border-border/70 pt-6">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground mb-2">
                  {fee.label}
                </p>
                <p className="editorial-stat-value font-[family-name:var(--font-poppins)] font-semibold tabular-nums text-foreground">
                  {fee.amount}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-[family-name:var(--font-poppins)] text-lg font-semibold mb-6">
            {section.documentsTitle}
          </h3>
          <ol className="divide-y divide-border/60">
            {section.documents.map((doc, index) => (
              <li key={doc} className="flex gap-4 py-4">
                <span className="text-sm tabular-nums text-solar-green font-medium shrink-0">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-sm sm:text-base text-foreground">{doc}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </PageSection>
  );
}

function SupportSection() {
  const section = c.support;
  return (
    <PageSection id={section.id} tone="dark" className="scroll-mt-36">
      <SectionEyebrow number={section.number} label={section.eyebrow} variant="dark" className="mb-6" />
      <EditorialHeading size="section" variant="dark" className="mb-12 sm:mb-16 max-w-3xl">
        {section.title}
      </EditorialHeading>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 mb-12">
        <div className="border-t border-white/15 pt-6">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/50 mb-4">
            {section.staffing.title}
          </p>
          <p className="font-[family-name:var(--font-poppins)] text-3xl sm:text-4xl font-semibold text-white mb-3">
            {section.staffing.highlight}
          </p>
          <p className="text-2xl font-semibold text-solar-green-light tabular-nums">
            {section.staffing.amount}
          </p>
          <p className="mt-2 text-sm text-white/60">{section.staffing.detail}</p>
        </div>
        <div className="border-t border-white/15 pt-6">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/50 mb-4">
            {section.showroom.title}
          </p>
          <p className="font-[family-name:var(--font-poppins)] text-3xl sm:text-4xl font-semibold text-white">
            {section.showroom.description}
          </p>
        </div>
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/50 mb-4">
          {section.marketing.title}
        </p>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8">
          {section.marketing.items.map((item) => (
            <li
              key={item}
              className="border-t border-white/10 py-4 text-sm sm:text-base text-white/80 hover:text-white transition-colors"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </PageSection>
  );
}

function ProductRangeSection() {
  const section = c.productRange;
  return (
    <PageSection id={section.id} tone="white" className="scroll-mt-36">
      <SectionEyebrow number={section.number} label={section.eyebrow} className="mb-6" />
      <EditorialHeading size="statement" className="mb-3 max-w-2xl">
        {section.title}
      </EditorialHeading>
      <p className="editorial-body text-muted-foreground mb-10 max-w-xl">{section.subtitle}</p>
      <div className="divide-y divide-border/70">
        {section.items.map((item) => (
          <div
            key={item.title}
            className="editorial-list-row grid grid-cols-[56px_1fr] sm:grid-cols-[72px_220px_1fr] gap-3 sm:gap-6 py-6 sm:py-8"
          >
            <p className="text-sm tabular-nums text-muted-foreground">{item.number}</p>
            <h3 className="font-[family-name:var(--font-poppins)] text-lg sm:text-xl font-semibold">
              {item.title}
            </h3>
            <p className="text-sm sm:text-base text-muted-foreground sm:col-start-3 col-start-2">
              {item.detail}
            </p>
          </div>
        ))}
      </div>
    </PageSection>
  );
}

function InvestmentSection() {
  const section = c.investment;
  return (
    <PageSection id={section.id} tone="muted" className="scroll-mt-36">
      <SectionEyebrow number={section.number} label={section.eyebrow} className="mb-6" />
      <EditorialHeading size="statement" className="mb-10 sm:mb-14 max-w-2xl">
        {section.title}
      </EditorialHeading>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
        {section.plans.map((plan) => (
          <div key={plan.type} className="border-t border-border/70 pt-6">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground mb-6">
              {plan.type}
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground mb-2">Investment</p>
                <p className="font-[family-name:var(--font-poppins)] text-2xl sm:text-3xl font-semibold tabular-nums">
                  {plan.investment}
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground mb-2">Profit Margin</p>
                <p className="font-[family-name:var(--font-poppins)] text-2xl sm:text-3xl font-semibold text-solar-green tabular-nums">
                  {plan.margin}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-border/70 pt-8">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground mb-3">
          {section.monthlyIncome.label}
        </p>
        <p className="font-[family-name:var(--font-poppins)] text-3xl sm:text-5xl font-semibold tabular-nums text-foreground mb-2">
          {section.monthlyIncome.range}
        </p>
        <p className="text-sm text-muted-foreground mb-4">{section.monthlyIncome.note}</p>
        <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl leading-relaxed">
          {section.disclaimer}
        </p>
      </div>
    </PageSection>
  );
}

function PaymentSection() {
  const section = c.payment;
  return (
    <PageSection id={section.id} tone="white" className="scroll-mt-36">
      <SectionEyebrow number={section.number} label={section.eyebrow} className="mb-6" />
      <EditorialHeading size="statement" className="mb-10 max-w-xl">
        {section.title}
      </EditorialHeading>
      <MetricRow items={[...section.metrics]} />
      <p className="mt-8 text-sm text-muted-foreground max-w-xl">{section.note}</p>
    </PageSection>
  );
}

function PricingSection() {
  const section = c.pricing;
  return (
    <PageSection id={section.id} tone="muted" className="scroll-mt-36">
      <SectionEyebrow number={section.number} label={section.eyebrow} className="mb-6" />
      <EditorialHeading size="statement" className="mb-8 sm:mb-10 max-w-2xl">
        {section.title}
      </EditorialHeading>

      <Tabs defaultValue="panels" className="gap-6">
        <TabsList className="h-auto w-full sm:w-auto flex flex-wrap justify-start bg-transparent p-0 gap-2">
          {[
            { value: "panels", label: "Panels" },
            { value: "systems", label: "Solar Systems" },
            { value: "turnkey", label: "Turnkey Customer Pricing" },
          ].map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className={cn(
                "rounded-full border border-border bg-white px-4 py-2.5 text-sm font-medium data-[state=active]:bg-solar-dark data-[state=active]:text-white data-[state=active]:shadow-none min-h-11"
              )}
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="panels" className="mt-2 focus-visible:outline-none">
          <PricingBlockHeader title={section.panel.title} subtitle={section.panel.subtitle} />
          <div className="rounded-2xl border border-border/60 bg-white p-4 sm:p-6">
            <PricingTable
              variant="panel"
              caption={section.panel.title}
              rows={section.panel.rows}
            />
          </div>
        </TabsContent>

        <TabsContent value="systems" className="mt-2 focus-visible:outline-none">
          <PricingBlockHeader title={section.systems.title} subtitle={section.systems.subtitle} />
          <div className="rounded-2xl border border-border/60 bg-white p-4 sm:p-6">
            <PricingTable
              variant="system"
              caption={section.systems.title}
              rows={section.systems.rows}
            />
          </div>
        </TabsContent>

        <TabsContent value="turnkey" className="mt-2 focus-visible:outline-none">
          <PricingBlockHeader title={section.turnkey.title} subtitle={section.turnkey.subtitle} />
          <div className="rounded-2xl border border-border/60 bg-[#fafaf8] p-4 sm:p-6">
            <PricingTable
              variant="turnkey"
              caption={section.turnkey.title}
              rows={section.turnkey.rows}
            />
          </div>
        </TabsContent>
      </Tabs>
    </PageSection>
  );
}

function PricingBlockHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="mb-5">
      <h3 className="font-[family-name:var(--font-poppins)] text-xl sm:text-2xl font-semibold text-foreground">
        {title}
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
    </div>
  );
}

function SavingsSection() {
  const section = c.savings;
  return (
    <PageSection id={section.id} tone="dark" className="scroll-mt-36">
      <SectionEyebrow number={section.number} label={section.eyebrow} variant="dark" className="mb-6" />
      <EditorialHeading size="section" variant="dark" className="mb-10 max-w-2xl">
        {section.title}
      </EditorialHeading>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-14" aria-label="Savings highlights">
        <div className="border-t border-white/15 pt-5">
          <p className="text-xs uppercase tracking-[0.14em] text-white/50 mb-2">Government Subsidy</p>
          <p className="font-[family-name:var(--font-poppins)] text-3xl font-semibold text-white">Available</p>
        </div>
        <div className="border-t border-white/15 pt-5 sm:border-l sm:pl-8 sm:border-white/15">
          <p className="text-xs uppercase tracking-[0.14em] text-white/50 mb-2">Scheme</p>
          <p className="font-[family-name:var(--font-poppins)] text-2xl sm:text-3xl font-semibold text-white">
            PM Surya Ghar Yojana
          </p>
        </div>
        <div className="border-t border-white/15 pt-5 sm:border-l sm:pl-8 sm:border-white/15">
          <p className="font-[family-name:var(--font-poppins)] text-4xl sm:text-5xl font-semibold text-solar-green-light tabular-nums mb-2">
            70–90%
          </p>
          <p className="text-sm text-white/55">Potential electricity bill savings</p>
        </div>
      </div>

      <h3 className="font-[family-name:var(--font-poppins)] text-lg font-semibold text-white mb-6">
        {section.generationTitle}
      </h3>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-6">
        {section.generation.map((item) => (
          <div key={item.capacity} className="border-t border-white/10 py-5">
            <p className="text-sm text-white/50 mb-1">{item.capacity}</p>
            <p className="text-base sm:text-lg font-semibold text-white">{item.output}</p>
          </div>
        ))}
      </div>
      <p className="mt-8 text-xs sm:text-sm text-white/50 max-w-2xl leading-relaxed">{section.note}</p>
    </PageSection>
  );
}

function ComponentsSection() {
  const section = c.components;
  return (
    <PageSection id={section.id} tone="white" className="scroll-mt-36">
      <SectionEyebrow number={section.number} label={section.eyebrow} className="mb-6" />
      <EditorialHeading size="statement" className="mb-10 sm:mb-14 max-w-2xl">
        {section.title}
      </EditorialHeading>
      <div className="divide-y divide-border/70">
        {section.items.map((item) => (
          <div
            key={item.title}
            className="editorial-list-row grid grid-cols-[56px_1fr] md:grid-cols-[72px_1fr_1fr] gap-3 md:gap-8 py-6 sm:py-8"
          >
            <p className="text-sm tabular-nums text-muted-foreground">{item.number}</p>
            <h3 className="font-[family-name:var(--font-poppins)] text-lg sm:text-xl font-semibold">
              {item.title}
            </h3>
            <p className="text-sm text-muted-foreground col-start-2 md:col-start-3">{item.brands}</p>
          </div>
        ))}
      </div>
    </PageSection>
  );
}

function WarrantySection() {
  const section = c.warranty;
  return (
    <PageSection id={section.id} tone="muted" className="scroll-mt-36">
      <SectionEyebrow number={section.number} label={section.eyebrow} className="mb-6" />
      <EditorialHeading size="statement" className="mb-10 sm:mb-14 max-w-2xl">
        {section.title}
      </EditorialHeading>
      <MetricRow
        items={section.items.map((item) => ({
          value: item.value,
          unit: ` ${item.unit}`,
          label: item.label,
        }))}
      />
    </PageSection>
  );
}

function TermsSection() {
  const section = c.terms;
  return (
    <PageSection id={section.id} tone="white" className="scroll-mt-36">
      <SectionEyebrow number={section.number} label={section.eyebrow} className="mb-6" />
      <EditorialHeading size="statement" className="mb-8 sm:mb-10 max-w-xl">
        {section.title}
      </EditorialHeading>
      <ol className="divide-y divide-border/70">
        {section.items.map((term, index) => (
          <li
            key={term}
            className="editorial-list-row grid grid-cols-[56px_1fr] sm:grid-cols-[72px_1fr] gap-3 sm:gap-6 py-5 sm:py-6"
          >
            <span className="text-sm tabular-nums text-solar-green font-semibold">
              {String(index + 1).padStart(2, "0")}
            </span>
            <p className="text-sm sm:text-base text-foreground leading-relaxed">{term}</p>
          </li>
        ))}
      </ol>
    </PageSection>
  );
}

function PartnershipCtaSection() {
  const { navigate } = useRouter();
  const section = c.cta;
  return (
    <PageSection id={section.id} tone="dark" className="scroll-mt-36">
      <SectionEyebrow number={section.number} label={section.eyebrow} variant="dark" className="mb-6" />
      <EditorialHeading size="section" variant="dark" className="mb-5 max-w-2xl">
        {section.title}
      </EditorialHeading>
      <p className="editorial-body text-white/70 mb-8 max-w-xl">{section.subtitle}</p>
      <div className="flex flex-wrap gap-3 sm:gap-4">
        <a
          href={section.primaryHref}
          className="editorial-btn-primary on-dark group inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm sm:text-base font-medium"
        >
          {section.primaryCta}
          <ArrowDownRight className="h-4 w-4" />
        </a>
        <button
          type="button"
          onClick={() => navigate(section.secondaryRoute)}
          className="group inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm sm:text-base font-medium text-white hover:bg-white/10 transition-colors min-h-11"
        >
          {section.secondaryCta}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>
    </PageSection>
  );
}

function EnquireSection() {
  const section = c.enquire;
  return (
    <PageSection id={section.id} tone="muted" className="scroll-mt-36">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10 lg:gap-14">
        <div>
          <SectionEyebrow number={section.number} label={section.eyebrow} className="mb-6" />
          <EditorialHeading size="statement" className="mb-3 max-w-xl">
            {section.title}
          </EditorialHeading>
          <p className="editorial-body text-muted-foreground mb-8 max-w-lg">{section.subtitle}</p>
          <PartnershipEnquiryForm />
        </div>
        <aside className="lg:pt-16">
          <div className="border-t border-border/70 pt-6 lg:sticky lg:top-36">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground mb-3">
              {section.office.title}
            </p>
            <p className="font-semibold text-foreground mb-4">{section.office.company}</p>
            <address className="not-italic text-sm text-muted-foreground leading-relaxed space-y-0.5">
              {section.office.lines.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </address>
            <p className="mt-5 text-sm">
              <span className="text-muted-foreground">Email · </span>
              <a
                href={`mailto:${section.office.email}`}
                className="font-medium text-foreground hover:text-solar-green transition-colors"
              >
                {section.office.email}
              </a>
            </p>
            <div className="mt-6">
              <ArrowLink route="contact" variant="secondary">
                Full partnership application
              </ArrowLink>
            </div>
          </div>
        </aside>
      </div>
    </PageSection>
  );
}
