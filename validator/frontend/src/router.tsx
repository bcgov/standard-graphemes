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
import NameSearch from "./layout/NameSearch/NameSearch";

export const routePaths = {
  textSearch: "/text-search",
  byLabel: "/by-label",
  byCharacter: "/by-character",
  allConfusables: "/all-confusables",
  opticalCharacterRecognition: "/ocr",
  textComparison: "/text-comparison",
  nameSearch: "/name-search",
};

const rootRoute = createRootRoute({
  component: App,
});

// Index route displays the same thing as `/text-search`.
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => <TextSearch />,
});
const textSearchRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: routePaths.textSearch,
  component: () => <TextSearch />,
});
const byLabelRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: routePaths.byLabel,
  component: () => <ByLabel />,
});
const byCharacterRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: routePaths.byCharacter,
  component: () => <ByCharacter />,
});
const allConfusablesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: routePaths.allConfusables,
  component: () => <AllConfusables />,
});
const ocrRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: routePaths.opticalCharacterRecognition,
  component: () => <OcrUpload />,
});
const textComparisonRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: routePaths.textComparison,
  component: () => <TextComparison />,
});
const nameSearchRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: routePaths.nameSearch,
  component: () => <NameSearch />,
});

// Export the route tree for testing purposes.
export const routeTree = rootRoute.addChildren([
  indexRoute,
  textSearchRoute,
  byLabelRoute,
  byCharacterRoute,
  allConfusablesRoute,
  ocrRoute,
  textComparisonRoute,
  nameSearchRoute,
]);

export const router = createRouter({ routeTree });

// Register the router instance for type safety.
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
