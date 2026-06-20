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

export function HomeFaqSection() {
  return (
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
            <details
              key={item.question}
              className="group rounded-[24px] border border-slate-200 bg-[linear-gradient(180deg,#ffffff,#f8fafc)] p-4.5 shadow-[0_12px_32px_rgba(15,23,42,0.04)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(15,23,42,0.07)]"
            >
              <summary className="cursor-pointer list-none text-base font-semibold text-slate-950">{item.question}</summary>
              <p className="mt-3 text-sm leading-6 text-slate-600">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
