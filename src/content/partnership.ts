import { mediaAssets as m } from "@/lib/media";
import { siteConfig } from "@/config/site";

/** Verified dealership / distributorship commercial content for the homepage. */
export const partnershipContent = {
  intro: {
    id: "business-partnership",
    eyebrow: "Business Partnership",
    number: "08",
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
    number: "09",
    title: "What you need to get started.",
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
    number: "10",
    title: "Simple onboarding. Clear requirements.",
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
    eyebrow: "Company Support",
    number: "11",
    title: "Support designed to help partners grow faster.",
    staffing: {
      title: "Staffing Support",
      highlight: "3 skilled staff",
      amount: "₹25,000 / month",
      detail: "Per person · Company paid",
    },
    showroom: {
      title: "Showroom Setup",
      description: "Complete interior and exterior setup",
    },
    marketing: {
      title: "Marketing & Branding",
      items: [
        "Television Advertising",
        "Radio Advertising",
        "Newspaper Advertising",
        "Hoardings",
        "Glow Sign Boards",
        "Google Campaigns",
        "Facebook Campaigns",
        "Pamphlets",
        "Promotional Materials",
      ],
    },
  },

  productRange: {
    id: "partnership-products",
    eyebrow: "Product Range",
    number: "12",
    title: "Solutions across every scale of solar.",
    subtitle: "Business portfolio overview for partners — complementary to our detailed product pages.",
    items: [
      { number: "01", title: "Mono Crystalline", detail: "High efficiency" },
      { number: "02", title: "Poly Crystalline", detail: "Cost effective" },
      { number: "03", title: "Bifacial", detail: "Dual-side power generation" },
      { number: "04", title: "Half-Cut", detail: "Improved performance in shade" },
      { number: "05", title: "Mega-Watt Projects", detail: "Large-scale solar solutions" },
    ],
  },

  investment: {
    id: "partnership-investment",
    eyebrow: "Investment & Margin",
    number: "13",
    title: "Structured investment. Clear commercial upside.",
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
    number: "14",
    title: "Flexible commercial terms.",
    metrics: [
      { value: "50%", label: "Advance" },
      { value: "50%", label: "Credit" },
      { value: "90", unit: " Days", label: "Credit Period" },
      { value: "EMI", label: "Available" },
    ],
    note: "Credit and EMI facilities are subject to applicable approval and agreement terms.",
  },

  pricing: {
    id: "partnership-pricing",
    eyebrow: "Pricing",
    number: "15",
    title: "Transparent partner and customer pricing.",
    panel: {
      title: "DCR Solar Panel Price List",
      subtitle: "Dealer / Distributor · Tax + Transportation Included",
      rows: [
        {
          power: "350W–400W",
          technology: "Mono PERC",
          dealer: "₹6,800–₹8,000",
          distributor: "₹5,950–₹7,000",
        },
        {
          power: "440W–450W",
          technology: "Mono PERC Half-Cut",
          dealer: "₹7,680–₹8,400",
          distributor: "₹6,720–₹7,350",
        },
        {
          power: "520W–550W",
          technology: "Mono Bifacial",
          dealer: "₹8,800–₹10,000",
          distributor: "₹7,700–₹8,750",
        },
        {
          power: "575W–600W",
          technology: "N-Type TOPCon",
          dealer: "₹9,600–₹11,200",
          distributor: "₹8,400–₹9,800",
        },
        {
          power: "610W–630W",
          technology: "TOPCon Bifacial",
          dealer: "₹9,760–₹11,040",
          distributor: "₹8,540–₹9,660",
        },
        {
          power: "650W+",
          technology: "TOPCon Latest",
          dealer: "₹10,920",
          distributor: "up to ₹9,555",
        },
      ],
    },
    turnkey: {
      title: "Customer Turnkey Pricing",
      subtitle: "Tax + Transportation + Installation Included",
      rows: [
        { power: "350W–400W", technology: "Mono PERC", price: "₹8,500–₹10,000" },
        { power: "440W–450W", technology: "Mono PERC Half-Cut", price: "₹9,600–₹10,500" },
        { power: "520W–550W", technology: "Mono Bifacial", price: "₹11,000–₹12,500" },
        { power: "575W–600W", technology: "N-Type TOPCon", price: "₹12,000–₹14,000" },
        { power: "610W–630W", technology: "TOPCon Bifacial", price: "₹12,200–₹13,800" },
        { power: "650W+", technology: "TOPCon Latest", price: "₹13,650" },
      ],
    },
    systems: {
      title: "Solar System Price List",
      subtitle: "Dealer / Distributor · Tax + Transportation Included",
      rows: [
        { capacity: "1 kW", dealer: "₹50,000", distributor: "₹42,000" },
        { capacity: "2 kW", dealer: "₹98,000", distributor: "₹84,000" },
        { capacity: "3 kW", dealer: "₹1,52,000", distributor: "₹1,26,000" },
        { capacity: "5 kW", dealer: "₹2,10,000", distributor: "₹1,80,000" },
        { capacity: "6 kW", dealer: "₹2,52,000", distributor: "₹2,16,000" },
        { capacity: "8 kW", dealer: "₹3,36,000", distributor: "₹2,88,000" },
        { capacity: "10 kW", dealer: "₹4,06,000", distributor: "₹3,48,000" },
        { capacity: "15 kW", dealer: "₹5,60,000", distributor: "₹4,80,000" },
        { capacity: "20 kW", dealer: "₹7,28,000", distributor: "₹6,24,000" },
        { capacity: "50 kW", dealer: "₹16,20,000", distributor: "₹14,40,000" },
      ],
    },
  },

  savings: {
    id: "partnership-savings",
    eyebrow: "Solar Savings",
    number: "16",
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
    number: "17",
    title: "Everything needed for a reliable installation.",
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
      {
        number: "07",
        title: "MC4 Connectors",
        brands: "Industry-standard connectors",
      },
    ],
  },

  warranty: {
    id: "partnership-warranty",
    eyebrow: "Long-Term Assurance",
    number: "18",
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
    number: "19",
    title: "Important partnership information.",
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
    number: "20",
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
    number: "20B",
    title: "Submit your partnership enquiry.",
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
    { label: "Investment", href: "#partnership-investment" },
    { label: "Pricing", href: "#partnership-pricing" },
    { label: "Savings", href: "#partnership-savings" },
    { label: "Components", href: "#partnership-components" },
    { label: "Warranty", href: "#partnership-warranty" },
    { label: "Terms", href: "#partnership-terms" },
    { label: "Enquire", href: "#partnership-enquire" },
  ],

  interestedInOptions: [
    "Dealership",
    "Distributorship",
    "Solar Project",
    "Product Purchase",
    "Other",
  ] as const,

  businessTypeOptions: ["Individual", "Proprietorship", "Partnership", "Private Limited", "Other"] as const,
  investmentRangeOptions: [
    "Under ₹3 Lakhs",
    "₹3–₹5 Lakhs",
    "₹5–₹8 Lakhs",
    "Above ₹8 Lakhs",
  ] as const,
  availableSpaceOptions: [
    "Under 300 sq. ft.",
    "300–500 sq. ft.",
    "500–800 sq. ft.",
    "Above 800 sq. ft.",
  ] as const,
} as const;

export type PartnershipContent = typeof partnershipContent;
