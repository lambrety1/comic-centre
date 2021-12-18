import "../styles/globals.css";
import "nprogress/nprogress.css";

import type { AppProps } from "next/app";
import Head from "next/head";
import NProgress from "nprogress";
import Navbar from "../components/Navbar";
import Router from "next/router";

NProgress.configure({
  showSpinner: false,
  trickleSpeed: 100,
});
Router.events.on("routeChangeStart", NProgress.start);
Router.events.on("routeChangeComplete", NProgress.done);
Router.events.on("routeChangeError", NProgress.done);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Comic Centre</title>
        <link rel="shortcut icon" href="/icon.png" type="image/x-icon" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
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
