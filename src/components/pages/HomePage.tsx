"use client";

import { HomeHeroSection } from "@/components/home/HomeHeroSection";
import { ImpactSection } from "@/components/home/ImpactSection";
import { TrustStripSection } from "@/components/home/TrustStripSection";
import { EditorialAboutSection } from "@/components/home/EditorialAboutSection";
import { ManufacturingProcessSection } from "@/components/home/ManufacturingProcessSection";
import { AncillaryListSection } from "@/components/home/AncillaryListSection";
import { ProductShowcaseSection } from "@/components/home/ProductShowcaseSection";
import { WhyAdaniSection } from "@/components/home/WhyAdaniSection";
import { GlobalPresenceSection } from "@/components/home/GlobalPresenceSection";
import { PartnershipCommercialBlock } from "@/components/partnership/PartnershipCommercialBlock";
import { SustainabilityEditorialSection } from "@/components/home/SustainabilityEditorialSection";
import { TechnicalResourcesSection } from "@/components/home/TechnicalResourcesSection";
import { HomeFAQSection } from "@/components/home/HomeFAQSection";
import { FinalCTASection } from "@/components/home/FinalCTASection";

export function HomePage() {
  return (
    <main>
      <HomeHeroSection />
      <ImpactSection />
      <TrustStripSection />
      <EditorialAboutSection />
      <ManufacturingProcessSection />
      <AncillaryListSection />
      <ProductShowcaseSection />
      <WhyAdaniSection />
      <GlobalPresenceSection />
      <PartnershipCommercialBlock />
      <SustainabilityEditorialSection />
      <TechnicalResourcesSection />
      <HomeFAQSection />
      <FinalCTASection />
    </main>
  );
}
