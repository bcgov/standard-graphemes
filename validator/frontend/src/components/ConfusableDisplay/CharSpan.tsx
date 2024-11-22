import { PropsWithChildren } from "react";
import * as tokens from "@bcgov/design-tokens/js";

interface CharSpanProps extends PropsWithChildren {
  /** CSS `background-color` string */
  backgroundColor?: string;
  /** CSS foreground `color` string */
  color?: string;
}

/**
 * A decorative `<span>` to place around individual characters for display.
 * The span places padding and a gray background around the character to set it
 * apart visually from neighboring characters.
 */
export default function CharSpan({
  backgroundColor,
  children,
  color,
  ...props
}: CharSpanProps) {
  return (
    <span
      style={{
        backgroundColor: backgroundColor ? backgroundColor : tokens.themeGray40,
        color: color ? color : tokens.typographyColorPrimary,
        borderRadius: tokens.layoutBorderRadiusMedium,
        padding: `${tokens.layoutPaddingNone} ${tokens.layoutPaddingSmall}`,
      }}
      {...props}
    >
      {children}
    </span>
  );
}
