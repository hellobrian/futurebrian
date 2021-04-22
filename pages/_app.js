// import { PageLayout } from "@/layouts/PageLayout";
import { CloudinaryContext, Transformation, Image } from "cloudinary-react";
import { QueryClient, QueryClientProvider } from "react-query";
import "../styles/globals.css";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  return (
    <CloudinaryContext cloudName="brianhan">
      <QueryClientProvider client={queryClient}>
        {/* <PageLayout></PageLayout> */}
        <Component {...pageProps} />
      </QueryClientProvider>
    </CloudinaryContext>
  );
}

export default MyApp;
