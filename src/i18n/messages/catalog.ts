import type { LocaleCode } from "@/i18n/locales";

/**
 * Website chrome only. These strings are not consultation languages,
 * and none of them were produced by machine translation.
 */
export const translationApprovals = [
  "development-copy",
  "not-started",
  "in-review",
  "approved",
] as const;

export type TranslationApproval = (typeof translationApprovals)[number];

export type ChromeMessages = {
  skip: string;
  menu: string;
  closeMenu: string;
  languages: string;
  languageMenuNote: string;
  serviceGroups: string;
  primaryNav: string;
  mobileNav: string;
  footerNav: string;
  pages: string;
  translationPending: string;
  inquiry: {
    name: string;
    email: string;
    message: string;
    submit: string;
  };
  nav: {
    home: string;
    services: string;
    "how-it-works": string;
    about: string;
    resources: string;
    contact: string;
  };
};

export type TranslationCatalog = {
  locale: LocaleCode;
  approval: TranslationApproval;
  reviewedOn: string | null;
  reviewer: null;
  machineTranslated: boolean;
  messages: ChromeMessages | null;
};

export const englishChrome = {
  skip: "Skip to main content",
  menu: "Menu",
  closeMenu: "Close menu",
  languages: "Languages",
  languageMenuNote: "Website language. Choosing one does not set the language of a meeting.",
  serviceGroups: "Service groups",
  primaryNav: "Primary",
  mobileNav: "Mobile",
  footerNav: "Footer",
  pages: "Pages",
  translationPending: "This page is shown in English. The {language} translation is not on the site yet.",
  inquiry: {
    name: "Name",
    email: "Email",
    message: "Message",
    submit: "Submit",
  },
  nav: {
    home: "Home",
    services: "Services",
    "how-it-works": "How it works",
    about: "About",
    resources: "Resources",
    contact: "Contact",
  },
} as const satisfies ChromeMessages;

export const translationCatalogs: readonly TranslationCatalog[] = [
  {
    locale: "en",
    approval: "development-copy",
    reviewedOn: null,
    reviewer: null,
    machineTranslated: false,
    messages: englishChrome,
  },
  {
    locale: "am",
    approval: "not-started",
    reviewedOn: null,
    reviewer: null,
    machineTranslated: false,
    messages: null,
  },
  {
    locale: "ti",
    approval: "not-started",
    reviewedOn: null,
    reviewer: null,
    machineTranslated: false,
    messages: null,
  },
  {
    locale: "om",
    approval: "not-started",
    reviewedOn: null,
    reviewer: null,
    machineTranslated: false,
    messages: null,
  },
];
