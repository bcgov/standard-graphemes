import { readdir } from "node:fs/promises";

/** @typedef {import("./types.js").SourceConfig} SourceConfig */

/**
 * List language-site subdirectories from the selected data source.
 * @returns {Promise<string[]>} List of sub-directories in the
 * `orthography-resources` directory.
 * @param {SourceConfig} sourceConfig
 */
export async function getSubdirectories(sourceConfig) {
  let languageDirectories;
  if (sourceConfig.source === "local-copy") {
    const entries = await readdir(sourceConfig.localRoot, { withFileTypes: true });
    languageDirectories = entries
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name);
  } else {
    const { data } = await sourceConfig.octokit.repos.getContent({
      owner: sourceConfig.repo.owner,
      repo: sourceConfig.repo.name,
      path: sourceConfig.repo.basePath,
    });

    if (!Array.isArray(data)) {
      throw new Error(
        `Expected ${sourceConfig.repo.basePath} to be a directory (got a file response).`,
      );
    }

    languageDirectories = data
      .filter((item) => item.type === "dir")
      .map((dir) => dir.name);
  }

  console.log("---");
  console.log(`Reading language subdirectories (${sourceConfig.source})...`);
  console.log(
    "Count of language directories found: ",
    languageDirectories.length,
  );
  console.log("Language directories: ", languageDirectories);
  console.log("---");

  return languageDirectories;
}
