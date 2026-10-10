import { z } from "zod";
import { hasText } from "@/content/model/claim";
import { authorizationStatuses } from "@/content/model/status";
import { serviceCategoryIds } from "@/content/services/categories";

export const complianceServiceIds = [
  "permanent-residence",
  "travel-documents",
  "form-completion",
  "resume-writing",
  "job-applications",
  "cra-services",
  "service-canada",
  "citizenship",
  "bookkeeping",
  "payroll",
  "personal-tax",
] as const;

export type ComplianceServiceId = (typeof complianceServiceIds)[number];

export const complianceReviewStatuses = [
  "needs-professional-review",
  "needs-owner-decision",
  "owner-approved-to-publish",
] as const;

export const prohibitedServiceClaims = [
  "legal approval has been obtained",
  "authorized by ircc",
  "authorized by the cra",
  "official partner",
  "we represent you",
  "tibeb represents",
  "tibeb is licensed",
  "available for booking",
] as const;

export function containsProhibitedServiceClaim(value: string): boolean {
  const normalized = value.toLowerCase();
  return prohibitedServiceClaims.some((phrase) => normalized.includes(phrase));
}

export const complianceRecordSchema = z
  .object({
    id: z.enum(complianceServiceIds),
    categoryId: z.enum(serviceCategoryIds),
    relatedServiceIds: z.array(z.string().trim().min(1)).min(1),
    requiresRegulatoryReview: z.boolean(),
    legalApprovalObtained: z.literal(false),
    paidOfferingStatus: z.enum(["closed", "open"]),
    bookingAvailability: z.enum(["unavailable", "available"]),
    informationPublicationStatus: z.enum(["not-published", "internal-draft", "approved"]),
    reviewStatus: z.enum(complianceReviewStatuses),
    credentialVerification: z.enum(["unverified", "verified"]),
    authorizationStatus: z.enum(authorizationStatuses),
    ownerResponsible: z.object({
      role: z.literal("business-owner"),
      name: z.string().nullable(),
    }),
    sourceReviewedOn: z.iso.date(),
    ownerReviewedOn: z.iso.date().nullable(),
    sourceIds: z.array(z.string().trim().min(1)).min(1),
    activitiesContemplated: z.array(z.string().trim().min(1)).min(1),
    activitiesRequiringAuthorization: z.array(z.string().trim().min(1)).min(1),
    credentialsToVerify: z.array(z.string().trim().min(1)).min(1),
    approvedPublicWording: z.string().nullable(),
    disclaimerRequirements: z.array(z.string().trim().min(1)).min(1),
    consentRequirements: z.array(z.string().trim().min(1)).min(1),
    informationOutline: z.string().nullable(),
  })
  .superRefine((record, context) => {
    const offeringOpen =
      record.paidOfferingStatus === "open" || record.bookingAvailability === "available";
    if (offeringOpen) {
      if (record.paidOfferingStatus !== "open" || record.bookingAvailability !== "available") {
        context.addIssue({
          code: "custom",
          message: "A paid offer cannot be bookable unless both the offering and the booking flag are open.",
        });
      }
      if (record.reviewStatus !== "owner-approved-to-publish") {
        context.addIssue({
          code: "custom",
          message: "Owner approval is required before a paid offer can be booked.",
        });
      }
      if (!hasText(record.ownerResponsible.name) || record.ownerReviewedOn === null) {
        context.addIssue({
          code: "custom",
          message: "The named business owner and review date are required before booking.",
        });
      }
      if (!hasText(record.approvedPublicWording)) {
        context.addIssue({
          code: "custom",
          message: "Approved public wording is required before booking.",
        });
      }
      if (
        record.requiresRegulatoryReview &&
        (record.credentialVerification !== "verified" || record.authorizationStatus !== "granted")
      ) {
        context.addIssue({
          code: "custom",
          message: "Regulatory review must be verified and authorization granted before booking.",
        });
      }
    }

    if (record.informationPublicationStatus === "approved") {
      if (record.reviewStatus !== "owner-approved-to-publish" || !hasText(record.informationOutline)) {
        context.addIssue({
          code: "custom",
          message: "An information page needs owner approval and an outline.",
        });
      }
    }

    const publicText = [record.approvedPublicWording, record.informationOutline]
      .filter((value): value is string => typeof value === "string")
      .join(" ");
    if (containsProhibitedServiceClaim(publicText)) {
      context.addIssue({
        code: "custom",
        message: "Copy must not claim legal approval, government affiliation, or a licence the business has not verified.",
      });
    }
  });

export type ComplianceRecord = z.infer<typeof complianceRecordSchema>;

export const officialSourceSchema = z.object({
  id: z.string().trim().min(1),
  title: z.string().trim().min(1),
  publisher: z.string().trim().min(1),
  url: z.url(),
  accessedOn: z.iso.date(),
});

export type OfficialSource = z.infer<typeof officialSourceSchema>;

export const reviewIssueSchema = z.object({
  id: z.string().trim().min(1),
  status: z.literal("open"),
  audience: z.enum(["business-owner", "professional-review"]),
  summary: z.string().trim().min(1),
});

export type ReviewIssue = z.infer<typeof reviewIssueSchema>;
