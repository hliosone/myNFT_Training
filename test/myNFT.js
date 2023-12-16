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

    return {myContract, accountOwner, accountTwo};
  }
  prerequisitesFixture();

  describe("NFT Creation", function () {

    it("Contract signer should be considered the account owner", async function () {
      const {myContract, accountOwner,} = await loadFixture(prerequisitesFixture);

      //By using Ownable.sol, mycontract.owner() will return an address (not an account type !!!)
      // whereas accountOwner and accountTwo are account types so we get addresses through methods
      expect(await myContract.owner()).to.equal(accountOwner.address);
    });    
  });

  describe("NFT Metadata", function (){

    it("Should read correct metadata", async function () {
      const {myContract, accountOwner,} = await loadFixture(prerequisitesFixture);

      //Minting of an NFT by accountOwner and verification of data integrity
      const NFTNumber = 1;
      const NFTParentId = 0;
      const description = "My NFT to read";
      await myContract.mint(description, NFTParentId, accountOwner.address);

      const [_description, _parentId, _tokenOwner, _childrens] = await myContract.readMetadata(NFTNumber);

      expect(_description).to.equal(description);
      expect(_parentId).to.equal(NFTParentId);
      expect(_tokenOwner).to.equal(accountOwner.address);
      expect(_childrens).to.deep.equal([]);
    });

    it("Should modify correctly metadata", async function () {
      const {myContract, accountOwner,} = await loadFixture(prerequisitesFixture);

      //Creation of two NFTs with the same description but different parent ID
      NFTNumber = 0;
      const NFTParentId = 0;
      const description = "My NFT to modify";

      for (let i = 0; i < 2; ++i) {
        await myContract.mint(description, NFTParentId + i, accountOwner.address);
        ++NFTNumber;
      }

      //Changing NFT n2 description to be different and ParentID to become the same as NFT n1
      const newDescription = "It is a new description";
      await myContract.setMetadata(newDescription, NFTNumber, NFTParentId);
      [_description, _parentId, _tokenOwner,] = await myContract.readMetadata(NFTNumber);
      expect(_description).to.not.equal(description);
      expect(_parentId).to.equal(NFTParentId);
      expect(_tokenOwner).to.equal(accountOwner.address);

      //Creating NFT n3 as a children of NFT n1, should be listed as an NFT n1 children
      await myContract.mint(description, NFTParentId + 1, accountOwner.address);
      ++NFTNumber;
      await myContract.setMetadata(description, NFTNumber, NFTParentId + 1);
      [_, , , _childrens] = await myContract.readMetadata(NFTParentId + 1);
      expect(_childrens).to.deep.equal([NFTNumber]);

      // Removing NFT n3 as NFT n1 children, NFT n1 should't have NFT n3 as children
      await myContract.setMetadata(description, NFTNumber, NFTParentId);
      [_, , , _childrens] = await myContract.readMetadata(NFTParentId + 1);
      expect(_childrens).to.deep.equal([]);

      //Shouldn't change the description to pass an empty string
      await myContract.setMetadata("", NFTNumber, NFTParentId + 1);
      [_description, , ,] = await myContract.readMetadata(NFTNumber);
      expect(_description).to.equal(description);
    });
  });

  describe("Contract Acess Rights", function () {

    it("Only contract owner should be able to mint the NFT and modify metadata", async function () {
      const {myContract, accountOwner, accountTwo} = await loadFixture(prerequisitesFixture);

      const description = "My access right NFT";
      const NFTParentId = 0;
      const mintErrorMsg = "OwnableUnauthorizedAccount(\"" + accountTwo.address + "\")";
          
      const mintTest = "Caller is not the owner and cannot mint";
      await myContract.connect(accountTwo).mint(description, NFTParentId, accountTwo.address);
      //expect(await myContract.connect(accountTwo).mint(description, NFTParentId, accountTwo.address)).to.be.revertedWith(mintErrorMsg);

      //expect(await myContract.connect(accountTwo).setMetadata(description, 1, NFTParentId))
      //.to.be.revertedWith(mintErrorMsg);
    })
  })
})