/**
 * Get the Unicode escape sequence for a string of characters.
 * @param {string} string
 * @returns {string}
 */
export default function unicodeEscape(string) {
  return string
    .split("")
    .map((char) => {
      const code = char.charCodeAt(0);
      return "\\u" + code.toString(16).padStart(4, "0");
    })
    .join("");
}
