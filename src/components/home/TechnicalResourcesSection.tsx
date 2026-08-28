import { resourcesContent } from "@/content/resources";
import { SectionEyebrow } from "@/components/editorial/SectionEyebrow";
import { EditorialHeading } from "@/components/editorial/EditorialHeading";
import { ArrowLink } from "@/components/editorial/ArrowLink";

export function TechnicalResourcesSection() {
  const count = resourcesContent.resources.length;

  return (
    <section className="editorial-section bg-white">
      <div className="editorial-section-inner">
        <SectionEyebrow number="17" label="Technical Resources" className="mb-6" />
        <EditorialHeading size="statement" className="max-w-3xl mb-4">
          Documentation for engineers and partners.
        </EditorialHeading>
        <p className="editorial-body text-muted-foreground max-w-xl mb-8">
          Datasheets, brochures and installation guides — {count}+ resources in the Resource Center.
        </p>
        <ArrowLink route="resources">Browse all resources</ArrowLink>
      </div>
    </section>
  );
}
