import { z } from "zod";

import splitCommaSeparatedString from "../utils/splitCommaSeparatedString.js";

export const LanguageSchema = z.object({
  id: z.string().describe("Globally unique GUID for the language"),
  name: z.string().describe("The name of the language, e.g., Danez?gé?"),
  alternateNames: z
    .string()
    .transform(splitCommaSeparatedString)
    .describe(
      "Other names by which the language is known, e.g., “Kaska, Kaska Dena” for Danez?gé?"
    ),
  communityKeywords: z
    .string()
    .transform(splitCommaSeparatedString)
    .describe(
      "Keywords for communities where language is spoken, comma separated. e.g., “Zaa- Blueberry River, Doig River, Halfway River, Prophet River, Saulteau, West Moberly”"
    ),
  bcp47LanguageCodes: z
    .string()
    .transform(splitCommaSeparatedString)
    .describe(
      "The IETF BCP 47 language tag(s) for the language, comma separated; i.e., a standardized code that is used to identify this language on the Internet. e.g., “crx, caf” for the “Dakelh” language."
    ),
});

export type Language = z.infer<typeof LanguageSchema>;
