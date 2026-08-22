import type { RouteName } from "@/lib/routes";
import {
  Info,
  LayoutGrid,
  Sparkles,
  Sun,
  PanelsTopLeft,
  Cpu,
  GlassWater,
  Leaf,
  Globe2,
  Link2,
  PhoneCall,
  Handshake,
  MessageCircleQuestion,
  Briefcase,
  GraduationCap,
  GitCompare,
  Factory,
  type LucideIcon,
} from "lucide-react";

interface NavItem {
  label: string;
  route?: RouteName;
  href?: string;
  section?: string;
  children?: NavChild[];
}

interface NavChild {
  label: string;
  description?: string;
  route?: RouteName;
  href?: string;
  section?: string;
  icon?: LucideIcon;
  banner?: {
    title: string;
    subtitle: string;
    route?: RouteName;
  };
}

interface FooterNavGroup {
  title: string;
  items: NavItem[];
}

export const headerNavItems: NavItem[] = [
  {
    label: "About",
    route: "about",
    children: [
      {
        label: "About Adani Solar",
        description: "Our story, vision & leadership team",
        route: "about",
        icon: Info,
      },
      {
        label: "What We Do",
        description: "Integrated PV manufacturing capabilities",
        route: "about-what-we-do",
        icon: LayoutGrid,
      },
      {
        label: "Why Solar",
        description: "The case for clean, renewable energy",
        route: "why-solar",
        icon: Sparkles,
      },
    ],
    banner: {
      title: "Energising India's Solar Dream",
      subtitle:
        "Vertically integrated solar PV manufacturing at Mundra, Gujarat , scaling toward a 10 GW campus vision.",
      route: "about",
    },
  },
  {
    label: "Products",
    route: "home",
    children: [
      {
        label: "TOPCon Modules",
        description: "Next-gen tunnel passivated contact, up to 22.5% efficiency",
        route: "product-topcon",
        icon: Sun,
      },
      {
        label: "MonoPERC Modules",
        description: "Proven PERC technology, 390W – 545W power range",
        route: "product-monoperc",
        icon: PanelsTopLeft,
      },
      {
        label: "Solar Cells",
        description: "High-efficiency mono-crystalline cells",
        route: "manufacturing",
        icon: Cpu,
      },
      {
        label: "Compare Products",
        description: "TOPCon vs MonoPERC side-by-side comparison",
        route: "compare" as RouteName,
        icon: GitCompare,
      },
      {
        label: "Solar Glass",
        description: "High-transmission low-iron tempered glass",
        route: "contact",
        icon: GlassWater,
      },
    ],
    banner: {
      title: "High-Performance Solar Modules",
      subtitle:
        "Built to perform in Indian conditions with 30-year performance warranty.",
      route: "product-topcon",
    },
  },
  {
    label: "Sustainability",
    route: "home",
    children: [
      {
        label: "Sustainability Dashboard",
        description: "Interactive impact metrics & ESG data",
        route: "sustainability" as RouteName,
        icon: Leaf,
      },
      {
        label: "Green Initiatives",
        description: "Environmental commitments and responsible manufacturing",
        route: "sustainability",
        icon: Leaf,
      },
      {
        label: "Export Manufacturing",
        description: "Made in India modules for international markets",
        route: "home",
        section: "export-manufacturing",
        icon: Globe2,
      },
      {
        label: "PV Value Chain",
        description: "Polysilicon to modules , integrated manufacturing",
        route: "home",
        section: "pv-value-chain",
        icon: Link2,
      },
      {
        label: "Manufacturing Process",
        description: "From sand to solar , 8-step precision engineering",
        route: "manufacturing" as RouteName,
        icon: Factory,
      },
    ],
    banner: {
      title: "Powering a Sustainable Future",
      subtitle:
        "Responsible manufacturing and environmental stewardship across our Mundra operations.",
      route: "sustainability",
    },
  },
  {
    label: "Contact",
    route: "contact",
    children: [
      {
        label: "Contact Us",
        description: "Sales & general enquiries , we respond in 24 hours",
        route: "contact",
        icon: PhoneCall,
      },
      {
        label: "Channel Partners",
        description: "Zone-wise distributor network across India",
        route: "contact",
        icon: Handshake,
      },
      {
        label: "Ask Our Expert",
        description: "Talk to a solar expert for tailored advice",
        route: "contact",
        icon: MessageCircleQuestion,
      },
      {
        label: "Careers",
        description: "Build a career in solar manufacturing and clean energy",
        route: "careers",
        icon: Briefcase,
      },
    ],
    banner: {
      title: "We're Here to Help",
      subtitle:
        "Reach our sales team Monday – Saturday, 9:00 AM to 6:00 PM IST.",
      route: "contact",
    },
  },
];

export const footerNavGroups: FooterNavGroup[] = [
  {
    title: "Company",
    items: [
      { label: "About Adani Solar", route: "about" },
      { label: "What We Do", route: "about-what-we-do" },
      { label: "Why Solar", route: "why-solar" },
    ],
  },
  {
    title: "Products",
    items: [
      { label: "TOPCon Modules", route: "product-topcon" },
      { label: "MonoPERC Modules", route: "product-monoperc" },
      { label: "Compare Products", route: "compare" as RouteName },
      { label: "Solar Cells", route: "manufacturing" },
    ],
  },
  {
    title: "Sustainability",
    items: [
      { label: "Sustainability Dashboard", route: "sustainability" as RouteName },
      { label: "Green Initiatives", route: "sustainability" },
      { label: "Export Manufacturing", route: "home", section: "export-manufacturing" },
      { label: "PV Value Chain", route: "home", section: "pv-value-chain" },
      { label: "Manufacturing Process", route: "manufacturing" as RouteName },
    ],
  },
  {
    title: "Support",
    items: [
      { label: "Contact Us", route: "contact" },
      { label: "Channel Partners", route: "contact" },
      { label: "Ask Our Expert", route: "contact" },
    ],
  },
  {
    title: "Resources",
    items: [
      { label: "Resource Center", route: "resources" },
      { label: "Solar Glossary", route: "glossary" },
      { label: "Careers", route: "careers" },
      { label: "Open Positions", route: "careers" },
    ],
  },
];

export const footerSingleLinks: NavItem[] = [
  { label: "Careers", route: "careers" },
];

export const footerLegalLinks: NavItem[] = [
  { label: "Privacy Notice", route: "privacy" },
  { label: "Terms & Conditions", route: "terms" },
  { label: "Disclaimer", route: "terms" },
];

export type { NavItem, FooterNavGroup, NavChild };
