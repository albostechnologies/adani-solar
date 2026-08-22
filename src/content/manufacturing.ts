import type { LucideIcon } from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────
export interface ProcessStep {
  title: string;
  description: string;
  icon: string;
  details: string[];
  imageGradient: [string, string];
}

export interface QualityMetric {
  label: string;
  value: number;
  unit: string;
  description: string;
  percentage: number;
}

export interface AutomationHighlight {
  title: string;
  description: string;
  icon: string;
}

// ─── Content ─────────────────────────────────────────────────────────
export const manufacturingContent = {
  hero: {
    title: "Manufacturing Excellence",
    subtitle:
      "From sand to solar — a journey of precision engineering at the world's largest solar PV manufacturing facility",
    primaryCta: { label: "Explore Process", route: "manufacturing" as const },
    secondaryCta: { label: "Download Brochure", route: "contact" as const },
  },

  overview: {
    title: "World-Class Facility at a Glance",
    subtitle:
      "Our Mundra integrated manufacturing complex is India's largest solar PV facility — spanning the entire value chain from polysilicon to modules.",
    stats: [
      {
        value: 10,
        unit: "GW",
        label: "Manufacturing Capacity",
        description: "Integrated cells + modules capacity",
      },
      {
        value: 2.5,
        unit: "GW",
        label: "Under Construction",
        description: "Capacity expansion in progress",
      },
      {
        value: 5000,
        unit: "+",
        label: "Employees",
        description: "Skilled workforce driving innovation",
      },
      {
        value: 500,
        unit: "+",
        label: "Acres",
        description: "Manufacturing campus at Mundra",
      },
      {
        value: 2016,
        unit: "",
        label: "Operational Since",
        description: "Years of manufacturing excellence",
      },
      {
        value: 20,
        unit: "+",
        label: "Countries Served",
        description: "Global export footprint",
      },
    ],
  },

  processSteps: [
    {
      title: "Polysilicon Production",
      description:
        "Purifying metallurgical-grade silicon to 99.9999% (6N) solar-grade polysilicon through the Siemens deposition process — the critical first step in the PV value chain.",
      icon: "Atom",
      details: [
        "6N purity (99.9999%) achieved via Siemens process",
        "Trichlorosilane (TCS) deposition at 1,100°C",
        "In-house polysilicon plant reduces supply risk",
        "Capacity aligned with downstream ingot demand",
      ],
      imageGradient: ["#0d9488", "#065f46"],
    },
    {
      title: "Ingot Casting",
      description:
        "Directional solidification produces multicrystalline ingots, while the Czochralski (CZ) process grows single-crystal mono ingots — each method optimized for different cell technologies.",
      icon: "Boxes",
      details: [
        "CZ process for mono-crystalline ingots",
        "Directional solidification for multi-crystalline",
        "Automated crucible loading and unloading",
        "Ingot weight up to 800 kg per charge",
      ],
      imageGradient: ["#059669", "#064e3b"],
    },
    {
      title: "Wafer Slicing",
      description:
        "Multi-wire saw cutting slices ingots into ultra-thin wafers at 180μm — balancing mechanical strength with maximum light absorption efficiency.",
      icon: "Scissors",
      details: [
        "180μm wafer thickness for optimal efficiency",
        "Multi-wire slurry saw technology",
        "Automated wafer handling to prevent micro-cracks",
        "Diamond wire sawing for mono wafers",
      ],
      imageGradient: ["#10b981", "#047857"],
    },
    {
      title: "Cell Processing",
      description:
        "Wafers undergo texturing, phosphorus doping, anti-reflective coating and metallization — producing TOPCon and MonoPERC cells with industry-leading efficiency.",
      icon: "Cpu",
      details: [
        "TOPCon: tunnel oxide passivated contact",
        "MonoPERC: passivated emitter rear cell",
        "PECVD anti-reflective coating deposition",
        "Screen-printed metallization with 5 busbars",
      ],
      imageGradient: ["#00a651", "#0d6e3f"],
    },
    {
      title: "Cell Testing & Binning",
      description:
        "Every cell undergoes IV curve measurement under simulated AM1.5G sunlight and is binned by efficiency class — ensuring consistent module performance.",
      icon: "Gauge",
      details: [
        "AM1.5G standard solar simulator testing",
        "IV curve measurement for each cell",
        "Efficiency-based binning (19–23% range)",
        "Reverse current and visual inspection checks",
      ],
      imageGradient: ["#34d399", "#059669"],
    },
    {
      title: "Module Assembly",
      description:
        "Cells are interconnected in strings, sandwiched between EVA encapsulant and tempered glass/backsheet, then laminated under vacuum — creating durable, weather-resistant modules.",
      icon: "LayoutGrid",
      details: [
        "String interconnection with 5BB / MBB design",
        "EVA encapsulant lamination at 150°C",
        "Tempered low-iron glass front sheet",
        "IP68-rated junction box installation",
      ],
      imageGradient: ["#22c55e", "#15803d"],
    },
    {
      title: "Quality Testing",
      description:
        "Comprehensive QA including electroluminescence (EL) imaging, flash testing, mechanical load testing and thermal cycling — ensuring zero-defect delivery.",
      icon: "ShieldCheck",
      details: [
        "EL imaging: zero micro-crack tolerance",
        "Flash test: power measurement per IEC 61215",
        "Mechanical load: 5,400 Pa front / 2,400 Pa rear",
        "Thermal cycling: –40°C to +85°C, 200 cycles",
      ],
      imageGradient: ["#16a34a", "#14532d"],
    },
    {
      title: "Packaging & Shipping",
      description:
        "Export-grade packaging protects modules through global logistics. Custom pallets and containers ship to 20+ countries across four continents.",
      icon: "Package",
      details: [
        "Custom palletized packaging for 30+ modules",
        "IEC-certified transport worthiness testing",
        "GPS-tracked logistics to 20+ countries",
        "Real-time shipment tracking dashboard",
      ],
      imageGradient: ["#4ade80", "#166534"],
    },
  ],

  qualityMetrics: [
    {
      label: "Yield Rate",
      value: 99.2,
      unit: "%",
      description: "Overall line yield — among the highest in the industry",
      percentage: 99.2,
    },
    {
      label: "Cell Efficiency",
      value: 22.8,
      unit: "%",
      description: "TOPCon cell efficiency — best-in-class for Indian manufacturing",
      percentage: 91.2,
    },
    {
      label: "Module Flash Test",
      value: 100,
      unit: "%",
      description: "Every module flash-tested to rated power before shipping",
      percentage: 100,
    },
    {
      label: "EL Imaging",
      value: 0,
      unit: "defects",
      description: "Zero-defect tolerance on electroluminescence inspection",
      percentage: 100,
    },
    {
      label: "Mechanical Load",
      value: 5400,
      unit: "Pa",
      description: "Front-load pressure rating — exceeds IEC 61215 requirements",
      percentage: 90,
    },
    {
      label: "PID Resistance",
      value: 1,
      unit: "<1%",
      description: "Potential-induced degradation after 192 hours stress test",
      percentage: 96,
    },
  ],

  automation: [
    {
      title: "AI-Powered Defect Detection",
      description:
        "Deep learning models analyze EL images in real-time, detecting micro-cracks, shunts and inactive areas with 99.7% accuracy — replacing manual inspection.",
      icon: "Brain",
    },
    {
      title: "Robotic Wafer Handling",
      description:
        "6-axis robotic arms handle ultra-thin 180μm wafers with sub-millimeter precision, eliminating breakage and contamination throughout cell processing.",
      icon: "Bot",
    },
    {
      title: "Automated IV Testing",
      description:
        "High-throughput IV testing stations measure 3,600 cells per hour with class AAA solar simulators — real-time statistical process control ensures consistency.",
      icon: "Activity",
    },
    {
      title: "Smart Factory IoT",
      description:
        "2,500+ IoT sensors monitor equipment health, ambient conditions and process parameters — predictive maintenance reduces unplanned downtime by 85%.",
      icon: "Wifi",
    },
  ],

  ctaSection: {
    title: "Experience Our Manufacturing Firsthand",
    subtitle:
      "Schedule a virtual or on-site tour of our Mundra facility — see precision engineering in action.",
    primaryCta: { label: "Visit Our Facility", route: "contact" as const },
    secondaryCta: { label: "Download Manufacturing Brochure", route: "contact" as const },
  },
};
