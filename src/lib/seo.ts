import type { Metadata } from "next";
import type { RouteName } from "@/lib/routes";
import { ROUTE_PATH_MAP } from "@/lib/routes";
import { siteConfig } from "@/config/site";

const SITE_URL = siteConfig.url;

interface PageSeo {
  title: string;
  description: string;
}

export const PAGE_SEO: Record<RouteName, PageSeo> = {
  home: {
    title: "Solar PV Manufacturing | Adani Solar",
    description:
      "Adani Solar manufactures high-efficiency TOPCon and MonoPERC solar cells and modules at Mundra, Gujarat , India's vertically integrated solar PV manufacturer.",
  },
  about: {
    title: "About Adani Solar | Integrated PV Manufacturer",
    description:
      "Learn about Adani Solar's integrated solar PV manufacturing, Mundra facility, milestones, and vision for India's energy independence.",
  },
  "about-what-we-do": {
    title: "What We Do | Adani Solar Manufacturing",
    description:
      "Explore Adani Solar's vertically integrated manufacturing , from polysilicon to cells and modules at our Mundra facility in Gujarat.",
  },
  "why-solar": {
    title: "Why Solar Energy | Adani Solar",
    description:
      "Understand the economic and environmental case for solar energy in India , clean power, energy security, and long-term savings.",
  },
  contact: {
    title: "Contact Adani Solar | Sales & Support",
    description:
      "Contact Adani Solar for product enquiries, partnerships, and technical support. Sales team available Monday to Saturday.",
  },
  terms: {
    title: "Terms & Conditions | Adani Solar",
    description: "Terms and conditions governing use of the Adani Solar website and related services.",
  },
  privacy: {
    title: "Privacy Notice | Adani Solar",
    description: "How Adani Solar collects, uses, and protects personal information submitted through this website.",
  },
  "product-topcon": {
    title: "TOPCon Solar Modules | Adani Solar",
    description:
      "High-efficiency TOPCon bifacial solar modules from Adani Solar , specifications, performance data, and warranty details.",
  },
  "product-monoperc": {
    title: "MonoPERC Solar Modules | Adani Solar",
    description:
      "Proven MonoPERC solar modules from Adani Solar , power range, reliability, and certification details for rooftop and utility projects.",
  },
  careers: {
    title: "Careers | Adani Solar",
    description:
      "Explore careers at Adani Solar in manufacturing, engineering, sales, and operations across Gujarat and India.",
  },
  glossary: {
    title: "Solar Glossary | Adani Solar",
    description:
      "Definitions of common solar PV terms , cells, modules, inverters, efficiency, warranties, and installation concepts.",
  },
  resources: {
    title: "Resource Center | Adani Solar",
    description:
      "Technical guides, datasheets, and reference materials for Adani Solar modules and solar project planning.",
  },
  sustainability: {
    title: "Sustainability | Adani Solar",
    description:
      "Adani Solar's environmental commitments , responsible manufacturing, resource efficiency, and community initiatives.",
  },
  compare: {
    title: "Compare Solar Modules | Adani Solar",
    description:
      "Side-by-side comparison of Adani Solar TOPCon and MonoPERC modules , efficiency, warranty, and application fit.",
  },
  manufacturing: {
    title: "Manufacturing Process | Adani Solar",
    description:
      "From silicon to finished modules , an overview of Adani Solar's integrated PV manufacturing process at Mundra, Gujarat.",
  },
  "check-status": {
    title: "Check Your Status | Adani Solar",
    description:
      "Track the status of your Adani Solar enquiry or application using your reference number and email address.",
  },
  "application-status": {
    title: "Application Status | Adani Solar",
    description: "View your Adani Solar partnership application status, approval letter, and payment details.",
  },
};

export function buildMetadata(route: RouteName): Metadata {
  const seo = PAGE_SEO[route];
  const path = ROUTE_PATH_MAP[route];
  const url = `${SITE_URL}${path === "/" ? "" : path}`;

  return {
    title: seo.title,
    description: seo.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url,
      siteName: siteConfig.name,
      type: "website",
      locale: "en_IN",
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: "Adani Solar manufacturing facility",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      images: [siteConfig.ogImage],
    },
  };
}

export const INDEXABLE_ROUTES: RouteName[] = [
  "home",
  "about",
  "about-what-we-do",
  "why-solar",
  "contact",
  "terms",
  "privacy",
  "product-topcon",
  "product-monoperc",
  "careers",
  "glossary",
  "resources",
  "sustainability",
  "compare",
  "manufacturing",
];
