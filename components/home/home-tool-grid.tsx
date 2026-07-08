import Link from "next/link";

const tools = [
  {
    href: "/remove-pdf-pages/",
    title: "Remove PDF Pages",
    description: "Delete pages you do not need from any PDF.",
    badge: "Core tool",
    openWorkspace: "/workspace/",
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
    description: "Reduce PDF file size by removing metadata.",
  },
];

export function HomeToolGrid() {
  return (
    <section id="tools" className="mx-auto w-full max-w-7xl px-5 py-12 sm:px-6 lg:px-8">
      <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_6px_18px_rgba(15,23,42,0.04)] sm:p-6">
        <div className="max-w-2xl">
          <div className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">Tools</div>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">All PDF utilities</h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            A focused set of browser-based PDF tools. Pick the one that matches your task.
          </p>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <div
              key={tool.href}
              className="group relative flex flex-col rounded-[24px] border border-slate-200 bg-[linear-gradient(180deg,#ffffff,#f8fafc)] p-5 shadow-[0_8px_22px_rgba(15,23,42,0.04)] transition hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(15,23,42,0.06)]"
            >
              {tool.badge ? (
                <span className="absolute right-4 top-4 inline-flex rounded-full border border-blue-100 bg-blue-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-blue-700">
                  {tool.badge}
                </span>
              ) : null}
              <h3 className="text-base font-semibold text-slate-950">
                <Link href={tool.href} className="hover:text-blue-700">
                  {tool.title}
                </Link>
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{tool.description}</p>
              <div className="mt-auto flex flex-wrap items-center gap-4 pt-4">
                <Link href={tool.href} className="text-sm font-semibold text-blue-600 hover:text-blue-700">
                  Open tool →
                </Link>
                {tool.openWorkspace ? (
                  <Link href={tool.openWorkspace} className="text-sm font-semibold text-slate-500 hover:text-slate-700">
                    Open workspace
                  </Link>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
