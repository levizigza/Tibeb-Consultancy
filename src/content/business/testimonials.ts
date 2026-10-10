import { z } from "zod";
import { claimMetaSchema } from "@/content/model/claim";

export const testimonialSchema = claimMetaSchema.extend({
  quote: z.string().nullable(),
  attribution: z.string().nullable(),
  consented: z.boolean(),
});

export type Testimonial = z.infer<typeof testimonialSchema>;

/** No client quote, attribution, or consent record has been supplied. */
export const testimonials: readonly Testimonial[] = [];
