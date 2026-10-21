import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import ErrorBoundary from "./components/ErrorBoundary"
import ErrorFallback from "./components/ErrorFallback"
import { Suspense } from "react";
import PageContainer from "./components/PageContainer";
import { DailyExchangeRates } from "./pages/DailyExchangeRates";

const queryClient = new QueryClient();

function App() {

  return (
    <PageContainer>
      <ErrorBoundary fallbackComponent={ErrorFallback}>
        <QueryClientProvider client={queryClient}>
          <section>
            <Suspense fallback={<h1>Loading...</h1>}>
              <DailyExchangeRates />
            </Suspense>
          </section>
        </QueryClientProvider>
      </ErrorBoundary>
    </PageContainer>
  )
}

export default App
