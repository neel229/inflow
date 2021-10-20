import { createWeb3ReactRoot, Web3ReactProvider } from "@web3-react/core";
import { AppProps } from "next/app";
import Head from "next/head";
import "../styles/globals.css";
import getLibrary from "../utils/web3-react/getLibrary";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const Web3ProviderNetwork = createWeb3ReactRoot("NETWORK");

  return (
    <>
      <Head>
        <link
          rel="preload"
          href="/fonts/Inter-roman.latin.var.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </Head>
      <Web3ReactProvider getLibrary={getLibrary}>
        <Web3ProviderNetwork getLibrary={getLibrary}>
          <Component {...pageProps} />
        </Web3ProviderNetwork>
      </Web3ReactProvider>
    </>
  );
}

export default MyApp;
