"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { careersContent, type JobOpening } from "@/content/careers";
import { HeroSection } from "@/components/sections/HeroSection";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { StatsSection } from "@/components/sections/StatsSection";
import { CardGrid } from "@/components/sections/CardGrid";
import { ScrollReveal } from "@/components/ScrollReveal";
import { useRouter } from "@/lib/router";
import {
  MapPin,
  Briefcase,
  Clock,
  ArrowRight,
  Search,
  Filter,
  GraduationCap,
  Calendar,
  Building2,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const departmentOptions: JobOpening["department"][] = [
  "Engineering",
  "Manufacturing",
  "Sales",
  "R&D",
  "Operations",
  "Finance",
  "HR",
  "IT",
];

const locationOptions: JobOpening["location"][] = [
  "Mundra, Gujarat",
  "Ahmedabad, Gujarat",
  "Hyderabad, Telangana",
  "Bengaluru, Karnataka",
  "Remote",
];

export function CareersPage() {
  const c = careersContent;
  const { navigate } = useRouter();

  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState<string>("all");
  const [location, setLocation] = useState<string>("all");
  const [expandedJob, setExpandedJob] = useState<string | null>(null);

  const filteredJobs = useMemo(() => {
    return c.jobs.filter((job) => {
      const matchesSearch =
        !search ||
        job.title.toLowerCase().includes(search.toLowerCase()) ||
        job.summary.toLowerCase().includes(search.toLowerCase()) ||
        job.id.toLowerCase().includes(search.toLowerCase());
      const matchesDept = department === "all" || job.department === department;
      const matchesLoc = location === "all" || job.location === location;
      return matchesSearch && matchesDept && matchesLoc;
    });
  }, [c.jobs, search, department, location]);

  return (
    <main>
      {/* Hero */}
      <HeroSection
        variant="dark"
        title={c.hero.title}
        subtitle={c.hero.subtitle}
        cta={c.hero.cta}
        ctaRoute="contact"
        secondaryCta="Browse Internships"
        secondaryCtaRoute="careers"
        backgroundImage={c.hero.backgroundImage}
        fullViewport
      />

      {/* Stats */}
      <StatsSection
        items={c.stats.items}
        variant="dark"
        sectionTitle={c.stats.sectionTitle}
      />

      {/* Culture Pillars */}
      <CardGrid
        items={c.culture.pillars}
        variant="light"
        columns={4}
        sectionTitle={c.culture.title}
        sectionSubtitle={c.culture.subtitle}
      />

      {/* Benefits */}
      <section className="py-16 sm:py-20 lg:py-24 bg-solar-dark relative grain-overlay">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeading
            title={c.benefits.title}
            subtitle={c.benefits.subtitle}
            variant="dark"
          />
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {c.benefits.items.map((benefit, i) => {
              const iconMap: Record<string, React.ReactNode> = {
                Heart: "❤",
                Users: "👥",
                TrendingUp: "📈",
                Sun: "☀",
                DollarSign: "$",
                Leaf: "🍃",
              };
              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="rounded-xl p-6 bg-white/[0.04] border border-white/[0.08] hover:border-solar-green/30 hover:bg-white/[0.06] transition-all duration-300 group hover:-translate-y-1"
                >
                  <div className="text-3xl mb-3 opacity-80 group-hover:opacity-100 transition-opacity">
                    {iconMap[benefit.icon] || "✦"}
                  </div>
                  <h3 className="font-[family-name:var(--font-poppins)] text-base font-semibold text-white mb-2 group-hover:text-solar-green-light transition-colors">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-white/60 leading-relaxed">
                    {benefit.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Open Roles - Searchable & Filterable */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Open Positions"
            subtitle={`${c.jobs.length} active roles across ${departmentOptions.length} departments , find your fit`}
            variant="light"
          />

          {/* Search & Filters */}
          <div className="mt-10 mb-8 flex flex-col md:flex-row gap-3 md:gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by title, keyword, or job ID..."
                className="w-full h-11 pl-10 pr-4 rounded-lg border border-border bg-background text-sm placeholder:text-muted-foreground input-glow"
                aria-label="Search jobs"
              />
            </div>
            <Select value={department} onValueChange={setDepartment}>
              <SelectTrigger className="md:w-56 h-11">
                <Filter className="w-4 h-4 mr-2 text-muted-foreground" />
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                {departmentOptions.map((d) => (
                  <SelectItem key={d} value={d}>{d}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={location} onValueChange={setLocation}>
              <SelectTrigger className="md:w-56 h-11">
                <MapPin className="w-4 h-4 mr-2 text-muted-foreground" />
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                {locationOptions.map((l) => (
                  <SelectItem key={l} value={l}>{l}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Results count */}
          <div className="mb-4 text-sm text-muted-foreground">
            Showing <span className="font-semibold text-foreground">{filteredJobs.length}</span> of {c.jobs.length} positions
          </div>

          {/* Job Listings */}
          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {filteredJobs.map((job) => {
                const isExpanded = expandedJob === job.id;
                const daysAgo = Math.floor(
                  (Date.now() - new Date(job.posted).getTime()) / (1000 * 60 * 60 * 24)
                );
                const formattedPosted =
                  daysAgo === 0
                    ? "Today"
                    : daysAgo === 1
                      ? "Yesterday"
                      : daysAgo < 7
                        ? `${daysAgo} days ago`
                        : daysAgo < 30
                          ? `${Math.floor(daysAgo / 7)} week${Math.floor(daysAgo / 7) > 1 ? "s" : ""} ago`
                          : daysAgo < 365
                            ? `${Math.floor(daysAgo / 30)} month${Math.floor(daysAgo / 30) > 1 ? "s" : ""} ago`
                            : new Date(job.posted).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
                return (
                  <motion.div
                    key={job.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.25 }}
                    className="rounded-xl border border-border bg-white overflow-hidden shadow-sm hover:shadow-md hover:border-solar-green/30 transition-all duration-300 shimmer-border"
                  >
                    <button
                      onClick={() => setExpandedJob(isExpanded ? null : job.id)}
                      className="w-full text-left p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-4"
                      aria-expanded={isExpanded}
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                          <Badge variant="outline" className="text-[10px] uppercase tracking-wider border-solar-green/30 text-solar-green">
                            {job.id}
                          </Badge>
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Calendar className="w-3 h-3" /> {formattedPosted}
                          </span>
                        </div>
                        <h3 className="font-[family-name:var(--font-poppins)] text-base sm:text-lg font-semibold text-foreground mb-2 group-hover:text-solar-green transition-colors">
                          {job.title}
                        </h3>
                        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Building2 className="w-3.5 h-3.5" /> {job.department}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5" /> {job.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Briefcase className="w-3.5 h-3.5" /> {job.type}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" /> {job.experience}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <Button
                          size="sm"
                          variant={isExpanded ? "default" : "outline"}
                          className={`rounded-lg h-9 text-xs font-semibold transition-all ${
                            isExpanded
                              ? "bg-solar-green hover:bg-solar-green-dark text-white"
                              : "border-solar-green/30 text-solar-green hover:bg-solar-green/5"
                          }`}
                        >
                          {isExpanded ? "Hide Details" : "View Details"}
                          <ArrowRight className={`w-3.5 h-3.5 ml-1 transition-transform ${isExpanded ? "rotate-90" : ""}`} />
                        </Button>
                      </div>
                    </button>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden border-t border-border"
                        >
                          <div className="p-5 sm:p-6 bg-solar-green/[0.02]">
                            <p className="text-sm text-foreground leading-relaxed mb-5">
                              {job.summary}
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                <h4 className="font-[family-name:var(--font-poppins)] text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                                  <span className="w-1 h-4 bg-solar-green rounded-full" />
                                  Key Responsibilities
                                </h4>
                                <ul className="space-y-2">
                                  {job.responsibilities.map((r, i) => (
                                    <li key={i} className="text-xs text-muted-foreground leading-relaxed flex gap-2">
                                      <span className="text-solar-green mt-0.5">▸</span>
                                      <span>{r}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              <div>
                                <h4 className="font-[family-name:var(--font-poppins)] text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                                  <span className="w-1 h-4 bg-solar-green rounded-full" />
                                  Requirements
                                </h4>
                                <ul className="space-y-2">
                                  {job.requirements.map((r, i) => (
                                    <li key={i} className="text-xs text-muted-foreground leading-relaxed flex gap-2">
                                      <span className="text-solar-green mt-0.5">▸</span>
                                      <span>{r}</span>
                                    </li>
                                  ))}
                                </ul>

                                {job.niceToHave && job.niceToHave.length > 0 && (
                                  <>
                                    <h4 className="font-[family-name:var(--font-poppins)] text-sm font-semibold text-foreground mt-4 mb-3 flex items-center gap-2">
                                      <span className="w-1 h-4 bg-solar-green/50 rounded-full" />
                                      Nice to Have
                                    </h4>
                                    <ul className="space-y-2">
                                      {job.niceToHave.map((r, i) => (
                                        <li key={i} className="text-xs text-muted-foreground leading-relaxed flex gap-2">
                                          <span className="text-solar-green/60 mt-0.5">○</span>
                                          <span>{r}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </>
                                )}
                              </div>
                            </div>

                            <div className="mt-6 pt-5 border-t border-border flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
                              <p className="text-xs text-muted-foreground">
                                Reference: <span className="font-mono font-semibold text-foreground">{job.id}</span> · Posted {new Date(job.posted).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                              </p>
                              <Button
                                onClick={() => navigate("contact")}
                                className="bg-solar-green hover:bg-solar-green-dark text-white rounded-lg h-10 px-6 text-sm font-semibold shadow-sm hover:shadow-md"
                              >
                                Apply Now <ArrowRight className="w-4 h-4 ml-1" />
                              </Button>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {filteredJobs.length === 0 && (
              <div className="text-center py-16">
                <div className="text-5xl mb-3 opacity-30">🔍</div>
                <h3 className="font-[family-name:var(--font-poppins)] text-lg font-semibold text-foreground mb-2">
                  No matching positions found
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Try adjusting your search or filters
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearch("");
                    setDepartment("all");
                    setLocation("all");
                  }}
                  className="rounded-lg"
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Internship & Graduate Programs */}
      <ScrollReveal>
        <section className="py-16 sm:py-20 lg:py-24 bg-solar-green/5 bg-grid-pattern">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              title={c.internships.title}
              subtitle={c.internships.subtitle}
              variant="light"
            />
            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
              {c.internships.programs.map((program, i) => (
                <motion.div
                  key={program.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="rounded-2xl bg-white border border-border shadow-premium hover:shadow-premium-hover p-6 flex flex-col"
                >
                  <div className="w-12 h-12 rounded-xl bg-solar-green/10 flex items-center justify-center mb-4">
                    <GraduationCap className="w-6 h-6 text-solar-green" />
                  </div>
                  <h3 className="font-[family-name:var(--font-poppins)] text-lg font-bold text-foreground mb-1">
                    {program.name}
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <Badge variant="secondary" className="text-xs">{program.duration}</Badge>
                    <Badge variant="outline" className="text-xs">{program.eligibility}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
                    {program.description}
                  </p>
                  <div className="pt-4 border-t border-border">
                    <p className="text-xs text-muted-foreground mb-0.5">Stipend / CTC</p>
                    <p className="font-[family-name:var(--font-poppins)] text-base font-semibold text-solar-green">
                      {program.stipend}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-10 text-center">
              <Button
                onClick={() => navigate("contact")}
                className="btn-premium text-white rounded-lg h-12 px-8 text-sm font-semibold"
              >
                Apply for Internship Program <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </main>
  );
}
