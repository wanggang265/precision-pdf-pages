import { JsonLdScript } from "@/components/json-ld";
import { SiteShell } from "@/components/site-shell";
import { InfoCard } from "@/components/ui/info-card";
import { PageIntro } from "@/components/ui/page-intro";
import { buildMetadata, buildWebPageSchema, SITE_URL } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Terms of Service — Usage Rules & Disclaimer",
  description:
    "Read the Remove PDF Pages terms of service. Learn the usage rules, disclaimers, and prohibited behavior for our online PDF page removal tool.",
  canonical: "/terms/",
  keywords: ["terms of service", "remove pdf pages terms", "usage rules"],
});

const termsSchema = buildWebPageSchema({
  name: "Terms of Service",
  description:
    "Read the Remove PDF Pages terms of service. Learn the usage rules, disclaimers, and prohibited behavior for our online PDF page removal tool.",
  url: `${SITE_URL}/terms/`,
});

export default function TermsPage() {
  return (
    <SiteShell>
      <JsonLdScript data={termsSchema} />
      <section className="mx-auto w-full max-w-4xl px-5 py-14 sm:px-6 lg:px-8">
        <PageIntro
          eyebrow="Terms"
          title="Terms of Service"
          description="Use Remove PDF Pages only for lawful purposes and only with files you are allowed to process."
          className="max-w-3xl"
        />
        <div className="mt-8 space-y-4">
          <InfoCard title="Use rules">
            Use Remove PDF Pages only for lawful purposes and only with files you are allowed to process.
          </InfoCard>
          <InfoCard title="Disclaimer">
            The service is provided as-is. Processing success may depend on file quality, size, and compatibility.
          </InfoCard>
          <InfoCard title="Prohibited behavior">
            Do not abuse the service, attempt unauthorized access, or upload content that violates applicable law.
          </InfoCard>
        </div>
      </section>
    </SiteShell>
  );
}
