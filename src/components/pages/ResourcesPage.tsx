"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { resourcesContent, type Resource } from "@/content/resources";
import { PageHero } from "@/components/editorial/PageHero";
import { PageSection } from "@/components/editorial/PageSection";
import { SectionEyebrow } from "@/components/editorial/SectionEyebrow";
import { EditorialHeading } from "@/components/editorial/EditorialHeading";
import { ResourceRow } from "@/components/editorial/ResourceRow";
import { MetricRow } from "@/components/editorial/MetricRow";
import { FinalCTA } from "@/components/editorial/FinalCTA";
import { ScrollReveal } from "@/components/ScrollReveal";
import { useRouter } from "@/lib/router";
import {
  Search,
  Download,
  FileText,
  FileSpreadsheet,
  Presentation,
  BookOpen,
  Wrench,
  ShieldCheck,
  Star,
  FileIcon,
  Calendar,
  Layers,
  RefreshCw,
  FolderOpen,
  PhoneCall,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// ── Icon mapping for categories ───────────────────────────────────────────────
const categoryIconMap: Record<string, LucideIcon> = {
  FileSpreadsheet,
  Presentation,
  BookOpen,
  Wrench,
  ShieldCheck,
};

// ── Color mapping for categories ──────────────────────────────────────────────
const categoryColorMap: Record<string, { border: string; badge: string; text: string; bg: string }> = {
  datasheets: {
    border: "border-l-solar-green",
    badge: "bg-solar-green/10 text-solar-green border-solar-green/30",
    text: "text-solar-green",
    bg: "bg-solar-green",
  },
  brochures: {
    border: "border-l-amber-500",
    badge: "bg-amber-500/10 text-amber-600 border-amber-500/30",
    text: "text-amber-600",
    bg: "bg-amber-500",
  },
  whitepapers: {
    border: "border-l-purple-500",
    badge: "bg-purple-500/10 text-purple-600 border-purple-500/30",
    text: "text-purple-600",
    bg: "bg-purple-500",
  },
  guides: {
    border: "border-l-cyan-500",
    badge: "bg-cyan-500/10 text-cyan-600 border-cyan-500/30",
    text: "text-cyan-600",
    bg: "bg-cyan-500",
  },
  certifications: {
    border: "border-l-rose-500",
    badge: "bg-rose-500/10 text-rose-600 border-rose-500/30",
    text: "text-rose-600",
    bg: "bg-rose-500",
  },
};

// ── File type icon ────────────────────────────────────────────────────────────
function FileTypeIcon({ type }: { type: string }) {
  switch (type) {
    case "PDF":
      return <FileText className="w-3.5 h-3.5" />;
    case "XLSX":
      return <FileSpreadsheet className="w-3.5 h-3.5" />;
    case "PPTX":
      return <Presentation className="w-3.5 h-3.5" />;
    default:
      return <FileIcon className="w-3.5 h-3.5" />;
  }
}

// ── Format date ───────────────────────────────────────────────────────────────
function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

// ── Main Component ────────────────────────────────────────────────────────────
export function ResourcesPage() {
  const c = resourcesContent;
  const { navigate } = useRouter();

  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");

  // Filtered resources
  const filteredResources = useMemo(() => {
    return c.resources.filter((r) => {
      const matchesSearch =
        !search ||
        r.title.toLowerCase().includes(search.toLowerCase()) ||
        r.description.toLowerCase().includes(search.toLowerCase()) ||
        r.category.toLowerCase().includes(search.toLowerCase());
      const matchesCat = activeCategory === "all" || r.category === activeCategory;
      return matchesSearch && matchesCat;
    });
  }, [c.resources, search, activeCategory]);

  // Group resources by category for editorial list layout
  const groupedResources = useMemo(() => {
    const categories =
      activeCategory === "all"
        ? c.categories
        : c.categories.filter((cat) => cat.id === activeCategory);

    return categories
      .map((category) => ({
        category,
        resources: filteredResources.filter((r) => r.category === category.id),
      }))
      .filter((group) => group.resources.length > 0);
  }, [c.categories, filteredResources, activeCategory]);

  const stats = [
    { value: "15+", label: "Documents" },
    { value: "5", label: "Categories" },
  ];

  const categoryPills = useMemo(() => {
    return [
      { id: "all", name: "All", count: c.resources.length },
      ...c.categories.map((cat) => ({
        id: cat.id,
        name: cat.name,
        count: c.resources.filter((r) => r.category === cat.id).length,
      })),
    ];
  }, [c.categories, c.resources]);

  function renderResourceRow(resource: Resource) {
    const catData = c.categories.find((cat) => cat.id === resource.category);
    const meta = [
      catData?.name ?? resource.category,
      resource.fileType,
      resource.fileSize,
      resource.featured ? "Featured" : null,
    ]
      .filter(Boolean)
      .join(" · ");

    return (
      <ResourceRow
        key={resource.id}
        title={resource.title}
        subtitle={resource.description}
        meta={meta}
        linkLabel="Download"
      />
    );
  }

  return (
    <main>
      {/* ── Hero Section ────────────────────────────────────────────── */}
      <PageHero
        eyebrow="Resources"
        title={c.hero.title}
        subtitle={c.hero.subtitle}
        backgroundImage="/assets/home/solar-products-modules.webp"
        breadcrumbs={[{ label: "Home", route: "home" }, { label: "Resources" }]}
      />

      {/* ── Search + Filter Bar ─────────────────────────────────────── */}
      <section className="py-6 sm:py-8 bg-white border-b border-border sticky top-16 sm:top-20 z-30 backdrop-blur-md bg-white/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4">
            {/* Search row */}
            <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
              <div className="relative flex-1 w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                <Input
                  type="text"
                  placeholder="Search resources by title, description, or category..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10 pr-4 h-11 bg-white border-border focus:border-solar-green focus:ring-solar-green/20"
                />
              </div>
              <p className="text-sm text-muted-foreground whitespace-nowrap">
                <span className="font-semibold text-foreground">{filteredResources.length}</span>{" "}
                {filteredResources.length === 1 ? "result" : "results"} found
              </p>
            </div>

            {/* Category pills */}
            <div className="flex flex-wrap gap-2">
              {categoryPills.map((pill) => {
                const isActive = activeCategory === pill.id;
                return (
                  <button
                    key={pill.id}
                    onClick={() => setActiveCategory(pill.id)}
                    className={`
                      inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium
                      transition-all duration-200 border
                      ${
                        isActive
                          ? "bg-solar-green text-white border-solar-green shadow-sm shadow-solar-green/20"
                          : "bg-white text-foreground border-border hover:border-solar-green/40 hover:bg-solar-green/5"
                      }
                    `}
                  >
                    {pill.name}
                    <span
                      className={`
                        text-xs px-1.5 py-0.5 rounded-full
                        ${isActive ? "bg-white/20 text-white" : "bg-muted text-muted-foreground"}
                      `}
                    >
                      {pill.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ──────────────────────────────────────────────────── */}
      <PageSection tone="dark">
        <MetricRow variant="dark" items={stats} />
      </PageSection>

      {/* ── Document Library ─────────────────────────────────────────── */}
      <PageSection>
        <SectionEyebrow label="Library" className="mb-6" />
        <EditorialHeading size="statement" className="mb-4">
          All resources.
        </EditorialHeading>
        <p className="editorial-body text-muted-foreground max-w-2xl mb-10">
          Browse and download from our complete document library.
        </p>

        {filteredResources.length === 0 ? (
          <div className="text-center py-16 editorial-divider border-t">
            <FolderOpen className="w-10 h-10 mx-auto mb-4 text-muted-foreground/40" />
            <p className="text-lg font-semibold text-foreground mb-1">No resources found</p>
            <p className="text-sm text-muted-foreground">
              Try adjusting your search or category filter.
            </p>
          </div>
        ) : search || activeCategory !== "all" ? (
          <div>{filteredResources.map(renderResourceRow)}</div>
        ) : (
          <div className="space-y-12 sm:space-y-16">
            {groupedResources.map(({ category, resources }) => (
              <div key={category.id}>
                <h2 className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-4">
                  {category.name}
                </h2>
                <div>{resources.map(renderResourceRow)}</div>
              </div>
            ))}
          </div>
        )}
      </PageSection>

      {/* ── FAQ Section ────────────────────────────────────────────── */}
      <PageSection tone="muted">
        <SectionEyebrow label="FAQ" className="mb-6" />
        <EditorialHeading size="section" className="mb-8">
          Documentation questions.
        </EditorialHeading>

        <Accordion type="single" collapsible className="border-t border-border">
          {c.faqs.map((faq, i) => (
            <AccordionItem key={i} value={`faq-${i}`} className="border-b border-border px-0">
              <AccordionTrigger className="text-base font-medium text-foreground text-left py-5 hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-5">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </PageSection>

      <FinalCTA
        eyebrow="Support"
        title="Need custom documentation for your project?"
        cta="Contact our technical team"
        route="contact"
      />
    </main>
  );
}
