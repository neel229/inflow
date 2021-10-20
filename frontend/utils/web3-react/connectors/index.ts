import { Web3Provider } from "@ethersproject/providers";
import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { WalletLinkConnector } from "@web3-react/walletlink-connector";

import { ALL_SUPPORTED_CHAIN_IDS, SupportedChainId } from "../chains";
import getLibrary from "../getLibrary";
import { NetworkConnector } from "./NetworkConnector";

const INFURA_KEY: string = process.env.PUBLIC_NEXT_INFURA_KEY;

if (typeof INFURA_KEY === "undefined") {
  throw new Error(
    `PUBLIC_NEXT_INFURA_KEY must be a defined environment variable`
  );
}

const NETWORK_URLS: { [key in SupportedChainId]: string } = {
  [SupportedChainId.MAINNET]: `https://mainnet.infura.io/v3/${INFURA_KEY}`,
  [SupportedChainId.ROPSTEN]: `https://ropsten.infura.io/v3/${INFURA_KEY}`,
};

export const network = new NetworkConnector({
  urls: NETWORK_URLS,
  defaultChainId: 1,
});

let networkLibrary: Web3Provider | undefined;
export function getNetworkLibrary(): Web3Provider {
  return (networkLibrary = networkLibrary ?? getLibrary(network.provider));
}

export const injected = new InjectedConnector({
  supportedChainIds: ALL_SUPPORTED_CHAIN_IDS,
});

export const walletconnect = new WalletConnectConnector({
  supportedChainIds: ALL_SUPPORTED_CHAIN_IDS,
  rpc: NETWORK_URLS,
  qrcode: true,
});

// mainnet only
export const walletlink = new WalletLinkConnector({
  url: NETWORK_URLS[SupportedChainId.MAINNET],
  appName: "Uniswap",
  // appLogoUrl: UNISWAP_LOGO_URL,
});
