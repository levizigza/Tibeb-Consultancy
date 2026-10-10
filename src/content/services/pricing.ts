import { z } from "zod";
import { claimMetaSchema } from "@/content/model/claim";

export const priceSchema = claimMetaSchema.extend({
  serviceId: z.string().trim().min(1),
  amountCad: z.number().finite().positive().nullable(),
  inclusions: z.array(z.string()),
});

export type PriceRecord = z.infer<typeof priceSchema>;

/** No fee or inclusion list has been supplied. */
export const prices: readonly PriceRecord[] = [];
