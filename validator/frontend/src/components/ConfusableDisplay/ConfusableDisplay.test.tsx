import { render, screen } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";

import ConfusableDisplay from "./ConfusableDisplay";

const confusable = {
  label: "’",
  id: "’",
  confusableChar: [" ̒", "̓ ̕", " ̔", "'", "＇", "ˈ", "՚", "ʼ"],
  confusableUnicode: ["̒", "̓", "̕", "̔", "'", "＇", "ˈ", "՚", "ʼ"],
};

describe("ConfusableDisplay", () => {
  beforeEach(() => {
    render(<ConfusableDisplay confusable={confusable} />);
  });

  const char = "’";

  it("renders a div with expected information", async () => {
    const characters = screen.getAllByText(char);
    expect(characters.length).toBeGreaterThan(1);
    expect(characters[0].parentElement?.tagName).toBe("P");
    expect(characters[0].parentElement?.textContent).toBe(`label: ${char}`);
  });

  it("contains a button to copy the confusable JSON to the clipboard", async () => {
    const button = screen.getByLabelText(
      `Copy ${char} confusable JSON data to clipboard`
    );
    expect(button.tagName).toBe("BUTTON");
  });
});
