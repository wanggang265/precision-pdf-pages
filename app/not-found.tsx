import Link from "next/link";
import { SiteShell } from "@/components/site-shell";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Page Not Found — Remove PDF Pages",
  description: "The page you are looking for does not exist. Return to Remove PDF Pages and try our free PDF tools.",
  canonical: "/",
});

const tools = [
  { href: "/remove-pdf-pages/", label: "Remove PDF Pages" },
  { href: "/split-pdf/", label: "Split PDF" },
  { href: "/merge-pdf/", label: "Merge PDF" },
  { href: "/extract-pdf-pages/", label: "Extract PDF Pages" },
  { href: "/compress-pdf/", label: "Compress PDF" },
];

export default function NotFound() {
  return (
    <SiteShell>
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center px-5 py-16 text-center sm:px-6 lg:px-8">
        <div className="rounded-[30px] border border-slate-200 bg-white p-8 shadow-[0_16px_42px_rgba(15,23,42,0.05)] sm:p-12">
          <h1 className="text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">404</h1>
          <p className="mt-4 text-lg text-slate-600">Page not found</p>
          <p className="mt-2 max-w-md text-sm text-slate-500">
            The page you requested does not exist or has been moved. Go back to the home page or try one of our PDF tools.
          </p>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/"
              className="inline-flex items-center rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Go to homepage
            </Link>
            <Link
              href="/workspace"
              className="inline-flex items-center rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Open workspace
            </Link>
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            {tools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-white hover:text-slate-950"
              >
                {tool.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </SiteShell>
  );
}
