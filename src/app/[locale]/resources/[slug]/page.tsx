import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { GuideArticle } from "@/components/resources/guide-article";
import { guidePresentation } from "@/content/resources/publication";
import { resourceGuides } from "@/content/resources/guides";
import { localePageMetadata } from "@/i18n/metadata";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return resourceGuides.map((guide) => ({ slug: guide.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const guide = guidePresentation(slug, locale);
  if (!guide) return {};
  return localePageMetadata({
    locale,
    path: guide.path,
    title: guide.title,
    description: guide.summary,
  });
}

export default async function ResourceGuidePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  return ResourceGuideContent({ params });
}

async function ResourceGuideContent({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  const guide = guidePresentation(slug, locale);
  if (!guide) notFound();

  return <GuideArticle guide={guide} locale={locale} />;
}
