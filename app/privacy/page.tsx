import type { Metadata } from "next";
import { SiteShell } from "@/components/site-shell";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy information for Precision PDF.",
};

export default function PrivacyPage() {
  return (
    <SiteShell>
      <section className="mx-auto w-full max-w-4xl px-5 py-14 sm:px-6 lg:px-8">
        <div className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">Privacy</div>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">Privacy Policy</h1>
        <div className="mt-8 space-y-8 text-sm leading-7 text-slate-600">
          <p>
            Precision PDF is designed to keep the workflow lightweight and practical. We only aim to use the
            minimum information needed to provide the service.
          </p>
          <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_4px_12px_rgba(15,23,42,0.03)] sm:p-6">
            <h2 className="text-base font-semibold text-slate-950">What we collect</h2>
            <p className="mt-2">We may collect basic usage data, file metadata required to process the request, and error logs.</p>
          </div>
          <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_4px_12px_rgba(15,23,42,0.03)] sm:p-6">
            <h2 className="text-base font-semibold text-slate-950">How we use it</h2>
            <p className="mt-2">
              To provide PDF page removal, improve reliability, and keep the product secure and functional.
            </p>
          </div>
          <div id="cookie" className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_4px_12px_rgba(15,23,42,0.03)] sm:p-6">
            <h2 className="text-base font-semibold text-slate-950">Cookie</h2>
            <p className="mt-2">
              Cookie consent may be shown for compliance or analytics preferences. Analytics are off by default.
            </p>
          </div>
          <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_4px_12px_rgba(15,23,42,0.03)] sm:p-6">
            <h2 className="text-base font-semibold text-slate-950">Contact</h2>
            <p className="mt-2">
              For privacy questions, contact <a className="font-semibold text-blue-700" href="mailto:hello@precisionpdf.pages">hello@precisionpdf.pages</a>.
            </p>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
