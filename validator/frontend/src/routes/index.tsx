import * as tokens from "@bcgov/design-tokens/js";
import { createFileRoute } from "@tanstack/react-router";

import Tabs from "../components/Tabs/Tabs";
import AllConfusables from "../layout/Confusables/AllConfusables";
import ByCharacter from "../layout/Confusables/ByCharacter/ByCharacter";
import ByLabel from "../layout/Confusables/ByLabel/ByLabel";
import TextSearch from "../layout/Confusables/TextSearch/TextSearch";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <main>
      <p style={{ marginBottom: tokens.layoutMarginMedium }}>
        <strong>Confusables Validator</strong> is a web application for learning
        about <em>confusables</em> - characters that can easily be confused for
        others. It is built using data from the{" "}
        <a
          href="https://github.com/First-Peoples-Cultural-Council/unicode-resources"
          target="_blank"
        >
          FirstVoices Unicode Confusables Database
        </a>
        .
      </p>
      <p style={{ marginBottom: tokens.layoutMarginMedium }}>
        Use the tabs below to select a search option or see a list of all
        confusable characters.
      </p>
      <hr
        style={{
          borderColor: tokens.surfaceColorBorderDefault,
          borderTop: 0,
          borderRight: 0,
          borderLeft: 0,
        }}
      />
      <Tabs
        tabList={[
          { id: "text", label: "Search text for confusables" },
          { id: "label", label: "Search by label" },
          { id: "character", label: "Search by character" },
          { id: "all", label: "All confusables " },
        ]}
        tabPanels={[
          {
            id: "text",
            children: <TextSearch />,
          },
          {
            id: "label",
            children: <ByLabel />,
          },
          {
            id: "character",
            children: <ByCharacter />,
          },
          {
            id: "all",
            children: <AllConfusables />,
          },
        ]}
      />
    </main>
  );
}
