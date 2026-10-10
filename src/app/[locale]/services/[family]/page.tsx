import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/layout/page-header";
import { MaterialFrame } from "@/components/sections/material-frame";
import { FinalCtaSection } from "@/components/sections/final-cta-section";
import { QuietEditorialSection } from "@/components/sections/quiet-editorial-section";
import { InlineLink } from "@/components/ui/link";
import { complianceRecords } from "@/content/compliance/records";
import { isPaidServiceBookable } from "@/content/compliance/safeguards";
import {
  getServiceFamily,
  serviceFamilies,
  servicesInFamily,
} from "@/content/site/information-architecture";
import { scaffoldCopy } from "@/content/site/scaffold-copy";
import { serviceStills } from "@/content/site/work-stills";
import { replaceLocaleInPath } from "@/i18n/href";
import { metadataForLocale } from "@/i18n/metadata";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return serviceFamilies.map((family) => ({ family: family.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; family: string }>;
}): Promise<Metadata> {
  const { locale, family } = await params;
  const match = getServiceFamily(family);
  if (!match) {
    return metadataForLocale(Promise.resolve({ locale }), "/services", "Not found", "This page is not available.");
  }
  return metadataForLocale(Promise.resolve({ locale }), match.path);
}

export default async function ServiceFamilyPage({
  params,
}: {
  params: Promise<{ locale: string; family: string }>;
}) {
  return ServiceFamilyContent({ params });
}

async function ServiceFamilyContent({
  params,
}: {
  params: Promise<{ locale: string; family: string }>;
}) {
  const { locale, family } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  const match = getServiceFamily(family);
  if (!match) notFound();

  const bookableIds = new Set(
    complianceRecords.filter((record) => isPaidServiceBookable(record)).map((record) => record.id),
  );

  return (
    <>
      <PageHeader title={match.label} lede={scaffoldCopy.familyMessage} />
      <div className="mx-auto w-full max-w-page px-gutter pb-xl sm:px-gutter-lg">
        <div className="w-full max-w-content">
          <MaterialFrame
            src={serviceStills[match.id].src}
            alt={serviceStills[match.id].alt}
            caption={serviceStills[match.id].caption}
            width={serviceStills[match.id].width}
            height={serviceStills[match.id].height}
            sizes="(min-width: 48rem) 48rem, 100vw"
            aspect="aspect-[16/10]"
          />
        </div>
      </div>
      <QuietEditorialSection id="family-status" title="Publication status">
        <p>{match.restriction}</p>
        <ul className="flex flex-col gap-3 border-t border-line pt-4">
          {servicesInFamily(match.id).map((service) => (
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
      </QuietEditorialSection>
      <FinalCtaSection
        id="family-next"
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
