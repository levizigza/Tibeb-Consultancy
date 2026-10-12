import { z } from "zod";
import { serviceCategoryIds, type ServiceCategoryId } from "@/content/services/categories";
import { getServiceFamily } from "@/content/site/information-architecture";
import type { LocaleCode } from "@/i18n/locales";

export const finderIntentIds = ["career", "tax", "government", "immigration", "unsure"] as const;

export type FinderIntentId = (typeof finderIntentIds)[number];

const finderIntentSchema = z.object({
  id: z.enum(finderIntentIds),
  prompt: z.string().trim().min(1),
  explanation: z.string().trim().min(1),
  boundary: z.string().trim().min(1),
  categoryId: z.enum(serviceCategoryIds).nullable(),
});

export type FinderIntent = z.infer<typeof finderIntentSchema>;

const boundary =
  "This step does not ask for financial records or immigration documents. It does not decide whether someone can apply, and it is not legal advice.";

/**
 * Visitor sentences mapped to an existing service family.
 * `unsure` has no family, so the finder does not guess.
 */
export const finderIntents: readonly FinderIntent[] = finderIntentSchema.array().parse([
  {
    id: "career",
    prompt: "I need help with a resume or finding employment.",
    explanation:
      "Resume writing and job application help sit in the Career & Employment group. This step does not read a resume.",
    boundary,
    categoryId: "career-employment",
  },
  {
    id: "tax",
    prompt: "I need help with taxes or business records.",
    explanation:
      "Questions about taxes or business records sit in the Tax & Business Administration group. This step does not calculate tax or prepare a return.",
    boundary,
    categoryId: "tax-business-administration",
  },
  {
    id: "government",
    prompt: "I need help understanding general government paperwork.",
    explanation:
      "General government paperwork sits in the Government & Forms group. This step does not complete a form, and it is not a government channel.",
    boundary,
    categoryId: "government-forms",
  },
  {
    id: "immigration",
    prompt: "I'm looking for immigration or citizenship information.",
    explanation:
      "Immigration and citizenship topics sit in the Immigration & Citizenship group. This step does not start an application.",
    boundary,
    categoryId: "immigration-citizenship",
  },
  {
    id: "unsure",
    prompt: "I'm not sure which service I need.",
    explanation: "Tell us the question in your own words. We will say which area fits.",
    boundary,
    categoryId: null,
  },
]);

export const finderMessages = {
  heading: "Find a service",
  intro:
    "Choose the closest sentence. You can go back or start again. The website language stays the same.",
  stepChoose: "Step 1 of 2. Choose one.",
  stepResult: "Step 2 of 2.",
  selected: "Selected",
  publishedHeading: "Matching pages",
  notOfferedHeading: "Write to us",
  notOfferedUnsure: "Tell us the question in your own words. We will say whether we can help.",
  inquiry: "Send a general inquiry",
  inquiryNote:
    "The form asks for a name, a way to reply, and an optional short note. It does not reserve a meeting.",
  inquiryWhenPublished: "If none of these pages is the right one, send a general inquiry.",
  back: "Back",
  restart: "Start again",
} as const;

export function finderMessagesForLocale(locale: LocaleCode): typeof finderMessages {
  void locale;
  return finderMessages;
}

export function finderIntentById(id: string): FinderIntent | undefined {
  return finderIntents.find((intent) => intent.id === id);
}

export function finderIntentRestriction(categoryId: ServiceCategoryId | null): string | null {
  if (!categoryId) return finderMessages.notOfferedUnsure;
  return getServiceFamily(categoryId)?.restriction ?? finderMessages.notOfferedUnsure;
}
