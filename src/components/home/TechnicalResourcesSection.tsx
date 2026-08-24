import { resourcesContent } from "@/content/resources";
import { SectionEyebrow } from "@/components/editorial/SectionEyebrow";
import { EditorialHeading } from "@/components/editorial/EditorialHeading";
import { ArrowLink } from "@/components/editorial/ArrowLink";

const featuredResources = resourcesContent.resources
  .filter((r) => r.featured)
  .slice(0, 5);

export function TechnicalResourcesSection() {
  return (
    <section className="editorial-section bg-white">
      <div className="editorial-section-inner">
        <SectionEyebrow number="22" label="Technical Resources" className="mb-6" />
        <EditorialHeading size="statement" className="max-w-3xl mb-10 sm:mb-12">
          Documentation for engineers and partners.
        </EditorialHeading>

        <div className="divide-y divide-border/70">
          {featuredResources.map((resource) => (
            <div
              key={resource.id}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 py-5 sm:py-6"
            >
              <div>
                <p className="font-[family-name:var(--font-poppins)] text-lg sm:text-xl font-semibold text-foreground">
                  {resource.title}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  {resource.fileType} · {resource.fileSize} · Updated {resource.lastUpdated}
                </p>
              </div>
              <ArrowLink route="resources" variant="inline">
                View in Resource Center
              </ArrowLink>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <ArrowLink route="resources">Browse all resources</ArrowLink>
        </div>
      </div>
    </section>
  );
}
