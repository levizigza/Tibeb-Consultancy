import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/layout/page-header";
import { FinalCtaSection } from "@/components/sections/final-cta-section";
import { QuietEditorialSection } from "@/components/sections/quiet-editorial-section";
import { FramedStill } from "@/components/sections/material-frame";
import { businessProfile } from "@/content/business/profile";
import { staticPages } from "@/content/site/information-architecture";
import { scaffoldCopy } from "@/content/site/scaffold-copy";
import { pageStills } from "@/content/site/work-stills";
import { replaceLocaleInPath } from "@/i18n/href";
import { metadataForLocale } from "@/i18n/metadata";
import { routing } from "@/i18n/routing";

const page = staticPages.find((item) => item.id === "about");

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  return metadataForLocale(params, page?.path ?? "/about", page?.label ?? "About", page?.message);
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  return AboutContent({ params });
}

async function AboutContent({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale) || !page) notFound();

  return (
    <>
      <PageHeader title={page.label} lede={page.message} />
      <FramedStill still={pageStills.institution} />
      <QuietEditorialSection id="the-firm" title="The firm">
        <p>{businessProfile.positioning.text}</p>
        <p>TIBEB Consultancy is an independent firm. It is not part of the Canadian government.</p>
      </QuietEditorialSection>
      <FinalCtaSection
        id="about-next"
        title="Services"
        text="Open the area closest to your question. We will tell you whether we can help."
        action={{
          href: replaceLocaleInPath(scaffoldCopy.servicesLink.path, locale),
          label: scaffoldCopy.servicesLink.label,
        }}
      />
    </>
  );
}
