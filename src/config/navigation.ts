import type { RouteName } from "@/lib/routes";

export type NavItemVariant = "link" | "button" | "button-secondary";

export interface NavItem {
  label: string;
  route: RouteName;
  variant?: NavItemVariant;
}

interface FooterNavGroup {
  title: string;
  items: NavItem[];
}

/** Pages that start on a light background — header uses solid styling immediately */
export const LIGHT_HEADER_ROUTES: RouteName[] = ["contact", "privacy", "terms"];

/** Primary navbar — client-approved: Home, About, Contact Us, Check Your Status */
export const headerNavItems: NavItem[] = [
  { label: "Home", route: "home", variant: "link" },
  { label: "About", route: "about", variant: "link" },
  { label: "Contact Us", route: "contact", variant: "button" },
  { label: "Check Your Status", route: "check-status", variant: "button-secondary" },
];

export const footerNavGroups: FooterNavGroup[] = [
  {
    title: "Company",
    items: [
      { label: "Home", route: "home" },
      { label: "About Adani Solar", route: "about" },
      { label: "Check Your Status", route: "check-status" },
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
