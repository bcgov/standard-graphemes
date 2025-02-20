import { PropsWithChildren } from "react";
import { Footer, Header } from "@bcgov/design-system-react-components";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";

import "./App.css";

const queryClient = new QueryClient();

function App({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>
      <Header title="Standard Graphemes">
        <Link to="/">Confusables</Link>
        <Link to="/character">Character Explorer</Link>
      </Header>
      {children}
      <Footer />
    </QueryClientProvider>
  );
}

export default App;
