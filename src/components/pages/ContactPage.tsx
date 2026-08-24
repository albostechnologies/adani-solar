"use client";

import Image from "next/image";
import { siteConfig } from "@/config/site";
import { partnershipContent } from "@/content/partnership";
import { PartnershipApplicationForm } from "@/components/sections/PartnershipApplicationForm";

export function ContactPage() {
  const office = partnershipContent.enquire.office;

  return (
    <main className="pt-24 sm:pt-28 pb-16 sm:pb-20 bg-[#f7f7f5] min-h-screen">
      <div className="editorial-section-inner py-8 sm:py-12">
        <div className="max-w-5xl mx-auto">
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

          <div className="mb-8 sm:mb-10 text-center max-w-2xl mx-auto">
            <h1 className="font-[family-name:var(--font-poppins)] text-2xl sm:text-3xl font-semibold text-foreground mb-2">
              Partnership Application
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Apply for dealership, distributorship or related solar business opportunities with
              Adani Solar.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8 lg:gap-10 items-start">
            <div className="rounded-2xl border border-border/60 bg-white p-6 sm:p-8 shadow-sm">
              <PartnershipApplicationForm />
            </div>

            <aside className="rounded-2xl border border-border/60 bg-white p-6 sm:p-7 shadow-sm lg:sticky lg:top-28">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground mb-3">
                {office.title}
              </p>
              <p className="font-semibold text-foreground mb-4">{office.company}</p>
              <address className="not-italic text-sm text-muted-foreground leading-relaxed space-y-0.5">
                {office.lines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </address>
              <p className="mt-5 text-sm">
                <span className="text-muted-foreground">Email · </span>
                <a
                  href={`mailto:${office.email}`}
                  className="font-medium text-foreground hover:text-solar-green transition-colors"
                >
                  {office.email}
                </a>
              </p>
            </aside>
          </div>
        </div>
      </div>
    </main>
  );
}
