"use client";

import React from "react";
import { legalContent } from "@/content/legal";
import { LegalPage } from "@/components/legal/LegalPage";

export function PrivacyPage() {
  return (
    <main>
      <LegalPage
        title={legalContent.privacy.title}
        lastUpdated={legalContent.privacy.lastUpdated}
        sections={legalContent.privacy.sections}
      />
    </main>
  );
}
