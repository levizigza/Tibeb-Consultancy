import { readFileSync, readdirSync, statSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { integrations } from "@/lib/integrations/registry";
import {
  acceptMeasurement,
  assignExperiment,
  dashboardMetrics,
  experimentBacklog,
  experimentsEnabled,
  formFactorFromWidth,
  inquirySuccessMeasurement,
  measurementCollectionEnabled,
  measurementEventNames,
  measurementOwnerSwitch,
  measurementRetention,
  privacyNoticeAllowsMeasurement,
} from "@/lib/measurement";

const analyticsHosts = [
  "googletagmanager",
  "google-analytics",
  "plausible",
  "usefathom",
  "segment.com",
  "hotjar",
  "facebook.net",
  "clarity.ms",
];

function sourceFiles(directory: string): string[] {
  return readdirSync(directory).flatMap((name) => {
    const full = `${directory}/${name}`;
    if (statSync(full).isDirectory()) return sourceFiles(full);
    return name.endsWith(".ts") || name.endsWith(".tsx") ? [readFileSync(full, "utf8")] : [];
  });
}

describe("measurement policy", () => {
  it("keeps collection off until a privacy notice exists", () => {
    expect(measurementOwnerSwitch).toBe(false);
    expect(privacyNoticeAllowsMeasurement()).toBe(false);
    expect(measurementCollectionEnabled()).toBe(false);
    expect(integrations).toEqual([]);
    expect(measurementRetention).toMatchObject({
      rawEventsStored: false,
      approvedAggregateDays: null,
      storesIp: false,
      storesUserAgent: false,
      usesCookie: false,
      usesThirdPartyScript: false,
    });
  });

  it("loads no third-party analytics script", () => {
    const source = sourceFiles("src").join("\n").toLowerCase();
    for (const host of analyticsHosts) {
      expect(source).not.toContain(host);
    }
  });

  it("does not wire events into the inquiry path", () => {
    const form = readFileSync("src/components/inquiry/inquiry-form.tsx", "utf8");
    const action = readFileSync("src/lib/inquiry/action.ts", "utf8");
    expect(form).not.toContain("measurement");
    expect(action).not.toContain("measurement");
  });
});

describe("measurement events", () => {
  const home = { name: "page_view_home" as const, locale: "en" as const, form_factor: "mobile" as const };

  it("uses object_action names for the nine agreed events", () => {
    expect(measurementEventNames).toEqual([
      "page_view_home",
      "service_category_select",
      "service_page_view",
      "contact_cta_click",
      "inquiry_form_start",
      "inquiry_submit_success",
      "language_change",
      "service_finder_complete",
      "resource_engage",
    ]);
    for (const name of measurementEventNames) {
      expect(name).toMatch(/^[a-z]+(_[a-z]+)+$/);
    }
  });

  it("accepts a homepage visit and discards it", () => {
    const result = acceptMeasurement(home);
    expect(result).toEqual({ ok: true, stored: false, reason: "collection-disabled", event: home });
  });

  it("rejects inquiry contents, contact details, and unknown fields", () => {
    expect(acceptMeasurement({ ...home, email: "person@example.com" }).reason).toBe("sensitive");
    expect(acceptMeasurement({ ...home, phone: "4035550100" }).reason).toBe("sensitive");
    expect(acceptMeasurement({ ...home, message: "Please help with my taxes" }).reason).toBe("sensitive");
    expect(acceptMeasurement({ ...home, immigration_status: "visitor" }).reason).toBe("sensitive");
    expect(acceptMeasurement({ ...home, full_name: "Ada" }).reason).toBe("sensitive");
    expect(acceptMeasurement({ ...home, extra: "note" }).reason).toBe("invalid");
  });

  it("checks service, finder, language, and resource identifiers", () => {
    expect(
      acceptMeasurement({
        name: "service_page_view",
        locale: "en",
        form_factor: "desktop",
        service_id: "resume-writing",
        category_id: "career-employment",
      }).ok,
    ).toBe(true);
    expect(
      acceptMeasurement({
        name: "service_page_view",
        locale: "en",
        form_factor: "desktop",
        service_id: "resume-writing",
        category_id: "government-forms",
      }).reason,
    ).toBe("invalid");
    expect(
      acceptMeasurement({
        name: "service_finder_complete",
        locale: "am",
        form_factor: "mobile",
        intent_id: "unsure",
        outcome: "general_inquiry",
      }).ok,
    ).toBe(true);
    expect(
      acceptMeasurement({
        name: "language_change",
        locale: "en",
        form_factor: "desktop",
        to_locale: "en",
      }).reason,
    ).toBe("invalid");
    expect(
      acceptMeasurement({
        name: "resource_engage",
        locale: "ti",
        form_factor: "mobile",
        action: "source",
        guide_id: "official-government-forms",
        source_id: "cra-forms",
      }).ok,
    ).toBe(true);
    expect(
      acceptMeasurement({
        name: "resource_engage",
        locale: "en",
        form_factor: "mobile",
        action: "view",
        guide_id: "not-a-guide",
      }).reason,
    ).toBe("invalid");
  });

  it("counts a success only after delivery and omits the inquiry", () => {
    expect(
      inquirySuccessMeasurement({
        status: "not-delivered",
        locale: "en",
        formFactor: "mobile",
        serviceCategory: "not-sure",
      }),
    ).toBeNull();
    expect(
      inquirySuccessMeasurement({
        status: "delivered",
        locale: "om",
        formFactor: "desktop",
        serviceCategory: "career-employment",
      }),
    ).toEqual({
      name: "inquiry_submit_success",
      locale: "om",
      form_factor: "desktop",
      service_category: "career-employment",
    });
    expect(formFactorFromWidth(320)).toBe("mobile");
    expect(formFactorFromWidth(768)).toBe("desktop");
    expect(formFactorFromWidth(0)).toBeNull();
  });
});

describe("measurement dashboard and experiments", () => {
  it("defines ratios from event counts and leaves experiments parked", () => {
    expect(dashboardMetrics.map((metric) => metric.id)).toEqual([
      "inquiry_conversion",
      "service_page_visits",
      "inquiry_dropoff",
      "form_factor_usage",
      "locale_usage",
      "finder_outcomes",
    ]);
    expect(experimentsEnabled).toBe(false);
    expect(experimentBacklog.every((item) => item.implemented === false && item.status === "parked")).toBe(true);
    expect(assignExperiment("hero-headline")).toBeNull();
    const backlog = JSON.stringify(experimentBacklog);
    expect(backlog).not.toContain("book now");
    expect(backlog).not.toContain("guaranteed");
  });
});
