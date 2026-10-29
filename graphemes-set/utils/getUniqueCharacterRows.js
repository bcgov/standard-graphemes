import { escapeCsvValue } from "./escapeCsvValue.js";
import { getUnicodeCodePoints } from "./getUnicodeCodePoints.js";

/**
 * Build one CSV row per unique Unicode code point found in the characters.
 * @param {{ Character: string }[]} characters
 * @returns {string[][]}
 */
export function getUniqueCharacterRows(characters) {
  const uniqueCharacters = new Set();

  characters.forEach(({ Character }) => {
    for (const codePoint of Character) {
      uniqueCharacters.add(codePoint);
    }
  });

  return Array.from(uniqueCharacters)
    .sort((a, b) => (a.codePointAt(0) ?? 0) - (b.codePointAt(0) ?? 0))
    .map((character) =>
      [character, getUnicodeCodePoints(character)].map(escapeCsvValue),
    );
}
