import { useState } from "react";
import { Select } from "@bcgov/design-system-react-components";
import type { Key } from "react-aria-components";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/character")({
  component: CharacterExplorer,
});

import Character from "../components/Character/Character";

// This represents the intial set of characters from a single Gitsenimx̱ site
const characterSet = new Set([
  "a",
  "aa",
  "b",
  "d",
  "e",
  "ee",
  "g",
  "gw",
  "g̱",
  "h",
  "hl",
  "i",
  "ii",
  "j",
  "k",
  "k'",
  "kw",
  "kw'",
  "ḵ",
  "ḵ'",
  "l",
  "'l",
  "m",
  "'m",
  "n",
  "'n",
  "o",
  "oo",
  "p",
  "p'",
  "s",
  "t",
  "t'",
  "tl'",
  "ts",
  "ts'",
  "u",
  "uu",
  "w",
  "'w",
  "x",
  "xw",
  "x̱",
  "'y",
  "'",
]);

export default function CharacterExplorer() {
  const [char, setChar] = useState<Key>("a");

  return (
    <main>
      <h2>Explore characters</h2>
      <div>
        <Select
          label="Select a Gitsenimx̱ character for display"
          items={Array.from(characterSet).map((c) => ({ id: c, label: c }))}
          defaultSelectedKey={char}
          onSelectionChange={(key) => setChar(key)}
        />
      </div>
      <Character char={char.toString()} />
    </main>
  );
}
