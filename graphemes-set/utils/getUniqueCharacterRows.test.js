import assert from "node:assert/strict";
import test from "node:test";

import { getUniqueCharacterRows } from "./getUniqueCharacterRows.js";

test("splits composite characters into unique one-code-point rows", () => {
  assert.deepEqual(
    getUniqueCharacterRows([
      {
        Character: "K\u0332w",
      },
      {
        Character: "w\u{1f600}",
      },
    ]),
    [
      ['"K"', '"U+004B"'],
      ['"w"', '"U+0077"'],
      ['"̲"', '"U+0332"'],
      ['"😀"', '"U+1F600"'],
    ],
  );
});
