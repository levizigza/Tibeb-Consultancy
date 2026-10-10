import { z } from "zod";
import { claimMetaSchema } from "@/content/model/claim";

export const personSchema = claimMetaSchema.extend({
  name: z.string().nullable(),
  role: z.string().nullable(),
  bio: z.string().nullable(),
  credentialIds: z.array(z.string().trim().min(1)),
});

export type PersonProfile = z.infer<typeof personSchema>;

/** No founder or team member has been supplied. */
export const people: readonly PersonProfile[] = [];
