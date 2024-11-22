import { Button } from "@bcgov/design-system-react-components";
import * as tokens from "@bcgov/design-tokens/js";

import type { Confusable } from "../../types";
import iconClipboard from "../../assets/fa-clipboard.svg";

import CharSpan from "./CharSpan";

interface Highlight {
  /** Text value of the string being highlighted */
  value: string;
  /** CSS `background-color` value */
  backgroundColor?: string;
  /** CSS foreground `color` value */
  color?: string;
}

interface ConfusableDisplayProps {
  /** The Confusable object for display */
  confusable: Confusable;
  /** Optional characters to highlight */
  highlights?: Highlight[];
  /** Optional `id` field for aria-labelling */
  id?: string;
}

export default function ConfusableDisplay({
  confusable,
  highlights = [],
  id,
}: ConfusableDisplayProps) {
  const bg = tokens.themeBlue100;
  const c = tokens.typographyColorPrimaryInvert;

  function Label() {
    if (highlights.some((highlight) => highlight.value === confusable.label)) {
      return (
        <p>
          <strong>label:</strong>{" "}
          <CharSpan backgroundColor={bg} color={c}>
            {confusable.label}
          </CharSpan>
        </p>
      );
    }

    return (
      <p>
        <strong>label:</strong> <CharSpan>{confusable.label}</CharSpan>
      </p>
    );
  }

  function ConfusableCharacters() {
    return (
      <>
        {confusable.confusableChar.map((char, index) => {
          if (highlights.some((highlight) => highlight.value === char)) {
            return (
              <CharSpan
                key={`${confusable.id}-${index}`}
                backgroundColor={bg}
                color={c}
              >
                {char}
              </CharSpan>
            );
          } else {
            return (
              <CharSpan key={`${confusable.id}-${index}`}>{char}</CharSpan>
            );
          }
        })}
      </>
    );
  }

  return (
    <div
      id={id ? id : confusable.id}
      key={confusable.id}
      style={{
        backgroundColor: tokens.themeGray20,
        border: `${tokens.layoutBorderWidthSmall} solid ${tokens.themeGray60}`,
        borderRadius: tokens.layoutBorderRadiusMedium,
        boxShadow: tokens.surfaceShadowSmall,
        display: "flex",
        flexDirection: "row",
        alignItems: "baseline",
        justifyContent: "space-between",
        margin: `${tokens.layoutMarginSmall} ${tokens.layoutMarginNone}`,
        padding: tokens.layoutPaddingSmall,
        width: "100%",
      }}
    >
      <div>
        {/* Label (alphabet character) */}
        <Label />

        {/* ID (Unicode character) */}
        <p>
          <strong>id:</strong> <CharSpan>{confusable.id}</CharSpan>
        </p>

        {/* Confusable character sequences */}
        <p
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: tokens.layoutPaddingSmall,
          }}
        >
          <strong>confusableChar ({confusable.confusableChar.length}):</strong>{" "}
          <ConfusableCharacters />
        </p>

        {/* Confusable Unicode sequences */}
        <p
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: tokens.layoutPaddingSmall,
          }}
        >
          <strong>
            confusableUnicode ({confusable.confusableUnicode.length}):
          </strong>{" "}
          {confusable.confusableUnicode.map((unicode, index) => (
            <CharSpan key={`${confusable.id}-${index}`}>{unicode}</CharSpan>
          ))}
        </p>
      </div>
      <Button
        aria-label={`Copy ${confusable.label} confusable JSON data to clipboard`}
        variant="secondary"
        size="small"
        isIconButton
        onPress={() => {
          // Copy the confusable object data to the clipboard with 2 space indent
          navigator.clipboard.writeText(
            JSON.stringify(confusable, undefined, 2)
          );
        }}
      >
        <img src={iconClipboard} alt="" style={{ width: "16px" }} />
      </Button>
    </div>
  );
}
