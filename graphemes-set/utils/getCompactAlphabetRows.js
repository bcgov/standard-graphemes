import { getUnicodeCodePoints } from "./getUnicodeCodePoints.js";

/**
 * Build language-scoped rows while preserving alphabet and variant order.
 * @param {string} languageName
 * @param {string[]} characters
 * @param {Map<string, string[]>} variantsByCharacter
 * @returns {string[][]}
 */
export function getCompactAlphabetRows(
  languageName,
  characters,
  variantsByCharacter,
) {
  const rows = [];

  characters.forEach((character) => {
    const variants = variantsByCharacter.get(character);
    const characterVariants = variants?.length ? variants : [""];

    characterVariants.forEach((variant) => {
      rows.push([
        languageName,
        character,
        getUnicodeCodePoints(character),
        variant,
        variant ? getUnicodeCodePoints(variant) : "",
      ]);
    });
  });

  return rows;
}
