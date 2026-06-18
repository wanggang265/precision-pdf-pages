import Link from "next/link";
import type { ReactNode } from "react";

const navLinks = [
  { href: "/#tools", label: "Tools" },
  { href: "/#faq", label: "FAQ" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
];

const footerColumns = [
  {
    title: "Product",
    links: [
      { label: "How it works", href: "/#how-it-works" },
      { label: "Pricing", href: "/#limits" },
      { label: "FAQ", href: "/#faq" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Contact", href: "mailto:hello@precisionpdf.pages" },
      { label: "Refund", href: "mailto:hello@precisionpdf.pages?subject=Refund%20request" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Cookie", href: "/privacy#cookie" },
    ],
  },
];

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f8fafc,#f1f5f9)] text-slate-900">
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/88 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-5 py-3 sm:px-6 lg:px-8">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold tracking-tight text-slate-950">
            <span className="h-2.5 w-2.5 rounded-full bg-blue-600 shadow-[0_0_0_4px_rgba(37,99,235,0.12)]" />
            Precision PDF
          </Link>
          <nav className="hidden items-center gap-6 text-sm text-slate-600 md:flex">
            {navLinks.map((link) => (
              <Link key={link.label} href={link.href} className="transition-colors hover:text-slate-950">
                {link.label}
              </Link>
            ))}
          </nav>
          <Link
            href="/workspace"
            className="inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
          >
            Sign In
          </Link>
        </div>
      </header>

      <main>{children}</main>

      <footer className="border-t border-slate-200 bg-[linear-gradient(180deg,#ffffff,#f8fafc)]">
        <div className="mx-auto w-full max-w-7xl px-5 py-8 sm:px-6 lg:px-8">
          <div className="rounded-[30px] border border-slate-200 bg-white p-5 shadow-[0_6px_18px_rgba(15,23,42,0.04)] sm:p-6">
            <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr]">
              <div className="max-w-xl space-y-4">
                <div className="inline-flex items-center gap-2 text-sm font-semibold tracking-tight text-slate-950">
                  <span className="h-2.5 w-2.5 rounded-full bg-blue-600 shadow-[0_0_0_4px_rgba(37,99,235,0.12)]" />
                  Precision PDF
                </div>
                <p className="text-sm leading-6 text-slate-600">
                  Remove PDF pages in seconds. A focused utility for fast, secure page removal.
                </p>
                <div className="flex flex-wrap gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                  <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1">Single-purpose</span>
                  <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1">Privacy-first</span>
                  <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1">Anonymous use</span>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
                {footerColumns.map((column) => (
                  <div key={column.title} className="space-y-3">
                    <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                      {column.title}
                    </div>
                    <div className="space-y-2 text-sm text-slate-600">
                      {column.links.map((link) =>
                        link.href.startsWith("mailto:") ? (
                          <a key={link.label} href={link.href} className="block transition hover:text-slate-950">
                            {link.label}
                          </a>
                        ) : (
                          <Link key={link.label} href={link.href} className="block transition hover:text-slate-950">
                            {link.label}
                          </Link>
                        ),
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 border-t border-slate-200 pt-4 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
              <p>© 2026 Precision PDF. All rights reserved.</p>
              <p>Fast page removal with a calm, focused interface.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
