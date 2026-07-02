import { JsonLdScript } from "@/components/json-ld";
import { SiteShell } from "@/components/site-shell";
import { SplitPdfClient } from "./client";
import { buildMetadata, buildSoftwareApplicationSchema, SITE_URL } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Split PDF Online — Free Browser-Based PDF Splitter",
  description:
    "Split a PDF into multiple files by page ranges, right in your browser. No upload to any server — fast, private, and free.",
  canonical: "/split-pdf/",
  keywords: ["split pdf", "pdf splitter", "split pdf online", "pdf page splitter"],
});

const splitPdfSchema = buildSoftwareApplicationSchema({
  name: "Split PDF",
  description:
    "Split a PDF into multiple files by page ranges, right in your browser. No upload to any server — fast, private, and free.",
  url: `${SITE_URL}/split-pdf/`,
  featureList: [
    "Split PDF by page ranges",
    "Download split files as a zip archive",
    "Browser-based PDF processing",
  ],
});

export default function SplitPdfPage() {
  return (
    <SiteShell>
      <JsonLdScript data={splitPdfSchema} />
      <SplitPdfClient />
    </SiteShell>
  );
}
