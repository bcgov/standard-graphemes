import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";

import ProgressBar from "./ProgressBar";

describe("ProgressBar component", () => {
  it("renders an element with role='progressbar'", () => {
    render(<ProgressBar isIndeterminate />);
    const progressBar = screen.getByRole("progressbar");
    expect(progressBar.tagName).toBe("DIV");
  });

  it("has default min and max values", () => {
    render(<ProgressBar isIndeterminate />);
    const progressBar = screen.getByRole("progressbar");
    expect(progressBar.ariaValueMin).toBe("0");
    expect(progressBar.ariaValueMax).toBe("100");
  });

  it("when given a value, value appears in aria-valuenow attribute", () => {
    const value = 60;
    render(<ProgressBar value={value} />);
    const progressBar = screen.getByRole("progressbar");
    expect(progressBar.ariaValueNow).toBe(value.toString());
  });

  it("when given a label, renders the label", () => {
    const labelText = "Progress so far";
    render(<ProgressBar label={labelText} value={40} />);
    const labelElement = screen.getByText(labelText);
    expect(labelElement.tagName).toBe("SPAN");
  });
});
