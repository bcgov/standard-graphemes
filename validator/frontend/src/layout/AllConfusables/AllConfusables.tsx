import {
  InlineAlert,
  ProgressBar,
} from "@bcgov/design-system-react-components";
import { useQuery } from "@tanstack/react-query";

import ConfusableDisplay from "../../components/ConfusableDisplay/ConfusableDisplay";
import { getAllConfusables } from "../../services/api";

export default function AllConfusables() {
  const query = useQuery({
    queryKey: ["confusables"],
    queryFn: getAllConfusables,
  });

  if (query.isPending || query.isFetching) {
    return <ProgressBar isIndeterminate valueLabel="Loading..." />;
  }

  if (query.isError) {
    return (
      <InlineAlert variant="danger">
        Could not get confusables data.
      </InlineAlert>
    );
  }

  return (
    <div>
      <InlineAlert variant="info">
        <p>
          Found <strong>{query.data.length}</strong> confusables:
        </p>
      </InlineAlert>
      {query.data.map((confusable) => {
        return (
          <ConfusableDisplay key={confusable.id} confusable={confusable} />
        );
      })}
    </div>
  );
}
