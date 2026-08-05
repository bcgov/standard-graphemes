import { parse } from "csv-parse/sync";

import { fetchCsv } from "./fetchCsv.js";

/** @typedef {import("./types.js").GithubSourceConfig} GithubSourceConfig */

/**
 * @typedef {object} ConfusableRecord
 * @property {string} confusable
 * @property {string} canonicalCharacter
 */

/**
 * Given a language site sub-directory, return confusable/canonical pairs from
 * `confusable_characters.csv`.
 * @param {string} subdir Target language site represented by the sub-directory.
 * @param {GithubSourceConfig} githubSourceConfig
 * @returns {Promise<ConfusableRecord[]>} Parsed confusable records.
 */
export async function fetchConfusableCharacters(subdir, githubSourceConfig) {
  const csvData = await fetchCsv(
    subdir,
    "confusable_characters.csv",
    githubSourceConfig,
  );

  if (!csvData) return [];

  console.log("---");
  console.log(`Parsing confusable characters CSV from ${subdir}...`);

  const records = parse(csvData, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
  });

  /** @type {ConfusableRecord[]} */
  const filteredRecords = records
    .map((row) => ({
      confusable: row.Confusable,
      canonicalCharacter: row["Canonical Character"],
    }))
    .filter((row) => row.confusable && row.canonicalCharacter);

  console.log(
    "Example parsed confusable records: ",
    filteredRecords.slice(0, 3),
  );
  console.log("---");

  return filteredRecords;
}
