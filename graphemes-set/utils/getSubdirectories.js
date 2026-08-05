/** @typedef {import("./types.js").GithubSourceConfig} GithubSourceConfig */

/**
 * Fetch the list of sub-directories in the `orthography-resources`
 * directory. Each subdirectory represents one language site.
 * @returns {Promise<string[]>} List of sub-directories in the
 * `orthography-resources` directory.
 * @param {GithubSourceConfig} githubSourceConfig
 */
export async function getSubdirectories(githubSourceConfig) {
  const { data } = await githubSourceConfig.octokit.repos.getContent({
    owner: githubSourceConfig.repo.owner,
    repo: githubSourceConfig.repo.name,
    path: githubSourceConfig.repo.basePath,
  });

  if (!Array.isArray(data)) {
    throw new Error(
      `Expected ${githubSourceConfig.repo.basePath} to be a directory (got a file response).`,
    );
  }

  const languageDirectories = data
    .filter((item) => item.type === "dir")
    .map((dir) => dir.name);

  console.log("---");
  console.log("Fetching subdirectories in orthography-resources directory...");
  console.log(
    "Count of language directories found: ",
    languageDirectories.length,
  );
  console.log("Language directories: ", languageDirectories);
  console.log("---");

  return languageDirectories;
}
