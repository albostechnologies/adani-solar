import { homeContent } from "@/content/home";
import { SectionEyebrow } from "@/components/editorial/SectionEyebrow";

export function TrustStripSection() {
  const c = homeContent.trustBadges;

  return (
    <section className="py-10 sm:py-12 bg-white editorial-divider border-y">
      <div className="editorial-section-inner">
        <SectionEyebrow number="02B" label="Certifications" className="mb-6" />
        <p className="font-[family-name:var(--font-poppins)] text-lg sm:text-xl font-semibold text-foreground mb-6 max-w-2xl">
          {c.title}
        </p>
        <ul className="flex flex-wrap gap-x-6 gap-y-3">
          {c.badges.map((badge) => (
            <li
              key={badge.name}
              className="text-sm text-muted-foreground"
            >
              <span className="font-medium text-foreground">{badge.name}</span>
              <span className="mx-2 text-border">·</span>
              {badge.description}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
