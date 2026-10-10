import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

vi.mock("next/font/google", () => ({
  Noto_Sans: () => ({ variable: "font-sans", className: "font-sans" }),
  Noto_Sans_Ethiopic: () => ({ variable: "font-ethiopic", className: "font-ethiopic" }),
}));

import { SiteNavigation } from "@/components/layout/site-navigation";
import { TranslationFallback } from "@/components/layout/translation-fallback";
import { documentLanguage } from "@/i18n/document-language";
import { localeCodes, type LocaleCode } from "@/i18n/locales";
import { resolveChrome } from "@/i18n/messages/resolve";
import {
  bodyKeepsLongLinesTogether,
  endonymUsesEthiopic,
  renderedScript,
  shellControlsFit,
} from "@/i18n/review/layout";

const nested = "/services/career-employment/resume-writing";

describe("locale layout", () => {
  it("wraps long lines, fits shell controls, and uses Ethiopic type only for Ethiopic endonyms", () => {
    expect(shellControlsFit()).toBe(true);
    expect(bodyKeepsLongLinesTogether()).toBe(true);
    expect(renderedScript("am")).toBe("latin");
    expect(renderedScript("en")).toBe("latin");
    expect(endonymUsesEthiopic("am")).toBe(true);
    expect(endonymUsesEthiopic("ti")).toBe(true);
    expect(endonymUsesEthiopic("om")).toBe(false);
    expect(endonymUsesEthiopic("en")).toBe(false);
  });

  it("shows an identified English fallback for unfinished locales and keeps the route", () => {
    expect(renderToStaticMarkup(createElement(TranslationFallback, { locale: "en" }))).toBe("");

    for (const locale of ["am", "ti", "om"] as const) {
      const notice = renderToStaticMarkup(createElement(TranslationFallback, { locale }));
      expect(notice).toContain('id="translation-fallback"');
      expect(notice).toContain("not fully localized");
      expect(notice).toContain(`lang="${locale}"`);
      expect(documentLanguage(locale)).toBe("en");
      expect(resolveChrome(locale).fallback).toBe(true);
      expect(resolveChrome(locale).messages.menu).toBe("Menu");

      const nav = renderToStaticMarkup(
        createElement(SiteNavigation, { locale, pathname: `/${locale}${nested}` }),
      );
      for (const code of localeCodes) {
        expect(nav).toContain(`href="/${code}${nested}"`);
      }
      expect(nav).toContain('hrefLang="en"');
    }
  });

  it("uses the Ethiopic font class on Amharic and Tigrinya endonyms only", () => {
    const am = renderToStaticMarkup(createElement(TranslationFallback, { locale: "am" as LocaleCode }));
    const om = renderToStaticMarkup(createElement(TranslationFallback, { locale: "om" }));
    expect(am).toContain("font-ethiopic");
    expect(om).not.toContain("font-ethiopic");
  });
});
