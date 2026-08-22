import { mediaAssets as m } from "@/lib/media";

export const aboutContent = {
  hero: {
    title: "About Adani Solar",
    subtitle:
      "India's first and largest vertically integrated solar PV manufacturer , driving the nation's energy independence through Make in India solar solutions.",
    backgroundImage: m.about.facility,
  },

  aboutSection: {
    sectionTitle: "About Adani Solar",
    title: "Powering India's Energy Independence",
    paragraphs: [
      "Adani Solar is the solar PV manufacturing arm of Adani Group , India's first and largest vertically integrated solar PV manufacturer. We are committed to making India self-reliant in solar manufacturing, driving the nation's energy independence through world-class, Made in India solar solutions.",
      "Established in 2016, Adani Solar has expanded its manufacturing footprint at Mundra, Gujarat to 4 GW of cells and modules and 2 GW of ingots and wafers, with a long-term vision for a 10 GW integrated campus.",
      "As part of the Adani Group's commitment to sustainability, we play a pivotal role in India's ambitious goal of achieving 500 GW of renewable energy capacity by 2030. Our vertically integrated manufacturing , from polysilicon to modules , ensures complete quality control and supply chain independence.",
    ],
    image: m.about.facility,
  },

  sustainability: {
    sectionTitle: "Sustainability",
    title: "Committed to a Greener Tomorrow",
    description:
      "Sustainability is at the core of everything we do. From our manufacturing processes to our products, we are committed to minimizing environmental impact and maximizing positive contributions to society.",
    highlights: [
      "Zero liquid discharge manufacturing facility",
      "Rainwater harvesting across all operations",
      "Solar-powered manufacturing , we practice what we preach",
      "Comprehensive waste management and recycling programs",
      "Carbon-neutral operations target by 2027",
    ],
    image: m.whySolar.carbon,
  },

  milestones: {
    sectionTitle: "Our Milestones",
    title: "A Journey of Excellence",
    items: [
      {
        year: "2016",
        title: "Foundation Laid",
        description: "Adani Solar established as part of Adani Group's renewable energy vision.",
      },
      {
        year: "2018",
        title: "First Module Produced",
        description: "Begin module manufacturing at our Mundra facility.",
      },
      {
        year: "2019",
        title: "1 GW Capacity",
        description: "Achieved 1 GW manufacturing capacity milestone.",
      },
      {
        year: "2021",
        title: "Cell Manufacturing Begins",
        description: "Expanded into cell manufacturing with cutting-edge MonoPERC technology.",
      },
      {
        year: "2022",
        title: "3 GW Capacity",
        description: "Scaled to 3 GW integrated manufacturing capacity.",
      },
      {
        year: "2023",
        title: "TOPCon Technology",
        description: "Introduced next-generation TOPCon cell technology for higher efficiency.",
      },
      {
        year: "2024",
        title: "Capacity Expansion",
        description: "Continued scaling of integrated cell and module manufacturing at Mundra.",
      },
    ],
  },

  vision: {
    sectionTitle: "Our Vision",
    title: "Making India Self-Reliant in Solar Manufacturing",
    description:
      "Our vision is to make India a global hub for solar manufacturing, reducing dependence on imports and contributing to the nation's energy security. We aspire to lead the world in clean energy manufacturing by combining cutting-edge technology with the power of scale.",
    pillars: [
      {
        title: "Energy Independence",
        description:
          "Reducing India's dependence on imported solar components through domestic manufacturing at scale.",
      },
      {
        title: "Technology Leadership",
        description:
          "Bringing the most advanced solar technologies to India , from TOPCon to heterojunction and beyond.",
      },
      {
        title: "Global Scale",
        description:
          "Building manufacturing capacity that serves both domestic and international markets at competitive scale.",
      },
      {
        title: "Sustainability First",
        description:
          "Every decision we make is guided by our commitment to environmental responsibility and sustainable growth.",
      },
    ],
  },

  mdMessage: {
    sectionTitle: "MD's Message",
    title: "A Message from Our Leadership",
    message:
      "At Adani Solar, we believe solar manufacturing is central to India's energy independence. Building production capacity within India reduces import dependence and strengthens the domestic supply chain for cells, modules, and related components.\n\nOur Mundra facility represents a significant step in that direction , with integrated manufacturing, quality systems, and a long-term vision for a 10 GW campus. Every cell and module we produce supports India's renewable energy goals and the broader transition to cleaner power.\n\nWe will continue investing in advanced PV technology, operational excellence, and responsible manufacturing as India develops as a global solar manufacturing hub.",
    name: "Jawahar Vadivelu",
    designation: "Managing Director, Adani Solar",
    image: m.about.leadership,
  },

  stats: {
    sectionTitle: "Impact by Numbers",
    items: [
      {
        value: 4,
        unit: "GW",
        label: "Cells & Modules Capacity",
        icon: "Zap",
      },
      {
        value: 13.6,
        unit: "M Tons",
        label: "CO₂ Emissions Avoided",
        icon: "Leaf",
      },
      {
        value: 340,
        unit: "M",
        label: "Trees Equivalent Saved",
        icon: "TreePine",
      },
      {
        value: 20,
        unit: "+",
        label: "Export Countries",
        icon: "Globe",
      },
    ],
  },
} as const;

export type AboutContent = typeof aboutContent;
