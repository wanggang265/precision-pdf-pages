"use client";

import { PDFDocument } from "pdf-lib";
import { PdfThumbnail } from "@/components/pdf-preview/pdf-thumbnail";
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
            if (files.length === 0) return "Upload at least one PDF to merge";
            return null;
          }}
          getOutputName={() => "merged.pdf"}
          renderOptions={({ files }) => {
            if (files.length === 0) return null;
            return (
              <div className="space-y-3">
                <div>
                  <h3 className="text-base font-semibold text-slate-950">File preview</h3>
                  <p className="text-sm text-slate-600">
                    Files will be merged in the order shown below.
                  </p>
                </div>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  {files.map((file, index) => (
                    <div
                      key={`${file.name}-${index}`}
                      className="rounded-[22px] border border-slate-200 bg-white p-3 shadow-[0_4px_12px_rgba(15,23,42,0.03)]"
                    >
                      <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                        File {index + 1}
                      </div>
                      <div className="mt-1 text-sm font-semibold text-slate-950 line-clamp-1">{file.name}</div>
                      <div className="mt-3 overflow-hidden rounded-[18px] border border-slate-200 bg-[linear-gradient(180deg,#f8fafc,#ffffff)] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.75)]">
                        <PdfThumbnail
                          file={file}
                          pageNumber={1}
                          cacheKey={file.name}
                          width={140}
                          className="aspect-[3/4] w-full rounded-xl bg-white"
                        />
                      </div>
                      <div className="mt-3 text-xs text-slate-500">{formatFileSize(file.size)}</div>
                    </div>
                  ))}
                </div>
              </div>
            );
          }}
          process={async ({ files }): Promise<ProcessedResult> => {
            if (files.length === 1) {
              const file = files[0];
              const bytes = new Uint8Array(await file.arrayBuffer());
              return {
                bytes,
                fileName: file.name,
                summary: `Kept single PDF · ${bytes.byteLength > 0 ? "ready for download" : ""}`,
              };
            }

            const merged = await PDFDocument.create();
            let totalPages = 0;

            for (const file of files) {
              const arrayBuffer = await file.arrayBuffer();
              const source = await PDFDocument.load(arrayBuffer);
              const pageIndexes = Array.from({ length: source.getPages().length }, (_, i) => i);
              const copiedPages = await merged.copyPages(source, pageIndexes);
              copiedPages.forEach((page) => merged.addPage(page));
              totalPages += source.getPages().length;
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
