import { mediaAssets as m } from "@/lib/media";
import type { RouteName } from "@/lib/routes";

export interface HeroSlide {
  id: string;
  index: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  cta: string;
  ctaRoute: RouteName;
  backgroundImage: string;
  cardLabel: string;
  cardTitle: string;
  cardImage: string;
}

export const AUTOPLAY_DELAY = 6500;
export const TRANSITION_DURATION_MS = 900;

export const heroSlides: HeroSlide[] = [
  {
    id: "manufacturing",
    index: "01",
    eyebrow: "Solar Manufacturing",
    title: "Energising India's Solar Dream.",
    subtitle:
      "India's first and largest vertically integrated solar PV manufacturer, driving energy independence with Made in India solar solutions.",
    cta: "Explore Products",
    ctaRoute: "product-topcon",
    backgroundImage: m.home.hero,
    cardLabel: "Integrated Manufacturing",
    cardTitle: "Mundra, Gujarat",
    cardImage: m.home.plantAerial,
  },
  {
    id: "topcon",
    index: "02",
    eyebrow: "TOPCon Technology",
    title: "Next-generation module efficiency.",
    subtitle:
      "Tunnel Oxide Passivated Contact technology delivers up to 22.5% module efficiency with 30-year bankable performance.",
    cta: "Explore TOPCon",
    ctaRoute: "product-topcon",
    backgroundImage: m.products.topcon,
    cardLabel: "TOPCon Modules",
    cardTitle: "570W – 590W",
    cardImage: m.products.topcon,
  },
  {
    id: "value-chain",
    index: "03",
    eyebrow: "Integrated PV Value Chain",
    title: "From polysilicon to modules.",
    subtitle:
      "Vertically integrated manufacturing across polysilicon, ingots, wafers, cells and modules ensures quality at every step.",
    cta: "View Manufacturing",
    ctaRoute: "manufacturing",
    backgroundImage: m.home.valueChain,
    cardLabel: "Value Chain",
    cardTitle: "4 GW Cells & Modules",
    cardImage: m.about.facility,
  },
  {
    id: "sustainability",
    index: "04",
    eyebrow: "Sustainability",
    title: "Powering a sustainable future.",
    subtitle:
      "Responsible manufacturing and environmental stewardship across our Mundra operations and wider Adani Group energy ecosystem.",
    cta: "Our Sustainability",
    ctaRoute: "sustainability",
    backgroundImage: m.whySolar.carbon,
    cardLabel: "Clean Energy",
    cardTitle: "340M Trees Equivalent",
    cardImage: m.home.about,
  },
];
