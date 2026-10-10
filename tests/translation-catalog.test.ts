import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

vi.mock("next/font/google", () => ({
  Noto_Sans: () => ({ variable: "font-sans", className: "font-sans" }),
  Noto_Sans_Ethiopic: () => ({ variable: "font-ethiopic", className: "font-ethiopic" }),
}));

import { SiteNavigation } from "@/components/layout/site-navigation";
import { primaryNavigation } from "@/content/site/information-architecture";
import { documentLanguage } from "@/i18n/document-language";
import { replaceLocaleInPath } from "@/i18n/href";
import { localeAlternates } from "@/i18n/metadata";
import { englishChrome, translationCatalogs, type TranslationCatalog } from "@/i18n/messages/catalog";
import { listTranslationGaps, resolveChrome } from "@/i18n/messages/resolve";
import { localeCodes } from "@/i18n/locales";

const nestedPath = "/services/career-employment/resume-writing";

describe("translation catalogs", () => {
  it("keeps four locales and withholds unfinished translations", () => {
    expect(translationCatalogs.map((entry) => entry.locale)).toEqual([...localeCodes]);
    expect(translationCatalogs.find((entry) => entry.locale === "en")?.approval).toBe("development-copy");
    expect(translationCatalogs.every((entry) => entry.machineTranslated === false)).toBe(true);
    expect(translationCatalogs.every((entry) => entry.reviewer === null)).toBe(true);

    for (const locale of ["am", "ti", "om"] as const) {
      const entry = translationCatalogs.find((item) => item.locale === locale);
      expect(entry?.messages).toBeNull();
      expect(entry?.approval).toBe("not-started");
      expect(resolveChrome(locale).fallback).toBe(true);
      expect(resolveChrome(locale).renderedLocale).toBe("en");
      expect(resolveChrome(locale).messages.menu).toBe("Menu");
      expect(documentLanguage(locale)).toBe("en");
    }

    expect(resolveChrome("en").fallback).toBe(false);
    expect(listTranslationGaps().map((gap) => gap.locale).sort()).toEqual(["am", "om", "ti"]);
    expect(listTranslationGaps().every((gap) => gap.issue === "unapproved")).toBe(true);
  });

  it("matches the English navigation labels and does not offer a consultation from the switcher", () => {
    for (const item of primaryNavigation) {
      expect(englishChrome.nav[item.id]).toBe(item.label);
    }
    expect(englishChrome.languageMenuNote.toLowerCase()).toContain("not a consultation language");
    expect(englishChrome.inquiry.submit.toLowerCase()).not.toContain("book");
  });

  it("rejects machine translation and a blank approved string", () => {
    const machine: TranslationCatalog = {
      locale: "am",
      approval: "approved",
      reviewedOn: "2026-10-10",
      reviewer: null,
      machineTranslated: true,
      messages: englishChrome,
    };
    expect(resolveChrome("am", [translationCatalogs[0], machine]).renderedLocale).toBe("en");
    expect(listTranslationGaps([translationCatalogs[0], machine]).map((gap) => gap.issue)).toEqual([
      "machine-translated",
    ]);

    const blank: TranslationCatalog = {
      locale: "om",
      approval: "approved",
      reviewedOn: "2026-10-10",
      reviewer: null,
      machineTranslated: false,
      messages: { ...englishChrome, menu: " " },
    };
    expect(resolveChrome("om", [translationCatalogs[0], blank]).fallback).toBe(true);
    expect(listTranslationGaps([translationCatalogs[0], blank])).toEqual([
      { locale: "om", issue: "missing-key", approval: "approved", key: "menu" },
    ]);
  });

  it("points canonical and hreflang at the English page until a translation is approved", () => {
    for (const locale of localeCodes) {
      expect(replaceLocaleInPath(`/en${nestedPath}`, locale)).toBe(`/${locale}${nestedPath}`);
    }

    const alternates = localeAlternates(nestedPath, "ti");
    expect(alternates.canonical).toBe(`/en${nestedPath}`);
    expect(alternates.languages).toEqual({
      "x-default": `/en${nestedPath}`,
      en: `/en${nestedPath}`,
    });
    expect(localeAlternates("/pricing", "en").canonical).toBe("/en/pricing");
  });

  it("keeps the same page when the language changes and marks unfinished pages as English", () => {
    const markup = renderToStaticMarkup(
      createElement(SiteNavigation, { locale: "en", pathname: `/en${nestedPath}` }),
    );

    expect(markup).toContain(`href="/am${nestedPath}"`);
    expect(markup).toContain(`href="/ti${nestedPath}"`);
    expect(markup).toContain(`href="/om${nestedPath}"`);
    expect(markup).toContain('hrefLang="en"');
    expect(markup).toContain('lang="am"');
    expect(markup).toContain("አማርኛ");
    expect(markup).toContain("font-ethiopic");
    expect(markup).toContain("not a consultation language");
    expect(markup).not.toContain('lang="am" class="font-ethiopic">Translation');
  });
});
