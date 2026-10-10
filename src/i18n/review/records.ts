import {
  targetLocales,
  translationReviewRecordSchema,
  type TranslationReviewRecord,
} from "@/i18n/review/schema";
import { contentUnits } from "@/i18n/review/units";

/**
 * One record per content unit and target locale.
 * Every record starts missing. No reviewer is named, and none is marked approved.
 */
export const translationReviewRecords: readonly TranslationReviewRecord[] = translationReviewRecordSchema
  .array()
  .parse(
    contentUnits.flatMap((unit) =>
      targetLocales.map((locale) => ({
        id: `${unit.id}:${locale}`,
        unitId: unit.id,
        path: unit.path,
        surface: unit.surface,
        topics: [...unit.topics],
        sourceLocale: "en" as const,
        targetLocale: locale,
        sourceVersion: unit.currentVersion,
        reviewer: null,
        reviewDate: null,
        updatedOn: null,
        status: "missing" as const,
        machineAssisted: false,
        comments: [],
        correctionNotes: [],
        text: null,
      })),
    ),
  );

export function recordsForLocale(locale: TranslationReviewRecord["targetLocale"]): TranslationReviewRecord[] {
  return translationReviewRecords.filter((record) => record.targetLocale === locale);
}

export function recordsForPath(path: string, locale?: TranslationReviewRecord["targetLocale"]): TranslationReviewRecord[] {
  return translationReviewRecords.filter(
    (record) => record.path === path && (locale === undefined || record.targetLocale === locale),
  );
}
