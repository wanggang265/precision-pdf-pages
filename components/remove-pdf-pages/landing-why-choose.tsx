export function RemovePdfWhyChoose() {
  return (
    <section className="mx-auto w-full max-w-7xl px-5 py-12 sm:px-6 lg:px-8">
      <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_6px_18px_rgba(15,23,42,0.04)] sm:p-6">
        <div className="max-w-3xl">
          <div className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">Why choose this tool</div>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
            Why remove PDF pages here?
          </h2>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            "No watermarks: the cleaned PDF does not carry any added branding.",
            "No signup: start using the tool immediately without creating an account.",
            "No upload for free jobs: your file stays on your device.",
            "Works on any device: use Mac, Windows, Linux, iPhone, or Android.",
            "Free for everyday files: 20 MB and 200 pages covers most documents.",
            "No Adobe required: you do not need Acrobat or any paid software.",
          ].map((text) => (
            <div
              key={text}
              className="rounded-[16px] border border-slate-100 bg-[linear-gradient(180deg,#ffffff,#f8fafc)] p-4 text-sm leading-6 text-slate-600"
            >
              {text}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
