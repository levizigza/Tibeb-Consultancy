import type { PublicationStatus } from "@/content/model/status";
import type { ServiceRecord } from "@/content/services/schema";

/**
 * Internal catalog. Pages must read `getPublicOfferings` and must not render this array.
 * Every record below fails the public publication gate.
 */
const blockedReview = {
  verification: "unverified",
  publicationStatus: "blocked",
  authorizationStatus: "pending",
  requiresRegulatoryReview: true,
  lastReviewed: null,
} as const;

function localeCopy(
  publicationStatus: PublicationStatus,
  title: string,
  description: string,
) {
  return {
    publicationStatus,
    verification: "unverified" as const,
    title,
    description,
    audience: "Audience has not been confirmed.",
    scopeOfWork: "Scope has not been confirmed.",
    restrictions: "Restrictions have not been confirmed.",
    exclusions: "Exclusions have not been confirmed.",
  };
}

export const services: readonly ServiceRecord[] = [
  {
    id: "immigration-citizenship-assistance",
    categoryId: "immigration-citizenship",
    credentialIds: [],
    pricingId: null,
    ...blockedReview,
    locales: {
      en: localeCopy(
        "blocked",
        "Immigration and citizenship assistance",
        "Internal record. Publication is blocked until authorization is confirmed.",
      ),
    },
  },
  {
    id: "government-forms-assistance",
    categoryId: "government-forms",
    credentialIds: [],
    pricingId: null,
    ...blockedReview,
    locales: {
      en: localeCopy(
        "blocked",
        "Government and forms assistance",
        "Internal record. Publication is blocked until authorization is confirmed.",
      ),
    },
  },
  {
    id: "career-document-assistance",
    categoryId: "career-employment",
    credentialIds: [],
    pricingId: null,
    verification: "unverified",
    publicationStatus: "draft",
    authorizationStatus: "not-required",
    requiresRegulatoryReview: false,
    lastReviewed: null,
    locales: {
      en: localeCopy(
        "draft",
        "Career document assistance",
        "Internal draft. Not approved for publication.",
      ),
    },
  },
  {
    id: "tax-business-administration-assistance",
    categoryId: "tax-business-administration",
    credentialIds: [],
    pricingId: null,
    ...blockedReview,
    locales: {
      en: localeCopy(
        "blocked",
        "Tax and business administration assistance",
        "Internal record. Publication is blocked until authorization is confirmed.",
      ),
    },
  },
];
