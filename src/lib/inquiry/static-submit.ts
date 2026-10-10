import type { InquiryState } from "@/lib/inquiry/state";

export async function submitInquiry(): Promise<InquiryState> {
  return { status: "not-delivered", fieldErrors: [] };
}
