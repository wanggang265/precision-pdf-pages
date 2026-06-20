const steps = [
  { step: "01", label: "Upload PDF", detail: "Drop a file into the workspace to begin." },
  { step: "02", label: "Select pages", detail: "Mark only the pages you want removed." },
  { step: "03", label: "Download result", detail: "Export the cleaned PDF when you're done." },
];

export function HomeHowItWorks() {
  return (
    <section id="how-it-works" className="border-y border-slate-200 bg-[linear-gradient(180deg,#ffffff,#f8fafc)]">
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
            {steps.map((item) => (
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
  );
}
