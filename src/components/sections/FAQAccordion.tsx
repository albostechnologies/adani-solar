"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { Plus, Minus } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  title: string;
  subtitle?: string;
  items: FAQItem[];
  variant?: "light" | "dark";
}

/**
 * FAQ Accordion section with smooth framer-motion AnimatePresence
 * expand/collapse, rotating +/- icons, and green accent for active items.
 */
export function FAQAccordion({
  title,
  subtitle,
  items,
  variant = "light",
}: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    const t = setTimeout(() => setPrefersReduced(mq.matches), 0);
    mq.addEventListener("change", handler);
    return () => {
      clearTimeout(t);
      mq.removeEventListener("change", handler);
    };
  }, []);

  const isDark = variant === "dark";
  const bgColor = isDark ? "bg-solar-dark grain-overlay" : "bg-white";
  const cardBg = isDark
    ? "bg-white/5 border-white/10"
    : "bg-white border-border";
  const cardHoverBg = isDark
    ? "hover:border-solar-green/30"
    : "hover:border-solar-green/30";
  const activeBorder = "border-solar-green/40";
  const questionColor = isDark ? "text-white" : "text-foreground";
  const answerColor = isDark ? "text-white/70" : "text-muted-foreground";
  const iconColor = isDark ? "text-solar-green-light" : "text-solar-green";

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className={`py-16 sm:py-20 lg:py-24 ${bgColor} relative`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          title={title}
          subtitle={subtitle}
          variant={variant}
        />

        <div className="mt-8 sm:mt-10 space-y-3">
          {items.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                className={`rounded-xl border transition-colors duration-300 overflow-hidden ${
                  isOpen ? activeBorder : `${cardBg} ${cardHoverBg}`
                } ${isDark && isOpen ? "bg-white/5" : ""}`}
              >
                <button
                  onClick={() => toggle(index)}
                  className="w-full flex items-center justify-between gap-4 p-4 sm:p-5 text-left group"
                  aria-expanded={isOpen}
                >
                  <span
                    className={`font-[family-name:var(--font-poppins)] text-sm sm:text-base font-semibold transition-colors duration-200 ${
                      isOpen ? iconColor : questionColor
                    } group-hover:${isDark ? "text-solar-green-light" : "text-solar-green"}`}
                  >
                    {item.question}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{
                      duration: prefersReduced ? 0 : 0.25,
                      ease: "easeInOut",
                    }}
                    className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-colors duration-200 ${
                      isOpen
                        ? "bg-solar-green text-white"
                        : isDark
                          ? "bg-white/10 text-white/70"
                          : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {isOpen ? (
                      <Minus className="w-3.5 h-3.5" />
                    ) : (
                      <Plus className="w-3.5 h-3.5" />
                    )}
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        height: {
                          duration: prefersReduced ? 0 : 0.3,
                          ease: "easeInOut",
                        },
                        opacity: {
                          duration: prefersReduced ? 0 : 0.2,
                          delay: 0.05,
                        },
                      }}
                      className="overflow-hidden"
                    >
                      <div
                        className={`px-4 sm:px-5 pb-4 sm:pb-5 text-sm sm:text-base leading-relaxed ${answerColor}`}
                      >
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
