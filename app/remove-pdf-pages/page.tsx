import Link from "next/link";
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
    "Remove pages from any PDF online, free and fast. No upload, no watermark, no signup. Works on Windows, Mac, and mobile for PDFs up to 20 MB and 200 pages.",
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
    "Remove pages from any PDF online, free and fast. No upload, no watermark, no signup. Works on Windows, Mac, and mobile for PDFs up to 20 MB and 200 pages.",
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
      text: item.answerText || item.answer,
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
      <section className="mx-auto w-full max-w-7xl px-5 pb-12 sm:px-6 lg:px-8">
        <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_6px_18px_rgba(15,23,42,0.04)] sm:p-6">
          <div className="max-w-3xl">
            <div className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">Related reading</div>
            <h2 className="mt-3 text-xl font-semibold tracking-tight text-slate-950 sm:text-2xl">
              Looking for the best free PDF page remover?
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              We tested 8 popular free PDF page removers on real documents and compared speed, privacy, and output quality. See the results in our full review.
            </p>
            <div className="mt-5">
              <Link
                href="/blog/best-free-pdf-page-removers/"
                className="inline-flex items-center rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Read the comparison →
              </Link>
            </div>
          </div>
        </div>
      </section>
      <RemovePdfCta />
    </SiteShell>
  );
}
