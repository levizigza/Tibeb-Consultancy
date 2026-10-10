import { z } from "zod";
import { claimMetaFields, draftClaim } from "@/content/model/claim";

export const serviceCategoryIds = [
  "immigration-citizenship",
  "government-forms",
  "career-employment",
  "tax-business-administration",
] as const;

export type ServiceCategoryId = (typeof serviceCategoryIds)[number];

export const serviceCategorySchema = z.object({
  id: z.enum(serviceCategoryIds),
  label: z.string(),
  regulated: z.boolean(),
  ...claimMetaFields,
});

export type ServiceCategory = z.infer<typeof serviceCategorySchema>;

/**
 * Taxonomy only. A category label is not a public claim that the business offers that work.
 * `regulated` is a publication gate, not a legal opinion.
 */
export const serviceCategories: readonly ServiceCategory[] = [
  {
    id: "immigration-citizenship",
    label: "Immigration & Citizenship",
    regulated: true,
    ...draftClaim,
    authorizationStatus: "pending",
    requiresRegulatoryReview: true,
  },
  {
    id: "government-forms",
    label: "Government & Forms",
    regulated: true,
    ...draftClaim,
    authorizationStatus: "pending",
    requiresRegulatoryReview: true,
  },
  {
    id: "career-employment",
    label: "Career & Employment",
    regulated: false,
    ...draftClaim,
  },
  {
    id: "tax-business-administration",
    label: "Tax & Business Administration",
    regulated: true,
    ...draftClaim,
    authorizationStatus: "pending",
    requiresRegulatoryReview: true,
  },
];
