import { fileURLToPath } from "node:url";

/** @typedef {import("../types.js").SourceConfig} SourceConfig */

/**
 * Configure the local FirstVoices dataset under the package's input directory.
 * @returns {SourceConfig}
 */
export function getLocalSourceConfig() {
  return {
    source: "local-copy",
    githubToken: undefined,
    octokit: undefined,
    repo: {
      owner: "First-Peoples-Cultural-Council",
      name: "unicode-resources",
      basePath: "orthography-resources",
      languagesMetadataFile: "firstvoices_sites_metadata_2025.csv",
    },
    localRoot: fileURLToPath(
      new URL("../input/orthography-resources", import.meta.url),
    ),
  };
}
