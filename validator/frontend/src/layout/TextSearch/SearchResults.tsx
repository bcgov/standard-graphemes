import { Button, InlineAlert } from "@bcgov/design-system-react-components";
import * as tokens from "@bcgov/design-tokens/js";
import { useQuery } from "@tanstack/react-query";

import { getSuggestedStringsFromSearchString } from "../../services/api";
import ConfusableDisplay from "../../components/ConfusableDisplay/ConfusableDisplay";
import iconClipboard from "../../assets/fa-clipboard.svg";
import ProgressBar from "../../components/ProgressBar/ProgressBar";

interface SearchResultsProps {
  search: string;
}

export default function SearchResults({ search }: SearchResultsProps) {
  const query = useQuery({
    queryKey: ["confusable", search],
    queryFn: ({ queryKey }) => getSuggestedStringsFromSearchString(queryKey[1]),
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
          Found <strong>{query.data.suggestions.length}</strong> suggestions
          for: {search}
        </p>
      </InlineAlert>
      {query.data.suggestions.map((suggestion, index) => {
        return (
          <div
            style={{
              backgroundColor: tokens.themeGold30,
              border: `${tokens.layoutBorderWidthSmall} solid ${tokens.themeGray60}`,
              borderRadius: tokens.layoutBorderRadiusMedium,
              boxShadow: tokens.surfaceShadowMedium,
              display: "flex",
              flexDirection: "column",
              alignItems: "baseline",
              justifyContent: "space-between",
              margin: `${tokens.layoutMarginSmall} ${tokens.layoutMarginNone}`,
              padding: tokens.layoutPaddingSmall,
            }}
          >
            <label htmlFor={`id-${suggestion.confusable.id}-index-${index}`}>
              Confusable:
            </label>
            <ConfusableDisplay
              id={`c-id-${suggestion.confusable.id}-index-${index}`}
              key={suggestion.confusable.id}
              confusable={suggestion.confusable}
              highlights={[{ value: search }]}
            />
            <label htmlFor={`s-id-${suggestion.confusable.id}-index-${index}`}>
              Suggested replacement text:
            </label>
            <div
              style={{
                backgroundColor: tokens.themeGray20,
                border: `${tokens.layoutBorderWidthSmall} solid ${tokens.themeGray60}`,
                borderRadius: tokens.layoutBorderRadiusMedium,
                boxShadow: tokens.surfaceShadowMedium,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                margin: `${tokens.layoutMarginSmall} ${tokens.layoutMarginNone}`,
                padding: tokens.layoutPaddingSmall,
                width: "100%",
              }}
            >
              <p
                id={`s-id-${suggestion.confusable.id}-index-${index}`}
                style={{ font: tokens.typographyBoldLargeBody }}
              >
                {suggestion.replaced}
              </p>
              <Button
                aria-label={`Copy "${suggestion.replaced}" to clipboard`}
                variant="secondary"
                size="small"
                isIconButton
                onPress={() => {
                  // Copy the suggested replacement to the clipboard
                  navigator.clipboard.writeText(suggestion.replaced);
                }}
              >
                <img src={iconClipboard} alt="" style={{ width: "16px" }} />
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
