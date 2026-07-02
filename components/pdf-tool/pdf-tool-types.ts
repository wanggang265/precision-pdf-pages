export type PdfToolStatus =
  | "ready"
  | "uploading"
  | "scanning"
  | "processing"
  | "success"
  | "over-limit"
  | "unsupported"
  | "credits";

export type PdfToolStatusInfo = {
  label: string;
  tone: "blue" | "emerald" | "amber" | "rose" | "slate";
  note: string;
};

export type PdfToolFileInfo = {
  name: string;
  sizeLabel: string;
  pagesLabel: string;
  typeLabel: string;
};

export type ProcessedResult = {
  bytes: Uint8Array;
  fileName: string;
  summary: string;
};
