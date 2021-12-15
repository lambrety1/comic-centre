import "../styles/globals.css";

import type { AppProps } from "next/app";
import Head from "next/head";
import Navbar from "../components/Navbar";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Comic Centre</title>
        <link rel="shortcut icon" href="/icon.png" type="image/x-icon" />
        <link
          href="https://unpkg.com/boxicons@2.1.1/css/boxicons.min.css"
          rel="stylesheet"
        />
      </Head>
      <div className="flex flex-col items-stretch">
        <Navbar />
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default MyApp;
