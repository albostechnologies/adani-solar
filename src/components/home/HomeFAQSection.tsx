"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { homeContent } from "@/content/home";
import { SectionEyebrow } from "@/components/editorial/SectionEyebrow";
import { EditorialHeading } from "@/components/editorial/EditorialHeading";
import { ArrowLink } from "@/components/editorial/ArrowLink";

const PREVIEW_COUNT = 4;

export function HomeFAQSection() {
  const c = homeContent.faq;
  const items = c.items.slice(0, PREVIEW_COUNT);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="editorial-section bg-[#f7f7f5]">
      <div className="editorial-section-inner max-w-4xl">
        <SectionEyebrow number="FAQ" label="Questions" className="mb-6" />
        <EditorialHeading size="statement" className="mb-10 sm:mb-12">
          {c.title}
        </EditorialHeading>

        <div className="divide-y divide-border/70">
          {items.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={item.question}>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-start justify-between gap-4 py-5 sm:py-6 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-solar-green focus-visible:ring-inset"
                >
                  <span className="font-[family-name:var(--font-poppins)] text-base sm:text-lg font-semibold text-foreground pr-4">
                    {item.question}
                  </span>
                  <span className="shrink-0 mt-1 text-solar-green" aria-hidden="true">
                    {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <p className="pb-5 sm:pb-6 editorial-body text-muted-foreground">{item.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        <div className="mt-8">
          <ArrowLink route="resources">View all FAQs</ArrowLink>
        </div>
      </div>
    </section>
  );
}
