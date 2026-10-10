import { z } from "zod";
import {
  authorizationStatuses,
  factualVerifications,
  publicationStatuses,
  type AuthorizationStatus,
  type FactualVerification,
  type PublicationStatus,
} from "@/content/model/status";

const reviewDatePattern = /^\d{4}-\d{2}-\d{2}$/;

export const claimMetaFields = {
  verification: z.enum(factualVerifications),
  publicationStatus: z.enum(publicationStatuses),
  authorizationStatus: z.enum(authorizationStatuses),
  requiresRegulatoryReview: z.boolean(),
  lastReviewed: z.iso.date().nullable(),
};

export const claimMetaSchema = z.object({
  id: z.string().trim().min(1),
  ...claimMetaFields,
});

export type ClaimMeta = z.infer<typeof claimMetaSchema>;

export const draftClaim = {
  verification: "unverified",
  publicationStatus: "draft",
  authorizationStatus: "not-required",
  requiresRegulatoryReview: false,
  lastReviewed: null,
} as const satisfies Omit<ClaimMeta, "id">;

export type ClaimGateInput = {
  verification: FactualVerification;
  publicationStatus: PublicationStatus;
  authorizationStatus: AuthorizationStatus;
  requiresRegulatoryReview: boolean;
  lastReviewed: string | null;
  valuePresent: boolean;
};

/**
 * A record is an established public claim only when the fact is verified,
 * publication is approved, review date is set, and authorization allows it.
 * Editorial status `verified` means fact-checked and still unpublished.
 */
export function isEstablishedPublicClaim(input: ClaimGateInput): boolean {
  const authorizationReady = input.requiresRegulatoryReview
    ? input.authorizationStatus === "granted"
    : input.authorizationStatus === "granted" ||
      input.authorizationStatus === "not-required";

  return (
    input.valuePresent &&
    input.verification === "verified" &&
    input.publicationStatus === "approved" &&
    input.lastReviewed !== null &&
    reviewDatePattern.test(input.lastReviewed) &&
    authorizationReady
  );
}

export function hasText(value: string | null | undefined): value is string {
  return typeof value === "string" && value.trim().length > 0;
}
