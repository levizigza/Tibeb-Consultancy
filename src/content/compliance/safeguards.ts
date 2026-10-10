import { complianceRecords } from "@/content/compliance/records";
import {
  complianceRecordSchema,
  containsProhibitedServiceClaim,
  type ComplianceRecord,
} from "@/content/compliance/schema";
import { hasText } from "@/content/model/claim";

export function isPaidServiceBookable(record: unknown): boolean {
  const parsed = complianceRecordSchema.safeParse(record);
  if (!parsed.success) return false;
  const item = parsed.data;
  if (item.legalApprovalObtained !== false) return false;
  if (item.paidOfferingStatus !== "open" || item.bookingAvailability !== "available") return false;
  if (item.reviewStatus !== "owner-approved-to-publish") return false;
  if (!hasText(item.ownerResponsible.name) || item.ownerReviewedOn === null) return false;
  if (!hasText(item.approvedPublicWording)) return false;
  if (containsProhibitedServiceClaim(item.approvedPublicWording)) return false;
  if (item.requiresRegulatoryReview) {
    return item.credentialVerification === "verified" && item.authorizationStatus === "granted";
  }
  return item.authorizationStatus === "granted" || item.authorizationStatus === "not-required";
}

export function serviceBlockedByCompliance(serviceId: string): boolean {
  const linked = complianceRecords.filter((record) => record.relatedServiceIds.includes(serviceId));
  if (linked.length === 0) return false;
  return linked.some((record) => !isPaidServiceBookable(record));
}

export function getBookableServices(): { id: ComplianceRecord["id"] }[] {
  return complianceRecords.flatMap((record) =>
    isPaidServiceBookable(record) ? [{ id: record.id }] : [],
  );
}

export function getPublicInformationPages(): { id: ComplianceRecord["id"]; outline: string }[] {
  return complianceRecords.flatMap((record) => {
    const parsed = complianceRecordSchema.safeParse(record);
    if (!parsed.success) return [];
    const item = parsed.data;
    if (item.informationPublicationStatus !== "approved") return [];
    if (item.reviewStatus !== "owner-approved-to-publish") return [];
    if (!hasText(item.informationOutline)) return [];
    if (containsProhibitedServiceClaim(item.informationOutline)) return [];
    return [{ id: item.id, outline: item.informationOutline }];
  });
}
