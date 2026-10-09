import { escapeCsvValue } from "./escapeCsvValue.js";
import { getUnicodeCodePoints } from "./getUnicodeCodePoints.js";

/**
 * Build CSV rows for unique characters and their Unicode code points.
 * @param {{ Character: string }[]} characters
 * @returns {string[][]}
 */
export function getUniqueCharacterRows(characters) {
  return characters.map(({ Character }) =>
    [Character, getUnicodeCodePoints(Character)].map(escapeCsvValue),
  );
}
