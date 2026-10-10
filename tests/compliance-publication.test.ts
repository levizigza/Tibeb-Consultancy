import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { reviewIssues } from "@/content/compliance/issues";
import { complianceRecords } from "@/content/compliance/records";
import {
  complianceRecordSchema,
  complianceServiceIds,
  containsProhibitedServiceClaim,
} from "@/content/compliance/schema";
import { officialSources } from "@/content/compliance/sources";
import {
  getBookableServices,
  getPublicInformationPages,
  isPaidServiceBookable,
} from "@/content/compliance/safeguards";
import { getPublicContent } from "@/content/retrieve";
import { isPubliclyApprovedOffering } from "@/content/services/publication";
import { services } from "@/content/services/services";

const matrix = readFileSync("docs/SERVICE_COMPLIANCE_MATRIX.md", "utf8");

const clearedFixture = {
  ...complianceRecords[0],
  paidOfferingStatus: "open" as const,
  bookingAvailability: "available" as const,
  reviewStatus: "owner-approved-to-publish" as const,
  credentialVerification: "verified" as const,
  authorizationStatus: "granted" as const,
  ownerResponsible: { role: "business-owner" as const, name: "Fixture owner" },
  ownerReviewedOn: "2026-10-09",
  approvedPublicWording: "Fixture wording for a detached test record.",
};

describe("service compliance safeguards", () => {
  it("keeps every proposed paid service closed and unpublished", () => {
    expect(complianceRecords.map((record) => record.id)).toEqual([...complianceServiceIds]);
    for (const record of complianceRecords) {
      expect(record.legalApprovalObtained).toBe(false);
      expect(record.paidOfferingStatus).toBe("closed");
      expect(record.bookingAvailability).toBe("unavailable");
      expect(record.approvedPublicWording).toBeNull();
      expect(record.ownerResponsible.name).toBeNull();
      expect(record.credentialVerification).toBe("unverified");
      expect(isPaidServiceBookable(record)).toBe(false);
    }
    expect(getBookableServices()).toEqual([]);
    expect(getPublicInformationPages()).toEqual([]);
    expect(getPublicContent("en").bookableServices).toEqual([]);
    expect(getPublicContent("en").informationPages).toEqual([]);
  });

  it("does not publish a catalog service while a linked compliance record is blocked", () => {
    const career = services.find((service) => service.id === "career-document-assistance");
    expect(career).toBeDefined();
    expect(
      isPubliclyApprovedOffering(
        {
          ...career,
          verification: "verified",
          publicationStatus: "approved",
          lastReviewed: "2026-01-15",
          locales: {
            en: {
              publicationStatus: "approved",
              verification: "verified",
              title: "Fixture career help",
              description: "Used only to prove the compliance hold.",
              audience: "Fixture audience",
              scopeOfWork: "Fixture scope",
              restrictions: "Fixture restrictions",
              exclusions: "Fixture exclusions",
            },
          },
        },
        "en",
      ),
    ).toBe(false);
  });

  it("rejects a booking that skips owner approval or verified authorization", () => {
    expect(complianceRecordSchema.safeParse({ ...clearedFixture, legalApprovalObtained: true }).success).toBe(
      false,
    );
    expect(
      isPaidServiceBookable({ ...clearedFixture, credentialVerification: "unverified" }),
    ).toBe(false);
    expect(
      isPaidServiceBookable({
        ...clearedFixture,
        approvedPublicWording: "This record says legal approval has been obtained.",
      }),
    ).toBe(false);
    expect(isPaidServiceBookable(clearedFixture)).toBe(true);
    expect(getBookableServices()).toEqual([]);
  });

  it("rejects an information page that claims a regulated service", () => {
    expect(containsProhibitedServiceClaim("We represent you before the department.")).toBe(true);
    expect(
      complianceRecordSchema.safeParse({
        ...complianceRecords[0],
        informationPublicationStatus: "approved",
        reviewStatus: "owner-approved-to-publish",
        informationOutline: "TIBEB represents clients.",
      }).success,
    ).toBe(false);
  });

  it("keeps the source register and the open review list tied to the matrix", () => {
    expect(officialSources.length).toBeGreaterThan(0);
    expect(reviewIssues.every((issue) => issue.status === "open")).toBe(true);
    expect(matrix).toContain("Legal approval has not been obtained");
    expect(matrix).toContain("does not replace professional legal or regulatory advice");
    for (const id of complianceServiceIds) {
      expect(matrix).toContain(id);
    }
    for (const source of officialSources) {
      expect(matrix).toContain(source.url);
    }
  });
});
