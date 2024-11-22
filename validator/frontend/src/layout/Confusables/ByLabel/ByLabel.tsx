import { useState } from "react";
import * as tokens from "@bcgov/design-tokens/js";

import SearchBar from "../../../components/SearchBar/SearchBar";
import SearchResults from "./SearchResults";

export default function ByLabel() {
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
        description={`A "label" is the alphabet character sequence of the confusable. For example, try: 7`}
        label="Search by confusable label"
        search={search}
        setSearch={setSearch}
        handleReset={resetSearch}
        handleSearch={() => setShouldSearch(true)}
      />
      {search.length > 0 && shouldSearch && <SearchResults search={search} />}
    </div>
  );
}
