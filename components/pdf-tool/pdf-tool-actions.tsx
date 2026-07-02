"use client";

type PdfToolActionsProps = {
  actionLabel: string;
  downloadLabel?: string;
  summary: string;
  canProcess: boolean;
  status: string;
  hasResult: boolean;
  onProcess: () => void;
  onDownload: () => void;
};

export function PdfToolActions({
  actionLabel,
  downloadLabel = "Download result",
  summary,
  canProcess,
  status,
  hasResult,
  onProcess,
  onDownload,
}: PdfToolActionsProps) {
  return (
    <>
      <div className="flex flex-col gap-3 rounded-[24px] border border-slate-200 bg-slate-950 p-4 text-white shadow-[0_12px_30px_rgba(15,23,42,0.16)] sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">Primary action</div>
          <div className="mt-2 text-lg font-semibold">{summary}</div>
          <div className="mt-1 text-sm text-slate-300">Ready when all inputs are valid.</div>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={onProcess}
            disabled={!canProcess}
            className="rounded-full bg-blue-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-400 disabled:cursor-not-allowed disabled:bg-slate-700"
          >
            {actionLabel}
          </button>
          <button
            type="button"
            onClick={onDownload}
            disabled={!hasResult || status !== "success"}
            className="rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {downloadLabel}
          </button>
        </div>
      </div>

      {status === "success" ? (
        <div className="rounded-[24px] border border-emerald-200 bg-[linear-gradient(180deg,#ecfdf5,#f0fdf4)] p-4 shadow-[0_4px_12px_rgba(15,23,42,0.04)]">
          <div className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-700">Success state</div>
          <div className="mt-2 text-xl font-semibold text-emerald-950">Your PDF is ready.</div>
          <p className="mt-2 text-sm leading-6 text-emerald-800">
            The output PDF has been generated and is ready for download.
          </p>
        </div>
      ) : null}

      <div className="grid gap-2.5 sm:grid-cols-3">
        {[
          { title: "File limits", text: "Free up to 20 MB and up to 200 pages per file. Larger jobs may require credits." },
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
