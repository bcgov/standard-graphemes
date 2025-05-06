import fs from "fs";
import { Octokit } from "@octokit/rest";
import { parse } from "csv-parse/sync";
import anyAscii from "any-ascii";

const octokit = new Octokit();
const REPO_OWNER = "First-Peoples-Cultural-Council";
const REPO_NAME = "unicode-resources";
const BASE_PATH = "orthography-resources";
const LANGUAGES_METADATA_FILE = "firstvoices_sites_metadata_2025.csv";
const OUTPUT_FILE = "output.csv";

/**
 * Fetch the list of sub-directories in the `orthography-resources`
 * directory. Each subdirectory represents one language site.
 * @returns {Promise<string[]>} List of sub-directories in the
 * `orthography-resources` directory.
 */
async function getSubdirectories() {
  const { data } = await octokit.repos.getContent({
    owner: REPO_OWNER,
    repo: REPO_NAME,
    path: BASE_PATH,
  });

  const languageDirectories = data
    .filter((item) => item.type === "dir")
    .map((dir) => dir.name);

  console.log("---");
  console.log("Fetching subdirectories in orthography-resources directory...");
  console.log(
    "Count of language directories found: ",
    languageDirectories.length
  );
  console.log("Language directories: ", languageDirectories);
  console.log("---");

  return languageDirectories;
}

/**
 * Fetch the CSV content from the `alphabet_ordering.csv` file in the specified
 * sub-directory.
 * @param {string} subdir Target language site represented by the sub-directory.
 * @returns {Promise<string>} CSV content from the `alphabet_ordering.csv` file.
 */
async function fetchCSV(subdir) {
  try {
    console.log("---");
    console.log(`Fetching CSV from ${subdir}...`);

    const { data } = await octokit.repos.getContent({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      path: `${BASE_PATH}/${subdir}/alphabet_ordering.csv`,
    });
    const csvContent = Buffer.from(data.content, "base64").toString("utf-8");

    console.log("Example content: ", csvContent.split("\n").slice(0, 3));
    console.log("---");

    return csvContent;
  } catch (error) {
    console.error(`Error fetching CSV from ${subdir}:`, error.message);
    return "";
  }
}

/**
 * Given a language site sub-directory, returns the list of characters from the
 * `Character` column of the CSV.
 * @param {string} subdir Target language site represented by the sub-directory.
 * @returns {string[]} List of characters from the `Characters` column of the CSV.
 */
async function fetchCharacters(subdir) {
  const csvData = await fetchCSV(subdir);
  if (!csvData) return [];

  console.log("---");
  console.log(`Parsing CSV from ${subdir}...`);

  const records = parse(csvData, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
  });

  console.log("Example parsed records: ", records[0], records[1], records[2]);

  const filteredRecords = records.map((row) => row.Character).filter(Boolean);
  console.log("filteredRecords: ", filteredRecords);
  console.log("---");

  return filteredRecords;
}

/**
 * @typedef {Object.<string, string>} LanguageMap
 * Keys are language site sub-directory names, ex: `gigeenix-gitxsanimx`.
 * Values are language names, ex: `Gitsenimx̱`.
 */

/**
 * Fetch the language sites metadata file and return an object mapping that
 * maps each language site slug to a language name.
 * @returns {LanguageMap} Mapping of language site slugs to language names.
 */
async function fetchLanguageMappings() {
  console.log("---");
  console.log("Fetching language mappings...");

  const { data } = await octokit.repos.getContent({
    owner: REPO_OWNER,
    repo: REPO_NAME,
    path: `${BASE_PATH}/${LANGUAGES_METADATA_FILE}`,
  });

  const csvData = Buffer.from(data.content, "base64").toString("utf-8");

  if (!csvData) return {};

  const records = parse(csvData, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
  });

  /** @type {LanguageMap} */
  const mapping = {};

  records.forEach((row) => {
    if (row.Slug && row.Language) {
      mapping[row.Slug] = row.Language;
    }
  });

  console.log("Language mapping object: ", mapping);
  console.log("---");

  return mapping;
}

/**
 * For a given string, return the Unicode escape sequences for each character.
 * @param {string} str
 * @returns {string} Ex: `\u0041\u0042\u0043`
 */
function getUnicodeEscapes(str) {
  return [...str]
    .map((char) => {
      const code = char.codePointAt(0).toString(16).toUpperCase();
      return `\\u${code.padStart(4, "0")}`;
    })
    .join("");
}

/**
 * For a given string, return the Unicode code points for each character.
 * @param {string} str
 * @returns {string} Ex: `U+0041 U+0042 U+0043`
 */
function getUnicodeCodePoints(str) {
  return [...str]
    .map((char) => {
      const code = char.codePointAt(0).toString(16).toUpperCase();
      return `U+${code.padStart(4, "0")}`;
    })
    .join(" ");
}

/**
 * For a given value, return a string escaped for use in a CSV file.
 * @param {*} value Ex: `a`
 * @returns {string} Ex: `"a"`
 */
function escapeCsvValue(value) {
  return `"${String(value).replace(/"/g, '""')}"`;
}

async function main() {
  const subdirs = await getSubdirectories();
  const languageMappings = await fetchLanguageMappings();
  const characterMap = new Map();

  for (const subdir of subdirs) {
    const languageName = languageMappings[subdir] || subdir;
    const characters = await fetchCharacters(subdir);
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

  // This is the header row for the CSV.
  const results = [
    [
      "Character",
      "NFD",
      "NFC",
      "NFD Escaped",
      "NFC Escaped",
      "NFD Code Points",
      "NFC Code Points",
      "AnyAscii",
      "Languages",
    ],
  ];

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
      results.push([
        escapeCsvValue(Character),
        escapeCsvValue(NFD),
        escapeCsvValue(NFC),
        escapeCsvValue(NFDUnicode),
        escapeCsvValue(NFCUnicode),
        escapeCsvValue(NFDCodePoints),
        escapeCsvValue(NFCCodePoints),
        escapeCsvValue(anyAscii(Character)),
        escapeCsvValue(Array.from(Languages).join(",")),
      ]);
    }
  );

  fs.writeFileSync(OUTPUT_FILE, results.map((row) => row.join(",")).join("\n"));
  console.log(`CSV output written to ${OUTPUT_FILE}`);
}

main().catch(console.error);
