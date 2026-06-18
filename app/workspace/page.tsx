import type { Metadata } from "next";
import { SiteShell } from "@/components/site-shell";
import { WorkspaceClient } from "@/components/workspace-client";

export const metadata: Metadata = {
  title: "Workspace",
  description: "Upload a PDF, select pages to delete, and download the cleaned result.",
};

export default function WorkspacePage() {
  return (
    <SiteShell>
      <section className="mx-auto w-full max-w-7xl px-5 py-12 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">Workspace</div>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
            Upload PDF → select pages → delete selected pages → download result
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
            A practical, linear workspace for removing pages from a PDF. The main action stays obvious at every
            step.
          </p>
        </div>

        <div className="mt-8">
          <WorkspaceClient />
        </div>
      </section>
    </SiteShell>
  );
}
