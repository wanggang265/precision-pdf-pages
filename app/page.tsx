import { JsonLdScript } from "@/components/json-ld";
import { SiteShell } from "@/components/site-shell";
import { HomeCtaSection } from "@/components/home/home-cta-section";
import { HomeComplianceStrip } from "@/components/home/home-compliance-strip";
import { HomeFaqSection } from "@/components/home/home-faq-section";
import { HomeHero } from "@/components/home/home-hero";
import { HomeHowItWorks } from "@/components/home/home-how-it-works";
import { HomeLimitsSection } from "@/components/home/home-limits-section";
import { HomeToolGrid } from "@/components/home/home-tool-grid";
import { HomeValueSection } from "@/components/home/home-value-section";
import { buildMetadata, buildSoftwareApplicationSchema, SITE_URL } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Free PDF Tools — Remove, Split, Merge, Extract, Compress",
  description:
    "Free online PDF tools: remove, split, merge, extract, and compress PDFs. All processing runs in your browser — fast, private, and no signup needed.",
  canonical: "/",
  keywords: ["pdf tools", "remove pdf pages", "split pdf", "merge pdf", "extract pdf", "compress pdf"],
});

const homeSchema = buildSoftwareApplicationSchema({
  name: "Remove PDF Pages",
  description:
    "Free online PDF tools: remove, split, merge, extract, and compress PDFs. All processing runs in your browser — fast, private, and no signup needed.",
  url: SITE_URL,
  featureList: [
    "Remove PDF pages",
    "Split PDF by page ranges",
    "Merge multiple PDFs",
    "Extract selected PDF pages",
    "Compress PDF files",
  ],
});

export default function HomePage() {
  return (
    <SiteShell>
      <JsonLdScript data={homeSchema} />
      <HomeHero />
      <HomeToolGrid />
      <HomeValueSection />
      <HomeHowItWorks />
      <HomeLimitsSection />
      <HomeComplianceStrip />
      <HomeFaqSection />
      <HomeCtaSection />
    </SiteShell>
  );
}
