import {
  englishChrome,
  translationCatalogs,
  type ChromeMessages,
  type TranslationApproval,
  type TranslationCatalog,
} from "@/i18n/messages/catalog";
import type { LocaleCode } from "@/i18n/locales";

export type ResolvedChrome = {
  messages: ChromeMessages;
  requestedLocale: LocaleCode;
  renderedLocale: LocaleCode;
  approval: TranslationApproval;
  fallback: boolean;
};

export type TranslationGap = {
  locale: LocaleCode;
  issue: "unapproved" | "machine-translated" | "missing-key";
  approval: TranslationApproval;
  key?: string;
};

function leafKeys(value: unknown, prefix = ""): string[] {
  if (value === null || typeof value !== "object") return prefix ? [prefix] : [];
  return Object.entries(value as Record<string, unknown>).flatMap(([key, child]) => {
    const next = prefix ? `${prefix}.${key}` : key;
    return typeof child === "object" && child !== null ? leafKeys(child, next) : [next];
  });
}

function readKey(value: unknown, key: string): unknown {
  return key.split(".").reduce<unknown>((current, part) => {
    if (current === null || typeof current !== "object") return undefined;
    return (current as Record<string, unknown>)[part];
  }, value);
}

export function missingMessageKeys(
  entry: TranslationCatalog,
  required: readonly string[] = leafKeys(englishChrome),
): string[] {
  if (entry.messages === null) return [...required];
  return required.filter((key) => {
    const value = readKey(entry.messages, key);
    return typeof value !== "string" || value.trim().length === 0;
  });
}

export function catalogIsPublishable(
  entry: TranslationCatalog,
  required: readonly string[] = leafKeys(englishChrome),
): boolean {
  return (
    entry.approval === "approved" &&
    entry.machineTranslated === false &&
    missingMessageKeys(entry, required).length === 0
  );
}

export function listTranslationGaps(
  catalogs: readonly TranslationCatalog[] = translationCatalogs,
): TranslationGap[] {
  const english = catalogs.find((entry) => entry.locale === "en");
  const required = english?.messages ? leafKeys(english.messages) : leafKeys(englishChrome);

  return catalogs.flatMap((entry): TranslationGap[] => {
    if (entry.locale === "en") return [];
    if (entry.machineTranslated) {
      return [{ locale: entry.locale, issue: "machine-translated" as const, approval: entry.approval }];
    }
    if (entry.approval !== "approved" || entry.messages === null) {
      return [{ locale: entry.locale, issue: "unapproved" as const, approval: entry.approval }];
    }
    return missingMessageKeys(entry, required).map((key) => ({
      locale: entry.locale,
      issue: "missing-key" as const,
      approval: entry.approval,
      key,
    }));
  });
}

export function resolveChrome(
  locale: LocaleCode,
  catalogs: readonly TranslationCatalog[] = translationCatalogs,
): ResolvedChrome {
  const entry = catalogs.find((item) => item.locale === locale);
  const english = catalogs.find((item) => item.locale === "en");
  const fallbackMessages = english?.messages ?? englishChrome;
  const approval = entry?.approval ?? "not-started";

  if (entry && catalogIsPublishable(entry) && entry.messages) {
    return {
      messages: entry.messages,
      requestedLocale: locale,
      renderedLocale: locale,
      approval,
      fallback: false,
    };
  }

  return {
    messages: fallbackMessages,
    requestedLocale: locale,
    renderedLocale: "en",
    approval,
    fallback: locale !== "en",
  };
}
