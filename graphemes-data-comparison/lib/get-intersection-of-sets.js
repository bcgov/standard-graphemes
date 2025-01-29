/**
 * Get the intersection of two Sets.
 * @param {Set} setA
 * @param {Set} setB
 * @returns {Set}
 */
export default function getIntersectionOfSets(setA, setB) {
  const intersection = new Set();

  for (const elem of setA) {
    if (setB.has(elem)) {
      intersection.add(elem);
    }
  }

  return intersection;
}
