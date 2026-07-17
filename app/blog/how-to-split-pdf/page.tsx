import Link from "next/link";
import { JsonLdScript } from "@/components/json-ld";
import { SiteShell } from "@/components/site-shell";
import { buildMetadata, SITE_URL } from "@/lib/seo";

const PAGE_PATH = "/blog/how-to-split-pdf/";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;
const PUBLISHED_DATE = "2026-07-17";

export const metadata = buildMetadata({
  title: "How to Split a PDF into Multiple Files (Free Online)",
  description:
    "Learn how to split a PDF into separate files by page ranges. No software install, no upload, and no watermark for documents up to 20 MB and 200 pages.",
  canonical: PAGE_PATH,
  keywords: [
    "how to split pdf",
    "split pdf into multiple files",
    "split pdf online",
    "split pdf by page range",
    "free pdf splitter",
  ],
});

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "How to Split a PDF into Multiple Files (Free Online)",
  description:
    "Learn how to split a PDF into separate files by page ranges. No software install, no upload, and no watermark for documents up to 20 MB and 200 pages.",
  image: `${SITE_URL}/og-image.png`,
  author: {
    "@type": "Organization",
    name: "removepdfpages.net",
    url: SITE_URL,
  },
  publisher: {
    "@type": "Organization",
    name: "removepdfpages.net",
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/og-image.png`,
    },
  },
  datePublished: PUBLISHED_DATE,
  dateModified: PUBLISHED_DATE,
};

const faqItems = [
  {
    question: "Can I split a PDF for free?",
    answer:
      "Yes. removepdfpages.net lets you split a PDF into multiple files for free, with no signup required for files up to 20 MB and 200 pages.",
  },
  {
    question: "What page range format should I use?",
    answer:
      "Use comma-separated numbers and ranges. For example, 1-3, 5, 7-9 creates three files: pages 1-3, page 5, and pages 7-9.",
  },
  {
    question: "Can I split a PDF into single pages?",
    answer:
      "Yes. Enter each page as its own range, such as 1, 2, 3, 4, and the tool will create one PDF per page.",
  },
  {
    question: "Is my PDF uploaded to a server?",
    answer:
      "For free-tier jobs, the PDF is processed locally in your browser. It is not uploaded to or stored on any server.",
  },
  {
    question: "What format is the output?",
    answer:
      "The output is a zip archive containing one PDF file for each range you entered.",
  },
  {
    question: "Will the split PDFs keep the original quality?",
    answer:
      "Yes. The split operation copies pages from the original PDF without re-rendering, so formatting and images are preserved.",
  },
];

const faqPageSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

function SectionCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <section className={`mx-auto w-full max-w-7xl px-5 py-12 sm:px-6 lg:px-8 ${className}`}>
      <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_6px_18px_rgba(15,23,42,0.04)] sm:p-6">
        {children}
      </div>
    </section>
  );
}

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return <div className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">{children}</div>;
}

function SectionH2({ children }: { children: React.ReactNode }) {
  return <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">{children}</h2>;
}

function CtaButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(37,99,235,0.24)] transition hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-[0_16px_36px_rgba(37,99,235,0.28)] active:translate-y-0"
    >
      {children}
    </Link>
  );
}

export default function HowToSplitPdfPage() {
  return (
    <SiteShell>
      <JsonLdScript data={[articleSchema, faqPageSchema]} />
      <article>
        <section className="mx-auto w-full max-w-7xl px-5 py-12 sm:px-6 lg:px-8">
          <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-[0_6px_18px_rgba(15,23,42,0.04)] sm:p-8 lg:p-12">
            <div className="max-w-3xl">
              <div className="inline-flex w-fit rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-blue-700">
                Step-by-Step Guide
              </div>
              <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
                How to Split a PDF into Multiple Files
              </h1>
              <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">
                Splitting a PDF by page ranges is useful when you need to separate chapters, sections, or individual pages. This guide shows how to do it online in your browser, with no install and no upload for free-tier files.
              </p>
              <div className="mt-6">
                <CtaButton href="/split-pdf/">Split PDF Now</CtaButton>
              </div>
            </div>
          </div>
        </section>

        <SectionCard>
          <SectionEyebrow>How To</SectionEyebrow>
          <SectionH2>Split a PDF by page ranges in 5 steps</SectionH2>
          <ol className="mt-6 list-decimal space-y-6 pl-5 text-sm leading-6 text-slate-600">
            <li>
              <strong className="text-slate-950">Open the Split PDF tool</strong>
              <p className="mt-1">
                Go to the{" "}
                <Link href="/split-pdf/" className="text-blue-600 hover:text-blue-700 hover:underline">
                  Split PDF
                </Link>{" "}
                page in any modern browser. The tool works on Mac, Windows, iPhone, and Android.
              </p>
            </li>
            <li>
              <strong className="text-slate-950">Upload your PDF</strong>
              <p className="mt-1">
                Drag the PDF onto the upload area or click to select it. The file stays on your device for free-tier processing.
              </p>
            </li>
            <li>
              <strong className="text-slate-950">Enter the page ranges</strong>
              <p className="mt-1">
                In the Page ranges field, type the ranges you want as separate files. Use commas to separate ranges and a dash for consecutive pages, for example: 1-3, 5, 7-9.
              </p>
            </li>
            <li>
              <strong className="text-slate-950">Click Split PDF</strong>
              <p className="mt-1">
                The tool creates a new PDF for each range and bundles them into a zip file. Processing usually takes less than a second.
              </p>
            </li>
            <li>
              <strong className="text-slate-950">Download the zip file</strong>
              <p className="mt-1">
                Extract the zip on your device to access the individual PDFs. Each file is named to match the original document and range.
              </p>
            </li>
          </ol>
        </SectionCard>

        <SectionCard>
          <SectionEyebrow>Examples</SectionEyebrow>
          <SectionH2>Common page range patterns</SectionH2>
          <div className="mt-6 overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr className="bg-slate-50">
                  <th className="rounded-tl-[16px] px-4 py-3 font-semibold text-slate-950">Goal</th>
                  <th className="px-4 py-3 font-semibold text-slate-950">Range Input</th>
                  <th className="rounded-tr-[16px] px-4 py-3 font-semibold text-slate-950">Result</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[
                  { goal: "Split into single pages", range: "1, 2, 3, 4, 5", result: "One PDF per page" },
                  { goal: "First section only", range: "1-10", result: "One PDF with pages 1–10" },
                  { goal: "Two separate chapters", range: "1-10, 11-20", result: "Two PDFs" },
                  { goal: "Mix of sections and pages", range: "1-3, 5, 7-9", result: "Three PDFs" },
                  { goal: "Everything except the cover", range: "2-50", result: "One PDF without page 1" },
                ].map((row) => (
                  <tr key={row.goal} className="hover:bg-slate-50/50">
                    <td className="px-4 py-3 text-slate-600">{row.goal}</td>
                    <td className="px-4 py-3 font-mono text-slate-950">{row.range}</td>
                    <td className="px-4 py-3 text-slate-600">{row.result}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>

        <SectionCard>
          <SectionEyebrow>Use Cases</SectionEyebrow>
          <SectionH2>When to split a PDF</SectionH2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {[
              { title: "Separate chapters", text: "A 100-page report can be split into one PDF per chapter for easier sharing." },
              { title: "Extract invoices", text: "Split a multi-invoice PDF into individual files so each invoice can be sent or filed separately." },
              { title: "Create single-page files", text: "Convert a multi-page PDF into one file per page for batch processing or printing." },
              { title: "Remove sections", text: "Keep only the relevant sections of a document and discard the rest." },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-[24px] border border-slate-200 bg-[linear-gradient(180deg,#ffffff,#f8fafc)] p-5 shadow-[0_8px_22px_rgba(15,23,42,0.04)]"
              >
                <h3 className="text-base font-semibold text-slate-950">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{item.text}</p>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard>
          <SectionEyebrow>Tips</SectionEyebrow>
          <SectionH2>Tips for splitting PDFs cleanly</SectionH2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-slate-600">
            <li>
              <strong>Preview the pages first</strong> so you know the exact page numbers for each section.
            </li>
            <li>
              <strong>Use commas and dashes consistently</strong> — the tool accepts both single pages and ranges in the same input.
            </li>
            <li>
              <strong>Check the total page count</strong> shown after upload to avoid entering ranges that exceed the document.
            </li>
            <li>
              <strong>Download and test one range first</strong> if you are unsure about the output layout.
            </li>
            <li>
              <strong>Keep the original PDF</strong> until you confirm the split files are correct.
            </li>
          </ul>
        </SectionCard>

        <section id="faq" className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-6 lg:px-8">
          <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_6px_18px_rgba(15,23,42,0.04)] sm:p-6">
            <div className="max-w-2xl">
              <SectionEyebrow>FAQ</SectionEyebrow>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
                Frequently asked questions about splitting PDFs
              </h2>
            </div>
            <div className="mt-6 grid gap-4">
              {faqItems.map((item) => (
                <details
                  key={item.question}
                  className="group rounded-[24px] border border-slate-200 bg-[linear-gradient(180deg,#ffffff,#f8fafc)] p-4.5 shadow-[0_12px_32px_rgba(15,23,42,0.04)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(15,23,42,0.07)]"
                >
                  <summary className="cursor-pointer list-none text-base font-semibold text-slate-950">
                    {item.question}
                  </summary>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-7xl px-5 pb-12 sm:px-6 lg:px-8">
          <div className="rounded-[30px] border border-slate-200 bg-[linear-gradient(180deg,#ffffff,#f8fafc)] p-6 text-center shadow-sm sm:p-8">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">Split your PDF now</h2>
            <p className="mx-auto mt-3 max-w-3xl text-sm leading-6 text-slate-600">
              Turn one PDF into multiple files by page ranges. No signup, no upload, no watermark. Works on any device.
            </p>
            <div className="mt-5">
              <CtaButton href="/split-pdf/">Split PDF Now</CtaButton>
            </div>
          </div>
        </section>
      </article>
    </SiteShell>
  );
}
