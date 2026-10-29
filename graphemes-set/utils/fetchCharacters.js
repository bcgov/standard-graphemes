import { parse } from "csv-parse/sync";

import { fetchCsv } from "./fetchCsv.js";

/** @typedef {import("./types.js").SourceConfig} SourceConfig */

/**
 * Given a language site sub-directory, returns the list of characters from the
 * `Character` column of the CSV.
 * @param {string} subdir Target language site represented by the sub-directory.
 * @param {SourceConfig} sourceConfig
 * @returns {Promise<string[]>} List of characters from the `Character` column of the CSV.
 */
export async function fetchCharacters(subdir, sourceConfig) {
  const csvData = await fetchCsv(
    subdir,
    "alphabet_ordering.csv",
    sourceConfig,
  );
  if (!csvData) {
    throw new Error(
      `Could not fetch alphabet_ordering.csv from ${subdir}; character coverage cannot be verified.`,
    );
  }

  console.log("---");
  console.log(`Parsing CSV from ${subdir}...`);

  const records = parse(csvData, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
  });

  console.log("Example parsed records: ", records[0], records[1], records[2]);

  const filteredRecords = records
    .map((row) => row.Character ?? row.CHAR)
    .filter(Boolean);
  console.log("filteredRecords: ", filteredRecords);
  console.log("---");

  return filteredRecords;
}
