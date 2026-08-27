import type { RouteName } from "@/lib/routes";

export type NavItemVariant = "link" | "button" | "button-secondary";

export interface NavItem {
  label: string;
  route: RouteName;
  /** Optional in-page section hash (e.g. business-partnership) */
  section?: string;
  variant?: NavItemVariant;
}

interface FooterNavGroup {
  title: string;
  items: NavItem[];
}

/** Pages that start on a light background — header uses solid styling immediately */
export const LIGHT_HEADER_ROUTES: RouteName[] = ["contact", "privacy", "terms", "check-status"];

/** Primary navbar — Home, About, Check Status, Contact Us only */
export const headerNavItems: NavItem[] = [
  { label: "Home", route: "home", variant: "link" },
  { label: "About", route: "about", variant: "link" },
  { label: "Check Status", route: "check-status", variant: "link" },
  { label: "Contact Us", route: "contact", variant: "button" },
];

export const footerNavGroups: FooterNavGroup[] = [
  {
    title: "Company",
    items: [
      { label: "Home", route: "home" },
      { label: "About Adani Solar", route: "about" },
      { label: "Check Status", route: "check-status" },
    ],
  },
  {
    title: "Contact",
    items: [{ label: "Contact Us", route: "contact" }],
  },
];

export const footerLegalLinks: NavItem[] = [
  { label: "Privacy Notice", route: "privacy" },
  { label: "Terms & Conditions", route: "terms" },
];

export type { FooterNavGroup };
