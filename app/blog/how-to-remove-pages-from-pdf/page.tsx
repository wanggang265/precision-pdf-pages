import Link from "next/link";
import { JsonLdScript } from "@/components/json-ld";
import { SiteShell } from "@/components/site-shell";
import { buildMetadata, SITE_URL } from "@/lib/seo";

const PAGE_PATH = "/blog/how-to-remove-pages-from-pdf/";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;
const PUBLISHED_DATE = "2026-07-17";

export const metadata = buildMetadata({
  title: "How to Remove Pages from a PDF Online (Free, No Upload)",
  description:
    "A step-by-step guide to deleting pages from any PDF in your browser. No installation, no signup, and no file upload for documents up to 20 MB and 200 pages.",
  canonical: PAGE_PATH,
  keywords: [
    "how to remove pages from pdf",
    "delete pages from pdf",
    "remove pdf pages online",
    "delete pdf pages free",
    "browser based pdf page remover",
  ],
});

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "How to Remove Pages from a PDF Online (Free, No Upload)",
  description:
    "A step-by-step guide to deleting pages from any PDF in your browser. No installation, no signup, and no file upload for documents up to 20 MB and 200 pages.",
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
    question: "Can I remove pages from a PDF for free?",
    answer:
      "Yes. Browser-based tools like removepdfpages.net let you delete pages from PDFs for free, with no signup required, for files up to 20 MB and 200 pages.",
  },
  {
    question: "Do I need to install software to remove PDF pages?",
    answer:
      "No. The tool runs entirely in your web browser, so you do not need to download or install anything.",
  },
  {
    question: "Is my PDF uploaded to a server?",
    answer:
      "For free-tier jobs, the PDF is processed locally in your browser. It is not uploaded to or stored on any server.",
  },
  {
    question: "Can I remove multiple pages at once?",
    answer:
      "Yes. You can select individual pages or a continuous range, and remove them all in one download.",
  },
  {
    question: "Will the output PDF have a watermark?",
    answer: "No. The cleaned PDF does not contain any watermark or added branding.",
  },
  {
    question: "What happens if my PDF is larger than 20 MB?",
    answer:
      "Files larger than 20 MB or 200 pages may require credits. You will see the option before any processing begins.",
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

export default function HowToRemovePagesFromPdfPage() {
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
                How to Remove Pages from a PDF Online
              </h1>
              <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">
                You can delete pages from a PDF without installing Adobe Acrobat or paying for software. This guide walks through the fastest way to do it in your browser, with no upload for files up to 20 MB and 200 pages.
              </p>
              <div className="mt-6">
                <CtaButton href="/remove-pdf-pages/">Remove PDF Pages Now</CtaButton>
              </div>
            </div>
          </div>
        </section>

        <SectionCard>
          <SectionEyebrow>How To</SectionEyebrow>
          <SectionH2>Remove pages from a PDF in 5 steps</SectionH2>
          <ol className="mt-6 list-decimal space-y-6 pl-5 text-sm leading-6 text-slate-600">
            <li>
              <strong className="text-slate-950">Open the Remove PDF Pages tool</strong>
              <p className="mt-1">
                Go to the{" "}
                <Link href="/remove-pdf-pages/" className="text-blue-600 hover:text-blue-700 hover:underline">
                  Remove PDF Pages
                </Link>{" "}
                page in any modern browser. The tool loads immediately and does not require an account.
              </p>
            </li>
            <li>
              <strong className="text-slate-950">Upload your PDF</strong>
              <p className="mt-1">
                Drag your PDF onto the upload area, or click to select it from your device. The file stays on your device; it is not uploaded to a server for free-tier processing.
              </p>
            </li>
            <li>
              <strong className="text-slate-950">Select the pages to delete</strong>
              <p className="mt-1">
                Click the thumbnails of the pages you want to remove. You can select individual pages, a range of pages, or a mix of both.
              </p>
            </li>
            <li>
              <strong className="text-slate-950">Click Remove or Delete Pages</strong>
              <p className="mt-1">
                The tool rebuilds the PDF locally using only the pages you kept. For most documents, this finishes in under a second.
              </p>
            </li>
            <li>
              <strong className="text-slate-950">Download the cleaned PDF</strong>
              <p className="mt-1">
                Save the new file to your device. The original PDF is not changed, so you keep a backup if you need it later.
              </p>
            </li>
          </ol>
        </SectionCard>

        <SectionCard>
          <SectionEyebrow>Use Cases</SectionEyebrow>
          <SectionH2>Common reasons to remove PDF pages</SectionH2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {[
              { title: "Clean up reports", text: "Remove draft pages, cover sheets, or outdated appendix pages from a business report." },
              { title: "Delete blank pages", text: "Scanning often inserts blank pages. Select them in the preview and remove them." },
              { title: "Trim scanned documents", text: "Keep only the relevant pages from a long scan of receipts, forms, or contracts." },
              { title: "Fix mis-ordered PDFs", text: "Remove duplicate or wrongly placed pages before merging or sharing the file." },
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
          <SectionH2>Tips for the best results</SectionH2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-slate-600">
            <li>
              <strong>Check the page count</strong> before you start, especially for scanned PDFs where blank pages may not be obvious.
            </li>
            <li>
              <strong>Use the thumbnail preview</strong> to confirm you are deleting the right pages. Thumbnails are generated locally in your browser.
            </li>
            <li>
              <strong>Keep a copy of the original</strong> until you verify the output file has the correct pages and formatting.
            </li>
            <li>
              <strong>Watch the file size</strong> — the free tier supports files up to 20 MB. Larger files can still be processed with credits.
            </li>
            <li>
              <strong>Encrypted PDFs are not supported</strong>. Remove the password first if your file is protected.
            </li>
          </ul>
        </SectionCard>

        <SectionCard>
          <SectionEyebrow>Troubleshooting</SectionEyebrow>
          <SectionH2>What to do if page removal does not work</SectionH2>
          <div className="mt-6 grid gap-4">
            {[
              {
                problem: "The file is too large",
                solution: "Compress or split the PDF first, or use credits to process files over 20 MB or 200 pages.",
              },
              {
                problem: "The PDF is password protected",
                solution: "Remove the password in another tool first. Password-protected files cannot be processed in the browser.",
              },
              {
                problem: "Pages look blank in the preview",
                solution: "Some scanned pages may have low contrast. Zoom in or use the page numbers to confirm before deleting.",
              },
              {
                problem: "The download file is corrupted",
                solution: "Try refreshing the page and reprocessing the PDF. Make sure you are using an up-to-date browser.",
              },
            ].map((item) => (
              <div
                key={item.problem}
                className="rounded-[24px] border border-slate-200 bg-[linear-gradient(180deg,#ffffff,#f8fafc)] p-5 shadow-[0_8px_22px_rgba(15,23,42,0.04)]"
              >
                <h3 className="text-base font-semibold text-slate-950">{item.problem}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{item.solution}</p>
              </div>
            ))}
          </div>
        </SectionCard>

        <section id="faq" className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-6 lg:px-8">
          <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_6px_18px_rgba(15,23,42,0.04)] sm:p-6">
            <div className="max-w-2xl">
              <SectionEyebrow>FAQ</SectionEyebrow>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
                Frequently asked questions about removing PDF pages
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
            <h2 className="text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">Ready to clean up your PDF?</h2>
            <p className="mx-auto mt-3 max-w-3xl text-sm leading-6 text-slate-600">
              Remove pages from any PDF in seconds. No signup, no upload, no watermark. Works on Mac, Windows, iPhone, and Android.
            </p>
            <div className="mt-5">
              <CtaButton href="/remove-pdf-pages/">Remove PDF Pages Now</CtaButton>
            </div>
          </div>
        </section>
      </article>
    </SiteShell>
  );
}
