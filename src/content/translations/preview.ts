import { businessProfile } from "@/content/business/profile";
import { englishChrome } from "@/i18n/messages/catalog";
import type { LocaleCode } from "@/i18n/locales";
import { locales } from "@/i18n/locales";
import { localeCopyIsPublishable } from "@/i18n/review/validate";

export const previewCopy = {
  description: `${businessProfile.positioning.text}`,
  introduction: businessProfile.positioning.text,
  statusTitle: "The firm",
  statusBody:
    "Write with the question. We will tell you whether we can help, and what the work would involve.",
  languagesTitle: "Languages",
  languagesNote:
    "This website is written in English. Amharic, Tigrinya, and Afaan Oromoo are listed because translations are planned. A language name is not a promise that a meeting is offered in that language.",
  publishedServicesTitle: "Services",
  publishedServicesEmpty: "Choose the area closest to your question. We will tell you whether we can help.",
  documentationPath: "/development",
  documentationLabel: "Notes",
  footerNote: "An independent firm in Canada.",
} as const;

export function translationPendingMessage(locale: LocaleCode): string | null {
  const definition = locales.find((item) => item.code === locale);
  if (!definition || locale === "en" || localeCopyIsPublishable(locale)) {
    return null;
  }

  return englishChrome.translationPending.replace("{language}", definition.englishName);
}
