export type WorkspaceStatus =
  | "ready"
  | "uploading"
  | "scanning"
  | "processing"
  | "success"
  | "over-limit"
  | "unsupported"
  | "credits"
  | "cookie";

export type WorkspaceStatusInfo = {
  label: string;
  tone: "blue" | "emerald" | "amber" | "rose" | "slate";
  note: string;
};

export type WorkspacePage = {
  id: number;
  label: string;
  selected: boolean;
};

export type WorkspaceFileInfo = {
  name: string;
  sizeLabel: string;
  pagesLabel: string;
  typeLabel: string;
};
