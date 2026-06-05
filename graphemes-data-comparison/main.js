// main.js

import getIntersectionOfSets from "./lib/get-intersection-of-sets.js";
import isAscii from "./lib/is-ascii.js";
import normalizeArray from "./lib/normalize-array.js";
import unicodeEscape from "./lib/unicode-escape.js";

import { arrayUbc } from "./data/array-ubc.js";
import { arrayFv } from "./data/array-fv.js";

// UBC list of graphemes
// -----------------------------------------------------------------------------

console.log("UBC graphemes count with duplicates:", arrayUbc.length); // 1695

const arrayUbcNormalized = normalizeArray(arrayUbc, "NFC");
const arrayUbcEscaped = arrayUbcNormalized.map(unicodeEscape);

// Because a Set is a collection of unique values,
// duplicates are removed when a new Set is instantiated.
const setUbc = new Set(arrayUbcEscaped);

console.log("UBC unique graphemes count:", setUbc.size); // 435

// First Voices list of graphemes
// -----------------------------------------------------------------------------

console.log("FV graphemes count:", arrayFv.length); // 894

const arrayFvNormalized = normalizeArray(arrayFv, "NFC");
const arrayFvEscaped = arrayFvNormalized.map(unicodeEscape);
const setFv = new Set(arrayFvEscaped);

console.log("FV unique graphemes count:", setFv.size); // 829

// Intersection of UBC and First Voices graphemes sets
// -----------------------------------------------------------------------------

const intersection = getIntersectionOfSets(setUbc, setFv);

console.log("Intersection count:", intersection.size); // 160
console.log(
  "Intersection parsed:",
  [...intersection].map((char) => JSON.parse(`"${char}"`))
);

let countAscii = 0;
let countNonAscii = 0;

// For each parsed character in the intersection set, check if it is ASCII.
[...intersection].forEach((char) => {
  if (isAscii(JSON.parse(`"${char}"`))) {
    countAscii++;
  } else {
    countNonAscii++;
  }
});

console.log("ASCII count in intersection:", countAscii); // 54
console.log("Non-ASCII count in intersection:", countNonAscii); // 106
