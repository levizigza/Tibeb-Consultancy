import { resourceSourceSchema, type ResourceSource } from "@/content/resources/schema";

const accessedOn = "2026-10-10";

/**
 * Official pages checked for the resource catalogue.
 * A link is not an interpretation of the page, and it is not legal or tax advice.
 */
export const resourceSources: readonly ResourceSource[] = resourceSourceSchema.array().parse([
  {
    id: "job-bank-resume",
    title: "How to write a resume",
    publisher: "Job Bank",
    url: "https://www.jobbank.gc.ca/findajob/resources/write-good-resume",
    accessedOn,
  },
  {
    id: "cra-get-ready",
    title: "Get ready to do your taxes",
    publisher: "Canada Revenue Agency",
    url: "https://www.canada.ca/en/services/taxes/income-tax/personal-income-tax/get-ready-taxes.html",
    accessedOn,
  },
  {
    id: "cra-keeping-records",
    title: "Keeping records",
    publisher: "Canada Revenue Agency",
    url: "https://www.canada.ca/en/revenue-agency/services/tax/businesses/topics/keeping-records.html",
    accessedOn,
  },
  {
    id: "cra-forms",
    title: "Forms and publications",
    publisher: "Canada Revenue Agency",
    url: "https://www.canada.ca/en/revenue-agency/services/forms-publications.html",
    accessedOn,
  },
]);

export function resourceSource(id: string): ResourceSource | undefined {
  return resourceSources.find((source) => source.id === id);
}
