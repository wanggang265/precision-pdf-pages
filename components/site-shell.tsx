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
    title: "Brand",
    links: [
      { label: "Home", href: "/" },
      { label: "Workspace", href: "/workspace" },
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
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/85 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="text-sm font-semibold tracking-tight text-slate-950">
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
            className="inline-flex items-center rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Sign In
          </Link>
        </div>
      </header>

      <main>{children}</main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-5 py-12 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:px-8">
          <div className="max-w-xl space-y-4">
            <div className="text-lg font-semibold tracking-tight text-slate-950">Precision PDF</div>
            <p className="text-sm leading-6 text-slate-600">
              Remove PDF pages in seconds. A focused utility for fast, secure page removal.
            </p>
            <p className="text-xs uppercase tracking-[0.22em] text-slate-400">
              © 2026 Precision PDF. All rights reserved.
            </p>
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
      </footer>
    </div>
  );
}
