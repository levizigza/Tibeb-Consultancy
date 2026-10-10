import { describe, expect, it, vi } from "vitest";
import { serviceFamilies } from "@/content/site/information-architecture";
import { deliveryMode, inquiryEmailText } from "@/lib/inquiry/delivery";
import { processInquiry } from "@/lib/inquiry/process";
import { resetRateLimits } from "@/lib/inquiry/rate-limit";
import { fieldErrorsFromIssues, inquiryCategoryIds, inquiryFromFormData, parseInquiry, type ContactInquiry } from "@/lib/validation/contact-inquiry";

const emptyEnv = { resendApiKey: null, fromEmail: null, toEmail: null };
const resendEnv = {
  resendApiKey: "test-key",
  fromEmail: "inquiries@example.com",
  toEmail: "owner@example.com",
};

function form(fields: Record<string, string>): FormData {
  const data = new FormData();
  for (const [key, value] of Object.entries(fields)) data.set(key, value);
  return data;
}

const validFields = {
  fullName: "Test User",
  email: "person@example.com",
  phone: "",
  contactMethod: "email",
  preferredLanguage: "en",
  serviceCategory: "not-sure",
  inquiry: "A short question.",
  privacyAcknowledgement: "on",
  companyWebsite: "",
};

async function submit(fields: Record<string, string>, extras?: Partial<Parameters<typeof processInquiry>[0]>) {
  return processInquiry({
    formData: form(fields),
    clientKey: extras?.clientKey ?? "test-client",
    now: extras?.now ?? 1_000,
    env: extras?.env ?? emptyEnv,
    send: extras?.send,
  });
}

describe("contact inquiry", () => {
  it("accepts email or phone, trims the name, and keeps the service groups aligned", () => {
    expect(inquiryCategoryIds.slice(0, 4)).toEqual(serviceFamilies.map((family) => family.id));
    const email = parseInquiry({
      ...validFields,
      fullName: "  Test User  ",
      privacyAcknowledgement: true,
      companyWebsite: "",
    });
    expect(email.success).toBe(true);

    const phone = parseInquiry({
      ...validFields,
      email: "",
      phone: "+1 (403) 555-0100",
      contactMethod: "phone",
      inquiry: "",
      privacyAcknowledgement: true,
    });
    expect(phone.success).toBe(true);
  });

  it("reports a blank form as name, contact method, and privacy errors together", () => {
    const formData = new FormData();
    formData.set("preferredLanguage", "en");
    formData.set("serviceCategory", "not-sure");
    const result = parseInquiry(inquiryFromFormData(formData));
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(fieldErrorsFromIssues(result.error).map((error) => error.field)).toEqual([
        "fullName",
        "contactMethod",
        "privacyAcknowledgement",
      ]);
    }
  });

  it("rejects incomplete, sensitive, and oversized inquiries", () => {
    expect(parseInquiry({ ...validFields, fullName: "  ", privacyAcknowledgement: true }).success).toBe(false);
    expect(parseInquiry({ ...validFields, email: "not-an-email", privacyAcknowledgement: true }).success).toBe(false);
    expect(
      parseInquiry({
        ...validFields,
        contactMethod: "phone",
        email: "",
        phone: "123",
        privacyAcknowledgement: true,
      }).success,
    ).toBe(false);
    expect(parseInquiry({ ...validFields, privacyAcknowledgement: false }).success).toBe(false);
    expect(parseInquiry({ ...validFields, serviceCategory: "bookkeeping", privacyAcknowledgement: true }).success).toBe(false);
    expect(
      parseInquiry({
        ...validFields,
        inquiry: "My social insurance number is 123-456-789.",
        privacyAcknowledgement: true,
      }).success,
    ).toBe(false);
    expect(
      parseInquiry({
        ...validFields,
        inquiry: "Card 4242 4242 4242 4242",
        privacyAcknowledgement: true,
      }).success,
    ).toBe(false);
    expect(
      parseInquiry({ ...validFields, inquiry: "x".repeat(501), privacyAcknowledgement: true }).success,
    ).toBe(false);
  });

  it("does not contact the business in development mode", async () => {
    resetRateLimits();
    const send = vi.fn(async () => true);
    const result = await submit(validFields, { send, env: emptyEnv });
    expect(result).toEqual({ status: "not-delivered", fieldErrors: [] });
    expect(send).not.toHaveBeenCalled();
    expect(deliveryMode(emptyEnv)).toBe("development");
  });

  it("sends only after the delivery provider accepts the inquiry", async () => {
    resetRateLimits();
    const send = vi.fn(async (inquiry: ContactInquiry) => {
      expect(inquiryEmailText(inquiry)).not.toContain("companyWebsite");
      expect(inquiryEmailText(inquiry)).toContain("Test User");
      expect(inquiryEmailText(inquiry)).not.toContain("extra-secret");
      return true;
    });
    const delivered = await submit(validFields, { send, env: resendEnv, clientKey: "deliver" });
    expect(delivered.status).toBe("delivered");
    expect(send).toHaveBeenCalledOnce();

    resetRateLimits();
    const failed = await submit(validFields, {
      send: async () => false,
      env: resendEnv,
      clientKey: "fail",
    });
    expect(failed.status).toBe("delivery-failed");
  });

  it("blocks a honeypot and repeated submissions without describing the inquiry", async () => {
    resetRateLimits();
    const send = vi.fn(async () => true);
    const honeypot = await submit(
      { ...validFields, companyWebsite: "https://example.com" },
      { send, env: resendEnv, clientKey: "bot" },
    );
    expect(honeypot).toEqual({ status: "not-accepted", fieldErrors: [] });
    expect(send).not.toHaveBeenCalled();

    resetRateLimits();
    let last = await submit(validFields, { clientKey: "repeat", now: 5_000 });
    for (let count = 0; count < 8; count += 1) {
      last = await submit({ ...validFields, fullName: "" }, { clientKey: "repeat", now: 5_000 + count });
    }
    expect(last.status).toBe("rate-limited");
    expect(JSON.stringify(last)).not.toContain("Test User");
  });
});
