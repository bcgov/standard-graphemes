import assert from "node:assert/strict";
import test from "node:test";

import { getCompactAlphabetRows } from "./getCompactAlphabetRows.js";

test("builds one language-scoped row per character and variant", () => {
  const characters = ["ch", "k\u0332"];
  const variantsByCharacter = new Map([["ch", ["Ch", "CH"]]]);

  assert.deepEqual(
    getCompactAlphabetRows("Example language", characters, variantsByCharacter),
    [
      ["Example language", "ch", "U+0063 U+0068", "Ch", "U+0043 U+0068"],
      ["Example language", "ch", "U+0063 U+0068", "CH", "U+0043 U+0048"],
      ["Example language", "k\u0332", "U+006B U+0332", "", ""],
    ],
  );
});
