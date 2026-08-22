"use client";

import React from "react";
import { legalContent } from "@/content/legal";
import { LegalPage } from "@/components/legal/LegalPage";

export function TermsPage() {
  return (
    <main>
      <LegalPage
        title={legalContent.terms.title}
        lastUpdated={legalContent.terms.lastUpdated}
        sections={legalContent.terms.sections}
      />
    </main>
  );
}
