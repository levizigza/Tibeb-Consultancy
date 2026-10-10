import { localeCodes, type LocaleCode } from "@/i18n/locales";

export function replaceLocaleInPath(pathname: string, locale: LocaleCode): string {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 0) return `/${locale}`;

  if (localeCodes.includes(segments[0] as LocaleCode)) {
    segments[0] = locale;
  } else {
    segments.unshift(locale);
  }

  return `/${segments.join("/")}`;
}
