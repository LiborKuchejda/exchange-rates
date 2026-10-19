import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import ErrorBoundary from "./components/ErrorBoundary"
import ErrorFallback from "./components/ErrorFallback"
import { Suspense } from "react";
import { RatesList } from "./components/RatesList";

const queryClient = new QueryClient();

function App() {

  return (
    <ErrorBoundary fallbackComponent={ErrorFallback}>
      <QueryClientProvider client={queryClient}>
        <section>
          <h1>APP</h1>
          <Suspense fallback={<h1>Loading...</h1>}>
            <RatesList />
          </Suspense>
        </section>
      </QueryClientProvider>
    </ErrorBoundary>
  )
}

export default App
