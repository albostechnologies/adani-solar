import type { MetadataRoute } from "next";
import { INDEXABLE_ROUTES } from "@/lib/seo";
import { ROUTE_PATH_MAP } from "@/lib/routes";
import { siteConfig } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;

  return INDEXABLE_ROUTES.map((route) => ({
    url: `${base}${ROUTE_PATH_MAP[route] === "/" ? "" : ROUTE_PATH_MAP[route]}`,
    lastModified: new Date(),
    changeFrequency: route === "home" ? "weekly" : "monthly",
    priority: route === "home" ? 1 : 0.8,
  }));
}
