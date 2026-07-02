"use client";

import { PDFDocument } from "pdf-lib";
import { PdfToolClient } from "@/components/pdf-tool/pdf-tool-client";
import { PdfToolPageLayout } from "@/components/pdf-tool/pdf-tool-page-layout";
import type { ProcessedResult } from "@/components/pdf-tool/pdf-tool-types";

export function MergePdfClient() {
  return (
    <PdfToolPageLayout
      eyebrow="Merge PDF"
      title="Merge multiple PDFs into one document"
      description="Upload two or more PDFs and combine them into a single file in the order you uploaded them. Everything happens in your browser."
      operationArea={
        <PdfToolClient
          mode="multiple"
          actionLabel="Merge PDFs"
          toolType="merge"
          validate={({ files }) => {
            if (files.length < 2) return "Select at least two PDFs to merge";
            return null;
          }}
          getOutputName={() => "merged.pdf"}
          process={async ({ files }): Promise<ProcessedResult> => {
            const merged = await PDFDocument.create();
            let totalPages = 0;

            for (const file of files) {
              const arrayBuffer = await file.arrayBuffer();
              const source = await PDFDocument.load(arrayBuffer);
              const pageIndexes = Array.from({ length: source.getPageCount() }, (_, i) => i);
              const copiedPages = await merged.copyPages(source, pageIndexes);
              copiedPages.forEach((page) => merged.addPage(page));
              totalPages += source.getPageCount();
            }

            const bytes = await merged.save();
            return {
              bytes,
              fileName: "merged.pdf",
              summary: `Merged ${files.length} PDFs · ${totalPages} pages`,
            };
          }}
        />
      }
      howItWorks={[
        { step: "01", label: "Upload PDFs", detail: "Drop two or more PDFs into the workspace." },
        { step: "02", label: "Arrange order", detail: "Files are merged in the order they are uploaded." },
        { step: "03", label: "Download merged PDF", detail: "Get one combined PDF with all pages in order." },
      ]}
      whyUse={[
        { title: "Browser-based", text: "No server upload \u2014 your files stay on your device." },
        { title: "Preserve quality", text: "Merged PDFs keep the original content and formatting." },
        { title: "Fast and simple", text: "Combine documents in seconds with no account required." },
      ]}
      faq={[
        { question: "How many files can I merge?", answer: "You can merge as many PDFs as fit within the free file-size limit." },
        { question: "Can I reorder files?", answer: "Upload files in the order you want them to appear in the merged result." },
        { question: "Are merged PDFs compressed?", answer: "The merged PDF preserves the original content. Use the compress tool if you need a smaller file." },
        { question: "Is my data private?", answer: "Yes. Merging happens entirely in your browser." },
      ]}
      relatedTools={[
        { href: "/split-pdf/", title: "Split PDF", description: "Split a PDF into multiple files by page ranges." },
        { href: "/extract-pdf-pages/", title: "Extract PDF Pages", description: "Keep only the pages you need." },
        { href: "/compress-pdf/", title: "Compress PDF", description: "Reduce PDF file size in seconds." },
        { href: "/workspace/", title: "Remove PDF Pages", description: "Delete pages you do not need." },
      ]}
      securityText="PDF merging is performed locally in your browser with pdf-lib. We never see, store, or transmit your documents."
    />
  );
}
