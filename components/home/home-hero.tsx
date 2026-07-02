import Link from "next/link";

const heroStats = [
  { label: "Tools", value: "Remove, split, merge, extract, compress" },
  { label: "Free tier", value: "20 MB \u00b7 200 pages" },
  { label: "Privacy", value: "Browser-based processing" },
];

export function HomeHero() {
  return (
    <section className="border-b border-slate-200/70 bg-[radial-gradient(circle_at_top_left,_rgba(37,99,235,0.12),_transparent_34%),linear-gradient(180deg,#ffffff,#f8fafc)]">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-5 py-12 sm:px-6 lg:grid-cols-[1.08fr_.92fr] lg:px-8 lg:py-16">
        <div className="flex flex-col justify-center">
          <div className="inline-flex w-fit rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-blue-700">
            Free online PDF utilities
          </div>
          <h1 className="mt-4 max-w-[14ch] text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
            Free PDF tools in your browser
          </h1>
          <p className="mt-4 max-w-xl text-lg leading-8 text-slate-600">
            Remove, split, merge, extract, and compress PDFs without uploading them to a server. Fast, private, and no signup needed.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/#tools"
              className="inline-flex items-center rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(37,99,235,0.24)] transition hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-[0_16px_36px_rgba(37,99,235,0.28)] active:translate-y-0"
            >
              Browse tools
            </Link>
            <Link
              href="/workspace"
              className="inline-flex items-center rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50 hover:shadow-sm active:translate-y-0"
            >
              Remove pages
            </Link>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            {heroStats.map((item) => (
              <div
                key={item.label}
                className="rounded-full border border-white/70 bg-white/80 px-3 py-2 text-xs font-semibold text-slate-700 shadow-[0_1px_3px_rgba(15,23,42,0.05)] backdrop-blur transition hover:-translate-y-0.5 hover:shadow-[0_3px_8px_rgba(15,23,42,0.08)]"
              >
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
                    <div key={page} className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 px-4 py-3">
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
  );
}
