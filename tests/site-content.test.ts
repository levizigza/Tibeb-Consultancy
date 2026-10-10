import { describe, expect, it } from "vitest";
import { developmentPage } from "@/content/translations/development";
import { previewCopy } from "@/content/translations/preview";
import { defaultLocale, localeCodes, locales } from "@/i18n/locales";
import robots from "@/app/robots";

const unpublishedClaims = [
  "cra",
  "service canada",
  "citizenship",
  "bookkeeping",
  "payroll",
  "rcic",
  "guaranteed",
];

describe("development site content", () => {
  it("identifies the business and states that the site is still being built", () => {
    expect(previewCopy.previewLabel).toBe("Development preview");
    expect(previewCopy.statusTitle).toBe("This site is being built");
    expect(previewCopy.documentationPath).toBe("/development");
    expect(previewCopy.publishedServicesEmpty).toBe(
      "No services are approved for publication.",
    );
  });

  it("keeps unconfirmed services out of public copy", () => {
    const publicCopy = [
      previewCopy.description,
      previewCopy.introduction,
      previewCopy.statusBody,
      previewCopy.languagesNote,
      previewCopy.publishedServicesTitle,
      previewCopy.publishedServicesEmpty,
      developmentPage.summary,
      developmentPage.repositoryNote,
      developmentPage.catalogNote,
      ...developmentPage.docs.map((doc) => `${doc.path} ${doc.purpose}`),
    ]
      .join(" ")
      .toLowerCase();

    for (const claim of unpublishedClaims) {
      expect(publicCopy).not.toContain(claim);
    }
  });

  it("prepares four locales and publishes development copy in English only", () => {
    expect(locales.map((locale) => locale.code)).toEqual([...localeCodes]);
    expect(defaultLocale).toBe("en");
    expect(
      locales
        .filter((locale) => locale.script === "ethiopic")
        .map((locale) => locale.code),
    ).toEqual(["am", "ti"]);
    expect(
      locales
        .filter((locale) => locale.translationStatus === "development-copy")
        .map((locale) => locale.code),
    ).toEqual(["en"]);
  });

  it("disallows crawlers while the preview is unpublished", () => {
    expect(robots()).toEqual({
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    });
  });
});
