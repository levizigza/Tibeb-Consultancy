import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/layout/page-header";
import { FinalCtaSection } from "@/components/sections/final-cta-section";
import { ProcessSection } from "@/components/sections/process-section";
import { QuietEditorialSection } from "@/components/sections/quiet-editorial-section";
import { TextLink } from "@/components/ui/text-link";
import { clientProcess } from "@/content/site/client-process";
import { scaffoldCopy } from "@/content/site/scaffold-copy";
import { staticPages } from "@/content/site/information-architecture";
import { replaceLocaleInPath } from "@/i18n/href";
import { metadataForLocale } from "@/i18n/metadata";
import { routing } from "@/i18n/routing";

const page = staticPages.find((item) => item.id === "how-it-works");

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  return metadataForLocale(
    params,
    page?.path ?? "/how-it-works",
    page?.label ?? "How it works",
    page?.message,
  );
}

export default async function HowItWorksPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  return HowItWorksContent({ params });
}

async function HowItWorksContent({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale) || !page) notFound();

  return (
    <>
      <PageHeader title={page.label} lede={clientProcess.lede} />
      <QuietEditorialSection id="how-status" title="Publication status">
        <p>{clientProcess.differs}</p>
        <p>{clientProcess.noOutcome}</p>
      </QuietEditorialSection>
      <ProcessSection
        id="client-process"
        title="Client process"
        steps={clientProcess.steps}
        locale={locale}
      />
      <ProcessSection
        id="reading-the-map"
        title={clientProcess.mapTitle}
        intro={clientProcess.mapIntro}
        steps={scaffoldCopy.howItWorksSteps}
      />
      <QuietEditorialSection id="how-related" title={clientProcess.relatedTitle}>
        <p>{clientProcess.relatedBody}</p>
        <p>
          <TextLink href="/pricing" locale={locale}>
            Pricing
          </TextLink>
        </p>
        <p>
          <TextLink href="/resources" locale={locale}>
            Questions
          </TextLink>
        </p>
      </QuietEditorialSection>
      <FinalCtaSection
        id="how-next"
        title="Open the service map"
        text="The map lists names. It does not start a file."
        action={{
          href: replaceLocaleInPath(scaffoldCopy.servicesLink.path, locale),
          label: scaffoldCopy.servicesLink.label,
        }}
      />
    </>
  );
}
