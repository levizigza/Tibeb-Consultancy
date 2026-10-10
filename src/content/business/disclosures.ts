import { z } from "zod";
import { claimMetaSchema, draftClaim } from "@/content/model/claim";

export const disclosureTopics = [
  "government-affiliation",
  "regulated-scope",
  "other",
] as const;

export const disclosureSchema = claimMetaSchema.extend({
  topic: z.enum(disclosureTopics),
  statement: z.string().nullable(),
});

export type Disclosure = z.infer<typeof disclosureSchema>;

/**
 * Government-relationship copy is blocked until the owner writes and authorizes it.
 * The statement stays null so the catalog does not invent an affiliation claim.
 */
export const disclosures: readonly Disclosure[] = [
  {
    id: "government-relationship",
    topic: "government-affiliation",
    statement: null,
    ...draftClaim,
    publicationStatus: "blocked",
    authorizationStatus: "pending",
    requiresRegulatoryReview: true,
  },
];
