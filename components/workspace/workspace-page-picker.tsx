"use client";

type WorkspacePage = {
  id: number;
  label: string;
  selected: boolean;
};

type WorkspacePagePickerProps = {
  pages: WorkspacePage[];
  blocked: boolean;
  onToggle: (id: number) => void;
  onSelectAll: () => void;
  onClearSelection: () => void;
};

const lineWidths = ["w-10/12", "w-8/12", "w-9/12", "w-7/12"];

export function WorkspacePagePicker({ pages, blocked, onToggle, onSelectAll, onClearSelection }: WorkspacePagePickerProps) {
  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-base font-semibold text-slate-950">Page picker</h3>
          <p className="text-sm text-slate-600">Select the pages you want to remove.</p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={onSelectAll}
            disabled={blocked}
            className="rounded-full border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Select All
          </button>
          <button
            type="button"
            onClick={onClearSelection}
            disabled={blocked}
            className="rounded-full border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Clear Selection
          </button>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {pages.map((page, index) => (
          <button
            key={page.id}
            type="button"
            onClick={() => onToggle(page.id)}
            disabled={blocked}
            className={`group rounded-[22px] border p-3 text-left transition hover:-translate-y-0.5 hover:shadow-[0_10px_22px_rgba(15,23,42,0.05)] disabled:cursor-not-allowed ${
              page.selected
                ? "border-blue-300 bg-blue-50 shadow-[0_8px_18px_rgba(37,99,235,0.08)]"
                : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">{page.label}</div>
                <div className="mt-1 text-sm font-semibold text-slate-950">Page preview</div>
              </div>
              <div
                className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                  page.selected ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-500"
                }`}
              >
                {page.selected ? "Selected" : "Keep"}
              </div>
            </div>

            <div className="mt-3 rounded-[18px] border border-slate-200 bg-[linear-gradient(180deg,#f8fafc,#ffffff)] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.75)]">
              <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-3 py-2">
                <div className="h-2.5 w-16 rounded-full bg-slate-200" />
                <div className="h-2.5 w-8 rounded-full bg-blue-200" />
              </div>

              <div className="mt-3 rounded-xl border border-slate-200 bg-white px-3 py-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-2">
                    {lineWidths.map((width, lineIndex) => (
                      <div
                        key={width}
                        className={`h-2 rounded-full ${width} ${lineIndex === 0 ? "bg-slate-200" : lineIndex === 1 ? "bg-slate-100" : "bg-slate-200"}`}
                      />
                    ))}
                  </div>
                  <div className="rounded-full border border-slate-200 bg-slate-50 px-2 py-1 text-[10px] font-semibold text-slate-500">
                    {page.id}
                  </div>
                </div>

                <div className="mt-4 rounded-lg border border-dashed border-slate-200 bg-[linear-gradient(180deg,#eff6ff,white)] px-3 py-4">
                  <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    Content block
                  </div>
                  <div className="mt-2 space-y-1.5">
                    <div className="h-2.5 w-11/12 rounded-full bg-slate-200" />
                    <div className="h-2.5 w-9/12 rounded-full bg-slate-100" />
                    <div className="h-2.5 w-10/12 rounded-full bg-slate-200" />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
              <span>{page.selected ? "Marked for removal" : "Will be kept"}</span>
              <span className="font-medium text-slate-400">{index + 1}/{pages.length}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
