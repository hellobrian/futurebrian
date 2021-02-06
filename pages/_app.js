import { PageLayout } from "@/layouts/PageLayout";
import "../styles/globals.css";
import "react-toggle/style.css";

function MyApp({ Component, pageProps }) {
  return (
    <PageLayout>
      <Component {...pageProps} />
    </PageLayout>
  );
}

export default MyApp;
