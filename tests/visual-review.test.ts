import { readdirSync, readFileSync, statSync } from "node:fs";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { FaqSection } from "@/components/sections/faq-section";
import { rhythm } from "@/components/sections/rhythm";
import { servicePages } from "@/content/site/information-architecture";
import { homePage } from "@/content/translations/home";

function sourceFiles(directory: string): { path: string; text: string }[] {
  return readdirSync(directory).flatMap((name) => {
    const full = `${directory}/${name}`;
    if (statSync(full).isDirectory()) return sourceFiles(full);
    return name.endsWith(".tsx") ? [{ path: full, text: readFileSync(full, "utf8") }] : [];
  });
}

describe("visual rhythm", () => {
  it("keeps the documented section spacing", () => {
    expect(rhythm).toEqual({
      hero: "py-3xl md:py-4xl lg:py-5xl",
      quiet: "py-xl md:py-2xl",
      split: "py-2xl md:py-3xl",
      grid: "py-2xl md:py-3xl",
      process: "py-2xl md:py-3xl",
      proof: "py-lg md:py-xl",
      faq: "py-2xl md:py-3xl",
      cta: "py-3xl md:py-4xl",
    });
  });

  it("uses one heading size for section titles", () => {
    const files = sourceFiles("src");
    const smallSectionTitles = files.filter((file) => /<h2[^>]*text-heading-sm/.test(file.text));
    expect(smallSectionTitles.map((file) => file.path)).toEqual([]);
    const quiet = readFileSync("src/components/sections/quiet-editorial-section.tsx", "utf8");
    expect(quiet).toContain('className="text-heading font-semibold"');
    expect(quiet).not.toContain("text-heading-sm");
  });

  it("reserves a 3:2 frame when a photograph has alt text, and a notice when it does not", () => {
    const source = readFileSync("src/components/sections/split-section.tsx", "utf8");
    expect(source).toContain("No photograph has been supplied.");
    expect(source).toContain("image.alt.trim()");
    expect(source).toContain("aspect-[3/2]");
    expect(source).toContain("object-cover");
  });

  it("styles named service links like other text links", () => {
    const files = sourceFiles("src");
    expect(files.some((file) => file.text.includes("decoration-foreground/30"))).toBe(false);
  });
});

describe("task paths", () => {
  it("names resume writing, bookkeeping, and payroll on real routes", () => {
    expect(servicePages.find((page) => page.id === "resume-writing")?.path).toBe(
      "/services/career-employment/resume-writing",
    );
    expect(servicePages.find((page) => page.id === "bookkeeping")?.path).toBe(
      "/services/tax-business-administration/bookkeeping",
    );
    expect(servicePages.find((page) => page.id === "payroll")?.path).toBe(
      "/services/tax-business-administration/payroll",
    );
  });

  it("links the empty question block to Resources, where fees and government answers live", () => {
    const page = readFileSync("src/app/[locale]/page.tsx", "utf8");
    expect(page).toContain('label: "Resources"');
    expect(homePage.faqEmpty).toContain("Resources page");
    expect(homePage.governmentValue).toContain("does not present the business as a government channel");
    expect(homePage.credentialValue).toBe("No credential is approved for publication.");
    expect(homePage.aboutFounder).toContain("No founder name");
    const questions = renderToStaticMarkup(
      createElement(FaqSection, {
        id: "questions",
        title: "Questions",
        items: [],
        empty: homePage.faqEmpty,
        emptyLink: { href: "/en/resources", label: "Resources" },
      }),
    );
    expect(questions).toContain('href="/en/resources"');
    expect(readFileSync("src/app/[locale]/how-it-works/page.tsx", "utf8")).toContain('href="/pricing"');
    expect(readFileSync("src/app/[locale]/about/page.tsx", "utf8")).toContain("Founder profile");
  });
});
