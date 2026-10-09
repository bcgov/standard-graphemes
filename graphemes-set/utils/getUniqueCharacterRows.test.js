import assert from "node:assert/strict";
import test from "node:test";

import { getUniqueCharacterRows } from "./getUniqueCharacterRows.js";

test("builds two-column escaped rows with Unicode code points", () => {
  assert.deepEqual(
    getUniqueCharacterRows([
      {
        Character: "k\u0332",
      },
    ]),
    [['"k̲"', '"U+006B U+0332"']],
  );
});
