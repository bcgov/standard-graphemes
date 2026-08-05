/**
 * For a given string, return the Unicode code points for each character.
 * @param {string} str
 * @returns {string} Ex: `U+0041 U+0042 U+0043`
 */
export function getUnicodeCodePoints(str) {
  return [...str]
    .map((char) => {
      const code = char.codePointAt(0).toString(16).toUpperCase();
      return `U+${code.padStart(4, "0")}`;
    })
    .join(" ");
}
