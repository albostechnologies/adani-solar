"use client";

import React, { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { compareContent } from "@/content/compare";
import { useRouter } from "@/lib/router";
import { PageHero } from "@/components/editorial/PageHero";
import { ArrowLink } from "@/components/editorial/ArrowLink";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Check,
  Minus,
  Crown,
  Phone,
  Download,
  ArrowRight,
  ChevronRight,
} from "lucide-react";

// ─── Hero Section ───────────────────────────────────────────────
function CompareHero() {
  const { hero } = compareContent;

  return (
    <PageHero
      eyebrow="Products / Compare"
      title={hero.title}
      subtitle={hero.subtitle}
      backgroundImage="/assets/home/solar-products-modules.webp"
      breadcrumbs={[
        { label: "Home", route: "home" },
        { label: "Products", route: "product-topcon" },
        { label: "Compare" },
      ]}
    >
      <ArrowLink route={hero.ctaRoute} variant="primary" className="on-dark">
        {hero.cta}
      </ArrowLink>
    </PageHero>
  );
}

// ─── Side-by-Side Product Cards ─────────────────────────────────
function ProductCards() {
  const { topcon, monoperc } = compareContent.products;

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 sm:mb-12"
        >
          <h2 className="font-[family-name:var(--font-poppins)] text-2xl sm:text-3xl lg:text-4xl font-bold text-solar-dark mb-3">
            Side-by-Side Overview
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            At a glance , key specifications and efficiency metrics for our two
            flagship module technologies.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          <ProductCard product={topcon} variant="topcon" />
          <ProductCard product={monoperc} variant="monoperc" />
        </div>
      </div>
    </section>
  );
}

function ProductCard({
  product,
  variant,
}: {
  product: (typeof compareContent.products)["topcon"];
  variant: "topcon" | "monoperc";
}) {
  const isTopcon = variant === "topcon";
  const accentColor = isTopcon ? "solar-green" : "solar-gold";
  const accentBg = isTopcon ? "bg-solar-green" : "bg-solar-gold";
  const accentBgLight = isTopcon ? "bg-solar-green/10" : "bg-solar-gold/10";
  const accentText = isTopcon ? "text-solar-green" : "text-solar-gold";
  const accentBorder = isTopcon ? "border-solar-green/30" : "border-solar-gold/30";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: isTopcon ? 0 : 0.15 }}
    >
      <Card
        className={`relative overflow-hidden border-2 ${accentBorder} hover:shadow-xl transition-shadow duration-300`}
      >
        {/* Top accent bar */}
        <div className={`h-1.5 ${accentBg}`} />

        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p
                className={`text-xs uppercase tracking-wider font-semibold ${accentText} mb-1`}
              >
                {product.series}
              </p>
              <h3 className="font-[family-name:var(--font-poppins)] text-xl sm:text-2xl font-bold text-solar-dark">
                {product.name}
              </h3>
            </div>
            <Badge
              className={`${accentBg} text-white text-sm px-3 py-1 font-bold`}
            >
              {product.wattage}W
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-5">
          {/* Efficiency Gauge */}
          <div>
            <div className="flex items-end justify-between mb-2">
              <span className="text-sm font-medium text-foreground">
                Module Efficiency
              </span>
              <span
                className={`font-[family-name:var(--font-poppins)] text-2xl font-bold ${accentText}`}
              >
                {product.efficiency}%
              </span>
            </div>
            <div className="h-3 w-full rounded-full bg-muted overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${(product.efficiency / 25) * 100}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: "easeOut" }}
                className={`h-full rounded-full ${accentBg}`}
              />
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-[10px] text-muted-foreground">0%</span>
              <span className="text-[10px] text-muted-foreground">25%</span>
            </div>
          </div>

          {/* Key specs grid */}
          <div className="grid grid-cols-2 gap-3">
            <SpecItem
              label="Cell Type"
              value={product.cellType}
              accentBgLight={accentBgLight}
            />
            <SpecItem
              label="Cells"
              value={String(product.cellsPerModule)}
              accentBgLight={accentBgLight}
            />
            <SpecItem
              label="Temp Coeff"
              value={`${product.temperatureCoefficient}%/°C`}
              accentBgLight={accentBgLight}
            />
            <SpecItem
              label="Warranty"
              value={product.warranty}
              accentBgLight={accentBgLight}
            />
            <SpecItem
              label="Weight"
              value={product.weight}
              accentBgLight={accentBgLight}
            />
            <SpecItem
              label="Color"
              value={product.color}
              accentBgLight={accentBgLight}
            />
          </div>

          {/* Feature Highlights */}
          <div>
            <p className="text-xs uppercase tracking-wider font-semibold text-muted-foreground mb-2">
              Highlights
            </p>
            <ul className="space-y-1.5">
              {product.featureHighlights.map((highlight, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <ChevronRight
                    className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${accentText}`}
                  />
                  <span className="text-foreground/80">{highlight}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Certifications */}
          <div className="flex flex-wrap gap-1.5">
            {product.certifications.map((cert) => (
              <Badge
                key={cert}
                variant="outline"
                className="text-[10px] px-2 py-0.5 border-border/50"
              >
                {cert}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function SpecItem({
  label,
  value,
  accentBgLight,
}: {
  label: string;
  value: string;
  accentBgLight: string;
}) {
  return (
    <div className={`${accentBgLight} rounded-lg p-2.5`}>
      <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-0.5">
        {label}
      </p>
      <p className="text-sm font-semibold text-foreground">{value}</p>
    </div>
  );
}

// ─── Category Tabs Comparison ───────────────────────────────────
function CategoryTabsComparison() {
  const { comparisonCategories } = compareContent;
  const [activeTab, setActiveTab] = useState(comparisonCategories[0].id);

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 sm:mb-12"
        >
          <h2 className="font-[family-name:var(--font-poppins)] text-2xl sm:text-3xl lg:text-4xl font-bold text-solar-dark mb-3">
            Detailed Comparison
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Explore every specification across 8 categories. Winner is
            highlighted in each row.
          </p>
        </motion.div>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          {/* Scrollable tab list for mobile */}
          <div className="w-full overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
            <TabsList className="w-full min-w-[640px] sm:min-w-0 h-auto flex-wrap sm:flex-nowrap">
              {comparisonCategories.map((cat) => {
                const Icon = cat.icon;
                return (
                  <TabsTrigger
                    key={cat.id}
                    value={cat.id}
                    className="flex items-center gap-1.5 text-xs sm:text-sm px-2 sm:px-3 py-2"
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">{cat.name}</span>
                    <span className="sm:hidden">
                      {cat.name.split(" ")[0]}
                    </span>
                  </TabsTrigger>
                );
              })}
            </TabsList>
          </div>

          {comparisonCategories.map((cat) => (
            <TabsContent key={cat.id} value={cat.id}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={cat.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full min-w-[500px]">
                        <thead>
                          <tr className="border-b bg-muted/50">
                            <th className="text-left px-4 sm:px-6 py-3 text-xs uppercase tracking-wider font-semibold text-muted-foreground">
                              Parameter
                            </th>
                            <th className="text-center px-4 sm:px-6 py-3 text-xs uppercase tracking-wider font-semibold text-solar-green">
                              TOPCon 580W
                            </th>
                            <th className="text-center px-4 sm:px-6 py-3 text-xs uppercase tracking-wider font-semibold text-solar-gold">
                              MonoPERC 545W
                            </th>
                            <th className="text-center px-4 sm:px-6 py-3 text-xs uppercase tracking-wider font-semibold text-muted-foreground">
                              Winner
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {cat.parameters.map((param, i) => (
                            <motion.tr
                              key={param.label}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{
                                duration: 0.3,
                                delay: i * 0.05,
                              }}
                              className="border-b last:border-b-0 hover:bg-muted/30 transition-colors"
                            >
                              <td className="px-4 sm:px-6 py-3">
                                <span className="text-sm font-medium text-foreground">
                                  {param.label}
                                </span>
                                {param.unit && (
                                  <span className="text-xs text-muted-foreground ml-1">
                                    ({param.unit})
                                  </span>
                                )}
                              </td>
                              <td
                                className={`text-center px-4 sm:px-6 py-3 text-sm font-semibold ${
                                  param.winner === "topcon"
                                    ? "bg-solar-green/10 text-solar-green"
                                    : ""
                                }`}
                              >
                                {String(param.topconValue)}
                              </td>
                              <td
                                className={`text-center px-4 sm:px-6 py-3 text-sm font-semibold ${
                                  param.winner === "monoperc"
                                    ? "bg-solar-gold/10 text-solar-gold"
                                    : ""
                                }`}
                              >
                                {String(param.monopercValue)}
                              </td>
                              <td className="text-center px-4 sm:px-6 py-3">
                                {param.winner === "topcon" && (
                                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-solar-green/10">
                                    <Check className="w-4 h-4 text-solar-green" />
                                  </span>
                                )}
                                {param.winner === "monoperc" && (
                                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-solar-gold/10">
                                    <Check className="w-4 h-4 text-solar-gold" />
                                  </span>
                                )}
                                {param.winner === "tie" && (
                                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-muted">
                                    <Minus className="w-4 h-4 text-muted-foreground" />
                                  </span>
                                )}
                              </td>
                            </motion.tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </Card>
                </motion.div>
              </AnimatePresence>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}

// ─── Visual Comparison Chart ────────────────────────────────────
function VisualChart() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  const metrics = [
    { label: "Efficiency", topcon: 22.52, monoperc: 21.16, max: 25, unit: "%" },
    { label: "Power Output", topcon: 580, monoperc: 545, max: 650, unit: "W" },
    {
      label: "Temp Coeff",
      topcon: 0.29,
      monoperc: 0.35,
      max: 0.5,
      unit: "%/°C",
      invertLabel: true,
    },
    {
      label: "Warranty",
      topcon: 30,
      monoperc: 25,
      max: 35,
      unit: "yrs",
    },
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 sm:mb-12"
        >
          <h2 className="font-[family-name:var(--font-poppins)] text-2xl sm:text-3xl lg:text-4xl font-bold text-solar-dark mb-3">
            Visual Comparison
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Key metrics compared at a glance , bar lengths represent relative
            performance.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-6 sm:space-y-8">
          {metrics.map((metric, i) => {
            const topconPct = (metric.topcon / metric.max) * 100;
            const monopercPct = (metric.monoperc / metric.max) * 100;

            return (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.12 }}
              >
                <div className="mb-2">
                  <span className="text-sm font-semibold text-foreground">
                    {metric.label}
                  </span>
                  {metric.invertLabel && (
                    <span className="text-xs text-muted-foreground ml-1">
                      (lower is better)
                    </span>
                  )}
                </div>

                {/* TOPCon bar */}
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs font-medium text-solar-green w-16 sm:w-20 text-right shrink-0">
                    TOPCon
                  </span>
                  <div className="flex-1 h-8 bg-muted/50 rounded-lg overflow-hidden relative">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${topconPct}%` } : {}}
                      transition={{ duration: 0.8, delay: i * 0.12 + 0.2, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-solar-green to-solar-green-light rounded-lg flex items-center justify-end pr-2"
                    >
                      <span className="text-xs font-bold text-white drop-shadow-sm">
                        {metric.topcon}
                        {metric.unit}
                      </span>
                    </motion.div>
                  </div>
                </div>

                {/* MonoPERC bar */}
                <div className="flex items-center gap-3">
                  <span className="text-xs font-medium text-solar-gold w-16 sm:w-20 text-right shrink-0">
                    MonoPERC
                  </span>
                  <div className="flex-1 h-8 bg-muted/50 rounded-lg overflow-hidden relative">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${monopercPct}%` } : {}}
                      transition={{ duration: 0.8, delay: i * 0.12 + 0.35, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-solar-gold/80 to-solar-gold rounded-lg flex items-center justify-end pr-2"
                    >
                      <span className="text-xs font-bold text-white drop-shadow-sm">
                        {metric.monoperc}
                        {metric.unit}
                      </span>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-6 mt-8">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-gradient-to-r from-solar-green to-solar-green-light" />
            <span className="text-sm text-muted-foreground">TOPCon</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-gradient-to-r from-solar-gold/80 to-solar-gold" />
            <span className="text-sm text-muted-foreground">MonoPERC</span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Recommendations Section ────────────────────────────────────
function Recommendations() {
  const { recommendations } = compareContent;

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 sm:mb-12"
        >
          <h2 className="font-[family-name:var(--font-poppins)] text-2xl sm:text-3xl lg:text-4xl font-bold text-solar-dark mb-3">
            Which Module is Right for You?
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Our expert recommendations based on common project scenarios.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {recommendations.map((rec, i) => {
            const isTopcon = rec.winner === "topcon";
            const Icon = rec.icon;

            return (
              <motion.div
                key={rec.useCase}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="group"
              >
                <Card
                  className={`h-full overflow-hidden border-2 transition-all duration-300 ${
                    isTopcon
                      ? "border-solar-green/20 hover:border-solar-green/50 hover:shadow-lg hover:shadow-solar-green/10"
                      : "border-solar-gold/20 hover:border-solar-gold/50 hover:shadow-lg hover:shadow-solar-gold/10"
                  }`}
                >
                  {/* Top bar */}
                  <div
                    className={`h-1 ${
                      isTopcon
                        ? "bg-gradient-to-r from-solar-green to-solar-green-light"
                        : "bg-gradient-to-r from-solar-gold/80 to-solar-gold"
                    }`}
                  />

                  <CardContent className="p-5 sm:p-6">
                    <div className="flex items-center justify-between mb-3">
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          isTopcon
                            ? "bg-solar-green/10 text-solar-green"
                            : "bg-solar-gold/10 text-solar-gold"
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <span
                        className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full ${
                          isTopcon
                            ? "bg-solar-green/10 text-solar-green"
                            : "bg-solar-gold/10 text-solar-gold"
                        }`}
                      >
                        <Crown className="w-3 h-3" />
                        {isTopcon ? "TOPCon" : "MonoPERC"}
                      </span>
                    </div>

                    <h3 className="font-[family-name:var(--font-poppins)] text-base font-bold text-foreground mb-2">
                      {rec.useCase}
                    </h3>

                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {rec.reason}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── CTA Section ────────────────────────────────────────────────
function CTASection() {
  const { navigate } = useRouter();

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-solar-dark via-solar-dark-secondary to-solar-dark relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5" aria-hidden="true">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="cta-grid"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="30" cy="30" r="1" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#cta-grid)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-[family-name:var(--font-poppins)] text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
            Still Deciding? Talk to Our Experts
          </h2>
          <p className="text-white/70 text-base sm:text-lg max-w-xl mx-auto mb-8 leading-relaxed">
            Our solar engineers can help you choose the right module technology
            for your specific project requirements, location, and budget.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              onClick={() => navigate("contact")}
              size="lg"
              className="bg-solar-green hover:bg-solar-green-dark text-white rounded-lg px-8 h-12 text-base font-semibold shadow-lg shadow-solar-green/30 hover:shadow-xl hover:shadow-solar-green/40 transition-all w-full sm:w-auto"
            >
              <Phone className="w-4 h-4 mr-2" />
              Contact Our Team
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button
              variant="outlineOnDark"
              size="lg"
              className="rounded-lg px-8 h-12 text-base font-semibold w-full sm:w-auto"
            >
              <Download className="w-4 h-4 mr-2" />
              Download Datasheets
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Main Page Component ────────────────────────────────────────
export function ComparePage() {
  return (
    <>
      <CompareHero />
      <ProductCards />
      <CategoryTabsComparison />
      <VisualChart />
      <Recommendations />
      <CTASection />
    </>
  );
}
