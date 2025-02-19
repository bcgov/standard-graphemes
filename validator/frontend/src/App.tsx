import { PropsWithChildren } from "react";
import { Footer, Header } from "@bcgov/design-system-react-components";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./App.css";

const queryClient = new QueryClient();

function App({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>
      <Header title="Standard Graphemes" />
      {children}
      <Footer />
    </QueryClientProvider>
  );
}

export default App;
