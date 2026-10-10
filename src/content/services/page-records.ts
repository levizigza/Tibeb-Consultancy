import type { ComplianceServiceId } from "@/content/compliance/schema";
import {
  servicePageRecordSchema,
  type ServicePageRecord,
} from "@/content/services/page-schema";

const blockedIds = [
  "permanent-residence",
  "travel-documents",
  "form-completion",
  "cra-services",
  "service-canada",
  "citizenship",
  "bookkeeping",
  "payroll",
  "personal-tax",
] as const satisfies readonly ComplianceServiceId[];

const draftIds = ["resume-writing", "job-applications"] as const satisfies readonly ComplianceServiceId[];

function emptyPage(id: ComplianceServiceId, publicationStatus: "draft" | "blocked"): ServicePageRecord {
  return {
    id,
    publicationStatus,
    title: null,
    description: null,
    audience: null,
    problem: null,
    deliverables: [],
    inclusions: [],
    exclusions: [],
    requiredInformation: [],
    steps: [],
    priceNote: null,
    turnaround: null,
    faqs: [],
    disclosures: [],
  };
}

/**
 * One structured record for each proposed topic.
 * Marketing fields stay empty until the owner supplies them and the compliance gate opens.
 * Regulated topics are blocked. Career topics are drafts because their scope is still unconfirmed.
 */
export const servicePageRecords: readonly ServicePageRecord[] = [
  ...blockedIds.map((id) => emptyPage(id, "blocked")),
  ...draftIds.map((id) => emptyPage(id, "draft")),
];

export function servicePageRecordsParse(): boolean {
  return servicePageRecords.every((record) => servicePageRecordSchema.safeParse(record).success);
}
