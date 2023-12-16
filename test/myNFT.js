//package
// @nomicfoundation/hardhat-toolbox


const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("myNFT", function() {
  async function prerequisitesFixture() {
    const [accountOwner, accountTwo] = await ethers.getSigners();
    
    const contract = await ethers.getContractFactory("myNFT"); 

    // Contracts are deployed using the first signer/account by default
    const myContract = await contract.deploy();
    await myContract.deployedContract;

    let contractAddr = await myContract.getAddress();
    console.log("NFT Contract deployed to: " + contractAddr + "by " + myContract.owner.address);

    return {myContract, accountOwner, accountTwo};
  }
  prerequisitesFixture();

  describe("NFT Creation", function () {

    it("Contract signer should be considered the account owner", async function () {
      const {myContract, accountOwner,} = await loadFixture(prerequisitesFixture);

      //By using Ownable.sol, mycontract.owner() will return an address (not an account type !!!)
      // whereas accountOwner and accountTwo are account types so we get addresses through methods
      console.log("mycontractowner address : " + myContract.owner());
      console.log("accountOwner address : " + accountOwner.address);
      expect(await myContract.owner()).to.equal(accountOwner.address);
    });
  });

})