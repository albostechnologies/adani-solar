"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { glossaryContent, type GlossaryTerm } from "@/content/glossary";
import { PageHero } from "@/components/editorial/PageHero";
import { Search, Filter, BookOpen, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "@/lib/router";

const categoryColors: Record<string, string> = {
  Fundamentals: "bg-solar-green/10 text-solar-green border-solar-green/30",
  "Cell Technology": "bg-blue-500/10 text-blue-600 border-blue-500/30",
  "Module Technology": "bg-purple-500/10 text-purple-600 border-purple-500/30",
  "System Design": "bg-amber-500/10 text-amber-600 border-amber-500/30",
  "Policy & Finance": "bg-cyan-500/10 text-cyan-600 border-cyan-500/30",
  Performance: "bg-rose-500/10 text-rose-600 border-rose-500/30",
};

export function GlossaryPage() {
  const c = glossaryContent;
  const { navigate } = useRouter();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string>("all");
  const [expandedTerm, setExpandedTerm] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return c.terms.filter((t) => {
      const matchesSearch =
        !search ||
        t.term.toLowerCase().includes(search.toLowerCase()) ||
        t.definition.toLowerCase().includes(search.toLowerCase()) ||
        (t.extended && t.extended.toLowerCase().includes(search.toLowerCase()));
      const matchesCat = category === "all" || t.category === category;
      return matchesSearch && matchesCat;
    });
  }, [c.terms, search, category]);

  const grouped = useMemo(() => {
    const groups: Record<string, GlossaryTerm[]> = {};
    for (const t of filtered) {
      const letter = t.term[0].toUpperCase();
      if (!groups[letter]) groups[letter] = [];
      groups[letter].push(t);
    }
    return groups;
  }, [filtered]);

  const letters = Object.keys(grouped).sort();

  return (
    <main>
      <PageHero
        eyebrow="Glossary"
        title={c.hero.title}
        subtitle={c.hero.subtitle}
        backgroundImage={c.hero.backgroundImage}
        breadcrumbs={[{ label: "Home", route: "home" }, { label: "Glossary" }]}
      />

      {/* Search + Filter */}
      <section className="py-8 sm:py-10 bg-white border-b border-border sticky top-16 sm:top-20 z-30 backdrop-blur-md bg-white/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-3 md:gap-4 items-center">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search terms... (e.g., TOPCon, LCOE, bifacial)"
                className="w-full h-11 pl-10 pr-4 rounded-lg border border-border bg-background text-sm placeholder:text-muted-foreground input-glow"
                aria-label="Search glossary terms"
              />
            </div>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="md:w-56 h-11">
                <Filter className="w-4 h-4 mr-2 text-muted-foreground" />
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {c.categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="text-sm text-muted-foreground whitespace-nowrap">
              <span className="font-semibold text-foreground">{filtered.length}</span> of {c.terms.length} terms
            </div>
          </div>
        </div>
      </section>

      {/* Letter navigation */}
      <section className="py-4 bg-solar-green/5 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-1 justify-center">
            {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((letter) => {
              const hasTerms = letters.includes(letter);
              return (
                <button
                  key={letter}
                  disabled={!hasTerms}
                  onClick={() => {
                    const el = document.getElementById(`letter-${letter}`);
                    el?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                  className={`w-8 h-8 rounded text-xs font-semibold transition-all ${
                    hasTerms
                      ? "text-foreground hover:bg-solar-green hover:text-white hover:shadow-sm"
                      : "text-muted-foreground/30 cursor-not-allowed"
                  }`}
                >
                  {letter}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Terms list */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            {letters.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <BookOpen className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">No terms found</h3>
                <p className="text-sm text-muted-foreground mb-4">Try adjusting your search or category filter</p>
                <Button variant="outline" onClick={() => { setSearch(""); setCategory("all"); }}>Clear Filters</Button>
              </motion.div>
            ) : (
              <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-10">
                {letters.map((letter) => (
                  <div key={letter} id={`letter-${letter}`}>
                    <div className="flex items-center sticky top-32 z-20 bg-white/90 backdrop-blur-sm py-2 mb-4 border-b border-border">
                      <span className="font-[family-name:var(--font-poppins)] text-2xl font-bold text-solar-green">{letter}</span>
                      <span className="ml-2 text-sm text-muted-foreground">({grouped[letter].length} terms)</span>
                    </div>
                    <div className="space-y-3">
                      {grouped[letter].map((term) => {
                        const isExpanded = expandedTerm === term.slug;
                        return (
                          <motion.div
                            key={term.slug}
                            layout
                            className="rounded-xl border border-border bg-white overflow-hidden hover:border-solar-green/30 transition-all duration-200 shimmer-border"
                          >
                            <button
                              onClick={() => setExpandedTerm(isExpanded ? null : term.slug)}
                              className="w-full text-left p-4 sm:p-5"
                              aria-expanded={isExpanded}
                            >
                              <div className="flex items-start gap-3">
                                <span className={`shrink-0 mt-1 inline-flex items-center justify-center w-8 h-8 rounded-lg text-xs font-bold ${categoryColors[term.category] || categoryColors.Fundamentals}`}>
                                  {term.term[0]}
                                </span>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2 flex-wrap mb-1">
                                    <h3 className="font-[family-name:var(--font-poppins)] text-base font-semibold text-foreground">
                                      {term.term}
                                    </h3>
                                    <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-md border ${categoryColors[term.category] || categoryColors.Fundamentals}`}>
                                      {term.category}
                                    </span>
                                  </div>
                                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                                    {term.definition}
                                  </p>
                                </div>
                                <ArrowRight className={`w-4 h-4 text-muted-foreground shrink-0 transition-transform ${isExpanded ? "rotate-90" : ""}`} />
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
                                  <div className="p-4 sm:p-5 bg-solar-green/[0.02] space-y-4">
                                    {term.extended && (
                                      <div>
                                        <h4 className="text-xs font-semibold text-foreground mb-2 uppercase tracking-wider">Detailed Explanation</h4>
                                        <p className="text-sm text-muted-foreground leading-relaxed">{term.extended}</p>
                                      </div>
                                    )}

                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                      {term.unit && (
                                        <div className="rounded-lg p-3 bg-white border border-border">
                                          <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Unit</p>
                                          <p className="text-sm font-semibold text-foreground">{term.unit}</p>
                                        </div>
                                      )}
                                      {term.range && (
                                        <div className="rounded-lg p-3 bg-white border border-border">
                                          <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Typical Range</p>
                                          <p className="text-sm font-semibold text-foreground">{term.range}</p>
                                        </div>
                                      )}
                                      <div className="rounded-lg p-3 bg-white border border-border">
                                        <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Category</p>
                                        <p className="text-sm font-semibold text-foreground">{term.category}</p>
                                      </div>
                                    </div>

                                    {term.relatedTerms && term.relatedTerms.length > 0 && (
                                      <div>
                                        <h4 className="text-xs font-semibold text-foreground mb-2 uppercase tracking-wider">Related Terms</h4>
                                        <div className="flex flex-wrap gap-2">
                                          {term.relatedTerms.map((rt) => {
                                            const found = c.terms.find((t) => t.slug === rt);
                                            return (
                                              <Badge key={rt} variant="outline" className="text-xs border-solar-green/30 text-solar-green hover:bg-solar-green/5 cursor-pointer">
                                                {found ? found.term : rt}
                                              </Badge>
                                            );
                                          })}
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </main>
  );
}
