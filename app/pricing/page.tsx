import { JsonLdScript } from "@/components/json-ld";
import { SiteShell } from "@/components/site-shell";
import { PricingSection } from "@/components/pricing-section";
import { buildMetadata, buildWebPageSchema, SITE_URL } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "PDF Tools Pricing \u2014 Pay-As-You-Go Credits",
  description:
    "Simple pay-as-you-go pricing for Remove PDF Pages. Buy credits once and use them anytime for larger PDF jobs. No subscriptions, no monthly fees.",
  canonical: "/pricing/",
  keywords: ["pdf tools pricing", "pdf credits", "pay as you go pdf", "remove pdf pages pricing"],
});

const pricingSchema = buildWebPageSchema({
  name: "PDF Tools Pricing",
  description:
    "Simple pay-as-you-go pricing for Remove PDF Pages. Buy credits once and use them anytime for larger PDF jobs. No subscriptions, no monthly fees.",
  url: `${SITE_URL}/pricing/`,
});

const PAYMENTS_ENABLED = process.env.NEXT_PUBLIC_PAYMENTS_ENABLED === "true";

export default function PricingPage() {
  return (
    <SiteShell>
      <JsonLdScript data={pricingSchema} />
      <section className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Simple, pay-as-you-go pricing
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            Buy credits once. Use them whenever you need. No subscriptions, no monthly fees.
          </p>
        </div>
        {!PAYMENTS_ENABLED ? (
          <div className="mx-auto mt-6 max-w-2xl rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            Payments are paused for now while Creem verification is pending. You can still review the plans below.
          </div>
        ) : null}
        <PricingSection />
      </section>
    </SiteShell>
  );
}
