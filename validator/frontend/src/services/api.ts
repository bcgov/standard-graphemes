import type { Confusable } from "../types";

/**
 * Get an array of all Confusable objects.
 */
export async function getAllConfusables(): Promise<Confusable[]> {
  const response = await fetch("/api/v1/confusable", {
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
  const response = await fetch(`/api/v1/confusable/label/${label}`, {
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
 * Search for an array of zero or more confusables by `confusableChar`.
 */
export async function getConfusablesByCharacter(
  confusableChar: string
): Promise<Confusable[]> {
  const response = await fetch(`/api/v1/confusable/char/${confusableChar}`, {
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
  const response = await fetch(`api/v1/confusable/search/${search}`, {
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
