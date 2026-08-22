import { mediaAssets as m } from "@/lib/media";

export const homeContent = {
  hero: {
    title: "Energising India's Solar Dream",
    subtitle:
      "India's first and largest vertically integrated solar PV manufacturer , driving energy independence with Made in India solar solutions.",
    cta: "Explore Our Products",
    ctaRoute: "product-topcon" as const,
    secondaryCta: "Contact Us",
    secondaryCtaRoute: "contact" as const,
    backgroundImage: m.home.hero,
  },

  about: {
    sectionTitle: "About Adani Solar",
    title: "India's Largest Solar PV Manufacturer",
    description:
      "Adani Solar is the solar PV manufacturing arm of Adani Group , India's first and largest vertically integrated solar PV manufacturer. With a vision to make India self-reliant in solar manufacturing, we produce high-quality solar cells and modules at our state-of-the-art facility in Mundra, Gujarat.",
    highlight:
      "Our Mundra facility operates 4 GW of cells and modules and 2 GW of ingots and wafers, with a long-term vision for a 10 GW integrated solar manufacturing campus.",
    cta: "Know More",
    ctaRoute: "about" as const,
    image: m.home.about,
  },

  valueChain: {
    sectionTitle: "PV Value Chain",
    title: "Complete PV Value Chain Integration",
    subtitle:
      "From polysilicon to modules , our vertically integrated manufacturing ensures quality at every step.",
    steps: [
      {
        id: "polysilicon",
        title: "Polysilicon",
        description:
          "High-purity polysilicon production forming the foundation of our solar manufacturing value chain.",
        icon: "Layers",
        image: m.home.valueChain,
      },
      {
        id: "ingot-wafer",
        title: "Ingot & Wafer",
        description:
          "Precision ingot casting and wafer slicing to produce ultra-thin silicon wafers with exceptional quality.",
        icon: "Circle",
        image: m.about.facility,
      },
      {
        id: "cells",
        title: "Solar Cells",
        description:
          "Advanced cell manufacturing using TOPCon and MonoPERC technologies for maximum efficiency.",
        icon: "Sun",
        image: m.products.topcon,
      },
      {
        id: "modules",
        title: "Modules",
        description:
          "High-performance module assembly with cutting-edge technology for reliable, long-lasting solar power generation.",
        icon: "LayoutGrid",
        image: m.home.products,
      },
    ],
  },

  ancillaries: {
    sectionTitle: "Ancillaries",
    title: "Supporting the Solar Ecosystem",
    subtitle:
      "Our ancillary manufacturing capabilities ensure complete supply chain independence and quality control.",
    items: [
      {
        title: "Aluminum Frames",
        description:
          "Precision-engineered aluminum frames for module structural integrity and longevity.",
        image: m.home.hero,
      },
      {
        title: "Solar Glass",
        description:
          "High-transmission, low-iron tempered solar glass for maximum light absorption.",
        image: m.home.products,
      },
      {
        title: "EVA Encapsulant",
        description:
          "Premium EVA encapsulant films ensuring superior cell protection and weather resistance.",
        image: m.home.valueChain,
      },
      {
        title: "Back Sheets",
        description:
          "High-performance back sheets providing critical moisture barrier and electrical insulation.",
        image: m.home.about,
      },
      {
        title: "Junction Boxes",
        description:
          "IP67-rated junction boxes with bypass diodes for safe and efficient power output.",
        image: m.products.topcon,
      },
    ],
  },

  products: {
    sectionTitle: "Our Products",
    title: "High-Performance Solar Solutions",
    subtitle:
      "Choose from our range of advanced solar modules designed for maximum energy generation.",
    tabs: [
      {
        id: "topcon",
        label: "TOPCon",
        title: "TOPCon Modules",
        subtitle:
          "Next-generation Tunnel Oxide Passivated Contact technology for superior efficiency and performance.",
        features: [
          "Up to 22.5% module efficiency",
          "Better temperature coefficient",
          "Superior low-light performance",
          "Reduced LID (Light Induced Degradation)",
          "30-year performance warranty",
          "Bifacial power generation",
        ],
        powerRange: "570W – 590W",
        efficiency: "Up to 22.5%",
        image: m.products.topcon,
      },
      {
        id: "monoperc",
        label: "MonoPERC",
        title: "MonoPERC Modules",
        subtitle:
          "Passivated Emitter and Rear Cell technology , proven, reliable, and cost-effective solar solution.",
        features: [
          "Up to 21.3% module efficiency",
          "Proven field performance",
          "Excellent reliability record",
          "Low degradation rate",
          "25-year performance warranty",
          "Wide power range options",
        ],
        powerRange: "390W – 545W",
        efficiency: "Up to 21.3%",
        image: m.products.monoperc,
      },
    ],
    details: {
      topcon: {
        type: "topcon" as const,
        name: "TOPCon Bifacial Modules",
        tagline:
          "Tunnel Oxide Passivated Contact technology , engineered for maximum energy yield and 30-year bankable performance.",
        heroImage: m.products.topcon,
        keySpecs: [
          { label: "Power Range", value: "570W – 590W" },
          { label: "Module Efficiency", value: "Up to 22.5%" },
          { label: "Cell Technology", value: "N-type TOPCon" },
          { label: "Bifaciality", value: "Up to 80%" },
          { label: "Temp. Coefficient", value: "-0.29%/°C" },
          { label: "Product Warranty", value: "12 years" },
          { label: "Performance Warranty", value: "30 years (87.4%)" },
          { label: "Frame", value: "Anodised aluminium" },
        ],
        highlights: [
          {
            icon: "Sun",
            title: "Superior Low-Light Yield",
            description:
              "N-type TOPCon cells deliver 3–5% more energy per watt in early morning, late evening and cloudy conditions compared to P-type PERC.",
          },
          {
            icon: "Shield",
            title: "Lower Degradation",
            description:
              "No LID and no LeTID , first-year degradation under 1% with only 0.4% annual degradation thereafter for bankable, predictable energy harvest.",
          },
          {
            icon: "TrendingUp",
            title: "Bifacial Energy Gain",
            description:
              "Up to 80% bifaciality factor adds 5–25% extra energy from the rear side depending on ground albedo and mounting height.",
          },
          {
            icon: "Thermometer",
            title: "Better Heat Performance",
            description:
              "Industry-leading -0.29%/°C temperature coefficient retains more output in India's hot climatic conditions.",
          },
        ],
        specGroups: [
          {
            title: "Electrical Parameters (at STC)",
            specs: [
              { parameter: "Rated Power (Pmax)", value: "590 Wp" },
              { parameter: "Voltage at Pmax (Vmp)", value: "43.2 V" },
              { parameter: "Current at Pmax (Imp)", value: "13.66 A" },
              { parameter: "Open Circuit Voltage (Voc)", value: "51.6 V" },
              { parameter: "Short Circuit Current (Isc)", value: "14.52 A" },
              { parameter: "Module Efficiency", value: "22.5%" },
              { parameter: "Power Tolerance", value: "0 ~ +5 W" },
              { parameter: "Max System Voltage", value: "1500 V DC" },
            ],
          },
          {
            title: "Mechanical Parameters",
            specs: [
              { parameter: "Cell Type", value: "N-type TOPCon" },
              { parameter: "Cell Arrangement", value: "144 (6×24)" },
              { parameter: "Module Dimensions", value: "2384 × 1303 × 35 mm" },
              { parameter: "Weight", value: "32.6 kg" },
              { parameter: "Glass", value: "3.2 mm AR-coated tempered" },
              { parameter: "Backsheet", value: "Transparent (bifacial)" },
              { parameter: "Frame", value: "Anodised aluminium" },
              { parameter: "Junction Box", value: "IP68, 3 bypass diodes" },
            ],
          },
          {
            title: "Thermal Parameters",
            specs: [
              { parameter: "Temperature Coefficient Pmax", value: "-0.29%/°C" },
              { parameter: "Temperature Coefficient Voc", value: "-0.26%/°C" },
              { parameter: "Temperature Coefficient Isc", value: "+0.04%/°C" },
              { parameter: "NOCT", value: "44 ± 2 °C" },
              { parameter: "Operating Temperature", value: "-40 to +85 °C" },
            ],
          },
          {
            title: "Warranty & Certifications",
            specs: [
              { parameter: "Product Warranty", value: "12 years" },
              { parameter: "Performance Warranty", value: "30 years (87.4%)" },
              { parameter: "1st Year Degradation", value: "≤ 1%" },
              { parameter: "Annual Degradation", value: "≤ 0.4%/yr" },
              { parameter: "Certifications", value: "BIS, IEC 61215, IEC 61730, IEC 62804, IEC 61701, IEC 62716, ALMM" },
            ],
          },
        ],
        performanceCurve: [
          { year: 1, output: 99 },
          { year: 5, output: 97.4 },
          { year: 10, output: 95.4 },
          { year: 15, output: 93.4 },
          { year: 20, output: 91.4 },
          { year: 25, output: 89.4 },
          { year: 30, output: 87.4 },
        ],
        datasheetName: "Adani-Solar-TOPCon-Datasheet.pdf",
      },
      monoperc: {
        type: "monoperc" as const,
        name: "MonoPERC Modules",
        tagline:
          "Passivated Emitter Rear Cell technology , a proven, reliable and cost-effective solar solution trusted across millions of rooftops.",
        heroImage: m.products.monoperc,
        keySpecs: [
          { label: "Power Range", value: "390W – 545W" },
          { label: "Module Efficiency", value: "Up to 21.3%" },
          { label: "Cell Technology", value: "P-type MonoPERC" },
          { label: "Bifaciality", value: "Up to 70%" },
          { label: "Temp. Coefficient", value: "-0.35%/°C" },
          { label: "Product Warranty", value: "10 years" },
          { label: "Performance Warranty", value: "25 years (84.8%)" },
          { label: "Frame", value: "Anodised aluminium" },
        ],
        highlights: [
          {
            icon: "Sun",
            title: "Proven Field Performance",
            description:
              "Over 4 GW of MonoPERC modules deployed across India and 20+ export markets with bankable, well-characterised field performance.",
          },
          {
            icon: "Shield",
            title: "Excellent Reliability",
            description:
              "Rigorous PID, salt-mist, ammonia and hail testing per IEC standards , built for India's monsoon, coastal and desert environments.",
          },
          {
            icon: "Wallet",
            title: "Optimised Cost",
            description:
              "Mature PERC manufacturing at scale delivers the lowest ₹/W for residential and commercial rooftop projects without sacrificing quality.",
          },
          {
            icon: "Layers",
            title: "Wide Power Range",
            description:
              "Available from 390W to 545W across 60-cell, 72-cell and 144-half-cut formats , fits any rooftop or ground-mount design.",
          },
        ],
        specGroups: [
          {
            title: "Electrical Parameters (at STC)",
            specs: [
              { parameter: "Rated Power (Pmax)", value: "545 Wp" },
              { parameter: "Voltage at Pmax (Vmp)", value: "41.6 V" },
              { parameter: "Current at Pmax (Imp)", value: "13.11 A" },
              { parameter: "Open Circuit Voltage (Voc)", value: "49.8 V" },
              { parameter: "Short Circuit Current (Isc)", value: "13.92 A" },
              { parameter: "Module Efficiency", value: "21.3%" },
              { parameter: "Power Tolerance", value: "0 ~ +5 W" },
              { parameter: "Max System Voltage", value: "1500 V DC" },
            ],
          },
          {
            title: "Mechanical Parameters",
            specs: [
              { parameter: "Cell Type", value: "P-type MonoPERC" },
              { parameter: "Cell Arrangement", value: "144 (6×24 half-cut)" },
              { parameter: "Module Dimensions", value: "2278 × 1134 × 35 mm" },
              { parameter: "Weight", value: "27.5 kg" },
              { parameter: "Glass", value: "3.2 mm AR-coated tempered" },
              { parameter: "Backsheet", value: "TPT / KPK" },
              { parameter: "Frame", value: "Anodised aluminium" },
              { parameter: "Junction Box", value: "IP68, 3 bypass diodes" },
            ],
          },
          {
            title: "Thermal Parameters",
            specs: [
              { parameter: "Temperature Coefficient Pmax", value: "-0.35%/°C" },
              { parameter: "Temperature Coefficient Voc", value: "-0.29%/°C" },
              { parameter: "Temperature Coefficient Isc", value: "+0.05%/°C" },
              { parameter: "NOCT", value: "45 ± 2 °C" },
              { parameter: "Operating Temperature", value: "-40 to +85 °C" },
            ],
          },
          {
            title: "Warranty & Certifications",
            specs: [
              { parameter: "Product Warranty", value: "10 years" },
              { parameter: "Performance Warranty", value: "25 years (84.8%)" },
              { parameter: "1st Year Degradation", value: "≤ 2%" },
              { parameter: "Annual Degradation", value: "≤ 0.55%/yr" },
              { parameter: "Certifications", value: "BIS, IEC 61215, IEC 61730, IEC 62804, IEC 61701, ALMM" },
            ],
          },
        ],
        performanceCurve: [
          { year: 1, output: 98 },
          { year: 5, output: 95.8 },
          { year: 10, output: 93.05 },
          { year: 15, output: 90.3 },
          { year: 20, output: 87.55 },
          { year: 25, output: 84.8 },
        ],
        datasheetName: "Adani-Solar-MonoPERC-Datasheet.pdf",
      },
    },
  },

  askExpert: {
    sectionTitle: "Ask Our Expert",
    title: "Get Expert Solar Advice",
    subtitle:
      "Have questions about solar modules, installation, or our products? Our experts are here to help.",
  },

  exportManufacturing: {
    sectionTitle: "Export Oriented Manufacturing",
    title: "Powering the World with Made in India Solar",
    subtitle:
      "Adani Solar exports to over 20 countries, contributing to global clean energy adoption while strengthening India's position as a solar manufacturing hub.",
    regions: [
      { name: "Europe", countries: "Germany, Spain, Netherlands, Italy" },
      { name: "Americas", countries: "USA, Brazil, Canada, Mexico" },
      { name: "Asia Pacific", countries: "Japan, Australia, South Korea" },
      { name: "Middle East & Africa", countries: "UAE, Saudi Arabia, South Africa" },
    ],
    image: m.home.exportMap,
  },

  trustBadges: {
    sectionTitle: "Certifications & Recognitions",
    title: "Globally Certified, Trusted Worldwide",
    subtitle:
      "Our products meet the highest international quality, safety and sustainability standards.",
    badges: [
      { name: "ISO 9001:2015", description: "Quality Management" },
      { name: "ISO 14001", description: "Environmental Management" },
      { name: "BIS Certified", description: "Bureau of Indian Standards" },
      { name: "ALMM Listed", description: "Approved List of Models & Mfrs" },
      { name: "Kiwa PVEL Top Performer", description: "Reliability Tested" },
      { name: "Bloomberg Tier-1", description: "Bankability Rated" },
    ],
  },

  faq: {
    sectionTitle: "FAQ",
    title: "Frequently Asked Questions",
    subtitle:
      "Everything you need to know about Adani Solar , from products and manufacturing to installation and warranties.",
    items: [
      {
        question: "What types of solar modules does Adani Solar manufacture?",
        answer:
          "Adani Solar manufactures two flagship product lines , TOPCon bifacial modules and MonoPERC modules. Both are produced at our integrated Mundra facility.",
      },
      {
        question: "What makes TOPCon technology superior to PERC?",
        answer:
          "TOPCon uses N-type silicon which eliminates Light-Induced Degradation (LID) and LeTID, delivering 3-5% more energy per watt in low-light conditions. It also offers a better temperature coefficient (-0.29%/°C vs -0.35%/°C), higher bifaciality (up to 80%), and a 30-year performance warranty compared to 25 years for PERC.",
      },
      {
        question: "Where is the Adani Solar manufacturing plant located?",
        answer:
          "Our integrated solar PV manufacturing facility is located in Mundra, Gujarat, India , one of India's largest solar manufacturing locations, with 4 GW of cells and modules capacity and a roadmap toward a 10 GW integrated campus.",
      },
      {
        question: "Which countries does Adani Solar export to?",
        answer:
          "Adani Solar exports to over 20 countries across four continents , including Germany, Spain, Netherlands, and Italy in Europe; USA, Brazil, and Canada in the Americas; Japan, Australia, and South Korea in Asia Pacific; and UAE, Saudi Arabia, and South Africa in the Middle East & Africa.",
      },
      {
        question: "What certifications do Adani Solar modules carry?",
        answer:
          "Our modules are certified to ISO 9001:2015, ISO 14001, BIS (Bureau of Indian Standards), and are listed on ALMM (Approved List of Models & Manufacturers). They meet IEC 61215, IEC 61730, IEC 62804, IEC 61701, and IEC 62716 standards. Adani Solar is also recognised as a BloombergNEF Tier-1 manufacturer and a Kiwa PVEL Top Performer.",
      },
      {
        question: "What warranty do Adani Solar modules offer?",
        answer:
          "TOPCon modules come with a 12-year product warranty and 30-year linear performance warranty (87.4% at year 30). MonoPERC modules carry a 10-year product warranty and 25-year linear performance warranty (84.8% at year 25). First-year degradation for TOPCon is ≤1%, and annual degradation is ≤0.4%/year.",
      },
      {
        question: "How do I become a channel partner or EPC distributor?",
        answer:
          "Adani Solar works with channel partners and EPC distributors across India. To explore partnership opportunities, visit our Contact page. Our team can guide you through enquiry and onboarding requirements.",
      },
      {
        question: "Can Adani Solar modules withstand India's extreme weather?",
        answer:
          "Yes. Our modules undergo rigorous PID, salt-mist, ammonia, and hail testing per IEC standards. They are designed to perform in India's diverse climates , from the intense heat of Rajasthan and Gujarat to the high humidity and monsoon conditions of coastal regions, and the cold temperatures of Himalayan installations.",
      },
      {
        question: "What is the typical payback period for a rooftop solar system?",
        answer:
          "For most residential and commercial rooftop installations in India, the payback period ranges from 3 to 6 years depending on your state's solar irradiance, electricity tariff, available subsidies, and system size. TOPCon modules typically achieve 6-12 months shorter payback than PERC due to higher energy yield.",
      },
      {
        question: "Does Adani Solar offer installation services?",
        answer:
          "Adani Solar primarily manufactures and supplies solar modules. Installation is handled by our extensive network of certified EPC partners and channel partners across India. We can connect you with a trusted installer in your region , reach out through our Contact page for assistance.",
      },
    ],
  },

  sustainability: {
    sectionTitle: "Sustainability Businesses",
    title: "Powering a Sustainable Future",
    subtitle:
      "As part of the Adani Group, we are committed to creating a sustainable future through clean energy manufacturing and responsible business practices.",
    businesses: [
      {
        title: "Solar Manufacturing",
        description: "India's largest integrated solar PV manufacturer",
        image: m.home.plantAerial,
      },
      {
        title: "Wind Energy",
        description: "Comprehensive wind energy solutions across India",
        image: m.whySolar.grid,
      },
      {
        title: "Green Hydrogen",
        description: "Pioneering green hydrogen production in India",
        image: m.whySolar.carbon,
      },
      {
        title: "Battery Storage",
        description: "Advanced energy storage for grid stability",
        image: m.whySolar.savings,
      },
    ],
  },
} as const;

export type HomeContent = typeof homeContent;
