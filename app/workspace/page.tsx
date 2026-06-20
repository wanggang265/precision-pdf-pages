import type { Metadata } from "next";
import { SiteShell } from "@/components/site-shell";
import { WorkspaceClient } from "@/components/workspace/workspace-client";
import { PageIntro } from "@/components/ui/page-intro";

export const metadata: Metadata = {
  title: "Workspace",
  description: "Upload a PDF, select pages to delete, and download the cleaned result.",
};

export default function WorkspacePage() {
  return (
    <SiteShell>
      <section className="mx-auto w-full max-w-7xl px-5 py-12 sm:px-6 lg:px-8">
        <PageIntro
          eyebrow="Workspace"
          title="Upload PDF → select pages → delete selected pages → download result"
          description="A practical, linear workspace for removing pages from a PDF. The main action stays obvious at every step."
        />

        <div className="mt-8">
          <WorkspaceClient />
        </div>
      </section>
    </SiteShell>
  );
}
