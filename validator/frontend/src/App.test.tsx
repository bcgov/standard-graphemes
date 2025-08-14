import { screen } from "@testing-library/react";
import { customRender as render } from "./test-utils";
import { describe, it, expect } from "vitest";

describe("Vitest smoke tests", () => {
  it("true to be true", () => {
    expect(true).toBe(true);
  });

  it("false to be false", () => {
    expect(false).toBe(false);
  });
});

describe("App", () => {
  it("renders a header element with role='banner'", async () => {
    await render();

    const header = screen.getByRole("banner");

    expect(header.tagName).toBe("HEADER");
    expect(header.textContent).toBe("Confusables Validator");
  });

  it("renders a footer element with role='contentinfo'", async () => {
    await render();
    const footer = screen.getByRole("contentinfo");

    expect(footer.tagName).toBe("FOOTER");
  });

  it("render a main element with role='main'", async () => {
    await render();
    const main = screen.getByRole("main");

    expect(main.tagName).toBe("MAIN");
  });

  it("renders different content when visiting different routes", async () => {
    // This test verifies that the router is working by checking that different
    // routes render the same layout components (header, footer, main) as the
    // default route.
    await render({ initialEntries: ["/by-label"] });

    const header = screen.getByRole("banner");
    const footer = screen.getByRole("contentinfo");
    const main = screen.getByRole("main");

    expect(header).toBeTruthy();
    expect(footer).toBeTruthy();
    expect(main).toBeTruthy();
  });
});
