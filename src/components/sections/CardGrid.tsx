"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Sun,
  Zap,
  Leaf,
  Shield,
  DollarSign,
  Users,
  Globe,
  TreePine,
  TrendingUp,
  Settings,
  Layers,
  Circle,
  LayoutGrid,
  type LucideIcon,
} from "lucide-react";
import { SpotlightCard } from "@/components/SpotlightCard";

const iconMap: Record<string, LucideIcon> = {
  Sun,
  Zap,
  Leaf,
  Shield,
  DollarSign,
  Users,
  Globe,
  TreePine,
  TrendingUp,
  Settings,
  Layers,
  Circle,
  LayoutGrid,
};

interface CardItem {
  title: string;
  description: string;
  icon?: string;
  image?: string;
}

interface CardGridProps {
  items: CardItem[];
  variant?: "light" | "dark";
  columns?: 2 | 3 | 4;
  sectionTitle?: string;
  sectionSubtitle?: string;
}

export function CardGrid({
  items,
  variant = "light",
  columns = 3,
  sectionTitle,
  sectionSubtitle,
}: CardGridProps) {
  const isDark = variant === "dark";

  const gridCols = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <section className={`py-16 sm:py-20 lg:py-24 ${isDark ? "bg-solar-dark" : "bg-white relative grain-overlay-light"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {sectionTitle && (
          <div className="text-center mb-10 sm:mb-12">
            <h2
              className={`font-[family-name:var(--font-poppins)] text-2xl sm:text-3xl md:text-4xl font-bold mb-3 ${
                isDark ? "text-white" : "text-foreground"
              }`}
            >
              {sectionTitle}
            </h2>
            <div className="w-16 h-1 rounded-full bg-solar-green mx-auto mb-4" />
            {sectionSubtitle && (
              <p
                className={`text-base sm:text-lg max-w-2xl mx-auto ${
                  isDark ? "text-white/70" : "text-muted-foreground"
                }`}
              >
                {sectionSubtitle}
              </p>
            )}
          </div>
        )}

        <div className={`grid ${gridCols[columns]} gap-6 sm:gap-8`}>
          {items.map((item, index) => {
            const Icon = item.icon ? iconMap[item.icon] : null;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <SpotlightCard
                  color={
                    isDark
                      ? "rgba(0, 200, 120, 0.22)"
                      : "rgba(0, 166, 81, 0.18)"
                  }
                  className={`h-full rounded-xl p-6 transition-all duration-300 group hover:-translate-y-2 shimmer-border stat-card-premium ${
                    isDark
                      ? "bg-white/5 border border-white/10 hover:border-solar-green/40 shadow-sm hover:shadow-[0_12px_40px_rgba(0,166,81,0.15)]"
                      : "bg-white border border-border hover:border-solar-green/40 shadow-sm hover:shadow-[0_12px_40px_rgba(0,166,81,0.12)] animated-border"
                  }`}
                >
                  {Icon && (
                    <div
                      className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 ${
                        isDark
                          ? "bg-solar-green/20 text-solar-green-light group-hover:bg-solar-green/30 group-hover:shadow-lg group-hover:shadow-solar-green/20"
                          : "bg-solar-green/10 text-solar-green group-hover:bg-solar-green/20 group-hover:shadow-lg group-hover:shadow-solar-green/15"
                      }`}
                    >
                      <Icon className="w-6 h-6 transition-transform duration-300" />
                    </div>
                  )}
                  <h3
                    className={`font-[family-name:var(--font-poppins)] text-lg font-semibold mb-2 transition-colors duration-300 ${
                      isDark ? "text-white group-hover:text-solar-green-light" : "text-foreground group-hover:text-solar-green"
                    }`}
                  >
                    {item.title}
                  </h3>
                  <p
                    className={`text-sm leading-relaxed ${
                      isDark ? "text-white/60" : "text-muted-foreground"
                    }`}
                  >
                    {item.description}
                  </p>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
