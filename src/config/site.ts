export const siteConfig = {
  name: "Adani Solar",
  legalName: "Adani Solar Energy Private Limited",
  description:
    "Adani Solar is the solar PV manufacturing arm of Adani Group , India's first and largest vertically integrated solar PV manufacturer.",
  url: "https://www.adanisolar.com",
  ogImage: "/assets/og-image.webp",

  company: {
    name: "Adani Solar",
    parentGroup: "Adani Group",
    tagline: "Energising India's Solar Dream",
    foundedYear: 2016,
    headquarters: "Ahmedabad, Gujarat, India",
    manufacturingLocation: "Mundra, Gujarat, India",
    capacity: "4 GW",
    capacityDetail: "4 GW cells & modules; 2 GW ingots & wafers",
    capacityVision: "10 GW integrated campus at Mundra",
  },

  contact: {
    email: "info@adanisolar.com",
    phone: "+91-79-2555 5555",
    tollFree: "1800-200-334",
    address: {
      line1: "Adani Corporate House",
      line2: "Shantigram, S.G. Highway",
      line3: "Ahmedabad, Gujarat 382421",
      country: "India",
    },
  },

  social: {
    twitter: "https://x.com/AdaniSolar",
    linkedin: "https://www.linkedin.com/company/adani-solar",
    youtube: "https://www.youtube.com/user/AdaniGroup",
    facebook: "https://www.facebook.com/AdaniGroup",
  },

  stats: {
    capacity: "4",
    capacityUnit: "GW",
    co2Saved: "13.6",
    co2Unit: "Million Tons",
    treesEquiv: "340",
    treesUnit: "Million Trees",
  },

  cookies: {
    categories: [
      {
        id: "necessary",
        name: "Strictly Necessary",
        description:
          "These cookies are essential for the website to function properly. They enable core functionality such as security, network management, and accessibility.",
        required: true,
      },
      {
        id: "analytics",
        name: "Analytics",
        description:
          "These cookies help us understand how visitors interact with the website, allowing us to improve the experience. All information is collected anonymously.",
        required: false,
      },
      {
        id: "functional",
        name: "Functional",
        description:
          "These cookies enable enhanced functionality and personalization, such as remembering your preferences and providing tailored content.",
        required: false,
      },
      {
        id: "marketing",
        name: "Marketing",
        description:
          "These cookies are used to track visitors across websites to display relevant advertisements. They help measure the effectiveness of advertising campaigns.",
        required: false,
      },
    ],
  },
} as const;

export type SiteConfig = typeof siteConfig;
