import Head from "next/head";
import { Header } from "../components/Header";

export default function Home() {
  return (
    <>
      <Header />
      <Head>
        <title>About Page</title>
      </Head>
      <h1>This is the about page</h1>
    </>
  );
}
