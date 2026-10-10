import {
  measurementEventNames,
  measurementEventSchema,
  type MeasurementEvent,
  type MeasurementEventName,
} from "@/lib/measurement/events";
const forbiddenKeys = new Set([
  "fullname",
  "full_name",
  "full-name",
  "client_name",
  "clientname",
  "email",
  "e-mail",
  "phone",
  "telephone",
  "mobile",
  "inquiry",
  "message",
  "note",
  "notes",
  "document",
  "file",
  "attachment",
  "sin",
  "password",
  "immigration_status",
  "immigrationstatus",
  "immigration-status",
  "tax_details",
  "taxdetails",
  "address",
  "ip",
  "user_agent",
  "useragent",
  "user-agent",
  "companywebsite",
  "company_website",
  "client_key",
  "clientkey",
  "cookie",
  "session",
  "visitor_id",
  "visitorid",
]);

const allowedKeys: Record<MeasurementEventName, readonly string[]> = {
  page_view_home: ["name", "locale", "form_factor"],
  service_category_select: ["name", "locale", "form_factor", "category_id"],
  service_page_view: ["name", "locale", "form_factor", "service_id", "category_id"],
  contact_cta_click: ["name", "locale", "form_factor", "cta_id"],
  inquiry_form_start: ["name", "locale", "form_factor"],
  inquiry_submit_success: ["name", "locale", "form_factor", "service_category"],
  language_change: ["name", "locale", "form_factor", "to_locale"],
  service_finder_complete: ["name", "locale", "form_factor", "intent_id", "outcome"],
  resource_engage: ["name", "locale", "form_factor", "action", "guide_id", "category_id", "source_id"],
};

const emailLike = /@/;
const longDigits = /\d{7,}/;

export type MeasurementResult =
  | { ok: true; stored: false; reason: "collection-disabled"; event: MeasurementEvent }
  | { ok: false; stored: false; reason: "invalid" | "sensitive" };

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function containsSensitive(value: unknown): boolean {
  if (Array.isArray(value)) return value.some(containsSensitive);
  if (typeof value === "string") {
    return value.length > 64 || emailLike.test(value) || longDigits.test(value) || /\s/.test(value);
  }
  if (!isRecord(value)) return false;
  return Object.entries(value).some(([key, entry]) => {
    if (forbiddenKeys.has(key.toLowerCase())) return true;
    return containsSensitive(entry);
  });
}

function hasUnknownKey(value: Record<string, unknown>): boolean {
  const name = value.name;
  if (typeof name !== "string" || !measurementEventNames.includes(name as MeasurementEventName)) return false;
  const allowed = new Set(allowedKeys[name as MeasurementEventName]);
  return Object.keys(value).some((key) => !allowed.has(key));
}

/**
 * Validates an event and refuses to store it.
 * This module has no analytics store. A valid event is discarded.
 * `measurementCollectionEnabled` stays false until a privacy notice is approved.
 */
export function acceptMeasurement(input: unknown): MeasurementResult {
  if (containsSensitive(input)) return { ok: false, stored: false, reason: "sensitive" };
  if (isRecord(input) && hasUnknownKey(input)) return { ok: false, stored: false, reason: "invalid" };
  const parsed = measurementEventSchema.safeParse(input);
  if (!parsed.success) return { ok: false, stored: false, reason: "invalid" };
  return { ok: true, stored: false, reason: "collection-disabled", event: parsed.data };
}
