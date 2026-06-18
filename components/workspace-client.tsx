"use client";

import { useMemo, useState } from "react";

const initialPages = [
  { id: 1, label: "Page 1", selected: false },
  { id: 2, label: "Page 2", selected: true },
  { id: 3, label: "Page 3", selected: true },
  { id: 4, label: "Page 4", selected: true },
  { id: 5, label: "Page 5", selected: false },
  { id: 6, label: "Page 6", selected: false },
  { id: 7, label: "Page 7", selected: false },
  { id: 8, label: "Page 8", selected: false },
];

const fileInfo = {
  name: "design-review.pdf",
  size: "18.4 MB",
  pages: 8,
};

function statusCopy(status: string) {
  switch (status) {
    case "uploading":
      return "Uploading file…";
    case "scanning":
      return "Scanning pages…";
    case "processing":
      return "Deleting selected pages…";
    case "success":
      return "Your PDF is ready.";
    default:
      return "Preview ready.";
  }
}

export function WorkspaceClient() {
  const [status, setStatus] = useState<"ready" | "uploading" | "scanning" | "processing" | "success">("ready");
  const [pages, setPages] = useState(initialPages);
  const selectedCount = pages.filter((page) => page.selected).length;
  const canDelete = selectedCount > 0 && status !== "processing";

  const summary = useMemo(() => {
    if (status === "success") {
      return "3 pages removed · cleaned PDF ready for download";
    }
    if (status === "processing") {
      return `${selectedCount} pages queued for deletion`;
    }
    if (status === "uploading") {
      return "File upload in progress";
    }
    if (status === "scanning") {
      return "Scanning the document for page thumbnails";
    }
    return `${selectedCount} pages selected for deletion`;
  }, [selectedCount, status]);

  const togglePage = (id: number) => {
    if (status === "processing" || status === "success") return;
    setPages((current) => current.map((page) => (page.id === id ? { ...page, selected: !page.selected } : page)));
  };

  const selectAll = () => {
    if (status === "processing" || status === "success") return;
    setPages((current) => current.map((page) => ({ ...page, selected: true })));
  };

  const clearSelection = () => {
    if (status === "processing" || status === "success") return;
    setPages((current) => current.map((page) => ({ ...page, selected: false })));
  };

  const runDeletion = () => {
    if (!canDelete) return;
    setStatus("processing");
    window.setTimeout(() => setStatus("success"), 900);
  };

  const reset = () => {
    setStatus("ready");
    setPages(initialPages);
  };

  return (
    <div className="space-y-8 rounded-[32px] border border-slate-200 bg-white p-5 shadow-[0_30px_120px_rgba(15,23,42,0.08)] sm:p-6">
      <div className="flex flex-col gap-4 rounded-[28px] border border-slate-200 bg-slate-50 p-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">File information</p>
            <h2 className="mt-2 text-lg font-semibold text-slate-950">{fileInfo.name}</h2>
            <p className="mt-1 text-sm text-slate-600">
              {fileInfo.size} · {fileInfo.pages} pages · {statusCopy(status)}
            </p>
          </div>
          <div className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
            Anonymous use available
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          {[
            { label: "State", value: statusCopy(status) },
            { label: "Selection", value: summary },
            { label: "Limits", value: "Up to 20 MB free / 200 pages" },
          ].map((item) => (
            <div key={item.label} className="rounded-2xl border border-slate-200 bg-white p-4">
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">{item.label}</div>
              <div className="mt-2 text-sm font-medium text-slate-800">{item.value}</div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => setStatus("uploading")}
            className="rounded-full bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Upload PDF
          </button>
          <button
            type="button"
            onClick={() => setStatus("scanning")}
            className="rounded-full border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-100"
          >
            Scan preview
          </button>
          <button
            type="button"
            onClick={reset}
            className="rounded-full border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-100"
          >
            Start over
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-semibold text-slate-950">Page picker</h3>
            <p className="text-sm text-slate-600">Select the pages you want to remove.</p>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={selectAll}
              className="rounded-full border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              Select All
            </button>
            <button
              type="button"
              onClick={clearSelection}
              className="rounded-full border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              Clear Selection
            </button>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {pages.map((page) => (
            <button
              key={page.id}
              type="button"
              onClick={() => togglePage(page.id)}
              className={`group rounded-2xl border p-3 text-left transition ${
                page.selected
                  ? "border-blue-200 bg-blue-50 shadow-sm"
                  : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">{page.label}</div>
                <div
                  className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                    page.selected ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {page.selected ? "Selected" : "Keep"}
                </div>
              </div>
              <div className="mt-4 rounded-xl border border-dashed border-slate-200 bg-gradient-to-br from-white to-slate-50 p-4">
                <div className="h-24 rounded-lg bg-[linear-gradient(180deg,#eff6ff,white)]" />
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3 rounded-[28px] border border-slate-200 bg-slate-950 p-5 text-white sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">Primary action</div>
          <div className="mt-2 text-lg font-semibold">{selectedCount} pages selected</div>
          <div className="mt-1 text-sm text-slate-300">{summary}</div>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={runDeletion}
            disabled={!canDelete}
            className="rounded-full bg-blue-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-400 disabled:cursor-not-allowed disabled:bg-slate-700"
          >
            {status === "processing" ? "Deleting Selected Pages…" : "Delete Selected Pages"}
          </button>
          <button
            type="button"
            disabled={status !== "success"}
            className="rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Download result
          </button>
        </div>
      </div>

      {status === "success" ? (
        <div className="rounded-[28px] border border-emerald-200 bg-emerald-50 p-5">
          <div className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-700">Success state</div>
          <div className="mt-2 text-xl font-semibold text-emerald-950">Your PDF is ready.</div>
          <p className="mt-2 text-sm leading-6 text-emerald-800">
            The cleaned PDF has been generated and is ready for download.
          </p>
        </div>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { title: "File limits", text: "Free up to 20 MB and up to 200 pages. Larger jobs may require credits." },
          { title: "Unsupported files", text: "Password-protected or encrypted PDFs are not supported." },
          { title: "Trust", text: "Works in your browser with a lightweight, privacy-first experience." },
        ].map((item) => (
          <div key={item.title} className="rounded-3xl border border-slate-200 bg-white p-5">
            <div className="text-sm font-semibold text-slate-950">{item.title}</div>
            <p className="mt-2 text-sm leading-6 text-slate-600">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
