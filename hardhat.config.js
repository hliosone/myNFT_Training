require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.20",

  //Define test ntwork to deploy to
  //Define account to use for deployment
  networks: {
    hardhat: {
      //convention chain id 1337 for hardhat
      chainId: 1337,
      //here Hardhat will generate 10 accounts 
      accounts: {
        count: 10,
      },
    },
    sepolia: {
      url: process.env.API_KEY_URL,
      accounts:[process.env.PRIVATE_KEY]
    }
  }  
};
