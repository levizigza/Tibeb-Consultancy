import type { ResourceCategoryId } from "@/content/resources/schema";

export const resourceCategories = [
  {
    id: "career-employment",
    label: "Career and employment",
    description: "Guides about gathering facts before a resume or a job application.",
  },
  {
    id: "government-information",
    label: "General government information",
    description: "Pointers to official Government of Canada pages. Not a government channel.",
  },
  {
    id: "tax-preparation",
    label: "Tax preparation",
    description: "Organization before a tax appointment. Not a tax calculation.",
  },
  {
    id: "bookkeeping",
    label: "Bookkeeping",
    description: "How a small business can group records. Not a set of books.",
  },
  {
    id: "payroll-fundamentals",
    label: "Payroll fundamentals",
    description: "No payroll guide is in this catalogue.",
  },
  {
    id: "client-checklists",
    label: "Client preparation checklists",
    description: "What this website asks for, and what it does not accept.",
  },
] as const satisfies readonly {
  id: ResourceCategoryId;
  label: string;
  description: string;
}[];

export function resourceCategory(id: ResourceCategoryId) {
  return resourceCategories.find((category) => category.id === id);
}
