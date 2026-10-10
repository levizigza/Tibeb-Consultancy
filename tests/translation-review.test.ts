import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { locales } from "@/i18n/locales";
import { formatTranslationCoverageReport, translationCoverageSummary } from "@/i18n/review/coverage";
import { translationReviewRecords } from "@/i18n/review/records";
import {
  translationReviewRecordSchema,
  type TranslationReviewRecord,
} from "@/i18n/review/schema";
import { contentUnits, sourceContentVersion, topicsForPath, unitById } from "@/i18n/review/units";
import {
  addCorrectionNote,
  addReviewComment,
  canPublishTranslation,
  flagStaleTranslations,
  listReviewIssues,
  localeCopyIsPublishable,
  pageIsAdequatelyTranslated,
  summarizeLocaleReview,
} from "@/i18n/review/validate";

function fixture(overrides: Partial<TranslationReviewRecord>): TranslationReviewRecord {
  const base: TranslationReviewRecord = {
    id: "page:/about:am",
    unitId: "page:/about",
    path: "/about",
    surface: "page",
    topics: [],
    sourceLocale: "en",
    targetLocale: "am",
    sourceVersion: sourceContentVersion,
    reviewer: null,
    reviewDate: null,
    updatedOn: null,
    status: "draft",
    machineAssisted: false,
    comments: [],
    correctionNotes: [],
    text: "fixture",
  };
  return translationReviewRecordSchema.parse({ ...base, ...overrides });
}

describe("translation review", () => {
  it("keeps every target missing until a person reviews it", () => {
    const summary = translationCoverageSummary();
    expect(summary.units).toBe(contentUnits.length);
    expect(summary.translations).toBe(contentUnits.length * 3);
    expect(summary.missing).toBe(summary.translations);
    expect(summary.publishable).toBe(0);
    expect(summary.approved).toBe(0);
    expect(summary.humanReviewed).toBe(0);
    expect(summary.machineAssisted).toBe(0);
    expect(summary.outdated).toBe(0);
    expect(translationReviewRecords.every((record) => record.reviewer === null)).toBe(true);
    expect(translationReviewRecords.every((record) => record.comments.length === 0)).toBe(true);

    for (const locale of ["am", "ti", "om"] as const) {
      expect(localeCopyIsPublishable(locale)).toBe(false);
      expect(summarizeLocaleReview(locale)).toBe("not-started");
      expect(locales.find((item) => item.code === locale)?.translationStatus).toBe("not-started");
      expect(pageIsAdequatelyTranslated("/pricing", locale)).toBe(false);
      expect(pageIsAdequatelyTranslated("/", locale)).toBe(false);
    }
  });

  it("marks high-stakes pages and withholds them from publication", () => {
    expect(topicsForPath("/services/immigration-citizenship/citizenship")).toEqual([
      "immigration-citizenship",
    ]);
    expect(topicsForPath("/services/tax-business-administration/personal-tax")).toEqual(["tax"]);
    expect(topicsForPath("/services/government-forms/cra-services")).toEqual([
      "government-authorization",
      "tax",
    ]);
    expect(topicsForPath("/how-it-works")).toEqual(["service-agreement"]);
    expect(topicsForPath("/pricing")).toEqual(["pricing", "payment"]);
    expect(topicsForPath("/resources")).toEqual(["privacy-consent"]);
    expect(topicsForPath("/about")).toEqual([]);

    const reviewed = fixture({
      id: "page:/pricing:ti",
      unitId: "page:/pricing",
      path: "/pricing",
      topics: ["pricing", "payment"],
      targetLocale: "ti",
      status: "human-reviewed",
      reviewer: "fixture-reviewer",
      reviewDate: "2026-10-10",
      text: "fixture",
    });
    expect(canPublishTranslation(reviewed)).toBe(false);
    expect(listReviewIssues([reviewed]).map((issue) => issue.issue)).toEqual(["high-stakes-needs-approval"]);

    const machine = translationReviewRecordSchema.safeParse({
      id: "page:/pricing:am",
      unitId: "page:/pricing",
      path: "/pricing",
      surface: "page",
      topics: ["pricing"],
      sourceLocale: "en",
      targetLocale: "am",
      sourceVersion: sourceContentVersion,
      reviewer: "fixture-reviewer",
      reviewDate: "2026-10-10",
      updatedOn: "2026-10-10",
      status: "approved",
      machineAssisted: true,
      comments: [],
      correctionNotes: [],
      text: "fixture",
    });
    expect(machine.success).toBe(false);
  });

  it("flags a translation when the English source version changes and does not invent a reviewer", () => {
    const started = fixture({ sourceVersion: "2020-01-01", text: "fixture", status: "draft" });
    const [flagged] = flagStaleTranslations([started], [
      { ...unitById("page:/about")!, currentVersion: sourceContentVersion },
    ]);
    expect(flagged?.status).toBe("outdated");
    expect(flagged?.reviewer).toBeNull();
    expect(canPublishTranslation(flagged!)).toBe(false);

    const noted = addCorrectionNote(
      addReviewComment(started, { note: "Check the fee sentence.", author: null, date: "2026-10-10" }),
      "Keep the English fallback until this is reviewed.",
    );
    expect(noted.status).toBe("draft");
    expect(noted.reviewer).toBeNull();
    expect(noted.comments).toHaveLength(1);
    expect(noted.correctionNotes).toEqual(["Keep the English fallback until this is reviewed."]);
  });

  it("matches the checked-in coverage report", () => {
    const report = formatTranslationCoverageReport();
    expect(report).toContain("Publishable translations: 0");
    expect(report).toContain("Immigration and citizenship information");
    expect(report).toContain("Privacy and consent wording");
    expect(report).toContain("no reviewer is recorded");
    expect(readFileSync("docs/TRANSLATION_COVERAGE.md", "utf8")).toBe(report);
  });
});
