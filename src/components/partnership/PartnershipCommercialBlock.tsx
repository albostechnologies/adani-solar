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
  const [dealership, distributorship, ...shared] = section.items;

  return (
    <PageSection id={section.id} tone="white" className="scroll-mt-36">
      <div className="max-w-3xl mb-12 sm:mb-16">
        <SectionEyebrow number={section.number} label={section.eyebrow} className="mb-6" />
        <EditorialHeading size="statement" className="mb-4">
          {section.title}
        </EditorialHeading>
        <p className="editorial-body text-muted-foreground max-w-xl">{section.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-0 border-y border-border/70">
        {[dealership, distributorship].map((item, index) => (
          <div
            key={item.label}
            className={cn(
              "py-8 sm:py-10",
              index === 0 ? "md:pr-10 md:border-r border-border/70" : "md:pl-10",
              index > 0 && "border-t md:border-t-0 border-border/70"
            )}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground mb-5">
              <span className="text-solar-green mr-2 tabular-nums">{item.number}</span>
              {item.label}
            </p>
            <p className="font-[family-name:var(--font-poppins)] text-3xl sm:text-4xl lg:text-[2.75rem] font-semibold tracking-tight text-foreground leading-none">
              {item.value}
            </p>
            <p className="mt-3 text-sm sm:text-base text-muted-foreground">{item.detail}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12">
        {shared.map((item) => (
          <div key={item.label} className="border-t border-border/70 pt-6">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground mb-3">
              <span className="text-solar-green mr-2 tabular-nums">{item.number}</span>
              {item.label}
            </p>
            <p className="font-[family-name:var(--font-poppins)] text-xl sm:text-2xl font-semibold text-foreground">
              {item.value}
            </p>
            <p className="mt-1.5 text-sm text-muted-foreground">{item.detail}</p>
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
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] gap-12 lg:gap-20">
        <div>
          <SectionEyebrow number={section.number} label={section.eyebrow} className="mb-6" />
          <EditorialHeading size="statement" className="mb-4 max-w-md">
            {section.title}
          </EditorialHeading>
          <p className="editorial-body text-muted-foreground mb-10 max-w-md">{section.subtitle}</p>

          <div className="space-y-0">
            {section.fees.map((fee, index) => (
              <div
                key={fee.label}
                className={cn(
                  "py-7 sm:py-8",
                  index === 0 ? "border-t border-border/70" : "",
                  "border-b border-border/70"
                )}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground mb-3">
                  {fee.label}
                </p>
                <p className="font-[family-name:var(--font-poppins)] text-4xl sm:text-5xl font-semibold tabular-nums tracking-tight text-foreground">
                  {fee.amount}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:pt-2">
          <div className="flex items-baseline justify-between gap-4 mb-6 pb-4 border-b border-border/70">
            <h3 className="font-[family-name:var(--font-poppins)] text-lg sm:text-xl font-semibold">
              {section.documentsTitle}
            </h3>
            <p className="text-xs tabular-nums text-muted-foreground shrink-0">
              {String(section.documents.length).padStart(2, "0")} items
            </p>
          </div>
          <ol className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-0">
            {section.documents.map((doc, index) => (
              <li
                key={doc}
                className="flex gap-3 py-3.5 border-b border-border/50"
              >
                <span className="text-sm tabular-nums text-solar-green font-semibold shrink-0 w-7">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-sm sm:text-[15px] text-foreground leading-snug">{doc}</span>
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
  const staffing = section.staffing;
  const showroom = section.showroom;
  const marketing = section.marketing;

  if (!staffing || !showroom || !marketing) {
    return null;
  }

  return (
    <PageSection id={section.id} tone="dark" className="scroll-mt-36">
      <div className="max-w-3xl mb-12 sm:mb-16">
        <SectionEyebrow number={section.number} label={section.eyebrow} variant="dark" className="mb-6" />
        <EditorialHeading size="section" variant="dark" className="mb-4">
          {section.title}
        </EditorialHeading>
        <p className="editorial-body text-white/60 max-w-xl">{section.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 border-t border-white/15">
        <div className="py-8 sm:py-10 lg:pr-10 border-b lg:border-b-0 lg:border-r border-white/15">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/45 mb-6">
            <span className="text-solar-green-light mr-2 tabular-nums">{staffing.number}</span>
            {staffing.label}
          </p>
          <p className="font-[family-name:var(--font-poppins)] text-lg text-white/70 mb-3">
            {staffing.highlight}
          </p>
          <p className="font-[family-name:var(--font-poppins)] text-4xl sm:text-5xl font-semibold text-white tracking-tight leading-none">
            {staffing.value}
            <span className="ml-2 text-base sm:text-lg font-medium text-solar-green-light">
              {staffing.unit}
            </span>
          </p>
          <p className="mt-4 text-sm text-white/50">{staffing.detail}</p>
        </div>

        <div className="py-8 sm:py-10 lg:px-10 border-b lg:border-b-0 lg:border-r border-white/15">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/45 mb-6">
            <span className="text-solar-green-light mr-2 tabular-nums">{showroom.number}</span>
            {showroom.label}
          </p>
          <p className="font-[family-name:var(--font-poppins)] text-3xl sm:text-4xl font-semibold text-white tracking-tight leading-snug">
            {showroom.value}
          </p>
          <p className="mt-4 text-sm text-white/50">{showroom.detail}</p>
        </div>

        <div className="py-8 sm:py-10 lg:pl-10">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/45 mb-6">
            <span className="text-solar-green-light mr-2 tabular-nums">{marketing.number}</span>
            {marketing.label}
          </p>
          <p className="font-[family-name:var(--font-poppins)] text-3xl sm:text-4xl font-semibold text-white tracking-tight leading-snug">
            {marketing.value}
          </p>
          <p className="mt-4 text-sm text-white/50 mb-6">{marketing.detail}</p>
          <ul className="flex flex-wrap gap-x-4 gap-y-2">
            {marketing.channels.map((channel) => (
              <li key={channel} className="text-xs text-white/40 tracking-wide">
                {channel}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </PageSection>
  );
}

function InvestmentSection() {
  const section = c.investment;

  return (
    <PageSection id={section.id} tone="white" className="scroll-mt-36">
      <div className="max-w-3xl mb-12 sm:mb-16">
        <SectionEyebrow number={section.number} label={section.eyebrow} className="mb-6" />
        <EditorialHeading size="statement" className="mb-4">
          {section.title}
        </EditorialHeading>
        <p className="editorial-body text-muted-foreground max-w-xl">{section.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 border-y border-border/70">
        {section.plans.map((plan, index) => (
          <div
            key={plan.type}
            className={cn(
              "py-9 sm:py-11",
              index === 0 ? "md:pr-10 md:border-r border-border/70" : "md:pl-10",
              index > 0 && "border-t md:border-t-0 border-border/70"
            )}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground mb-8">
              <span className="text-solar-green mr-2 tabular-nums">
                {String(index + 1).padStart(2, "0")}
              </span>
              {plan.type}
            </p>
            <div className="space-y-7">
              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground mb-2">
                  Investment
                </p>
                <p className="font-[family-name:var(--font-poppins)] text-3xl sm:text-4xl font-semibold tabular-nums tracking-tight">
                  {plan.investment}
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground mb-2">
                  Profit Margin
                </p>
                <p className="font-[family-name:var(--font-poppins)] text-3xl sm:text-4xl font-semibold text-solar-green tabular-nums tracking-tight">
                  {plan.margin}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 sm:mt-14 pt-10 border-t border-border/70 grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-6 lg:gap-16 items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground mb-4">
            {section.monthlyIncome.label}
          </p>
          <p className="font-[family-name:var(--font-poppins)] text-4xl sm:text-5xl lg:text-6xl font-semibold tabular-nums tracking-tight text-foreground leading-[1.05]">
            {section.monthlyIncome.range}
          </p>
        </div>
        <div className="lg:pb-1">
          <p className="text-sm text-muted-foreground mb-3">{section.monthlyIncome.note}</p>
          <p className="text-xs sm:text-sm text-muted-foreground/80 leading-relaxed max-w-lg">
            {section.disclaimer}
          </p>
        </div>
      </div>
    </PageSection>
  );
}

function PaymentSection() {
  const section = c.payment;

  return (
    <PageSection id={section.id} tone="muted" className="scroll-mt-36">
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] gap-10 lg:gap-16 items-start">
        <div>
          <SectionEyebrow number={section.number} label={section.eyebrow} className="mb-6" />
          <EditorialHeading size="statement" className="mb-4 max-w-md">
            {section.title}
          </EditorialHeading>
          <p className="editorial-body text-muted-foreground max-w-md mb-6">{section.subtitle}</p>
          <p className="text-sm text-muted-foreground max-w-md leading-relaxed border-l-2 border-solar-green/40 pl-4">
            {section.note}
          </p>
        </div>

        <div className="border border-border/70 bg-white/70 px-6 py-8 sm:px-8 sm:py-10">
          <div className="grid grid-cols-2 gap-x-6 gap-y-10">
            {section.metrics.map((metric, index) => {
              const unit = "unit" in metric ? metric.unit : undefined;
              return (
                <div
                  key={metric.label}
                  className={cn(index >= 2 && "border-t border-border/60 pt-8")}
                >
                  <p className="font-[family-name:var(--font-poppins)] text-3xl sm:text-4xl font-semibold tabular-nums tracking-tight text-foreground">
                    {metric.value}
                    {unit && (
                      <span className="text-solar-green text-xl sm:text-2xl font-semibold">
                        {unit}
                      </span>
                    )}
                  </p>
                  <p className="mt-2 text-xs uppercase tracking-[0.14em] text-muted-foreground">
                    {metric.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </PageSection>
  );
}

function PricingSection() {
  const section = c.pricing;
  return (
    <PageSection id={section.id} tone="white" className="scroll-mt-36">
      <SectionEyebrow number={section.number} label={section.eyebrow} className="mb-6" />
      <EditorialHeading size="statement" className="mb-3 max-w-2xl">
        {section.title}
      </EditorialHeading>
      <p className="editorial-body text-muted-foreground mb-8 sm:mb-10 max-w-xl">{section.subtitle}</p>

      <Tabs defaultValue="panels" className="gap-6">
        <TabsList className="h-auto w-full sm:w-auto flex flex-wrap justify-start bg-transparent p-0 gap-2">
          {[
            { value: "panels", label: "Panels" },
            { value: "systems", label: "Solar Systems" },
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
          <div className="overflow-x-auto">
            <PricingTable variant="panel" caption={section.panel.title} rows={section.panel.rows} />
          </div>
        </TabsContent>

        <TabsContent value="systems" className="mt-2 focus-visible:outline-none">
          <PricingBlockHeader title={section.systems.title} subtitle={section.systems.subtitle} />
          <div className="overflow-x-auto">
            <PricingTable
              variant="system"
              caption={section.systems.title}
              rows={section.systems.rows}
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
    <PageSection id={section.id} tone="muted" className="scroll-mt-36">
      <SectionEyebrow number={section.number} label={section.eyebrow} className="mb-6" />
      <EditorialHeading size="statement" className="mb-3 max-w-2xl">
        {section.title}
      </EditorialHeading>
      <p className="editorial-body text-muted-foreground mb-10 sm:mb-12 max-w-xl">{section.subtitle}</p>
      <div className="divide-y divide-border/70">
        {section.items.map((item) => (
          <div
            key={item.title}
            className="editorial-list-row grid grid-cols-[48px_1fr] md:grid-cols-[64px_220px_1fr] gap-3 md:gap-8 py-6 sm:py-8"
          >
            <p className="text-sm tabular-nums text-muted-foreground pt-1">{item.number}</p>
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
    <PageSection id={section.id} tone="white" className="scroll-mt-36">
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
    <PageSection id={section.id} tone="muted" className="scroll-mt-36">
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] gap-10 lg:gap-16 items-start mb-4">
        <div>
          <SectionEyebrow number={section.number} label={section.eyebrow} className="mb-6" />
          <EditorialHeading size="statement" className="mb-4 max-w-md">
            {section.title}
          </EditorialHeading>
          <p className="editorial-body text-muted-foreground max-w-md">{section.subtitle}</p>
        </div>
      </div>

      <ol className="mt-8 sm:mt-10 grid grid-cols-1 md:grid-cols-2 gap-x-10 lg:gap-x-14">
        {section.items.map((term, index) => (
          <li
            key={term}
            className="grid grid-cols-[40px_1fr] gap-3 py-5 border-t border-border/70"
          >
            <span className="text-sm tabular-nums text-solar-green font-semibold pt-0.5">
              {String(index + 1).padStart(2, "0")}
            </span>
            <p className="text-sm sm:text-[15px] text-foreground leading-relaxed">{term}</p>
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
    <PageSection id={section.id} tone="white" className="scroll-mt-36">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-10 lg:gap-14">
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
                Contact our team
              </ArrowLink>
            </div>
          </div>
        </aside>
      </div>
    </PageSection>
  );
}
