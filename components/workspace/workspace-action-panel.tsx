"use client";

type WorkspaceActionPanelProps = {
  selectedCount: number;
  summary: string;
  canDelete: boolean;
  actionLabel: string;
  status: string;
  hasResult: boolean;
  onRunDeletion: () => void;
  onDownloadResult: () => void;
};

export function WorkspaceActionPanel({
  selectedCount,
  summary,
  canDelete,
  actionLabel,
  status,
  hasResult,
  onRunDeletion,
  onDownloadResult,
}: WorkspaceActionPanelProps) {
  return (
    <>
      <div className="flex flex-col gap-3 rounded-[24px] border border-slate-200 bg-slate-950 p-4 text-white shadow-[0_12px_30px_rgba(15,23,42,0.16)] sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">Primary action</div>
          <div className="mt-2 text-lg font-semibold">{selectedCount} pages selected</div>
          <div className="mt-1 text-sm text-slate-300">{summary}</div>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={onRunDeletion}
            disabled={!canDelete}
            className="rounded-full bg-blue-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-400 disabled:cursor-not-allowed disabled:bg-slate-700"
          >
            {actionLabel}
          </button>
          <button
            type="button"
            onClick={onDownloadResult}
            disabled={!hasResult || status !== "success"}
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
    </>
  );
}
