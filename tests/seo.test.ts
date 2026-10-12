import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import sitemap from "@/app/sitemap";
import { ServicePageView } from "@/components/services/service-page-view";
import { previewCopyIssues } from "@/content/site/preview-questions";
import { pageSearchFields } from "@/content/site/search-metadata";
import { allPublicPaths, servicePages } from "@/content/site/information-architecture";
import { buildServicePageModel } from "@/content/services/page-model";
import { localePageMetadata } from "@/i18n/metadata";
import { breadcrumbJsonLd } from "@/lib/seo/json-ld";
import {
  buildRobots,
  collectIndexablePaths,
  localizedPathIsIndexable,
  searchUrls,
  type SearchCatalog,
} from "@/lib/seo/indexability";
import { publicSiteOrigin } from "@/lib/seo/origin";
import { googleBusinessProfileAssessment, organizationJsonLd } from "@/lib/seo/public-graph";

const origin = "https://example.com";

function launched(readyLocales: SearchCatalog["readyLocales"], indexablePaths: string[]): SearchCatalog {
  return {
    launchApproved: true,
    origin,
    allPaths: allPublicPaths(),
    indexablePaths,
    readyLocales,
  };
}

describe("technical SEO", () => {
  it("keeps the preview out of the sitemap and robots file", () => {
    expect(publicSiteOrigin(undefined)).toBeNull();
    expect(publicSiteOrigin("http://example.com")).toBeNull();
    expect(publicSiteOrigin("https://example.com/preview")).toBeNull();
    expect(sitemap()).toEqual([]);
    expect(buildRobots()).toEqual({
      rules: { userAgent: "*", disallow: "/" },
    });
    expect(localizedPathIsIndexable("/", "en")).toBe(false);
    expect(localizedPathIsIndexable("/services/career-employment/resume-writing", "en")).toBe(false);
  });

  it("indexes only approved shell, service, family, guide, and price paths after launch", () => {
    expect(collectIndexablePaths()).toEqual([
      "/",
      "/services",
      "/how-it-works",
      "/about",
      "/resources",
      "/contact",
    ]);

    const catalog = launched(["en"], ["/", "/contact", "/resources/resume-information"]);
    expect(searchUrls(catalog).map((entry) => entry.path)).toEqual([
      "/en",
      "/en/contact",
      "/en/resources/resume-information",
    ]);
    expect(localizedPathIsIndexable("/pricing", "en", catalog)).toBe(false);
    expect(localizedPathIsIndexable("/", "am", catalog)).toBe(false);
    expect(buildRobots(catalog).rules).toMatchObject({ allow: "/", userAgent: "*" });
    const disallow = buildRobots(catalog).rules;
    expect(Array.isArray(disallow) ? disallow : disallow?.disallow).toEqual(
      expect.arrayContaining(["/am", "/ti", "/om", "/en/pricing", "/en/development"]),
    );
    expect(buildRobots(catalog).sitemap).toBe("https://example.com/sitemap.xml");
  });

  it("adds reciprocal language URLs only for approved locales", () => {
    const catalog = launched(["en", "am"], ["/services"]);
    const urls = searchUrls(catalog);
    expect(urls.map((entry) => entry.path)).toEqual(["/en/services", "/am/services"]);
    expect(urls[0]?.languages).toEqual(urls[1]?.languages);
    expect(urls[0]?.languages).toEqual({
      "x-default": "https://example.com/en/services",
      en: "https://example.com/en/services",
      am: "https://example.com/am/services",
    });
    expect(urls[0]?.languages).not.toHaveProperty("ti");
  });

  it("gives every route a unique honest description and a clean path", () => {
    const fields = allPublicPaths().map((path) => {
      const entry = pageSearchFields(path);
      expect(entry, path).not.toBeNull();
      return { path, ...entry! };
    });
    expect(new Set(fields.map((entry) => entry.description)).size).toBe(fields.length);
    expect(new Set(fields.map((entry) => `${entry.title} ${entry.path}`)).size).toBe(fields.length);

    for (const entry of fields) {
      expect(entry.path).toMatch(/^\/(?:[a-z0-9-]+(?:\/[a-z0-9-]+)*)?$/);
      expect(entry.description.length).toBeGreaterThan(40);
      expect(entry.description.length).toBeLessThan(320);
      expect(previewCopyIssues(entry.description)).toEqual([]);
      expect(entry.description).not.toMatch(/\b(best|cheap|guaranteed|#1)\b/i);
    }

    const metadata = localePageMetadata({
      locale: "en",
      path: "/services/career-employment/resume-writing",
    });
    expect(metadata.title).toBe("Resume writing");
    expect(metadata.description).toContain("does not start the work");
    expect(metadata.robots).toEqual({ index: false, follow: false });
    expect(metadata.alternates?.canonical).toBe("/en/services/career-employment/resume-writing");
  });

  it("renders one heading and related links on a closed service page", () => {
    const page = servicePages[0];
    const model = buildServicePageModel(page.familyId, page.id, "en");
    expect(model?.mode).toBe("closed");
    const html = renderToStaticMarkup(createElement(ServicePageView, { model: model!, locale: "en" }));
    expect(html.match(/<h1[\s>]/g)).toHaveLength(1);
    expect(html).toContain("Official pages");
    expect(html).toContain("Other pages in this group");
    expect(html).toContain(`href="/en/services/${page.familyId}"`);
  });

  it("withholds location, review, and organization markup until the facts exist", () => {
    expect(organizationJsonLd("https://example.com")).toBeNull();
    expect(googleBusinessProfileAssessment()).toEqual({
      publishListing: false,
      hasVerifiedAddress: false,
      hasVerifiedServiceArea: false,
      note: "No verified street address or service area is on file. Do not add a city, a street address, a rating, or a customer review.",
    });
    const graph = breadcrumbJsonLd(
      [
        { label: "Home", path: "/en" },
        { label: "Services", path: "/en/services" },
      ],
      origin,
    );
    expect(JSON.stringify(graph)).not.toMatch(/aggregateRating|review|address|LocalBusiness/i);
    expect(graph).toMatchObject({
      "@type": "BreadcrumbList",
      itemListElement: [
        { position: 1, name: "Home", item: "https://example.com/en" },
        { position: 2, name: "Services", item: "https://example.com/en/services" },
      ],
    });
    expect(breadcrumbJsonLd([{ label: "Home", path: "/en" }], null)).toBeNull();
  });
});
