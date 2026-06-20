"use client";

import { PDFDocument } from "pdf-lib";
import { useEffect, useMemo, useRef, useState } from "react";
import { WorkspaceActionPanel } from "@/components/workspace/workspace-action-panel";
import { WorkspacePagePicker } from "@/components/workspace/workspace-page-picker";
import { WorkspaceStatusPanel } from "@/components/workspace/workspace-status-panel";
import type {
  WorkspaceFileInfo,
  WorkspacePage,
  WorkspaceStatus,
  WorkspaceStatusInfo,
} from "@/components/workspace/workspace-types";

const initialPages: WorkspacePage[] = [];

const defaultFileInfo: WorkspaceFileInfo = {
  name: "No file selected",
  sizeLabel: "0 B",
  pagesLabel: "0 pages",
  typeLabel: "PDF",
};

function statusMeta(status: WorkspaceStatus): WorkspaceStatusInfo {
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
      return { label: "Encrypted or invalid PDFs are not supported.", tone: "rose", note: "The file could not be processed." };
    case "credits":
      return { label: "Credits are required for this job.", tone: "amber", note: "This file exceeds the free usage boundary." };
    case "cookie":
      return { label: "Cookie consent required.", tone: "slate", note: "Set your preferences before continuing." };
    default:
      return { label: "Preview ready.", tone: "emerald", note: "Review the thumbnails and remove pages you do not need." };
  }
}

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

function createPages(pageCount: number, selected = false): WorkspacePage[] {
  return Array.from({ length: pageCount }, (_, index) => ({
    id: index + 1,
    label: `Page ${index + 1}`,
    selected,
  }));
}

function getOutputName(inputName: string) {
  const baseName = inputName.replace(/\.pdf$/i, "");
  return `${baseName}-cleaned.pdf`;
}

export function WorkspaceClient() {
  const [status, setStatus] = useState<WorkspaceStatus>("ready");
  const [pages, setPages] = useState<WorkspacePage[]>(initialPages);
  const [fileInfo, setFileInfo] = useState<WorkspaceFileInfo>(defaultFileInfo);
  const [sourceBytes, setSourceBytes] = useState<Uint8Array | null>(null);
  const [sourceFileName, setSourceFileName] = useState<string>("");
  const [resultBytes, setResultBytes] = useState<Uint8Array | null>(null);
  const [resultFileName, setResultFileName] = useState<string>("");
  const resultUrlRef = useRef<string | null>(null);
  const uploadTimers = useRef<number[]>([]);

  const selectedCount = pages.filter((page) => page.selected).length;
  const pageCount = pages.length;
  const blocked = ["processing", "success", "over-limit", "unsupported", "credits", "cookie", "uploading", "scanning"].includes(status);
  const canDelete = Boolean(sourceBytes && pageCount > 0 && selectedCount > 0 && selectedCount < pageCount && status === "ready");
  const hasResult = Boolean(resultBytes && resultFileName && status === "success");

  const statusInfo = useMemo(() => statusMeta(status), [status]);

  const summary = useMemo(() => {
    if (status === "success") return `${selectedCount} pages removed · cleaned PDF ready for download`;
    if (status === "processing") return `${selectedCount} pages queued for deletion`;
    if (status === "uploading") return "File upload in progress";
    if (status === "scanning") return "Scanning the document for page thumbnails";
    if (status === "over-limit") return "This file is over the free tier boundary";
    if (status === "unsupported") return "Password-protected or invalid files cannot be processed";
    if (status === "credits") return "Credits are required to continue";
    if (status === "cookie") return "Consent is required before continuing";
    return `${selectedCount} pages selected for deletion`;
  }, [selectedCount, status]);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scheduleStatus = (nextStatus: WorkspaceStatus, delay: number) => {
    const timer = window.setTimeout(() => setStatus(nextStatus), delay);
    uploadTimers.current.push(timer);
  };

  const handleFileSelected = async (file: File | null) => {
    if (!file) return;

    clearUploadTimers();
    revokeResultUrl();
    setResultBytes(null);
    setResultFileName("");
    setPages([]);
    setStatus("uploading");
    setFileInfo({
      name: file.name,
      sizeLabel: formatFileSize(file.size),
      pagesLabel: "Reading pages…",
      typeLabel: file.type || "File",
    });

    try {
      const isPdf = file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
      if (!isPdf) {
        setStatus("unsupported");
        setFileInfo({
          name: file.name,
          sizeLabel: formatFileSize(file.size),
          pagesLabel: "Unavailable",
          typeLabel: file.type || "File",
        });
        return;
      }

      if (file.size > 100 * 1024 * 1024) {
        setStatus("over-limit");
        setFileInfo({
          name: file.name,
          sizeLabel: formatFileSize(file.size),
          pagesLabel: "Unavailable",
          typeLabel: "PDF",
        });
        return;
      }

      if (file.size > 20 * 1024 * 1024) {
        setStatus("credits");
        setFileInfo({
          name: file.name,
          sizeLabel: formatFileSize(file.size),
          pagesLabel: "Unavailable",
          typeLabel: "PDF",
        });
        return;
      }

      const arrayBuffer = await file.arrayBuffer();
      setStatus("scanning");
      const pdf = await PDFDocument.load(arrayBuffer);
      const pageCountValue = pdf.getPageCount();
      setPages(createPages(pageCountValue, false));
      setSourceBytes(new Uint8Array(arrayBuffer));
      setSourceFileName(file.name);
      setFileInfo({
        name: file.name,
        sizeLabel: formatFileSize(file.size),
        pagesLabel: `${pageCountValue} pages`,
        typeLabel: "PDF",
      });
      scheduleStatus("ready", 700);
    } catch {
      setStatus("unsupported");
      setPages([]);
      setSourceBytes(null);
      setSourceFileName("");
      setFileInfo({
        name: file.name,
        sizeLabel: formatFileSize(file.size),
        pagesLabel: "Unavailable",
        typeLabel: file.type || "File",
      });
    }
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

  const downloadResult = () => {
    if (!resultBytes || !resultFileName) return;
    revokeResultUrl();
    const pdfBytes = new Uint8Array(resultBytes.length);
    pdfBytes.set(resultBytes);
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    resultUrlRef.current = url;
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = resultFileName;
    anchor.click();
  };

  const runDeletion = async () => {
    if (!canDelete || !sourceBytes || !sourceFileName) return;

    clearUploadTimers();
    revokeResultUrl();
    setStatus("processing");

    try {
      const sourcePdf = await PDFDocument.load(sourceBytes);
      const keptPageIndexes = pages
        .map((page, index) => ({ page, index }))
        .filter(({ page }) => !page.selected)
        .map(({ index }) => index);

      const cleanedPdf = await PDFDocument.create();
      const copiedPages = await cleanedPdf.copyPages(sourcePdf, keptPageIndexes);
      copiedPages.forEach((page) => cleanedPdf.addPage(page));

      const cleanedBytes = await cleanedPdf.save();
      const outputName = getOutputName(sourceFileName);
      setResultBytes(cleanedBytes);
      setResultFileName(outputName);
      setStatus("success");
    } catch {
      setStatus("unsupported");
      setResultBytes(null);
      setResultFileName("");
    }
  };

  const reset = () => {
    clearUploadTimers();
    revokeResultUrl();
    setStatus("ready");
    setPages([]);
    setFileInfo(defaultFileInfo);
    setSourceBytes(null);
    setSourceFileName("");
    setResultBytes(null);
    setResultFileName("");
  };

  const actionLabel = status === "processing" ? "Deleting Selected Pages…" : "Delete Selected Pages";

  return (
    <div className="space-y-6 rounded-[32px] border border-slate-200 bg-[linear-gradient(180deg,#ffffff,#fbfdff)] p-4 shadow-[0_16px_48px_rgba(15,23,42,0.05)] sm:p-5">
      <WorkspaceStatusPanel
        fileInfo={fileInfo}
        hasFile={Boolean(sourceBytes)}
        status={status}
        statusInfo={statusInfo}
        selectedCount={selectedCount}
        summary={summary}
        blocked={blocked}
        onStatusChange={setStatus}
        onFileSelected={handleFileSelected}
        onScan={() => setStatus("scanning")}
        onReset={reset}
      />

      <WorkspacePagePicker
        pages={pages}
        blocked={blocked}
        onToggle={togglePage}
        onSelectAll={selectAll}
        onClearSelection={clearSelection}
      />

      <WorkspaceActionPanel
        selectedCount={selectedCount}
        summary={summary}
        canDelete={canDelete}
        actionLabel={actionLabel}
        status={status}
        hasResult={hasResult}
        onRunDeletion={runDeletion}
        onDownloadResult={downloadResult}
      />
    </div>
  );
}
