import { mediaAssets as m } from "@/lib/media";
import { siteConfig } from "@/config/site";

/** Verified dealership / distributorship commercial content for the homepage. */
export const partnershipContent = {
  intro: {
    id: "business-partnership",
    eyebrow: "Business Partnership",
    number: "07",
    title: "Build your solar business with confidence.",
    subtitle:
      "Explore dealership and distributorship opportunities with structured investment, product pricing, business support and long-term growth potential.",
    primaryCta: "Explore Opportunity",
    primaryHref: "#partnership-requirements",
    secondaryCta: "Talk to Our Team",
    secondaryRoute: "contact" as const,
    image: m.home.about,
    imageAlt: "Adani Solar manufacturing and business partnership opportunity",
  },

  requirements: {
    id: "partnership-requirements",
    eyebrow: "Business Requirements",
    number: "08",
    title: "What you need to get started.",
    subtitle: "Clear space and infrastructure requirements for dealership and distributorship partners.",
    items: [
      {
        number: "01",
        label: "Dealership",
        value: "300–500 sq. ft.",
        detail: "Retail space",
      },
      {
        number: "02",
        label: "Distributorship",
        value: "500–800 sq. ft.",
        detail: "Business space",
      },
      {
        number: "03",
        label: "Infrastructure",
        value: "Electricity connection",
        detail: "With power backup",
      },
      {
        number: "04",
        label: "Shop Rent Support",
        value: "100%",
        detail: "Covered during agreement period",
      },
    ],
  },

  registration: {
    id: "partnership-registration",
    eyebrow: "Registration",
    number: "09",
    title: "Simple onboarding. Clear requirements.",
    subtitle: "Registration fees and documents required to begin the partnership process.",
    fees: [
      { label: "Dealer Registration", amount: "₹24,900" },
      { label: "Distributor Registration", amount: "₹39,500" },
    ],
    documentsTitle: "Documents Required",
    documents: [
      "Filled Registration Form",
      "GST Certificate",
      "Aadhaar Card",
      "PAN Card",
      "Bank Passbook Copy",
      "Electricity Bill",
      "Passport Size Photo",
    ],
  },

  support: {
    id: "partnership-support",
    eyebrow: "Business Support",
    number: "10",
    title: "Support built around your growth.",
    subtitle: "Staffing, showroom and marketing support designed to help partners scale with confidence.",
    staffing: {
      number: "01",
      label: "Skilled Staff",
      highlight: "3 skilled staff",
      value: "₹22,400",
      unit: "/ month",
      detail: "Per person · Company paid",
    },
    showroom: {
      number: "02",
      label: "Showroom Setup",
      value: "Interior + Exterior",
      detail: "Complete showroom setup support",
    },
    marketing: {
      number: "03",
      label: "Marketing Support",
      value: "Digital + Offline",
      detail: "Campaign support across major channels",
      channels: [
        "Television",
        "Radio",
        "Newspaper",
        "Hoardings",
        "Glow Sign Boards",
        "Google Campaigns",
        "Facebook Campaigns",
        "Pamphlets",
        "Promotional Materials",
      ],
    },
  },

  investment: {
    id: "partnership-investment",
    eyebrow: "Investment & Margin",
    number: "11",
    title: "Structured investment. Clear commercial upside.",
    subtitle: "Investment ranges and expected margins for dealership and distributorship partners.",
    plans: [
      {
        type: "Dealership",
        investment: "₹3–₹5 Lakhs",
        margin: "15%–20%",
      },
      {
        type: "Distributorship",
        investment: "₹5–₹8 Lakhs",
        margin: "25%–30%",
      },
    ],
    monthlyIncome: {
      label: "Expected Monthly Income",
      range: "₹60,000 – ₹3,00,000",
      note: "Depending on sales and location",
    },
    disclaimer:
      "Actual income may vary depending on sales performance, location, demand and operating conditions.",
  },

  payment: {
    id: "partnership-payment",
    eyebrow: "Payment Terms",
    number: "12",
    title: "Flexible commercial terms.",
    subtitle: "Advance, credit and EMI options subject to agreement and approval.",
    metrics: [
      { value: "50%", label: "Advance" },
      { value: "50%", label: "Credit" },
      { value: "90", unit: " Days", label: "Credit Period" },
      { value: "EMI", label: "Available" },
    ],
    note: "Credit and EMI facilities are subject to applicable approval and agreement terms.",
  },

  savings: {
    id: "partnership-savings",
    eyebrow: "Solar Savings",
    number: "13",
    title: "Turn sunlight into long-term savings.",
    highlights: [
      { label: "Government Subsidy", value: "Available" },
      { label: "Scheme", value: "PM Surya Ghar Yojana" },
      { label: "70–90%", value: "Potential electricity bill savings" },
    ],
    generationTitle: "Typical Generation",
    generation: [
      { capacity: "1 kW", output: "4–5 units / day" },
      { capacity: "2 kW", output: "8–10 units / day" },
      { capacity: "3 kW", output: "12–15 units / day" },
      { capacity: "5 kW", output: "20–30 units / day" },
      { capacity: "10 kW", output: "40–50 units / day" },
      { capacity: "1 MW", output: "4,000–5,000 units / day" },
    ],
    note:
      "Actual generation and savings vary by location, system configuration, weather and usage. Government subsidy is subject to eligibility and prevailing scheme guidelines.",
  },

  components: {
    id: "partnership-components",
    eyebrow: "Complete Solar System",
    number: "14",
    title: "Everything needed for a reliable installation.",
    subtitle: "Core system components partners supply as part of a complete solar solution.",
    items: [
      {
        number: "01",
        title: "Solar Panels",
        brands: "Mono PERC / Bifacial / TOPCon",
      },
      {
        number: "02",
        title: "Inverters",
        brands: "Solis / Growatt / GoodWe / Hitachi",
      },
      {
        number: "03",
        title: "DCDB & ACDB",
        brands: "System protection boards",
      },
      {
        number: "04",
        title: "Premium Cables",
        brands: "Polycab / Havells / Anchor",
      },
      {
        number: "05",
        title: "Mounting Structure",
        brands: "Site-ready structural kit",
      },
      {
        number: "06",
        title: "Earthing & Lightning Protection",
        brands: "Earthing kit · Lightning arrestor",
      },
    ],
  },

  warranty: {
    id: "partnership-warranty",
    eyebrow: "Long-Term Assurance",
    number: "15",
    title: "Warranty built for lasting confidence.",
    items: [
      { value: "25–30", unit: "Years", label: "Solar Panel Warranty" },
      { value: "5–10", unit: "Years", label: "Inverter Warranty" },
      { value: "5–10", unit: "Years", label: "Structure & Components" },
    ],
  },

  terms: {
    id: "partnership-terms",
    eyebrow: "Terms & Conditions",
    number: "16",
    title: "Important partnership information.",
    subtitle: "Key commercial and operational terms for dealership and distributorship partners.",
    items: [
      "Registration fee is refundable after onboarding process initiation.",
      "Prices may vary by 10–12% depending on location, logistics and market conditions.",
      "Product availability may vary based on stock and brand allocation.",
      "Subsidy is subject to government policies and eligibility criteria.",
      "Company provides marketing and operational support as per agreement terms.",
      "50% credit facility is subject to approval and timely payment compliance.",
      "Installation timelines depend on site conditions and approvals.",
      "Additional customization or site-specific requirements are charged separately.",
    ],
  },

  cta: {
    id: "partnership-cta",
    eyebrow: "Ready to Partner?",
    number: "17",
    title: "Build your solar business with us.",
    subtitle:
      "For dealership, distributorship, custom quotations or onboarding, connect with our team.",
    primaryCta: "Apply for Partnership",
    primaryHref: "#partnership-enquire",
    secondaryCta: "Request a Quotation",
    secondaryRoute: "contact" as const,
  },

  enquire: {
    id: "partnership-enquire",
    eyebrow: "Partnership Enquiry",
    number: "17B",
    title: "Submit your partnership application.",
    subtitle: "Share a few details and our team will guide you through the next steps.",
    office: {
      title: "Registered / Corporate Office",
      company: siteConfig.legalName,
      lines: [
        "Adani Corporate House",
        "Shantigram",
        "Near Vaishno Devi Circle",
        "S.G. Highway",
        "Khodiyar",
        "Ahmedabad – 382421",
        "Gujarat",
      ],
      email: siteConfig.contact.email,
    },
  },

  anchorNav: [
    { label: "Overview", href: "#business-partnership" },
    { label: "Requirements", href: "#partnership-requirements" },
    { label: "Support", href: "#partnership-support" },
    { label: "Investment", href: "#partnership-investment" },
    { label: "Terms", href: "#partnership-terms" },
    { label: "Apply", href: "#partnership-enquire" },
  ],

  interestedInOptions: ["Dealership", "Distributorship"] as const,
  businessTypeOptions: ["Partnership", "Proprietorship"] as const,
} as const;

export type PartnershipContent = typeof partnershipContent;
