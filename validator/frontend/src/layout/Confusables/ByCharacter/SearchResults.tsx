import { InlineAlert } from "@bcgov/design-system-react-components";
import { useQuery } from "@tanstack/react-query";

import { getConfusablesByCharacter } from "../../../services/api";
import ConfusableDisplay from "../../../components/ConfusableDisplay/ConfusableDisplay";
import ProgressBar from "../../../components/ProgressBar/ProgressBar";

interface SearchResultsProps {
  search: string;
}

export default function SearchResults({ search }: SearchResultsProps) {
  const query = useQuery({
    queryKey: ["confusable", search],
    queryFn: ({ queryKey }) => getConfusablesByCharacter(queryKey[1]),
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
          Found <strong>{query.data.length}</strong> confusables for: {search}
        </p>
      </InlineAlert>
      {query.data.map((confusable) => {
        return (
          <ConfusableDisplay
            key={confusable.id}
            confusable={confusable}
            highlights={[{ value: search }]}
          />
        );
      })}
    </div>
  );
}
