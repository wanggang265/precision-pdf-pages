import Link from "next/link";

export const removePdfFaqItems = [
  {
    question: "How do I remove pages from a PDF for free?",
    answer: (
      <>
        Open the Remove PDF Pages tool, upload your file, select the pages you want to delete, and download the cleaned PDF. The free tier covers files up to 20 MB and 200 pages. If you are comparing options, see our guide to the{" "}
        <Link href="/blog/best-free-pdf-page-removers/" className="text-blue-600 hover:text-blue-700 hover:underline">
          best free PDF page removers
        </Link>{" "}
        tested on real documents.
      </>
    ),
    answerText:
      "Open the Remove PDF Pages tool, upload your file, select the pages you want to delete, and download the cleaned PDF. The free tier covers files up to 20 MB and 200 pages. If you are comparing options, see our guide to the best free PDF page removers tested on real documents.",
  },
  {
    question: "Can I delete pages from a PDF without Adobe Acrobat?",
    answer:
      "Yes. This tool works entirely in your browser, so you do not need Adobe Acrobat or any other desktop software installed.",
  },
  {
    question: "Is it safe to remove PDF pages online?",
    answer:
      "For free-tier jobs, your PDF is processed locally in your browser and never uploaded to a server. The file is not stored or shared.",
  },
  {
    question: "Can I remove pages from a PDF on Mac?",
    answer:
      "Yes. Because the tool runs in your browser, it works the same way on Mac, Windows, Linux, iPhone, and Android.",
  },
  {
    question: "Can I remove pages from a PDF on iPhone?",
    answer:
      "Yes. Open the site in Safari or any mobile browser, upload the PDF, select the pages, and download the trimmed file.",
  },
  {
    question: "Will the new PDF have a watermark?",
    answer:
      "No. The cleaned PDF does not include any watermark or added branding.",
  },
  {
    question: "Can I delete blank pages from a PDF?",
    answer:
      "Yes. After uploading, simply click the blank pages in the preview to mark them for removal, then download the result.",
  },
  {
    question: "What happens if my PDF is larger than 20 MB?",
    answer:
      "Files larger than 20 MB or 200 pages may require credits. You will see the option before any processing begins.",
  },
  {
    question: "Can I remove multiple pages at once?",
    answer:
      "Yes. You can select individual pages or a continuous range, and remove them all in one download.",
  },
  {
    question: "Is there a limit on how many PDFs I can process?",
    answer:
      "The free tier is based on file size and page count per file, not on the number of files you process.",
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
