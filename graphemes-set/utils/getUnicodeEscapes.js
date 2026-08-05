/**
 * For a given string, return the Unicode escape sequences for each character.
 * @param {string} str
 * @returns {string} Ex: `\u0041\u0042\u0043`
 */
export function getUnicodeEscapes(str) {
  return [...str]
    .map((char) => {
      const code = char.codePointAt(0).toString(16).toUpperCase();
      return `\\u${code.padStart(4, "0")}`;
    })
    .join("");
}
