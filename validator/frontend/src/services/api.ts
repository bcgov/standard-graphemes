import type { Confusable } from "../types";

// In local development, proxying is handled by the configuration defined in
// vite.config.ts. In production, we need a full base URL.
const API_BASE_URL =
  import.meta.env.MODE === "development"
    ? ""
    : import.meta.env.VITE_API_BASE_URL;

// Graphemes API
const GRAPHEMES_API_BASE_URL =
  import.meta.env.MODE === "development"
    ? ""
    : import.meta.env.GRAPHEMES_API_BASE_URL;

/**
 * Get an array of all Confusable objects.
 */
export async function getAllConfusables(): Promise<Confusable[]> {
  const response = await fetch(`${API_BASE_URL}/api/v1/confusable`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch data: ${response.statusText}`);
  }

  return await response.json();
}

/**
 * Search for one confusable by `label`.
 */
export async function getOneConfusableByLabel(
  label: string
): Promise<Confusable> {
  const response = await fetch(
    `${API_BASE_URL}/api/v1/confusable/label/${label}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch data: ${response.statusText}`);
  }

  return await response.json();
}

/**
 * Search for an array of zero or more confusables by `confusableChar`.
 */
export async function getConfusablesByCharacter(
  confusableChar: string
): Promise<Confusable[]> {
  const response = await fetch(
    `${API_BASE_URL}/api/v1/confusable/char/${confusableChar}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch data: ${response.statusText}`);
  }

  return await response.json();
}

interface SearchStringResponse {
  /** The original search string */
  search: string;
  suggestions: {
    confusable: Confusable;
    replaced: string;
  }[];
}

/**
 * Search a string of text for instances of `confusableChar` characters.
 */
export async function getSuggestedStringsFromSearchString(
  search: string
): Promise<SearchStringResponse> {
  const response = await fetch(
    `${API_BASE_URL}/api/v1/confusable/search/${search}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch data: ${response.statusText}`);
  }

  return await response.json();
}

interface LevenshteinTextComparisonResult {
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
 * Compare two strings via Levenshtein ratio to see if they match.
 */
export async function getLevenshteinTextComparison(
  value1: string,
  value2: string,
  threshold: number
): Promise<LevenshteinTextComparisonResult> {
  const body = JSON.stringify({
    value1,
    value2,
    threshold,
  });

  const response = await fetch(`${GRAPHEMES_API_BASE_URL}/api/v1/match`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch data: ${response.statusText}`);
  }

  return await response.json();
}
