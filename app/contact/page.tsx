import type { Metadata } from "next";
import { SiteShell } from "@/components/site-shell";
import { InfoCard } from "@/components/ui/info-card";
import { PageIntro } from "@/components/ui/page-intro";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Precision PDF for support, billing, and privacy questions.",
};

export default function ContactPage() {
  return (
    <SiteShell>
      <section className="mx-auto w-full max-w-4xl px-5 py-14 sm:px-6 lg:px-8">
        <PageIntro
          eyebrow="Contact"
          title="Contact Precision PDF"
          description="Use this page for support, billing, privacy, and partnership questions. We try to keep replies short and practical."
          className="max-w-3xl"
        />

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <InfoCard title="Email">
            <a className="font-semibold text-blue-700" href="mailto:hello@precisionpdf.pages">
              hello@precisionpdf.pages
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
