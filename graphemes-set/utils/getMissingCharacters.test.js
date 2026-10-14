import assert from "node:assert/strict";
import test from "node:test";

import { getMissingCharacters } from "./getMissingCharacters.js";

test("reports missing code points with their source file", () => {
  assert.deepEqual(
    getMissingCharacters(
      [
        {
          sourceFile: "orthography-resources/example/alphabet_ordering.csv",
          characters: ["a\u0331", "b"],
        },
      ],
      new Set(["a", "b"]),
    ),
    [
      {
        character: "\u0331",
        sourceFile: "orthography-resources/example/alphabet_ordering.csv",
      },
    ],
  );
});