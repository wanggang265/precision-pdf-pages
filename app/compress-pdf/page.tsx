import { JsonLdScript } from "@/components/json-ld";
import { SiteShell } from "@/components/site-shell";
import { CompressPdfClient } from "./client";
import { buildMetadata, buildSoftwareApplicationSchema, SITE_URL } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Compress PDF Online — Reduce File Size Free in Browser",
  description:
    "Compress PDF files quickly and privately. Upload your PDF, remove unused metadata, and download a smaller file — all processed locally in your browser.",
  canonical: "/compress-pdf/",
  keywords: ["compress pdf", "reduce pdf size", "compress pdf online", "pdf compressor"],
});

const compressPdfSchema = buildSoftwareApplicationSchema({
  name: "Compress PDF",
  description:
    "Compress PDF files quickly and privately. Upload your PDF, remove unused metadata, and download a smaller file — all processed locally in your browser.",
  url: `${SITE_URL}/compress-pdf/`,
  featureList: [
    "Compress PDF files locally",
    "Reduce file size and remove unused metadata",
    "Browser-based PDF processing",
  ],
});

export default function CompressPdfPage() {
  return (
    <SiteShell>
      <JsonLdScript data={compressPdfSchema} />
      <CompressPdfClient />
    </SiteShell>
  );
}
