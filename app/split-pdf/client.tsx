"use client";

import { PDFDocument } from "pdf-lib";
import JSZip from "jszip";
import { PdfToolClient } from "@/components/pdf-tool/pdf-tool-client";
import { PdfToolPageLayout } from "@/components/pdf-tool/pdf-tool-page-layout";
import type { ProcessedResult } from "@/components/pdf-tool/pdf-tool-types";

type PageRangeResult = {
  ranges: number[][];
  error: string | null;
};

function parsePageRanges(input: string, maxPage: number): PageRangeResult {
  const ranges: number[][] = [];
  const parts = input.split(",").map((p) => p.trim()).filter(Boolean);

  if (parts.length === 0) {
    return { ranges: [], error: "Enter at least one page range" };
  }

  for (const part of parts) {
    if (part.includes("-")) {
      const [startStr, endStr] = part.split("-");
      const start = parseInt(startStr.trim(), 10);
      const end = parseInt(endStr.trim(), 10);

      if (Number.isNaN(start) || Number.isNaN(end)) {
        return { ranges: [], error: `Invalid range: "${part}"` };
      }
      if (start < 1) {
        return { ranges: [], error: `Page numbers must be at least 1 (got ${start} in "${part}")` };
      }
      if (end > maxPage) {
        return { ranges: [], error: `Some page ranges exceed the document page count (${maxPage} page${maxPage === 1 ? "" : "s"})` };
      }
      if (start > end) {
        return { ranges: [], error: `Start page must be less than or equal to end page in "${part}"` };
      }

      const range: number[] = [];
      for (let i = start; i <= end; i++) range.push(i - 1);
      ranges.push(range);
    } else {
      const page = parseInt(part, 10);
      if (Number.isNaN(page)) {
        return { ranges: [], error: `Invalid page number: "${part}"` };
      }
      if (page < 1) {
        return { ranges: [], error: `Page numbers must be at least 1 (got ${page})` };
      }
      if (page > maxPage) {
        return { ranges: [], error: `Some page ranges exceed the document page count (${maxPage} page${maxPage === 1 ? "" : "s"})` };
      }
      ranges.push([page - 1]);
    }
  }

  if (ranges.length === 0) {
    return { ranges: [], error: "No valid page ranges found" };
  }

  return { ranges, error: null };
}

export function SplitPdfClient() {
  return (
    <PdfToolPageLayout
      eyebrow="Split PDF"
      title="Split a PDF into multiple files by page ranges"
      description="Upload one PDF, enter the page ranges you want to split into separate files, and download a zip of the results — all in your browser."
      operationArea={
        <PdfToolClient
          mode="single"
          actionLabel="Split PDF"
          toolType="split"
          showPreview
          previewProps={{
            title: "Page preview",
            description: "Preview every page before entering the ranges to split.",
            readOnly: true,
          }}
          renderOptions={({ files, status, pages, options, setOptions }) => {
            const blocked = !["ready", "unsupported", "over-limit", "credits"].includes(status);
            const rangeResult = pages.length > 0
              ? parsePageRanges(String(options || ""), pages.length)
              : { ranges: [], error: null };
            return (
              <div className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-[0_4px_12px_rgba(15,23,42,0.03)]">
                <label htmlFor="split-ranges" className="block text-sm font-semibold text-slate-950">
                  Page ranges
                </label>
                <p className="mt-1 text-sm text-slate-600">
                  Example: <code className="rounded bg-slate-100 px-1 py-0.5 text-xs">1-3, 5, 7-9</code>
                </p>
                <input
                  id="split-ranges"
                  type="text"
                  value={(options as string) || ""}
                  onChange={(e) => setOptions(e.target.value)}
                  disabled={blocked || files.length === 0}
                  placeholder={files.length === 0 ? "Upload a PDF first" : "e.g. 1-3, 5, 7-9"}
                  className="mt-3 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-950 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:opacity-50"
                />
                {pages.length > 0 ? (
                  <p className="mt-2 text-xs text-slate-500">Total pages detected: {pages.length}</p>
                ) : null}
                {rangeResult.error ? (
                  <p className="mt-2 rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700">
                    {rangeResult.error}
                  </p>
                ) : null}
              </div>
            );
          }}
          validate={({ files, options, pages }) => {
            if (files.length === 0) return "Upload a PDF first";
            const input = String(options || "").trim();
            if (!input) return "Enter at least one page range";
            if (pages.length === 0) return null;
            const { error } = parsePageRanges(input, pages.length);
            return error;
          }}
          getOutputName={(files) => {
            const baseName = files[0]?.name.replace(/\.pdf$/i, "") || "document";
            return `${baseName}-split.zip`;
          }}
          process={async ({ files, options }): Promise<ProcessedResult> => {
            const file = files[0];
            const arrayBuffer = await file.arrayBuffer();
            const source = await PDFDocument.load(arrayBuffer);
            const pageCount = source.getPages().length;
            const { ranges, error } = parsePageRanges(String(options || ""), pageCount);
            if (error) throw new Error(error);

            const zip = new JSZip();
            const baseName = file.name.replace(/\.pdf$/i, "") || "document";

            for (let i = 0; i < ranges.length; i++) {
              const range = ranges[i];
              const newPdf = await PDFDocument.create();
              const copiedPages = await newPdf.copyPages(source, range);
              copiedPages.forEach((page) => newPdf.addPage(page));
              const bytes = await newPdf.save();
              zip.file(`${baseName}-part-${i + 1}.pdf`, bytes);
            }

            const zipBytes = await zip.generateAsync({ type: "uint8array" });
            return {
              bytes: zipBytes,
              fileName: `${baseName}-split.zip`,
              summary: `Split into ${ranges.length} PDF${ranges.length === 1 ? "" : "s"}`,
            };
          }}
        />
      }
      howItWorks={[
        { step: "01", label: "Upload PDF", detail: "Drop the PDF you want to split into the workspace." },
        { step: "02", label: "Enter ranges", detail: "Type the page ranges you want as separate files." },
        { step: "03", label: "Download zip", detail: "Get a zip archive containing each split PDF." },
      ]}
      whyUse={[
        { title: "No server upload", text: "Your PDF is processed entirely in your browser for privacy." },
        { title: "Flexible ranges", text: "Split by single pages or custom ranges with simple comma-separated input." },
        { title: "Instant results", text: "Generate split PDFs in seconds and download them as a single zip." },
      ]}
      faq={[
        { question: "What page-range format is supported?", answer: "Use comma-separated numbers and ranges like 1-3, 5, 7-9." },
        { question: "Is there a file size limit?", answer: "Free jobs support up to 20 MB. Larger files may require credits." },
        { question: "Are my files uploaded to a server?", answer: "No. The entire split operation happens in your browser." },
        { question: "Can I split encrypted PDFs?", answer: "No. Password-protected or encrypted PDFs are not supported." },
      ]}
      relatedTools={[
        { href: "/merge-pdf/", title: "Merge PDF", description: "Combine multiple PDFs into one file." },
        { href: "/extract-pdf-pages/", title: "Extract PDF Pages", description: "Keep only the pages you need." },
        { href: "/compress-pdf/", title: "Compress PDF", description: "Reduce PDF file size in seconds." },
        { href: "/remove-pdf-pages/", title: "Remove PDF Pages", description: "Delete pages you do not need." },
      ]}
      securityText="All PDF splitting happens locally in your browser using pdf-lib. Your file contents never leave your device, and nothing is stored on our servers."
    />
  );
}
