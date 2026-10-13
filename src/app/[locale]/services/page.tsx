import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/layout/page-header";
import { ServiceFinder } from "@/components/service-finder/service-finder";
import { FinalCtaSection } from "@/components/sections/final-cta-section";
import { ServiceGridSection } from "@/components/sections/service-grid-section";
import { InlineLink } from "@/components/ui/link";
import { finderIntents } from "@/content/site/service-finder";
import { publishedLinksForIntent } from "@/lib/service-finder/match";
import {
  serviceFamilies,
  servicesInFamily,
} from "@/content/site/information-architecture";
import { scaffoldCopy } from "@/content/site/scaffold-copy";
import { serviceWorkFor } from "@/content/site/service-descriptions";
import { serviceStills } from "@/content/site/work-stills";
import { replaceLocaleInPath } from "@/i18n/href";
import { metadataForLocale } from "@/i18n/metadata";
import { routing } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  return metadataForLocale(params, "/services", scaffoldCopy.servicesTitle, scaffoldCopy.servicesMessage);
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  return ServicesContent({ params });
}

async function ServicesContent({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  return (
    <>
      <PageHeader title={scaffoldCopy.servicesTitle} lede={scaffoldCopy.servicesMessage} />
      <ServiceFinder
        locale={locale}
        choices={finderIntents.map((intent) => ({
          intentId: intent.id,
          links: publishedLinksForIntent(intent.id),
        }))}
      />
      <ServiceGridSection
        id="service-groups"
        title="Service groups"
        intro="Open a group, then open a service, to read what the work includes and what it does not."
        items={serviceFamilies.map((family) => ({
          href: replaceLocaleInPath(family.path, locale),
          title: family.label,
          detail: family.restriction,
          image: serviceStills[family.id],
          children: (
            <ul className="mt-4 flex flex-col gap-2 border-t border-line pt-4">
              {servicesInFamily(family.id).map((service) => (
                <li key={service.id}>
                  <InlineLink
                    href={replaceLocaleInPath(service.path, locale)}
                    className="block min-h-11 max-w-full py-2"
                  >
                    {service.label}
                  </InlineLink>
                  <p className="text-body text-muted">{serviceWorkFor(service.id).summary}</p>
                </li>
              ))}
            </ul>
          ),
        }))}
      />
      <FinalCtaSection
        id="services-next"
        title="How it works"
        text="The next page explains how a matter proceeds."
        action={{
          href: replaceLocaleInPath(scaffoldCopy.primaryCta.path, locale),
          label: scaffoldCopy.primaryCta.label,
        }}
      />
    </>
  );
}
