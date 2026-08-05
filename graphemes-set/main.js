import fs from "node:fs";
import { Octokit } from "@octokit/rest";
import anyAscii from "any-ascii";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

import { escapeCsvValue } from "./utils/escapeCsvValue.js";
import { fetchCharacters } from "./utils/fetchCharacters.js";
import { fetchLanguageMappings } from "./utils/fetchLanguageMappings.js";
import { getSubdirectories } from "./utils/getSubdirectories.js";
import { getUnicodeCodePoints } from "./utils/getUnicodeCodePoints.js";
import { getUnicodeEscapes } from "./utils/getUnicodeEscapes.js";

/** @typedef {import("./types.js").GithubSourceConfig} GithubSourceConfig */

const argv = yargs(hideBin(process.argv)).parse();
const format = argv.format ?? "full";
const isCompact = format === "compact";
const OUTPUT_FILE = isCompact ? "output-compact.csv" : "output-full.csv";
const githubToken = process.env.GITHUB_TOKEN?.trim();

/** @type {GithubSourceConfig} */
const githubSourceConfig = {
  githubToken,
  octokit: new Octokit(
    githubToken
      ? {
          auth: githubToken,
        }
      : undefined,
  ),
  repo: {
    owner: "First-Peoples-Cultural-Council",
    name: "unicode-resources",
    basePath: "orthography-resources",
    languagesMetadataFile: "firstvoices_sites_metadata_2025.csv",
  },
};

async function main() {
  if (!githubToken) {
    console.warn(
      "No GITHUB_TOKEN found. Requests are unauthenticated and more likely to hit rate limits.",
    );
  }

  const subdirs = await getSubdirectories(githubSourceConfig);
  const languageMappings = await fetchLanguageMappings(githubSourceConfig);
  const characterMap = new Map();

  for (const subdir of subdirs) {
    const languageName = languageMappings[subdir] || subdir;
    const characters = await fetchCharacters(subdir, githubSourceConfig);
    characters.forEach((char) => {
      /**
       * @type {string} Normalized form D (NFD) of the character.
       */
      const nfd = char.normalize("NFD");
      /**
       * @type {string} Normalized form C (NFC) of the character.
       */
      const nfc = char.normalize("NFC");
      const key = char;

      // If the character doesn't already exist in the map, add it.
      // This will use whatever normalization form comes in the source CSV as a
      // key in the map.
      if (!characterMap.has(key)) {
        characterMap.set(key, {
          Character: char,
          NFD: nfd,
          NFC: nfc,
          // Unicode escapes look like `\u006B\u0331`.
          "NFD Escaped": getUnicodeEscapes(nfd),
          "NFC Escaped": getUnicodeEscapes(nfc),
          // Unicode code points look like `U+006B U+0331` (space-separated).
          "NFD Code Points": getUnicodeCodePoints(nfd),
          "NFC Code Points": getUnicodeCodePoints(nfc),
          // `Languages` is a Set, and for each occurrence of the character, we
          // will add the language where it was found to the Set.
          // Multiple websites can exist for a given language, so by keeping
          // track of the language only, we are stripping the language site slug
          // (sub-directory name) from our output.
          Languages: new Set(),
        });
      }

      // This sits outside of the `if` block above because we always want to add
      // a new language occurrence when we find it.
      // Note that the fact that we are using a Set ensures uniqueness, and
      // duplicates won't be added.
      characterMap.get(key).Languages.add(languageName);
    });
  }

  const columns = isCompact
    ? ["Character", "NFD Code Points", "NFC Code Points"]
    : [
        "Character",
        "NFD",
        "NFC",
        "NFD Escaped",
        "NFC Escaped",
        "NFD Code Points",
        "NFC Code Points",
        "AnyAscii",
        "Languages",
      ];

  // This is the header row for the CSV.
  const results = [columns];

  // For each character in the map, we will add a row to the CSV, and each
  // column will be escaped by `escapeCsvValue()`.
  characterMap.forEach(
    ({
      Character,
      NFD,
      NFC,
      "NFD Escaped": NFDUnicode,
      "NFC Escaped": NFCUnicode,
      "NFD Code Points": NFDCodePoints,
      "NFC Code Points": NFCCodePoints,
      Languages,
    }) => {
      const row = isCompact
        ? [
            escapeCsvValue(Character),
            escapeCsvValue(NFDCodePoints),
            escapeCsvValue(NFCCodePoints),
          ]
        : [
            escapeCsvValue(Character),
            escapeCsvValue(NFD),
            escapeCsvValue(NFC),
            escapeCsvValue(NFDUnicode),
            escapeCsvValue(NFCUnicode),
            escapeCsvValue(NFDCodePoints),
            escapeCsvValue(NFCCodePoints),
            escapeCsvValue(anyAscii(Character)),
            escapeCsvValue(Array.from(Languages).join(",")),
          ];

      results.push(row);
    },
  );

  fs.writeFileSync(OUTPUT_FILE, results.map((row) => row.join(",")).join("\n"));
  console.log(`CSV output written to ${OUTPUT_FILE}`);
}

main().catch(console.error);
