export const whySolarContent = {
  hero: {
    title: "Why Solar",
    subtitle:
      "Solar energy is the most abundant, clean, and cost-effective source of power on Earth. Discover why solar is the energy choice of the future.",
    backgroundImage: "/assets/why-solar/solar-benefits-overview.webp",
  },

  intro: {
    title: "The Case for Solar Energy",
    description:
      "With over 300 sunny days a year, India is uniquely positioned to harness the power of the sun. Solar energy offers a clean, renewable, and economically viable solution to our growing energy needs while reducing our carbon footprint and dependence on fossil fuels.",
  },

  benefits: [
    {
      id: "clean-renewable",
      title: "Clean & Renewable",
      description:
        "Solar energy produces no greenhouse gases, no air pollution, and no water pollution during operation. It's an inexhaustible resource that will be available for billions of years, making it the ultimate sustainable energy solution.",
      icon: "Leaf",
    },
    {
      id: "energy-independence",
      title: "Energy Independence",
      description:
        "By generating electricity from the sun, nations can reduce their dependence on imported fossil fuels. India imports over 80% of its oil , solar power is key to achieving energy security and reducing import bills.",
      icon: "Shield",
    },
    {
      id: "cost-effective",
      title: "Cost Effective",
      description:
        "Solar energy costs have dropped by over 90% in the last decade. With levelized cost of energy (LCOE) lower than coal in most regions, solar is now the cheapest source of new electricity generation in India.",
      icon: "DollarSign",
    },
    {
      id: "job-creation",
      title: "Job Creation",
      description:
        "The solar industry is a major employment generator. From manufacturing and installation to maintenance and R&D, solar creates 3x more jobs per unit of energy compared to fossil fuels. India's solar sector is projected to create over 1 million jobs by 2030.",
      icon: "Users",
    },
    {
      id: "scalable",
      title: "Scalable & Versatile",
      description:
        "From rooftop systems on homes to utility-scale solar farms spanning thousands of acres, solar can be deployed at any scale. It powers everything from calculators to cities, making it the most versatile energy source available.",
      icon: "TrendingUp",
    },
    {
      id: "low-maintenance",
      title: "Low Maintenance",
      description:
        "Solar panels have no moving parts, which means minimal maintenance requirements. With lifespans of 25-30 years and performance warranties to match, solar installations offer decades of trouble-free power generation.",
      icon: "Settings",
    },
  ],

  indiaStats: {
    title: "India's Solar Revolution",
    subtitle: "India is at the forefront of the global solar energy transformation.",
    stats: [
      { value: "500", unit: "GW", label: "Renewable Target by 2030" },
      { value: "300+", unit: "Days", label: "Sunny Days Per Year" },
      { value: "90%", unit: "Drop", label: "Solar Cost Reduction (10 Years)" },
      { value: "4th", unit: "Globally", label: "In Solar Capacity" },
    ],
  },

  faqs: {
    sectionTitle: "Solar FAQs",
    title: "Frequently Asked Questions",
    subtitle:
      "Practical answers to the most common questions about going solar in India.",
    items: [
      {
        question: "How much can I save with solar?",
        answer:
          "A typical 5 kW rooftop solar system in India can save ₹5,000–₹8,000 per month on electricity bills, depending on your consumption, state tariff and solar irradiance. Most residential customers recover their investment in 4–6 years and enjoy free power for the remaining 20+ years of system life.",
      },
      {
        question: "What is the payback period for a solar installation?",
        answer:
          "For residential rooftop systems the payback period is typically 4–6 years. For commercial and industrial installations with higher tariffs and accelerated depreciation benefits, payback can be as short as 3–4 years. Government subsidies under PM Surya Ghar can further reduce payback by 12–18 months.",
      },
      {
        question: "How long do solar panels last?",
        answer:
          "Quality solar modules like Adani's TOPCon and MonoPERC panels are engineered for a 25–30 year useful life. Our TOPCon modules come with a 30-year performance warranty guaranteeing at least 87% of rated output at year 30. Actual field life often exceeds 30 years with proper maintenance.",
      },
      {
        question: "Do solar panels work during the monsoon?",
        answer:
          "Yes. Modern solar panels generate power even in diffuse light conditions, producing 25–40% of rated output on overcast rainy days. India receives 300+ sunny days a year on average, so the annual energy impact of monsoon months is modest. TOPCon cells perform especially well in low-light conditions.",
      },
      {
        question: "What maintenance is required for solar panels?",
        answer:
          "Solar systems have no moving parts and require minimal maintenance , typically a quarterly cleaning of panels to remove dust, bird droppings or pollen, plus an annual inspection of inverters, cabling and mounting structures. In dusty regions like Rajasthan, monthly cleaning may be optimal. Annual maintenance costs are usually 0.5–1% of system cost.",
      },
      {
        question: "Can I sell excess power back to the grid?",
        answer:
          "Yes, under net-metering policies available in most Indian states, excess solar power exported to the grid is credited against your future consumption. Many states also offer gross-metering or feed-in tariffs for larger systems. The exact mechanism, ceiling and settlement period vary by state DISCOM.",
      },
      {
        question: "Is my roof suitable for solar?",
        answer:
          "South-facing roofs with minimal shading between 9 AM and 4 PM are ideal, but east/west-facing roofs also work well with only a 10–15% reduction in yield. A structural assessment confirms load-bearing capacity. Flat roofs can use mounting structures with 10–15° tilt; pitched roofs can host panels flush-mounted to the existing slope.",
      },
      {
        question: "What financing options are available?",
        answer:
          "Most public and private banks offer solar loans at preferential rates under RBI's priority sector lending. MNRE-empanelled channel partners help with paperwork. For businesses, accelerated depreciation (40% in year one) and the PM-KUSUM scheme for agricultural pumps further improve returns. ROI typically beats commercial loan rates within 4–5 years.",
      },
    ],
  },

  roiCalculator: {
    title: "Solar Savings Calculator",
    subtitle:
      "Estimate your solar potential, savings and payback period with our interactive calculator. Adjust the inputs to match your roof, bill and preferred module technology.",
    note: "Estimates are indicative based on average Indian solar irradiance (1,500 kWh/kW/year) and an electricity tariff of ₹8/kWh. Actual savings depend on site conditions, shading, tariff structure and DISCOM approvals.",
    states: [
      { code: "GJ", name: "Gujarat", irradiance: 1650 },
      { code: "RJ", name: "Rajasthan", irradiance: 1800 },
      { code: "MH", name: "Maharashtra", irradiance: 1550 },
      { code: "TN", name: "Tamil Nadu", irradiance: 1600 },
      { code: "KA", name: "Karnataka", irradiance: 1580 },
      { code: "AP", name: "Andhra Pradesh", irradiance: 1620 },
      { code: "TS", name: "Telangana", irradiance: 1600 },
      { code: "MP", name: "Madhya Pradesh", irradiance: 1550 },
      { code: "UP", name: "Uttar Pradesh", irradiance: 1500 },
      { code: "PB", name: "Punjab", irradiance: 1480 },
      { code: "HR", name: "Haryana", irradiance: 1500 },
      { code: "DL", name: "Delhi", irradiance: 1480 },
      { code: "WB", name: "West Bengal", irradiance: 1400 },
      { code: "KL", name: "Kerala", irradiance: 1450 },
      { code: "OD", name: "Odisha", irradiance: 1470 },
      { code: "CT", name: "Chhattisgarh", irradiance: 1520 },
    ],
    moduleTypes: [
      {
        id: "topcon",
        label: "TOPCon",
        description: "Higher efficiency, better low-light & temperature performance",
        efficiencyMultiplier: 1.06,
        costPerWatt: 32,
      },
      {
        id: "monoperc",
        label: "MonoPERC",
        description: "Proven reliability, lower upfront cost",
        efficiencyMultiplier: 1.0,
        costPerWatt: 27,
      },
    ],
    ctaLabel: "Get a Detailed Quote",
    ctaRoute: "contact" as const,
  },

  ctaSection: {
    title: "Ready to Go Solar?",
    subtitle:
      "Join India's clean energy revolution with Adani Solar's high-performance modules. Contact us today to learn more.",
    ctaLabel: "Contact Us",
    ctaRoute: "contact" as const,
  },
} as const;

export type WhySolarContent = typeof whySolarContent;
