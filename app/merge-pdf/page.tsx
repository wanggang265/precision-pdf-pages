import { JsonLdScript } from "@/components/json-ld";
import { SiteShell } from "@/components/site-shell";
import { MergePdfClient } from "./client";
import { buildMetadata, buildSoftwareApplicationSchema, SITE_URL } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Merge PDF Online — Combine PDFs Free in Your Browser",
  description:
    "Merge multiple PDFs into one document in your browser, free. No upload needed — files are processed locally for privacy. Works on Windows, Mac, and mobile.",
  canonical: "/merge-pdf/",
  keywords: ["merge pdf", "combine pdf", "merge pdf online", "pdf merger"],
});

const mergePdfSchema = buildSoftwareApplicationSchema({
  name: "Merge PDF",
  description:
    "Merge multiple PDFs into one document in your browser, free. No upload needed — files are processed locally for privacy. Works on Windows, Mac, and mobile.",
  url: `${SITE_URL}/merge-pdf/`,
  featureList: [
    "Merge multiple PDFs into one",
    "Arrange PDF order before merging",
    "Browser-based PDF processing",
  ],
});

export default function MergePdfPage() {
  return (
    <SiteShell>
      <JsonLdScript data={mergePdfSchema} />
      <MergePdfClient />
    </SiteShell>
  );
}
