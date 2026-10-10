import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { previewCopyIssues } from "@/content/site/preview-questions";
import {
  finderIntents,
  finderMessages,
  finderMessagesForLocale,
} from "@/content/site/service-finder";
import { FinderResult, ServiceFinder } from "@/components/service-finder/service-finder";
import { linksForIntentFromPages, publishedLinksForIntent } from "@/lib/service-finder/match";
import { initialFinderState, reduceFinder } from "@/lib/service-finder/state";
import type { FinderPublishedLink } from "@/lib/service-finder/match";

const prompts = [
  "I need help with a resume or finding employment.",
  "I need help with taxes or business records.",
  "I need help understanding general government paperwork.",
  "I'm looking for immigration or citizenship information.",
  "I'm not sure which service I need.",
];

const approvedResume: FinderPublishedLink = {
  id: "resume-writing",
  familyId: "career-employment",
  name: "Resume writing",
  summary: "Approved summary for a published page.",
  path: "/services/career-employment/resume-writing",
};

describe("service finder mapping", () => {
  it("uses the five visitor sentences and does not guess when the visitor is unsure", () => {
    expect(finderIntents.map((intent) => intent.prompt)).toEqual(prompts);
    expect(finderIntents.find((intent) => intent.id === "unsure")?.categoryId).toBeNull();
    expect(finderMessagesForLocale("am")).toBe(finderMessages);
  });

  it("links only a published page in the chosen family", () => {
    expect(publishedLinksForIntent("career")).toEqual([]);
    expect(publishedLinksForIntent("tax")).toEqual([]);
    expect(publishedLinksForIntent("government")).toEqual([]);
    expect(publishedLinksForIntent("immigration")).toEqual([]);
    expect(publishedLinksForIntent("unsure")).toEqual([]);

    expect(linksForIntentFromPages("career", [approvedResume])).toEqual([approvedResume]);
    expect(linksForIntentFromPages("immigration", [approvedResume])).toEqual([]);
    expect(linksForIntentFromPages("unsure", [approvedResume])).toEqual([]);
    expect(
      linksForIntentFromPages("career", [{ ...approvedResume, path: "/services/career-employment/citizenship" }]),
    ).toEqual([]);
  });

  it("keeps the copy free of assessments, bookings, and sensitive requests", () => {
    const copy = JSON.stringify({ finderIntents, finderMessages });
    expect(previewCopyIssues(copy)).toEqual([]);
    expect(copy.toLowerCase()).not.toContain("you qualify");
    expect(copy.toLowerCase()).not.toContain("social insurance");
    expect(copy.toLowerCase()).not.toContain("passport");
    expect(copy.toLowerCase()).not.toContain("chatbot");
  });
});

describe("service finder interaction", () => {
  it("moves to the result, then back, then clears on restart", () => {
    const chosen = reduceFinder(initialFinderState, { type: "choose", intentId: "tax" });
    expect(chosen).toEqual({ step: "result", intentId: "tax" });

    const back = reduceFinder(chosen, { type: "back" });
    expect(back).toEqual({ step: "choose", intentId: "tax" });

    const again = reduceFinder(back, { type: "choose", intentId: "tax" });
    expect(reduceFinder(again, { type: "restart" })).toEqual(initialFinderState);
    expect(reduceFinder(initialFinderState, { type: "choose", intentId: "unknown" })).toEqual(initialFinderState);
  });

  it("renders large choice buttons and no personal-detail fields", () => {
    const markup = renderToStaticMarkup(
      createElement(ServiceFinder, {
        locale: "om",
        choices: finderIntents.map((intent) => ({ intentId: intent.id, links: [] })),
      }),
    );

    const text = markup.replaceAll("&#x27;", "'");
    expect(markup).toContain('lang="en"');
    expect(markup).toContain("Step 1 of 2");
    for (const prompt of prompts) expect(text).toContain(prompt);
    expect(markup).toContain('type="button"');
    expect(markup).toContain("min-h-16");
    expect(markup).not.toContain("<input");
    expect(markup).not.toContain("<textarea");
    expect(markup).not.toContain('type="file"');
  });

  it("shows the empty state and a locale-preserving inquiry link", () => {
    const markup = renderToStaticMarkup(
      createElement(FinderResult, {
        locale: "ti",
        intentId: "immigration",
        links: [],
        onBack: () => undefined,
        onRestart: () => undefined,
      }),
    );

    expect(markup).toContain("Not currently offered");
    expect(markup).toContain("Paid immigration and citizenship help stays unpublished");
    expect(markup).toContain('href="/ti/contact"');
    expect(markup).toContain("Back");
    expect(markup).toContain("Start again");
    expect(markup).toContain('tabindex="-1"');
    expect(markup).not.toContain("/services/immigration-citizenship/citizenship");
  });

  it("shows a published service in the visitor's locale and still offers an inquiry", () => {
    const markup = renderToStaticMarkup(
      createElement(FinderResult, {
        locale: "en",
        intentId: "career",
        links: [approvedResume],
        onBack: () => undefined,
        onRestart: () => undefined,
      }),
    );

    expect(markup).toContain("Published services");
    expect(markup).toContain('href="/en/services/career-employment/resume-writing"');
    expect(markup).toContain("Approved summary for a published page.");
    expect(markup).toContain('href="/en/contact"');
    expect(markup).not.toContain("Not currently offered");
  });
});
