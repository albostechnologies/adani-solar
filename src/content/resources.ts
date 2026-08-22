// ─── Resources / Download Center Content ─────────────────────────────────────

export interface ResourceCategory {
  id: string;
  name: string;
  description: string;
  icon: string; // lucide icon name
  color: string; // tailwind color class
}

export interface Resource {
  id: string;
  title: string;
  category: string; // matches category id
  description: string;
  fileType: "PDF" | "XLSX" | "PPTX";
  fileSize: string;
  version: string;
  lastUpdated: string;
  pages: number;
  featured: boolean;
  thumbnailGradient: [string, string]; // two colors for placeholder
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface ResourcesContent {
  hero: {
    title: string;
    subtitle: string;
    cta: string;
    ctaRoute: string;
  };
  categories: ResourceCategory[];
  resources: Resource[];
  featuredResources: string[];
  faqs: FAQ[];
}

export const resourcesContent: ResourcesContent = {
  hero: {
    title: "Resource Center",
    subtitle:
      "Access our comprehensive library of solar product documentation, technical specifications, and industry insights",
    cta: "Contact Sales",
    ctaRoute: "contact",
  },

  categories: [
    {
      id: "datasheets",
      name: "Product Datasheets",
      description: "Technical specifications for all module series",
      icon: "FileSpreadsheet",
      color: "solar-green",
    },
    {
      id: "brochures",
      name: "Company Brochures",
      description: "Corporate overviews and capability presentations",
      icon: "Presentation",
      color: "amber-500",
    },
    {
      id: "whitepapers",
      name: "Technical Whitepapers",
      description: "In-depth analysis and research papers",
      icon: "BookOpen",
      color: "purple-500",
    },
    {
      id: "guides",
      name: "Installation Guides",
      description: "Step-by-step installation and maintenance guides",
      icon: "Wrench",
      color: "cyan-500",
    },
    {
      id: "certifications",
      name: "Certifications & Compliance",
      description: "Quality certifications and test reports",
      icon: "ShieldCheck",
      color: "rose-500",
    },
  ],

  resources: [
    // ── Product Datasheets (5) ───────────────────────────────────
    {
      id: "ds-topcon-580",
      title: "TOPCon 580W Datasheet",
      category: "datasheets",
      description:
        "Complete technical specifications for the TOPCon 580W bifacial module including electrical parameters, mechanical data, and thermal characteristics.",
      fileType: "PDF",
      fileSize: "2.4 MB",
      version: "v3.2",
      lastUpdated: "2025-12-15",
      pages: 12,
      featured: true,
      thumbnailGradient: ["#00a651", "#00c965"],
    },
    {
      id: "ds-topcon-590",
      title: "TOPCon 590W Datasheet",
      category: "datasheets",
      description:
        "Technical specifications for the flagship TOPCon 590W module with 22.5% efficiency, advanced bifacial technology, and 30-year linear warranty.",
      fileType: "PDF",
      fileSize: "2.6 MB",
      version: "v2.8",
      lastUpdated: "2025-11-20",
      pages: 12,
      featured: true,
      thumbnailGradient: ["#00a651", "#00d474"],
    },
    {
      id: "ds-monoperc-545",
      title: "MonoPERC 545W Datasheet",
      category: "datasheets",
      description:
        "Detailed specifications for the MonoPERC 545W module featuring proven PERC cell technology, half-cut design, and excellent low-light performance.",
      fileType: "PDF",
      fileSize: "2.1 MB",
      version: "v4.1",
      lastUpdated: "2025-10-30",
      pages: 10,
      featured: false,
      thumbnailGradient: ["#f59e0b", "#fbbf24"],
    },
    {
      id: "ds-monoperc-555",
      title: "MonoPERC 555W Datasheet",
      category: "datasheets",
      description:
        "Technical data for the MonoPERC 555W high-power module with multi-busbar design, PID resistance, and enhanced mechanical load rating.",
      fileType: "PDF",
      fileSize: "2.2 MB",
      version: "v3.5",
      lastUpdated: "2025-10-28",
      pages: 10,
      featured: false,
      thumbnailGradient: ["#f59e0b", "#d97706"],
    },
    {
      id: "ds-bifacial-comparison",
      title: "Bifacial Module Comparison Sheet",
      category: "datasheets",
      description:
        "Side-by-side comparison of all bifacial module offerings including TOPCon and MonoPERC series with efficiency, wattage, and cost-per-watt analysis.",
      fileType: "XLSX",
      fileSize: "1.8 MB",
      version: "v2.0",
      lastUpdated: "2025-12-01",
      pages: 6,
      featured: true,
      thumbnailGradient: ["#10b981", "#34d399"],
    },

    // ── Company Brochures (3) ───────────────────────────────────
    {
      id: "br-corporate-2026",
      title: "Corporate Overview 2026",
      category: "brochures",
      description:
        "Comprehensive corporate profile covering Adani Solar's manufacturing capacity, strategic vision, leadership team, and expansion roadmap for 2026 and beyond.",
      fileType: "PDF",
      fileSize: "8.4 MB",
      version: "v1.0",
      lastUpdated: "2026-01-10",
      pages: 32,
      featured: true,
      thumbnailGradient: ["#f59e0b", "#92400e"],
    },
    {
      id: "br-manufacturing",
      title: "Manufacturing Capabilities",
      category: "brochures",
      description:
        "Detailed overview of our 10 GW integrated manufacturing facility at Mundra, Gujarat , from polysilicon to modules with world-class quality controls.",
      fileType: "PDF",
      fileSize: "6.2 MB",
      version: "v2.3",
      lastUpdated: "2025-09-15",
      pages: 24,
      featured: false,
      thumbnailGradient: ["#d97706", "#f59e0b"],
    },
    {
      id: "br-sustainability-2025",
      title: "Sustainability Report 2025",
      category: "brochures",
      description:
        "Annual sustainability report detailing carbon reduction achievements, water conservation, community impact programs, and ESG performance metrics.",
      fileType: "PDF",
      fileSize: "12.1 MB",
      version: "v1.0",
      lastUpdated: "2025-08-22",
      pages: 48,
      featured: false,
      thumbnailGradient: ["#84cc16", "#22c55e"],
    },

    // ── Technical Whitepapers (3) ───────────────────────────────
    {
      id: "wp-topcon-vs-perc",
      title: "TOPCon vs PERC Technology Analysis",
      category: "whitepapers",
      description:
        "In-depth comparative analysis of TOPCon and PERC cell architectures covering efficiency ceilings, degradation profiles, temperature coefficients, and LCOE impact.",
      fileType: "PDF",
      fileSize: "4.7 MB",
      version: "v1.5",
      lastUpdated: "2025-11-08",
      pages: 18,
      featured: false,
      thumbnailGradient: ["#a855f7", "#7c3aed"],
    },
    {
      id: "wp-degradation-study",
      title: "Degradation Study 2025",
      category: "whitepapers",
      description:
        "Long-term field degradation study across 50+ installations in Indian climatic zones, validating linear warranty claims and identifying failure modes.",
      fileType: "PDF",
      fileSize: "3.9 MB",
      version: "v1.2",
      lastUpdated: "2025-07-19",
      pages: 22,
      featured: false,
      thumbnailGradient: ["#9333ea", "#a855f7"],
    },
    {
      id: "wp-market-outlook-2026",
      title: "India Solar Market Outlook 2026",
      category: "whitepapers",
      description:
        "Comprehensive market analysis covering policy landscape, capacity addition forecasts, module price trends, and domestic manufacturing opportunity through 2026.",
      fileType: "PDF",
      fileSize: "5.3 MB",
      version: "v1.0",
      lastUpdated: "2025-12-20",
      pages: 28,
      featured: false,
      thumbnailGradient: ["#7c3aed", "#6d28d9"],
    },

    // ── Installation Guides (2) ────────────────────────────────
    {
      id: "ig-installation-manual",
      title: "Module Installation Manual",
      category: "guides",
      description:
        "Comprehensive installation guide covering site preparation, mounting systems, wiring, grounding, safety protocols, and commissioning checklists.",
      fileType: "PDF",
      fileSize: "7.8 MB",
      version: "v5.0",
      lastUpdated: "2025-11-25",
      pages: 40,
      featured: false,
      thumbnailGradient: ["#06b6d4", "#0891b2"],
    },
    {
      id: "ig-om-best-practices",
      title: "O&M Best Practices Guide",
      category: "guides",
      description:
        "Operations and maintenance best practices including inspection schedules, cleaning protocols, performance monitoring, and troubleshooting guides.",
      fileType: "PDF",
      fileSize: "5.1 MB",
      version: "v3.2",
      lastUpdated: "2025-10-05",
      pages: 36,
      featured: false,
      thumbnailGradient: ["#22d3ee", "#06b6d4"],
    },

    // ── Certifications & Compliance (2) ────────────────────────
    {
      id: "cert-bis-almm",
      title: "BIS & ALMM Certification",
      category: "certifications",
      description:
        "Complete documentation of Bureau of Indian Standards certification and Approved List of Models & Modules compliance for all Adani Solar module series.",
      fileType: "PDF",
      fileSize: "3.4 MB",
      version: "v2.1",
      lastUpdated: "2025-12-10",
      pages: 16,
      featured: false,
      thumbnailGradient: ["#f43f5e", "#e11d48"],
    },
    {
      id: "cert-iec-61215",
      title: "IEC 61215 Test Reports",
      category: "certifications",
      description:
        "International Electrotechnical Commission design qualification test reports confirming compliance with IEC 61215, IEC 61730, and IEC 62941 standards.",
      fileType: "PDF",
      fileSize: "4.2 MB",
      version: "v1.8",
      lastUpdated: "2025-09-30",
      pages: 20,
      featured: false,
      thumbnailGradient: ["#fb7185", "#f43f5e"],
    },
  ],

  featuredResources: [
    "ds-topcon-580",
    "ds-topcon-590",
    "ds-bifacial-comparison",
    "br-corporate-2026",
  ],

  faqs: [
    {
      question: "How do I request custom specifications for my project?",
      answer:
        "You can request custom specifications by contacting our sales team through the Contact page or by emailing sales@adanisolar.com. Our engineering team will work with you to provide tailored datasheets and performance data specific to your project requirements, including site-specific yield estimates and configuration recommendations.",
    },
    {
      question: "Are datasheets available in languages other than English?",
      answer:
        "Yes, we provide datasheets in multiple languages including Hindi, Spanish, Portuguese, and Arabic for key markets. Additional translations can be arranged upon request. Contact your regional sales manager for availability in your preferred language.",
    },
    {
      question: "How often are documents updated?",
      answer:
        "Product datasheets are updated whenever there is a significant specification change or at minimum every quarter. Whitepapers and technical documents are reviewed bi-annually. All documents display their version number and last-updated date so you can ensure you have the latest information. We recommend subscribing to our newsletter for update notifications.",
    },
    {
      question: "Can I get NDA-protected technical data for advanced evaluation?",
      answer:
        "Yes, we offer detailed proprietary technical data under a Non-Disclosure Agreement for qualified partners, EPC contractors, and project developers. This includes detailed reliability test data, accelerated aging results, and cell-level characterization data. Contact our technical sales team to initiate the NDA process.",
    },
  ],
};
