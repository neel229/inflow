import "tailwindcss/tailwind.css";
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
  svg: { display: "block" },
  "::selection": {
    backgroundColor: "$grass3",
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
