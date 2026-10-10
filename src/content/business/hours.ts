import { z } from "zod";
import { claimMetaSchema, draftClaim } from "@/content/model/claim";

export const weekdays = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
] as const;

export const hoursEntrySchema = z.object({
  day: z.enum(weekdays),
  opens: z.string().nullable(),
  closes: z.string().nullable(),
});

export const businessHoursSchema = claimMetaSchema.extend({
  timeZone: z.string().nullable(),
  entries: z.array(hoursEntrySchema),
});

export type BusinessHours = z.infer<typeof businessHoursSchema>;

/** No timezone or weekly hours have been supplied. */
export const businessHours: BusinessHours = {
  id: "weekly-hours",
  timeZone: null,
  entries: [],
  ...draftClaim,
};
