import { z } from "zod";
import { claimMetaSchema } from "@/content/model/claim";

export const consultationLanguageSchema = claimMetaSchema.extend({
  label: z.string().nullable(),
});

export type ConsultationLanguage = z.infer<typeof consultationLanguageSchema>;

/**
 * Languages the business can use in a consultation.
 * This is not the website locale list. None have been confirmed.
 */
export const consultationLanguages: readonly ConsultationLanguage[] = [];
