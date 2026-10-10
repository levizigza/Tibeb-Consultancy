import type { MeasurementEventName } from "@/lib/measurement/events";

export type DashboardMetric = {
  id: string;
  numerator: MeasurementEventName;
  denominator: MeasurementEventName | null;
  splits: readonly ("locale" | "form_factor" | "service_id" | "category_id" | "intent_id" | "outcome" | "cta_id" | "guide_id")[];
  reading: string;
};

/**
 * Ratios are event counts, not unique people. No visitor id is collected.
 * These definitions do not claim that a design change changed the ratio.
 */
export const dashboardMetrics: readonly DashboardMetric[] = [
  {
    id: "inquiry_conversion",
    numerator: "inquiry_submit_success",
    denominator: "inquiry_form_start",
    splits: ["locale", "form_factor"],
    reading: "Confirmed deliveries divided by form starts. A preview that does not deliver mail contributes no successes.",
  },
  {
    id: "service_page_visits",
    numerator: "service_page_view",
    denominator: null,
    splits: ["service_id", "category_id", "locale"],
    reading: "Counts of service pages, including pages that say the work is not approved.",
  },
  {
    id: "inquiry_dropoff",
    numerator: "inquiry_form_start",
    denominator: "inquiry_submit_success",
    splits: ["locale", "form_factor"],
    reading: "Form starts compared with confirmed deliveries. Contact clicks are reported beside starts and are not joined to a person.",
  },
  {
    id: "form_factor_usage",
    numerator: "page_view_home",
    denominator: null,
    splits: ["form_factor"],
    reading: "Homepage visits split into mobile, under 48rem, and desktop, including tablet.",
  },
  {
    id: "locale_usage",
    numerator: "page_view_home",
    denominator: null,
    splits: ["locale"],
    reading: "Homepage visits and language changes by locale code. An untranslated locale is still an English page.",
  },
  {
    id: "finder_outcomes",
    numerator: "service_finder_complete",
    denominator: null,
    splits: ["intent_id", "outcome", "locale"],
    reading: "Completed finder results by sentence and outcome. A published-page outcome stays at zero while no service page is public.",
  },
];

export const dashboardCompanionEvents = ["contact_cta_click", "language_change", "resource_engage", "service_category_select"] as const satisfies readonly MeasurementEventName[];
