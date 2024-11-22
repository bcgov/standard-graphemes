import { Button, TextField } from "@bcgov/design-system-react-components";
import * as tokens from "@bcgov/design-tokens/js";

interface SearchBarProps {
  /** TextField description that appears below the input field */
  description: string;
  /** Label for search input field */
  label: string;
  /** Current search string */
  search: string;
  /** Callback to update the search string */
  setSearch: (value: string) => void;
  /** Handler function for pushing the search button */
  handleSearch: (value: string) => void;
  /** Handler function for pushing the reset button */
  handleReset: () => void;
}

export default function SearchBar({
  description,
  label,
  search,
  setSearch,
  handleSearch,
  handleReset,
}: SearchBarProps) {
  return (
    <div>
      <label
        id="label-search"
        style={{
          color: tokens.typographyColorPrimary,
          display: "block",
          font: tokens.typographyRegularSmallBody,
          marginBottom: tokens.layoutMarginSmall,
        }}
      >
        {label}
      </label>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          alignItems: "baseline",
          gap: tokens.layoutPaddingSmall,
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <TextField
          aria-labelledby="label-search"
          description={description}
          value={search}
          onChange={(value) => setSearch(value)}
          style={{ flexGrow: 1 }}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              handleSearch(search);
            }
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: tokens.layoutPaddingSmall,
          }}
        >
          <Button
            variant="primary"
            onPress={() => handleSearch(search)}
            isDisabled={search.length === 0}
          >
            Search
          </Button>
          <Button
            variant="secondary"
            onPress={handleReset}
            isDisabled={search.length === 0}
          >
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
}
