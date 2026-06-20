import type { Metadata } from "next";
import { SiteShell } from "@/components/site-shell";
import { InfoCard } from "@/components/ui/info-card";
import { PageIntro } from "@/components/ui/page-intro";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of service for Precision PDF.",
};

export default function TermsPage() {
  return (
    <SiteShell>
      <section className="mx-auto w-full max-w-4xl px-5 py-14 sm:px-6 lg:px-8">
        <PageIntro
          eyebrow="Terms"
          title="Terms of Service"
          description="Use Precision PDF only for lawful purposes and only with files you are allowed to process."
          className="max-w-3xl"
        />
        <div className="mt-8 space-y-4">
          <InfoCard title="Use rules">
            Use Precision PDF only for lawful purposes and only with files you are allowed to process.
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
