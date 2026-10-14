import { readFile } from "node:fs/promises";
import path from "node:path";

/** @typedef {import("./types.js").SourceConfig} SourceConfig */

/**
 * Fetch CSV content from a specific file in the specified sub-directory.
 * @param {string} subdir Target language site represented by the sub-directory.
 * @param {string} fileName CSV file name to fetch.
 * @param {SourceConfig} sourceConfig
 * @returns {Promise<string | undefined>} CSV content, or undefined when unavailable.
 */
export async function fetchCsv(subdir, fileName, sourceConfig) {
  const relativePath = [subdir, fileName].filter(Boolean).join("/");
  try {
    console.log("---");
    console.log(
      `Reading ${fileName}${subdir ? ` from ${subdir}` : ""} (${sourceConfig.source})...`,
    );

    if (sourceConfig.source === "local-copy") {
      const csvContent = await readFile(
        path.join(sourceConfig.localRoot, relativePath),
        "utf-8",
      );
      console.log("Example content: ", csvContent.split("\n").slice(0, 3));
      console.log("---");
      return csvContent;
    }

    const { data } = await sourceConfig.octokit.repos.getContent({
      owner: sourceConfig.repo.owner,
      repo: sourceConfig.repo.name,
      path: `${sourceConfig.repo.basePath}/${relativePath}`,
    });
    if (Array.isArray(data) || typeof data.content !== "string") {
      throw new Error(`Expected ${relativePath} to be a file.`);
    }
    const csvContent = Buffer.from(data.content, "base64").toString("utf-8");

    console.log("Example content: ", csvContent.split("\n").slice(0, 3));
    console.log("---");

    return csvContent;
  } catch (error) {
    const isMissing =
      sourceConfig.source === "local-copy"
        ? error?.code === "ENOENT"
        : error?.status === 404;
    if (isMissing) return undefined;

    const message = error instanceof Error ? error.message : String(error);
    console.error(`Error reading ${relativePath}:`, message);
    throw error;
  }
}
