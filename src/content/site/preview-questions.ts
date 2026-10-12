import { z } from "zod";
import { containsProhibitedServiceClaim } from "@/content/compliance/schema";

const linkSchema = z.object({
  path: z.string().trim().startsWith("/"),
  label: z.string().trim().min(1),
});

export const previewQuestionSchema = z.object({
  id: z.string().trim().min(1),
  question: z.string().trim().min(1),
  answer: z.string().trim().min(1),
  links: z.array(linkSchema),
});

export type PreviewQuestion = z.infer<typeof previewQuestionSchema>;

export const previewQuestionsIntro = "Answers to the questions people ask before they write.";

/**
 * Public answers. They do not state a fee, a processing time, or a government outcome.
 */
export const previewQuestions: readonly PreviewQuestion[] = [
  {
    id: "services-offered",
    question: "Which services are offered?",
    answer:
      "The Services page groups the work into four areas. Open the area closest to your question. We will tell you whether we can take it on. A page on this site does not, by itself, retain the firm.",
    links: [{ path: "/services", label: "Services" }],
  },
  {
    id: "consultation",
    question: "How does consultation work?",
    answer:
      "Start with the inquiry form. We reply about whether a conversation is the right next step. The form does not reserve a meeting.",
    links: [
      { path: "/how-it-works", label: "How it works" },
      { path: "/contact", label: "Contact" },
    ],
  },
  {
    id: "languages",
    question: "What languages are available?",
    answer:
      "The website lists English, Amharic, Tigrinya, and Afaan Oromoo. The pages are written in English today. A language name is not a promise that a meeting is offered in that language.",
    links: [{ path: "/", label: "Home" }],
  },
  {
    id: "prices",
    question: "How are prices determined?",
    answer: "Fees are discussed after we understand the work. This site does not list an amount.",
    links: [{ path: "/pricing", label: "Pricing" }],
  },
  {
    id: "information",
    question: "What information might be required?",
    answer:
      "The inquiry form asks for a name, a way to reply, a language preference, a service group, and an optional short note. Do not send identity documents, tax papers, or immigration files.",
    links: [{ path: "/contact", label: "Contact" }],
  },
  {
    id: "duration",
    question: "How long does TIBEB's part of the service take?",
    answer: "Timing depends on the work. This site does not state a processing time.",
    links: [{ path: "/how-it-works", label: "How it works" }],
  },
  {
    id: "government",
    question: "Is TIBEB affiliated with the Canadian government?",
    answer:
      "TIBEB Consultancy is an independent firm. It is not part of the Canadian government, and it is not an official channel for a government department.",
    links: [{ path: "/services/government-forms", label: "Government & Forms" }],
  },
  {
    id: "information-handling",
    question: "How is customer information handled?",
    answer:
      "Send only a name, a way to reply, and a short note. Do not send identity documents, tax papers, or immigration files through this site.",
    links: [{ path: "/contact", label: "Contact" }],
  },
  {
    id: "after-inquiry",
    question: "What happens after sending an inquiry?",
    answer:
      "A delivered message reaches the firm as a general question. It does not reserve a meeting. If delivery is not connected, the page says the message was not sent.",
    links: [{ path: "/contact", label: "Contact" }],
  },
];

const durationPattern = /\b\d+\s*(business\s+)?(day|week|month|hour)s?\b/i;
const amountPattern = /\$\s?\d|\b\d+(\.\d{2})?\s*cad\b/i;

export function previewCopyIssues(value: string): string[] {
  const issues: string[] = [];
  if (containsProhibitedServiceClaim(value)) issues.push("prohibited-claim");
  if (durationPattern.test(value)) issues.push("duration");
  if (amountPattern.test(value)) issues.push("amount");
  if (/\bguaranteed\b/i.test(value)) issues.push("guaranteed");
  if (/\b(book now|get started|buy now)\b/i.test(value)) issues.push("booking");
  return issues;
}
