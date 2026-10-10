import { z } from "zod";
import { resourceGuides } from "@/content/resources/guides";
import { resourceCategoryIds } from "@/content/resources/schema";
import { resourceSources } from "@/content/resources/sources";
import { serviceCategoryIds } from "@/content/services/categories";
import { complianceServiceIds } from "@/content/compliance/schema";
import { finderIntentIds } from "@/content/site/service-finder";
import { servicePages } from "@/content/site/information-architecture";
import { localeCodes } from "@/i18n/locales";
import { inquiryCategoryIds } from "@/lib/validation/contact-inquiry";
import type { InquiryStatus } from "@/lib/inquiry/state";

/**
 * Names use object_action. Values are closed identifiers.
 * `contact_cta_click` is the consultation-request control. That control is the Contact link.
 * It does not book a consultation.
 */
export const measurementEventNames = [
  "page_view_home",
  "service_category_select",
  "service_page_view",
  "contact_cta_click",
  "inquiry_form_start",
  "inquiry_submit_success",
  "language_change",
  "service_finder_complete",
  "resource_engage",
] as const;

export type MeasurementEventName = (typeof measurementEventNames)[number];

export const formFactors = ["mobile", "desktop"] as const;
export type FormFactor = (typeof formFactors)[number];

/** Width under the `md` token (48rem / 768px) is mobile. Tablet and desktop share the wide bucket. */
export const desktopMinPx = 768;

export const contactCtaIds = ["navigation", "hero", "footer", "finder", "page-end"] as const;

export const finderOutcomes = ["published_page", "not_offered", "general_inquiry"] as const;

export const resourceActions = ["view", "filter", "source"] as const;

const localeField = z.enum(localeCodes);
const formFactorField = z.enum(formFactors);

const guideIds = resourceGuides.map((guide) => guide.id);
const sourceIds = resourceSources.map((source) => source.id);

function isGuideId(value: string): boolean {
  return guideIds.includes(value);
}

function isSourceId(value: string): boolean {
  return sourceIds.includes(value);
}

export const measurementEventSchema = z.discriminatedUnion("name", [
  z.object({
    name: z.literal("page_view_home"),
    locale: localeField,
    form_factor: formFactorField,
  }),
  z.object({
    name: z.literal("service_category_select"),
    locale: localeField,
    form_factor: formFactorField,
    category_id: z.enum(serviceCategoryIds),
  }),
  z
    .object({
      name: z.literal("service_page_view"),
      locale: localeField,
      form_factor: formFactorField,
      service_id: z.enum(complianceServiceIds),
      category_id: z.enum(serviceCategoryIds),
    })
    .superRefine((event, context) => {
      const page = servicePages.find((item) => item.id === event.service_id);
      if (!page || page.familyId !== event.category_id) {
        context.addIssue({ code: "custom", message: "Service and category do not match." });
      }
    }),
  z.object({
    name: z.literal("contact_cta_click"),
    locale: localeField,
    form_factor: formFactorField,
    cta_id: z.enum(contactCtaIds),
  }),
  z.object({
    name: z.literal("inquiry_form_start"),
    locale: localeField,
    form_factor: formFactorField,
  }),
  z.object({
    name: z.literal("inquiry_submit_success"),
    locale: localeField,
    form_factor: formFactorField,
    service_category: z.enum(inquiryCategoryIds),
  }),
  z
    .object({
      name: z.literal("language_change"),
      locale: localeField,
      form_factor: formFactorField,
      to_locale: localeField,
    })
    .superRefine((event, context) => {
      if (event.locale === event.to_locale) {
        context.addIssue({ code: "custom", message: "A language change needs two different locales." });
      }
    }),
  z.object({
    name: z.literal("service_finder_complete"),
    locale: localeField,
    form_factor: formFactorField,
    intent_id: z.enum(finderIntentIds),
    outcome: z.enum(finderOutcomes),
  }),
  z
    .object({
      name: z.literal("resource_engage"),
      locale: localeField,
      form_factor: formFactorField,
      action: z.enum(resourceActions),
      guide_id: z.string().optional(),
      category_id: z.enum(resourceCategoryIds).optional(),
      source_id: z.string().optional(),
    })
    .superRefine((event, context) => {
      if (event.guide_id !== undefined && !isGuideId(event.guide_id)) {
        context.addIssue({ code: "custom", message: "Unknown guide id." });
      }
      if (event.source_id !== undefined && !isSourceId(event.source_id)) {
        context.addIssue({ code: "custom", message: "Unknown source id." });
      }
      const guideOk = event.guide_id !== undefined && isGuideId(event.guide_id);
      const sourceOk = event.source_id !== undefined && isSourceId(event.source_id);
      if (event.action === "view" && (!guideOk || event.category_id || event.source_id)) {
        context.addIssue({ code: "custom", message: "A guide view records only the guide id." });
      }
      if (event.action === "filter" && (event.category_id === undefined || event.guide_id !== undefined || event.source_id !== undefined)) {
        context.addIssue({ code: "custom", message: "A category filter records only the category id." });
      }
      if (event.action === "source" && (!guideOk || !sourceOk || event.category_id)) {
        context.addIssue({ code: "custom", message: "A source click records the guide id and the source id." });
      }
    }),
]);

export type MeasurementEvent = z.infer<typeof measurementEventSchema>;

export function formFactorFromWidth(width: number): FormFactor | null {
  if (!Number.isFinite(width) || width < 1) return null;
  return width < desktopMinPx ? "mobile" : "desktop";
}

/** A success event exists only after delivery is confirmed. It carries no inquiry fields. */
export function inquirySuccessMeasurement(input: {
  status: InquiryStatus;
  locale: (typeof localeCodes)[number];
  formFactor: FormFactor;
  serviceCategory: (typeof inquiryCategoryIds)[number];
}): MeasurementEvent | null {
  if (input.status !== "delivered") return null;
  return {
    name: "inquiry_submit_success",
    locale: input.locale,
    form_factor: input.formFactor,
    service_category: input.serviceCategory,
  };
}
