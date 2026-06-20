"use client";

import { useState } from "react";
import type { DragEvent } from "react";
import type { WorkspaceFileInfo, WorkspaceStatus, WorkspaceStatusInfo } from "@/components/workspace/workspace-types";

type WorkspaceStatusPanelProps = {
  fileInfo: WorkspaceFileInfo;
  hasFile: boolean;
  status: WorkspaceStatus;
  statusInfo: WorkspaceStatusInfo;
  selectedCount: number;
  summary: string;
  blocked: boolean;
  onStatusChange: (status: WorkspaceStatus) => void;
  onFileSelected: (file: File | null) => void;
  onScan: () => void;
  onReset: () => void;
};

const statusOptions: Array<{ value: WorkspaceStatus; label: string }> = [
  { value: "ready", label: "Ready" },
  { value: "uploading", label: "Uploading" },
  { value: "scanning", label: "Scanning" },
  { value: "processing", label: "Processing" },
  { value: "success", label: "Success" },
  { value: "over-limit", label: "Over limit" },
  { value: "unsupported", label: "Unsupported" },
  { value: "credits", label: "Credits required" },
  { value: "cookie", label: "Cookie consent" },
];

const workflowSteps: Array<{ label: string; statuses: WorkspaceStatus[] }> = [
  { label: "Upload", statuses: ["ready", "uploading"] },
  { label: "Inspect", statuses: ["scanning"] },
  { label: "Edit", statuses: ["processing"] },
  { label: "Export", statuses: ["success"] },
];

const toneClasses: Record<string, string> = {
  blue: "border-blue-200 bg-blue-50 text-blue-800",
  emerald: "border-emerald-200 bg-emerald-50 text-emerald-800",
  amber: "border-amber-200 bg-amber-50 text-amber-800",
  rose: "border-rose-200 bg-rose-50 text-rose-800",
  slate: "border-slate-200 bg-slate-50 text-slate-700",
};

const progressMeta: Record<WorkspaceStatus, { label: string; value: number; helper: string }> = {
  ready: { label: "Ready", value: 10, helper: "Waiting for a PDF to be uploaded." },
  uploading: { label: "Uploading", value: 35, helper: "Reading the file and preparing it for parsing." },
  scanning: { label: "Scanning", value: 65, helper: "Counting pages and preparing page previews." },
  processing: { label: "Processing", value: 88, helper: "Generating the cleaned PDF." },
  success: { label: "Complete", value: 100, helper: "The output PDF is ready to download." },
  "over-limit": { label: "Blocked", value: 100, helper: "This file is over the free-tier boundary." },
  unsupported: { label: "Blocked", value: 100, helper: "This file cannot be processed." },
  credits: { label: "Blocked", value: 100, helper: "Credits are required for this job." },
  cookie: { label: "Paused", value: 100, helper: "Consent is required before continuing." },
};

function getActiveStepIndex(status: WorkspaceStatus) {
  if (status === "success") return 3;
  if (status === "processing") return 2;
  if (status === "scanning") return 1;
  return 0;
}

export function WorkspaceStatusPanel({
  fileInfo,
  hasFile,
  status,
  statusInfo,
  selectedCount,
  summary,
  blocked,
  onStatusChange,
  onFileSelected,
  onScan,
  onReset,
}: WorkspaceStatusPanelProps) {
  const [isDragActive, setIsDragActive] = useState(false);
  const progress = progressMeta[status];
  const activeStepIndex = getActiveStepIndex(status);

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragActive(false);
    onFileSelected(event.dataTransfer.files?.[0] ?? null);
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
                Upload a PDF, inspect the page list, remove what you do not need, and export the cleaned result.
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
                    : status === "credits" || status === "cookie"
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
                  {index === 1 && "Generate page thumbnails and inspect the structure."}
                  {index === 2 && "Remove selected pages and create the cleaned document."}
                  {index === 3 && "Download the final PDF and keep going if needed."}
                </div>
              </div>
            );
          })}
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
            <div key={item.label} className="rounded-xl border border-slate-200 bg-white p-4">
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">{item.label}</div>
              <div className="mt-2 text-sm font-medium text-slate-800">{item.value}</div>
            </div>
          ))}
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
              <div className="text-sm font-semibold text-slate-950">Drop a PDF here</div>
              <p className="mt-1 text-sm text-slate-600">Drag and drop, or choose a file manually.</p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <label
                htmlFor="workspace-upload-input"
                className="inline-flex cursor-pointer items-center rounded-full bg-blue-600 px-3 py-2 text-xs font-semibold text-white transition hover:-translate-y-0.5 hover:bg-blue-700"
              >
                Choose PDF
              </label>
              <input
                id="workspace-upload-input"
                type="file"
                accept="application/pdf,.pdf"
                className="sr-only"
                onChange={(event) => onFileSelected(event.target.files?.[0] ?? null)}
              />
            </div>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={onScan}
              disabled={!hasFile || blocked}
              className="rounded-full border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Scan preview
            </button>
            <button
              type="button"
              onClick={onReset}
              className="rounded-full border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              Start over
            </button>
            <span className="text-xs text-slate-500">
              {hasFile ? "PDF selected. You can scan the preview now." : "Pick a PDF to start the upload flow."}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 rounded-lg border border-slate-200 bg-white/80 p-1.5 shadow-[0_2px_6px_rgba(15,23,42,0.04)]">
          {statusOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => onStatusChange(option.value)}
              className={`rounded-full border px-3 py-2 text-xs font-semibold transition hover:-translate-y-0.5 hover:shadow-sm ${
                status === option.value
                  ? "border-slate-950 bg-slate-950 text-white"
                  : "border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-white"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>

        {blocked ? (
          <p className="text-xs font-medium text-slate-500">
            Current mode is locked for this state, so selection changes are disabled.
          </p>
        ) : null}

        {selectedCount > 0 ? (
          <p className="text-xs font-medium text-slate-500">{selectedCount} pages are currently selected.</p>
        ) : null}
      </div>
    </div>
  );
}
