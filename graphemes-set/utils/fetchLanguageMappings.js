import { parse } from "csv-parse/sync";
import { fetchCsv } from "./fetchCsv.js";

/** @typedef {import("./types.js").SourceConfig} SourceConfig */

/**
 * @typedef {Object.<string, string>} LanguageMap
 * Keys are language site sub-directory names, ex: `gigeenix-gitxsanimx`.
 * Values are language names, ex: `Gitsenimx̱`.
 */

/**
 * Fetch the language sites metadata file and return an object mapping that
 * maps each language site slug to a language name.
 * @param {SourceConfig} sourceConfig
 * @returns {Promise<LanguageMap>} Mapping of language site slugs to language names.
 */
export async function fetchLanguageMappings(sourceConfig) {
  console.log("---");
  console.log("Fetching language mappings...");

  const csvData = await fetchCsv(
    "",
    sourceConfig.repo.languagesMetadataFile,
    sourceConfig,
  );

  if (!csvData) return {};

  const records = parse(csvData, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
  });

  /** @type {LanguageMap} */
  const mapping = {};

  records.forEach((row) => {
    const languageName = row["Language Name"];

    if (row.Slug && languageName) {
      mapping[row.Slug] = languageName;
    }
  });

  console.log("Language mapping object: ", mapping);
  console.log("---");

  return mapping;
}
