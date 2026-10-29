import assert from "node:assert/strict";
import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import { fetchCharacters } from "../utils/fetchCharacters.js";
import { fetchLanguageMappings } from "../utils/fetchLanguageMappings.js";
import { getMissingCharacters } from "../utils/getMissingCharacters.js";
import { getSubdirectories } from "../utils/getSubdirectories.js";

// This tests that the local code path keeps working without network access.
test("local source loads alphabet data without the GitHub API", async (t) => {
  const localRoot = await mkdtemp(path.join(os.tmpdir(), "graphemes-set-"));
  t.after(() => rm(localRoot, { recursive: true, force: true }));

  const languageSlug = "sample-language";
  await mkdir(path.join(localRoot, languageSlug));
  await writeFile(
    path.join(localRoot, "firstvoices_sites_metadata_2025.csv"),
    "Slug,Language Name\nsample-language,Sample Language\n",
  );
  await writeFile(
    path.join(localRoot, languageSlug, "alphabet_ordering.csv"),
    "Character\ná\nb\n",
  );

  const sourceConfig = {
    source: "local-copy",
    githubToken: undefined,
    octokit: undefined,
    localRoot,
    repo: {
      owner: "First-Peoples-Cultural-Council",
      name: "unicode-resources",
      basePath: "orthography-resources",
      languagesMetadataFile: "firstvoices_sites_metadata_2025.csv",
    },
  };

  const subdirectories = await getSubdirectories(sourceConfig);
  const languageMappings = await fetchLanguageMappings(sourceConfig);
  const characters = await fetchCharacters(languageSlug, sourceConfig);
  const missingCharacters = getMissingCharacters(
    [
      {
        sourceFile: `${languageSlug}/alphabet_ordering.csv`,
        characters,
      },
    ],
    new Set(["á", "b"]),
  );

  assert.deepEqual(subdirectories, [languageSlug]);
  assert.equal(languageMappings[languageSlug], "Sample Language");
  assert.deepEqual(characters, ["á", "b"]);
  assert.deepEqual(missingCharacters, []);
});
