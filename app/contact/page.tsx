import { JsonLdScript } from "@/components/json-ld";
import { SiteShell } from "@/components/site-shell";
import { InfoCard } from "@/components/ui/info-card";
import { PageIntro } from "@/components/ui/page-intro";
import { buildMetadata, buildWebPageSchema, SITE_URL } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Contact Remove PDF Pages — Support & Billing",
  description:
    "Contact Remove PDF Pages for product support, billing and refund questions, privacy concerns, and partnership or integration opportunities today.",
  canonical: "/contact/",
  keywords: ["contact remove pdf pages", "pdf tools support", "billing support"],
});

const contactSchema = buildWebPageSchema({
  name: "Contact Remove PDF Pages",
  description:
    "Contact Remove PDF Pages for product support, billing and refund questions, privacy concerns, and partnership or integration opportunities today.",
  url: `${SITE_URL}/contact/`,
});

export default function ContactPage() {
  return (
    <SiteShell>
      <JsonLdScript data={contactSchema} />
      <section className="mx-auto w-full max-w-4xl px-5 py-14 sm:px-6 lg:px-8">
        <PageIntro
          eyebrow="Contact"
          title="Contact Remove PDF Pages"
          description="Use this page for support, billing, privacy, and partnership questions. We try to keep replies short and practical."
          className="max-w-3xl"
        />

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <InfoCard title="Email">
            <a className="font-semibold text-blue-700" href="mailto:support@removepdfpages.net">
              support@removepdfpages.net
            </a>
          </InfoCard>

          <InfoCard title="Typical topics">
            <ul className="space-y-2">
              <li>• Product support</li>
              <li>• Billing and refunds</li>
              <li>• Privacy questions</li>
              <li>• Partnership or integration requests</li>
            </ul>
          </InfoCard>
        </div>
      </section>
    </SiteShell>
  );
}
