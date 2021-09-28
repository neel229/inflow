import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({ children }: Props) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
