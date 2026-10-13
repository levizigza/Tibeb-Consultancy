import { z } from "zod";
import type { ComplianceServiceId } from "@/content/compliance/schema";
import type { ServiceCategoryId } from "@/content/services/categories";

const workSchema = z.object({
  summary: z.string().trim().min(40),
  does: z.array(z.string().trim().min(1)).min(2),
  receives: z.string().trim().min(1),
  notIncluded: z.array(z.string().trim().min(1)).min(1),
});

export type ServiceWork = z.infer<typeof workSchema>;

/**
 * What each page describes.
 * Drawn from the contemplated activities in the source review.
 * None of these sentences is a filing, a representation, or an outcome promise.
 */
const serviceWork = {
  "permanent-residence": {
    summary:
      "We list the papers a permanent residence file usually asks for, from the public instructions, and we help you put the ones you already have in an order you can review.",
    does: [
      "Read the question you send and name the public instructions that match the kind of file you described.",
      "List the documents those instructions usually ask for.",
      "Sort the papers you already have so you can see what is present and what is still missing.",
    ],
    receives: "A written list of the usual documents, and your own papers set in that order.",
    notIncluded: [
      "Choosing a permanent residence program for you.",
      "Completing or submitting an application.",
      "Writing to a government department about your file.",
    ],
  },
  citizenship: {
    summary:
      "We list the papers a citizenship file usually asks for, from the public instructions, and we help you set aside the ones you already have.",
    does: [
      "Read the question you send and match it to the public citizenship instructions.",
      "List the documents those instructions usually ask for, including identity and residence papers.",
      "Help you set those papers aside so you can see what you still need to gather.",
    ],
    receives: "A written list of the usual documents, and a set of your own papers arranged against that list.",
    notIncluded: [
      "Completing or submitting a citizenship application.",
      "Writing to a government department about the application.",
      "A promise that citizenship will be granted.",
    ],
  },
  "travel-documents": {
    summary:
      "We separate a passport question from a permanent resident travel document, and we point you to the official instructions for the document you named.",
    does: [
      "Ask which document the question is about, and keep a passport separate from a permanent resident travel document.",
      "Point you to the official instructions for that document.",
      "Help you gather the papers those instructions list, from the documents you already hold.",
    ],
    receives: "The official instruction page for the document you named, and your papers gathered against that list.",
    notIncluded: [
      "Submitting a passport application for you.",
      "Submitting a permanent resident travel document for you.",
      "Urgent or express filing, which the official rules generally leave with the applicant.",
    ],
  },
  "form-completion": {
    summary:
      "We type a form from the answers you give us, in your words, and we hand the draft back to you to check before anyone sends it.",
    does: [
      "Take the blank form you name and the answers you provide.",
      "Type those answers into the form, in your words.",
      "Return the draft so you can read every line before it goes anywhere.",
    ],
    receives: "A typed draft of the form, ready for you to check and send yourself.",
    notIncluded: [
      "Signing the form for you.",
      "Sending the form to a government office.",
      "Deciding what the answers should be.",
    ],
  },
  "cra-services": {
    summary:
      "We read a Canada Revenue Agency letter with you and list, in plain language, what the letter asks you to do. You remain the account holder.",
    does: [
      "Read the letter or notice you send, without signing in to an account.",
      "Restate what it asks for, in plain language.",
      "List the dates and papers the letter itself mentions.",
    ],
    receives: "A plain-language note of what the letter asks, and the list of papers it mentions.",
    notIncluded: [
      "Signing in to a Canada Revenue Agency account.",
      "Changing the account, or speaking to the agency as you.",
      "A calculation of tax, or a promise about a balance.",
    ],
  },
  "service-canada": {
    summary:
      "We read a Service Canada letter about employment insurance, a pension, or a record of employment, and we list what the letter asks you to do.",
    does: [
      "Read the letter you send, without signing in to an account.",
      "Name the program the letter is about.",
      "List what the letter asks you to do, and which papers it mentions.",
    ],
    receives: "A plain-language note of the program, the request, and the papers named in the letter.",
    notIncluded: [
      "Signing in to a Service Canada account.",
      "Changing a payment, an address, or a tax withholding.",
      "Sending a reply to Service Canada for you.",
    ],
  },
  "resume-writing": {
    summary:
      "We draft or revise a résumé and a cover letter from the work history, education, and roles you provide. You send them yourself.",
    does: [
      "Take the work history, education, and roles you provide.",
      "Draft or revise a résumé in a clear order an employer can scan.",
      "Draft or revise a cover letter for a role you name.",
    ],
    receives: "A résumé and a cover letter you can edit and send yourself.",
    notIncluded: [
      "Contacting an employer.",
      "A promise of an interview or a job.",
      "Inventing experience that you did not provide.",
    ],
  },
  "job-applications": {
    summary:
      "We match postings to the history you give us and draft the materials for an application you choose. You send the application.",
    does: [
      "Read the work history you provide and the posting you want to pursue.",
      "Point out postings that fit that history, when you ask us to look.",
      "Draft the résumé lines and the note that the posting asks for.",
    ],
    receives: "Draft application materials for a posting you have chosen, ready for you to send.",
    notIncluded: [
      "Sending the application, or contacting the employer in your name.",
      "A promise that the employer will hire you.",
      "A fee tied to securing employment.",
    ],
  },
  bookkeeping: {
    summary:
      "We record the day-to-day transactions you send, such as sales, purchases, and payments, into a set of records you can read.",
    does: [
      "Enter the sales, purchases, and payments you send for an agreed period.",
      "Group them so income and costs can be read without hunting through receipts.",
      "Return the record for you to keep.",
    ],
    receives: "An organized record of the transactions you provided for that period.",
    notIncluded: [
      "An audit, a review, or a compilation.",
      "Tax advice, or a tax return.",
      "A promise about what a later filing will show.",
    ],
  },
  payroll: {
    summary:
      "We calculate gross pay, deductions, and net pay from the hours, rates, and deduction figures the employer provides.",
    does: [
      "Take the hours, rates, and deduction information the employer provides.",
      "Calculate gross pay, the deductions named in those figures, and net pay.",
      "Write down the calculation so the employer can check it.",
    ],
    receives: "The pay figures for the period, and a record of how they were calculated.",
    notIncluded: [
      "Signing in to a government payroll account.",
      "Remitting deductions. The employer remains responsible for that.",
      "Filing a record of employment. The employer remains responsible for that.",
    ],
  },
  "personal-tax": {
    summary:
      "We prepare a draft personal income tax return from the slips and receipts you provide, and we walk through that draft with you.",
    does: [
      "Collect the slips and receipts you provide for the year.",
      "Prepare a draft return from those papers.",
      "Walk through the draft with you so you can see each figure before you decide what to do with it.",
    ],
    receives: "A draft personal return prepared from the papers you provided.",
    notIncluded: [
      "A promise of a refund.",
      "Signing in to a tax account.",
      "Filing the return from this website. You remain responsible for the return.",
    ],
  },
} as const satisfies Record<ComplianceServiceId, ServiceWork>;

export const serviceWorkById = Object.fromEntries(
  (Object.entries(serviceWork) as [ComplianceServiceId, ServiceWork][]).map(([id, work]) => [
    id,
    workSchema.parse(work),
  ]),
) as Record<ComplianceServiceId, ServiceWork>;

const familyWork = {
  "immigration-citizenship":
    "Permanent residence, citizenship, and travel documents. On each page we list the papers that kind of file usually asks for, and we help you arrange the ones you already have. We do not choose a program, file an application, or write to a government department for you.",
  "government-forms":
    "Forms, Canada Revenue Agency letters, and Service Canada letters. We type a form from the answers you give us, or we read a letter and list what it asks you to do. You check the result and you send it. We do not sign in to a government account.",
  "career-employment":
    "A résumé, a cover letter, and the materials for a job application, written from the history you provide. You send them. We do not contact an employer, and we do not promise an interview or a job.",
  "tax-business-administration":
    "Day-to-day records, a pay calculation, or a draft personal return, prepared from the figures you provide. You review the result. This is not an audit, and this website does not sign in to a tax account or promise a refund.",
} as const satisfies Record<ServiceCategoryId, string>;

export function familyWorkSummary(id: ServiceCategoryId): string {
  return familyWork[id];
}

export function serviceWorkFor(id: ComplianceServiceId): ServiceWork {
  return serviceWorkById[id];
}
