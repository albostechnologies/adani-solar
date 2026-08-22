/** Local media paths used across the site. All files live under /public/assets/. */
export const mediaAssets = {
  home: {
    hero: "/assets/home/hero-solar-facility.webp",
    about: "/assets/home/about-solar-manufacturing.webp",
    valueChain: "/assets/home/pv-value-chain.webp",
    products: "/assets/home/solar-products-modules.webp",
    plantAerial: "/assets/home/solar-plant-aerial.webp",
    exportMap: "/assets/home/export-world-map.webp",
  },
  products: {
    topcon: "/assets/products/topcon-module.webp",
    monoperc: "/assets/products/monoperc-module.webp",
  },
  about: {
    facility: "/assets/about/manufacturing-facility.webp",
    leadership: "/assets/about/manufacturing-facility.webp",
  },
  whySolar: {
    overview: "/assets/why-solar/solar-benefits-overview.webp",
    carbon: "/assets/why-solar/carbon-reduction.webp",
    savings: "/assets/why-solar/financial-savings.webp",
    grid: "/assets/why-solar/grid-security.webp",
  },
  contact: {
    hero: "/assets/contact/contact-hero.webp",
  },
  og: "/assets/og-image.webp",
} as const;
