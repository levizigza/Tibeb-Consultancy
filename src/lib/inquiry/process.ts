import { createHash } from "node:crypto";
import { deliveryMode, sendWithResend, type InquiryEnv } from "@/lib/inquiry/delivery";
import { allowInquiry } from "@/lib/inquiry/rate-limit";
import type { InquiryState } from "@/lib/inquiry/state";
import {
  fieldErrorsFromIssues,
  inquiryFromFormData,
  parseInquiry,
  type ContactInquiry,
} from "@/lib/validation/contact-inquiry";

export type { InquiryState };

export function hashClientKey(value: string): string {
  return createHash("sha256").update(value).digest("hex");
}

export async function processInquiry(input: {
  formData: FormData;
  clientKey: string;
  now: number;
  env: InquiryEnv;
  send?: (inquiry: ContactInquiry) => Promise<boolean>;
}): Promise<InquiryState> {
  if (!allowInquiry(input.clientKey, input.now)) {
    return { status: "rate-limited", fieldErrors: [] };
  }

  const raw = inquiryFromFormData(input.formData);
  if (typeof raw.companyWebsite === "string" && raw.companyWebsite.trim() !== "") {
    return { status: "not-accepted", fieldErrors: [] };
  }

  const parsed = parseInquiry({ ...raw, companyWebsite: "" });
  if (!parsed.success) {
    return { status: "rejected", fieldErrors: fieldErrorsFromIssues(parsed.error) };
  }

  if (deliveryMode(input.env) === "development") {
    return { status: "not-delivered", fieldErrors: [] };
  }

  try {
    const sent = input.send ? await input.send(parsed.data) : await sendWithResend(input.env, parsed.data);
    return sent ? { status: "delivered", fieldErrors: [] } : { status: "delivery-failed", fieldErrors: [] };
  } catch {
    console.error("Inquiry delivery failed");
    return { status: "delivery-failed", fieldErrors: [] };
  }
}
