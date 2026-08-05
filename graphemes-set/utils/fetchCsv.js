/** @typedef {import("./types.js").GithubSourceConfig} GithubSourceConfig */

/**
 * Fetch the CSV content from the `alphabet_ordering.csv` file in the specified
 * sub-directory.
 * @param {string} subdir Target language site represented by the sub-directory.
 * @param {GithubSourceConfig} githubSourceConfig
 * @returns {Promise<string>} CSV content from the `alphabet_ordering.csv` file.
 */
export async function fetchCsv(subdir, githubSourceConfig) {
  try {
    console.log("---");
    console.log(`Fetching CSV from ${subdir}...`);

    const { data } = await githubSourceConfig.octokit.repos.getContent({
      owner: githubSourceConfig.repo.owner,
      repo: githubSourceConfig.repo.name,
      path: `${githubSourceConfig.repo.basePath}/${subdir}/alphabet_ordering.csv`,
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
