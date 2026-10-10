import { businessProfile } from "@/content/business/profile";
import { englishChrome } from "@/i18n/messages/catalog";
import type { LocaleCode } from "@/i18n/locales";
import { locales } from "@/i18n/locales";
import { localeCopyIsPublishable } from "@/i18n/review/validate";

export const previewCopy = {
  description:
    "The TIBEB Consultancy website is being built and is not open for client services.",
  introduction: `${businessProfile.positioning.text} This is a temporary development introduction. The public website is still being built.`,
  statusTitle: "This site is being built",
  statusBody:
    "Service descriptions, contact methods, and translations will appear only after the business confirms them. Client services cannot be requested from this preview.",
  languagesTitle: "Languages planned for this website",
  languagesNote:
    "English is the only language with development copy. Amharic, Tigrinya, and Oromo translations have not been written or approved.",
  publishedServicesTitle: "Published services",
  publishedServicesEmpty: "No services are approved for publication.",
  documentationPath: "/development",
  documentationLabel: "Development documentation",
  footerNote: "This preview is not open for client work.",
} as const;

export function translationPendingMessage(locale: LocaleCode): string | null {
  const definition = locales.find((item) => item.code === locale);
  if (!definition || locale === "en" || localeCopyIsPublishable(locale)) {
    return null;
  }

  return englishChrome.translationPending.replace("{language}", definition.englishName);
}
