import { credentials, credentialSchema } from "@/content/business/credentials";
import { serviceBlockedByCompliance } from "@/content/compliance/safeguards";
import { hasText, isEstablishedPublicClaim } from "@/content/model/claim";
import {
  serviceCategories,
  serviceCategorySchema,
  type ServiceCategoryId,
} from "@/content/services/categories";
import { prices, priceSchema } from "@/content/services/pricing";
import { services } from "@/content/services/services";
import {
  localeServiceContentSchema,
  serviceRecordSchema,
  type LocaleServiceContent,
  type ServiceRecord,
} from "@/content/services/schema";
import { localeCodes, type LocaleCode } from "@/i18n/locales";

export type PublicOffering = {
  id: string;
  categoryId: ServiceCategoryId;
  name: string;
  summary: string;
};

export type PublicService = {
  id: string;
  categoryId: ServiceCategoryId;
  title: string;
  description: string;
  audience: string;
  scopeOfWork: string;
  restrictions: string;
  exclusions: string;
  price: { id: string; amountCad: number; inclusions: string[] } | null;
};

type RelatedRecords = {
  credentials?: readonly unknown[];
  prices?: readonly unknown[];
};

function localeContentIsPublic(content: LocaleServiceContent | undefined): content is LocaleServiceContent {
  const parsed = localeServiceContentSchema.safeParse(content);
  if (!parsed.success) return false;
  const record = parsed.data;
  return (
    record.verification === "verified" &&
    record.publicationStatus === "approved" &&
    [
      record.title,
      record.description,
      record.audience,
      record.scopeOfWork,
      record.restrictions,
      record.exclusions,
    ].every(hasText)
  );
}

function credentialIsPublic(record: unknown): boolean {
  const parsed = credentialSchema.safeParse(record);
  if (!parsed.success) return false;
  return isEstablishedPublicClaim({
    ...parsed.data,
    valuePresent: hasText(parsed.data.title) && hasText(parsed.data.issuer),
  });
}

function citedCredentialsArePublic(
  credentialIds: readonly string[],
  catalog: readonly unknown[],
): boolean {
  return credentialIds.every((id) =>
    catalog.some((record) => {
      if (!credentialIsPublic(record)) return false;
      const parsed = credentialSchema.safeParse(record);
      return parsed.success && parsed.data.id === id;
    }),
  );
}

function citedPriceIsPublic(
  service: ServiceRecord,
  catalog: readonly unknown[],
): PublicService["price"] | null | false {
  if (service.pricingId === null) return null;
  const match = catalog.find((record) => {
    const parsed = priceSchema.safeParse(record);
    return parsed.success && parsed.data.id === service.pricingId && parsed.data.serviceId === service.id;
  });
  const parsed = priceSchema.safeParse(match);
  if (!parsed.success) return false;
  const price = parsed.data;
  const inclusions = price.inclusions.filter(hasText);
  const amountCad = price.amountCad;
  const valuePresent =
    amountCad !== null && inclusions.length === price.inclusions.length && inclusions.length > 0;
  if (
    amountCad === null ||
    !isEstablishedPublicClaim({
      ...price,
      valuePresent,
    })
  ) {
    return false;
  }
  return {
    id: price.id,
    amountCad,
    inclusions,
  };
}

export function isPubliclyApprovedOffering(
  offering: unknown,
  locale: LocaleCode,
  related: RelatedRecords = {},
): boolean {
  return readPublicService(offering, locale, related) !== null;
}

function readPublicService(
  offering: unknown,
  locale: LocaleCode,
  related: RelatedRecords = {},
): PublicService | null {
  if (!localeCodes.includes(locale)) return null;
  const parsed = serviceRecordSchema.safeParse(offering);
  if (!parsed.success) return null;

  const record = parsed.data;
  if (serviceBlockedByCompliance(record.id)) return null;
  const category = serviceCategories.find((item) => item.id === record.categoryId);
  const categoryParsed = serviceCategorySchema.safeParse(category);
  if (!categoryParsed.success) return null;

  const localeContent = record.locales[locale];
  if (!localeContentIsPublic(localeContent)) return null;

  const needsReview = record.requiresRegulatoryReview || categoryParsed.data.regulated;
  if (
    !isEstablishedPublicClaim({
      ...record,
      requiresRegulatoryReview: needsReview,
      valuePresent: true,
    })
  ) {
    return null;
  }

  const credentialCatalog = related.credentials ?? credentials;
  if (!citedCredentialsArePublic(record.credentialIds, credentialCatalog)) return null;

  const price = citedPriceIsPublic(record, related.prices ?? prices);
  if (price === false) return null;

  return {
    id: record.id,
    categoryId: record.categoryId,
    title: localeContent.title,
    description: localeContent.description,
    audience: localeContent.audience,
    scopeOfWork: localeContent.scopeOfWork,
    restrictions: localeContent.restrictions,
    exclusions: localeContent.exclusions,
    price,
  };
}

export function getPublicServices(
  locale: LocaleCode,
  related: RelatedRecords = {},
): PublicService[] {
  return services.flatMap((service) => {
    const published = readPublicService(service, locale, related);
    return published ? [published] : [];
  });
}

export function getPublicOfferings(locale: LocaleCode): PublicOffering[] {
  return getPublicServices(locale).map((service) => ({
    id: service.id,
    categoryId: service.categoryId,
    name: service.title,
    summary: service.description,
  }));
}
