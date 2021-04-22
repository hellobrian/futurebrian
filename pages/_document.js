import Document, { Html, Head, Main, NextScript } from "next/document";

function getFonts() {
  const baseUrl = `https://fonts.googleapis.com/css2`;
  const FONTS = {
    bebas: `family=Bebas+Neue`,
    roboto: `family=Roboto`,
  };
  const fontStrings = Object.values(FONTS);
  return `${baseUrl}?${fontStrings.join("&")}`;
}

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    const fonts = getFonts();

    return (
      <Html lang="en" className="dark">
        <Head>
          <meta
            name="description"
            content="This is a space for Futurebrian to show off photos, videos and thoughts about his keyboard collection."
          />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link href={fonts} rel="stylesheet" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
