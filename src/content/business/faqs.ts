import { z } from "zod";
import { claimMetaSchema } from "@/content/model/claim";
import { localeCodes } from "@/i18n/locales";

export const faqSchema = claimMetaSchema.extend({
  locale: z.enum(localeCodes),
  question: z.string().nullable(),
  answer: z.string().nullable(),
});

export type Faq = z.infer<typeof faqSchema>;

export const resourceSchema = claimMetaSchema.extend({
  locale: z.enum(localeCodes),
  title: z.string().nullable(),
  summary: z.string().nullable(),
  href: z.string().nullable(),
});

export type Resource = z.infer<typeof resourceSchema>;

/** No approved question or helpful-resource record has been supplied. */
export const faqs: readonly Faq[] = [];
export const resources: readonly Resource[] = [];
