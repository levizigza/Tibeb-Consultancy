import { z } from "zod";
import { complianceRecordsParse } from "@/content/compliance/records";
import { reviewIssuesParse } from "@/content/compliance/issues";
import { officialSourcesParse } from "@/content/compliance/sources";
import {
  getBookableServices,
  getPublicInformationPages,
} from "@/content/compliance/safeguards";
import { consultationLanguages, consultationLanguageSchema } from "@/content/business/consultation-languages";
import { contactChannels, contactChannelSchema } from "@/content/business/contact";
import { credentials, credentialSchema } from "@/content/business/credentials";
import { disclosures, disclosureSchema } from "@/content/business/disclosures";
import { faqs, faqSchema, resources, resourceSchema } from "@/content/business/faqs";
import { businessHours, businessHoursSchema } from "@/content/business/hours";
import { identity, identityClaimSchema, positioningClaimSchema } from "@/content/business/identity";
import { people, personSchema } from "@/content/business/people";
import { privacyNotice, privacyNoticeSchema } from "@/content/business/privacy";
import { testimonials, testimonialSchema } from "@/content/business/testimonials";
import { hasText, isEstablishedPublicClaim, type ClaimMeta } from "@/content/model/claim";
import { serviceCategories, serviceCategorySchema } from "@/content/services/categories";
import { prices, priceSchema } from "@/content/services/pricing";
import {
  getPublicOfferings,
  getPublicServices,
  isPubliclyApprovedOffering,
} from "@/content/services/publication";
import { services } from "@/content/services/services";
import { serviceRecordSchema } from "@/content/services/schema";
import type { LocaleCode } from "@/i18n/locales";

type PublicClaim = ClaimMeta & { value: string };

function textClaimIsPublic(record: unknown, value: string | null): PublicClaim | null {
  const parsed = identityClaimSchema.safeParse(record);
  if (!parsed.success || !hasText(value)) return null;
  if (!isEstablishedPublicClaim({ ...parsed.data, valuePresent: true })) return null;
  return { ...parsed.data, value };
}

export function getPublicIdentityClaims(): PublicClaim[] {
  return Object.values(identity).flatMap((record) => {
    const published = textClaimIsPublic(record, record.value);
    return published ? [published] : [];
  });
}

export function getPublicPeople() {
  return people.flatMap((person) => {
    const parsed = personSchema.safeParse(person);
    if (!parsed.success || !hasText(parsed.data.name) || !hasText(parsed.data.role)) return [];
    if (!isEstablishedPublicClaim({ ...parsed.data, valuePresent: true })) return [];
    const cited = parsed.data.credentialIds.every((id) =>
      getPublicCredentials().some((credential) => credential.id === id),
    );
    if (!cited) return [];
    return [
      {
        id: parsed.data.id,
        name: parsed.data.name,
        role: parsed.data.role,
        bio: hasText(parsed.data.bio) ? parsed.data.bio : null,
      },
    ];
  });
}

export function getPublicContact() {
  return contactChannels.flatMap((channel) => {
    const parsed = contactChannelSchema.safeParse(channel);
    if (!parsed.success || !hasText(parsed.data.value)) return [];
    if (parsed.data.kind === "email" && !z.email().safeParse(parsed.data.value.trim()).success) {
      return [];
    }
    if (!isEstablishedPublicClaim({ ...parsed.data, valuePresent: true })) return [];
    return [{ id: parsed.data.id, kind: parsed.data.kind, value: parsed.data.value }];
  });
}

export function getPublicHours() {
  const parsed = businessHoursSchema.safeParse(businessHours);
  if (!parsed.success || !hasText(parsed.data.timeZone) || parsed.data.entries.length === 0) {
    return null;
  }
  const entries = parsed.data.entries.flatMap((entry) => {
    if (!hasText(entry.opens) || !hasText(entry.closes)) return [];
    return [{ day: entry.day, opens: entry.opens, closes: entry.closes }];
  });
  if (entries.length !== parsed.data.entries.length) return null;
  if (!isEstablishedPublicClaim({ ...parsed.data, valuePresent: true })) return null;
  return { id: parsed.data.id, timeZone: parsed.data.timeZone, entries };
}

export function getPublicCategories() {
  return serviceCategories.flatMap((category) => {
    const parsed = serviceCategorySchema.safeParse(category);
    if (!parsed.success || !hasText(parsed.data.label)) return [];
    const needsReview = parsed.data.regulated || parsed.data.requiresRegulatoryReview;
    if (
      !isEstablishedPublicClaim({
        ...parsed.data,
        requiresRegulatoryReview: needsReview,
        valuePresent: true,
      })
    ) {
      return [];
    }
    return [{ id: parsed.data.id, label: parsed.data.label }];
  });
}

export function getPublicPrices() {
  return prices.flatMap((price) => {
    const parsed = priceSchema.safeParse(price);
    if (!parsed.success || parsed.data.amountCad === null) return [];
    const inclusions = parsed.data.inclusions.filter(hasText);
    if (inclusions.length === 0 || inclusions.length !== parsed.data.inclusions.length) return [];
    if (!isEstablishedPublicClaim({ ...parsed.data, valuePresent: true })) return [];
    return [
      {
        id: parsed.data.id,
        serviceId: parsed.data.serviceId,
        amountCad: parsed.data.amountCad,
        inclusions,
      },
    ];
  });
}

export function getPublicCredentials() {
  return credentials.flatMap((credential) => {
    const parsed = credentialSchema.safeParse(credential);
    if (!parsed.success || !hasText(parsed.data.title) || !hasText(parsed.data.issuer)) return [];
    if (!isEstablishedPublicClaim({ ...parsed.data, valuePresent: true })) return [];
    return [
      {
        id: parsed.data.id,
        title: parsed.data.title,
        issuer: parsed.data.issuer,
        identifier: hasText(parsed.data.identifier) ? parsed.data.identifier : null,
        holderId: parsed.data.holderId,
      },
    ];
  });
}

export function getPublicConsultationLanguages() {
  return consultationLanguages.flatMap((language) => {
    const parsed = consultationLanguageSchema.safeParse(language);
    if (!parsed.success || !hasText(parsed.data.label)) return [];
    if (!isEstablishedPublicClaim({ ...parsed.data, valuePresent: true })) return [];
    return [{ id: parsed.data.id, label: parsed.data.label }];
  });
}

export function selectPublicTestimonials(records: readonly unknown[]) {
  return records.flatMap((testimonial) => {
    const parsed = testimonialSchema.safeParse(testimonial);
    if (!parsed.success || !parsed.data.consented) return [];
    if (!hasText(parsed.data.quote) || !hasText(parsed.data.attribution)) return [];
    if (!isEstablishedPublicClaim({ ...parsed.data, valuePresent: true })) return [];
    return [
      {
        id: parsed.data.id,
        quote: parsed.data.quote,
        attribution: parsed.data.attribution,
      },
    ];
  });
}

export function getPublicTestimonials() {
  return selectPublicTestimonials(testimonials);
}

export function getPublicFaqs(locale: LocaleCode) {
  return faqs.flatMap((faq) => {
    const parsed = faqSchema.safeParse(faq);
    if (!parsed.success || parsed.data.locale !== locale) return [];
    if (!hasText(parsed.data.question) || !hasText(parsed.data.answer)) return [];
    if (!isEstablishedPublicClaim({ ...parsed.data, valuePresent: true })) return [];
    return [{ id: parsed.data.id, question: parsed.data.question, answer: parsed.data.answer }];
  });
}

export function getPublicResources(locale: LocaleCode) {
  return resources.flatMap((resource) => {
    const parsed = resourceSchema.safeParse(resource);
    if (!parsed.success || parsed.data.locale !== locale) return [];
    if (!hasText(parsed.data.title) || !hasText(parsed.data.summary)) return [];
    if (!z.url().safeParse(parsed.data.href).success) return [];
    if (!isEstablishedPublicClaim({ ...parsed.data, valuePresent: true })) return [];
    return [
      {
        id: parsed.data.id,
        title: parsed.data.title,
        summary: parsed.data.summary,
        href: parsed.data.href,
      },
    ];
  });
}

export function getPublicDisclosures() {
  return disclosures.flatMap((disclosure) => {
    const parsed = disclosureSchema.safeParse(disclosure);
    if (!parsed.success || !hasText(parsed.data.statement)) return [];
    if (!isEstablishedPublicClaim({ ...parsed.data, valuePresent: true })) return [];
    return [{ id: parsed.data.id, topic: parsed.data.topic, statement: parsed.data.statement }];
  });
}

export function getPublicPrivacy() {
  const parsed = privacyNoticeSchema.safeParse(privacyNotice);
  if (!parsed.success) return null;
  const purposes = parsed.data.purposes.filter(hasText);
  const valuePresent =
    hasText(parsed.data.controllerName) &&
    hasText(parsed.data.privacyContact) &&
    hasText(parsed.data.consentStatement) &&
    purposes.length > 0 &&
    purposes.length === parsed.data.purposes.length;
  if (!isEstablishedPublicClaim({ ...parsed.data, valuePresent })) return null;
  return {
    id: parsed.data.id,
    controllerName: parsed.data.controllerName,
    privacyContact: parsed.data.privacyContact,
    purposes,
    consentStatement: parsed.data.consentStatement,
  };
}

export function getPublicContent(locale: LocaleCode) {
  return {
    identity: getPublicIdentityClaims(),
    people: getPublicPeople(),
    contact: getPublicContact(),
    hours: getPublicHours(),
    categories: getPublicCategories(),
    services: getPublicServices(locale),
    offerings: getPublicOfferings(locale),
    bookableServices: getBookableServices(),
    informationPages: getPublicInformationPages(),
    prices: getPublicPrices(),
    credentials: getPublicCredentials(),
    consultationLanguages: getPublicConsultationLanguages(),
    testimonials: getPublicTestimonials(),
    faqs: getPublicFaqs(locale),
    resources: getPublicResources(locale),
    disclosures: getPublicDisclosures(),
    privacy: getPublicPrivacy(),
  };
}

export function listOwnerInformationGaps(): string[] {
  const gaps = [
    ...Object.values(identity)
      .filter((record) => !getPublicIdentityClaims().some((claim) => claim.id === record.id))
      .map((record) => `identity.${record.id}`),
    ...contactChannels
      .filter((channel) => !getPublicContact().some((claim) => claim.id === channel.id))
      .map((channel) => `contact.${channel.id}`),
  ];

  if (getPublicHours() === null) gaps.push("hours.weekly-hours");
  if (people.length === 0) gaps.push("people.none-recorded");
  if (consultationLanguages.length === 0) gaps.push("consultation-languages.none-recorded");
  if (credentials.length === 0) gaps.push("credentials.none-recorded");
  if (prices.length === 0) gaps.push("pricing.none-recorded");
  if (testimonials.length === 0) gaps.push("testimonials.none-recorded");
  if (faqs.length === 0) gaps.push("faqs.none-recorded");
  if (resources.length === 0) gaps.push("resources.none-recorded");
  if (getPublicPrivacy() === null) gaps.push("privacy.privacy-notice");

  for (const disclosure of disclosures) {
    if (!getPublicDisclosures().some((claim) => claim.id === disclosure.id)) {
      gaps.push(`disclosures.${disclosure.id}`);
    }
  }
  for (const category of serviceCategories) {
    if (!getPublicCategories().some((claim) => claim.id === category.id)) {
      gaps.push(`category.${category.id}`);
    }
  }
  for (const service of services) {
    if (!isPubliclyApprovedOffering(service, "en")) gaps.push(`service.${service.id}`);
  }
  if (getBookableServices().length === 0) gaps.push("compliance.no-bookable-service");

  return gaps;
}

export function liveCatalogParses(): boolean {
  const records = [
    ...Object.values(identity).map((record) =>
      record.id === "positioning"
        ? positioningClaimSchema.safeParse(record)
        : identityClaimSchema.safeParse(record),
    ),
    z.array(personSchema).safeParse(people),
    z.array(contactChannelSchema).safeParse(contactChannels),
    businessHoursSchema.safeParse(businessHours),
    z.array(consultationLanguageSchema).safeParse(consultationLanguages),
    z.array(credentialSchema).safeParse(credentials),
    z.array(testimonialSchema).safeParse(testimonials),
    z.array(faqSchema).safeParse(faqs),
    z.array(resourceSchema).safeParse(resources),
    z.array(disclosureSchema).safeParse(disclosures),
    privacyNoticeSchema.safeParse(privacyNotice),
    z.array(serviceCategorySchema).safeParse(serviceCategories),
    z.array(serviceRecordSchema).safeParse(services),
    z.array(priceSchema).safeParse(prices),
    complianceRecordsParse(),
    officialSourcesParse(),
    reviewIssuesParse(),
  ];
  return records.every((result) => result === true || (typeof result === "object" && result.success));
}
