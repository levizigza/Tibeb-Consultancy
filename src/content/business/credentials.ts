import { z } from "zod";
import { claimMetaSchema } from "@/content/model/claim";

export const credentialSchema = claimMetaSchema.extend({
  title: z.string().nullable(),
  issuer: z.string().nullable(),
  identifier: z.string().nullable(),
  holderId: z.string().nullable(),
});

export type Credential = z.infer<typeof credentialSchema>;

/** No credential has been supplied. Do not add a placeholder licence or designation. */
export const credentials: readonly Credential[] = [];
