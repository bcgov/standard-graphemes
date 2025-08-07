import { z } from "zod";

export const SiteSchema = z.object({
  id: z.uuid().describe("Globally unique GUID for the site"),
  slug: z.string().describe("Human-readable URL fragment"),
  firstVoicesSiteName: z.string("Name of the First Voices site"),
  siteUrl: z.url().describe("First Voices site URL"),
  languageId: z.uuid().describe("GUID of the associated language"),
});

export type Site = z.infer<typeof SiteSchema>;
