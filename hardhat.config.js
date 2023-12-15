require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.20",

  //Define test ntwork to deploy to
  //Define account to use for deployment
  networks: {
    sepolia: {
      url: process.env.API_KEY_URL,
      accounts:[process.env.PRIVATE_KEY]
    }
  }

  
};
