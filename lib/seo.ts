import type { Metadata } from "next";

export interface PageSeoConfig {
  title: string;
  description: string;
  canonical: string;
  keywords?: string[];
  ogImageUrl?: string;
  ogImageAlt?: string;
  noindex?: boolean;
}

const SITE_NAME = "Remove PDF Pages";
const DEFAULT_OG_IMAGE = "/og-image.png";

export function buildMetadata(config: PageSeoConfig): Metadata {
  const ogImageUrl = config.ogImageUrl || DEFAULT_OG_IMAGE;
  const ogImageAlt = config.ogImageAlt || config.title;

  return {
    title: { absolute: config.title },
    description: config.description,
    keywords: config.keywords,
    alternates: {
      canonical: config.canonical,
    },
    robots: config.noindex ? "noindex, follow" : undefined,
    openGraph: {
      type: "website",
      locale: "en_US",
      url: config.canonical,
      siteName: SITE_NAME,
      title: config.title,
      description: config.description,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: ogImageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: config.title,
      description: config.description,
      images: [ogImageUrl],
    },
  };
}

export interface ToolSchemaConfig {
  name: string;
  description: string;
  url: string;
  featureList?: string[];
}

export function buildSoftwareApplicationSchema(config: ToolSchemaConfig) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: config.name,
    description: config.description,
    applicationCategory: "BrowserApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: config.featureList || [config.name],
    url: config.url,
    softwareVersion: "1.0.0",
  };
}

export function buildWebPageSchema(config: { name: string; description: string; url: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: config.name,
    description: config.description,
    url: config.url,
  };
}

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://removepdfpages.net";
