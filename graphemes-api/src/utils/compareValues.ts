import anyAscii from "any-ascii";
import levenshteinDistance from "js-levenshtein-esm";

import levenshteinRatio from "./levenshtein-ratio.js";

interface ComparisonDetails {
  /** First string value for comparison. */
  comparisonValue1: string;
  /** Second string value for comparison. */
  comparisonValue2: string;
  /** Levenshtein ratio threshold to check for a match. */
  threshold: number;
  /** Levenshtein ratio to compare to the threshold. */
  ratio: number;
  /** Whether the strings match based on the given threshold. */
  isMatch: boolean;
}

/**
 * Given two strings to compare and an optional Levenshtein threshold (which
 * defaults to `0.9`), returns an object containing a `ratio` number and
 * `isMatch` boolean indicating whether the strings are considered to be a match.
 */
export default function compareValues(
  value1: string,
  value2: string,
  threshold: number = 0.9
): ComparisonDetails {
  // Trim whitespace from the ends of the input values and cast to uppercase.
  const capitalizedValue1 = value1.trim().toUpperCase();
  const capitalizedValue2 = value2.trim().toUpperCase();

  // Convert uppercase values to ASCII.
  const ascii1 = anyAscii(capitalizedValue1);
  const ascii2 = anyAscii(capitalizedValue2);

  // Calculate Levenshtein distance of the ASCII values.
  const distance = levenshteinDistance(ascii1, ascii2);

  // Calculate Levenshtein ratio given the distance.
  const ratio = levenshteinRatio(ascii1, ascii2, distance);

  return {
    comparisonValue1: value1.trim(),
    comparisonValue2: value2.trim(),
    threshold,
    ratio,
    isMatch: ratio >= threshold,
  };
}
