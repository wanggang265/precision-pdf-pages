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

export function HomeValueSection() {
  return (
    <section id="tools" className="mx-auto w-full max-w-7xl px-5 py-12 sm:px-6 lg:px-8">
      <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_6px_18px_rgba(15,23,42,0.04)] sm:p-6">
        <div className="max-w-2xl">
          <div className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">Why this works</div>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
            A focused tool, presented like a product
          </h2>
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
  );
}
