import { describe, expect, it } from "vitest";
import levenshteinDistance from "js-levenshtein-esm";

import levenshteinRatio from "./levenshtein-ratio.js";

describe("levenshteinRatio()", () => {
  it("returns a ratio of 1 for two empty strings", () => {
    expect(levenshteinRatio("", "", 0)).toBe(1);
  });

  it("returns a ratio of 1 for two identical strings", () => {
    expect(levenshteinRatio("hello", "hello", 0)).toBe(1);
  });

  it("returns a ratio of 0 when comparing a string to an empty string", () => {
    const str1 = "cat";
    const str2 = "";
    const distance = levenshteinDistance(str1, str2);
    const ratio = levenshteinRatio(str1, str2, distance);
    expect(ratio).toBe(0);
  });

  it("returns the expected ratio for a known pair of strings", () => {
    const str1 = "kitten";
    const str2 = "sitting";
    const distance = levenshteinDistance(str1, str2); // 3
    const ratio = levenshteinRatio(str1, str2, distance); // 0.5714285714285714
    expect(ratio.toFixed(2)).toBe("0.57");
  });
});
