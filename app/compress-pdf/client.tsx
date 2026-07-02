"use client";

import { PDFDocument } from "pdf-lib";
import { PdfToolClient } from "@/components/pdf-tool/pdf-tool-client";
import { PdfToolPageLayout } from "@/components/pdf-tool/pdf-tool-page-layout";
import type { ProcessedResult } from "@/components/pdf-tool/pdf-tool-types";

function formatFileSize(bytes: number) {
  if (!Number.isFinite(bytes) || bytes <= 0) return "0 B";
  const units = ["B", "KB", "MB", "GB"];
  let size = bytes;
  let unitIndex = 0;
  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex += 1;
  }
  const fractionDigits = unitIndex === 0 ? 0 : size < 10 ? 1 : 0;
  return `${size.toFixed(fractionDigits)} ${units[unitIndex]}`;
}

export function CompressPdfClient() {
  return (
    <PdfToolPageLayout
      eyebrow="Compress PDF"
      title="Compress a PDF to reduce its file size"
      description="Upload a PDF, remove unused metadata, and save it with object streams for a smaller file. Fast, free, and entirely browser-based."
      operationArea={
        <PdfToolClient
          mode="single"
          actionLabel="Compress PDF"
          toolType="compress"
          validate={({ files }) => {
            if (files.length === 0) return "Upload a PDF first";
            return null;
          }}
          getOutputName={(files) => {
            const baseName = files[0]?.name.replace(/\.pdf$/i, "") || "document";
            return `${baseName}-compressed.pdf`;
          }}
          process={async ({ files }): Promise<ProcessedResult> => {
            const file = files[0];
            const arrayBuffer = await file.arrayBuffer();
            const source = await PDFDocument.load(arrayBuffer);

            // Clear metadata to reduce size
            source.setTitle("");
            source.setAuthor("");
            source.setSubject("");
            source.setKeywords([]);
            source.setProducer("");
            source.setCreator("");

            const bytes = await source.save({ useObjectStreams: true });
            const savedSize = bytes.byteLength;
            const reduction = file.size > 0 ? Math.round(((file.size - savedSize) / file.size) * 100) : 0;

            return {
              bytes,
              fileName: `${file.name.replace(/\.pdf$/i, "") || "document"}-compressed.pdf`,
              summary: `Compressed from ${formatFileSize(file.size)} to ${formatFileSize(savedSize)} (${reduction}% smaller)`,
            };
          }}
        />
      }
      howItWorks={[
        { step: "01", label: "Upload PDF", detail: "Drop the PDF you want to compress into the workspace." },
        { step: "02", label: "Optimize", detail: "The tool clears metadata and uses object streams." },
        { step: "03", label: "Download", detail: "Get a smaller PDF file ready to share or store." },
      ]}
      whyUse={[
        { title: "Privacy first", text: "Compression happens locally \u2014 your file never leaves your device." },
        { title: "Quick results", text: "Reduce file size in seconds without complex settings." },
        { title: "No account needed", text: "Compress PDFs anonymously without signing up." },
      ]}
      faq={[
        { question: "How much can a PDF be compressed?", answer: "Results vary. Metadata removal and object streams usually help, but image-heavy PDFs may see smaller reductions." },
        { question: "Will compression reduce quality?", answer: "No. This tool preserves page content and images while removing extra metadata." },
        { question: "Is there a file size limit?", answer: "Free jobs support up to 20 MB per file." },
        { question: "Can I compress encrypted PDFs?", answer: "No. Password-protected or encrypted PDFs are not supported." },
      ]}
      relatedTools={[
        { href: "/split-pdf/", title: "Split PDF", description: "Split a PDF into multiple files by page ranges." },
        { href: "/merge-pdf/", title: "Merge PDF", description: "Combine multiple PDFs into one file." },
        { href: "/extract-pdf-pages/", title: "Extract PDF Pages", description: "Keep only the pages you need." },
        { href: "/workspace/", title: "Remove PDF Pages", description: "Delete pages you do not need." },
      ]}
      securityText="PDF compression is performed locally in your browser using pdf-lib. We do not upload, store, or inspect your files."
    />
  );
}
