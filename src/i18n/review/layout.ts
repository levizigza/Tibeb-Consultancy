import { readFileSync } from "node:fs";
import { documentLanguage } from "@/i18n/document-language";
import { locales, type LocaleCode } from "@/i18n/locales";
import { englishChrome } from "@/i18n/messages/catalog";

export const layoutViewports = {
  mobile: 390,
  desktop: 1280,
} as const;

/** Short header controls. Longer copy wraps through the body overflow rule. */
const headerControlBudget = {
  mobile: 18,
  desktop: 32,
} as const;

export function renderedScript(locale: LocaleCode): "latin" | "ethiopic" {
  const language = documentLanguage(locale);
  return locales.find((item) => item.code === language)?.script ?? "latin";
}

export function endonymUsesEthiopic(locale: LocaleCode): boolean {
  return locales.find((item) => item.code === locale)?.script === "ethiopic";
}

export function headerControlFits(label: string, viewport: keyof typeof headerControlBudget): boolean {
  return label.trim().length <= headerControlBudget[viewport];
}

export function shellControlsFit(): boolean {
  const labels = [
    englishChrome.menu,
    englishChrome.closeMenu,
    englishChrome.languages,
    englishChrome.serviceGroups,
    ...Object.values(englishChrome.nav),
  ];
  return labels.every((label) => headerControlFits(label, "mobile") && headerControlFits(label, "desktop"));
}

export function bodyKeepsLongLinesTogether(): boolean {
  const css = readFileSync("src/app/globals.css", "utf8");
  return css.includes("overflow-wrap: break-word") && css.includes("--font-ethiopic") && css.includes("--text-body--line-height: 1.75");
}
