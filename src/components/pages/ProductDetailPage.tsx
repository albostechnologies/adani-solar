"use client";

import { homeContent } from "@/content/home";
import { useRouter, type RouteName } from "@/lib/router";
import { PageHero } from "@/components/editorial/PageHero";
import { PageSection } from "@/components/editorial/PageSection";
import { FeatureList } from "@/components/editorial/FeatureList";
import { ResourceRow } from "@/components/editorial/ResourceRow";
import { FinalCTA } from "@/components/editorial/FinalCTA";
import { SectionEyebrow } from "@/components/editorial/SectionEyebrow";
import { EditorialHeading } from "@/components/editorial/EditorialHeading";
import { ArrowLink } from "@/components/editorial/ArrowLink";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";

type ProductType = "topcon" | "monoperc";

interface ProductDetailPageProps {
  productType: ProductType;
}

export function ProductDetailPage({ productType }: ProductDetailPageProps) {
  const detail = homeContent.products.details[productType];
  const otherProductType: ProductType = productType === "topcon" ? "monoperc" : "topcon";
  const related = homeContent.products.details[otherProductType];
  const relatedRoute: RouteName = otherProductType === "topcon" ? "product-topcon" : "product-monoperc";

  return (
    <main>
      <PageHero
        eyebrow={`Product / ${productType === "topcon" ? "TOPCon" : "MonoPERC"}`}
        title={detail.name}
        subtitle={detail.tagline}
        image={detail.heroImage}
        imageAlt={detail.name}
        breadcrumbs={[
          { label: "Home", route: "home" },
          { label: "Products", route: "product-topcon" },
          { label: productType === "topcon" ? "TOPCon" : "MonoPERC" },
        ]}
      >
        <div className="grid grid-cols-2 gap-6 max-w-lg mt-4 editorial-divider border-t border-white/10 pt-6">
          {detail.keySpecs.slice(0, 2).map((spec) => (
            <div key={spec.label}>
              <p className="editorial-stat-value font-[family-name:var(--font-poppins)] font-semibold text-white">
                {spec.value}
              </p>
              <p className="mt-2 text-xs uppercase tracking-[0.14em] text-white/45">{spec.label}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-3 mt-8">
          <ArrowLink route="contact" variant="primary" className="on-dark">
            Get a Quote
          </ArrowLink>
          <ArrowLink route="resources" variant="secondary" className="text-white/80 hover:text-white">
            Download Datasheet
          </ArrowLink>
        </div>
      </PageHero>

      <PageSection tone="muted">
        <SectionEyebrow number="02" label="Advantages" className="mb-6" />
        <EditorialHeading size="statement" className="mb-8">
          Engineered for Indian conditions.
        </EditorialHeading>
        <FeatureList items={detail.highlights.map((h) => ({ title: h.title, description: h.description }))} />
      </PageSection>

      <PageSection>
        <SectionEyebrow number="03" label="Specifications" className="mb-6" />
        <EditorialHeading size="statement" className="mb-8">
          Technical specifications.
        </EditorialHeading>
        <div className="space-y-10">
          {detail.specGroups.map((group) => (
            <div key={group.title}>
              <h3 className="font-[family-name:var(--font-poppins)] text-lg font-semibold mb-4">{group.title}</h3>
              <div className="overflow-x-auto editorial-divider border rounded-xl">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Parameter</TableHead>
                      <TableHead className="text-right">Value</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {group.specs.map((spec) => (
                      <TableRow key={spec.parameter}>
                        <TableCell className="font-medium">{spec.parameter}</TableCell>
                        <TableCell className="text-right">{spec.value}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          ))}
        </div>
      </PageSection>

      <PageSection tone="muted">
        <SectionEyebrow number="04" label="Downloads" className="mb-6" />
        <EditorialHeading size="statement" className="mb-8">
          Product documentation.
        </EditorialHeading>
        <ResourceRow
          title={`${detail.name} Datasheet`}
          meta={`PDF · ${detail.datasheetName}`}
          linkLabel="View in Resource Center"
        />
      </PageSection>

      <PageSection>
        <SectionEyebrow number="05" label="Related" className="mb-6" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-muted">
            <Image src={related.heroImage} alt={related.name} fill className="object-cover" sizes="50vw" />
          </div>
          <div>
            <EditorialHeading size="statement" className="mb-4">
              {related.name}
            </EditorialHeading>
            <p className="editorial-body text-muted-foreground mb-6">{related.tagline}</p>
            <ArrowLink route={relatedRoute}>Explore {otherProductType === "topcon" ? "TOPCon" : "MonoPERC"}</ArrowLink>
          </div>
        </div>
      </PageSection>

      <FinalCTA
        eyebrow="Contact"
        title="Talk to our solar experts about your project."
        cta="Contact Us"
        route="contact"
      />
    </main>
  );
}
