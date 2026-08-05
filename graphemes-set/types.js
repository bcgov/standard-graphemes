/**
 * @export
 * @typedef {object} GithubSourceConfigRepo
 * @property {string} owner
 * @property {string} name
 * @property {string} basePath
 * @property {string} languagesMetadataFile
 */

/**
 * @export
 * @typedef {object} GithubSourceConfig
 * @property {string | undefined} githubToken
 * @property {unknown | undefined} octokit
 * @property {GithubSourceConfigRepo} repo
 */

// const githubToken = process.env.GITHUB_TOKEN?.trim();
// const octokit = new Octokit(
//   githubToken
//     ? {
//         auth: githubToken,
//       }
//     : undefined,
// );
// const REPO_OWNER = "First-Peoples-Cultural-Council";
// const REPO_NAME = "unicode-resources";
// const BASE_PATH = "orthography-resources";
// const LANGUAGES_METADATA_FILE = "firstvoices_sites_metadata_2025.csv";
// const githubSourceConfig = {
//   githubToken,
//   octokit,
//   repo: {
//     owner: REPO_OWNER,
//     name: REPO_NAME,
//     languagesMetadataFile: LANGUAGES_METADATA_FILE,
//   },
// };
