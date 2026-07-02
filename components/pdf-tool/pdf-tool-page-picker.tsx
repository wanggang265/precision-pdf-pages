"use client";

import { LazyPdfThumbnail } from "@/components/pdf-preview/lazy-pdf-thumbnail";

type PdfPage = {
  id: number;
  label: string;
  selected: boolean;
};

type PdfToolPagePickerProps = {
  pages: PdfPage[];
  file?: File;
  blocked: boolean;
  onToggle: (id: number) => void;
  onSelectAll: () => void;
  onClearSelection: () => void;
};

export function PdfToolPagePicker({ pages, file, blocked, onToggle, onSelectAll, onClearSelection }: PdfToolPagePickerProps) {
  const selectedCount = pages.filter((p) => p.selected).length;

  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-base font-semibold text-slate-950">Page picker</h3>
          <p className="text-sm text-slate-600">Select the pages you want to extract.</p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={onSelectAll}
            disabled={blocked}
            className="rounded-full border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Select All
          </button>
          <button
            type="button"
            onClick={onClearSelection}
            disabled={blocked}
            className="rounded-full border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Clear Selection
          </button>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {pages.map((page, index) => (
          <button
            key={page.id}
            type="button"
            onClick={() => onToggle(page.id)}
            disabled={blocked}
            className={`group rounded-[22px] border p-3 text-left transition hover:-translate-y-0.5 hover:shadow-[0_10px_22px_rgba(15,23,42,0.05)] disabled:cursor-not-allowed ${
              page.selected
                ? "border-blue-300 bg-blue-50 shadow-[0_8px_18px_rgba(37,99,235,0.08)]"
                : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">{page.label}</div>
                <div className="mt-1 text-sm font-semibold text-slate-950">Page preview</div>
              </div>
              <div
                className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                  page.selected ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-500"
                }`}
              >
                {page.selected ? "Selected" : "Skip"}
              </div>
            </div>

            <div className="mt-3 overflow-hidden rounded-[18px] border border-slate-200 bg-[linear-gradient(180deg,#f8fafc,#ffffff)] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.75)]">
              {file ? (
                <LazyPdfThumbnail
                  file={file}
                  pageNumber={page.id}
                  cacheKey={file.name}
                  width={140}
                  className="aspect-[3/4] w-full rounded-xl bg-white"
                />
              ) : (
                <div className="flex aspect-[3/4] w-full items-center justify-center rounded-xl bg-slate-100 text-[10px] font-medium text-slate-400">
                  Upload a PDF to preview
                </div>
              )}
            </div>

            <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
              <span>{page.selected ? "Will be extracted" : "Will be skipped"}</span>
              <span className="font-medium text-slate-400">{index + 1}/{pages.length}</span>
            </div>
          </button>
        ))}
      </div>

      {selectedCount > 0 ? (
        <p className="text-xs font-medium text-slate-500">{selectedCount} pages selected for extraction.</p>
      ) : null}
    </div>
  );
}
