import type { InquiryFieldError } from "@/lib/validation/contact-inquiry";

export type InquiryStatus =
  | "idle"
  | "not-delivered"
  | "delivered"
  | "rejected"
  | "rate-limited"
  | "delivery-failed"
  | "not-accepted";

export type InquiryState = {
  status: InquiryStatus;
  fieldErrors: InquiryFieldError[];
};

export const idleInquiryState: InquiryState = { status: "idle", fieldErrors: [] };
