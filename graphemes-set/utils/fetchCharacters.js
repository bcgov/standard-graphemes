import { parse } from "csv-parse/sync";

import { fetchCsv } from "./fetchCsv.js";

/** @typedef {import("./types.js").GithubSourceConfig} GithubSourceConfig */

/**
 * Given a language site sub-directory, returns the list of characters from the
 * `Character` column of the CSV.
 * @param {string} subdir Target language site represented by the sub-directory.
 * @param {githubSourceConfig} GithubSourceConfig
 * @returns {string[]} List of characters from the `Characters` column of the CSV.
 */
export async function fetchCharacters(subdir, githubSourceConfig) {
  const csvData = await fetchCsv(
    subdir,
    "alphabet_ordering.csv",
    githubSourceConfig,
  );
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
