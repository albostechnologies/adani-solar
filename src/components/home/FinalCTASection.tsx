import { SectionEyebrow } from "@/components/editorial/SectionEyebrow";
import { EditorialHeading } from "@/components/editorial/EditorialHeading";
import { ArrowLink } from "@/components/editorial/ArrowLink";

export function FinalCTASection() {
  return (
    <section className="editorial-section bg-solar-dark text-white">
      <div className="editorial-section-inner">
        <SectionEyebrow number="21" label="Contact" variant="dark" className="mb-6" />
        <EditorialHeading size="section" variant="dark" className="max-w-3xl mb-8">
          Let&apos;s power a sustainable future.
        </EditorialHeading>
        <ArrowLink route="contact" variant="primary" className="on-dark">
          Talk to our experts
        </ArrowLink>
      </div>
    </section>
  );
}
