import Head from "next/head";
import { Header } from "../components/Header";

export default function Home() {
  return (
    <>
      <Header />
      <Head>
        <title>Dapp Tutorial</title>
      </Head>
      <h1>Welcome to Polygon dApp tutorial</h1>
    </>
  );
}
