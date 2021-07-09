import Document, { Html, Head, Main, NextScript } from "next/document";
import globalStyles from "../styles/global";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css"
            integrity="sha512-NhSC1YmyruXifcj/KFRWoC561YpHpc5Jtzgvbuzx5VozKpWvQ+4nXhPdFgmx8xqexRcpAglTj9sIBWINXa8x5w=="
            crossOrigin="anonymous"
            referrerPolicy="no-referrer"
          />
          <link rel="stylesheet" href="https://use.typekit.net/zxp3uif.css" />
          <meta name="description" content="ESUMC Online Worship Bulletin" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
        <style jsx global>
          {globalStyles}
        </style>
      </Html>
    );
  }
}

export default MyDocument;
