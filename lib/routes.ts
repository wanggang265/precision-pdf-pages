/**
 * Central registry of all site routes that are eligible for SEO.
 *
 * This file is used by `app/sitemap.ts` to generate the XML sitemap. Routes
 * marked with `noindex: true` are excluded from the sitemap automatically.
 *
 * Important: the `noindex` flag here must stay in sync with the `robots`
 * metadata declared in each page's `page.tsx` (via `lib/seo.ts`). If a page
 * is marked noindex in its metadata, it must also be marked noindex here,
 * otherwise it could accidentally be included in the sitemap.
 */

export type ChangeFrequency =
  | "always"
  | "hourly"
  | "daily"
  | "weekly"
  | "monthly"
  | "yearly"
  | "never";

export interface SiteRoute {
  path: string;
  /** Set to true for pages that should not be indexed and therefore not listed in the sitemap. */
  noindex?: boolean;
  changefreq?: ChangeFrequency;
  priority?: number;
}

export const SITE_ROUTES: SiteRoute[] = [
  { path: "/", changefreq: "weekly", priority: 1 },
  { path: "/remove-pdf-pages/", changefreq: "weekly", priority: 1 },
  { path: "/blog/best-free-pdf-page-removers/", changefreq: "monthly", priority: 0.8 },
  { path: "/split-pdf/", changefreq: "weekly", priority: 0.8 },
  { path: "/merge-pdf/", changefreq: "weekly", priority: 0.8 },
  { path: "/extract-pdf-pages/", changefreq: "weekly", priority: 0.8 },
  { path: "/compress-pdf/", changefreq: "weekly", priority: 0.8 },
  { path: "/pricing/", changefreq: "monthly", priority: 0.6 },
  { path: "/privacy/", changefreq: "yearly", priority: 0.4 },
  { path: "/terms/", changefreq: "yearly", priority: 0.3 },
  { path: "/contact/", changefreq: "yearly", priority: 0.3 },
  { path: "/faq/", changefreq: "monthly", priority: 0.7 },
  { path: "/tools/", changefreq: "monthly", priority: 0.7 },
  // Noindex pages are listed here for completeness but filtered out of the sitemap.
  // Keep this in sync with the `noindex` metadata in each page's `page.tsx`.
  { path: "/workspace/", noindex: true, changefreq: "weekly", priority: 0.5 },
  { path: "/checkout/success/", noindex: true, changefreq: "yearly", priority: 0.3 },
  { path: "/checkout/cancel/", noindex: true, changefreq: "yearly", priority: 0.3 },
];

/** All routes that should be indexed and therefore appear in the sitemap. */
export const INDEXABLE_ROUTES = SITE_ROUTES.filter((route) => !route.noindex);
