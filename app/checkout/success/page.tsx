import { JsonLdScript } from "@/components/json-ld";
import { SiteShell } from "@/components/site-shell";
import { buildMetadata, buildWebPageSchema, SITE_URL } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Checkout Complete",
  description: "Your checkout was completed and your credits are ready in your account.",
  canonical: "/checkout/success/",
  keywords: ["checkout complete", "pdf tools credits"],
  noindex: true,
});

const checkoutSuccessSchema = buildWebPageSchema({
  name: "Checkout Complete",
  description: "Your checkout was completed and your credits are ready in your account.",
  url: `${SITE_URL}/checkout/success/`,
});

export default function CheckoutSuccessPage() {
  return (
    <SiteShell>
      <JsonLdScript data={checkoutSuccessSchema} />
      <section className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center px-5 py-24 sm:px-6 lg:px-8">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>
        <h1 className="text-center text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Checkout complete
        </h1>
        <p className="mt-4 max-w-md text-center text-lg text-slate-600">
          Your credits are now available in your account. You can continue processing larger PDFs.
        </p>
        <div className="mt-8 flex gap-4">
          <a
            href="/workspace"
            className="inline-flex items-center rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
          >
            Go to Workspace
          </a>
          <a
            href="/pricing"
            className="inline-flex items-center rounded-lg border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
          >
            View Pricing
          </a>
        </div>
      </section>
    </SiteShell>
  );
}
