import type { LocaleCode } from "@/i18n/locales";

export const resourceMessages = {
  publishedHeading: "Published guides",
  reviewHeading: "Guides in review",
  emptyPublished: "No guide in this category is published.",
  emptyReview: "No draft is waiting in this category.",
  filterLabel: "Category",
  allCategories: "All categories",
  statusNotPublished: "Not published",
  statusPublished: "Published",
  reviewerEmpty: "No reviewer is recorded.",
  dateEmpty: "No date is recorded.",
  withheld:
    "The guide steps stay in the editorial file until a named reviewer approves them. This page does not give tax, payroll, or immigration advice.",
  sourcesHeading: "Official sources",
  sourcesNote: "These are government pages. This guide does not interpret them.",
  relatedHeading: "Related guides",
  alsoHeading: "On this website",
  translationSource: "English source. An approved translation is not available for the other website languages.",
  translationMissing: "An approved translation is not available. This page shows the English source.",
  audienceLabel: "Audience",
  statusLabel: "Publication status",
  reviewerLabel: "Reviewer",
  publishedLabel: "Publication date",
  reviewedLabel: "Last reviewed",
  nextReviewLabel: "Next review",
  localeLabel: "Locale",
  professional: "This topic needs professional review before it can be published.",
} as const;

export function resourceMessagesForLocale(locale: LocaleCode): typeof resourceMessages {
  void locale;
  return resourceMessages;
}
