import Head from "next/head";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { ReactNode } from "react";

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({ children, title = "Inflow" }: Props) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
