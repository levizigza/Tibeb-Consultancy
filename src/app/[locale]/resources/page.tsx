import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/layout/page-header";
import { GuideIndex } from "@/components/resources/guide-index";
import { FramedStill } from "@/components/sections/material-frame";
import { FaqSection } from "@/components/sections/faq-section";
import { guidePresentations } from "@/content/resources/publication";
import { FinalCtaSection } from "@/components/sections/final-cta-section";
import { TextLink } from "@/components/ui/text-link";
import { getPublicFaqs } from "@/content/retrieve";
import { staticPages } from "@/content/site/information-architecture";
import { previewQuestions } from "@/content/site/preview-questions";
import { scaffoldCopy } from "@/content/site/scaffold-copy";
import { pageStills } from "@/content/site/work-stills";
import { replaceLocaleInPath } from "@/i18n/href";
import { metadataForLocale } from "@/i18n/metadata";
import { routing } from "@/i18n/routing";

const page = staticPages.find((item) => item.id === "resources");

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  return metadataForLocale(params, page?.path ?? "/resources", page?.label ?? "Resources", page?.message);
}

export default async function ResourcesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  return ResourcesContent({ params });
}

async function ResourcesContent({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale) || !page) notFound();
  const approved = getPublicFaqs(locale);
  const items =
    approved.length > 0
      ? approved.map((item) => ({ id: item.id, question: item.question, answer: item.answer }))
      : previewQuestions.map((item) => ({
          id: item.id,
          question: item.question,
          answer: item.answer,
          links: item.links.map((link) => ({
            href: replaceLocaleInPath(link.path, locale),
            label: link.label,
          })),
        }));

  return (
    <>
      <PageHeader title={page.label} lede={page.message} />
      <FramedStill still={pageStills.reading} />
      <GuideIndex locale={locale} guides={guidePresentations(locale)} />
      <FaqSection
        id="resources-questions"
        title="Questions"
        items={items}
        empty="Questions, articles, and links stay off this page until they are approved."
      />
      <p className="mx-auto w-full max-w-page px-gutter pb-xl sm:px-gutter-lg">
        <TextLink href="/development" locale={locale}>
          Development documentation
        </TextLink>
      </p>
      <FinalCtaSection
        id="resources-next"
        title="How the map is meant to be read"
        text="The next page explains the stages. It does not open a file."
        action={{
          href: replaceLocaleInPath(scaffoldCopy.primaryCta.path, locale),
          label: scaffoldCopy.primaryCta.label,
        }}
      />
    </>
  );
}
