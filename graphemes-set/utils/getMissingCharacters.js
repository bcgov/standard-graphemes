/**
 * Find source code points that are absent from the unique-character set.
 * @param {{ sourceFile: string, characters: string[] }[]} sourceFiles
 * @param {Set<string>} uniqueCharacters
 * @returns {{ character: string, sourceFile: string }[]}
 */
export function getMissingCharacters(sourceFiles, uniqueCharacters) {
  return sourceFiles.flatMap(({ sourceFile, characters }) =>
    characters.flatMap((sourceCharacter) =>
      Array.from(sourceCharacter)
        .filter((character) => !uniqueCharacters.has(character))
        .map((character) => ({ character, sourceFile })),
    ),
  );
}