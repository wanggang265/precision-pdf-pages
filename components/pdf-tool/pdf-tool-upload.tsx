"use client";

import { useState, type DragEvent, type ReactNode } from "react";
import type { PdfToolFileInfo, PdfToolStatus } from "./pdf-tool-types";

type PdfToolUploadProps = {
  status: PdfToolStatus;
  fileInfo: PdfToolFileInfo;
  hasFile: boolean;
  mode: "single" | "multiple";
  onFileSelected: (files: FileList | null) => void;
  onReset: () => void;
  children?: ReactNode;
};

const progressMeta: Record<PdfToolStatus, { label: string; value: number; helper: string }> = {
  ready: { label: "Ready", value: 10, helper: "Waiting for a PDF to be uploaded." },
  uploading: { label: "Uploading", value: 35, helper: "Reading the file and preparing it for parsing." },
  scanning: { label: "Scanning", value: 65, helper: "Counting pages and preparing the document." },
  processing: { label: "Processing", value: 88, helper: "Generating the output PDF." },
  success: { label: "Complete", value: 100, helper: "The output PDF is ready to download." },
  "over-limit": { label: "Blocked", value: 100, helper: "This file is over the free-tier boundary." },
  unsupported: { label: "Blocked", value: 100, helper: "This file cannot be processed." },
  credits: { label: "Blocked", value: 100, helper: "Credits are required for this job." },
};

const workflowSteps: Array<{ label: string; statuses: PdfToolStatus[] }> = [
  { label: "Upload", statuses: ["ready", "uploading"] },
  { label: "Inspect", statuses: ["scanning"] },
  { label: "Process", statuses: ["processing"] },
  { label: "Export", statuses: ["success"] },
];

function getActiveStepIndex(status: PdfToolStatus) {
  if (status === "success") return 3;
  if (status === "processing") return 2;
  if (status === "scanning") return 1;
  return 0;
}

export function PdfToolUpload({
  status,
  fileInfo,
  hasFile,
  mode,
  onFileSelected,
  onReset,
  children,
}: PdfToolUploadProps) {
  const [isDragActive, setIsDragActive] = useState(false);
  const progress = progressMeta[status];
  const activeStepIndex = getActiveStepIndex(status);
  const blocked = !["ready", "uploading", "unsupported", "over-limit", "credits"].includes(status);

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragActive(false);
    onFileSelected(event.dataTransfer.files);
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (blocked) return;
    setIsDragActive(true);
  };

  const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragActive(false);
  };

  return (
    <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-[linear-gradient(180deg,#f8fbff,#f8fafc)] shadow-[0_16px_42px_rgba(15,23,42,0.05)]">
      <div className="border-b border-slate-200/80 bg-white/60 px-4 py-4 sm:px-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-blue-700">
                Workspace
              </span>
              <span className="inline-flex rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                {progress.label}
              </span>
            </div>
            <div>
              <h2 className="text-xl font-semibold tracking-tight text-slate-950 sm:text-2xl">PDF workflow control center</h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                Upload your PDF{mode === "multiple" ? "s" : ""}, configure the operation, and download the result.
              </p>
            </div>
          </div>

          <div className="grid gap-2 sm:grid-cols-3 lg:min-w-[28rem]">
            {[
              { label: "File", value: fileInfo.name },
              { label: "Size", value: fileInfo.sizeLabel },
              { label: "Pages", value: fileInfo.pagesLabel },
            ].map((item) => (
              <div key={item.label} className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-[0_4px_12px_rgba(15,23,42,0.03)]">
                <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">{item.label}</div>
                <div className="mt-1 truncate text-sm font-semibold text-slate-950">{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-4 p-4 sm:p-5">
        <div className="rounded-[22px] border border-slate-200 bg-white p-4 shadow-[0_4px_12px_rgba(15,23,42,0.03)]">
          <div className="flex items-center justify-between gap-3 text-sm">
            <div>
              <div className="font-semibold text-slate-950">{progress.label}</div>
              <div className="mt-0.5 text-slate-600">{progress.helper}</div>
            </div>
            <div className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">{progress.value}%</div>
          </div>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
            <div
              className={`h-full rounded-full transition-all duration-300 ${
                status === "success"
                  ? "bg-emerald-500"
                  : status === "unsupported" || status === "over-limit"
                    ? "bg-rose-500"
                    : status === "credits"
                      ? "bg-amber-500"
                      : "bg-blue-500"
              }`}
              style={{ width: `${progress.value}%` }}
            />
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-4">
          {workflowSteps.map((step, index) => {
            const isActive = step.statuses.includes(status);
            const isComplete = index < activeStepIndex;
            return (
              <div
                key={step.label}
                className={`rounded-[22px] border p-4 transition ${
                  isActive
                    ? "border-blue-300 bg-blue-50 shadow-[0_8px_18px_rgba(37,99,235,0.08)]"
                    : isComplete
                      ? "border-emerald-200 bg-emerald-50"
                      : "border-slate-200 bg-white"
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">Step {index + 1}</div>
                  <div
                    className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                      isActive ? "bg-blue-600 text-white" : isComplete ? "bg-emerald-600 text-white" : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {isActive ? "Now" : isComplete ? "Done" : "Next"}
                  </div>
                </div>
                <div className="mt-3 text-sm font-semibold text-slate-950">{step.label}</div>
                <div className="mt-1 text-sm leading-6 text-slate-600">
                  {index === 0 && "Choose a PDF to begin the workflow."}
                  {index === 1 && "Read the document and inspect its structure."}
                  {index === 2 && "Apply the selected operation to the PDF."}
                  {index === 3 && "Download the final PDF and keep going if needed."}
                </div>
              </div>
            );
          })}
        </div>

        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragEnter={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`rounded-[24px] border border-dashed p-4 transition ${
            isDragActive ? "border-blue-400 bg-blue-50" : "border-slate-200 bg-white/80"
          }`}
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="text-sm font-semibold text-slate-950">
                {mode === "multiple" ? "Drop one or more PDFs here" : "Drop a PDF here"}
              </div>
              <p className="mt-1 text-sm text-slate-600">Drag and drop, or choose {mode === "multiple" ? "files" : "a file"} manually.</p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <label
                htmlFor="pdf-tool-upload-input"
                className="inline-flex cursor-pointer items-center rounded-full bg-blue-600 px-3 py-2 text-xs font-semibold text-white transition hover:-translate-y-0.5 hover:bg-blue-700"
              >
                {mode === "multiple" ? "Choose PDFs" : "Choose PDF"}
              </label>
              <input
                id="pdf-tool-upload-input"
                type="file"
                accept="application/pdf,.pdf"
                multiple={mode === "multiple"}
                className="sr-only"
                onChange={(event) => onFileSelected(event.target.files)}
              />
            </div>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={onReset}
              className="rounded-full border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              Start over
            </button>
            <span className="text-xs text-slate-500">
              {hasFile
                ? "PDF selected. Configure the operation below."
                : mode === "multiple"
                  ? "Pick PDFs to start the upload flow."
                  : "Pick a PDF to start the upload flow."}
            </span>
          </div>
        </div>

        {children}
      </div>
    </div>
  );
}
