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
