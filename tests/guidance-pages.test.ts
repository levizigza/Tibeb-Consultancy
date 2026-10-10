import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { PriceStatusList } from "@/components/pricing/price-status-list";
import { FaqAccordion } from "@/components/ui/faq-accordion";
import { ProcessList, ProcessStep } from "@/components/ui/process-step";
import { getPublicFaqs, getPublicPrices } from "@/content/retrieve";
import { clientProcess } from "@/content/site/client-process";
import { previewCopyIssues, previewQuestionSchema, previewQuestions } from "@/content/site/preview-questions";
import {
  getPublicPricePresentations,
  pricePresentationBlockReason,
  pricePresentationSchema,
  pricingPage,
  selectPublicPricePresentations,
  type PricePresentation,
} from "@/content/services/price-presentation";

const approvedMeta = {
  verification: "verified" as const,
  publicationStatus: "approved" as const,
  authorizationStatus: "not-required" as const,
  requiresRegulatoryReview: false,
  lastReviewed: "2026-01-15",
};

function presentation(overrides: Partial<PricePresentation> = {}): PricePresentation {
  return {
    id: "fixture-presentation",
    serviceId: "fixture-career",
    label: "Fixture service",
    kind: "fixed",
    amountCad: 100,
    inclusions: ["Fixture inclusion"],
    exclusions: ["Fixture exclusion"],
    thirdPartyFees: [
      {
        id: "fixture-fee",
        label: "Fixture government fee",
        amountCad: null,
        payer: "government",
        includedInServicePrice: false,
        inclusionConfirmed: false,
      },
    ],
    paymentTerms: "Fixture payment terms",
    cancellationTerms: "Fixture cancellation terms",
    ...approvedMeta,
    ...overrides,
  };
}

describe("client process", () => {
  it("lists the six stages and withholds outcomes", () => {
    expect(clientProcess.steps.map((step) => step.title)).toEqual([
      "Initial inquiry",
      "Service suitability and scope review",
      "Confirmation of fees and agreement",
      "Appropriate information collection",
      "Service delivery",
      "Completion and next steps",
    ]);
    const copy = JSON.stringify(clientProcess);
    expect(copy).toContain("Actual stages may differ by service");
    expect(previewCopyIssues(copy)).toEqual([]);
    expect(copy.toLowerCase()).not.toContain("processing time is");
  });
});

describe("pricing presentation", () => {
  it("publishes no live price", () => {
    expect(getPublicPrices()).toEqual([]);
    expect(getPublicPricePresentations()).toEqual([]);
    expect(pricingPage.rows.every((row) => row.status === "Not approved")).toBe(true);
    expect(previewCopyIssues(JSON.stringify(pricingPage))).toEqual([]);
  });

  it("rejects an amount on a quotation and an included fee that is not confirmed", () => {
    const quoted = presentation({ kind: "quotation", amountCad: 80 });
    expect(pricePresentationSchema.safeParse(quoted).success).toBe(true);
    expect(pricePresentationBlockReason(quoted)).toBe("quotation-has-amount");
    expect(selectPublicPricePresentations([quoted], new Set(["fixture-career"]))).toEqual([]);

    const included = presentation({
      thirdPartyFees: [
        {
          id: "fixture-fee",
          label: "Fixture government fee",
          amountCad: 20,
          payer: "government",
          includedInServicePrice: true,
          inclusionConfirmed: false,
        },
      ],
    });
    expect(pricePresentationBlockReason(included)).toBe("fee-included-without-confirmation");
    expect(selectPublicPricePresentations([included], new Set(["fixture-career"]))).toEqual([]);
  });

  it("rejects a fixed or starting price with no amount", () => {
    expect(pricePresentationBlockReason(presentation({ amountCad: null }))).toBe("amount-missing");
    expect(pricePresentationBlockReason(presentation({ kind: "starting", amountCad: null }))).toBe(
      "amount-missing",
    );
  });

  it("keeps a confirmed record available only for an allowed service", () => {
    const record = presentation();
    expect(selectPublicPricePresentations([record], new Set(["fixture-career"]))).toHaveLength(1);
    expect(selectPublicPricePresentations([record], new Set())).toEqual([]);
    expect(selectPublicPricePresentations([{ ...record, publicationStatus: "draft" }], new Set(["fixture-career"]))).toEqual(
      [],
    );
  });

  it("renders the empty fee list and a confirmed card without calling a fee included", () => {
    const empty = renderToStaticMarkup(createElement(PriceStatusList, { items: [] }));
    expect(empty).toContain("Approved fixed price");
    expect(empty).toContain("Not approved");
    expect(empty).toContain("grid-cols-1");
    expect(empty).not.toContain("$");

    const [item] = selectPublicPricePresentations([presentation()], new Set(["fixture-career"]));
    const card = renderToStaticMarkup(createElement(PriceStatusList, { items: [item] }));
    expect(card).toContain("Approved fixed price");
    expect(card).toContain("Inclusions");
    expect(card).toContain("Exclusions");
    expect(card).toContain("Payment terms");
    expect(card).toContain("Cancellation terms");
    expect(card).toContain("Government fee");
    expect(card).toContain("Not included in the service price.");
    expect(card).toContain("lg:grid-cols-2");
  });
});

describe("preview questions", () => {
  it("answers only the supported topics", () => {
    expect(previewQuestions.map((item) => item.question)).toEqual([
      "Which services are offered?",
      "How does consultation work?",
      "What languages are available?",
      "How are prices determined?",
      "What information might be required?",
      "How long does TIBEB's part of the service take?",
      "Is TIBEB affiliated with the Canadian government?",
      "How is customer information handled?",
      "What happens after sending an inquiry?",
    ]);
    expect(getPublicFaqs("en")).toEqual([]);
    for (const item of previewQuestions) {
      expect(previewQuestionSchema.safeParse(item).success).toBe(true);
      expect(previewCopyIssues(`${item.question} ${item.answer}`)).toEqual([]);
    }
  });

  it("keeps answers closed until a question is chosen", () => {
    const markup = renderToStaticMarkup(
      createElement(FaqAccordion, {
        items: [
          {
            id: "one",
            question: "Sample question",
            answer: "Sample answer",
            links: [{ href: "/en/pricing", label: "Pricing" }],
          },
        ],
      }),
    );
    expect(markup).toContain('type="button"');
    expect(markup).toContain('aria-expanded="false"');
    expect(markup).not.toContain("Sample answer");
    expect(markup).not.toContain("/en/pricing");
  });
});

describe("process list", () => {
  it("exposes the step number and the stage title", () => {
    const markup = renderToStaticMarkup(
      createElement(
        ProcessList,
        null,
        createElement(ProcessStep, { step: 1, title: "Initial inquiry" }, "A message cannot be sent."),
      ),
    );
    expect(markup).toContain("<ol");
    expect(markup).toContain(">1<");
    expect(markup).toContain("Initial inquiry");
    expect(markup).toContain("A message cannot be sent.");
  });
});
