export type RouteName =
  | "home"
  | "about"
  | "about-what-we-do"
  | "why-solar"
  | "contact"
  | "terms"
  | "privacy"
  | "product-topcon"
  | "product-monoperc"
  | "careers"
  | "glossary"
  | "resources"
  | "sustainability"
  | "compare"
  | "manufacturing";

export const ROUTE_PATH_MAP: Record<RouteName, string> = {
  home: "/",
  about: "/about",
  "about-what-we-do": "/about/what-we-do",
  "why-solar": "/why-solar",
  contact: "/contact",
  terms: "/terms",
  privacy: "/privacy",
  "product-topcon": "/products/topcon",
  "product-monoperc": "/products/monoperc",
  careers: "/careers",
  glossary: "/glossary",
  resources: "/resources",
  sustainability: "/sustainability",
  compare: "/compare",
  manufacturing: "/manufacturing",
};

export const LEGACY_HASH_PATH_MAP: Record<string, string> = {
  "#home": "/",
  "#about": "/about",
  "#about-what-we-do": "/about/what-we-do",
  "#why-solar": "/why-solar",
  "#contact": "/contact",
  "#terms": "/terms",
  "#privacy": "/privacy",
  "#product-topcon": "/products/topcon",
  "#product-monoperc": "/products/monoperc",
  "#careers": "/careers",
  "#glossary": "/glossary",
  "#resources": "/resources",
  "#sustainability": "/sustainability",
  "#compare": "/compare",
  "#manufacturing": "/manufacturing",
};

export function pathToRoute(pathname: string): RouteName {
  const map = Object.fromEntries(
    Object.entries(ROUTE_PATH_MAP).map(([route, path]) => [path, route])
  ) as Record<string, RouteName>;
  return map[pathname] ?? "home";
}

export function routeToPath(route: RouteName): string {
  return ROUTE_PATH_MAP[route] ?? "/";
}
