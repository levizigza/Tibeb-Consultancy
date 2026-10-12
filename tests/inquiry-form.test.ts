import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { InquiryForm } from "@/components/inquiry/inquiry-form";
import { inquiryMessages } from "@/lib/inquiry/messages";
import { idleInquiryState } from "@/lib/inquiry/state";

describe("inquiry form", () => {
  it("exposes labels, instructions, and a keyboard-reachable submit control", async () => {
    const markup = renderToStaticMarkup(
      createElement(InquiryForm, {
        locale: "en",
        action: async () => idleInquiryState,
      }),
    );

    expect(markup).toContain("Full name");
    expect(markup).toContain('type="email"');
    expect(markup).toContain('type="tel"');
    expect(markup).toContain("Preferred contact method");
    expect(markup).toContain("Preferred language");
    expect(markup).toContain("Not sure");
    expect(markup).toContain(inquiryMessages.privacy);
    expect(markup).toContain('name="companyWebsite"');
    expect(markup).toContain('tabindex="-1"');
    expect(markup).toContain('type="submit"');
    expect(markup).toContain("not the language of a meeting");
    expect(markup).not.toContain('type="file"');
    expect(markup).not.toContain("book now");
  });
});
