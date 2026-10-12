import { z } from "zod";
import { hasText, isEstablishedPublicClaim, claimMetaSchema } from "@/content/model/claim";
import { getPublicOfferings } from "@/content/services/publication";

export const priceKinds = ["fixed", "starting", "quotation"] as const;
export const feePayers = ["third-party", "government"] as const;

export type PriceKind = (typeof priceKinds)[number];
export type FeePayer = (typeof feePayers)[number];

const thirdPartyFeeSchema = z.object({
  id: z.string().trim().min(1),
  label: z.string().trim().min(1),
  amountCad: z.number().finite().positive().nullable(),
  payer: z.enum(feePayers),
  includedInServicePrice: z.boolean(),
  inclusionConfirmed: z.boolean(),
});

export const pricePresentationSchema = claimMetaSchema.extend({
  serviceId: z.string().trim().min(1),
  label: z.string().trim().min(1),
  kind: z.enum(priceKinds),
  amountCad: z.number().finite().positive().nullable(),
  inclusions: z.array(z.string()),
  exclusions: z.array(z.string()),
  thirdPartyFees: z.array(thirdPartyFeeSchema),
  paymentTerms: z.string().nullable(),
  cancellationTerms: z.string().nullable(),
});

export type PricePresentation = z.infer<typeof pricePresentationSchema>;

export type PublicPricePresentation = {
  id: string;
  serviceId: string;
  label: string;
  kind: PriceKind;
  amountCad: number | null;
  inclusions: string[];
  exclusions: string[];
  thirdPartyFees: {
    id: string;
    label: string;
    amountCad: number | null;
    payer: FeePayer;
    includedInServicePrice: boolean;
  }[];
  paymentTerms: string | null;
  cancellationTerms: string | null;
};

/** No fee presentation has been supplied. */
export const pricePresentations: readonly PricePresentation[] = [];

export const pricingPage = {
  title: "Pricing",
  lede: "Fees are discussed after we understand the work. This page does not list an amount.",
  governmentFee:
    "A charge from a government or another party is separate unless we have agreed that it is included.",
  rows: [
    { id: "fixed", label: "Approved fixed price", status: "Not approved" },
    { id: "starting", label: "Verified starting price", status: "Not approved" },
    { id: "quotation", label: "Custom quotation", status: "Not approved" },
    { id: "inclusions", label: "Inclusions", status: "Not approved" },
    { id: "exclusions", label: "Exclusions", status: "Not approved" },
    { id: "fees", label: "Third-party or government fees", status: "Not approved" },
    { id: "payment", label: "Payment terms", status: "Not approved" },
    { id: "cancellation", label: "Cancellation terms", status: "Not approved" },
  ],
} as const;

export function pricePresentationBlockReason(price: PricePresentation): string | null {
  if (price.kind === "quotation" && price.amountCad !== null) return "quotation-has-amount";
  if (price.kind !== "quotation" && price.amountCad === null) return "amount-missing";
  if (price.thirdPartyFees.some((fee) => fee.includedInServicePrice && !fee.inclusionConfirmed)) {
    return "fee-included-without-confirmation";
  }
  if (price.inclusions.some((item) => !hasText(item))) return "blank-inclusion";
  if (price.exclusions.some((item) => !hasText(item))) return "blank-exclusion";
  if (price.paymentTerms !== null && !hasText(price.paymentTerms)) return "blank-payment-terms";
  if (price.cancellationTerms !== null && !hasText(price.cancellationTerms)) return "blank-cancellation-terms";
  return null;
}

export function selectPublicPricePresentations(
  records: readonly unknown[],
  allowedServiceIds?: ReadonlySet<string>,
): PublicPricePresentation[] {
  return records.flatMap((record) => {
    const parsed = pricePresentationSchema.safeParse(record);
    if (!parsed.success) return [];
    const price = parsed.data;
    if (pricePresentationBlockReason(price)) return [];
    if (allowedServiceIds && !allowedServiceIds.has(price.serviceId)) return [];
    const inclusions = price.inclusions.filter(hasText);
    const exclusions = price.exclusions.filter(hasText);
    const valuePresent = hasText(price.label) && (price.kind === "quotation" || price.amountCad !== null);
    if (!isEstablishedPublicClaim({ ...price, valuePresent })) return [];
    return [
      {
        id: price.id,
        serviceId: price.serviceId,
        label: price.label,
        kind: price.kind,
        amountCad: price.amountCad,
        inclusions,
        exclusions,
        thirdPartyFees: price.thirdPartyFees.map((fee) => ({
          id: fee.id,
          label: fee.label,
          amountCad: fee.amountCad,
          payer: fee.payer,
          includedInServicePrice: fee.includedInServicePrice && fee.inclusionConfirmed,
        })),
        paymentTerms: hasText(price.paymentTerms) ? price.paymentTerms.trim() : null,
        cancellationTerms: hasText(price.cancellationTerms) ? price.cancellationTerms.trim() : null,
      },
    ];
  });
}

export function getPublicPricePresentations(): PublicPricePresentation[] {
  const allowed = new Set(getPublicOfferings("en").map((item) => item.id));
  return selectPublicPricePresentations(pricePresentations, allowed);
}
