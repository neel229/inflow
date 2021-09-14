import React from "react";
import { AppProps } from "next/app";
import { globalCss } from "@stitches/react";
import Layout from "../components/Layout";

const gloablStyles = globalCss({
  "*": {
    margin: 0,
    padding: 0,
  },
  html: {
    overflowX: "hidden",
  },
  body: {
    backgroundColor: "$loContrast",
    boxSizing: "border-box",
  },
  "body, button": {
    fontFamily: "Poppins",
  },
  "p, h1, h2, h3": {
    fontFamily: "Inter",
  },
  svg: { display: "block" },
  "::selection": {
    backgroundColor: "$grass4",
  },
});

const MyApp = ({ Component, pageProps }: AppProps) => {
  gloablStyles();
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};

export default MyApp;
