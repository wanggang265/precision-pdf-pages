"use client";

import { PDFDocument } from "pdf-lib";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { PdfToolActions } from "./pdf-tool-actions";
import { PdfToolPagePicker } from "./pdf-tool-page-picker";
import { PdfToolUpload } from "./pdf-tool-upload";
import type { PdfToolFileInfo, PdfToolStatus, PdfToolStatusInfo, ProcessedResult } from "./pdf-tool-types";

const MAX_FILE_SIZE = 20 * 1024 * 1024;

export type PdfPageOption = {
  id: number;
  label: string;
  selected: boolean;
};

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "https://removepdfpages-workers.gw471210.workers.dev";
const ANON_ID_STORAGE_KEY = "removepdfpages_anon_id";

export type PdfToolClientProps = {
  mode: "single" | "multiple";
  actionLabel: string;
  toolType: string;
  renderOptions?: (state: {
    files: File[];
    status: PdfToolStatus;
    pages: PdfPageOption[];
    setPages: (pages: PdfPageOption[]) => void;
    options: unknown;
    setOptions: (options: unknown) => void;
  }) => ReactNode;
  validate?: (state: { files: File[]; pages: PdfPageOption[]; options: unknown }) => string | null;
  getOutputName: (files: File[], options: unknown) => string;
  process: (args: { files: File[]; pages: PdfPageOption[]; options: unknown }) => Promise<ProcessedResult>;
  statusMessages?: Partial<Record<PdfToolStatus, { label: string; note: string }>>;
  maxFileSizeBytes?: number;
  showPreview?: boolean;
  previewProps?: {
    title?: string;
    description?: string;
    readOnly?: boolean;
  };
};

const defaultFileInfo: PdfToolFileInfo = {
  name: "No file selected",
  sizeLabel: "0 B",
  pagesLabel: "0 pages",
  typeLabel: "PDF",
};

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

function statusMeta(status: PdfToolStatus, overrides?: PdfToolClientProps["statusMessages"]): PdfToolStatusInfo {
  const defaults: Record<PdfToolStatus, PdfToolStatusInfo> = {
    ready: { label: "Preview ready.", tone: "emerald", note: "Upload a PDF and configure the operation." },
    uploading: { label: "Uploading file…", tone: "blue", note: "The file is being added to the workspace." },
    scanning: { label: "Scanning pages…", tone: "blue", note: "Reading the document and counting pages." },
    processing: { label: "Processing PDF…", tone: "blue", note: "Generating the output file." },
    success: { label: "Your PDF is ready.", tone: "emerald", note: "The output PDF is ready for download." },
    "over-limit": { label: "File is too large for the free tier.", tone: "amber", note: "Try a smaller file or upgrade for larger jobs." },
    unsupported: { label: "Encrypted or invalid PDFs are not supported.", tone: "rose", note: "The file could not be processed." },
    credits: { label: "Credits are required for this job.", tone: "amber", note: "This file exceeds the free usage boundary." },
  };
  const base = defaults[status];
  const override = overrides?.[status];
  return override ? { ...base, ...override } : base;
}

export function PdfToolClient({
  mode,
  actionLabel,
  toolType,
  renderOptions,
  validate,
  getOutputName,
  process,
  statusMessages,
  maxFileSizeBytes = MAX_FILE_SIZE,
  showPreview,
  previewProps,
}: PdfToolClientProps) {
  const [status, setStatus] = useState<PdfToolStatus>("ready");
  const [files, setFiles] = useState<File[]>([]);
  const [fileInfo, setFileInfo] = useState<PdfToolFileInfo>(defaultFileInfo);
  const [pages, setPages] = useState<PdfPageOption[]>([]);
  const [options, setOptions] = useState<unknown>(null);
  const [resultBytes, setResultBytes] = useState<Uint8Array | null>(null);
  const [resultFileName, setResultFileName] = useState<string>("");
  const [resultSummary, setResultSummary] = useState<string>("");
  const [anonId, setAnonId] = useState<string | null>(null);
  const resultUrlRef = useRef<string | null>(null);
  const uploadTimers = useRef<number[]>([]);
  const previewRef = useRef<HTMLDivElement | null>(null);

  const blocked = !["ready", "unsupported", "over-limit", "credits"].includes(status);
  const canProcess =
    status === "ready" &&
    files.length > 0 &&
    (!validate || validate({ files, pages, options }) === null);
  const hasResult = Boolean(resultBytes && resultFileName && status === "success");
  const statusInfo = useMemo(() => statusMeta(status, statusMessages), [status, statusMessages]);

  const summary = useMemo(() => {
    if (status === "success") return resultSummary || "Output PDF ready for download";
    if (status === "processing") return "Processing your PDF…";
    if (status === "uploading") return "File upload in progress";
    if (status === "scanning") return "Scanning the document for page metadata";
    if (status === "over-limit") return "This file is over the free tier boundary";
    if (status === "unsupported") return "Password-protected or invalid files cannot be processed";
    if (status === "credits") return "Credits are required to continue";
    const selectedCount = pages.filter((p) => p.selected).length;
    if (selectedCount > 0) return `${selectedCount} pages selected`;
    return `${files.length} file${files.length === 1 ? "" : "s"} ready`;
  }, [files.length, pages, resultSummary, status]);

  const clearUploadTimers = () => {
    uploadTimers.current.forEach((timer) => window.clearTimeout(timer));
    uploadTimers.current = [];
  };

  const revokeResultUrl = () => {
    if (resultUrlRef.current) {
      URL.revokeObjectURL(resultUrlRef.current);
      resultUrlRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      clearUploadTimers();
      revokeResultUrl();
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    let storedAnonId = window.localStorage.getItem(ANON_ID_STORAGE_KEY);
    if (!storedAnonId) {
      storedAnonId = crypto.randomUUID();
      window.localStorage.setItem(ANON_ID_STORAGE_KEY, storedAnonId);
    }
    setAnonId(storedAnonId);
  }, []);

  const reportUsage = async (pagesProcessed: number, fileSize: number) => {
    try {
      const headers: Record<string, string> = { "Content-Type": "application/json" };
      if (anonId) {
        headers["x-anon-id"] = anonId;
      }

      await fetch(`${API_BASE}/api/usage`, {
        method: "POST",
        credentials: "include",
        headers,
        body: JSON.stringify({
          pages_processed: pagesProcessed,
          file_size: fileSize,
          tool_type: toolType,
          ...(anonId ? { anon_id: anonId } : {}),
        }),
      });
    } catch {
      // Usage reporting is best-effort and must not block the user flow.
    }
  };

  const reset = () => {
    clearUploadTimers();
    revokeResultUrl();
    setStatus("ready");
    setFiles([]);
    setPages([]);
    setOptions(null);
    setFileInfo(defaultFileInfo);
    setResultBytes(null);
    setResultFileName("");
    setResultSummary("");
  };

  const validateFiles = (selected: File[]) => {
    const invalid = selected.find(
      (file) => !(file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf")),
    );
    if (invalid) {
      setStatus("unsupported");
      setFileInfo({
        name: invalid.name,
        sizeLabel: formatFileSize(invalid.size),
        pagesLabel: "Unavailable",
        typeLabel: invalid.type || "File",
      });
      return false;
    }
    const oversized = selected.find((file) => file.size > maxFileSizeBytes);
    if (oversized) {
      setStatus("credits");
      setFileInfo({
        name: oversized.name,
        sizeLabel: formatFileSize(oversized.size),
        pagesLabel: "Unavailable",
        typeLabel: "PDF",
      });
      return false;
    }
    return true;
  };

  const scanFiles = async (selected: File[]) => {
    let totalPages = 0;
    let totalSize = 0;
    for (const file of selected) {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await PDFDocument.load(arrayBuffer);
      totalPages += pdf.getPages().length;
      totalSize += file.size;
    }
    return { totalPages, totalSize };
  };

  const handleFileSelected = async (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;
    const selected = Array.from(fileList);

    clearUploadTimers();
    revokeResultUrl();
    setResultBytes(null);
    setResultFileName("");
    setResultSummary("");
    setPages([]);
    setOptions(null);
    setStatus("uploading");
    setFiles(selected);
    setFileInfo({
      name: selected.length === 1 ? selected[0].name : `${selected.length} files`,
      sizeLabel: formatFileSize(selected.reduce((sum, file) => sum + file.size, 0)),
      pagesLabel: "Reading pages…",
      typeLabel: "PDF",
    });

    if (!validateFiles(selected)) {
      setFiles([]);
      return;
    }

    try {
      setStatus("scanning");
      const { totalPages, totalSize } = await scanFiles(selected);
      setFileInfo({
        name: selected.length === 1 ? selected[0].name : `${selected.length} files`,
        sizeLabel: formatFileSize(totalSize),
        pagesLabel: `${totalPages} pages`,
        typeLabel: "PDF",
      });
      setPages(
        Array.from({ length: totalPages }, (_, index) => ({
          id: index + 1,
          label: `Page ${index + 1}`,
          selected: false,
        })),
      );
      const timer = window.setTimeout(() => {
        setStatus("ready");
        if (showPreview && previewRef.current) {
          previewRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 700);
      uploadTimers.current.push(timer);
    } catch {
      setStatus("unsupported");
      setFileInfo((prev) => ({ ...prev, pagesLabel: "Unavailable" }));
    }
  };

  const handleProcess = async () => {
    if (!canProcess) return;
    clearUploadTimers();
    revokeResultUrl();
    setStatus("processing");

    try {
      const result = await process({ files, pages, options });
      setResultBytes(result.bytes);
      setResultFileName(result.fileName);
      setResultSummary(result.summary);
      setStatus("success");
      const pagesProcessed = pages.length > 0 ? pages.length : files.length;
      const fileSize = files.reduce((sum, file) => sum + file.size, 0);
      void reportUsage(pagesProcessed, fileSize);
    } catch {
      setStatus("unsupported");
      setResultBytes(null);
      setResultFileName("");
      setResultSummary("");
    }
  };

  const handleDownload = () => {
    if (!resultBytes || !resultFileName) return;
    revokeResultUrl();
    const normalized = new Uint8Array(resultBytes);
    const mimeType = resultFileName.toLowerCase().endsWith(".zip") ? "application/zip" : "application/pdf";
    const blob = new Blob([normalized], { type: mimeType });
    const url = URL.createObjectURL(blob);
    resultUrlRef.current = url;
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = resultFileName;
    anchor.click();
  };

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

  return (
    <div className="space-y-6 rounded-[32px] border border-slate-200 bg-[linear-gradient(180deg,#ffffff,#fbfdff)] p-4 shadow-[0_16px_48px_rgba(15,23,42,0.05)] sm:p-5">
      <PdfToolUpload
        status={status}
        fileInfo={fileInfo}
        hasFile={files.length > 0}
        mode={mode}
        onFileSelected={handleFileSelected}
        onReset={reset}
      />

      {renderOptions && (
        <div ref={previewRef}>
          {renderOptions({ files, status, pages, setPages, options, setOptions })}
        </div>
      )}

      {pages.length > 0 && (showPreview || !renderOptions) && (
        <div ref={!renderOptions ? previewRef : undefined}>
          <PdfToolPagePicker
            pages={pages}
            file={files[0]}
            blocked={blocked}
            onToggle={togglePage}
            onSelectAll={selectAll}
            onClearSelection={clearSelection}
            title={previewProps?.title}
            description={previewProps?.description}
            readOnly={previewProps?.readOnly}
          />
        </div>
      )}

      <PdfToolActions
        actionLabel={status === "processing" ? `${actionLabel}…` : actionLabel}
        summary={summary}
        canProcess={canProcess}
        status={status}
        hasResult={hasResult}
        onProcess={handleProcess}
        onDownload={handleDownload}
      />
    </div>
  );
}
