import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { router } from "./router.tsx";

// Import B.C. Design System variables first for use in all other CSS files.
import "@bcgov/design-tokens/css-prefixed/variables.css";
import "@bcgov/bc-sans/css/BC_Sans.css";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
