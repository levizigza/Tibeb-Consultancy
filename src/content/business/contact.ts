import { z } from "zod";
import { claimMetaSchema, draftClaim } from "@/content/model/claim";

export const contactKinds = ["email", "phone", "address", "service-area"] as const;

export const contactChannelSchema = claimMetaSchema.extend({
  kind: z.enum(contactKinds),
  value: z.string().nullable(),
});

export type ContactChannel = z.infer<typeof contactChannelSchema>;

function channel(id: string, kind: ContactChannel["kind"]): ContactChannel {
  return { id, kind, value: null, ...draftClaim };
}

/** No public contact method has been supplied. */
export const contactChannels: readonly ContactChannel[] = [
  channel("email", "email"),
  channel("phone", "phone"),
  channel("address", "address"),
  channel("service-area", "service-area"),
];
