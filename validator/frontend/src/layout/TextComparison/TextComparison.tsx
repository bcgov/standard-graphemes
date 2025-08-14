import {
  Button,
  InlineAlert,
  TextField,
} from "@bcgov/design-system-react-components";
import * as tokens from "@bcgov/design-tokens/js";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

import ProgressBar from "../../components/ProgressBar/ProgressBar";
import { getLevenshteinTextComparison } from "../../services/api";

export default function TextComparison() {
  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");
  const [threshold, setThreshold] = useState("0.9");

  const mutation = useMutation({
    mutationFn: ({
      value1,
      value2,
      threshold,
    }: {
      value1: string;
      value2: string;
      threshold: string;
    }) => getLevenshteinTextComparison(value1, value2, parseFloat(threshold)),
  });

  const handleReset = () => {
    setValue1("");
    setValue2("");
    setThreshold("0.9");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({ value1, value2, threshold });
  };

  return (
    <div>
      <h2>Text comparison</h2>
      <form
        onReset={handleReset}
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: tokens.layoutPaddingSmall,
        }}
      >
        <TextField
          label="Value 1"
          value={value1}
          onChange={(value) => setValue1(value)}
          isRequired
          description="The first text value to be compared."
        />
        <TextField
          label="Value 2"
          value={value2}
          onChange={(value) => setValue2(value)}
          isRequired
          description="The second text value to be compared."
        />
        <TextField
          label="Threshold"
          value={threshold}
          onChange={(value) => setThreshold(value)}
          description="A ratio from 0 to 1. A higher number means values must be closer to be considered a match. Defaults to 0.9 if not specified."
        />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: tokens.layoutPaddingMedium,
          }}
        >
          <Button
            type="reset"
            isDisabled={mutation.isPending}
            variant="secondary"
            style={{
              display: "flex",
              flexDirection: "row",
              flexGrow: 1,
              justifyContent: "space-around",
            }}
          >
            Reset
          </Button>
          <Button
            type="submit"
            isDisabled={mutation.isPending}
            style={{
              display: "flex",
              flexDirection: "row",
              flexGrow: 1,
              justifyContent: "space-around",
            }}
          >
            Submit
          </Button>
        </div>
      </form>

      {mutation.isPending && (
        <div style={{ marginTop: tokens.layoutMarginMedium }}>
          <ProgressBar isIndeterminate />
        </div>
      )}

      {mutation.isError && (
        <div style={{ marginTop: tokens.layoutMarginMedium }}>
          <InlineAlert variant="danger">
            Could not get text comparison data.
          </InlineAlert>
        </div>
      )}

      {mutation.isSuccess && (
        <div style={{ marginTop: tokens.layoutMarginMedium }}>
          <InlineAlert variant={mutation.data.isMatch ? "success" : "danger"}>
            <p>
              <strong>
                {mutation.data.isMatch ? "Match!" : "Not a match"}
              </strong>
            </p>
            <p>Response:</p>
            <pre>{JSON.stringify(mutation.data, null, 2)}</pre>
          </InlineAlert>
        </div>
      )}

      <h3>How comparisons work</h3>

      <p>Comparisons are made using these steps:</p>

      <ol>
        <li>
          <p>
            Values are trimmed of leading and following whitespace and set to
            uppercase.
          </p>
        </li>
        <li>
          <p>
            Values are converted from UTF8 to ASCII using{" "}
            <a href="https://github.com/anyascii/anyascii">AnyAscii</a>.
          </p>
        </li>
        <li>
          <p>
            The{" "}
            <a href="https://en.wikipedia.org/wiki/Levenshtein_distance">
              Levenshtein distance
            </a>{" "}
            of the values of is calculated using{" "}
            <a href="https://www.npmjs.com/package/js-levenshtein-esm">
              js-levenshtein-esm
            </a>
            .
          </p>
        </li>
        <li>
          <p>
            The Levenshtein ratio is of the values of is calculated by taking
            the maximum length of the two values, then subtracting the distance,
            and finally dividing by the max length. This ratio is a number from
            0 to 1 (inclusive) where 1 is a perfect match.
          </p>
        </li>
        <li>
          <p>
            The computed ratio is compared to the threshold value (which
            defaults to 0.9 if not specified). A ratio equal to or greater than
            the threshold value indicates a match.
          </p>
        </li>
      </ol>
    </div>
  );
}
