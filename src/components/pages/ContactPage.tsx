"use client";

import Image from "next/image";
import { siteConfig } from "@/config/site";
import { PartnershipApplicationForm } from "@/components/sections/PartnershipApplicationForm";

export function ContactPage() {
  return (
    <main className="pt-24 sm:pt-28 pb-16 sm:pb-20 bg-[#f7f7f5] min-h-screen">
      <div className="editorial-section-inner py-8 sm:py-12">
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-center mb-8 sm:mb-10">
            <Image
              src={siteConfig.brand.logo}
              alt={siteConfig.brand.logoAlt}
              width={220}
              height={44}
              className="h-10 sm:h-11 w-auto"
              priority
            />
          </div>

          <div className="mb-8 text-center">
            <h1 className="font-[family-name:var(--font-poppins)] text-2xl sm:text-3xl font-semibold text-foreground mb-2">
              Partnership Application
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Apply for dealership or distributorship with Adani Solar.
            </p>
          </div>

          <div className="rounded-2xl border border-border/60 bg-white p-6 sm:p-8 shadow-sm">
            <PartnershipApplicationForm />
          </div>
        </div>
      </div>
    </main>
  );
}
