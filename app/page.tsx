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
      <section className="border-b border-slate-200/70 bg-[radial-gradient(circle_at_top_left,_rgba(37,99,235,0.10),_transparent_34%),linear-gradient(180deg,#ffffff, #f8fafc)]">
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-5 py-16 sm:px-6 lg:grid-cols-[1.05fr_.95fr] lg:px-8 lg:py-20">
          <div className="flex flex-col justify-center">
            <div className="inline-flex w-fit rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-blue-700">
              PDF page remover
            </div>
            <h1 className="mt-5 max-w-[11ch] text-5xl font-semibold tracking-tight text-slate-950 sm:text-6xl">
              Remove PDF pages in seconds
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
              A focused tool for deleting unwanted pages from a PDF. Upload a file, mark the pages to remove,
              and download the result.
            </p>
            <p className="mt-4 text-sm font-medium text-slate-500">
              Fast, secure, and simple page removal for PDFs.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/workspace"
                className="inline-flex items-center rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Upload PDF
              </Link>
              <Link
                href="#how-it-works"
                className="inline-flex items-center rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
              >
                Learn more
              </Link>
            </div>
          </div>

          <div className="rounded-[34px] border border-slate-200 bg-white p-5 shadow-[0_28px_100px_rgba(15,23,42,0.08)]">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">Preview card</div>
                <div className="mt-2 text-lg font-semibold text-slate-950">design-review.pdf</div>
              </div>
              <div className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                Ready
              </div>
            </div>

            <div className="mt-5 rounded-[28px] border border-slate-200 bg-slate-50 p-4">
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                  <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">File</div>
                  <div className="mt-2 text-sm font-medium text-slate-800">18.4 MB · 8 pages</div>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                  <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Selection</div>
                  <div className="mt-2 text-sm font-medium text-slate-800">3 pages selected for deletion</div>
                </div>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-4">
                {Array.from({ length: 4 }, (_, index) => (
                  <div
                    key={index}
                    className={`rounded-2xl border p-3 ${index < 3 ? "border-blue-200 bg-blue-50" : "border-slate-200 bg-white"}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                        Page {index + 1}
                      </div>
                      <div
                        className={`rounded-full px-2 py-1 text-[11px] font-semibold ${
                          index < 3 ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        {index < 3 ? "Selected" : "Keep"}
                      </div>
                    </div>
                    <div className="mt-4 h-24 rounded-xl bg-[linear-gradient(180deg,#eff6ff,white)]" />
                  </div>
                ))}
              </div>

              <div className="mt-4 flex flex-wrap gap-3">
                <button className="rounded-full bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white">
                  Delete Selected Pages
                </button>
                <button className="rounded-full border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700">
                  Download result
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="tools" className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-3">
          {valueProps.map((item) => (
            <article key={item.title} className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-base font-semibold text-slate-950">{item.title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="how-it-works" className="border-y border-slate-200 bg-white">
        <div className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <div className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">How it works</div>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">A simple three-step flow</h2>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              "1. Upload PDF",
              "2. Select pages to delete",
              "3. Download result",
            ].map((step) => (
              <div key={step} className="rounded-[28px] border border-slate-200 bg-slate-50 p-6 text-sm font-medium text-slate-800">
                {step}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="limits" className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
          <div className="rounded-[28px] border border-slate-200 bg-white p-6">
            <div className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">Limits / usage</div>
            <div className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
              <p>Free: up to 20 MB and up to 200 pages.</p>
              <p>Max: up to 100 MB and up to 500 pages.</p>
              <p>Password-protected or encrypted PDFs are not supported.</p>
              <p>Credits may be required for heavier jobs.</p>
            </div>
          </div>

          <div className="rounded-[28px] border border-slate-200 bg-slate-950 p-6 text-white">
            <div className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">Anonymous use</div>
            <p className="mt-4 text-lg font-semibold">Use the workflow without signing in for lightweight tasks.</p>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              We keep this lightweight and practical so you can remove pages quickly without extra steps.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/workspace" className="rounded-full bg-blue-500 px-4 py-2.5 text-sm font-semibold text-white">
                Upload PDF
              </Link>
              <Link href="#limits" className="rounded-full border border-white/15 px-4 py-2.5 text-sm font-semibold text-white">
                Review the limits
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto w-full max-w-7xl px-5 py-10 sm:px-6 lg:px-8">
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
        <div className="max-w-2xl">
          <div className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">FAQ</div>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">Common questions</h2>
        </div>
        <div className="mt-8 grid gap-4">
          {faqItems.map((item) => (
            <details key={item.question} className="group rounded-[24px] border border-slate-200 bg-white p-5">
              <summary className="cursor-pointer list-none text-base font-semibold text-slate-950">
                {item.question}
              </summary>
              <p className="mt-3 text-sm leading-6 text-slate-600">{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-5 pb-16 sm:px-6 lg:px-8">
        <div className="rounded-[34px] border border-slate-200 bg-[linear-gradient(180deg,#ffffff,#f8fafc)] p-8 text-center shadow-sm sm:p-12">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-950">Ready to remove some pages?</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-600">
            Start with Upload PDF, review the limits, and keep the workflow focused on page deletion only.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href="/workspace" className="rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white">
              Upload PDF
            </Link>
            <Link href="#limits" className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700">
              Review the limits
            </Link>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
