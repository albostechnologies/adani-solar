"use client";

import React from "react";
import { contactContent } from "@/content/contact";
import { HeroSection } from "@/components/sections/HeroSection";
import { ContactFormSection } from "@/components/sections/ContactFormSection";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SectionHeading } from "@/components/sections/SectionHeading";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Globe,
  Compass,
  Clock3,
  ShieldCheck,
  Linkedin,
  Twitter,
  Youtube,
  Facebook,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  MapPin,
  Phone,
  Mail,
  Clock,
};

const socialIconMap: Record<string, LucideIcon> = {
  Linkedin: Linkedin,
  Twitter: Twitter,
  Youtube: Youtube,
  Facebook: Facebook,
};

const socialBrandColor: Record<string, string> = {
  Linkedin: "hover:bg-[#0A66C2] hover:border-[#0A66C2]",
  Twitter: "hover:bg-[#1D9BF0] hover:border-[#1D9BF0]",
  Youtube: "hover:bg-[#FF0000] hover:border-[#FF0000]",
  Facebook: "hover:bg-[#1877F2] hover:border-[#1877F2]",
};

export function ContactPage() {
  const c = contactContent;

  return (
    <main>
      {/* Hero */}
      <HeroSection
        variant="dark"
        title={c.hero.title}
        subtitle={c.hero.subtitle}
        backgroundImage={c.hero.backgroundImage}
        fullViewport={false}
      />

      {/* Contact Form */}
      <ContactFormSection
        title={c.form.title}
        subtitle={c.form.subtitle}
        subjectOptions={c.form.fields.subject.options}
        submitLabel={c.form.submitLabel}
        successMessage={c.form.successMessage}
        errorMessage={c.form.errorMessage}
        variant="light"
      />

      {/* Response time commitment banner */}
      <ScrollReveal>
        <section className="py-10 sm:py-12 bg-solar-green/5 border-y border-solar-green/15">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 justify-center text-center sm:text-left">
            <div className="w-14 h-14 rounded-full bg-solar-green/15 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-7 h-7 text-solar-green" />
            </div>
            <div>
              <p className="font-[family-name:var(--font-poppins)] text-lg sm:text-xl font-bold text-foreground">
                {c.visitUs.responseCommitment}
              </p>
              <p className="text-sm text-muted-foreground mt-1 max-w-xl">
                {c.visitUs.responseDetail}
              </p>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Contact Info */}
      <ScrollReveal>
        <section className="py-16 sm:py-20 lg:py-24 bg-solar-dark relative grain-overlay">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <h2 className="font-[family-name:var(--font-poppins)] text-2xl sm:text-3xl font-bold text-white mb-8 text-center">
              {c.contactInfo.title}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {c.contactInfo.items.map((item) => {
                const Icon = iconMap[item.icon] || MapPin;
                const isEmail = item.icon === "Mail";
                const isPhone = item.icon === "Phone";
                const href = isEmail
                  ? `mailto:${item.value}`
                  : isPhone
                    ? `tel:${item.value.replace(/\s/g, "")}`
                    : undefined;

                const content = (
                  <div
                    key={item.label}
                    className="rounded-xl p-5 bg-white/5 border border-white/10 text-center hover:border-solar-green/30 hover:-translate-y-1 transition-all duration-300 group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-solar-green/20 flex items-center justify-center mx-auto mb-3 group-hover:bg-solar-green/30 transition-colors">
                      <Icon className="w-5 h-5 text-solar-green-light" />
                    </div>
                    <p className="text-sm font-semibold text-white mb-1">
                      {item.label}
                    </p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      {item.value}
                    </p>
                  </div>
                );

                if (href) {
                  return (
                    <a key={item.label} href={href} className="no-underline">
                      {content}
                    </a>
                  );
                }
                return <div key={item.label}>{content}</div>;
              })}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Visit Us / Map + Office Hours */}
      <ScrollReveal>
        <section className="py-16 sm:py-20 lg:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              title={c.visitUs.title}
              subtitle={c.visitUs.subtitle}
              variant="light"
            />

            <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Map placeholder */}
              <div className="lg:col-span-2 rounded-2xl overflow-hidden border border-border shadow-sm bg-gradient-to-br from-solar-green/10 via-emerald-50 to-solar-dark-secondary/30 aspect-[16/10] relative">
                {/* Stylised map background , abstract grid + region */}
                <div className="absolute inset-0 opacity-50">
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage:
                        "linear-gradient(rgba(15,23,42,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.07) 1px, transparent 1px)",
                      backgroundSize: "32px 32px",
                    }}
                  />
                </div>

                {/* Compass / coordinates chip */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg border border-border px-3 py-2 flex items-center gap-2 text-xs text-muted-foreground shadow-sm">
                  <Compass className="w-3.5 h-3.5 text-solar-green" />
                  <span>{c.visitUs.coordinatesLabel}</span>
                </div>

                {/* Map pin */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                  <div className="relative">
                    {/* Pulsing ring */}
                    <span className="absolute inset-0 rounded-full bg-solar-green/30 animate-ping" />
                    <div className="relative w-12 h-12 rounded-full bg-solar-green text-white flex items-center justify-center shadow-lg">
                      <MapPin className="w-6 h-6" />
                    </div>
                  </div>
                  <div className="mt-3 bg-white/90 backdrop-blur-sm rounded-lg border border-border px-3 py-1.5 shadow-sm">
                    <p className="text-xs font-semibold text-foreground">
                      Mundra SEZ, Gujarat
                    </p>
                  </div>
                </div>

                {/* Legend */}
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg border border-border px-3 py-2 text-xs text-muted-foreground shadow-sm flex items-center gap-2">
                  <Globe className="w-3.5 h-3.5 text-solar-green" />
                  <span>Arabian Sea coast · Gulf of Kutch</span>
                </div>
              </div>

              {/* Office hours + address */}
              <div className="flex flex-col gap-4">
                <div className="rounded-2xl border border-border bg-solar-green/5 p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Clock3 className="w-4 h-4 text-solar-green" />
                    <h3 className="font-[family-name:var(--font-poppins)] text-sm font-semibold text-foreground">
                      Office Hours
                    </h3>
                  </div>
                  <ul className="space-y-2">
                    {c.visitUs.hours.map((h) => (
                      <li
                        key={h.day}
                        className="flex items-center justify-between text-xs"
                      >
                        <span className="text-muted-foreground">{h.day}</span>
                        <span className="font-medium text-foreground">
                          {h.time}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-2xl border border-border p-5 flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <MapPin className="w-4 h-4 text-solar-green" />
                    <h3 className="font-[family-name:var(--font-poppins)] text-sm font-semibold text-foreground">
                      Manufacturing Address
                    </h3>
                  </div>
                  <address className="text-xs text-muted-foreground leading-relaxed not-italic">
                    {c.visitUs.addressLines.map((line) => (
                      <p key={line}>{line}</p>
                    ))}
                  </address>
                </div>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Social connect */}
      <ScrollReveal>
        <section className="py-12 sm:py-16 bg-solar-dark relative grain-overlay">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h2 className="font-[family-name:var(--font-poppins)] text-2xl sm:text-3xl font-bold text-white mb-2">
              {c.socialConnect.title}
            </h2>
            <p className="text-sm text-white/70 mb-6 max-w-xl mx-auto">
              {c.socialConnect.subtitle}
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {c.socialConnect.links.map((link) => {
                const Icon = socialIconMap[link.icon] || Globe;
                return (
                  <a
                    key={link.label}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/15 text-white text-xs font-medium transition-colors duration-300 ${socialBrandColor[link.icon] || "hover:bg-white/20"}`}
                  >
                    <Icon className="w-4 h-4" />
                    {link.label}
                  </a>
                );
              })}
            </div>
          </div>
        </section>
      </ScrollReveal>
    </main>
  );
}
