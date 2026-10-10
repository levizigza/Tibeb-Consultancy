import { z } from "zod";
import { containsProhibitedServiceClaim, complianceServiceIds } from "@/content/compliance/schema";

const prose = z.string().trim().min(1);
const proseList = z.array(prose).min(1);

/**
 * Stored page fields. A draft or blocked record may omit every marketing field.
 * It is not permission to describe the work as available.
 */
export const servicePageRecordSchema = z.object({
  id: z.enum(complianceServiceIds),
  publicationStatus: z.enum(["draft", "blocked"]),
  title: z.string().nullable(),
  description: z.string().nullable(),
  audience: z.string().nullable(),
  problem: z.string().nullable(),
  deliverables: z.array(z.string()),
  inclusions: z.array(z.string()),
  exclusions: z.array(z.string()),
  requiredInformation: z.array(z.string()),
  steps: z.array(z.string()),
  priceNote: z.string().nullable(),
  turnaround: z.string().nullable(),
  faqs: z.array(
    z.object({
      question: z.string(),
      answer: z.string(),
    }),
  ),
  disclosures: z.array(z.string()),
});

export type ServicePageRecord = z.infer<typeof servicePageRecordSchema>;

export const approvedServicePageSchema = z
  .object({
    id: z.enum(complianceServiceIds),
    title: prose,
    description: prose,
    audience: prose,
    problem: prose,
    deliverables: proseList,
    inclusions: proseList,
    exclusions: proseList,
    requiredInformation: proseList,
    steps: proseList,
    priceNote: prose,
    turnaround: prose.nullable(),
    faqs: z.array(
      z.object({
        question: prose,
        answer: prose,
      }),
    ),
    disclosures: proseList,
  })
  .superRefine((record, context) => {
    const text = [
      record.title,
      record.description,
      record.audience,
      record.problem,
      record.priceNote,
      record.turnaround,
      ...record.deliverables,
      ...record.inclusions,
      ...record.exclusions,
      ...record.requiredInformation,
      ...record.steps,
      ...record.disclosures,
      ...record.faqs.flatMap((item) => [item.question, item.answer]),
    ]
      .filter((value): value is string => typeof value === "string")
      .join(" ");
    if (containsProhibitedServiceClaim(text)) {
      context.addIssue({
        code: "custom",
        message: "Approved page copy contains a prohibited claim.",
      });
    }
  });

export type ApprovedServicePage = z.infer<typeof approvedServicePageSchema>;
