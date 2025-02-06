import { QueryClientProvider } from "@tanstack/react-query";

import { MainPage } from "~/pages";
import { queryClient } from "~/shared/api";

import "./App.css";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MainPage />
    </QueryClientProvider>
  );
}

export default App;
