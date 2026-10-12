import { complianceRecords } from "@/content/compliance/records";
import { officialSources } from "@/content/compliance/sources";
import { isPaidServiceBookable } from "@/content/compliance/safeguards";
import { servicePageRecords } from "@/content/services/page-records";
import { selectPublicServicePage, type PublicServicePage } from "@/content/services/page-publication";
import { scaffoldCopy } from "@/content/site/scaffold-copy";
import {
  getServicePage,
  servicesInFamily,
  type ServicePage,
} from "@/content/site/information-architecture";
import { replaceLocaleInPath } from "@/i18n/href";
import type { LocaleCode } from "@/i18n/locales";

type SourceLink = { title: string; publisher: string; url: string };
type RelatedLink = { href: string; title: string; status: string };

type ClosedServicePage = {
  mode: "closed";
  title: string;
  lede: string;
  metaDescription: string;
  statusTitle: string;
  statusBody: string;
  sourcesIntro: string;
  sources: SourceLink[];
  relatedTitle: string;
  related: RelatedLink[];
  howItWorksHref: string;
  howItWorksLabel: string;
  ctaTitle: string;
  ctaText: string;
  cta: { href: string; label: string };
};

type PublishedServicePage = {
  mode: "published";
  title: string;
  lede: string;
  metaDescription: string;
  page: PublicServicePage;
  relatedTitle: string;
  related: RelatedLink[];
  ctaTitle: string;
  ctaText: string;
  cta: { href: string; label: string };
};

export type ServicePageModel = ClosedServicePage | PublishedServicePage;

const sourcesIntro =
  "These are official pages for your own reading. This firm is not those offices, and this page does not explain eligibility or processing times.";

function sourceLinks(sourceIds: readonly string[]): SourceLink[] {
  return sourceIds.flatMap((sourceId) => {
    const source = officialSources.find((item) => item.id === sourceId);
    return source ? [{ title: source.title, publisher: source.publisher, url: source.url }] : [];
  });
}

function relatedLinks(page: ServicePage, locale: LocaleCode, approvedOnly: boolean): RelatedLink[] {
  return servicesInFamily(page.familyId).flatMap((item) => {
    if (item.id === page.id) return [];
    const compliance = complianceRecords.find((record) => record.id === item.id);
    const approved = compliance ? isPaidServiceBookable(compliance) : false;
    if (approvedOnly && !approved) return [];
    return [
      {
        href: replaceLocaleInPath(item.path, locale),
        title: item.label,
        status: approved ? "Open to discuss" : "",
      },
    ];
  });
}

export function buildServicePageModel(
  familyId: string,
  serviceId: string,
  locale: LocaleCode,
): ServicePageModel | null {
  const page = getServicePage(familyId, serviceId);
  if (!page) return null;
  const record = servicePageRecords.find((item) => item.id === page.id);
  const compliance = complianceRecords.find((item) => item.id === page.id);
  if (!record || !compliance) return null;

  const published = selectPublicServicePage(record, compliance);
  if (published) {
    return {
      mode: "published",
      title: published.title,
      lede: published.description,
      metaDescription: published.description,
      page: published,
      relatedTitle: "Related services",
      related: relatedLinks(page, locale, true),
      ctaTitle: "Next step",
      ctaText: scaffoldCopy.gateOpenBody,
      cta: {
        href: replaceLocaleInPath(scaffoldCopy.primaryCta.path, locale),
        label: scaffoldCopy.primaryCta.label,
      },
    };
  }

  return {
    mode: "closed",
    title: page.label,
    lede: "Read the boundary below before you write. A message does not start the work.",
    metaDescription: `${page.label}. TIBEB Consultancy will tell you whether this work can be taken on. A message does not start the work.`,
    statusTitle: scaffoldCopy.closedHeading,
    statusBody: scaffoldCopy.closedBody,
    sourcesIntro,
    sources: sourceLinks(compliance.sourceIds),
    relatedTitle: "Other pages in this group",
    related: relatedLinks(page, locale, false),
    howItWorksHref: replaceLocaleInPath(scaffoldCopy.primaryCta.path, locale),
    howItWorksLabel: scaffoldCopy.primaryCta.label,
    ctaTitle: "Back to this group",
    ctaText: "You can also return to the rest of this group.",
    cta: {
      href: replaceLocaleInPath(`/services/${page.familyId}`, locale),
      label: "Back to this group",
    },
  };
}
