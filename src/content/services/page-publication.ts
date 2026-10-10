import { officialSources } from "@/content/compliance/sources";
import type { ComplianceRecord } from "@/content/compliance/schema";
import { isPaidServiceBookable } from "@/content/compliance/safeguards";
import {
  approvedServicePageSchema,
  type ApprovedServicePage,
} from "@/content/services/page-schema";

export type PublicServicePage = ApprovedServicePage & {
  sources: { title: string; publisher: string; url: string }[];
};

/**
 * A full service page is public only when the copy is complete, it avoids prohibited claims,
 * and the matching compliance record is bookable. The live catalog does not meet that bar.
 */
export function selectPublicServicePage(
  page: unknown,
  compliance: ComplianceRecord | undefined,
): PublicServicePage | null {
  const parsed = approvedServicePageSchema.safeParse(page);
  if (!parsed.success || !compliance || compliance.id !== parsed.data.id) return null;
  if (!isPaidServiceBookable(compliance)) return null;

  const sources = compliance.sourceIds.flatMap((sourceId) => {
    const source = officialSources.find((item) => item.id === sourceId);
    return source ? [{ title: source.title, publisher: source.publisher, url: source.url }] : [];
  });
  if (sources.length !== compliance.sourceIds.length) return null;

  return { ...parsed.data, sources };
}
