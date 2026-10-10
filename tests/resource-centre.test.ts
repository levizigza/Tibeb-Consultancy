import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { buildBreadcrumbs } from "@/components/layout/breadcrumbs";
import { GuideArticle } from "@/components/resources/guide-article";
import { GuideIndex } from "@/components/resources/guide-index";
import { resourceCategories } from "@/content/resources/categories";
import { resourceGuides } from "@/content/resources/guides";
import { localePageMetadata } from "@/i18n/metadata";
import { topicsForPath } from "@/i18n/review/units";
import {
  guideIsPublic,
  guidePresentation,
  guidePresentations,
  guidesNeedingProfessionalReview,
} from "@/content/resources/publication";
import { previewCopyIssues } from "@/content/site/preview-questions";

describe("resource catalogue", () => {
  it("keeps every starter guide unpublished and names no reviewer", () => {
    expect(resourceGuides).toHaveLength(5);
    expect(resourceCategories.map((category) => category.id)).toContain("payroll-fundamentals");
    expect(resourceGuides.some((guide) => guide.categoryId === "payroll-fundamentals")).toBe(false);
    for (const guide of resourceGuides) {
      expect(guide.reviewer).toBeNull();
      expect(guide.publishedOn).toBeNull();
      expect(guide.lastReviewed).toBeNull();
      expect(guide.nextReview).toBeNull();
      expect(guide.sourceLocale).toBe("en");
      expect(guideIsPublic(guide)).toBe(false);
    }
    expect(guidePresentations("en").every((guide) => guide.published === false)).toBe(true);
    expect(guidePresentations("am").every((guide) => guide.translationStatus === "missing")).toBe(true);
    expect(guidesNeedingProfessionalReview().map((guide) => guide.id)).toEqual([
      "tax-appointment-documents",
      "small-business-bookkeeping",
      "official-government-forms",
    ]);
    expect(topicsForPath("/resources/tax-appointment-documents")).toEqual(["tax"]);
    expect(topicsForPath("/resources/small-business-bookkeeping")).toEqual(["tax"]);
    expect(topicsForPath("/resources/official-government-forms")).toEqual(["government-authorization"]);
    expect(previewCopyIssues(resourceGuides.map((guide) => guide.summary).join(" "))).toEqual([]);
  });

  it("publishes a guide only when a named reviewer, dates, and required sources are present", () => {
    const resume = resourceGuides.find((guide) => guide.id === "resume-information");
    const tax = resourceGuides.find((guide) => guide.id === "tax-appointment-documents");
    expect(resume).toBeDefined();
    expect(tax).toBeDefined();
    const dates = { publishedOn: "2026-10-10", lastReviewed: "2026-10-10", nextReview: "2027-04-10" };
    expect(
      guideIsPublic({
        ...resume!,
        ...dates,
        reviewer: "Owner",
        publicationStatus: "approved",
        verification: "verified",
      }),
    ).toBe(true);
    expect(
      guideIsPublic({
        ...tax!,
        ...dates,
        reviewer: "Owner",
        publicationStatus: "approved",
        verification: "verified",
        sourceIds: [],
      }),
    ).toBe(false);
  });
});

describe("resource pages", () => {
  it("lists categories, withholds draft steps, and keeps guides out of the index", () => {
    const guides = guidePresentations("en");
    const markup = renderToStaticMarkup(createElement(GuideIndex, { locale: "en", guides }));
    expect(markup).toContain("Payroll fundamentals");
    expect(markup).toContain("No guide in this category is published.");
    expect(markup).toContain('type="button"');
    expect(markup).toContain('aria-pressed="true"');
    expect(markup).toContain("Not published");
    expect(markup).not.toContain("Facts to gather");
    expect(markup).not.toContain("Papers to set aside");

    const article = renderToStaticMarkup(
      createElement(GuideArticle, {
        locale: "om",
        guide: guidePresentation("official-government-forms", "om")!,
      }),
    );
    expect(article).toContain("<h1");
    expect(article).toContain('lang="en"');
    expect(article).toContain("https://www.canada.ca/en/revenue-agency/services/forms-publications.html");
    expect(article).toContain("No reviewer is recorded.");
    expect(article).toContain('href="/om/resources/administrative-assistance"');
    expect(article).not.toContain("Which office publishes the form");
    expect((article.match(/<h1/g) ?? []).length).toBe(1);

    const metadata = localePageMetadata({
      locale: "en",
      path: "/resources/official-government-forms",
      title: "Where to find official Canadian government forms.",
      description: "A draft that names official pages where government forms are published.",
    });
    expect(metadata.robots).toEqual({ index: false, follow: false });
    expect(buildBreadcrumbs("/en/resources/official-government-forms").map((crumb) => crumb.label)).toEqual([
      "Home",
      "Resources",
      "Where to find official Canadian government forms.",
    ]);
    expect(metadata.title).toBe("Where to find official Canadian government forms.");
  });

  it("renders approved sections when the gate is open", () => {
    const live = guidePresentation("resume-information", "en");
    expect(live).not.toBeNull();
    const markup = renderToStaticMarkup(
      createElement(GuideArticle, {
        locale: "en",
        guide: {
          ...live!,
          published: true,
          reviewer: "Owner",
          sections: resourceGuides[0].sections,
        },
      }),
    );
    expect(markup).toContain("Facts to gather");
    expect(markup).toContain("Published");
  });
});
