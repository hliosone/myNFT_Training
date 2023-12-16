// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

//import the standard implementation of ERC721 and Ownable for access right
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// creation of an ERC721 contract
contract myNFT is ERC721, Ownable {

    uint256 private nextToken = 1;
    
    struct TokenMetadata {
        string description;
        address tokenOwner;
        uint256 parentId;
        uint256[] childrens;
    }

mapping(uint256 => TokenMetadata) private tokenMetadataBook;

//Using msg.sender instead of constructor argument for security reasons
constructor() ERC721("mySuperNFT","SPNFT") Ownable(msg.sender) {}

//mint function is only callable by the owner so here the first msg.sender of the contract
function mint(string memory _description, uint256 _parentId, address _tokenOwner) external onlyOwner {

    //Verify if parent is not current token and if parent exists
    require((_parentId != nextToken) && (_parentId == 0 || tokenExists(_parentId)));

    //We mint the token first because it's more gas effective than if we mint it after added metadata
    _mint(_tokenOwner, nextToken);

    //Add metadata to the token
    tokenMetadataBook[nextToken] = TokenMetadata({
        description: _description,
        tokenOwner: _tokenOwner,
        parentId: _parentId,
        childrens: new uint256[](0)
    });

    //Need to verify if parent exists before pushing !!!
    if(_parentId != 0){tokenMetadataBook[_parentId].childrens.push(nextToken);}

    //Incrementing after metadata creation for next token number
    ++nextToken;
}

function readMetadata(uint256 _tokenId) public view returns (string memory, uint256, address, uint256[] memory) {
    TokenMetadata memory data = tokenMetadataBook[_tokenId];
    return (data.description, data.parentId, data.tokenOwner, data.childrens);
}

function getChildrens(uint256 _tokenId) external view returns (uint256[] memory) {
    return tokenMetadataBook[_tokenId].childrens;
}

function setMetadata(string memory _description, uint256 _tokenNumber, uint256 _newParentId) external onlyOwner {
    //Check if we want to change the description or not
    if (bytes(_description).length != 0){
        tokenMetadataBook[_tokenNumber].description = _description;
    }

    //Check if the newParentId token exists and modify children string
    if((tokenExists(_newParentId) || _newParentId == 0) && tokenMetadataBook[_tokenNumber].parentId != _newParentId){
        
        if(tokenMetadataBook[_tokenNumber].parentId != 0){
            deleteChildrenRelation(_tokenNumber);
        }
        if(_newParentId != 0){
            addChildrenRelation(_newParentId, _tokenNumber);
        }

        tokenMetadataBook[_tokenNumber].parentId = _newParentId;
    }
}

    //Take a children as an argument and will be deleted in parent token children list
    function deleteChildrenRelation(uint256 _childrenToken) internal {
        TokenMetadata memory children = tokenMetadataBook[_childrenToken];
        uint256[] storage childrensList = tokenMetadataBook[children.parentId].childrens;

        if(childrensList.length != 0){
            for (uint256 i = 0; i < childrensList.length; ++i){
                if (childrensList[i] == _childrenToken){
                    childrensList[i] = childrensList[childrensList.length - 1];
                    childrensList.pop();
                    break;
                }
            }
        }
    }

    //Add a children to parent children list if it's not already there and change the parent id
    function addChildrenRelation(uint256 _newParentId, uint256 _childrenToken) internal {
        uint256[] storage childrensList = tokenMetadataBook[_newParentId].childrens;
        
        for (uint256 i = 0; i < childrensList.length; ++i){
            if (childrensList[i] == _childrenToken){
                break;
            }
        }
        childrensList.push(_childrenToken);
    }

    function tokenExists(uint256 _tokenId) internal view returns(bool){
        return (tokenMetadataBook[_tokenId].tokenOwner != address(0));
    }
}
