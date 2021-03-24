import Document, { Html, Head, Main, NextScript } from "next/document";

function getFonts() {
  const baseUrl = `https://fonts.googleapis.com/css2`;
  const FONTS = {
    vollkorn: `family=Vollkorn:ital,wght@0,800;1,800`,
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
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link href={fonts} rel="stylesheet" />
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
