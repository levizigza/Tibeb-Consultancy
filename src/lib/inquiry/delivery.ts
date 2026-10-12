import { serviceFamilies } from "@/content/site/information-architecture";
import type { ContactInquiry } from "@/lib/validation/contact-inquiry";
import { preferredLanguageLabel } from "@/lib/validation/contact-inquiry";

export type InquiryEnv = {
  resendApiKey: string | null;
  fromEmail: string | null;
  toEmail: string | null;
};

export function readInquiryEnv(env: NodeJS.ProcessEnv): InquiryEnv {
  return {
    resendApiKey: present(env.RESEND_API_KEY),
    fromEmail: present(env.INQUIRY_FROM_EMAIL),
    toEmail: present(env.INQUIRY_TO_EMAIL),
  };
}

function present(value: string | undefined): string | null {
  const trimmed = value?.trim() ?? "";
  return trimmed.length > 0 ? trimmed : null;
}

export function deliveryMode(env: InquiryEnv): "development" | "resend" {
  if (!env.resendApiKey || !env.fromEmail || !env.toEmail) return "development";
  if (!env.fromEmail.includes("@") || !env.toEmail.includes("@")) return "development";
  return "resend";
}

export function inquiryEmailText(inquiry: ContactInquiry): string {
  const category =
    serviceFamilies.find((family) => family.id === inquiry.serviceCategory)?.label ?? "Not sure";
  return [
    "Website inquiry",
    "This message is a general inquiry.",
    "",
    `Name: ${inquiry.fullName}`,
    `Preferred contact method: ${inquiry.contactMethod}`,
    `Email: ${inquiry.email || "(none)"}`,
    `Phone: ${inquiry.phone || "(none)"}`,
    `Preferred language: ${preferredLanguageLabel(inquiry.preferredLanguage)}`,
    `Service group: ${category}`,
    `Inquiry: ${inquiry.inquiry || "(none)"}`,
  ].join("\n");
}

export async function sendWithResend(env: InquiryEnv, inquiry: ContactInquiry): Promise<boolean> {
  if (deliveryMode(env) !== "resend" || !env.resendApiKey || !env.fromEmail || !env.toEmail) return false;
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: env.fromEmail,
      to: [env.toEmail],
      reply_to: inquiry.contactMethod === "email" ? inquiry.email : undefined,
      subject: "Website inquiry",
      text: inquiryEmailText(inquiry),
    }),
  });
  if (!response.ok) {
    console.error("Inquiry delivery failed", response.status);
    return false;
  }
  return true;
}
