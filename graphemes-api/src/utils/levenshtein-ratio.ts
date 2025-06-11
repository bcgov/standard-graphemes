export default function levenshteinRatio(
  a: string,
  b: string,
  distance: number
): number {
  const maxLen = Math.max(a.length, b.length);

  // If maxLen is 0, both strings are empty and identical.
  if (maxLen === 0) return 1;

  return (maxLen - distance) / maxLen;
}
