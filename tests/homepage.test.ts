import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { containsProhibitedServiceClaim } from "@/content/compliance/schema";
import { getPublicFaqs, getPublicTestimonials } from "@/content/retrieve";
import { homePage } from "@/content/translations/home";

const withheldHeadline = "Clear help with important paperwork";

describe("homepage copy", () => {
  it("uses the draft positioning and keeps outcome language off the page", () => {
    const copy = JSON.stringify(homePage);
    const page = readFileSync("src/app/[locale]/page.tsx", "utf8");

    expect(copy).toContain("Black-owned, Ethiopian-led");
    expect(copy).toContain("development draft");
    expect(copy).toContain("No services are approved for publication.");
    expect(copy).toContain("Not approved");
    expect(copy.toLowerCase()).not.toContain(withheldHeadline.toLowerCase());
    expect(page.toLowerCase()).not.toContain(withheldHeadline.toLowerCase());
    expect(containsProhibitedServiceClaim(copy)).toBe(false);
    expect(copy.toLowerCase()).not.toContain("book now");
    expect(copy.toLowerCase()).not.toContain("get started");
    expect(copy.toLowerCase()).not.toContain("guaranteed");
  });

  it("points the contact and services actions at real routes", () => {
    expect(homePage.contactPath).toBe("/contact");
    expect(homePage.contactLabel).toBe("Contact");
    expect(homePage.servicesPath).toBe("/services");
  });

  it("has no approved testimonials or questions to show", () => {
    expect(getPublicTestimonials()).toEqual([]);
    expect(getPublicFaqs("en")).toEqual([]);
    expect(homePage.evidenceEmpty.length).toBeGreaterThan(0);
    expect(homePage.faqEmpty.length).toBeGreaterThan(0);
  });
});
