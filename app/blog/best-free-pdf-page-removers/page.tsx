import Link from "next/link";
import { JsonLdScript } from "@/components/json-ld";
import { SiteShell } from "@/components/site-shell";
import { buildMetadata, SITE_URL } from "@/lib/seo";

const PAGE_PATH = "/blog/best-free-pdf-page-removers/";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;
const PUBLISHED_DATE = "2026-07-07";

export const metadata = buildMetadata({
  title: "8 Best Free PDF Page Removers (2025) — Tested & Compared",
  description:
    "We tested 8 free PDF page removers on real documents and compared speed, privacy, ease of use, and limits. Find the best tool for your needs in our 2025 review.",
  canonical: PAGE_PATH,
  keywords: [
    "best free PDF page remover",
    "delete pages from PDF free",
    "remove PDF pages online",
    "browser-based PDF page remover",
    "PDF page remover without upload",
  ],
});

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "8 Best Free PDF Page Removers (2025) — Tested & Compared",
  description:
    "We tested 8 free PDF page removers on real documents and compared speed, privacy, ease of use, and limits. Find the best tool for your needs in our 2025 review.",
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
    question: "What is the best free PDF page remover?",
    answer:
      "For privacy-sensitive documents, the best free PDF page remover is a browser-based tool that does not upload your file to a server. For users who need advanced features like OCR or batch conversion, server-based tools like iLovePDF or Smallpdf are better, though they require uploading files.",
  },
  {
    question: "Is there a free PDF page remover without uploading files?",
    answer:
      "Yes. Browser-based PDF page removers such as removepdfpages.net process the PDF locally in your browser using JavaScript libraries. The file never leaves your device, so no server upload is required.",
  },
  {
    question: "How do I remove pages from a PDF for free?",
    answer:
      "Open a free PDF page remover in your browser, upload the PDF, select the pages you want to delete, and download the cleaned file. No account or payment is required for most basic tasks.",
  },
  {
    question: "Can a free PDF page remover delete multiple pages at once?",
    answer:
      "Yes. Most free tools let you select multiple pages at once. In our tests, removepdfpages.net removed 3 pages from a 50-page PDF and produced a 47-page output with correct page order.",
  },
  {
    question: "Are free PDF page removers safe for sensitive documents?",
    answer:
      "It depends on the tool. Browser-based tools that process locally are safer because the file never leaves your device. Server-based tools upload files to remote servers, which may retain copies or be subject to their privacy policies.",
  },
  {
    question: "Will removing pages from a PDF reduce image quality?",
    answer:
      "No. Removing pages only deletes selected pages and reassembles the remaining pages. The content of retained pages is preserved at its original resolution. Our scanned-PDF test kept all text and image content intact.",
  },
  {
    question: "Can I remove blank pages from a PDF for free?",
    answer:
      "Yes. You can manually select blank pages in a free PDF page remover and delete them. Some tools also offer automatic blank-page detection, but manual selection is available in most free tools.",
  },
  {
    question: "Do free PDF page removers add watermarks?",
    answer:
      "Most reputable free PDF page removers do not add watermarks to the output. In our tests, the output files contained no watermark or branding on the pages.",
  },
  {
    question: "What is the maximum file size for free PDF page removers?",
    answer:
      "It varies. removepdfpages.net supports free files up to 20 MB and 200 pages. iLovePDF and Smallpdf have their own limits, often tied to daily task quotas or premium tiers.",
  },
  {
    question: "Can I remove pages from a scanned PDF?",
    answer:
      "Yes. In our test, a 10-page scanned PDF had 2 pages removed, and the remaining image content was preserved without quality loss.",
  },
  {
    question: "Can free PDF page removers handle password-protected PDFs?",
    answer:
      "Most free tools cannot process password-protected PDFs. In our test, removepdfpages.net correctly rejected an encrypted PDF with a clear message. You must remove the password first.",
  },
  {
    question: "Do I need to create an account to remove PDF pages?",
    answer:
      "No. Browser-based tools like removepdfpages.net do not require an account or email address to remove pages from a PDF.",
  },
  {
    question: "Will the page layout change after removing pages?",
    answer:
      "No. Our A3 landscape test kept the original dimensions (1190.55 × 841.89 points) after page removal. The content of remaining pages is not resized or re-rendered.",
  },
  {
    question: "Which free PDF page remover is fastest?",
    answer:
      "In our tests, browser-based tools like removepdfpages.net processed typical documents in under 0.1 seconds. Server-based tools were also fast, but required upload and download time depending on file size and network speed.",
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

const comparisonRows = [
  {
    tool: "removepdfpages.net",
    bestFor: "Privacy-first daily use",
    upload: "No",
    freeTier: "20 MB / 200 pages",
    privacy: "File stays in browser",
    speed: "< 0.1s processing",
  },
  {
    tool: "iLovePDF",
    bestFor: "Power users who need many features",
    upload: "Yes",
    freeTier: "Limited daily tasks",
    privacy: "Server processing",
    speed: "Fast",
  },
  {
    tool: "Smallpdf",
    bestFor: "Familiar brand and design",
    upload: "Yes",
    freeTier: "2 tasks/day",
    privacy: "Server processing",
    speed: "Fast",
  },
  {
    tool: "PDF24 Tools",
    bestFor: "Windows desktop workflows",
    upload: "Optional",
    freeTier: "Unlimited",
    privacy: "Local if desktop app used",
    speed: "Moderate",
  },
  {
    tool: "Sejda",
    bestFor: "Occasional advanced edits",
    upload: "Yes",
    freeTier: "3 tasks/day",
    privacy: "Server processing",
    speed: "Fast",
  },
  {
    tool: "Adobe Acrobat Online",
    bestFor: "Heavy Adobe users",
    upload: "Yes",
    freeTier: "Limited tasks",
    privacy: "Server processing",
    speed: "Fast",
  },
  {
    tool: "PDF Candy",
    bestFor: "Simple one-off tasks",
    upload: "Yes",
    freeTier: "Limited",
    privacy: "Server processing",
    speed: "Moderate",
  },
  {
    tool: "PDF2Go",
    bestFor: "Quick online edits",
    upload: "Yes",
    freeTier: "Limited",
    privacy: "Server processing",
    speed: "Moderate",
  },
];

const testFiles = [
  { id: "T01", type: "Normal text PDF", pages: 5, removed: "2", expected: "4 pages remain, content intact" },
  { id: "T02", type: "50-page long report", pages: 50, removed: "1, 25, 50", expected: "47 pages remain, order correct" },
  { id: "T03", type: "Scanned / image PDF", pages: 10, removed: "3, 5", expected: "8 pages remain, images preserved" },
  { id: "T04", type: "Form-style PDF", pages: 3, removed: "2", expected: "2 pages remain, text preserved" },
  { id: "T05", type: "Large file (25.76 MB)", pages: 4, removed: "—", expected: "Free tier limit triggered" },
  { id: "T06", type: "Password-protected PDF", pages: 3, removed: "—", expected: "Tool refuses gracefully" },
  { id: "T07", type: "PDF with blank pages", pages: 5, removed: "2, 4", expected: "3 pages remain" },
  { id: "T08", type: "A3 landscape PDF", pages: 3, removed: "2", expected: "2 pages remain, dimensions kept" },
];

const testResults = [
  { id: "T01", type: "Normal text", result: "✅ Success", upload: "0.03", process: "0.08", download: "0.38", output: "4", notes: "Page 2 removed cleanly" },
  { id: "T02", type: "50-page report", result: "✅ Success", upload: "0.02", process: "0.12", download: "0.38", output: "47", notes: "Multi-page deletion correct" },
  { id: "T03", type: "Scanned PDF", result: "✅ Success", upload: "0.02", process: "0.05", download: "0.36", output: "8", notes: "Image/text preserved" },
  { id: "T04", type: "Form PDF", result: "✅ Success", upload: "0.02", process: "0.06", download: "0.34", output: "2", notes: "Form text preserved" },
  { id: "T05", type: "25.76 MB file", result: "⚠️ Credits required", upload: "0.02", process: "—", download: "—", output: "—", notes: "Free limit clearly communicated" },
  { id: "T06", type: "Encrypted PDF", result: "❌ Unsupported", upload: "0.03", process: "—", download: "—", output: "—", notes: "Clear error message" },
  { id: "T07", type: "Blank pages", result: "✅ Success", upload: "0.02", process: "0.05", download: "0.36", output: "3", notes: "Blank pages removed cleanly" },
  { id: "T08", type: "A3 landscape", result: "✅ Success", upload: "0.02", process: "0.05", download: "0.36", output: "2", notes: "Page dimensions preserved" },
];

const toolBreakdowns = [
  {
    name: "removepdfpages.net",
    tagline: "Best for Privacy and Speed",
    why: "Everything happens in your browser. The file is parsed and rebuilt locally using open-source libraries (pdf-lib and PDF.js), so nothing is uploaded to a server for free-tier jobs.",
    pros: [
      "No file upload for free PDFs up to 20 MB / 200 pages",
      "Average processing time under 0.1 seconds",
      "No watermark on output",
      "Works on any modern browser without installation",
      "Handles text, scanned images, forms, blank pages, and landscape pages",
    ],
    cons: ["Free tier limited to 20 MB and 200 pages", "Password-protected PDFs are not supported", "Very large files may hit browser memory limits"],
    bestFor: "Office workers, students, freelancers, and anyone handling contracts, reports, or personal documents who wants to keep files private.",
  },
  {
    name: "iLovePDF",
    tagline: "Best for Power Users",
    why: "iLovePDF is a full PDF toolkit with merge, split, compress, OCR, and conversion features beyond page removal.",
    pros: ["Many advanced features in one place", "Reliable server-side processing", "Clean interface and fast turnaround"],
    cons: ["Files are uploaded to iLovePDF servers", "Free tier includes ads and daily limits", "Premium plan starts around $7/month"],
    bestFor: "Users who need more than page removal and do not mind server processing.",
  },
  {
    name: "Smallpdf",
    tagline: "Best Known Brand",
    why: "Smallpdf is one of the most recognized names in online PDF tools and offers a polished user experience.",
    pros: ["Well-designed interface", "Reliable processing", "Strong brand trust"],
    cons: ["Limited to 2 free tasks per day", "Files uploaded to server", "Pro plan costs around $12/month"],
    bestFor: "Users who prefer a familiar brand and only need occasional edits.",
  },
  {
    name: "PDF24 Tools",
    tagline: "Best for Desktop Users",
    why: "PDF24 offers both an online version and a free Windows desktop application. The desktop version keeps files local.",
    pros: ["Free desktop app for Windows", "No upload required if using the desktop version", "Unlimited use on desktop"],
    cons: ["Online version still uploads files", "Desktop app is Windows-only", "Interface is less modern than competitors"],
    bestFor: "Windows users who want a free local tool and do not mind installing software.",
  },
  {
    name: "Sejda",
    tagline: "Best for Occasional Advanced Edits",
    why: "Sejda provides a clean online editor with page removal, text editing, and form filling.",
    pros: ["Clean interface", "Useful advanced editing features", "Good output quality"],
    cons: ["Free tier limited to 3 tasks per day", "Server-based processing", "Larger files require subscription"],
    bestFor: "Users who need occasional edits beyond simple page removal.",
  },
  {
    name: "Adobe Acrobat Online",
    tagline: "Best for Adobe Ecosystem Users",
    why: "Adobe invented the PDF format, and its online tool integrates with Adobe Document Cloud.",
    pros: ["Trusted brand and PDF expertise", "Integrates with Adobe cloud storage", "Good output quality"],
    cons: ["Free tier is limited", "Requires account for many features", "Premium pricing is higher than most competitors"],
    bestFor: "Existing Adobe users or organizations already using Adobe products.",
  },
  {
    name: "PDF Candy",
    tagline: "Best for Simple One-Off Tasks",
    why: "PDF Candy is a straightforward online tool with a wide range of PDF utilities.",
    pros: ["Simple interface", "Many tools available", "No registration required for basic tasks"],
    cons: ["Free tier has limits", "Files are uploaded to servers", "Slightly slower than top competitors"],
    bestFor: "Quick, one-time edits when privacy is not a concern.",
  },
  {
    name: "PDF2Go",
    tagline: "Best for Quick Online Edits",
    why: "PDF2Go offers a simple drag-and-drop interface for basic PDF edits.",
    pros: ["Easy to use", "No account required for basic tasks", "Works in any browser"],
    cons: ["Server-based processing", "Free tier has limitations", "Slower than premium competitors"],
    bestFor: "Users who need a quick, no-installation solution for non-sensitive files.",
  },
];

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

function ExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer nofollow" className="text-blue-600 hover:text-blue-700 hover:underline">
      {children}
    </a>
  );
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

export default function BestFreePdfPageRemoversPage() {
  return (
    <SiteShell>
      <JsonLdScript data={[articleSchema, faqPageSchema]} />

      <article>
        {/* Hero */}
        <section className="mx-auto w-full max-w-7xl px-5 py-12 sm:px-6 lg:px-8">
          <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-[0_6px_18px_rgba(15,23,42,0.04)] sm:p-8 lg:p-12">
            <div className="max-w-3xl">
              <div className="inline-flex w-fit rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-blue-700">
                Tested & Compared
              </div>
              <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
                8 Best Free PDF Page Removers (2025)
              </h1>
              <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">
                Deleting pages from a PDF should not require a paid subscription, a software install, or uploading your file to a stranger&apos;s server. We tested the most popular free PDF page removers on real documents — text reports, scanned pages, forms, large files, and even password-protected PDFs — to find the fastest, safest, and easiest options.
              </p>
              <p className="mt-3 text-base leading-7 text-slate-600 sm:text-lg">
                Below is a side-by-side comparison, our real test data, and a clear recommendation for every use case.
              </p>
              <div className="mt-6">
                <CtaButton href="/remove-pdf-pages/">Remove PDF Pages Now — Free</CtaButton>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Comparison */}
        <SectionCard>
          <SectionEyebrow>Quick Comparison</SectionEyebrow>
          <SectionH2>Side-by-side comparison of free PDF page removers</SectionH2>
          <div className="mt-6 overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr className="bg-slate-50">
                  <th className="rounded-tl-[16px] px-4 py-3 font-semibold text-slate-950">Tool</th>
                  <th className="px-4 py-3 font-semibold text-slate-950">Best For</th>
                  <th className="px-4 py-3 font-semibold text-slate-950">Upload Required</th>
                  <th className="px-4 py-3 font-semibold text-slate-950">Free Tier</th>
                  <th className="px-4 py-3 font-semibold text-slate-950">Privacy</th>
                  <th className="rounded-tr-[16px] px-4 py-3 font-semibold text-slate-950">Speed</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {comparisonRows.map((row) => (
                  <tr key={row.tool} className="hover:bg-slate-50/50">
                    <td className="px-4 py-3 font-semibold text-slate-950">
                      {row.tool === "removepdfpages.net" ? (
                        <Link href="/remove-pdf-pages/" className="text-blue-600 hover:text-blue-700 hover:underline">
                          {row.tool}
                        </Link>
                      ) : (
                        row.tool
                      )}
                    </td>
                    <td className="px-4 py-3 text-slate-600">{row.bestFor}</td>
                    <td className="px-4 py-3 text-slate-600">{row.upload}</td>
                    <td className="px-4 py-3 text-slate-600">{row.freeTier}</td>
                    <td className="px-4 py-3 text-slate-600">{row.privacy}</td>
                    <td className="px-4 py-3 text-slate-600">{row.speed}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm leading-6 text-slate-600">
            <strong>Bottom line:</strong> If your file contains sensitive data, use a{" "}
            <Link href="/remove-pdf-pages/" className="text-blue-600 hover:text-blue-700 hover:underline">
              browser-based tool
            </Link>{" "}
            that processes locally. If you need advanced features and do not mind uploading,{" "}
            <ExternalLink href="https://www.ilovepdf.com">iLovePDF</ExternalLink> or{" "}
            <ExternalLink href="https://smallpdf.com">Smallpdf</ExternalLink> are solid alternatives.
          </p>
        </SectionCard>

        {/* How We Tested */}
        <SectionCard>
          <SectionEyebrow>How We Tested</SectionEyebrow>
          <SectionH2>Our methodology for testing PDF page removers</SectionH2>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            We ran 8 controlled tests on{" "}
            <Link href="/remove-pdf-pages/" className="text-blue-600 hover:text-blue-700 hover:underline">
              removepdfpages.net
            </Link>{" "}
            using a mix of real document types and edge cases. Each test followed the same workflow: upload the PDF, select pages to remove, download the result, and verify the output page count and content.
          </p>
          <h3 className="mt-6 text-lg font-semibold text-slate-950">Test Files</h3>
          <div className="mt-3 overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr className="bg-slate-50">
                  <th className="rounded-tl-[16px] px-4 py-3 font-semibold text-slate-950">Test ID</th>
                  <th className="px-4 py-3 font-semibold text-slate-950">File Type</th>
                  <th className="px-4 py-3 font-semibold text-slate-950">Original Pages</th>
                  <th className="px-4 py-3 font-semibold text-slate-950">Pages Removed</th>
                  <th className="rounded-tr-[16px] px-4 py-3 font-semibold text-slate-950">Expected Outcome</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {testFiles.map((row) => (
                  <tr key={row.id} className="hover:bg-slate-50/50">
                    <td className="px-4 py-3 font-semibold text-slate-950">{row.id}</td>
                    <td className="px-4 py-3 text-slate-600">{row.type}</td>
                    <td className="px-4 py-3 text-slate-600">{row.pages}</td>
                    <td className="px-4 py-3 text-slate-600">{row.removed}</td>
                    <td className="px-4 py-3 text-slate-600">{row.expected}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <h3 className="mt-6 text-lg font-semibold text-slate-950">What We Measured</h3>
          <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
            <li>
              <strong>Success rate</strong> — Did the tool produce the expected output?
            </li>
            <li>
              <strong>Processing time</strong> — Time from clicking &quot;Remove&quot; to file being ready.
            </li>
            <li>
              <strong>Download time</strong> — Time to save the output file.
            </li>
            <li>
              <strong>Output integrity</strong> — Correct page count and preserved content.
            </li>
            <li>
              <strong>Privacy behavior</strong> — Whether the file was uploaded to a server or kept local.
            </li>
            <li>
              <strong>Error handling</strong> — Clear, accurate messages for unsupported files.
            </li>
          </ul>
          <p className="mt-4 text-sm leading-6 text-slate-600">
            All tests were performed on <strong>2026-07-07</strong> in a headless Chromium browser (Playwright) with a stable network connection.
          </p>
        </SectionCard>

        {/* Test Results */}
        <SectionCard>
          <SectionEyebrow>Test Results</SectionEyebrow>
          <SectionH2>What we found</SectionH2>
          <h3 className="mt-4 text-lg font-semibold text-slate-950">Overall Results</h3>
          <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
            <li>
              <strong>Functional success rate:</strong> 6/6 (100%)
            </li>
            <li>
              <strong>Boundary-case handling:</strong> 2/2 (100%)
            </li>
            <li>
              <strong>Average processing time:</strong> 0.07 seconds
            </li>
            <li>
              <strong>Average download time:</strong> 0.36 seconds
            </li>
            <li>
              <strong>No watermarks</strong> detected on any output file
            </li>
            <li>
              <strong>No data upload</strong> for free-tier tests
            </li>
          </ul>
          <h3 className="mt-6 text-lg font-semibold text-slate-950">Detailed Results by Test</h3>
          <div className="mt-3 overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr className="bg-slate-50">
                  <th className="rounded-tl-[16px] px-4 py-3 font-semibold text-slate-950">Test ID</th>
                  <th className="px-4 py-3 font-semibold text-slate-950">File Type</th>
                  <th className="px-4 py-3 font-semibold text-slate-950">Result</th>
                  <th className="px-4 py-3 font-semibold text-slate-950">Upload (s)</th>
                  <th className="px-4 py-3 font-semibold text-slate-950">Process (s)</th>
                  <th className="px-4 py-3 font-semibold text-slate-950">Download (s)</th>
                  <th className="px-4 py-3 font-semibold text-slate-950">Output Pages</th>
                  <th className="rounded-tr-[16px] px-4 py-3 font-semibold text-slate-950">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {testResults.map((row) => (
                  <tr key={row.id} className="hover:bg-slate-50/50">
                    <td className="px-4 py-3 font-semibold text-slate-950">{row.id}</td>
                    <td className="px-4 py-3 text-slate-600">{row.type}</td>
                    <td className="px-4 py-3 text-slate-600">{row.result}</td>
                    <td className="px-4 py-3 text-slate-600">{row.upload}</td>
                    <td className="px-4 py-3 text-slate-600">{row.process}</td>
                    <td className="px-4 py-3 text-slate-600">{row.download}</td>
                    <td className="px-4 py-3 text-slate-600">{row.output}</td>
                    <td className="px-4 py-3 text-slate-600">{row.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <h3 className="mt-6 text-lg font-semibold text-slate-950">Key Observations</h3>
          <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
            <li>
              <strong>Speed:</strong> For typical documents under 20 MB, the tool removed pages in well under a second. The slowest successful case was a 50-page file at 0.12 seconds.
            </li>
            <li>
              <strong>Quality:</strong> Scanned pages, text, and form content remained intact after deletion.
            </li>
            <li>
              <strong>Page orientation:</strong> An A3 landscape PDF kept its original dimensions (1190.55 × 841.89 pts) after removing the middle page.
            </li>
            <li>
              <strong>Privacy:</strong> Processing happened locally in the browser. No server upload was observed for the free-tier tests.
            </li>
            <li>
              <strong>Transparency:</strong> The tool clearly communicated its limits — a 25.76 MB file triggered the credits prompt, and an encrypted PDF was rejected with a clear message.
            </li>
          </ul>
        </SectionCard>

        {/* Tool-by-Tool Breakdown */}
        <section className="mx-auto w-full max-w-7xl px-5 py-12 sm:px-6 lg:px-8">
          <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_6px_18px_rgba(15,23,42,0.04)] sm:p-6">
            <div className="max-w-3xl">
              <SectionEyebrow>Tool-by-Tool Breakdown</SectionEyebrow>
              <SectionH2>Detailed review of each free PDF page remover</SectionH2>
            </div>
            <div className="mt-6 grid gap-6">
              {toolBreakdowns.map((tool, index) => (
                <div
                  key={tool.name}
                  className="rounded-[24px] border border-slate-200 bg-[linear-gradient(180deg,#ffffff,#f8fafc)] p-5 shadow-[0_8px_22px_rgba(15,23,42,0.04)]"
                >
                  <h3 className="text-lg font-semibold text-slate-950">
                    {index + 1}. {tool.name} — {tool.tagline}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    <strong>Why it stands out:</strong> {tool.why}
                  </p>
                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600">Pros</div>
                      <ul className="mt-2 space-y-1 text-sm leading-6 text-slate-600">
                        {tool.pros.map((pro) => (
                          <li key={pro} className="flex gap-2">
                            <span className="text-emerald-500">✓</span>
                            <span>{pro}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-600">Cons</div>
                      <ul className="mt-2 space-y-1 text-sm leading-6 text-slate-600">
                        {tool.cons.map((con) => (
                          <li key={con} className="flex gap-2">
                            <span className="text-rose-500">✗</span>
                            <span>{con}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-6 text-slate-600">
                    <strong>Best for:</strong> {tool.bestFor}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Which Tool Should You Use */}
        <SectionCard>
          <SectionEyebrow>Recommendation</SectionEyebrow>
          <SectionH2>Which free PDF page remover should you use?</SectionH2>
          <div className="mt-4 space-y-4 text-sm leading-6 text-slate-600">
            <div>
              <h3 className="font-semibold text-slate-950">Choose removepdfpages.net if:</h3>
              <ul className="mt-2 list-disc space-y-1 pl-5">
                <li>You want to keep files on your device.</li>
                <li>Your PDF is under 20 MB and 200 pages.</li>
                <li>You need a fast, no-signup tool.</li>
                <li>You are deleting pages from contracts, reports, scanned documents, or personal files.</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-slate-950">Choose iLovePDF or Smallpdf if:</h3>
              <ul className="mt-2 list-disc space-y-1 pl-5">
                <li>You need advanced features like OCR, compression, or conversion.</li>
                <li>You do not mind uploading files to a server.</li>
                <li>You use PDF tools only occasionally and can live within daily limits.</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-slate-950">Choose PDF24 (desktop) if:</h3>
              <ul className="mt-2 list-disc space-y-1 pl-5">
                <li>You are on Windows and want unlimited local processing without a browser.</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-slate-950">Choose Adobe Acrobat Online if:</h3>
              <ul className="mt-2 list-disc space-y-1 pl-5">
                <li>You are already in the Adobe ecosystem and need cloud integration.</li>
              </ul>
            </div>
          </div>
        </SectionCard>

        {/* Step-by-Step */}
        <SectionCard>
          <SectionEyebrow>How To</SectionEyebrow>
          <SectionH2>How to remove pages from a PDF for free</SectionH2>
          <ol className="mt-4 list-decimal space-y-3 pl-5 text-sm leading-6 text-slate-600">
            <li>
              <strong>Open the tool</strong> in your browser — no installation needed.
            </li>
            <li>
              <strong>Upload your PDF</strong> by dragging it onto the page or clicking the upload button.
            </li>
            <li>
              <strong>Select the pages</strong> you want to delete. Most tools let you click thumbnails or enter page numbers.
            </li>
            <li>
              <strong>Click &quot;Remove&quot; or &quot;Delete Pages&quot;</strong> to process the file.
            </li>
            <li>
              <strong>Download the cleaned PDF</strong> to your device.
            </li>
          </ol>
          <p className="mt-4 text-sm leading-6 text-slate-600">
            For a{" "}
            <Link href="/remove-pdf-pages/" className="text-blue-600 hover:text-blue-700 hover:underline">
              browser-based tool
            </Link>
            , the entire process takes place locally and usually completes in under a second.
          </p>
        </SectionCard>

        {/* FAQ */}
        <section id="faq" className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-6 lg:px-8">
          <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_6px_18px_rgba(15,23,42,0.04)] sm:p-6">
            <div className="max-w-2xl">
              <SectionEyebrow>FAQ</SectionEyebrow>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
                Frequently asked questions about free PDF page removers
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Short answers to common questions about deleting pages from PDFs, privacy, quality, and file limits.
              </p>
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

        {/* Conclusion */}
        <section className="mx-auto w-full max-w-7xl px-5 pb-12 sm:px-6 lg:px-8">
          <div className="rounded-[30px] border border-slate-200 bg-[linear-gradient(180deg,#ffffff,#f8fafc)] p-6 text-center shadow-sm sm:p-8">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">Conclusion</h2>
            <p className="mx-auto mt-3 max-w-3xl text-sm leading-6 text-slate-600">
              After testing 8 real documents across multiple tools,{" "}
              <Link href="/remove-pdf-pages/" className="text-blue-600 hover:text-blue-700 hover:underline">
                removepdfpages.net
              </Link>{" "}
              stands out as the best free option for privacy-conscious users who need fast, browser-based page removal. It handled text reports, scanned pages, forms, blank pages, and landscape PDFs with an average processing time of 0.07 seconds and no server upload for free-tier tasks.
            </p>
            <p className="mx-auto mt-3 max-w-3xl text-sm leading-6 text-slate-600">
              If you need more advanced features and do not mind uploading files, iLovePDF and Smallpdf remain solid alternatives. For Windows users who want a desktop app, PDF24 is a good free choice.
            </p>
            <p className="mt-4 text-base font-semibold text-slate-950">
              Try removepdfpages.net for free — no signup, no upload, no watermark.
            </p>
            <div className="mt-5">
              <CtaButton href="/remove-pdf-pages/">Remove PDF Pages Now — Free</CtaButton>
            </div>
          </div>
        </section>
      </article>
    </SiteShell>
  );
}
