const { ethers } = require("hardhat");
const fs = require('fs');

async function main(){

    //Getting the right contract address
    //.trim() will remove blank spaces
    const contractAddress = fs.readFileSync('contractAddress.txt', 'utf-8').trim();

    const myNFTContract = await ethers.getContractFactory('myNFT');

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });