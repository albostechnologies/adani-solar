"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { resourcesContent, type Resource } from "@/content/resources";
import { HeroSection } from "@/components/sections/HeroSection";
import { SectionHeading } from "@/components/sections/SectionHeading";
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

  // Featured resources (only from non-filtered set)
  const featuredResources = useMemo(() => {
    return c.featuredResources
      .map((id) => c.resources.find((r) => r.id === id))
      .filter(Boolean) as Resource[];
  }, [c.resources, c.featuredResources]);

  // Category names for filter pills
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

  // Stats
  const stats = [
    { icon: FolderOpen, value: "15+", label: "Documents" },
    { icon: Layers, value: "5", label: "Categories" },
    { icon: RefreshCw, value: "Monthly", label: "Updated" },
    { icon: Download, value: "Free", label: "Downloads" },
  ];

  return (
    <main>
      {/* ── Hero Section ────────────────────────────────────────────── */}
      <HeroSection
        variant="dark"
        title={c.hero.title}
        subtitle={c.hero.subtitle}
        cta={c.hero.cta}
        ctaRoute={c.hero.ctaRoute}
        fullViewport={false}
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

      {/* ── Stats Bar ──────────────────────────────────────────────── */}
      <section className="bg-gray-900 py-6 sm:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <ScrollReveal key={i} delay={i * 0.1}>
                  <div className="flex items-center gap-3 justify-center">
                    <div className="w-10 h-10 rounded-lg bg-solar-green/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-solar-green" />
                    </div>
                    <div>
                      <p className="text-xl sm:text-2xl font-bold text-white">{stat.value}</p>
                      <p className="text-xs sm:text-sm text-gray-400">{stat.label}</p>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Featured Resources ──────────────────────────────────────── */}
      {activeCategory === "all" && !search && (
        <section className="py-10 sm:py-14 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <div className="flex items-center gap-2 mb-6">
                <Star className="w-5 h-5 text-solar-green" />
                <h3 className="text-lg sm:text-xl font-bold text-foreground">Featured Resources</h3>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {featuredResources.map((resource, i) => {
                const catConfig = categoryColorMap[resource.category];
                const catData = c.categories.find((cat) => cat.id === resource.category);
                return (
                  <ScrollReveal key={resource.id} delay={i * 0.1}>
                    <motion.div
                      whileHover={{ y: -6, transition: { duration: 0.2 } }}
                      className="group relative bg-white rounded-xl border border-border overflow-hidden shadow-sm hover:shadow-lg hover:shadow-solar-green/10 transition-shadow duration-300"
                    >
                      {/* Shimmer border */}
                      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10"
                        style={{
                          background: "linear-gradient(135deg, transparent 40%, rgba(0,166,81,0.15) 50%, transparent 60%)",
                          backgroundSize: "200% 200%",
                          animation: "shimmer 2s infinite",
                        }}
                      />

                      {/* Featured badge */}
                      <div className="absolute top-3 right-3 z-20">
                        <Badge className="bg-solar-green text-white border-0 text-[10px] px-2">
                          <Star className="w-3 h-3 mr-0.5" /> Featured
                        </Badge>
                      </div>

                      {/* Gradient thumbnail */}
                      <div
                        className="h-28 flex items-center justify-center"
                        style={{
                          background: `linear-gradient(135deg, ${resource.thumbnailGradient[0]}, ${resource.thumbnailGradient[1]})`,
                        }}
                      >
                        <FileTypeIcon type={resource.fileType} />
                        <span className="ml-2 text-white/90 text-sm font-semibold">
                          {resource.fileType}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="p-4">
                        <Badge variant="outline" className={`text-[10px] mb-2 ${catConfig?.badge}`}>
                          {catData?.name}
                        </Badge>
                        <h4 className="font-semibold text-sm text-foreground mb-1 line-clamp-2 group-hover:text-solar-green transition-colors">
                          {resource.title}
                        </h4>
                        <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                          {resource.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] text-muted-foreground">
                            {resource.fileType} · {resource.fileSize}
                          </span>
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-7 text-xs gap-1 border-solar-green text-solar-green hover:bg-solar-green hover:text-white"
                          >
                            <Download className="w-3 h-3" /> Download
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── Resource Grid ──────────────────────────────────────────── */}
      <section className="py-10 sm:py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <SectionHeading
              title="All Resources"
              subtitle="Browse and download from our complete document library"
              alignment="left"
            />
          </ScrollReveal>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <AnimatePresence mode="popLayout">
              {filteredResources.map((resource) => {
                const catConfig = categoryColorMap[resource.category];
                const catData = c.categories.find((cat) => cat.id === resource.category);
                const CatIcon = catData ? categoryIconMap[catData.icon] : FileText;

                return (
                  <motion.div
                    key={resource.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.25 }}
                    className={`group bg-white rounded-lg border border-border overflow-hidden shadow-sm hover:shadow-lg hover:shadow-solar-green/10 transition-shadow duration-300 border-l-4 ${catConfig?.border}`}
                  >
                    {/* Gradient icon area */}
                    <div
                      className="h-20 flex items-center justify-center relative"
                      style={{
                        background: `linear-gradient(135deg, ${resource.thumbnailGradient[0]}20, ${resource.thumbnailGradient[1]}30)`,
                      }}
                    >
                      {CatIcon && (
                        <CatIcon
                          className="w-8 h-8 opacity-20"
                          style={{ color: resource.thumbnailGradient[0] }}
                        />
                      )}
                      <span className="absolute top-2 right-2 text-[10px] font-bold uppercase tracking-wider text-white/80 bg-black/30 px-1.5 py-0.5 rounded">
                        {resource.fileType}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className={`text-[10px] ${catConfig?.badge}`}>
                          {catData?.name}
                        </Badge>
                        {resource.featured && (
                          <Badge className="text-[10px] bg-solar-green/10 text-solar-green border-solar-green/30">
                            <Star className="w-3 h-3 mr-0.5" /> Featured
                          </Badge>
                        )}
                      </div>

                      <h4 className="font-semibold text-sm text-foreground mb-1.5 line-clamp-2 group-hover:text-solar-green transition-colors">
                        {resource.title}
                      </h4>

                      <p className="text-xs text-muted-foreground mb-3 line-clamp-2 leading-relaxed">
                        {resource.description}
                      </p>

                      {/* Meta row */}
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-muted-foreground mb-3">
                        <span className="inline-flex items-center gap-1">
                          <FileTypeIcon type={resource.fileType} />
                          {resource.fileType}
                        </span>
                        <span>·</span>
                        <span>{resource.fileSize}</span>
                        <span>·</span>
                        <span>{resource.pages} pages</span>
                      </div>

                      {/* Version + date + download */}
                      <div className="flex items-center justify-between pt-3 border-t border-border/60">
                        <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                          <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-4">
                            {resource.version}
                          </Badge>
                          <span className="inline-flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {formatDate(resource.lastUpdated)}
                          </span>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-7 text-xs gap-1 border-solar-green text-solar-green hover:bg-solar-green hover:text-white"
                        >
                          <Download className="w-3 h-3" /> Download
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Empty state */}
          {filteredResources.length === 0 && (
            <div className="text-center py-16">
              <FolderOpen className="w-12 h-12 mx-auto mb-4 text-muted-foreground/40" />
              <p className="text-lg font-semibold text-foreground mb-1">No resources found</p>
              <p className="text-sm text-muted-foreground">
                Try adjusting your search or category filter.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ── FAQ Section ────────────────────────────────────────────── */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <SectionHeading
              title="Documentation FAQ"
              subtitle="Common questions about our resource library"
            />
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="mt-8">
              <Accordion type="single" collapsible className="bg-white rounded-lg border border-border px-4 sm:px-6">
                {c.faqs.map((faq, i) => (
                  <AccordionItem key={i} value={`faq-${i}`}>
                    <AccordionTrigger className="text-sm sm:text-base font-medium text-foreground text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── CTA Section ────────────────────────────────────────────── */}
      <section className="relative py-14 sm:py-20 overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-solar-green via-solar-green-dark to-emerald-800" />
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.2) 0%, transparent 40%)",
          }}
        />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
              Need Custom Documentation?
            </h2>
            <p className="text-base sm:text-lg text-white/80 mb-8 max-w-2xl mx-auto leading-relaxed">
              Our technical team can provide tailored specifications, performance data, and certification
              documents specific to your project requirements.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                size="lg"
                className="bg-white text-solar-green hover:bg-gray-100 font-semibold gap-2 shadow-lg"
                onClick={() => navigate("contact")}
              >
                <PhoneCall className="w-4 h-4" /> Contact Sales
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/40 text-white hover:bg-white/10 font-semibold gap-2"
                onClick={() => navigate("contact")}
              >
                Request Quote <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
