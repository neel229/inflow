export enum SupportedChainId {
  MAINNET = 1,
  ROPSTEN = 3,
  // HARDHAT = 1337, // For local development
}

export const ALL_SUPPORTED_CHAIN_IDS: SupportedChainId[] = [
  SupportedChainId.MAINNET,
  SupportedChainId.ROPSTEN,
  // SupportedChainId.HARDHAT,
];

export const L1_CHAIN_IDS = [
  SupportedChainId.MAINNET,
  SupportedChainId.ROPSTEN,
  // SupportedChainId.HARDHAT,
] as const;

export type SupportedL1ChainId = typeof L1_CHAIN_IDS[number];

export interface L1ChainInfo {
  readonly blockWaitMsBeforeWarning?: number;
  readonly explorer: string;
  readonly label: string;
  readonly logoUrl?: string;
  readonly rpcUrls?: string[];
  readonly nativeCurrency: {
    name: string; 
    symbol: string; 
    decimals: number; 
  };
}

export type ChainInfo = { readonly [chainId: number]: L1ChainInfo } & {
  readonly [chainId in SupportedL1ChainId]: L1ChainInfo;
};

export const CHAIN_INFO: ChainInfo = {
  [SupportedChainId.MAINNET]: {
    explorer: "https://etherscan.io/",
    label: "Ethereum",
    nativeCurrency: { name: "ETH", symbol: "ETH", decimals: 18 },
  },
  [SupportedChainId.ROPSTEN]: {
    explorer: "https://ropsten.etherscan.io/",
    label: "Ropsten",
    nativeCurrency: { name: "Ropsten ETH", symbol: "ropETH", decimals: 18 },
  },
};
