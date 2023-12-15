// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

//import the standard implementation of ERC721
//import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
//import "@openzeppelin/contracts/access/Ownable.sol";

// creation of an ERC721 contract
contract myNFT is ERC721Enumerable {

    uint256 private nextToken = 1;
    struct TokenMetadata {
        string description;
        uint256 tokenId;
        address tokenOwner;
    }

mapping(uint256 => TokenMetadata) private tokenMetadataBook;

constructor() ERC721("mySuperNFT","SPNFT"){}

function mint(string memory _description, address _tokenOwner) external {

    uint256 tokenNumber = nextToken;

    //We mint the token first because it's more gas effective than if we mint it after added metadata
    _mint(_tokenOwner, tokenNumber);

    //Add metadata to the token
    tokenMetadataBook[tokenNumber] = TokenMetadata({
        description: _description,
        tokenId: tokenNumber,
        tokenOwner: _tokenOwner
    });

    //Incrementing for next token number
    ++nextToken;
}

function readMetadata(uint256 _tokenId) public view returns (string memory, uint256, address) {
    TokenMetadata memory data = tokenMetadataBook[_tokenId];
    return (data.description, _tokenId, data.tokenOwner);
}


}