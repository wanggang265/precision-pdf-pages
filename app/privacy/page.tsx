import { JsonLdScript } from "@/components/json-ld";
import { SiteShell } from "@/components/site-shell";
import { InfoCard } from "@/components/ui/info-card";
import { PageIntro } from "@/components/ui/page-intro";
import { buildMetadata, buildWebPageSchema, SITE_URL } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Privacy Policy \u2014 How We Handle Your Data",
  description:
    "Read the Remove PDF Pages privacy policy. Learn what data we collect, how we use it, and how we keep your PDF processing secure and private.",
  canonical: "/privacy/",
  keywords: ["privacy policy", "remove pdf pages privacy", "data handling"],
});

const privacySchema = buildWebPageSchema({
  name: "Privacy Policy",
  description:
    "Read the Remove PDF Pages privacy policy. Learn what data we collect, how we use it, and how we keep your PDF processing secure and private.",
  url: `${SITE_URL}/privacy/`,
});

export default function PrivacyPage() {
  return (
    <SiteShell>
      <JsonLdScript data={privacySchema} />
      <section className="mx-auto w-full max-w-4xl px-5 py-14 sm:px-6 lg:px-8">
        <PageIntro
          eyebrow="Privacy"
          title="Privacy Policy"
          description="Remove PDF Pages is designed to keep the workflow lightweight and practical. We only aim to use the minimum information needed to provide the service."
          className="max-w-3xl"
        />
        <div className="mt-8 space-y-4">
          <p className="text-sm leading-7 text-slate-600">
            We keep the experience focused on file handling, not on collecting extra personal data.
          </p>
          <InfoCard title="What we collect">
            We may collect basic usage data, file metadata required to process the request, and error logs.
          </InfoCard>
          <InfoCard title="How we use it">
            To provide PDF page removal, improve reliability, and keep the product secure and functional.
          </InfoCard>
          <InfoCard title="Cookie" className="scroll-mt-24" >
            Cookie consent may be shown for compliance or analytics preferences. Analytics are off by default.
          </InfoCard>
          <InfoCard title="Contact">
            For privacy questions, visit the <a className="font-semibold text-blue-700" href="/contact">Contact page</a>{' '}
            or email <a className="font-semibold text-blue-700" href="mailto:support@removepdfpages.net">support@removepdfpages.net</a>.
          </InfoCard>
        </div>
      </section>
    </SiteShell>
  );
}
