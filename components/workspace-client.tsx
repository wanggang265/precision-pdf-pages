"use client";

import { useMemo, useState } from "react";

type WorkspaceStatus =
  | "ready"
  | "uploading"
  | "scanning"
  | "processing"
  | "success"
  | "over-limit"
  | "unsupported"
  | "credits"
  | "cookie";

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

function statusMeta(status: WorkspaceStatus) {
  switch (status) {
    case "uploading":
      return { label: "Uploading file…", tone: "blue", note: "The file is being added to the workspace." };
    case "scanning":
      return { label: "Scanning pages…", tone: "blue", note: "Generating thumbnails and page metadata." };
    case "processing":
      return { label: "Deleting selected pages…", tone: "blue", note: "Processing your page removal request." };
    case "success":
      return { label: "Your PDF is ready.", tone: "emerald", note: "The cleaned PDF is ready for download." };
    case "over-limit":
      return { label: "File is too large for the free tier.", tone: "amber", note: "Try a smaller file or upgrade for larger jobs." };
    case "unsupported":
      return { label: "Encrypted PDFs are not supported.", tone: "rose", note: "Password-protected files cannot be processed." };
    case "credits":
      return { label: "Credits are required for this job.", tone: "amber", note: "This file exceeds the free usage boundary." };
    case "cookie":
      return { label: "Cookie consent required.", tone: "slate", note: "Set your preferences before continuing." };
    default:
      return { label: "Preview ready.", tone: "emerald", note: "Review the thumbnails and remove pages you do not need." };
  }
}

export function WorkspaceClient() {
  const [status, setStatus] = useState<WorkspaceStatus>("ready");
  const [pages, setPages] = useState(initialPages);
  const selectedCount = pages.filter((page) => page.selected).length;
  const blocked = ["processing", "success", "over-limit", "unsupported", "credits", "cookie"].includes(status);
  const canDelete = selectedCount > 0 && status !== "processing" && status !== "success";

  const statusInfo = useMemo(() => statusMeta(status), [status]);

  const summary = useMemo(() => {
    if (status === "success") return `${selectedCount} pages removed · cleaned PDF ready for download`;
    if (status === "processing") return `${selectedCount} pages queued for deletion`;
    if (status === "uploading") return "File upload in progress";
    if (status === "scanning") return "Scanning the document for page thumbnails";
    if (status === "over-limit") return "This file is over the free tier boundary";
    if (status === "unsupported") return "Password-protected files cannot be processed";
    if (status === "credits") return "Credits are required to continue";
    if (status === "cookie") return "Consent is required before continuing";
    return `${selectedCount} pages selected for deletion`;
  }, [selectedCount, status]);

  const togglePage = (id: number) => {
    if (blocked) return;
    setPages((current) => current.map((page) => (page.id === id ? { ...page, selected: !page.selected } : page)));
  };

  const selectAll = () => {
    if (blocked) return;
    setPages((current) => current.map((page) => ({ ...page, selected: true })));
  };

  const clearSelection = () => {
    if (blocked) return;
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

  const actionLabel = status === "processing" ? "Deleting Selected Pages…" : "Delete Selected Pages";
  const toneClasses: Record<string, string> = {
    blue: "border-blue-200 bg-blue-50 text-blue-800",
    emerald: "border-emerald-200 bg-emerald-50 text-emerald-800",
    amber: "border-amber-200 bg-amber-50 text-amber-800",
    rose: "border-rose-200 bg-rose-50 text-rose-800",
    slate: "border-slate-200 bg-slate-50 text-slate-700",
  };

  return (
    <div className="space-y-6 rounded-[32px] border border-slate-200 bg-[linear-gradient(180deg,#ffffff,#fbfdff)] p-4 shadow-[0_16px_48px_rgba(15,23,42,0.05)] sm:p-5">
      <div className="flex flex-col gap-3 rounded-[24px] border border-slate-200 bg-[linear-gradient(180deg,#f8fbff,#f8fafc)] p-4">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">File information</p>
            <h2 className="mt-2 text-lg font-semibold text-slate-950">{fileInfo.name}</h2>
            <p className="mt-1 text-sm text-slate-600">
              {fileInfo.size} · {fileInfo.pages} pages · {statusInfo.label}
            </p>
          </div>
          <div className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
            Anonymous use available
          </div>
        </div>

        <div className={`rounded-lg border px-4 py-3 text-sm font-medium ${toneClasses[statusInfo.tone]}`}>
          <div className="font-semibold">{statusInfo.label}</div>
          <div className="mt-1 text-sm font-normal">{statusInfo.note}</div>
        </div>

        <div className="grid gap-2.5 sm:grid-cols-3">
          {[
            { label: "State", value: statusInfo.label },
            { label: "Selection", value: summary },
            { label: "Limits", value: "Up to 20 MB free / 200 pages" },
          ].map((item) => (
            <div key={item.label} className="rounded-lg border border-slate-200 bg-white p-4">
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">{item.label}</div>
              <div className="mt-2 text-sm font-medium text-slate-800">{item.value}</div>
            </div>
          ))}
        </div>

          <div className="flex flex-wrap gap-2 rounded-lg border border-slate-200 bg-white/80 p-1.5 shadow-[0_2px_6px_rgba(15,23,42,0.04)]">
          {[
            ["ready", "Ready"],
            ["uploading", "Uploading"],
            ["scanning", "Scanning"],
            ["processing", "Processing"],
            ["success", "Success"],
            ["over-limit", "Over limit"],
            ["unsupported", "Unsupported"],
            ["credits", "Credits required"],
            ["cookie", "Cookie consent"],
          ].map(([value, label]) => (
            <button
              key={value}
              type="button"
              onClick={() => setStatus(value as WorkspaceStatus)}
              className={`rounded-full border px-3 py-2 text-xs font-semibold transition hover:-translate-y-0.5 hover:shadow-sm ${
                status === value
                  ? "border-slate-950 bg-slate-950 text-white"
                  : "border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-white"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => setStatus("uploading")}
            className="rounded-full bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-[0_6px_16px_rgba(37,99,235,0.18)] transition hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-[0_10px_22px_rgba(37,99,235,0.22)] active:translate-y-0"
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

      <div className="space-y-3">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-semibold text-slate-950">Page picker</h3>
            <p className="text-sm text-slate-600">Select the pages you want to remove.</p>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={selectAll}
              disabled={blocked}
              className="rounded-full border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Select All
            </button>
            <button
              type="button"
              onClick={clearSelection}
              disabled={blocked}
              className="rounded-full border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Clear Selection
            </button>
          </div>
        </div>

        <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
          {pages.map((page) => (
            <button
              key={page.id}
              type="button"
              onClick={() => togglePage(page.id)}
              disabled={blocked}
              className={`group rounded-lg border p-2.5 text-left transition hover:-translate-y-0.5 hover:shadow-[0_8px_18px_rgba(15,23,42,0.04)] disabled:cursor-not-allowed ${
                page.selected
                  ? "border-blue-300 bg-blue-50 shadow-[0_6px_16px_rgba(37,99,235,0.08)]"
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
              <div className="mt-4 rounded-lg border border-dashed border-slate-200 bg-gradient-to-br from-white to-slate-50 p-4">
                <div className="h-24 rounded-lg bg-[linear-gradient(180deg,#eff6ff,white)] shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]" />
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3 rounded-[24px] border border-slate-200 bg-slate-950 p-4 text-white shadow-[0_12px_30px_rgba(15,23,42,0.16)] sm:flex-row sm:items-center sm:justify-between">
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
            {actionLabel}
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
        <div className="rounded-[24px] border border-emerald-200 bg-[linear-gradient(180deg,#ecfdf5,#f0fdf4)] p-4 shadow-[0_4px_12px_rgba(15,23,42,0.04)]">
          <div className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-700">Success state</div>
          <div className="mt-2 text-xl font-semibold text-emerald-950">Your PDF is ready.</div>
          <p className="mt-2 text-sm leading-6 text-emerald-800">
            The cleaned PDF has been generated and is ready for download.
          </p>
        </div>
      ) : null}

      <div className="grid gap-2.5 sm:grid-cols-3">
        {[
          { title: "File limits", text: "Free up to 20 MB and up to 200 pages. Larger jobs may require credits." },
          { title: "Unsupported files", text: "Password-protected or encrypted PDFs are not supported." },
          { title: "Trust", text: "Works in your browser with a lightweight, privacy-first experience." },
        ].map((item) => (
          <div key={item.title} className="rounded-2xl border border-slate-200 bg-white p-4">
            <div className="text-sm font-semibold text-slate-950">{item.title}</div>
            <p className="mt-2 text-sm leading-6 text-slate-600">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
