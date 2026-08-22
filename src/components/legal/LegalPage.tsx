"use client";

import React from "react";

interface LegalSection {
  number: number;
  title: string;
  content: string;
}

interface LegalPageProps {
  title: string;
  lastUpdated: string;
  sections: LegalSection[];
}

export function LegalPage({ title, lastUpdated, sections }: LegalPageProps) {
  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 sm:mb-12">
          <h1 className="font-[family-name:var(--font-poppins)] text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3">
            {title}
          </h1>
          <p className="text-sm text-muted-foreground">
            Last Updated: {lastUpdated}
          </p>
          <div className="w-16 h-1 rounded-full bg-solar-green mt-4" />
        </div>

        {/* Sections */}
        <div className="space-y-8 sm:space-y-10">
          {sections.map((section) => (
            <article key={section.number}>
              <h2 className="font-[family-name:var(--font-poppins)] text-lg sm:text-xl font-semibold text-foreground mb-3">
                {section.number}. {section.title}
              </h2>
              <div className="text-sm sm:text-base leading-relaxed text-muted-foreground whitespace-pre-line">
                {section.content}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
