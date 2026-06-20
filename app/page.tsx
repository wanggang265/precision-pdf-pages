import type { Metadata } from "next";
import { SiteShell } from "@/components/site-shell";
import { HomeCtaSection } from "@/components/home/home-cta-section";
import { HomeComplianceStrip } from "@/components/home/home-compliance-strip";
import { HomeFaqSection } from "@/components/home/home-faq-section";
import { HomeHero } from "@/components/home/home-hero";
import { HomeHowItWorks } from "@/components/home/home-how-it-works";
import { HomeLimitsSection } from "@/components/home/home-limits-section";
import { HomeValueSection } from "@/components/home/home-value-section";

export const metadata: Metadata = {
  title: "Remove PDF pages in seconds",
  description:
    "A focused tool for deleting unwanted pages from a PDF. Upload a file, mark the pages to remove, and download the result.",
};

export default function HomePage() {
  return (
    <SiteShell>
      <HomeHero />
      <HomeValueSection />
      <HomeHowItWorks />
      <HomeLimitsSection />
      <HomeComplianceStrip />
      <HomeFaqSection />
      <HomeCtaSection />
    </SiteShell>
  );
}
