/**
 * Normalize an array of graphemes.
 * @param {string[]} array Array of graphemes to normalize
 * @param {"NFC" | "NFD" | "NFKC" | "NFKD"} normalizationForm
 * @returns {string[]} Array of normalized graphemes
 */
export default function normalizeArray(array, normalizationForm) {
  return array.map((char) => char.normalize(normalizationForm));
}
