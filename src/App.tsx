import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import ErrorBoundary from "./components/ErrorBoundary"
import ErrorFallback from "./components/ErrorFallback"

const queryClient = new QueryClient();

function App() {

  return (
    <ErrorBoundary fallbackComponent={ErrorFallback}>
      <QueryClientProvider client={queryClient}>
        <section>
          <h1>APP</h1>
        </section>
      </QueryClientProvider>
    </ErrorBoundary>
  )
}

export default App
