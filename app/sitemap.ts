import type { MetadataRoute } from "next";
import { INDEXABLE_ROUTES } from "@/lib/routes";

export const dynamic = "force-static";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://removepdfpages.net";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return INDEXABLE_ROUTES.map((route) => ({
    url: `${siteUrl}${route.path}`,
    lastModified: now,
    changeFrequency: route.changefreq || "monthly",
    priority: route.priority ?? 0.5,
  }));
}
