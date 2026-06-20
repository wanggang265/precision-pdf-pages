import Link from "next/link";

export function HomeCtaSection() {
  return (
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
  );
}
