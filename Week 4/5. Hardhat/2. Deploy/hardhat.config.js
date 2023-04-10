require("@nomiclabs/hardhat-waffle");
require("dotenv").config();

module.exports = {
  solidity: "0.8.4",
  networks: {
    goerli: {
      url: process.env.TESTNET_ALCHEMY_RPC_URL,
      accounts: [process.env.PRIVATE_KEY]
    },
  }
};