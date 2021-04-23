import type { AppProps } from "next/app";
import { CloudinaryContext, Transformation, Image } from "cloudinary-react";
import { QueryClient, QueryClientProvider } from "react-query";
import "@/styles/globals.scss";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CloudinaryContext cloudName="brianhan">
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </CloudinaryContext>
  );
}

export default MyApp;
