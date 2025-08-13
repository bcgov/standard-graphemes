import { z } from "zod";

export const GraphemeSchema = z.object({
  languageId: z.uuid().describe("GUID of the associated language"),
  siteId: z.uuid().describe("GUID of the associated site"),
  canonicalGraphemeCombination: z
    .string()
    .describe("Canonical grapheme combination"),
});

export type Grapheme = z.infer<typeof GraphemeSchema>;
