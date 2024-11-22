import { useState } from "react";
import * as tokens from "@bcgov/design-tokens/js";

import SearchBar from "../../../components/SearchBar/SearchBar";
import SearchResults from "./SearchResults";

export default function ByCharacter() {
  const [search, setSearch] = useState("");
  const [shouldSearch, setShouldSearch] = useState(false);

  function resetSearch() {
    setSearch("");
    setShouldSearch(false);
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: tokens.layoutPaddingMedium,
      }}
    >
      <SearchBar
        description={`Enter a character that could potentially be confused for another. For example, try:  ̔`}
        label="Search by confusable character"
        search={search}
        setSearch={setSearch}
        handleReset={resetSearch}
        handleSearch={() => setShouldSearch(true)}
      />
      {search.length > 0 && shouldSearch && <SearchResults search={search} />}
    </div>
  );
}
