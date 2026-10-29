import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { parse } from "csv-parse/sync";
import test from "node:test";

import { fetchCharacters } from "../../utils/fetchCharacters.js";
import { getLocalSourceConfig } from "../../utils/getLocalSourceConfig.js";
import { getMissingCharacters } from "../../utils/getMissingCharacters.js";
import { getSubdirectories } from "../../utils/getSubdirectories.js";

const OUTPUT_PATH = fileURLToPath(
  new URL("../../output/local-copy/unique-characters-output.csv", import.meta.url),
);

async function assertExists(filePath, message) {
  try {
    await access(filePath);
  } catch {
    assert.fail(message);
  }
}

test("local-copy unique-character output covers every input alphabet character", async () => {
  const sourceConfig = getLocalSourceConfig();

  await assertExists(
    sourceConfig.localRoot,
    `Local input data is missing at ${sourceConfig.localRoot}. Copy the orthography-resources directory into graphemes-set/input (see input/README.md).`,
  );
  await assertExists(
    OUTPUT_PATH,
    `Output file is missing at ${OUTPUT_PATH}. Run "npm run start:unique:local-copy" first.`,
  );

  const uniqueCsv = await readFile(OUTPUT_PATH, "utf8");
  const uniqueRecords = parse(uniqueCsv, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
  });
  const uniqueCharacters = new Set(
    uniqueRecords.map(({ Character }) => Character).filter(Boolean),
  );
  const subdirectories = await getSubdirectories(sourceConfig);

  assert.notEqual(
    subdirectories.length,
    0,
    `No language directories found in ${sourceConfig.localRoot}.`,
  );

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
      ? `Characters missing from local-copy unique-characters-output.csv:\n${report}`
      : undefined,
  );
});
