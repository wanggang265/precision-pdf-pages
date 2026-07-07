import { JsonLdScript } from "@/components/json-ld";
import { SiteShell } from "@/components/site-shell";
import { RemovePdfCta } from "@/components/remove-pdf-pages/landing-cta";
import { RemovePdfFaq, removePdfFaqItems } from "@/components/remove-pdf-pages/landing-faq";
import { RemovePdfHero } from "@/components/remove-pdf-pages/landing-hero";
import { RemovePdfHowItWorks } from "@/components/remove-pdf-pages/landing-how-it-works";
import { RemovePdfLimits } from "@/components/remove-pdf-pages/landing-limits";
import { RemovePdfUseCases } from "@/components/remove-pdf-pages/landing-use-cases";
import { RemovePdfWhatIs } from "@/components/remove-pdf-pages/landing-what-is";
import { RemovePdfWhyChoose } from "@/components/remove-pdf-pages/landing-why-choose";
import { buildMetadata, buildSoftwareApplicationSchema, SITE_URL } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Remove Pages from PDF — Free Online PDF Page Remover (2026)",
  description:
    "Remove pages from any PDF in seconds. No signup, no upload to a server, and no watermarks. Free for files up to 20 MB and 200 pages. Works on Mac, Windows, and mobile.",
  canonical: "/remove-pdf-pages/",
  keywords: [
    "remove pages from pdf",
    "delete pdf pages",
    "pdf page remover",
    "remove pdf pages online",
    "delete pages from pdf free",
  ],
});

const softwareSchema = buildSoftwareApplicationSchema({
  name: "Remove PDF Pages",
  description:
    "Remove pages from any PDF in seconds. No signup, no upload to a server, and no watermarks. Free for files up to 20 MB and 200 pages. Works on Mac, Windows, and mobile.",
  url: `${SITE_URL}/remove-pdf-pages/`,
  featureList: [
    "Remove PDF pages",
    "Browser-based PDF processing",
    "No watermark on output",
    "Works on Mac, Windows, and mobile",
  ],
});

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Remove Pages from a PDF Online",
  step: [
    {
      "@type": "HowToStep",
      name: "Upload your PDF",
      text: "Open the tool and upload the PDF file you want to clean up.",
    },
    {
      "@type": "HowToStep",
      name: "Select pages to delete",
      text: "Click the pages you want to remove from the preview grid.",
    },
    {
      "@type": "HowToStep",
      name: "Download the result",
      text: "Save the trimmed PDF to your device without watermarks.",
    },
  ],
};

const faqPageSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: removePdfFaqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: `${SITE_URL}/`,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Remove PDF Pages",
      item: `${SITE_URL}/remove-pdf-pages/`,
    },
  ],
};

export default function RemovePdfPagesPage() {
  return (
    <SiteShell>
      <JsonLdScript data={[softwareSchema, howToSchema, faqPageSchema, breadcrumbSchema]} />
      <RemovePdfHero />
      <RemovePdfWhatIs />
      <RemovePdfHowItWorks />
      <RemovePdfLimits />
      <RemovePdfUseCases />
      <RemovePdfWhyChoose />
      <RemovePdfFaq />
      <RemovePdfCta />
    </SiteShell>
  );
}
