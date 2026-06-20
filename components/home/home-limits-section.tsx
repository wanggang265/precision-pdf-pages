import Link from "next/link";

export function HomeLimitsSection() {
  return (
    <section id="limits" className="mx-auto w-full max-w-7xl px-5 py-12 sm:px-6 lg:px-8">
      <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_6px_18px_rgba(15,23,42,0.04)] sm:p-6">
        <div className="max-w-2xl">
          <div className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">Limits / usage</div>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
            Straightforward limits, shown calmly
          </h2>
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
              <Link href="#faq" className="rounded-full border border-white/15 px-4 py-2.5 text-sm font-semibold text-white">
                Review FAQ
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
