export function HomeComplianceStrip() {
  return (
    <section className="mx-auto w-full max-w-7xl px-5 py-8 sm:px-6 lg:px-8">
      <div className="rounded-[24px] border border-slate-200 bg-[linear-gradient(180deg,#ffffff,#f8fafc)] px-6 py-4 shadow-sm">
        <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600">
          <span className="font-semibold text-slate-950">Privacy</span>
          <span>•</span>
          <span>Terms</span>
          <span>•</span>
          <span>Cookie</span>
        </div>
        <p className="mt-3 text-sm text-slate-600">Analytics off by default. Compliance links stay visible but lightweight.</p>
      </div>
    </section>
  );
}
