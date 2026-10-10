import { z } from "zod";

/**
 * Review states for a target-locale record.
 * English is the source, not a target, so it is not one of these states.
 */
export const translationReviewStatuses = [
  "missing",
  "draft",
  "machine-assisted-draft",
  "human-reviewed",
  "approved",
  "outdated",
] as const;

export type TranslationReviewStatus = (typeof translationReviewStatuses)[number];

export const translationReviewStatusLabel: Record<TranslationReviewStatus, string> = {
  missing: "Missing",
  draft: "Draft",
  "machine-assisted-draft": "Machine-assisted draft",
  "human-reviewed": "Human-reviewed",
  approved: "Approved",
  outdated: "Outdated",
};

/** Copy that stays unpublished until a named person has reviewed it. */
export const highStakesTopics = [
  "immigration-citizenship",
  "tax",
  "service-agreement",
  "pricing",
  "privacy-consent",
  "government-authorization",
  "payment",
] as const;

export type HighStakesTopic = (typeof highStakesTopics)[number];

export const highStakesTopicLabel: Record<HighStakesTopic, string> = {
  "immigration-citizenship": "Immigration and citizenship information",
  tax: "Tax-related information",
  "service-agreement": "Service agreements",
  pricing: "Pricing explanations",
  "privacy-consent": "Privacy and consent wording",
  "government-authorization": "Government authorization instructions",
  payment: "Payment instructions",
};

export const contentSurfaces = [
  "page",
  "heading",
  "navigation",
  "button",
  "form",
  "error",
] as const;

export type ContentSurface = (typeof contentSurfaces)[number];

export const targetLocales = ["am", "ti", "om"] as const;

export type TargetLocale = (typeof targetLocales)[number];

export const reviewNoteSchema = z.object({
  note: z.string().trim().min(1),
  author: z.string().trim().min(1).nullable(),
  date: z.iso.date().nullable(),
});

export type ReviewNote = z.infer<typeof reviewNoteSchema>;

export const translationReviewRecordSchema = z
  .object({
    id: z.string().trim().min(1),
    unitId: z.string().trim().min(1),
    path: z.string().trim().min(1),
    surface: z.enum(contentSurfaces),
    topics: z.array(z.enum(highStakesTopics)),
    sourceLocale: z.literal("en"),
    targetLocale: z.enum(targetLocales),
    sourceVersion: z.string().trim().min(1),
    reviewer: z.string().trim().min(1).nullable(),
    reviewDate: z.iso.date().nullable(),
    updatedOn: z.iso.date().nullable(),
    status: z.enum(translationReviewStatuses),
    machineAssisted: z.boolean(),
    comments: z.array(reviewNoteSchema),
    correctionNotes: z.array(z.string().trim().min(1)),
    text: z.string().nullable(),
  })
  .superRefine((record, ctx) => {
    const issue = (message: string) => ctx.addIssue({ code: "custom", message });

    if (record.status === "missing") {
      if (record.text !== null) issue("A missing translation has no target text.");
      if (record.reviewer !== null) issue("A missing translation has no reviewer.");
      if (record.machineAssisted) issue("A missing translation is not machine-assisted.");
    }

    if (record.status === "machine-assisted-draft" && !record.machineAssisted) {
      issue("A machine-assisted draft must be marked machine-assisted.");
    }

    if (
      (record.status === "approved" || record.status === "human-reviewed") &&
      record.machineAssisted
    ) {
      issue("Machine-assisted text cannot be recorded as human-reviewed or approved.");
    }

    if (record.status === "human-reviewed" || record.status === "approved") {
      if (!record.reviewer) issue("A named reviewer is required.");
      if (!record.reviewDate) issue("A review date is required.");
      if (!record.text || record.text.trim().length === 0) issue("Target text is required.");
    }

    if (record.status === "approved" && !record.updatedOn) {
      issue("An approval needs a last-updated date.");
    }

    if (record.status === "draft" && record.machineAssisted) {
      issue("A machine-assisted draft uses the machine-assisted status.");
    }
  });

export type TranslationReviewRecord = z.infer<typeof translationReviewRecordSchema>;

export type ContentUnit = {
  id: string;
  path: string;
  surface: ContentSurface;
  topics: readonly HighStakesTopic[];
  label: string;
  currentVersion: string;
  sourceText: string | null;
};
