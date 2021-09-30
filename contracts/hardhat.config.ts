import type { HardhatUserConfig } from "hardhat/types";

import "@nomiclabs/hardhat-ethers";
import "@openzeppelin/hardhat-upgrades";

const config: HardhatUserConfig = {
  solidity: "0.8.8",
  networks: {
    hardhat: {
      chainId: 1337,
    },
    // polygon_testnet: {
    //   url: `https://polygon-mumbai.infura.io/v3/${process.env.PROJECT_ID}`,
    //   accounts: [],
    // },
    // polygon_mainnet: {
    //   url: `https://polygon-mainnet.infura.io/v3/${process.env.PROJECT_ID}`,
    //   accounts: [],
    // },
    ropsten: {
      url: `https://ropsten.infura.io/v3/${process.env.PROJECT_ID}`,
      accounts: [
        "0xe15d1b6c5a0f77c03c96bd9de672f7eec89be590519910d9a53f4738bd248bb1",
      ],
    },
  },
};

export default config;
