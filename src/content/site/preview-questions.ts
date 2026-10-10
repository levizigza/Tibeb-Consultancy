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

export const previewQuestionsIntro =
  "These answers describe this development preview. An approved question-and-answer policy does not exist yet.";

/**
 * Answers restate facts already published on the preview.
 * They are not an approved client policy, fee, or processing time.
 */
export const previewQuestions: readonly PreviewQuestion[] = [
  {
    id: "services-offered",
    question: "Which services are offered?",
    answer:
      "No service is approved for publication. The Services page has a finder and four groups. The finder links only to a published service, and none is published. Each group is marked not approved.",
    links: [{ path: "/services", label: "Services" }],
  },
  {
    id: "consultation",
    question: "How does consultation work?",
    answer:
      "A consultation cannot be booked from this preview. The contact page has a general inquiry form. No consultation language is confirmed.",
    links: [
      { path: "/how-it-works", label: "How it works" },
      { path: "/contact", label: "Contact" },
    ],
  },
  {
    id: "languages",
    question: "What languages are available?",
    answer:
      "The website languages are English, Amharic, Tigrinya, and Afaan Oromoo. English is the only language with development copy. No consultation language has been confirmed.",
    links: [{ path: "/", label: "Home" }],
  },
  {
    id: "prices",
    question: "How are prices determined?",
    answer:
      "No price is approved for publication. This site does not state how a fee would be calculated, and it does not show a fixed price, a starting price, or a quotation.",
    links: [{ path: "/pricing", label: "Pricing" }],
  },
  {
    id: "information",
    question: "What information might be required?",
    answer:
      "Do not send documents or personal history through this site. The inquiry form asks for a name, a way to reply, a language preference, a service group, and an optional short note.",
    links: [{ path: "/contact", label: "Contact" }],
  },
  {
    id: "duration",
    question: "How long does TIBEB's part of the service take?",
    answer: "No duration is approved for publication. This answer does not state a processing time.",
    links: [{ path: "/how-it-works", label: "How it works" }],
  },
  {
    id: "government",
    question: "Is TIBEB affiliated with the Canadian government?",
    answer:
      "No statement about a government relationship has been approved. This site does not present the business as a government channel.",
    links: [{ path: "/services/government-forms", label: "Government & Forms" }],
  },
  {
    id: "information-handling",
    question: "How is customer information handled?",
    answer:
      "No privacy notice is approved for publication. Do not send documents or personal history through this site.",
    links: [{ path: "/contact", label: "Contact" }],
  },
  {
    id: "after-inquiry",
    question: "What happens after sending an inquiry?",
    answer:
      "If email delivery is not configured, the form says the inquiry was not sent. No follow-up step is approved.",
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
