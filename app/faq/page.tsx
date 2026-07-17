import Link from "next/link";
import { JsonLdScript } from "@/components/json-ld";
import { SiteShell } from "@/components/site-shell";
import { buildMetadata, buildWebPageSchema, SITE_URL } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "PDF Tools FAQ — Remove, Split, Merge, Extract & Compress PDFs",
  description:
    "Find answers about removing, splitting, merging, extracting, and compressing PDFs. All tools run in your browser, with no upload and no watermark.",
  canonical: "/faq/",
  keywords: [
    "pdf faq",
    "remove pdf pages faq",
    "split pdf faq",
    "merge pdf faq",
    "extract pdf pages faq",
    "compress pdf faq",
  ],
});

const faqSections = [
  {
    id: "general",
    title: "General",
    items: [
      {
        question: "Are my files uploaded to a server?",
        answer:
          "For free-tier jobs, your PDF is processed locally in your browser. The file is not uploaded to or stored on our servers.",
      },
      {
        question: "Is there a file size limit?",
        answer:
          "Free jobs support PDFs up to 20 MB and 200 pages. Larger files may require credits.",
      },
      {
        question: "Will the output PDF have a watermark?",
        answer: "No. The cleaned, split, merged, extracted, or compressed PDF does not include any watermark or added branding.",
      },
      {
        question: "Can I use these tools on Mac, iPhone, or Android?",
        answer:
          "Yes. Because everything runs in your browser, the tools work the same way on Mac, Windows, Linux, iPhone, and Android.",
      },
      {
        question: "Can I process encrypted or password-protected PDFs?",
        answer:
          "No. Password-protected or encrypted PDFs are not supported by any of the current tools.",
      },
    ],
  },
  {
    id: "remove",
    title: "Remove PDF Pages",
    items: [
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
        question: "Can I delete blank pages from a PDF?",
        answer:
          "Yes. After uploading, simply click the blank pages in the preview to mark them for removal, then download the result.",
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
    ],
  },
  {
    id: "split",
    title: "Split PDF",
    items: [
      {
        question: "What page-range format is supported?",
        answer: "Use comma-separated numbers and ranges like 1-3, 5, 7-9.",
      },
      {
        question: "What happens to the original PDF when I split it?",
        answer:
          "Nothing. The original file stays on your device. We create new PDFs for each range and bundle them into a zip.",
      },
      {
        question: "Can I split a PDF into single-page files?",
        answer:
          "Yes. Enter each page as a separate range, e.g. 1, 2, 3, and the tool will create one PDF per page.",
      },
      {
        question: "Can I split encrypted PDFs?",
        answer: "No. Password-protected or encrypted PDFs are not supported.",
      },
    ],
  },
  {
    id: "merge",
    title: "Merge PDF",
    items: [
      {
        question: "How many files can I merge?",
        answer: "You can merge as many PDFs as fit within the free file-size limit.",
      },
      {
        question: "Can I reorder files?",
        answer: "Upload files in the order you want them to appear in the merged result.",
      },
      {
        question: "Are merged PDFs compressed?",
        answer:
          "The merged PDF preserves the original content. Use the compress tool if you need a smaller file.",
      },
      {
        question: "Is my data private when merging?",
        answer: "Yes. Merging happens entirely in your browser.",
      },
    ],
  },
  {
    id: "extract",
    title: "Extract PDF Pages",
    items: [
      {
        question: "Can I extract non-consecutive pages?",
        answer: "Yes. Select any combination of pages in the visual picker.",
      },
      {
        question: "What happens to the original PDF?",
        answer: "Nothing. We create a new PDF and never modify or store your original file.",
      },
      {
        question: "Is there a page limit?",
        answer: "Free jobs support up to 200 pages per file.",
      },
      {
        question: "Are extracted files compressed?",
        answer: "No. Use the compress tool if you need a smaller extracted file.",
      },
    ],
  },
  {
    id: "compress",
    title: "Compress PDF",
    items: [
      {
        question: "How much can a PDF be compressed?",
        answer:
          "Results vary. Metadata removal and object streams usually help, but image-heavy PDFs may see smaller reductions.",
      },
      {
        question: "Will compression reduce quality?",
        answer:
          "No. This tool preserves page content and images while removing extra metadata.",
      },
      {
        question: "Is there a file size limit?",
        answer: "Free jobs support up to 20 MB per file.",
      },
      {
        question: "Can I compress encrypted PDFs?",
        answer: "No. Password-protected or encrypted PDFs are not supported.",
      },
    ],
  },
];

const allQuestions = faqSections.flatMap((section) => section.items);

const webPageSchema = buildWebPageSchema({
  name: "PDF Tools FAQ",
  description:
    "Find answers about removing, splitting, merging, extracting, and compressing PDFs. All tools run in your browser, with no upload and no watermark.",
  url: `${SITE_URL}/faq/`,
});

const faqPageSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: allQuestions.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answerText || (typeof item.answer === "string" ? item.answer : ""),
    },
  })),
};

export default function FaqPage() {
  return (
    <SiteShell>
      <JsonLdScript data={[webPageSchema, faqPageSchema]} />
      <section className="mx-auto w-full max-w-5xl px-5 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">FAQ</div>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">PDF Tools FAQ</h1>
          <p className="mt-4 text-lg text-slate-600">
            Answers about removing, splitting, merging, extracting, and compressing PDFs.
          </p>
        </div>

        <div className="mt-12 space-y-10">
          {faqSections.map((section) => (
            <div key={section.id} id={section.id}>
              <h2 className="text-xl font-semibold tracking-tight text-slate-900">{section.title}</h2>
              <div className="mt-4 grid gap-4">
                {section.items.map((item) => (
                  <details
                    key={item.question}
                    className="group rounded-[24px] border border-slate-200 bg-[linear-gradient(180deg,#ffffff,#f8fafc)] p-4.5 shadow-[0_12px_32px_rgba(15,23,42,0.04)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(15,23,42,0.07)]"
                  >
                    <summary className="cursor-pointer list-none text-base font-semibold text-slate-950">
                      {item.question}
                    </summary>
                    <div className="mt-3 text-sm leading-6 text-slate-600">{item.answer}</div>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
