import "@nomiclabs/hardhat-waffle";

export default {
  solidity: "0.8.4",
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
