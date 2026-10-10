import { z } from "zod";
import { claimMetaFields } from "@/content/model/claim";
import { factualVerifications, publicationStatuses } from "@/content/model/status";
import { serviceCategoryIds } from "@/content/services/categories";
import { localeCodes } from "@/i18n/locales";

export const localeServiceContentSchema = z.object({
  publicationStatus: z.enum(publicationStatuses),
  verification: z.enum(factualVerifications),
  title: z.string(),
  description: z.string(),
  audience: z.string(),
  scopeOfWork: z.string(),
  restrictions: z.string(),
  exclusions: z.string(),
});

export type LocaleServiceContent = z.infer<typeof localeServiceContentSchema>;

export const serviceRecordSchema = z.object({
  id: z.string().trim().min(1),
  categoryId: z.enum(serviceCategoryIds),
  credentialIds: z.array(z.string().trim().min(1)),
  pricingId: z.string().trim().min(1).nullable(),
  locales: z.object({
    en: localeServiceContentSchema.optional(),
    am: localeServiceContentSchema.optional(),
    ti: localeServiceContentSchema.optional(),
    om: localeServiceContentSchema.optional(),
  }),
  ...claimMetaFields,
});

export type ServiceRecord = z.infer<typeof serviceRecordSchema>;

export const localeCodeSchema = z.enum(localeCodes);
