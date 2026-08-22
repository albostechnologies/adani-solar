"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Award,
  BadgeCheck,
  ShieldCheck,
  Star,
  TrendingUp,
  Leaf,
  type LucideIcon,
} from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { ScrollReveal } from "@/components/ScrollReveal";

interface TrustBadge {
  name: string;
  description: string;
}

interface TrustBadgesProps {
  title: string;
  subtitle: string;
  badges: TrustBadge[];
}

const ICON_SET: LucideIcon[] = [
  BadgeCheck,
  Leaf,
  ShieldCheck,
  Award,
  Star,
  TrendingUp,
];

export function TrustBadges({ title, subtitle, badges }: TrustBadgesProps) {
  return (
    <ScrollReveal>
      <section className="py-12 sm:py-16 lg:py-20 bg-white border-y border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title={title} subtitle={subtitle} variant="light" />

          <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {badges.map((badge, idx) => {
              const Icon = ICON_SET[idx % ICON_SET.length];
              return (
                <motion.div
                  key={badge.name}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  className="flex flex-col items-center text-center gap-2 p-4 rounded-xl border border-border bg-solar-green/5 hover:bg-solar-green/10 hover:border-solar-green/30 hover:shadow-[0_0_15px_rgba(0,166,81,0.15)] transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-solar-green/20 to-solar-green/5 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-solar-green" />
                  </div>
                  <div>
                    <p className="font-[family-name:var(--font-poppins)] text-xs sm:text-sm font-semibold text-foreground leading-tight">
                      {badge.name}
                    </p>
                    <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5 leading-tight">
                      {badge.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </ScrollReveal>
  );
}
