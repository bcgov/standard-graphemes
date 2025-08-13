import {
  RouterProvider,
  createMemoryHistory,
  createRouter,
} from "@tanstack/react-router";
import { render, waitFor } from "@testing-library/react";
import { expect } from "vitest";
import { routeTree } from "./router";

// Custom render function that renders the entire router
export async function customRender(options?: { initialEntries?: string[] }) {
  // Create a memory history for each test.
  const history = createMemoryHistory({
    initialEntries: options?.initialEntries || ["/"],
  });

  // Create a new router instance for each test to avoid state pollution.
  const testRouter = createRouter({
    routeTree,
    history,
  });

  const result = render(<RouterProvider router={testRouter} />);

  // Wait for the router to finish loading.
  await waitFor(() => {
    expect(testRouter.state.isLoading).toBe(false);
  });

  return result;
}
