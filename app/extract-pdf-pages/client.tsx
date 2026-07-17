"use client";

import { PDFDocument } from "pdf-lib";
import { PdfToolClient } from "@/components/pdf-tool/pdf-tool-client";
import { PdfToolPageLayout } from "@/components/pdf-tool/pdf-tool-page-layout";
import type { ProcessedResult } from "@/components/pdf-tool/pdf-tool-types";

export function ExtractPdfClient() {
  return (
    <PdfToolPageLayout
      eyebrow="Extract PDF Pages"
      title="Extract selected pages into a new PDF"
      description="Upload a PDF, choose the pages you want to keep, and download a new file containing only those pages. Everything runs in your browser."
      operationArea={
        <PdfToolClient
          mode="single"
          actionLabel="Extract Pages"
          toolType="extract"
          validate={({ files, pages }) => {
            if (files.length === 0) return "Upload a PDF first";
            const selectedCount = pages.filter((p) => p.selected).length;
            if (selectedCount === 0) return "Select at least one page to extract";
            return null;
          }}
          getOutputName={(files) => {
            const baseName = files[0]?.name.replace(/\.pdf$/i, "") || "document";
            return `${baseName}-extracted.pdf`;
          }}
          process={async ({ files, pages }): Promise<ProcessedResult> => {
            const file = files[0];
            const arrayBuffer = await file.arrayBuffer();
            const source = await PDFDocument.load(arrayBuffer);
            const selectedIndexes = pages.filter((p) => p.selected).map((p) => p.id - 1);

            const output = await PDFDocument.create();
            const copiedPages = await output.copyPages(source, selectedIndexes);
            copiedPages.forEach((page) => output.addPage(page));

            const bytes = await output.save();
            return {
              bytes,
              fileName: `${file.name.replace(/\.pdf$/i, "") || "document"}-extracted.pdf`,
              summary: `Extracted ${selectedIndexes.length} page${selectedIndexes.length === 1 ? "" : "s"}`,
            };
          }}
        />
      }
      howItWorks={[
        { step: "01", label: "Upload PDF", detail: "Drop the PDF you want to extract pages from." },
        { step: "02", label: "Select pages", detail: "Click the page cards you want to keep in the new file." },
        { step: "03", label: "Download result", detail: "Get a new PDF with only the selected pages." },
      ]}
      whyUse={[
        { title: "Visual page picker", text: "See every page and choose exactly what to keep." },
        { title: "Private by design", text: "No upload to any server \u2014 extraction happens locally." },
        { title: "Preserve formatting", text: "The extracted PDF keeps the original layout and quality." },
      ]}
      faq={[
        { question: "Can I extract non-consecutive pages?", answer: "Yes. Select any combination of pages in the visual picker." },
        { question: "What happens to the original PDF?", answer: "Nothing. We create a new PDF and never modify or store your original file." },
        { question: "Is there a page limit?", answer: "Free jobs support up to 200 pages per file." },
        { question: "Are extracted files compressed?", answer: "No. Use the compress tool if you need a smaller extracted file." },
      ]}
      relatedTools={[
        { href: "/split-pdf/", title: "Split PDF", description: "Split a PDF into multiple files by page ranges." },
        { href: "/merge-pdf/", title: "Merge PDF", description: "Combine multiple PDFs into one file." },
        { href: "/compress-pdf/", title: "Compress PDF", description: "Reduce PDF file size in seconds." },
        { href: "/remove-pdf-pages/", title: "Remove PDF Pages", description: "Delete pages you do not need." },
      ]}
      securityText="Page extraction runs entirely in your browser with pdf-lib. Your document is never transmitted to or stored on our servers."
    />
  );
}
