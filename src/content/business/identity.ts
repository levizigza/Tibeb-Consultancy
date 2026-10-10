import { z } from "zod";
import { claimMetaSchema, draftClaim } from "@/content/model/claim";

export const identityClaimSchema = claimMetaSchema.extend({
  value: z.string().nullable(),
});

export type IdentityClaim = z.infer<typeof identityClaimSchema>;

export const positioningClaimSchema = identityClaimSchema.extend({
  showInDevelopmentPreview: z.boolean(),
});

export type PositioningClaim = z.infer<typeof positioningClaimSchema>;

function claim(id: string, value: string | null): IdentityClaim {
  return { id, value, ...draftClaim };
}

/**
 * Supplied project facts stay unpublished until they are verified and approved.
 * Unknown legal details stay null.
 */
export const identity = {
  publicName: claim("public-name", "TIBEB Consultancy"),
  legalName: claim("legal-name", null),
  registrationJurisdiction: claim("registration-jurisdiction", null),
  businessNumber: claim("business-number", null),
  nameExplanation: claim("name-explanation", null),
  positioning: {
    ...claim(
      "positioning",
      "TIBEB Consultancy is a Black-owned, Ethiopian-led professional-services business in Canada.",
    ),
    showInDevelopmentPreview: true,
  } satisfies PositioningClaim,
};
