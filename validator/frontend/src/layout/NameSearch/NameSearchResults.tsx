import { InlineAlert } from "@bcgov/design-system-react-components";
import * as tokens from "@bcgov/design-tokens/js";
import { useQuery } from "@tanstack/react-query";

import { getNameSearchResult } from "../../services/api";
import ProgressBar from "../../components/ProgressBar/ProgressBar";

interface NameSearchResultsProp {
  /** The name string being searched */
  search: string;
}

export default function NameSearchResults({ search }: NameSearchResultsProp) {
  const query = useQuery({
    queryKey: ["confusable", search],
    queryFn: ({ queryKey }) => getNameSearchResult(queryKey[1]),
  });

  if (!search) return null;

  if (query.isPending || query.isFetching) {
    return (
      <div>
        <ProgressBar isIndeterminate label="Searching..." />
      </div>
    );
  }

  if (query.isError) {
    return (
      <InlineAlert variant="danger">
        <p>
          No results found for search: <strong>{search}</strong>
        </p>
      </InlineAlert>
    );
  }

  return (
    <div>
      <InlineAlert variant="info">
        <p>
          Search results for: <strong>{search}</strong>
        </p>
      </InlineAlert>
      {query.data && (
        <div style={{ marginTop: tokens.layoutMarginMedium }}>
          <code>{JSON.stringify(query.data)}</code>
        </div>
      )}
    </div>
  );
}
