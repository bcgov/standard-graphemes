import { useState } from "react";
import * as tokens from "@bcgov/design-tokens/js";

import SearchBar from "../../components/SearchBar/SearchBar";

import NameSearchResults from "./NameSearchResults";

export default function NameSearch() {
  const [search, setSearch] = useState("");
  const [shouldSearch, setShouldSearch] = useState(false);

  function resetSearch() {
    setSearch("");
    setShouldSearch(false);
  }

  return (
    <>
      <h2>Search by name</h2>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: tokens.layoutPaddingMedium,
        }}
      >
        <SearchBar
          description={`Enter a name with diacritical markers to search for it.`}
          label="Search for a person name"
          search={search}
          setSearch={setSearch}
          handleReset={resetSearch}
          handleSearch={() => setShouldSearch(true)}
        />
        {search.length > 0 && shouldSearch && (
          <NameSearchResults search={search} />
        )}
      </div>
    </>
  );
}
