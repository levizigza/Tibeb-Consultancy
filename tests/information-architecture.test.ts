import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { complianceServiceIds } from "@/content/compliance/schema";
import { containsProhibitedServiceClaim } from "@/content/compliance/schema";
import { getBookableServices } from "@/content/compliance/safeguards";
import {
  allPublicPaths,
  getServicePage,
  primaryNavigation,
  serviceFamilies,
  servicePages,
  servicesInFamily,
} from "@/content/site/information-architecture";
import { scaffoldCopy } from "@/content/site/scaffold-copy";
import { serviceCategoryIds } from "@/content/services/categories";
import { localeCodes } from "@/i18n/locales";
import { replaceLocaleInPath } from "@/i18n/href";

const architectureDoc = readFileSync("docs/INFORMATION_ARCHITECTURE.md", "utf8");

describe("information architecture", () => {
  it("defines the primary navigation and keeps slugs locale-neutral", () => {
    expect(primaryNavigation.map((item) => item.label)).toEqual([
      "Home",
      "Services",
      "How it works",
      "About",
      "Resources",
      "Contact",
    ]);
    expect(new Set(primaryNavigation.map((item) => item.path)).size).toBe(primaryNavigation.length);
    for (const item of primaryNavigation) {
      expect(item.label.trim().length).toBeGreaterThan(0);
      expect(item.path.startsWith("/")).toBe(true);
    }
    for (const locale of localeCodes) {
      expect(replaceLocaleInPath("/services", locale)).toBe(`/${locale}/services`);
    }
  });

  it("maps every proposed service once, inside the four families", () => {
    expect(serviceFamilies.map((family) => family.id)).toEqual([...serviceCategoryIds]);
    expect(servicePages.map((page) => page.id).sort()).toEqual([...complianceServiceIds].sort());
    expect(new Set(servicePages.map((page) => page.path)).size).toBe(servicePages.length);

    expect(servicesInFamily("immigration-citizenship").map((page) => page.id)).toEqual([
      "permanent-residence",
      "citizenship",
      "travel-documents",
    ]);
    expect(servicesInFamily("government-forms").map((page) => page.id)).toEqual([
      "form-completion",
      "cra-services",
      "service-canada",
    ]);
    expect(servicesInFamily("career-employment").map((page) => page.id)).toEqual([
      "resume-writing",
      "job-applications",
    ]);
    expect(servicesInFamily("tax-business-administration").map((page) => page.id)).toEqual([
      "bookkeeping",
      "payroll",
      "personal-tax",
    ]);

    for (const page of servicePages) {
      expect(page.path).toBe(`/services/${page.familyId}/${page.id}`);
      expect(getServicePage(page.familyId, page.id)).toBe(page);
    }
    expect(getServicePage("career-employment", "citizenship")).toBeUndefined();
  });

  it("keeps scaffold copy from offering a closed service", () => {
    const copy = JSON.stringify(scaffoldCopy);
    expect(containsProhibitedServiceClaim(copy)).toBe(false);
    expect(copy.toLowerCase()).not.toContain("book now");
    expect(copy.toLowerCase()).not.toContain("buy now");
    expect(getBookableServices()).toEqual([]);
    expect(allPublicPaths()).toEqual(
      expect.arrayContaining([
        "/",
        "/services",
        "/how-it-works",
        "/about",
        "/resources",
        "/contact",
        "/services/government-forms/cra-services",
        "/development",
      ]),
    );
  });

  it("documents the sitemap paths", () => {
    for (const path of allPublicPaths()) {
      expect(architectureDoc).toContain(path === "/" ? "`/`" : `\`${path}\``);
    }
  });
});
