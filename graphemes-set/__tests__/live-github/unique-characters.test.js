import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { parse } from "csv-parse/sync";
import test from "node:test";

import { fetchCharacters } from "../../utils/fetchCharacters.js";
import { getGithubSourceConfig } from "../../utils/getGithubSourceConfig.js";
import { getMissingCharacters } from "../../utils/getMissingCharacters.js";
import { getSubdirectories } from "../../utils/getSubdirectories.js";

test("live GitHub unique-character output covers every FirstVoices alphabet character", async () => {
  const sourceConfig = getGithubSourceConfig();
  const uniqueCsv = await readFile(
    new URL("../../output/live-github/unique-characters-output.csv", import.meta.url),
    "utf8",
  );
  const uniqueRecords = parse(uniqueCsv, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
  });
  const uniqueCharacters = new Set(
    uniqueRecords.map(({ Character }) => Character).filter(Boolean),
  );
  const subdirectories = await getSubdirectories(sourceConfig);
  const sourceFiles = [];

  for (const subdir of subdirectories) {
    sourceFiles.push({
      sourceFile: `${sourceConfig.repo.basePath}/${subdir}/alphabet_ordering.csv`,
      characters: await fetchCharacters(subdir, sourceConfig),
    });
  }

  const missingCharacters = getMissingCharacters(sourceFiles, uniqueCharacters);
  const report = missingCharacters
    .map(
      ({ character, sourceFile }) =>
        `${JSON.stringify(character)}: ${sourceFile}`,
    )
    .join("\n");

  assert.equal(
    missingCharacters.length,
    0,
    missingCharacters.length
      ? `Characters missing from live-github unique-characters-output.csv:\n${report}`
      : undefined,
  );
});
