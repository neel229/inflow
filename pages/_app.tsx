import "tailwindcss/tailwind.css";
import React from "react";
import { AppProps } from "next/app";
import { globalCss } from "@stitches/react";
import Layout from "../components/Layout";
import { Web3ReactProvider } from "@web3-react/core";
import { getLibrary } from "../utils/connector";

const gloablStyles = globalCss({
  "*": {
    margin: 0,
    boxSizing: "border-box",
    padding: 0,
  },
  html: {
    overflowX: "hidden",
  },
  body: {
    backgroundColor: "$loContrast",
    boxSizing: "border-box",
  },
  svg: { display: "block" },
  "::selection": {
    backgroundColor: "$grass3",
  },
});

const MyApp = ({ Component, pageProps }: AppProps) => {
  gloablStyles();
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Web3ReactProvider>
  );
};

export default MyApp;
