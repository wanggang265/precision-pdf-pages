"use client";

import Link from "next/link";
import { useState, useEffect, type ReactNode } from "react";
import { LoginModal } from "@/app/components/login-modal";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "https://removepdfpages-workers.gw471210.workers.dev";

interface User {
  id: number;
  email: string;
  name?: string;
  avatar?: string;
  credits?: number;
}

const tools = [
  { href: "/remove-pdf-pages/", label: "Remove PDF Pages" },
  { href: "/split-pdf/", label: "Split PDF" },
  { href: "/merge-pdf/", label: "Merge PDF" },
  { href: "/extract-pdf-pages/", label: "Extract PDF Pages" },
  { href: "/compress-pdf/", label: "Compress PDF" },
];

const footerColumns = [
  {
    title: "Tools",
    links: tools,
  },
  {
    title: "Product",
    links: [
      { label: "How it works", href: "/#how-it-works" },
      { label: "Pricing", href: "/#limits" },
      { label: "FAQ", href: "/#faq" },
      { label: "Blog", href: "/blog/best-free-pdf-page-removers/" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Contact", href: "/contact/" },
      { label: "Refund", href: "mailto:billing@removepdfpages.net?subject=Refund%20request" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy/" },
      { label: "Terms of Service", href: "/terms/" },
      { label: "Cookie", href: "/privacy/#cookie" },
    ],
  },
];

export function SiteShell({ children }: { children: ReactNode }) {
  const [loginOpen, setLoginOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [userLoading, setUserLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/auth/me`, {
        credentials: "include",
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data.user ?? null);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    } finally {
      setUserLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    if (url.searchParams.get("login") === "success") {
      fetchUser();
      url.searchParams.delete("login");
      window.history.replaceState({}, document.title, url.pathname + url.search);
    }
  }, []);

  const handleLogout = async () => {
    try {
      await fetch(`${API_BASE}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch {
      // ignore
    }
    setUser(null);
  };

  const userInitial = user?.name ? user.name.charAt(0).toUpperCase() : user?.email ? user.email.charAt(0).toUpperCase() : "?";

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f8fafc,#f1f5f9)] text-slate-900">
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/92 shadow-[0_8px_24px_rgba(15,23,42,0.04)] backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-5 py-3 sm:px-6 lg:px-8">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold tracking-tight text-slate-950">
            <span className="h-2.5 w-2.5 rounded-full bg-blue-600 shadow-[0_0_0_4px_rgba(37,99,235,0.12)]" />
            Remove PDF Pages
          </Link>
          <nav className="hidden items-center gap-6 text-sm text-slate-600 md:flex">
            <div
              className="relative"
              onMouseEnter={() => setToolsOpen(true)}
              onMouseLeave={() => setToolsOpen(false)}
            >
              <button
                type="button"
                onClick={() => setToolsOpen((open) => !open)}
                className="rounded-full px-3 py-1.5 transition-colors hover:bg-slate-100 hover:text-slate-950"
              >
                Tools
              </button>
              {toolsOpen ? (
                <div className="absolute left-0 top-full z-50 min-w-[12rem] rounded-2xl border border-slate-200 bg-white p-2 shadow-[0_12px_32px_rgba(15,23,42,0.12)]">
                  {tools.map((tool) => (
                    <Link
                      key={tool.href}
                      href={tool.href}
                      className="block rounded-xl px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-50 hover:text-slate-950"
                    >
                      {tool.label}
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>
            <Link href="/pricing/" className="rounded-full px-3 py-1.5 transition-colors hover:bg-slate-100 hover:text-slate-950">
              Pricing
            </Link>
            <Link href="/#faq" className="rounded-full px-3 py-1.5 transition-colors hover:bg-slate-100 hover:text-slate-950">
              FAQ
            </Link>
            <Link href="/privacy/" className="rounded-full px-3 py-1.5 transition-colors hover:bg-slate-100 hover:text-slate-950">
              Privacy
            </Link>
            <Link href="/terms/" className="rounded-full px-3 py-1.5 transition-colors hover:bg-slate-100 hover:text-slate-950">
              Terms
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            {userLoading ? (
              <div className="h-9 w-9 animate-pulse rounded-full bg-slate-200" />
            ) : user ? (
              <div className="flex items-center gap-2">
                {user.credits !== undefined && (
                  <span className="hidden text-xs text-slate-500 sm:inline">
                    {user.credits} credits
                  </span>
                )}
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
                  title="Log out"
                >
                  Log out
                </button>
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name || user.email}
                    className="h-9 w-9 rounded-full border border-slate-200 object-cover"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-slate-100 text-sm font-bold text-slate-600">
                    {userInitial}
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => setLoginOpen(true)}
                className="inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
              >
                Sign In
              </button>
            )}
            <Link
              href="/workspace/"
              className="inline-flex items-center rounded-full border border-blue-200 bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
            >
              Open workspace
            </Link>
          </div>
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
                  Remove PDF Pages
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
                          <a key={link.label} href={link.href} className="block rounded-lg px-2 py-1 transition hover:bg-slate-50 hover:text-slate-950">
                            {link.label}
                          </a>
                        ) : (
                          <Link key={link.label} href={link.href} className="block rounded-lg px-2 py-1 transition hover:bg-slate-50 hover:text-slate-950">
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
              <p>© 2026 Remove PDF Pages. All rights reserved.</p>
              <p>Fast page removal with a calm, focused interface.</p>
            </div>
          </div>
        </div>
      </footer>

      <LoginModal isOpen={loginOpen} onClose={() => setLoginOpen(false)} />
    </div>
  );
}
