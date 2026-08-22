"use client";

import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { SectionHeading } from "./SectionHeading";
import { Check, GitCompare, ArrowRight } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { useRouter } from "@/lib/router";

interface ProductTab {
  id: string;
  label: string;
  title: string;
  subtitle: string;
  features: string[];
  powerRange: string;
  efficiency: string;
  image?: string;
}

interface ProductTabsProps {
  title: string;
  subtitle?: string;
  tabs: ProductTab[];
  variant?: "light" | "dark";
}

const COMPARISON_ROWS = [
  { label: "Cell Technology", topcon: "Tunnel Oxide Passivated Contact", monoperc: "Passivated Emitter Rear Cell" },
  { label: "Module Efficiency", topcon: "Up to 22.5%", monoperc: "Up to 21.3%" },
  { label: "Power Range", topcon: "570W – 590W", monoperc: "390W – 545W" },
  { label: "Temperature Coefficient", topcon: "-0.29%/°C", monoperc: "-0.35%/°C" },
  { label: "Bifaciality", topcon: "Up to 80%", monoperc: "Up to 70%" },
  { label: "Performance Warranty", topcon: "30 years (87.4%)", monoperc: "25 years (84.8%)" },
  { label: "Product Warranty", topcon: "12 years", monoperc: "10 years" },
  { label: "Best Use Case", topcon: "Utility-scale, bifacial gain", monoperc: "Rooftop & C&I, cost-optimised" },
  { label: "Price Range", topcon: "Premium", monoperc: "Mid-range" },
];

export function ProductTabs({
  title,
  subtitle,
  tabs,
  variant = "light",
}: ProductTabsProps) {
  const isDark = variant === "dark";
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});
  const [compareOpen, setCompareOpen] = useState(false);
  const { navigate } = useRouter();

  const goToDetail = (tabId: string) => {
    if (tabId === "topcon") navigate("product-topcon");
    else if (tabId === "monoperc") navigate("product-monoperc");
  };

  return (
    <section
      className={`py-16 sm:py-20 lg:py-24 ${isDark ? "bg-solar-dark" : "bg-white"}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title={title}
          subtitle={subtitle}
          variant={variant}
        />

        <Tabs defaultValue={tabs[0]?.id} className="mt-8 sm:mt-10">
          <TabsList className="mx-auto flex w-fit bg-solar-green/10 p-1 rounded-xl">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className="data-[state=active]:bg-solar-green data-[state=active]:text-white data-[state=active]:shadow-md px-8 py-3 text-sm font-semibold rounded-lg transition-all duration-300"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {tabs.map((tab) => (
            <TabsContent key={tab.id} value={tab.id} className="mt-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
                {/* Image */}
                <div className="rounded-2xl overflow-hidden aspect-[4/3] shadow-xl relative">
                  {!imgErrors[tab.id] && tab.image ? (
                    <Image
                      src={tab.image}
                      alt={`${tab.title} - Adani Solar product`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      onError={() => setImgErrors(prev => ({ ...prev, [tab.id]: true }))}
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-solar-green/10 to-solar-dark/10 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-20 h-20 rounded-full bg-solar-green/20 flex items-center justify-center mx-auto mb-3">
                          <svg viewBox="0 0 24 24" className="w-10 h-10 text-solar-green/60" fill="currentColor" aria-hidden="true">
                            <rect x="3" y="3" width="7" height="7" rx="1" />
                            <rect x="14" y="3" width="7" height="7" rx="1" />
                            <rect x="3" y="14" width="7" height="7" rx="1" />
                            <rect x="14" y="14" width="7" height="7" rx="1" />
                          </svg>
                        </div>
                        <p className="text-sm text-muted-foreground">{tab.title}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Details */}
                <div>
                  <h3
                    className={`font-[family-name:var(--font-poppins)] text-xl sm:text-2xl md:text-3xl font-bold mb-3 ${
                      isDark ? "text-white" : "text-foreground"
                    }`}
                  >
                    {tab.title}
                  </h3>
                  <p
                    className={`text-sm sm:text-base leading-relaxed mb-6 ${
                      isDark ? "text-white/70" : "text-muted-foreground"
                    }`}
                  >
                    {tab.subtitle}
                  </p>

                  {/* Key specs grid */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div
                      className={`rounded-xl p-5 ${
                        isDark
                          ? "bg-white/5 border border-white/10"
                          : "bg-solar-green/5 border border-solar-green/10"
                      }`}
                    >
                      <p
                        className={`text-xs mb-1.5 uppercase tracking-wider ${
                          isDark ? "text-white/50" : "text-muted-foreground"
                        }`}
                      >
                        Power Range
                      </p>
                      <p
                        className={`font-[family-name:var(--font-poppins)] font-bold text-lg ${
                          isDark ? "text-white" : "text-foreground"
                        }`}
                      >
                        {tab.powerRange}
                      </p>
                    </div>
                    <div
                      className={`rounded-xl p-5 ${
                        isDark
                          ? "bg-white/5 border border-white/10"
                          : "bg-solar-green/5 border border-solar-green/10"
                      }`}
                    >
                      <p
                        className={`text-xs mb-1.5 uppercase tracking-wider ${
                          isDark ? "text-white/50" : "text-muted-foreground"
                        }`}
                      >
                        Efficiency
                      </p>
                      <p
                        className={`font-[family-name:var(--font-poppins)] font-bold text-lg ${
                          isDark ? "text-white" : "text-foreground"
                        }`}
                      >
                        {tab.efficiency}
                      </p>
                    </div>
                  </div>

                  {/* Features with badges */}
                  <ul className="space-y-2.5">
                    {tab.features.map((feature, i) => (
                      <li
                        key={i}
                        className={`flex items-start gap-2.5 text-sm ${
                          isDark ? "text-white/70" : "text-muted-foreground"
                        }`}
                      >
                        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-solar-green/10 text-solar-green shrink-0 mt-0.5">
                          <Check className="w-3 h-3" />
                        </span>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* View detail CTA */}
                  <Button
                    onClick={() => goToDetail(tab.id)}
                    variant="outline"
                    className={`mt-6 rounded-lg px-5 h-11 text-sm font-semibold transition-all duration-300 group ${
                      isDark
                        ? "border-solar-green/40 text-solar-green-light hover:bg-solar-green/10 hover:text-white"
                        : "border-solar-green/40 text-solar-green hover:bg-solar-green/10"
                    }`}
                  >
                    View Full Details
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Compare Products button */}
        <div className="mt-10 flex justify-center">
          <Dialog open={compareOpen} onOpenChange={setCompareOpen}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className={`rounded-lg px-5 h-10 text-sm font-semibold transition-all duration-300 ${
                  isDark
                    ? "border-solar-green/40 text-solar-green-light hover:bg-solar-green/10 hover:text-white"
                    : "border-solar-green/40 text-solar-green hover:bg-solar-green/10"
                }`}
              >
                <GitCompare className="w-4 h-4 mr-2" />
                Compare Products
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-2xl">
              <DialogHeader>
                <DialogTitle className="font-[family-name:var(--font-poppins)] text-xl">
                  TOPCon vs MonoPERC , Side by Side
                </DialogTitle>
                <DialogDescription>
                  Compare our two flagship module technologies across the metrics
                  that matter for your project.
                </DialogDescription>
              </DialogHeader>

              <div className="overflow-x-auto -mx-2">
                <Table>
                  <TableHeader>
                    <TableRow className="border-border bg-solar-green/10 hover:bg-solar-green/10">
                      <TableHead className="h-12 text-xs uppercase tracking-wider text-foreground font-semibold">
                        Specification
                      </TableHead>
                      <TableHead className="h-12 text-xs uppercase tracking-wider text-solar-green font-bold">
                        TOPCon
                      </TableHead>
                      <TableHead className="h-12 text-xs uppercase tracking-wider text-foreground font-semibold">
                        MonoPERC
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {COMPARISON_ROWS.map((row) => (
                      <TableRow key={row.label} className="border-border">
                        <TableCell className="text-xs font-medium text-muted-foreground">
                          {row.label}
                        </TableCell>
                        <TableCell className="text-sm font-semibold text-foreground">
                          {row.topcon}
                        </TableCell>
                        <TableCell className="text-sm text-foreground">
                          {row.monoperc}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="rounded-lg bg-solar-green/5 border border-solar-green/15 p-4 text-xs text-muted-foreground">
                <span className="font-semibold text-solar-green">Tip:</span>{" "}
                Choose TOPCon for utility-scale projects with bifacial gain and
                high-temperature sites. Pick MonoPERC for cost-optimised rooftop
                and C&I installations.
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </section>
  );
}
