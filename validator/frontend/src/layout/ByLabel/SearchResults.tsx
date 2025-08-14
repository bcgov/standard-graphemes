import { InlineAlert } from "@bcgov/design-system-react-components";
import { useQuery } from "@tanstack/react-query";

import { getOneConfusableByLabel } from "../../services/api";
import ConfusableDisplay from "../../components/ConfusableDisplay/ConfusableDisplay";
import ProgressBar from "../../components/ProgressBar/ProgressBar";

interface SearchResultsProps {
  search: string;
}

export default function SearchResults({ search }: SearchResultsProps) {
  const query = useQuery({
    queryKey: ["confusable", search],
    queryFn: ({ queryKey }) => getOneConfusableByLabel(queryKey[1]),
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
          Found confusable: <strong>{query.data.label}</strong>
        </p>
      </InlineAlert>
      <ConfusableDisplay
        confusable={query.data}
        highlights={[{ value: query.data.label }]}
      />
    </div>
  );
}
