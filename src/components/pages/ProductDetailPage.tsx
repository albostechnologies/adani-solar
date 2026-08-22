"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { homeContent } from "@/content/home";
import { useRouter, type RouteName } from "@/lib/router";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Sun,
  Shield,
  TrendingUp,
  Thermometer,
  Wallet,
  Layers,
  Download,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  FileText,
  Sun as SunIcon,
  type LucideIcon,
} from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SectionHeading } from "@/components/sections/SectionHeading";
import Image from "next/image";

type ProductType = "topcon" | "monoperc";

interface ProductDetailPageProps {
  productType: ProductType;
}

// Icon name → component resolver
const ICONS: Record<string, LucideIcon> = {
  Sun,
  Shield,
  TrendingUp,
  Thermometer,
  Wallet,
  Layers,
};

export function ProductDetailPage({ productType }: ProductDetailPageProps) {
  const { navigate } = useRouter();
  const detail = homeContent.products.details[productType];
  const otherProductType: ProductType = productType === "topcon" ? "monoperc" : "topcon";
  const related = homeContent.products.details[otherProductType];

  const isTopCon = productType === "topcon";

  return (
    <main>
      {/* HERO */}
      <section className="relative overflow-hidden bg-solar-dark text-white pt-28 sm:pt-32 pb-16 sm:pb-24 grain-overlay">
        {/* Decorative orbs */}
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-solar-green/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-solar-green/10 blur-3xl pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '128px 128px',
        }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb / back */}
          <button
            onClick={() => navigate("home")}
            className="inline-flex items-center gap-1.5 text-sm text-white/60 hover:text-solar-green-light transition-colors mb-6 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-solar-green/15 text-solar-green-light text-xs font-semibold uppercase tracking-wider mb-4">
                <SunIcon className="w-3.5 h-3.5" />
                {isTopCon ? "Next-Gen TOPCon" : "Proven MonoPERC"}
              </span>
              <h1 className="font-[family-name:var(--font-poppins)] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 bg-gradient-to-r from-white via-white to-solar-green-light text-transparent bg-clip-text">
                {detail.name}
              </h1>
              <p className="text-base sm:text-lg leading-relaxed text-white max-w-xl mb-8 drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)]">
                {detail.tagline}
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={() => navigate("contact")}
                  className="bg-solar-green hover:bg-solar-green-dark text-white rounded-lg px-8 h-12 font-semibold shadow-lg shadow-solar-green/25 hover:shadow-xl hover:shadow-solar-green/30 transition-all duration-300 group"
                >
                  Get a Quote
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 hover:text-white hover:border-white/50 rounded-lg px-6 h-12 font-semibold"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Datasheet
                </Button>
              </div>
            </motion.div>

            {/* Hero image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="relative"
            >
              <div className="rounded-2xl overflow-hidden aspect-[4/3] shadow-2xl border border-white/10 relative bg-gradient-to-br from-solar-green/20 to-solar-dark-secondary">
                <Image
                  src={detail.heroImage}
                  alt={detail.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 560px"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-solar-dark/50 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between bg-solar-dark/60 backdrop-blur-sm rounded-lg px-3 py-2 border border-white/10">
                  <span className="text-xs text-white/70">Cell Type</span>
                  <span className="text-xs font-semibold text-solar-green-light">
                    {isTopCon ? "N-type TOPCon" : "P-type MonoPERC"}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Key specs strip */}
          <div className="mt-10 sm:mt-14 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {detail.keySpecs.slice(0, 4).map((spec, i) => (
              <motion.div
                key={spec.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.08 }}
                className="rounded-xl bg-white/5 border border-white/10 p-4 backdrop-blur-sm"
              >
                <p className="text-[10px] uppercase tracking-wider text-white/50 mb-1">
                  {spec.label}
                </p>
                <p className="font-[family-name:var(--font-poppins)] text-base sm:text-lg font-bold text-white">
                  {spec.value}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* HIGHLIGHTS */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Feature Highlights"
            subtitle="Engineered for Indian conditions , built for 25+ years of reliable performance."
            variant="light"
          />
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {detail.highlights.map((h, i) => {
              const Icon = ICONS[h.icon] || Sun;
              return (
                <motion.div
                  key={h.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="group rounded-2xl p-5 sm:p-6 bg-solar-green/5 border border-solar-green/15 hover:border-solar-green/40 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="w-12 h-12 rounded-xl bg-solar-green/15 flex items-center justify-center mb-4 group-hover:bg-solar-green/25 transition-colors">
                    <Icon className="w-6 h-6 text-solar-green" />
                  </div>
                  <h3 className="font-[family-name:var(--font-poppins)] text-base font-bold text-foreground mb-2">
                    {h.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {h.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PERFORMANCE GRAPH */}
      <section className="py-16 sm:py-20 lg:py-24 bg-solar-dark text-white relative grain-overlay">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeading
            title="Performance Warranty Curve"
            subtitle={`Power output guarantee over ${isTopCon ? "30" : "25"} years , bankable, predictable energy harvest.`}
            variant="dark"
          />
          <div className="mt-10 rounded-2xl bg-white/5 border border-white/10 p-6 sm:p-8 backdrop-blur-sm">
            <PerformanceBars data={detail.performanceCurve} />
            <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-white/60 border-t border-white/10 pt-4">
              <span>
                Year 1 output: <span className="text-solar-green-light font-semibold">{detail.performanceCurve[0].output}%</span>
              </span>
              <span>
                Year {detail.performanceCurve[detail.performanceCurve.length - 1].year} output:{" "}
                <span className="text-solar-green-light font-semibold">
                  {detail.performanceCurve[detail.performanceCurve.length - 1].output}%
                </span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* SPECIFICATIONS TABLE */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Technical Specifications"
            subtitle="Detailed electrical, mechanical, thermal and warranty parameters."
            variant="light"
          />
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            {detail.specGroups.map((group, gi) => (
              <motion.div
                key={group.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: gi * 0.1, duration: 0.4 }}
              >
                <Card className="h-full shadow-sm border-border/60">
                  <CardHeader className="pb-2">
                    <CardTitle className="font-[family-name:var(--font-poppins)] text-sm sm:text-base font-semibold text-foreground flex items-center gap-2">
                      <span className="w-1 h-5 rounded bg-solar-green" />
                      {group.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-2">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-border hover:bg-transparent">
                          <TableHead className="h-9 text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
                            Parameter
                          </TableHead>
                          <TableHead className="h-9 text-[10px] uppercase tracking-wider text-muted-foreground font-semibold text-right">
                            Value
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {group.specs.map((spec) => (
                          <TableRow key={spec.parameter} className="border-border/60">
                            <TableCell className="text-xs sm:text-sm font-medium text-muted-foreground py-2.5">
                              {spec.parameter}
                            </TableCell>
                            <TableCell className="text-xs sm:text-sm font-semibold text-foreground text-right py-2.5">
                              {spec.value}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WARRANTY INFO + DATASHEET */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-solar-green/5 via-white to-solar-green/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
            {/* Warranty card */}
            <Card className="border-solar-green/15 shadow-md">
              <CardContent className="p-6 sm:p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-solar-green/10 flex items-center justify-center shrink-0">
                    <Shield className="w-6 h-6 text-solar-green" />
                  </div>
                  <div>
                    <h3 className="font-[family-name:var(--font-poppins)] text-lg font-bold text-foreground mb-1">
                      Warranty Summary
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                      Backed by Adani Solar's bankable warranty terms , independently verified by Kiwa PVEL and certified under BIS & IEC standards.
                    </p>
                    <ul className="space-y-2.5">
                      {detail.specGroups[3].specs.map((s) => (
                        <li key={s.parameter} className="flex items-center gap-2 text-sm text-foreground">
                          <CheckCircle2 className="w-4 h-4 text-solar-green shrink-0" />
                          <span className="text-muted-foreground">{s.parameter}:</span>
                          <span className="font-semibold">{s.value}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Datasheet + CTA card */}
            <Card className="border-solar-green/15 shadow-md">
              <CardContent className="p-6 sm:p-8 flex flex-col h-full">
                <div className="flex items-start gap-4 mb-5">
                  <div className="w-12 h-12 rounded-xl bg-solar-green/10 flex items-center justify-center shrink-0">
                    <FileText className="w-6 h-6 text-solar-green" />
                  </div>
                  <div>
                    <h3 className="font-[family-name:var(--font-poppins)] text-lg font-bold text-foreground mb-1">
                      Download Datasheet
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Full technical specifications, dimensions, certification list and warranty terms in PDF format.
                    </p>
                    <p className="mt-2 text-xs font-mono text-muted-foreground/80 truncate">
                      {detail.datasheetName}
                    </p>
                  </div>
                </div>
                <div className="mt-auto flex flex-col sm:flex-row gap-3">
                  <Button
                    variant="outline"
                    className="flex-1 border-solar-green/40 text-solar-green hover:bg-solar-green/10 hover:text-solar-green rounded-lg h-11 font-semibold"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download PDF
                  </Button>
                  <Button
                    onClick={() => navigate("contact")}
                    className="flex-1 bg-solar-green hover:bg-solar-green-dark text-white rounded-lg h-11 font-semibold shadow-md shadow-solar-green/20 group"
                  >
                    Get a Quote
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* RELATED PRODUCTS */}
      <ScrollReveal>
        <section className="py-16 sm:py-20 bg-solar-dark text-white relative grain-overlay">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <SectionHeading
              title="Related Products"
              subtitle="Explore our other high-performance solar module technology."
              variant="dark"
            />
            <div className="mt-8 sm:mt-10 flex justify-center">
              <button
                onClick={() => navigate(otherProductType === "topcon" ? "product-topcon" : "product-monoperc")}
                className="group max-w-md w-full text-left rounded-2xl bg-white/5 border border-white/10 hover:border-solar-green/40 p-6 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-xl bg-solar-green/20 flex items-center justify-center group-hover:bg-solar-green/30 transition-colors">
                    {otherProductType === "topcon" ? (
                      <SunIcon className="w-6 h-6 text-solar-green-light" />
                    ) : (
                      <Layers className="w-6 h-6 text-solar-green-light" />
                    )}
                  </div>
                  <span className="text-xs uppercase tracking-wider text-solar-green-light font-semibold">
                    {related.type === "topcon" ? "Next-Gen" : "Proven"}
                  </span>
                </div>
                <h3 className="font-[family-name:var(--font-poppins)] text-xl font-bold text-white mb-2">
                  {related.name}
                </h3>
                <p className="text-sm text-white/60 leading-relaxed mb-4 line-clamp-2">
                  {related.tagline}
                </p>
                <div className="flex items-center gap-2 text-solar-green-light text-sm font-semibold">
                  View product details
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </main>
  );
}

/** Animated bar chart for performance warranty curve */
function PerformanceBars({
  data,
}: {
  data: ReadonlyArray<{ year: number; output: number }>;
}) {
  const max = Math.max(...data.map((d) => d.output));
  const min = Math.min(...data.map((d) => d.output));
  // Scale so the smallest bar still has visible height (min 35%)
  const range = max - min;
  const scale = (val: number) => 35 + ((val - min) / (range || 1)) * 65;

  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-3 sm:gap-4 items-end">
      {data.map((d, i) => (
        <motion.div
          key={d.year}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.08, duration: 0.5 }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs sm:text-sm font-semibold text-solar-green-light">
            {d.output}%
          </span>
          <div className="w-full h-32 sm:h-40 relative rounded-t-md bg-white/5 overflow-hidden flex items-end">
            <motion.div
              initial={{ height: 0 }}
              whileInView={{ height: `${scale(d.output)}%` }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + i * 0.08, duration: 0.7, ease: "easeOut" }}
              className="w-full bg-gradient-to-t from-solar-green-dark via-solar-green to-solar-green-light rounded-t-md"
            />
          </div>
          <span className="text-[10px] sm:text-xs text-white/60">
            Yr {d.year}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
