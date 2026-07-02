import type { ReactNode } from "react";
import Link from "next/link";

export type ToolMeta = {
  href: string;
  title: string;
  description: string;
};

export type PdfToolPageLayoutProps = {
  eyebrow: string;
  title: string;
  description: string;
  heroCta?: { label: string; href: string };
  operationArea: ReactNode;
  howItWorks: Array<{ step: string; label: string; detail: string }>;
  whyUse: Array<{ title: string; text: string }>;
  faq: Array<{ question: string; answer: string }>;
  relatedTools: ToolMeta[];
  securityText: string;
};

export function PdfToolPageLayout({
  eyebrow,
  title,
  description,
  heroCta,
  operationArea,
  howItWorks,
  whyUse,
  faq,
  relatedTools,
  securityText,
}: PdfToolPageLayoutProps) {
  return (
    <>
      <section className="border-b border-slate-200/70 bg-[radial-gradient(circle_at_top_left,_rgba(37,99,235,0.12),_transparent_34%),linear-gradient(180deg,#ffffff,#f8fafc)]">
        <div className="mx-auto w-full max-w-7xl px-5 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="inline-flex w-fit rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-blue-700">
            {eyebrow}
          </div>
          <h1 className="mt-4 max-w-[16ch] text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
            {title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">{description}</p>
          {heroCta ? (
            <div className="mt-6">
              <Link
                href={heroCta.href}
                className="inline-flex items-center rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(37,99,235,0.24)] transition hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-[0_16px_36px_rgba(37,99,235,0.28)] active:translate-y-0"
              >
                {heroCta.label}
              </Link>
            </div>
          ) : null}
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-5 py-12 sm:px-6 lg:px-8">
        {operationArea}
      </section>

      <section className="border-y border-slate-200 bg-[linear-gradient(180deg,#ffffff,#f8fafc)]">
        <div className="mx-auto w-full max-w-7xl px-5 py-12 sm:px-6 lg:px-8">
          <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_6px_18px_rgba(15,23,42,0.04)] sm:p-6">
            <div className="max-w-2xl">
              <div className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">How it works</div>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">A simple workflow</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">The flow stays linear and calm: upload, configure, download.</p>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {howItWorks.map((item) => (
                <div key={item.step} className="rounded-[24px] border border-slate-200 bg-[linear-gradient(180deg,#ffffff,#f8fafc)] p-5 shadow-[0_8px_22px_rgba(15,23,42,0.04)] transition hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(15,23,42,0.06)]">
                  <div className="inline-flex rounded-full border border-blue-100 bg-blue-50 px-2.5 py-1 text-[11px] font-semibold text-blue-700">
                    {item.step}
                  </div>
                  <h3 className="mt-3 text-base font-semibold text-slate-950">{item.label}</h3>
                  <p className="mt-2.5 text-sm leading-6 text-slate-600">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-5 py-12 sm:px-6 lg:px-8">
        <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_6px_18px_rgba(15,23,42,0.04)] sm:p-6">
          <div className="max-w-2xl">
            <div className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">Why use this tool</div>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">Built for speed and privacy</h2>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {whyUse.map((item, index) => (
              <article key={item.title} className="rounded-[24px] border border-slate-200 bg-[linear-gradient(180deg,#ffffff,#f8fafc)] p-5 shadow-[0_8px_22px_rgba(15,23,42,0.04)] transition hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(15,23,42,0.06)]">
                <div className="inline-flex rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-500">
                  0{index + 1}
                </div>
                <h3 className="mt-3 text-base font-semibold text-slate-950">{item.title}</h3>
                <p className="mt-2.5 text-sm leading-6 text-slate-600">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-[linear-gradient(180deg,#ffffff,#f8fafc)]">
        <div className="mx-auto w-full max-w-7xl px-5 py-12 sm:px-6 lg:px-8">
          <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_6px_18px_rgba(15,23,42,0.04)] sm:p-6">
            <div className="max-w-2xl">
              <div className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">FAQ</div>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">Common questions</h2>
            </div>
            <div className="mt-6 grid gap-4">
              {faq.map((item) => (
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
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-5 py-12 sm:px-6 lg:px-8">
        <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_6px_18px_rgba(15,23,42,0.04)] sm:p-6">
          <div className="max-w-2xl">
            <div className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">Related tools</div>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">More PDF utilities</h2>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {relatedTools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="group rounded-[24px] border border-slate-200 bg-[linear-gradient(180deg,#ffffff,#f8fafc)] p-5 shadow-[0_8px_22px_rgba(15,23,42,0.04)] transition hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(15,23,42,0.06)]"
              >
                <h3 className="text-base font-semibold text-slate-950 group-hover:text-blue-700">{tool.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{tool.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-[linear-gradient(180deg,#ffffff,#f8fafc)]">
        <div className="mx-auto w-full max-w-7xl px-5 py-12 sm:px-6 lg:px-8">
          <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_6px_18px_rgba(15,23,42,0.04)] sm:p-6">
            <div className="max-w-2xl">
              <div className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">Security & Privacy</div>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">Your files stay private</h2>
              <p className="mt-4 text-sm leading-6 text-slate-600">{securityText}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
