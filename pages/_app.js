// import { PageLayout } from "@/layouts/PageLayout";
import { QueryClient, QueryClientProvider } from "react-query";
import "../styles/globals.css";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      {/* <PageLayout></PageLayout> */}
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}

export default MyApp;
