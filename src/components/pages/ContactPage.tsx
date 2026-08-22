"use client";

import { contactContent } from "@/content/contact";
import { siteConfig } from "@/config/site";
import { PageHero } from "@/components/editorial/PageHero";
import { PageSection } from "@/components/editorial/PageSection";
import { ContactFormSection } from "@/components/sections/ContactFormSection";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const iconMap = { MapPin, Phone, Mail, Clock };

export function ContactPage() {
  const c = contactContent;

  return (
    <main>
      <PageHero
        eyebrow="Contact"
        title="Let's build a brighter energy future."
        subtitle="For product enquiries, partnerships, technical support and more."
        backgroundImage={c.hero.backgroundImage}
        breadcrumbs={[{ label: "Home", route: "home" }, { label: "Contact" }]}
      />

      <PageSection tone="muted">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {c.contactInfo.items.map((item) => {
            const Icon = iconMap[item.icon as keyof typeof iconMap] ?? MapPin;
            const isEmail = item.icon === "Mail";
            const isPhone = item.icon === "Phone";
            return (
              <div key={item.label}>
                <Icon className="w-5 h-5 text-solar-green mb-3" />
                <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground mb-2">{item.label}</p>
                {isEmail ? (
                  <a href={`mailto:${item.value}`} className="text-sm text-foreground hover:text-solar-green">{item.value}</a>
                ) : isPhone ? (
                  <a href={`tel:${siteConfig.contact.phone}`} className="text-sm text-foreground hover:text-solar-green">{item.value}</a>
                ) : (
                  <p className="text-sm text-foreground">{item.value}</p>
                )}
              </div>
            );
          })}
        </div>
      </PageSection>

      <ContactFormSection
        title={c.form.title}
        subtitle={c.form.subtitle}
        subjectOptions={c.form.fields.subject.options}
        submitLabel={c.form.submitLabel}
        successMessage={c.form.successMessage}
        errorMessage={c.form.errorMessage}
        variant="light"
      />
    </main>
  );
}
