import { SectionEyebrow } from "@/components/editorial/SectionEyebrow";
import { EditorialHeading } from "@/components/editorial/EditorialHeading";
import { ArrowLink } from "@/components/editorial/ArrowLink";
import type { RouteName } from "@/lib/routes";

interface FinalCTAProps {
  eyebrow?: string;
  title: string;
  cta: string;
  route: RouteName;
  variant?: "dark" | "light";
}

export function FinalCTA({
  eyebrow = "Next Step",
  title,
  cta,
  route,
  variant = "dark",
}: FinalCTAProps) {
  const isDark = variant === "dark";

  return (
    <section className={`editorial-section ${isDark ? "bg-solar-dark text-white" : "bg-[#f7f7f5]"}`}>
      <div className="editorial-section-inner">
        <SectionEyebrow number="" label={eyebrow} variant={isDark ? "dark" : "light"} className="mb-6" />
        <EditorialHeading size="section" variant={isDark ? "dark" : "light"} className="max-w-3xl mb-8">
          {title}
        </EditorialHeading>
        <ArrowLink route={route} variant="primary" className={isDark ? "on-dark" : undefined}>
          {cta}
        </ArrowLink>
      </div>
    </section>
  );
}
