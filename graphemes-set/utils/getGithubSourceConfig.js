import { Octokit } from "@octokit/rest";

/** @typedef {import("../types.js").SourceConfig} SourceConfig */

/**
 * Build the shared GitHub client and repository configuration.
 * @returns {SourceConfig}
 */
export function getGithubSourceConfig() {
  const githubToken = process.env.GITHUB_TOKEN?.trim();

  return {
    source: "live-github",
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
    localRoot: "",
  };
}