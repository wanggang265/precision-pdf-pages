import Link from "next/link";
import { JsonLdScript } from "@/components/json-ld";
import { SiteShell } from "@/components/site-shell";
import { buildMetadata, buildWebPageSchema, SITE_URL } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "All PDF Tools — Remove, Split, Merge, Extract & Compress",
  description:
    "Browse all browser-based PDF tools: remove pages, split, merge, extract pages, and compress. No upload, no watermark, no signup required.",
  canonical: "/tools/",
  keywords: [
    "pdf tools",
    "remove pdf pages",
    "split pdf",
    "merge pdf",
    "extract pdf pages",
    "compress pdf",
    "online pdf tools",
  ],
});

const tools = [
  {
    href: "/remove-pdf-pages/",
    title: "Remove PDF Pages",
    description: "Delete pages you do not need from any PDF in seconds.",
    badge: "Core tool",
  },
  {
    href: "/split-pdf/",
    title: "Split PDF",
    description: "Split a PDF into multiple files by page ranges.",
  },
  {
    href: "/merge-pdf/",
    title: "Merge PDF",
    description: "Combine multiple PDFs into one document.",
  },
  {
    href: "/extract-pdf-pages/",
    title: "Extract PDF Pages",
    description: "Keep only the pages you need in a new PDF.",
  },
  {
    href: "/compress-pdf/",
    title: "Compress PDF",
    description: "Reduce PDF file size by removing metadata and using object streams.",
  },
];

const webPageSchema = buildWebPageSchema({
  name: "All PDF Tools",
  description:
    "Browse all browser-based PDF tools: remove pages, split, merge, extract pages, and compress. No upload, no watermark, no signup required.",
  url: `${SITE_URL}/tools/`,
});

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: tools.map((tool, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: tool.title,
    description: tool.description,
    url: `${SITE_URL}${tool.href}`,
  })),
};

export default function ToolsPage() {
  return (
    <SiteShell>
      <JsonLdScript data={[webPageSchema, itemListSchema]} />
      <section className="mx-auto w-full max-w-7xl px-5 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">Tools</div>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">All PDF utilities</h1>
          <p className="mt-4 text-lg text-slate-600">
            A focused set of browser-based PDF tools. Pick the one that matches your task.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="group relative flex flex-col rounded-[24px] border border-slate-200 bg-[linear-gradient(180deg,#ffffff,#f8fafc)] p-5 shadow-[0_8px_22px_rgba(15,23,42,0.04)] transition hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(15,23,42,0.06)]"
            >
              {tool.badge ? (
                <span className="absolute right-4 top-4 inline-flex rounded-full border border-blue-100 bg-blue-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-blue-700">
                  {tool.badge}
                </span>
              ) : null}
              <h2 className="text-base font-semibold text-slate-950 group-hover:text-blue-700">{tool.title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">{tool.description}</p>
              <span className="mt-auto pt-4 text-sm font-semibold text-blue-600 group-hover:text-blue-700">
                Open tool →
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-16 rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_6px_18px_rgba(15,23,42,0.04)] sm:p-6">
          <div className="max-w-3xl">
            <h2 className="text-xl font-semibold tracking-tight text-slate-950 sm:text-2xl">Why browser-based?</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Every tool on this page runs locally in your browser. Your PDF is processed on your own device, so it is never uploaded to a server, stored, or shared. This keeps sensitive documents private and makes the tools available on any operating system without installation.
            </p>
            <div className="mt-5">
              <Link
                href="/faq/"
                className="inline-flex items-center rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Read the FAQ
              </Link>
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
