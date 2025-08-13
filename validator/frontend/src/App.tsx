import { Footer, Header, Select } from "@bcgov/design-system-react-components";
import * as tokens from "@bcgov/design-tokens/js";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet, useLocation, useNavigate } from "@tanstack/react-router";

import { routePaths } from "./router";

import "./App.css";

const queryClient = new QueryClient();

function App() {
  const location = useLocation();
  const pathFragment = location.pathname
    .split("/")
    .filter((s) => s !== "")?.[0];
  const navigate = useNavigate();

  return (
    <QueryClientProvider client={queryClient}>
      <Header title="Confusables Validator" />
      <main>
        <p style={{ marginBottom: tokens.layoutMarginMedium }}>
          <strong>Confusables Validator</strong> is a web application for
          learning about <em>confusables</em> - characters that can easily be
          confused for others. It is built using data from the{" "}
          <a
            href="https://github.com/First-Peoples-Cultural-Council/unicode-resources"
            target="_blank"
          >
            FirstVoices Unicode Confusables Database
          </a>
          .
        </p>
        <p style={{ marginBottom: tokens.layoutMarginMedium }}>
          Use the dropdown menu below to select a search option.
        </p>
        <Select
          id="navigation"
          style={{ width: "100%" }}
          description="Choose a search method"
          defaultSelectedKey={pathFragment}
          items={[
            {
              id: "text-search",
              label: "Search text for confusables",
            },
            { id: "by-label", label: "Search by label" },
            {
              id: "by-character",
              label: "Search by character",
            },
            {
              id: "all-confusables",
              label: "All confusables ",
            },
            { id: "ocr", label: "Optical Character Recognition (OCR)" },
            {
              id: "text-comparison",
              label: "Text comparison",
            },
          ]}
          onSelectionChange={(key) => {
            switch (key) {
              case "by-label":
                navigate({ to: routePaths.byLabel });
                break;
              case "by-character":
                navigate({ to: routePaths.byCharacter });
                break;
              case "all-confusables":
                navigate({ to: routePaths.allConfusables });
                break;
              case "ocr":
                navigate({ to: routePaths.opticalCharacterRecognition });
                break;
              case "text-comparison":
                navigate({ to: routePaths.textComparison });
                break;
              case "text-search":
              default:
                navigate({ to: routePaths.textSearch });
                break;
            }
          }}
        />
        <hr
          style={{
            borderColor: tokens.surfaceColorBorderDefault,
            borderTop: 0,
            borderRight: 0,
            borderLeft: 0,
          }}
        />
        <div style={{ marginTop: tokens.layoutMarginMedium }}>
          <Outlet />
        </div>
      </main>
      <Footer />
    </QueryClientProvider>
  );
}

export default App;
