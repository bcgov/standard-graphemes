import { parse } from "csv-parse/sync";

import { fetchCsv } from "./fetchCsv.js";

/** @typedef {import("./types.js").GithubSourceConfig} GithubSourceConfig */

/**
 * Fetch variants keyed by their base alphabet character.
 * @param {string} subdir Target language site represented by the sub-directory.
 * @param {GithubSourceConfig} githubSourceConfig
 * @returns {Promise<Map<string, string[]>>}
 */
export async function fetchCharacterVariants(subdir, githubSourceConfig) {
  const csvData = await fetchCsv(
    subdir,
    "character_variants.csv",
    githubSourceConfig,
  );
  if (!csvData) return new Map();

  const records = parse(csvData, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
  });
  /** @type {Map<string, string[]>} */
  const variantsByCharacter = new Map();

  records.forEach((row) => {
    const baseCharacter = row["Base Character"];
    const variant = row.Variant;
    if (!baseCharacter || !variant) return;

    const variants = variantsByCharacter.get(baseCharacter) ?? [];
    if (!variants.includes(variant)) variants.push(variant);
    variantsByCharacter.set(baseCharacter, variants);
  });

  return variantsByCharacter;
}
