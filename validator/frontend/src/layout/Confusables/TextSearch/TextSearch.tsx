import { useState } from "react";
import * as tokens from "@bcgov/design-tokens/js";

import SearchBar from "../../../components/SearchBar/SearchBar";
import SearchResults from "./SearchResults";

export default function TextSearch() {
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
        description={`Enter a text string to search it for confusable characters. For example, try: G̕ood morning`}
        label="Search for confusable characters"
        search={search}
        setSearch={setSearch}
        handleReset={resetSearch}
        handleSearch={() => setShouldSearch(true)}
      />
      {search.length > 0 && shouldSearch && <SearchResults search={search} />}
    </div>
  );
}
