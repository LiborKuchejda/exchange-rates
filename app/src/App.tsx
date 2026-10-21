import { Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ErrorBoundary } from "react-error-boundary";
import { QueryErrorResetBoundary } from '@tanstack/react-query'
import { logError } from "./hooksAndUtils/logError";
import ErrorFallback from "./components/ErrorFallback"
import PageContainer from "./components/PageContainer";
import { Spinner } from "./components/UX";
import { DailyExchangeRates } from "./pages/DailyExchangeRates";

const queryClient = new QueryClient();

function App() {

  return (
    <PageContainer>
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary
            onReset={reset}
            FallbackComponent={ErrorFallback}
            onError={logError}
          >
            <QueryClientProvider client={queryClient}>
              <section>
                <Suspense fallback={<Spinner />}>
                  <DailyExchangeRates />
                </Suspense>
              </section>
            </QueryClientProvider>
          </ErrorBoundary>
        )}

      </QueryErrorResetBoundary>
    </PageContainer>
  )
}

export default App
