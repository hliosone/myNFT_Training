// ethers.js comes built in to Hardhat

const { ethers } = require("hardhat");

async function main() {
  //Specify to the script the contract we want to deploy
  const contract = await ethers.getContractFactory("myNFT");

  //Deploy it
  const deployedContract = await contract.deploy();

  await deployedContract.deployedContract;

  contractAddr = await deployedContract.getAddress();
  console.log("NFT Contract deployed to: " + contractAddr);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
 