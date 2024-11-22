import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";

import App from "./App";

describe("Vitest smoke tests", () => {
  it("true to be true", () => {
    expect(true).toBe(true);
  });

  it("false to be false", () => {
    expect(false).toBe(false);
  });
});

describe("App", () => {
  it("renders a header element with role='banner'", () => {
    render(<App />);
    const header = screen.getByRole("banner");

    expect(header.tagName).toBe("HEADER");
    expect(header.textContent).toBe("Confusables Validator");
  });

  it("renders a footer element with role='contentinfo'", () => {
    render(<App />);
    const footer = screen.getByRole("contentinfo");

    expect(footer.tagName).toBe("FOOTER");
  });

  it("render a main element with role='main'", () => {
    render(<App />);
    const main = screen.getByRole("main");

    expect(main.tagName).toBe("MAIN");
  });
});
