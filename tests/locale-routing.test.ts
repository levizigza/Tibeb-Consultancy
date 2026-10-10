import { describe, expect, it } from "vitest";
import { documentLanguage } from "@/i18n/document-language";
import { replaceLocaleInPath } from "@/i18n/href";
import { localeCodes } from "@/i18n/locales";

describe("locale paths", () => {
  it("prefixes every locale and keeps the rest of the path", () => {
    expect(localeCodes).toEqual(["en", "am", "ti", "om"]);
    expect(replaceLocaleInPath("/", "en")).toBe("/en");
    expect(replaceLocaleInPath("/en", "am")).toBe("/am");
    expect(replaceLocaleInPath("/en/development", "ti")).toBe("/ti/development");
    expect(replaceLocaleInPath("/development", "om")).toBe("/om/development");
  });

  it("uses English as the document language until a translation is approved", () => {
    expect(documentLanguage("en")).toBe("en");
    expect(documentLanguage("am")).toBe("en");
    expect(documentLanguage("ti")).toBe("en");
    expect(documentLanguage("om")).toBe("en");
  });
});
