import Link from "next/link";
import type { Metadata } from "next";
import { SiteShell } from "@/components/site-shell";

export const metadata: Metadata = {
  title: "Remove PDF pages in seconds",
  description:
    "A focused tool for deleting unwanted pages from a PDF. Upload a file, mark the pages to remove, and download the result.",
};

const valueProps = [
  {
    title: "Delete only what you do not need",
    text: "A single-purpose tool for removing pages without turning into a PDF suite.",
  },
  {
    title: "Anonymous use available",
    text: "Use the workflow without signing in for lightweight jobs.",
  },
  {
    title: "Free for small files",
    text: "Simple limits up front. Larger jobs may require credits.",
  },
];

const heroStats = [
  { label: "Workflow", value: "Upload → pick → delete" },
  { label: "Free tier", value: "20 MB · 200 pages" },
  { label: "Privacy", value: "Anonymous jobs allowed" },
];

const faqItems = [
  {
    question: "How does it work?",
    answer: "Upload your PDF, select the pages you want to remove, and download the cleaned file.",
  },
  {
    question: "What file sizes are supported?",
    answer: "Free jobs support up to 20 MB and 200 pages. Larger files can require credits.",
  },
  {
    question: "Can I edit encrypted PDFs?",
    answer: "No. Password-protected or encrypted PDFs are not supported in this workflow.",
  },
  {
    question: "Do I need an account?",
    answer: "Anonymous use is available for lightweight tasks. Sign-in can be used for heavier jobs.",
  },
];

export default function HomePage() {
  return (
    <SiteShell>
      <section className="border-b border-slate-200/70 bg-[radial-gradient(circle_at_top_left,_rgba(37,99,235,0.12),_transparent_34%),linear-gradient(180deg,#ffffff,#f8fafc)]">
        <div className="mx-auto grid w-full max-w-7xl gap-8 px-5 py-12 sm:px-6 lg:grid-cols-[1.08fr_.92fr] lg:px-8 lg:py-16">
          <div className="flex flex-col justify-center">
            <div className="inline-flex w-fit rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-blue-700">
              Single-purpose PDF utility
            </div>
            <h1 className="mt-4 max-w-[11ch] text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
              Remove PDF pages in seconds
            </h1>
            <p className="mt-4 max-w-xl text-lg leading-8 text-slate-600">
              Upload a PDF, mark the pages you do not need, and download a cleaned file in a simple one-purpose flow.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/workspace"
                className="inline-flex items-center rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(37,99,235,0.24)] transition hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-[0_16px_36px_rgba(37,99,235,0.28)] active:translate-y-0"
              >
                Upload PDF
              </Link>
              <Link
                href="#how-it-works"
                className="inline-flex items-center rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50 hover:shadow-sm active:translate-y-0"
              >
                Learn more
              </Link>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {heroStats.map((item) => (
                <div key={item.label} className="rounded-full border border-white/70 bg-white/80 px-3 py-2 text-xs font-semibold text-slate-700 shadow-[0_1px_3px_rgba(15,23,42,0.05)] backdrop-blur transition hover:-translate-y-0.5 hover:shadow-[0_3px_8px_rgba(15,23,42,0.08)]">
                  <span className="text-slate-400">{item.label}:</span> {item.value}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[32px] border border-slate-200 bg-white p-4 shadow-[0_16px_48px_rgba(15,23,42,0.05)]">
            <div className="overflow-hidden rounded-[24px] border border-slate-200 bg-slate-950 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
              <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
                <div className="flex items-center gap-2 text-[11px] text-slate-400">
                  <span className="h-2.5 w-2.5 rounded-full bg-rose-400/90" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400/90" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/90" />
                </div>
                <div className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-300">
                  Ready
                </div>
              </div>

              <div className="p-3.5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">Preview card</div>
                    <div className="mt-2 text-lg font-semibold">design-review.pdf</div>
                    <div className="mt-1 text-sm text-slate-300">3 pages selected for deletion</div>
                  </div>
                </div>

                <div className="mt-4 rounded-[24px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.10),rgba(255,255,255,0.04))] p-3.5">
                  <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                    <span>Page stack</span>
                    <span>Thumbnail preview</span>
                  </div>

                  <div className="mt-3 grid gap-2.5">
                    {[1, 2, 3].map((page) => (
                      <div
                        key={page}
                        className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 px-4 py-3"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-sm font-semibold text-white">
                            0{page}
                          </div>
                          <div>
                            <div className="text-sm font-medium text-white">Page {page}</div>
                            <div className="text-[11px] text-slate-400">Marked for deletion</div>
                          </div>
                        </div>
                        <div className="rounded-full bg-blue-500 px-2 py-1 text-[11px] font-semibold text-white">
                          Selected
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-3 rounded-lg border border-dashed border-white/10 bg-white/5 p-3.5">
                    <div className="h-28 rounded-lg bg-[linear-gradient(180deg,rgba(255,255,255,0.20),rgba(255,255,255,0.05))]" />
                  </div>
                </div>

                <div className="mt-3.5 flex flex-wrap gap-3">
                  <button className="rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-slate-100">
                    Delete Selected Pages
                  </button>
                  <button className="rounded-full border border-white/12 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10">
                    Download result
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="tools" className="mx-auto w-full max-w-7xl px-5 py-12 sm:px-6 lg:px-8">
        <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_6px_18px_rgba(15,23,42,0.04)] sm:p-6">
          <div className="max-w-2xl">
            <div className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">Why this works</div>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">A focused tool, presented like a product</h2>
            <p className="mt-4 text-sm leading-6 text-slate-600">
              Every block below keeps the same visual language: soft borders, calm surfaces, and a single accent color.
            </p>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {valueProps.map((item, index) => (
              <article
                key={item.title}
                className="rounded-[24px] border border-slate-200 bg-[linear-gradient(180deg,#ffffff,#f8fafc)] p-5 shadow-[0_8px_22px_rgba(15,23,42,0.04)] transition hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(15,23,42,0.06)]"
              >
                <div className="inline-flex rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-500">
                  0{index + 1}
                </div>
                <h3 className="mt-3 text-base font-semibold text-slate-950">{item.title}</h3>
                <p className="mt-2.5 text-sm leading-6 text-slate-600">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="bg-[linear-gradient(180deg,#ffffff,#f8fafc)] border-y border-slate-200">
        <div className="mx-auto w-full max-w-7xl px-5 py-12 sm:px-6 lg:px-8">
        <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_6px_18px_rgba(15,23,42,0.04)] sm:p-6">
          <div className="max-w-2xl">
            <div className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">How it works</div>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">A simple three-step flow</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                The flow stays linear and calm: upload, choose, remove. Nothing else gets in the way.
              </p>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {[
                { step: "01", label: "Upload PDF", detail: "Drop a file into the workspace to begin." },
                { step: "02", label: "Select pages", detail: "Mark only the pages you want removed." },
                { step: "03", label: "Download result", detail: "Export the cleaned PDF when you're done." },
              ].map((item) => (
                <div key={item.step} className="rounded-[24px] border border-slate-200 bg-[linear-gradient(180deg,#ffffff,#f8fafc)] p-5 shadow-[0_8px_22px_rgba(15,23,42,0.04)] transition hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(15,23,42,0.06)]">
                  <div className="inline-flex rounded-full border border-blue-100 bg-blue-50 px-2.5 py-1 text-[11px] font-semibold text-blue-700">
                    {item.step}
                  </div>
                  <h3 className="mt-3 text-base font-semibold text-slate-950">{item.label}</h3>
                  <p className="mt-2.5 text-sm leading-6 text-slate-600">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="limits" className="mx-auto w-full max-w-7xl px-5 py-12 sm:px-6 lg:px-8">
        <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_6px_18px_rgba(15,23,42,0.04)] sm:p-6">
          <div className="max-w-2xl">
            <div className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">Limits / usage</div>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">Straightforward limits, shown calmly</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Limits are explicit up front so the product feels honest, simple, and low-friction.
            </p>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_1fr]">
            <div className="rounded-[24px] border border-slate-200 bg-[linear-gradient(180deg,#ffffff,#f8fafc)] p-5 shadow-[0_12px_32px_rgba(15,23,42,0.04)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(15,23,42,0.07)]">
              <div className="flex items-center justify-between gap-3">
                <div className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">Usage limits</div>
                <div className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-500">
                  Transparent
                </div>
              </div>
              <div className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
                <p>Free: up to 20 MB and up to 200 pages.</p>
                <p>Max: up to 100 MB and up to 500 pages.</p>
                <p>Password-protected or encrypted PDFs are not supported.</p>
                <p>Credits may be required for heavier jobs.</p>
              </div>
            </div>

            <div className="rounded-[24px] border border-slate-200 bg-[linear-gradient(180deg,#0f172a,#111827)] p-6 text-white shadow-[0_20px_50px_rgba(15,23,42,0.18)]">
              <div className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">Anonymous use</div>
              <p className="mt-3 text-lg font-semibold">Use the workflow without signing in for lightweight tasks.</p>
              <p className="mt-2.5 text-sm leading-6 text-slate-300">
                The product stays lightweight so quick jobs can finish without account friction.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link href="/workspace" className="rounded-full bg-blue-500 px-4 py-2.5 text-sm font-semibold text-white">
                  Upload PDF
                </Link>
                <Link href="#limits" className="rounded-full border border-white/15 px-4 py-2.5 text-sm font-semibold text-white">
                  Review the limits
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-5 py-8 sm:px-6 lg:px-8">
        <div className="rounded-[24px] border border-slate-200 bg-[linear-gradient(180deg,#ffffff,#f8fafc)] px-6 py-4 shadow-sm">
          <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600">
            <span className="font-semibold text-slate-950">Privacy</span>
            <span>•</span>
            <span>Terms</span>
            <span>•</span>
            <span>Cookie</span>
          </div>
          <p className="mt-3 text-sm text-slate-600">
            Analytics off by default. Compliance links stay visible but lightweight.
          </p>
        </div>
      </section>

      <section id="faq" className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-6 lg:px-8">
        <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_6px_18px_rgba(15,23,42,0.04)] sm:p-6">
          <div className="max-w-2xl">
            <div className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">FAQ</div>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">Common questions</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              The answers stay short and practical so the page feels like a product, not a document.
            </p>
          </div>
          <div className="mt-6 grid gap-4">
            {faqItems.map((item) => (
              <details key={item.question} className="group rounded-[24px] border border-slate-200 bg-[linear-gradient(180deg,#ffffff,#f8fafc)] p-4.5 shadow-[0_12px_32px_rgba(15,23,42,0.04)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(15,23,42,0.07)]">
                <summary className="cursor-pointer list-none text-base font-semibold text-slate-950">
                  {item.question}
                </summary>
                <p className="mt-3 text-sm leading-6 text-slate-600">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-5 pb-12 sm:px-6 lg:px-8">
        <div className="rounded-[30px] border border-slate-200 bg-[linear-gradient(180deg,#ffffff,#f8fafc)] p-6 text-center shadow-sm sm:p-8">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-950">Ready to remove some pages?</h2>
          <p className="mx-auto mt-2.5 max-w-2xl text-sm leading-6 text-slate-600">
            Start with Upload PDF, review the limits, and keep the workflow focused on page deletion only.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Link href="/workspace" className="rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-[0_16px_36px_rgba(37,99,235,0.28)] active:translate-y-0">
              Upload PDF
            </Link>
            <Link href="#limits" className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50 hover:shadow-sm active:translate-y-0">
              Review the limits
            </Link>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
