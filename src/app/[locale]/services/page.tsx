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
import { complianceRecords } from "@/content/compliance/records";
import { isPaidServiceBookable } from "@/content/compliance/safeguards";
import {
  serviceFamilies,
  servicesInFamily,
} from "@/content/site/information-architecture";
import { scaffoldCopy } from "@/content/site/scaffold-copy";
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

  const bookableIds = new Set(
    complianceRecords.filter((record) => isPaidServiceBookable(record)).map((record) => record.id),
  );

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
        title="Groups"
        intro="Open a group to see the names inside it. Each name is closed."
        items={serviceFamilies.map((family) => ({
          href: replaceLocaleInPath(family.path, locale),
          title: family.label,
          detail: family.restriction,
          status: "Not approved",
          image: serviceStills[family.id],
          children: (
            <ul className="mt-4 flex flex-col gap-2 border-t border-line pt-4">
              {servicesInFamily(family.id).map((service) => (
                <li key={service.id} className="flex flex-col gap-1 sm:flex-row sm:flex-wrap sm:items-baseline sm:justify-between">
                  <InlineLink
                    href={replaceLocaleInPath(service.path, locale)}
                    className="block min-h-11 max-w-full py-2"
                  >
                    {service.label}
                  </InlineLink>
                  <span className="max-w-full text-meta text-muted">
                    {bookableIds.has(service.id) ? "Gate open, no request flow" : "Not approved"}
                  </span>
                </li>
              ))}
            </ul>
          ),
        }))}
      />
      <FinalCtaSection
        id="services-next"
        title="How the map is meant to be read"
        text="The next page explains the steps. It does not open a file."
        action={{
          href: replaceLocaleInPath(scaffoldCopy.primaryCta.path, locale),
          label: scaffoldCopy.primaryCta.label,
        }}
      />
    </>
  );
}
