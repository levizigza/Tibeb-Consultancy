import { describe, expect, it } from "vitest";
import { businessProfile } from "@/content/business/profile";
import { consultationLanguages } from "@/content/business/consultation-languages";
import { previewCopy } from "@/content/translations/preview";
import {
  getPublicContent,
  listOwnerInformationGaps,
  liveCatalogParses,
  selectPublicTestimonials,
} from "@/content/retrieve";
import { localeCodes } from "@/i18n/locales";

const approvedTestimonial = {
  id: "fixture-quote",
  quote: "Fixture quote that is not a client review.",
  attribution: "Fixture client",
  consented: true,
  verification: "verified" as const,
  publicationStatus: "approved" as const,
  authorizationStatus: "not-required" as const,
  requiresRegulatoryReview: false,
  lastReviewed: "2026-01-15",
};

describe("business content catalog", () => {
  it("parses the live catalog and publishes no established claims", () => {
    expect(liveCatalogParses()).toBe(true);

    for (const locale of localeCodes) {
      const content = getPublicContent(locale);
      expect(content.identity).toEqual([]);
      expect(content.people).toEqual([]);
      expect(content.contact).toEqual([]);
      expect(content.hours).toBeNull();
      expect(content.categories).toEqual([]);
      expect(content.services).toEqual([]);
      expect(content.offerings).toEqual([]);
      expect(content.prices).toEqual([]);
      expect(content.credentials).toEqual([]);
      expect(content.consultationLanguages).toEqual([]);
      expect(content.testimonials).toEqual([]);
      expect(content.faqs).toEqual([]);
      expect(content.resources).toEqual([]);
      expect(content.disclosures).toEqual([]);
      expect(content.privacy).toBeNull();
      expect(content.bookableServices).toEqual([]);
      expect(content.informationPages).toEqual([]);
      expect(JSON.stringify(content)).not.toContain("Ethiopian-led");
      expect(JSON.stringify(content).toLowerCase()).not.toContain("citizenship");
    }
  });

  it("keeps the supplied positioning sentence in the development preview only", () => {
    expect(previewCopy.introduction).toContain(businessProfile.positioning.text);
    expect(businessProfile.positioning.status).toBe("draft");
  });

  it("does not treat website locales as consultation languages", () => {
    expect(localeCodes).toEqual(["en", "am", "ti", "om"]);
    expect(consultationLanguages).toEqual([]);
  });

  it("lists the owner information that is still missing", () => {
    const gaps = listOwnerInformationGaps();
    expect(gaps).toEqual(
      expect.arrayContaining([
        "identity.legal-name",
        "identity.positioning",
        "identity.public-name",
        "contact.email",
        "contact.phone",
        "contact.address",
        "hours.weekly-hours",
        "people.none-recorded",
        "consultation-languages.none-recorded",
        "credentials.none-recorded",
        "pricing.none-recorded",
        "testimonials.none-recorded",
        "faqs.none-recorded",
        "resources.none-recorded",
        "privacy.privacy-notice",
        "disclosures.government-relationship",
        "service.immigration-citizenship-assistance",
      ]),
    );
  });

  it("withholds testimonials that lack consent, verification, or publication approval", () => {
    expect(selectPublicTestimonials([approvedTestimonial])).toEqual([
      {
        id: "fixture-quote",
        quote: approvedTestimonial.quote,
        attribution: "Fixture client",
      },
    ]);
    expect(selectPublicTestimonials([{ ...approvedTestimonial, consented: false }])).toEqual([]);
    expect(
      selectPublicTestimonials([{ ...approvedTestimonial, verification: "unverified" }]),
    ).toEqual([]);
    expect(
      selectPublicTestimonials([{ ...approvedTestimonial, publicationStatus: "verified" }]),
    ).toEqual([]);
    expect(selectPublicTestimonials([{ ...approvedTestimonial, quote: null }])).toEqual([]);
  });
});
