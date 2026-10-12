export const localeCodes = ["en", "am", "ti", "om"] as const;

export type LocaleCode = (typeof localeCodes)[number];

export const defaultLocale: LocaleCode = "en";

export const translationStatusLabel = {
  "development-copy": "On this site",
  "not-started": "Translation in preparation",
  approved: "Approved translation",
} as const;

export type TranslationStatus = keyof typeof translationStatusLabel;

export type LocaleScript = "latin" | "ethiopic";

export type LocaleDefinition = {
  code: LocaleCode;
  endonym: string;
  englishName: string;
  script: LocaleScript;
  translationStatus: TranslationStatus;
};

export const locales: readonly LocaleDefinition[] = [
  {
    code: "en",
    endonym: "English",
    englishName: "English",
    script: "latin",
    translationStatus: "development-copy",
  },
  {
    code: "am",
    endonym: "አማርኛ",
    englishName: "Amharic",
    script: "ethiopic",
    translationStatus: "not-started",
  },
  {
    code: "ti",
    endonym: "ትግርኛ",
    englishName: "Tigrinya",
    script: "ethiopic",
    translationStatus: "not-started",
  },
  {
    code: "om",
    endonym: "Afaan Oromoo",
    englishName: "Oromo",
    script: "latin",
    translationStatus: "not-started",
  },
];
