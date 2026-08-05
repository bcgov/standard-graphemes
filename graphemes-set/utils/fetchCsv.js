/** @typedef {import("./types.js").GithubSourceConfig} GithubSourceConfig */

/**
 * Fetch CSV content from a specific file in the specified sub-directory.
 * @param {string} subdir Target language site represented by the sub-directory.
 * @param {string} fileName CSV file name to fetch.
 * @param {GithubSourceConfig} githubSourceConfig
 * @returns {Promise<string>} CSV content from the target file.
 */
export async function fetchCsv(subdir, fileName, githubSourceConfig) {
  try {
    console.log("---");
    console.log(`Fetching ${fileName} from ${subdir}...`);

    const { data } = await githubSourceConfig.octokit.repos.getContent({
      owner: githubSourceConfig.repo.owner,
      repo: githubSourceConfig.repo.name,
      path: `${githubSourceConfig.repo.basePath}/${subdir}/${fileName}`,
    });
    const csvContent = Buffer.from(data.content, "base64").toString("utf-8");

    console.log("Example content: ", csvContent.split("\n").slice(0, 3));
    console.log("---");

    return csvContent;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`Error fetching ${fileName} from ${subdir}:`, message);
  }
}
