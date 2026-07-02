import { JsonLdScript } from "@/components/json-ld";
import { SiteShell } from "@/components/site-shell";
import { buildMetadata, buildWebPageSchema, SITE_URL } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Checkout Cancelled",
  description: "Your checkout was cancelled. No charges were made.",
  canonical: "/checkout/cancel/",
  keywords: ["checkout cancelled", "pdf tools checkout"],
});

const checkoutCancelSchema = buildWebPageSchema({
  name: "Checkout Cancelled",
  description: "Your checkout was cancelled. No charges were made.",
  url: `${SITE_URL}/checkout/cancel/`,
});

export default function CheckoutCancelPage() {
  return (
    <SiteShell>
      <JsonLdScript data={checkoutCancelSchema} />
      <section className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center px-5 py-24 sm:px-6 lg:px-8">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-slate-100">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </div>
        <h1 className="text-center text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Checkout cancelled
        </h1>
        <p className="mt-4 max-w-md text-center text-lg text-slate-600">
          No worries — nothing was charged. You can try again whenever you are ready.
        </p>
        <div className="mt-8 flex gap-4">
          <a
            href="/pricing"
            className="inline-flex items-center rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
          >
            Back to Pricing
          </a>
          <a
            href="/workspace"
            className="inline-flex items-center rounded-lg border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
          >
            Go to Workspace
          </a>
        </div>
      </section>
    </SiteShell>
  );
}
