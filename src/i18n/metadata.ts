import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { pageSearchFields } from "@/content/site/search-metadata";
import { documentLanguage } from "@/i18n/document-language";
import { replaceLocaleInPath } from "@/i18n/href";
import { locales, type LocaleCode } from "@/i18n/locales";
import { localeCopyIsPublishable } from "@/i18n/review/validate";
import { routing } from "@/i18n/routing";
import { currentSearchCatalog, localizedPathIsIndexable } from "@/lib/seo/indexability";

/**
 * Alternate links include only locales whose website copy is the rendered language.
 * Untranslated locale URLs stay out of hreflang so they are not treated as finished translations.
 * There is no public origin yet, so the paths stay relative to this site.
 */
export function localeAlternates(path: string, locale: LocaleCode): NonNullable<Metadata["alternates"]> {
  const languages: Record<string, string> = {
    "x-default": replaceLocaleInPath(path, "en"),
  };

  for (const item of locales) {
    if (item.code === "en" || localeCopyIsPublishable(item.code)) {
      languages[item.code] = replaceLocaleInPath(path, item.code);
    }
  }

  return {
    canonical: replaceLocaleInPath(path, documentLanguage(locale)),
    languages,
  };
}

export function localePageMetadata({
  locale,
  path,
  title,
  description,
}: {
  locale: LocaleCode;
  path: string;
  title?: Metadata["title"];
  description?: string;
}): Metadata {
  const fields = pageSearchFields(path);
  const indexable = localizedPathIsIndexable(path, locale, currentSearchCatalog());
  return {
    title: title ?? fields?.title,
    description: description ?? fields?.description,
    robots: indexable
      ? { index: true, follow: true }
      : { index: false, follow: false },
    alternates: localeAlternates(path, locale),
  };
}

export async function metadataForLocale(
  params: Promise<{ locale: string }>,
  path: string,
  title?: Metadata["title"],
  description?: string,
): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  return localePageMetadata({ locale, path, title, description });
}
