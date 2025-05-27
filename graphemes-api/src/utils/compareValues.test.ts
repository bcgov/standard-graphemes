import { describe, expect, it } from "vitest";

import compareValues from "./compareValues.js";

describe("compareValues()", () => {
  // Ratio of 0.5714285714285714, not a match given the default threshold 0.9
  const resultWithDefaultThreshold = compareValues("kitten", "sitting");
  it("returns an object with the expected keys", () => {
    const keys = Object.keys(resultWithDefaultThreshold);
    expect(keys.length).toBe(5);
    expect(keys.includes("comparisonValue1"));
    expect(keys.includes("comparisonValue2"));
    expect(keys.includes("threshold"));
    expect(keys.includes("ratio"));
    expect(keys.includes("isMatch"));
  });
  it("reports the default threshold value used when one isn't passed", () => {
    expect(resultWithDefaultThreshold.threshold).toBe(0.9);
  });
  it("reports the Levenshtein ratio of the values being compared", () => {
    expect(resultWithDefaultThreshold.ratio.toFixed(2)).toBe("0.57");
  });
  it("reports an accurate boolean isMatch for the values being compared", () => {
    expect(resultWithDefaultThreshold.isMatch).toBeFalsy();
  });

  // Ratio of 0.5714285714285714, a match given the specific threshold 0.5
  const resultWithSpecificThreshold = compareValues("kitten", "sitting", 0.5);
  it("reports the specified threshold value used when one is passed", () => {
    expect(resultWithSpecificThreshold.threshold).toBe(0.5);
  });
  it("reports an accurate boolean isMatch for the values being compared with a low enough threshold", () => {
    expect(resultWithSpecificThreshold.isMatch).toBeTruthy();
  });

  // Specific BC Parks names with known match booleans
  const resultParks1 = compareValues("Aa Tlein Teix’i", "A Téix'gi Aan Tlein");
  it("is not a match for: Aa Tlein Teix’i, A Téix'gi Aan Tlein", () => {
    expect(resultParks1.isMatch).toBeFalsy();
  });
  const resultParks2 = compareValues("Hakai LÚxvbálís", "Hakai Lúxvbálís");
  it("is a match for: Hakai LÚxvbálís, Hakai Lúxvbálís", () => {
    expect(resultParks2.isMatch).toBeTruthy();
  });
  const resultsParks3 = compareValues("Ẁaẁley", "Ẁaẁaƛ");
  it("is not a match for: Ẁaẁley, Ẁaẁaƛ", () => {
    expect(resultsParks3.isMatch).toBeFalsy();
  });
  const resultsParks4 = compareValues("Xʷakʷəᕈnaxdəᕈma", "Xʷak̓ʷəʔnaxdəʔma");
  it("is not a match for: Xʷakʷəᕈnaxdəᕈma, Xʷak̓ʷəʔnaxdəʔma", () => {
    expect(resultsParks4.isMatch).toBeFalsy();
  });
  const resultsPark5 = compareValues("ɂNacinuxʷ", "ʔNacinuxʷ");
  it("is a match for: ɂNacinuxʷ, ʔNacinuxʷ", () => {
    expect(resultsPark5.isMatch).toBeTruthy();
  });

  it("whitespace is trimmed as expected", () => {
    const result = compareValues("dog", "     dog          ");
    expect(result.comparisonValue1).toBe("dog");
    expect(result.comparisonValue2).toBe("dog");
    expect(result.ratio).toBe(1);
    expect(result.isMatch).toBeTruthy();
  });
});
