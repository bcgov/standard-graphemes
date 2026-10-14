import { Octokit } from "@octokit/rest";

/** @typedef {import("../types.js").GithubSourceConfig} GithubSourceConfig */

/**
 * Build the shared GitHub client and repository configuration.
 * @returns {GithubSourceConfig}
 */
export function getGithubSourceConfig() {
  const githubToken = process.env.GITHUB_TOKEN?.trim();

  return {
    githubToken,
    octokit: new Octokit(
      githubToken
        ? {
            auth: githubToken,
          }
        : undefined,
    ),
    repo: {
      owner: "First-Peoples-Cultural-Council",
      name: "unicode-resources",
      basePath: "orthography-resources",
      languagesMetadataFile: "firstvoices_sites_metadata_2025.csv",
    },
  };
}