import type { Metadata } from "next";
import { SiteShell } from "@/components/site-shell";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of service for Precision PDF.",
};

export default function TermsPage() {
  return (
    <SiteShell>
      <section className="mx-auto w-full max-w-4xl px-5 py-14 sm:px-6 lg:px-8">
        <div className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">Terms</div>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">Terms of Service</h1>
        <div className="mt-8 space-y-8 text-sm leading-7 text-slate-600">
          <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_4px_12px_rgba(15,23,42,0.03)] sm:p-6">
            <h2 className="text-base font-semibold text-slate-950">Use rules</h2>
            <p className="mt-2">
              Use Precision PDF only for lawful purposes and only with files you are allowed to process.
            </p>
          </div>
          <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_4px_12px_rgba(15,23,42,0.03)] sm:p-6">
            <h2 className="text-base font-semibold text-slate-950">Disclaimer</h2>
            <p className="mt-2">
              The service is provided as-is. Processing success may depend on file quality, size, and compatibility.
            </p>
          </div>
          <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_4px_12px_rgba(15,23,42,0.03)] sm:p-6">
            <h2 className="text-base font-semibold text-slate-950">Prohibited behavior</h2>
            <p className="mt-2">
              Do not abuse the service, attempt unauthorized access, or upload content that violates applicable law.
            </p>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
