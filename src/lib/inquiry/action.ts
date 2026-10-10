"use server";

import { headers } from "next/headers";
import { readInquiryEnv } from "@/lib/inquiry/delivery";
import { hashClientKey, processInquiry } from "@/lib/inquiry/process";
import type { InquiryState } from "@/lib/inquiry/state";

export async function submitInquiry(_state: InquiryState, formData: FormData): Promise<InquiryState> {
  const headerList = await headers();
  const forwarded = headerList.get("x-forwarded-for")?.split(",")[0]?.trim() || headerList.get("x-real-ip") || "local";
  return processInquiry({
    formData,
    clientKey: hashClientKey(forwarded),
    now: Date.now(),
    env: readInquiryEnv(process.env),
  });
}
