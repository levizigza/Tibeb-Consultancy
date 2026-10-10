import { targetLocales, translationReviewStatusLabel, highStakesTopicLabel } from "@/i18n/review/schema";
import type { ContentSurface, ContentUnit, TargetLocale, TranslationReviewRecord } from "@/i18n/review/schema";
import { translationReviewRecords } from "@/i18n/review/records";
import { contentUnits } from "@/i18n/review/units";
import { canPublishTranslation } from "@/i18n/review/validate";

export type CoverageSummary = {
  units: number;
  translations: number;
  missing: number;
  draft: number;
  machineAssisted: number;
  humanReviewed: number;
  approved: number;
  outdated: number;
  publishable: number;
};

export function translationCoverageSummary(
  records: readonly TranslationReviewRecord[] = translationReviewRecords,
): CoverageSummary {
  return {
    units: contentUnits.length,
    translations: records.length,
    missing: records.filter((record) => record.status === "missing").length,
    draft: records.filter((record) => record.status === "draft").length,
    machineAssisted: records.filter((record) => record.status === "machine-assisted-draft" || record.machineAssisted).length,
    humanReviewed: records.filter((record) => record.status === "human-reviewed").length,
    approved: records.filter((record) => record.status === "approved").length,
    outdated: records.filter((record) => record.status === "outdated").length,
    publishable: records.filter((record) => canPublishTranslation(record)).length,
  };
}

function statusFor(unit: ContentUnit, locale: TargetLocale, records: readonly TranslationReviewRecord[]): string {
  const record = records.find((item) => item.unitId === unit.id && item.targetLocale === locale);
  if (!record) return "Missing";
  return translationReviewStatusLabel[record.status];
}

function unitLine(unit: ContentUnit, records: readonly TranslationReviewRecord[]): string {
  const cells = targetLocales.map((locale) => statusFor(unit, locale, records)).join(" | ");
  const topics = unit.topics.map((topic) => highStakesTopicLabel[topic]).join("; ");
  const topicCell = topics.length > 0 ? topics : "Ordinary";
  return `| ${unit.label} | \`${unit.path}\` | ${unit.surface} | ${topicCell} | ${cells} |`;
}

const surfaceOrder: readonly ContentSurface[] = ["page", "heading", "navigation", "button", "form", "error"];

export function formatTranslationCoverageReport(
  records: readonly TranslationReviewRecord[] = translationReviewRecords,
  units: readonly ContentUnit[] = contentUnits,
): string {
  const summary = translationCoverageSummary(records);
  const ordered = [...units].sort((a, b) => {
    const surface = surfaceOrder.indexOf(a.surface) - surfaceOrder.indexOf(b.surface);
    if (surface !== 0) return surface;
    return a.path.localeCompare(b.path) || a.id.localeCompare(b.id);
  });
  const highStakes = ordered.filter((unit) => unit.topics.length > 0);
  const ordinary = ordered.filter((unit) => unit.topics.length === 0);
  const header = "| Label | Path | Surface | Review | am | ti | om |";
  const rule = "| --- | --- | --- | --- | --- | --- | --- |";

  return [
    "# Translation coverage",
    "",
    "English is the source. No target locale is approved, and no reviewer is recorded.",
    "A missing row shows the English development copy with the translation notice. It is not a finished translation.",
    "",
    "## Summary",
    "",
    `- Content units: ${summary.units}`,
    `- Target records: ${summary.translations}`,
    `- Missing: ${summary.missing}`,
    `- Draft: ${summary.draft}`,
    `- Machine-assisted draft: ${summary.machineAssisted}`,
    `- Human-reviewed: ${summary.humanReviewed}`,
    `- Approved: ${summary.approved}`,
    `- Outdated: ${summary.outdated}`,
    `- Publishable translations: ${summary.publishable}`,
    "",
    "## High-stakes copy still requiring human review",
    "",
    header,
    rule,
    ...highStakes.map((unit) => unitLine(unit, records)),
    "",
    "## Other pages and chrome",
    "",
    header,
    rule,
    ...ordinary.map((unit) => unitLine(unit, records)),
    "",
    "Machine-assisted text cannot be published. Human-reviewed is not the same as approved.",
    "",
  ].join("\n");
}
