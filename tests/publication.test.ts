import { describe, expect, it } from "vitest";
import { isEstablishedPublicClaim } from "@/content/model/claim";
import { serviceCategories } from "@/content/services/categories";
import {
  getPublicOfferings,
  isPubliclyApprovedOffering,
} from "@/content/services/publication";
import { services } from "@/content/services/services";
import type { ServiceRecord } from "@/content/services/schema";
import { localeCodes } from "@/i18n/locales";
import { isPortalEnabled } from "@/lib/portal/availability";

const approvedLocale = {
  publicationStatus: "approved" as const,
  verification: "verified" as const,
  title: "Fixture career help",
  description: "Used only to prove the gate can open.",
  audience: "Fixture audience",
  scopeOfWork: "Fixture scope",
  restrictions: "Fixture restrictions",
  exclusions: "Fixture exclusions",
};

const approvedCareerFixture: ServiceRecord = {
  id: "fixture-career",
  categoryId: "career-employment",
  credentialIds: [],
  pricingId: null,
  verification: "verified",
  publicationStatus: "approved",
  authorizationStatus: "not-required",
  requiresRegulatoryReview: false,
  lastReviewed: "2026-01-15",
  locales: { en: approvedLocale },
};

const publicCredential = {
  id: "fixture-credential",
  title: "Fixture credential",
  issuer: "Fixture issuer",
  identifier: null,
  holderId: null,
  verification: "verified" as const,
  publicationStatus: "approved" as const,
  authorizationStatus: "not-required" as const,
  requiresRegulatoryReview: false,
  lastReviewed: "2026-01-15",
};

const publicPrice = {
  id: "fixture-price",
  serviceId: "fixture-career",
  amountCad: 100,
  inclusions: ["Fixture inclusion"],
  verification: "verified" as const,
  publicationStatus: "approved" as const,
  authorizationStatus: "not-required" as const,
  requiresRegulatoryReview: false,
  lastReviewed: "2026-01-15",
};

describe("service publication", () => {
  it("defines the four service categories", () => {
    expect(serviceCategories.map((category) => category.id)).toEqual([
      "immigration-citizenship",
      "government-forms",
      "career-employment",
      "tax-business-administration",
    ]);
  });

  it("publishes nothing from the live catalog in any locale", () => {
    for (const locale of localeCodes) {
      expect(getPublicOfferings(locale)).toEqual([]);
    }
  });

  it("keeps internal restricted wording out of the public catalog", () => {
    const internalNames = services
      .flatMap((service) => Object.values(service.locales))
      .map((locale) => locale?.title ?? "")
      .join(" ")
      .toLowerCase();
    const publicNames = localeCodes
      .flatMap((locale) => getPublicOfferings(locale).map((offering) => offering.name))
      .join(" ")
      .toLowerCase();

    expect(internalNames).toContain("citizenship");
    expect(publicNames).not.toContain("citizenship");
  });

  it("rejects every publication status other than approved", () => {
    for (const publicationStatus of ["draft", "verified", "blocked", "retired"] as const) {
      expect(
        isPubliclyApprovedOffering(
          { ...approvedCareerFixture, publicationStatus },
          "en",
        ),
      ).toBe(false);
    }
  });

  it("keeps factual verification separate from publication approval", () => {
    expect(
      isEstablishedPublicClaim({
        verification: "verified",
        publicationStatus: "verified",
        authorizationStatus: "not-required",
        requiresRegulatoryReview: false,
        lastReviewed: "2026-01-15",
        valuePresent: true,
      }),
    ).toBe(false);
    expect(
      isPubliclyApprovedOffering(
        { ...approvedCareerFixture, verification: "unverified" },
        "en",
      ),
    ).toBe(false);
  });

  it("rejects a record with no last-reviewed date", () => {
    expect(
      isPubliclyApprovedOffering({ ...approvedCareerFixture, lastReviewed: null }, "en"),
    ).toBe(false);
  });

  it("rejects regulated work unless authorization is granted", () => {
    for (const authorizationStatus of ["not-required", "pending", "denied"] as const) {
      expect(
        isPubliclyApprovedOffering(
          {
            ...approvedCareerFixture,
            categoryId: "immigration-citizenship",
            requiresRegulatoryReview: false,
            authorizationStatus,
          },
          "en",
        ),
      ).toBe(false);
    }
  });

  it("accepts a regulated fixture only when authorization is granted", () => {
    expect(
      isPubliclyApprovedOffering(
        {
          ...approvedCareerFixture,
          categoryId: "immigration-citizenship",
          requiresRegulatoryReview: true,
          authorizationStatus: "granted",
        },
        "en",
      ),
    ).toBe(true);
  });

  it("rejects blank restrictions or exclusions", () => {
    expect(
      isPubliclyApprovedOffering(
        {
          ...approvedCareerFixture,
          locales: { en: { ...approvedLocale, exclusions: " " } },
        },
        "en",
      ),
    ).toBe(false);
  });

  it("rejects a service that cites a credential that is not publicly approved", () => {
    expect(
      isPubliclyApprovedOffering(
        { ...approvedCareerFixture, credentialIds: ["missing-credential"] },
        "en",
      ),
    ).toBe(false);
    expect(
      isPubliclyApprovedOffering(
        { ...approvedCareerFixture, credentialIds: [publicCredential.id] },
        "en",
        { credentials: [{ ...publicCredential, verification: "unverified" }] },
      ),
    ).toBe(false);
    expect(
      isPubliclyApprovedOffering(
        { ...approvedCareerFixture, credentialIds: [publicCredential.id] },
        "en",
        { credentials: [publicCredential] },
      ),
    ).toBe(true);
  });

  it("rejects a service whose price is not publicly approved", () => {
    expect(
      isPubliclyApprovedOffering(
        { ...approvedCareerFixture, pricingId: publicPrice.id },
        "en",
        { prices: [{ ...publicPrice, amountCad: null }] },
      ),
    ).toBe(false);
    expect(
      isPubliclyApprovedOffering(
        { ...approvedCareerFixture, pricingId: publicPrice.id },
        "en",
        { prices: [publicPrice] },
      ),
    ).toBe(true);
  });

  it("rejects an approved English record when the requested translation is missing", () => {
    expect(isPubliclyApprovedOffering(approvedCareerFixture, "en")).toBe(true);
    expect(isPubliclyApprovedOffering(approvedCareerFixture, "am")).toBe(false);
  });

  it("fails closed when the record does not match the schema", () => {
    expect(isPubliclyApprovedOffering({ id: "broken" }, "en")).toBe(false);
  });

  it("leaves the client portal disabled", () => {
    expect(isPortalEnabled()).toBe(false);
  });
});
