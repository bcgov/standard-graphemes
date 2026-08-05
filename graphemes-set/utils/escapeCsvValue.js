/**
 * For a given value, return a string escaped for use in a CSV file.
 * @param {*} value Ex: `a`
 * @returns {string} Ex: `"a"`
 */
export function escapeCsvValue(value) {
  return `"${String(value).replace(/"/g, '""')}"`;
}
