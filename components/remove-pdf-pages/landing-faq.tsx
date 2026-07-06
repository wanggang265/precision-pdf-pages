export const removePdfFaqItems = [
  {
    question: "How do I remove pages from a PDF for free?",
    answer:
      "Open the Remove PDF Pages tool, upload your file, select the pages you want to delete, and download the cleaned PDF. The free tier covers files up to 20 MB and 200 pages.",
  },
  {
    question: "Can I delete pages from a PDF without Adobe Acrobat?",
    answer:
      "Yes. This tool works entirely in your browser, so you do not need Adobe Acrobat or any other desktop software installed.",
  },
  {
    question: "Is it safe to remove PDF pages online?",
    answer:
      "For free-tier jobs, your PDF is processed locally in your browser and is not uploaded to a server. Credit-based jobs for larger files may use a secure backend with short-lived processing.",
  },
  {
    question: "How many pages can I remove at once?",
    answer:
      "You can remove as many pages as you like within the file limits. Free jobs support up to 200 pages, and larger jobs can support up to 500 pages.",
  },
  {
    question: "Does this work on Mac, Windows, and mobile?",
    answer:
      "Yes. The tool runs in any modern web browser, so it works on macOS, Windows, Linux, iOS, and Android.",
  },
  {
    question: "Will the output PDF have a watermark?",
    answer:
      "No. The downloaded PDF does not contain a watermark, and the page layout of the remaining pages is preserved.",
  },
];

export function RemovePdfFaq() {
  return (
    <section id="faq" className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-6 lg:px-8">
      <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_6px_18px_rgba(15,23,42,0.04)] sm:p-6">
        <div className="max-w-2xl">
          <div className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">FAQ</div>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">Common questions about removing PDF pages</h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Short answers to the most common questions people ask before deleting pages from a PDF.
          </p>
        </div>
        <div className="mt-6 grid gap-4">
          {removePdfFaqItems.map((item) => (
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
