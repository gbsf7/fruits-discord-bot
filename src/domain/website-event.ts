import { z } from "zod";

/**
 * Starter contract only.
 * Replace/extend this schema once the Fruits website event contract is defined.
 */
export const websiteEventSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("announcement.created"),
    eventId: z.string().min(1),
    occurredAt: z.iso.datetime(),
    payload: z.object({
      title: z.string().min(1),
      message: z.string().min(1)
    })
  })
]);

export type WebsiteEvent = z.infer<typeof websiteEventSchema>;
