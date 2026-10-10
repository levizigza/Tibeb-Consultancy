import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { FaqSection } from "@/components/sections/faq-section";
import { idleInquiryState } from "@/lib/inquiry/state";
import { InquiryForm } from "@/components/inquiry/inquiry-form";

function walk(dir: string, out: string[] = []) {
  for (const name of readdirSync(dir)) {
    const full = path.join(dir, name);
    if (statSync(full).isDirectory()) walk(full, out);
    else if (name.endsWith(".tsx")) out.push(readFileSync(full, "utf8"));
  }
  return out;
}

describe("quality safeguards", () => {
  it("renders page content without a loading shell", () => {
    const pages = walk(path.join("src", "app")).join("\n");
    expect(pages).not.toContain("This page is loading");
  });

  it("keeps motion, focus, and font fallbacks in the global stylesheet", () => {
    const css = readFileSync("src/app/globals.css", "utf8");
    const fonts = readFileSync("src/app/fonts.ts", "utf8");
    expect(css).toContain("prefers-reduced-motion: reduce");
    expect(css).toContain("animation-duration: 0.01ms");
    expect(css).toContain(".focus-target:focus");
    expect(fonts).toContain('display: "swap"');
    expect(fonts).toContain("preload: false");
    expect(fonts).toContain("adjustFontFallback: true");
  });

  it("shows questions in the page and announces inquiry errors once", () => {
    const faq = renderToStaticMarkup(
      createElement(FaqSection, {
        id: "questions",
        title: "Questions",
        items: [{ id: "one", question: "Sample question", answer: "Sample answer" }],
        empty: "None",
      }),
    );
    expect(faq).toContain("Sample answer");
    expect(faq).toContain("<h3");
    expect(faq).not.toContain("<button");

    const form = renderToStaticMarkup(
      createElement(InquiryForm, {
        locale: "en",
        action: async () => idleInquiryState,
      }),
    );
    expect(form).toContain('aria-live="assertive"');
    expect(form).toContain('lang="en"');
    expect(form).toContain("size-6");
    expect(form).not.toContain('role="radiogroup"');
    expect(form.match(/role="alert"/g)).toBeNull();
  });
});
