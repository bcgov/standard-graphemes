/**
 * Given a string composed of text values separated by commas, return an array
 * of the text chunks trimmed of whitespace and filtered of empty strings.
 *
 * Ex: "Taku River, Tlingit,  " -> ["Taku River", "Tlingit"]
 * @param str Raw string from the database
 * @returns Array of filtered strings
 */
export default function splitCommaSeparatedString(str: string): string[] {
  return str
    .split(",")
    .map((s) => s.trim())
    .filter((s) => s !== "");
}
