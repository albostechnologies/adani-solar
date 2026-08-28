"use client";

import { HomeHeroSection } from "@/components/home/HomeHeroSection";
import { ImpactSection } from "@/components/home/ImpactSection";
import { TrustStripSection } from "@/components/home/TrustStripSection";
import { EditorialAboutSection } from "@/components/home/EditorialAboutSection";
import { AncillaryListSection } from "@/components/home/AncillaryListSection";
import { ProductShowcaseSection } from "@/components/home/ProductShowcaseSection";
import { PartnershipCommercialBlock } from "@/components/partnership/PartnershipCommercialBlock";
import { SustainabilityEditorialSection } from "@/components/home/SustainabilityEditorialSection";
import { TechnicalResourcesSection } from "@/components/home/TechnicalResourcesSection";
import { FinalCTASection } from "@/components/home/FinalCTASection";

export function HomePage() {
  return (
    <main>
      <HomeHeroSection />
      <ImpactSection />
      <TrustStripSection />
      <EditorialAboutSection />
      <AncillaryListSection />
      <ProductShowcaseSection />
      <PartnershipCommercialBlock />
      <SustainabilityEditorialSection />
      <TechnicalResourcesSection />
      <FinalCTASection />
    </main>
  );
}
