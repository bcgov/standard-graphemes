import { render, screen } from "@testing-library/react";
import { describe, it, expect, vitest } from "vitest";

import SearchBar from "./SearchBar";

describe("SearchBar", () => {
  it("buttons are disabled with an empty search string", async () => {
    const mockSetSearch = vitest.fn();
    const mockHandleSearch = vitest.fn();
    const mockHandleReset = vitest.fn();
    render(
      <SearchBar
        description="Description below search bar"
        label="Label on top of search bar"
        search=""
        setSearch={mockSetSearch}
        handleReset={mockHandleReset}
        handleSearch={mockHandleSearch}
      />
    );
    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(2);
    expect(buttons[0].hasAttribute("disabled")).toBeTruthy();
    expect(buttons[1].hasAttribute("disabled")).toBeTruthy();
  });
});
