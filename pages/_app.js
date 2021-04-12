import { PageLayout } from "@/layouts/PageLayout";
import { QueryClient, QueryClientProvider } from "react-query";
import "../styles/globals.css";
import "react-toggle/style.css";

// Create a client
const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <PageLayout>
        <Component {...pageProps} />
      </PageLayout>
    </QueryClientProvider>
  );
}

export default MyApp;
