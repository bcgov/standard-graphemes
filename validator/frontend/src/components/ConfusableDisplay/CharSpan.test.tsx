import { render, screen } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";

import CharSpan from "./CharSpan";

describe("CharSpan", () => {
  beforeEach(() => {
    render(<CharSpan>A</CharSpan>);
  });

  it("renders a span", () => {
    const span = screen.getByText("A");
    expect(span.tagName).toBe("SPAN");
  });

  it("span contains children text", () => {
    const span = screen.getByText("A");
    expect(span.textContent).toBe("A");
  });
});
