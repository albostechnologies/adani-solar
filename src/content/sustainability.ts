import { mediaAssets as m } from "@/lib/media";

export interface ImpactMetric {
  id: string;
  label: string;
  value: number;
  unit: string;
  target: number;
  icon: string;
  color: string;
  description: string;
}

export interface Milestone {
  year: number;
  title: string;
  description: string;
  metric: string;
  icon: string;
}

export interface SDGGoal {
  number: number;
  title: string;
  description: string;
  color: string;
  icon: string;
}

export interface AnnualDataPoint {
  year: number;
  co2Offset: number;
  capacity: number;
  investment: number;
  jobsCreated: number;
}

export interface Initiative {
  title: string;
  description: string;
  image: string;
  stats: { label: string; value: string; progress: number }[];
}

export const sustainabilityContent = {
  hero: {
    title: "Sustainability Impact Dashboard",
    subtitle:
      "Tracking our environmental commitment with real data , every solar module we manufacture drives India closer to a carbon-neutral future.",
    primaryCta: { label: "Download ESG Report", route: "contact" as const },
    secondaryCta: { label: "Contact Us", route: "contact" as const },
  },

  impactMetrics: [
    {
      id: "co2-offset",
      label: "CO₂ Offset",
      value: 13.6,
      unit: "M Tonnes",
      target: 20,
      icon: "CloudOff",
      color: "#00a651",
      description: "Million tonnes of CO₂ emissions avoided annually through clean solar energy generation",
    },
    {
      id: "trees-equivalent",
      label: "Trees Equivalent",
      value: 340,
      unit: "M Trees",
      target: 500,
      icon: "TreePine",
      color: "#22c55e",
      description: "Equivalent number of trees needed to absorb the same amount of CO₂ we offset",
    },
    {
      id: "clean-energy",
      label: "Clean Energy",
      value: 10,
      unit: "GW",
      target: 15,
      icon: "Zap",
      color: "#eab308",
      description: "Gigawatts of integrated solar PV manufacturing capacity at our Mundra facility",
    },
    {
      id: "water-saved",
      label: "Water Saved",
      value: 2.8,
      unit: "B Liters",
      target: 5,
      icon: "Droplets",
      color: "#3b82f6",
      description: "Billions of liters of water saved by using solar energy instead of thermal power generation",
    },
    {
      id: "land-restored",
      label: "Land Restored",
      value: 12,
      unit: "K Hectares",
      target: 20,
      icon: "Mountain",
      color: "#8b5cf6",
      description: "Thousands of hectares of degraded land restored through sustainable solar park development",
    },
    {
      id: "waste-recycled",
      label: "Waste Recycled",
      value: 94,
      unit: "%",
      target: 100,
      icon: "Recycle",
      color: "#f97316",
      description: "Percentage of manufacturing waste diverted from landfills through our recycling programs",
    },
    {
      id: "carbon-intensity",
      label: "Carbon Intensity Reduction",
      value: 72,
      unit: "%",
      target: 90,
      icon: "TrendingDown",
      color: "#06b6d4",
      description: "Reduction in carbon intensity of our manufacturing operations since baseline year 2015",
    },
    {
      id: "renewable-share",
      label: "Renewable Share",
      value: 85,
      unit: "%",
      target: 100,
      icon: "Sun",
      color: "#10b981",
      description: "Percentage of our total energy consumption sourced from renewable sources",
    },
  ],

  milestones: [
    {
      year: 2016,
      title: "First Solar Plant Commissioned",
      description:
        "The 648 MW Kamuthi solar plant in Tamil Nadu became the world's largest single-location solar plant, powering over 300,000 homes.",
      metric: "648 MW Kamuthi",
      icon: "Sun",
    },
    {
      year: 2018,
      title: "2 GW Installed Capacity Reached",
      description:
        "Crossed the 2 GW milestone in installed solar capacity, establishing Adani as one of India's top three solar players.",
      metric: "2 GW Capacity",
      icon: "Zap",
    },
    {
      year: 2020,
      title: "Carbon Neutrality Achieved",
      description:
        "All manufacturing operations at Mundra achieved carbon neutrality through on-site solar, green power procurement, and offset programs.",
      metric: "Net Zero Operations",
      icon: "Leaf",
    },
    {
      year: 2022,
      title: "10 GW Milestone & World's Largest Manufacturer",
      description:
        "Reached 10 GW integrated manufacturing capacity, becoming the world's largest solar PV manufacturer outside China.",
      metric: "10 GW Milestone",
      icon: "Trophy",
    },
    {
      year: 2024,
      title: "340M Trees Equivalent CO₂ Offset",
      description:
        "Lifetime CO₂ offset from all deployed modules reached 340 million tree-equivalent, validated by third-party environmental auditors.",
      metric: "340M Trees",
      icon: "TreePine",
    },
    {
      year: 2026,
      title: "Target: 20 GW Renewable Capacity",
      description:
        "On track to achieve 20 GW of total renewable energy capacity including solar, wind, and hybrid installations across India.",
      metric: "20 GW Target",
      icon: "Target",
    },
  ],

  sdgGoals: [
    {
      number: 7,
      title: "Affordable & Clean Energy",
      description:
        "Ensuring access to affordable, reliable, sustainable, and modern energy for all through large-scale solar manufacturing.",
      color: "#FAB718",
      icon: "Zap",
    },
    {
      number: 9,
      title: "Industry, Innovation & Infrastructure",
      description:
        "Building resilient infrastructure and fostering innovation with our 10 GW integrated PV manufacturing value chain.",
      color: "#E9593A",
      icon: "Cpu",
    },
    {
      number: 12,
      title: "Responsible Consumption & Production",
      description:
        "94% waste recycling rate, zero-liquid-discharge manufacturing, and circular economy initiatives across our operations.",
      color: "#BF8B2E",
      icon: "Recycle",
    },
    {
      number: 13,
      title: "Climate Action",
      description:
        "13.6 million tonnes of CO₂ offset annually, directly contributing to India's Paris Agreement commitments and net-zero 2070 target.",
      color: "#3F7E44",
      icon: "Globe2",
    },
    {
      number: 15,
      title: "Life on Land",
      description:
        "12,000 hectares of land restored through sustainable solar park development, protecting biodiversity and preventing desertification.",
      color: "#56C02B",
      icon: "TreePine",
    },
    {
      number: 17,
      title: "Partnerships for the Goals",
      description:
        "Collaborating with 20+ countries, 100+ channel partners, and global certification bodies to accelerate the clean energy transition.",
      color: "#1A4876",
      icon: "Handshake",
    },
  ],

  annualData: [
    { year: 2019, co2Offset: 4.2, capacity: 3, investment: 1.8, jobsCreated: 1200 },
    { year: 2020, co2Offset: 5.8, capacity: 4.5, investment: 2.5, jobsCreated: 2100 },
    { year: 2021, co2Offset: 7.6, capacity: 6, investment: 3.2, jobsCreated: 3200 },
    { year: 2022, co2Offset: 9.8, capacity: 8, investment: 4.1, jobsCreated: 4100 },
    { year: 2023, co2Offset: 11.8, capacity: 9, investment: 4.8, jobsCreated: 4800 },
    { year: 2024, co2Offset: 13.6, capacity: 10, investment: 5.5, jobsCreated: 5200 },
    { year: 2025, co2Offset: 15.2, capacity: 11.5, investment: 6.2, jobsCreated: 5800 },
  ],

  initiatives: [
    {
      title: "Zero Liquid Discharge Manufacturing",
      description:
        "Our Mundra facility operates a zero-liquid-discharge (ZLD) system, recovering and reusing 100% of process water. No industrial effluent is discharged into the environment.",
      image: m.home.plantAerial,
      stats: [
        { label: "Water Recovery", value: "100%", progress: 100 },
        { label: "Groundwater Savings", value: "2.8B L/yr", progress: 72 },
        { label: "ZLD Compliance", value: "Since 2019", progress: 100 },
      ],
    },
    {
      title: "Circular Economy & Waste Recycling",
      description:
        "Our 94% waste recycling rate covers silicon kerf, glass cullet, aluminum scrap, and packaging materials. We aim for 100% by 2027 through new recycling partnerships.",
      image: m.products.monoperc,
      stats: [
        { label: "Waste Recycled", value: "94%", progress: 94 },
        { label: "Zero Waste Target", value: "2027", progress: 94 },
        { label: "Recycling Streams", value: "12 Types", progress: 80 },
      ],
    },
    {
      title: "Biodiversity & Land Restoration",
      description:
        "We restore degraded land around solar parks with native vegetation, creating wildlife corridors. 12,000 hectares restored with 85+ native plant species planted.",
      image: m.whySolar.carbon,
      stats: [
        { label: "Land Restored", value: "12K ha", progress: 60 },
        { label: "Native Species", value: "85+", progress: 70 },
        { label: "Wildlife Corridors", value: "14 Active", progress: 85 },
      ],
    },
    {
      title: "Community Solar & Rural Electrification",
      description:
        "Through our community solar programs, we've brought clean electricity to 500+ villages, 200+ schools, and 50+ health centers in rural India that previously had no grid access.",
      image: m.whySolar.savings,
      stats: [
        { label: "Villages Powered", value: "500+", progress: 65 },
        { label: "Schools Electrified", value: "200+", progress: 55 },
        { label: "Health Centers", value: "50+", progress: 50 },
      ],
    },
  ],
};
