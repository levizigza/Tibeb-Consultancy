import type { LocaleCode } from "@/i18n/locales";
import type { ContentUnit, ReviewNote, TargetLocale, TranslationReviewRecord } from "@/i18n/review/schema";
import { recordsForLocale, translationReviewRecords } from "@/i18n/review/records";
import { contentUnits, unitById, unitsForPath } from "@/i18n/review/units";

export type PublicationBlock =
  | "missing"
  | "draft"
  | "machine-assisted"
  | "outdated"
  | "awaiting-approval"
  | "high-stakes-needs-approval"
  | "reviewer-not-recorded"
  | "empty-text"
  | "not-approved";

export function publicationBlockReason(
  record: TranslationReviewRecord,
  unit: ContentUnit | undefined = unitById(record.unitId),
): PublicationBlock | null {
  if (!unit) return "not-approved";

  const sourceMoved = record.sourceVersion !== unit.currentVersion;
  const hasText = typeof record.text === "string" && record.text.trim().length > 0;

  if (record.machineAssisted || record.status === "machine-assisted-draft") return "machine-assisted";
  if (record.status === "outdated" || (sourceMoved && record.status !== "missing")) return "outdated";
  if (record.status === "missing") return "missing";
  if (!hasText) return "empty-text";
  if (record.status === "draft") return "draft";
  if (record.status === "human-reviewed") {
    return unit.topics.length > 0 ? "high-stakes-needs-approval" : "awaiting-approval";
  }
  if (record.status !== "approved") return "not-approved";
  if (!record.reviewer || !record.reviewDate || !record.updatedOn) return "reviewer-not-recorded";
  return null;
}

export function canPublishTranslation(record: TranslationReviewRecord, unit?: ContentUnit): boolean {
  return publicationBlockReason(record, unit) === null;
}

/**
 * A locale can replace English only when every target record for it can be published.
 * English itself is development copy, so this stays false for `en`.
 */
export function localeCopyIsPublishable(
  locale: LocaleCode,
  records: readonly TranslationReviewRecord[] = translationReviewRecords,
): boolean {
  if (locale === "en") return false;
  const targets = records.filter((record) => record.targetLocale === locale);
  if (targets.length !== contentUnits.length) return false;
  return targets.every((record) => canPublishTranslation(record));
}

export function pageIsAdequatelyTranslated(path: string, locale: TargetLocale): boolean {
  const ids = new Set(unitsForPath(path).map((unit) => unit.id));
  const relevant = translationReviewRecords.filter(
    (record) => record.targetLocale === locale && ids.has(record.unitId),
  );
  return relevant.length === ids.size && relevant.every((record) => canPublishTranslation(record));
}

export type ReviewIssue = {
  id: string;
  path: string;
  locale: TargetLocale;
  status: TranslationReviewRecord["status"];
  topics: TranslationReviewRecord["topics"];
  issue: PublicationBlock;
};

export function listReviewIssues(
  records: readonly TranslationReviewRecord[] = translationReviewRecords,
): ReviewIssue[] {
  return records.flatMap((record) => {
    const issue = publicationBlockReason(record);
    if (!issue) return [];
    return [
      {
        id: record.id,
        path: record.path,
        locale: record.targetLocale,
        status: record.status,
        topics: record.topics,
        issue,
      },
    ];
  });
}

/**
 * When the English source version moves, a started translation is marked outdated.
 * Missing records stay missing. Reviewer and approval are never filled in here.
 */
export function flagStaleTranslations(
  records: readonly TranslationReviewRecord[],
  units: readonly ContentUnit[] = contentUnits,
): TranslationReviewRecord[] {
  return records.map((record) => {
    const unit = units.find((item) => item.id === record.unitId);
    if (!unit || record.status === "missing" || record.text === null) return record;
    if (record.sourceVersion === unit.currentVersion) return record;
    return { ...record, status: "outdated" };
  });
}

export function addReviewComment(
  record: TranslationReviewRecord,
  comment: ReviewNote,
): TranslationReviewRecord {
  return {
    ...record,
    comments: [...record.comments, comment],
    updatedOn: comment.date ?? record.updatedOn,
  };
}

export function addCorrectionNote(record: TranslationReviewRecord, note: string): TranslationReviewRecord {
  const trimmed = note.trim();
  if (trimmed.length === 0) return record;
  return { ...record, correctionNotes: [...record.correctionNotes, trimmed] };
}

export function summarizeLocaleReview(
  locale: LocaleCode,
): "development-copy" | "not-started" | "in-progress" | "approved" {
  if (locale === "en") return "development-copy";
  if (localeCopyIsPublishable(locale)) return "approved";
  const targets = recordsForLocale(locale);
  if (targets.every((record) => record.status === "missing")) return "not-started";
  return "in-progress";
}
