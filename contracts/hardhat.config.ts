import type { HardhatUserConfig } from "hardhat/types";

import "@nomiclabs/hardhat-ethers";
import "@openzeppelin/hardhat-upgrades";

const config: HardhatUserConfig = {
  solidity: "0.8.7",
  networks: {
    hardhat: {
      chainId: 1337,
    },
    polygon_testnet: {
      url: `https://polygon-mumbai.infura.io/v3/${process.env.PROJECT_ID}`,
      accounts: [],
    },
    polygon_mainnet: {
      url: `https://polygon-mainnet.infura.io/v3/${process.env.PROJECT_ID}`,
      accounts: [],
    },
  },
};

export default config;
