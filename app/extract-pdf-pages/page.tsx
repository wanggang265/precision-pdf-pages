import { JsonLdScript } from "@/components/json-ld";
import { SiteShell } from "@/components/site-shell";
import { ExtractPdfClient } from "./client";
import { buildMetadata, buildSoftwareApplicationSchema, SITE_URL } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Extract PDF Pages Online — Keep Only the Pages You Need",
  description:
    "Extract selected pages from a PDF and save them as a new file, free. No upload needed — private and fast. Works on Windows, Mac, and mobile with no signup.",
  canonical: "/extract-pdf-pages/",
  keywords: ["extract pdf pages", "extract pages from pdf", "pdf page extractor", "extract pdf"],
});

const extractPdfSchema = buildSoftwareApplicationSchema({
  name: "Extract PDF Pages",
  description:
    "Extract selected pages from a PDF and save them as a new file, free. No upload needed — private and fast. Works on Windows, Mac, and mobile with no signup.",
  url: `${SITE_URL}/extract-pdf-pages/`,
  featureList: [
    "Extract selected pages from a PDF",
    "Save extracted pages as a new PDF",
    "Browser-based PDF processing",
  ],
});

export default function ExtractPdfPage() {
  return (
    <SiteShell>
      <JsonLdScript data={extractPdfSchema} />
      <ExtractPdfClient />
    </SiteShell>
  );
}
