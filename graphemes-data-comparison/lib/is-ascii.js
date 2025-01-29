/**
 * Check whether a Unicode character is an ASCII character.
 * @param {string} char Unicode character
 * @returns {boolean} True if the character is an ASCII character.
 */
export default function isAscii(char) {
  // Check if the input is a single character
  if (typeof char !== "string" || char.length !== 1) {
    return false;
  }

  // Get the Unicode code point of the character
  const codePoint = char.charCodeAt(0);

  // Check if the code point is within the ASCII range (0 to 127)
  return codePoint >= 0 && codePoint <= 127;
}
