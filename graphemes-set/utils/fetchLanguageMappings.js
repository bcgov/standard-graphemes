import { parse } from "csv-parse/sync";

/** @typedef {import("./types.js").GithubSourceConfig} GithubSourceConfig */

/**
 * @typedef {Object.<string, string>} LanguageMap
 * Keys are language site sub-directory names, ex: `gigeenix-gitxsanimx`.
 * Values are language names, ex: `Gitsenimx̱`.
 */

/**
 * Fetch the language sites metadata file and return an object mapping that
 * maps each language site slug to a language name.
 * @param {GithubSourceConfig} githubSourceConfig
 * @returns {Promise<LanguageMap>} Mapping of language site slugs to language names.
 */
export async function fetchLanguageMappings(githubSourceConfig) {
  console.log("---");
  console.log("Fetching language mappings...");

  const { data } = await githubSourceConfig.octokit.repos.getContent({
    owner: githubSourceConfig.repo.owner,
    repo: githubSourceConfig.repo.name,
    path: `${githubSourceConfig.repo.basePath}/${githubSourceConfig.repo.languagesMetadataFile}`,
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
    const languageName = row["Language Name"];

    if (row.Slug && languageName) {
      mapping[row.Slug] = languageName;
    }
  });

  console.log("Language mapping object: ", mapping);
  console.log("---");

  return mapping;
}
