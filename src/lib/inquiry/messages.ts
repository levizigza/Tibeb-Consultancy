import type { LocaleCode } from "@/i18n/locales";
import type { InquiryStatus } from "@/lib/inquiry/state";
import type { InquiryFieldError } from "@/lib/validation/contact-inquiry";

/**
 * English development copy for every locale.
 * Do not replace these with an unapproved or machine-written translation.
 */
export const inquiryMessages = {
  heading: "General inquiry",
  instructions:
    "Send a name, a way to reply, and a short note. This form does not reserve a meeting. Do not include a social insurance number, a government password, a passport, a tax return, a bank statement, a payment card, or an immigration document.",
  name: "Full name",
  nameHint: "The name you want used in a reply.",
  email: "Email address",
  emailHint: "Required when you choose email. Leave this empty if you choose phone.",
  phone: "Phone number",
  phoneHint: "Required when you choose phone. Leave this empty if you choose email.",
  method: "Preferred contact method",
  methodHint: "How we should try to reply.",
  methodEmail: "Email",
  methodPhone: "Phone",
  language: "Preferred language",
  languageHint: "The language you prefer for a reply. This is not the language of a meeting.",
  category: "Service group",
  categoryHint: "The area your question is about.",
  categoryUnsure: "Not sure",
  inquiry: "Inquiry",
  inquiryHint: "Optional. 500 characters or fewer. Do not attach a document. This form cannot accept files.",
  privacy:
    "I will not include a social insurance number, a government password, a passport, a tax return, a bank statement, a payment card, or an immigration document. I understand this form is a general inquiry and does not reserve a meeting.",
  submit: "Submit inquiry",
  submitting: "Submitting",
  required: "required",
  errorsTitle: "The inquiry was not sent",
  notDelivered:
    "This inquiry was checked, but it was not sent. Email is not connected, so the firm was not contacted.",
  delivered:
    "The inquiry was sent. It does not reserve a meeting, and it does not open a file.",
  rateLimited: "The inquiry was not sent. Wait a few minutes and try again.",
  deliveryFailed: "The inquiry was not sent. The business was not contacted.",
  notAccepted: "The inquiry was not accepted.",
  nameError: "Enter your full name.",
  emailError: "Enter a valid email address.",
  phoneError: "Enter a phone number you can answer.",
  methodError: "Choose email or phone.",
  languageError: "Choose a preferred language for a reply.",
  categoryError: "Choose a service group, or choose Not sure.",
  inquiryError: "Use 500 characters or fewer.",
  privacyError: "Confirm the privacy acknowledgement.",
  sensitiveError:
    "Remove government identifiers, account passwords, passport details, tax returns, bank statements, and payment card numbers. This form cannot accept them.",
} as const;

export type InquiryMessageKey = keyof typeof inquiryMessages;

/** Locale-aware entry point. Unapproved locales keep the English sentences. */
export function messagesForLocale(locale: LocaleCode): typeof inquiryMessages {
  void locale;
  return inquiryMessages;
}

export function statusMessage(status: InquiryStatus): string | null {
  if (status === "not-delivered") return inquiryMessages.notDelivered;
  if (status === "delivered") return inquiryMessages.delivered;
  if (status === "rate-limited") return inquiryMessages.rateLimited;
  if (status === "delivery-failed") return inquiryMessages.deliveryFailed;
  if (status === "not-accepted") return inquiryMessages.notAccepted;
  if (status === "rejected") return inquiryMessages.errorsTitle;
  return null;
}

export function fieldMessage(code: InquiryFieldError["code"]): string {
  if (code === "name") return inquiryMessages.nameError;
  if (code === "email") return inquiryMessages.emailError;
  if (code === "phone") return inquiryMessages.phoneError;
  if (code === "method") return inquiryMessages.methodError;
  if (code === "language") return inquiryMessages.languageError;
  if (code === "category") return inquiryMessages.categoryError;
  if (code === "inquiry") return inquiryMessages.inquiryError;
  if (code === "privacy") return inquiryMessages.privacyError;
  return inquiryMessages.sensitiveError;
}
