import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { ServicePageView } from "@/components/services/service-page-view";
import { buildServicePageModel } from "@/content/services/page-model";
import { getServicePage, servicePages } from "@/content/site/information-architecture";
import { metadataForLocale } from "@/i18n/metadata";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return servicePages.map((page) => ({
    family: page.familyId,
    service: page.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; family: string; service: string }>;
}): Promise<Metadata> {
  const { locale, family, service } = await params;
  const match = getServicePage(family, service);
  if (!match) {
    return metadataForLocale(Promise.resolve({ locale }), "/services", "Not found", "This page is not available.");
  }
  return metadataForLocale(Promise.resolve({ locale }), match.path);
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ locale: string; family: string; service: string }>;
}) {
  return ServiceDetailContent({ params });
}

async function ServiceDetailContent({
  params,
}: {
  params: Promise<{ locale: string; family: string; service: string }>;
}) {
  const { locale, family, service } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  const match = getServicePage(family, service);
  if (!match) notFound();
  const model = buildServicePageModel(match.familyId, match.id, locale);
  if (!model) notFound();

  return <ServicePageView model={model} locale={locale} />;
}
