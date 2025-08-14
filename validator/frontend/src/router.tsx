import {
  createRouter,
  createRoute,
  createRootRoute,
} from "@tanstack/react-router";

import App from "./App";
import TextSearch from "./layout/TextSearch/TextSearch";
import ByLabel from "./layout/ByLabel/ByLabel";
import ByCharacter from "./layout/ByCharacter/ByCharacter";
import AllConfusables from "./layout/AllConfusables/AllConfusables";
import OcrUpload from "./layout/OpticalCharacterRecognition/OcrUpload";
import TextComparison from "./layout/TextComparison/TextComparison";

// Create a root route
const rootRoute = createRootRoute({
  component: App,
});

// Create index route that redirects to text-search
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => <TextSearch />,
});

// Create routes for each tab
const textSearchRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/text-search",
  component: () => <TextSearch />,
});

const byLabelRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/by-label",
  component: () => <ByLabel />,
});

const byCharacterRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/by-character",
  component: () => <ByCharacter />,
});

const allConfusablesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/all-confusables",
  component: () => <AllConfusables />,
});

const ocrRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/ocr",
  component: () => <OcrUpload />,
});

const textComparisonRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/text-comparison",
  component: () => <TextComparison />,
});

// Create the route tree, export for testing.
export const routeTree = rootRoute.addChildren([
  indexRoute,
  textSearchRoute,
  byLabelRoute,
  byCharacterRoute,
  allConfusablesRoute,
  ocrRoute,
  textComparisonRoute,
]);

// Create the router
export const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// Export route paths for easy reference
export const routePaths = {
  textSearch: "/text-search",
  byLabel: "/by-label",
  byCharacter: "/by-character",
  allConfusables: "/all-confusables",
  opticalCharacterRecognition: "/ocr",
  textComparison: "/text-comparison",
};
