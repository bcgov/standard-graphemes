/**
 * @export
 * @typedef {object} SourceConfigRepo
 * @property {string} owner
 * @property {string} name
 * @property {string} basePath
 * @property {string} languagesMetadataFile
 */

/**
 * @export
 * @typedef {object} SourceConfig
 * @property {"live-github" | "local-copy"} source
 * @property {string | undefined} githubToken
 * @property {unknown | undefined} octokit
 * @property {string} localRoot
 * @property {SourceConfigRepo} repo
 */
