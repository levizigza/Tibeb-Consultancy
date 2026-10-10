import { z } from "zod";
import { localeCodes, type LocaleCode } from "@/i18n/locales";

export const contactMethods = ["email", "phone"] as const;
export type ContactMethod = (typeof contactMethods)[number];

export const inquiryCategoryIds = [
  "immigration-citizenship",
  "government-forms",
  "career-employment",
  "tax-business-administration",
  "not-sure",
] as const;
export type InquiryCategoryId = (typeof inquiryCategoryIds)[number];

const controlCharacters = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g;
const sensitivePhrases = [
  "social insurance",
  "passport",
  "bank statement",
  "tax return",
  "credit card",
  "card number",
  "password",
];
const sinPattern = /\b\d{3}[-\s]\d{3}[-\s]\d{3}\b/;

export const inquiryLimits = {
  name: 100,
  email: 254,
  phone: 30,
  inquiry: 500,
} as const;

function clean(value: unknown, ceiling: number): string {
  if (typeof value !== "string") return "";
  const stripped = value.normalize("NFKC").replace(controlCharacters, "").trim();
  return stripped.length > ceiling ? stripped.slice(0, ceiling) : stripped;
}

export function containsSensitiveInquiryText(value: string): boolean {
  const normalized = value.toLowerCase();
  if (sensitivePhrases.some((phrase) => normalized.includes(phrase))) return true;
  if (sinPattern.test(value)) return true;
  return looksLikePaymentCard(value);
}

function looksLikePaymentCard(value: string): boolean {
  const groups = value.match(/\d[\d\s-]{11,22}\d/g) ?? [];
  return groups.some((group) => {
    const digits = group.replace(/\D/g, "");
    return digits.length >= 13 && digits.length <= 19 && luhn(digits);
  });
}

function luhn(digits: string): boolean {
  let sum = 0;
  let alternate = false;
  for (let index = digits.length - 1; index >= 0; index -= 1) {
    let current = Number(digits[index]);
    if (alternate) {
      current *= 2;
      if (current > 9) current -= 9;
    }
    sum += current;
    alternate = !alternate;
  }
  return sum % 10 === 0;
}

export function phoneIsUsable(value: string): boolean {
  if (!/^\+?[0-9][0-9\s().-]{6,28}$/.test(value)) return false;
  const digits = value.replace(/\D/g, "");
  return digits.length >= 8 && digits.length <= 15;
}

export function emailIsUsable(value: string): boolean {
  return z.string().max(inquiryLimits.email).pipe(z.email()).safeParse(value).success;
}

const rawSchema = z
  .object({
    fullName: z.string(),
    email: z.string(),
    phone: z.string(),
    contactMethod: z.string(),
    preferredLanguage: z.string(),
    serviceCategory: z.string(),
    inquiry: z.string(),
    privacyAcknowledgement: z.boolean(),
    companyWebsite: z.literal(""),
  })
  .strict();

export const contactInquirySchema = rawSchema.superRefine((value, ctx) => {
  const issue = (path: string, code: string) =>
    ctx.addIssue({ code: "custom", path: [path], message: code });

  if (value.fullName.length === 0 || value.fullName.length > inquiryLimits.name) issue("fullName", "name");
  else if (containsSensitiveInquiryText(value.fullName)) issue("fullName", "sensitive");

  if (!contactMethods.includes(value.contactMethod as ContactMethod)) issue("contactMethod", "method");

  if (value.contactMethod === "email" && !emailIsUsable(value.email)) issue("email", "email");
  if (value.contactMethod === "phone" && value.email.length > 0 && !emailIsUsable(value.email)) issue("email", "email");
  if (value.email.length > 0 && containsSensitiveInquiryText(value.email)) issue("email", "sensitive");

  if (value.contactMethod === "phone" && !phoneIsUsable(value.phone)) issue("phone", "phone");
  if (value.contactMethod === "email" && value.phone.length > 0 && !phoneIsUsable(value.phone)) issue("phone", "phone");
  if (value.phone.length > 0 && containsSensitiveInquiryText(value.phone)) issue("phone", "sensitive");

  if (!localeCodes.includes(value.preferredLanguage as LocaleCode)) issue("preferredLanguage", "language");
  if (!inquiryCategoryIds.includes(value.serviceCategory as InquiryCategoryId)) issue("serviceCategory", "category");
  if (value.inquiry.length > inquiryLimits.inquiry) issue("inquiry", "inquiry");
  else if (containsSensitiveInquiryText(value.inquiry)) issue("inquiry", "sensitive");
  if (value.privacyAcknowledgement !== true) issue("privacyAcknowledgement", "privacy");
});

export type ContactInquiry = z.infer<typeof contactInquirySchema>;

export type InquiryField = "fullName" | "email" | "phone" | "contactMethod" | "preferredLanguage" | "serviceCategory" | "inquiry" | "privacyAcknowledgement";

export type InquiryFieldError = {
  field: InquiryField;
  code: "name" | "email" | "phone" | "method" | "language" | "category" | "inquiry" | "privacy" | "sensitive";
};

function text(value: unknown): string {
  return typeof value === "string" ? value : "";
}

export function normalizeInquiry(input: unknown): unknown {
  if (input === null || typeof input !== "object") return input;
  const record = input as Record<string, unknown>;
  return {
    fullName: clean(record.fullName, inquiryLimits.name + 1),
    email: clean(record.email, inquiryLimits.email + 1),
    phone: clean(record.phone, inquiryLimits.phone + 1),
    contactMethod: text(record.contactMethod).trim(),
    preferredLanguage: text(record.preferredLanguage).trim(),
    serviceCategory: text(record.serviceCategory).trim(),
    inquiry: clean(record.inquiry, inquiryLimits.inquiry + 1),
    privacyAcknowledgement: record.privacyAcknowledgement === true,
    companyWebsite: text(record.companyWebsite).trim(),
  };
}

export function fieldErrorsFromIssues(error: z.ZodError): InquiryFieldError[] {
  return error.issues.flatMap((issue) => {
    const field = issue.path[0];
    if (typeof field !== "string") return [];
    const code = issue.message;
    const mapped = mapCode(field, code);
    if (!mapped) return [];
    return [mapped];
  });
}

function mapCode(field: string, code: string): InquiryFieldError | null {
  if (code === "sensitive" && isField(field)) return { field, code: "sensitive" };
  if (field === "fullName") return { field, code: "name" };
  if (field === "email") return { field, code: "email" };
  if (field === "phone") return { field, code: "phone" };
  if (field === "contactMethod") return { field, code: "method" };
  if (field === "preferredLanguage") return { field, code: "language" };
  if (field === "serviceCategory") return { field, code: "category" };
  if (field === "inquiry") return { field, code: "inquiry" };
  if (field === "privacyAcknowledgement") return { field, code: "privacy" };
  return null;
}

function isField(value: string): value is InquiryField {
  return (
    value === "fullName" ||
    value === "email" ||
    value === "phone" ||
    value === "contactMethod" ||
    value === "preferredLanguage" ||
    value === "serviceCategory" ||
    value === "inquiry" ||
    value === "privacyAcknowledgement"
  );
}

export function parseInquiry(input: unknown) {
  return contactInquirySchema.safeParse(normalizeInquiry(input));
}

export function inquiryFromFormData(formData: FormData) {
  return {
    fullName: formData.get("fullName"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    contactMethod: formData.get("contactMethod"),
    preferredLanguage: formData.get("preferredLanguage"),
    serviceCategory: formData.get("serviceCategory"),
    inquiry: formData.get("inquiry") ?? "",
    privacyAcknowledgement: formData.get("privacyAcknowledgement") === "on",
    companyWebsite: formData.get("companyWebsite") ?? "",
  };
}

export function preferredLanguageLabel(locale: string): string {
  if (locale === "en") return "English";
  if (locale === "am") return "Amharic";
  if (locale === "ti") return "Tigrinya";
  return "Afaan Oromoo";
}
