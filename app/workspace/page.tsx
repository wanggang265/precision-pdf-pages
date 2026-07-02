import { JsonLdScript } from "@/components/json-ld";
import { SiteShell } from "@/components/site-shell";
import { WorkspaceClient } from "@/components/workspace/workspace-client";
import { PageIntro } from "@/components/ui/page-intro";
import { buildMetadata, buildWebPageSchema, SITE_URL } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "PDF Workspace — Upload, Select & Delete Pages",
  description:
    "Open the Remove PDF Pages workspace to upload a PDF, select the pages you want to remove, and download the cleaned file in seconds.",
  canonical: "/workspace/",
  noindex: true,
  keywords: ["pdf workspace", "remove pdf pages workspace", "delete pdf pages"],
});

const workspaceSchema = buildWebPageSchema({
  name: "PDF Workspace",
  description:
    "Open the Remove PDF Pages workspace to upload a PDF, select the pages you want to remove, and download the cleaned file in seconds.",
  url: `${SITE_URL}/workspace/`,
});

export default function WorkspacePage() {
  return (
    <SiteShell>
      <JsonLdScript data={workspaceSchema} />
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
