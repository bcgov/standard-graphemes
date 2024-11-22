import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, beforeEach } from "vitest";

import Tabs from "./Tabs";

describe("Tabs component", () => {
  beforeEach(() => {
    render(
      <Tabs
        tabList={[
          { id: "first", label: "First tab" },
          { id: "second", label: "Second tab" },
        ]}
        tabPanels={[
          { id: "first", children: <p>First panel text</p> },
          { id: "second", children: <span>Second panel text</span> },
        ]}
      />
    );
  });

  it("contains a list of tabs with role='tablist'", async () => {
    const tabList = screen.getByRole("tablist");
    expect(tabList.tagName).toBe("DIV");
    expect(tabList.children).toHaveLength(2);
  });

  it("each tab has role='tab'", async () => {
    const tabs = screen.getAllByRole("tab");
    expect(tabs).toHaveLength(2);
    expect(tabs[0].tagName).toBe("DIV");
    expect(tabs[0].role).toBe("tab");
  });

  it("tab panel has role='tabpanel'", async () => {
    const panel = screen.getByRole("tabpanel");
    expect(panel.tagName).toBe("DIV");
    expect(panel.role).toBe("tabpanel");
  });

  it("first panel is shown by default", async () => {
    const panel = screen.getByRole("tabpanel");
    expect(panel.children).toHaveLength(1);
    expect(panel.children[0].tagName).toBe("P");
    expect(panel.children[0].textContent).toBe("First panel text");
  });

  it("second panel is shown after second tab is clicked", async () => {
    const user = userEvent.setup();
    await user.click(screen.getByText("Second tab"));
    const panel = screen.getByRole("tabpanel");
    expect(panel.children).toHaveLength(1);
    expect(panel.children[0].tagName).toBe("SPAN");
    expect(panel.children[0].textContent).toBe("Second panel text");
  });
});
