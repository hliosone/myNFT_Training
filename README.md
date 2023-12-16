# NFT with metadata
For this exercise you are asked to program a smart contract using Solidity.

This smart contract will be used to create NFTs that hold additional metadata. Theses NFTs represent real-world assets.

## Requirements 
Your smart contract must satisfy the following requirements:
- The NFTs respect the ERC 721 standard.
- An NFT can have a parent NFT (using metadata). This enables us to create a hierarchy of NFTs.
- Only the owner of the contract has the right to mint NFTs (use the ownable interface from openzeppelin).
- An NFT holds additional metadata:
  - a description of the NFT.
  - a parent field that holds the token id of the parent NFT (if the NFT is a child).
  - an owner field that holds the public address of an account that owns this NFT. (only the contract owner can mint NFTS but can attribute this field to another account to indicate who is the owner).
- a method to modify an NFT's metadata.
- a method to read an NFT's metadata.
- a method to get the children NFTs (token ids) of a given NFT.

Provide some testing functions that call the methods of your smart contract and check the results.

## How to proceed
Clone this repo and when you are done, please provide us with a link to your repo containing the solution. Your repo must have a readme indicating the steps needed to deploy and test your smart contract.

This project is a training for using ERC721.sol, Ownable.sol and use of metadata.
The goal is also to takes notes of different cases where gas usage could be optimized.

Notes :

- Hardhat commands :

```shell


Installing
npm install --save-dev hardhat

npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.js
```

- Hadhat Global Options :

Hardhat version 2.19.2

Usage: hardhat [GLOBAL OPTIONS] [SCOPE] <TASK> [TASK OPTIONS]

GLOBAL OPTIONS:

  --config           	A Hardhat config file. 
  --emoji            	Use emoji in messages. 
  --flamegraph       	Generate a flamegraph of your Hardhat tasks 
  --help             	Shows this message, or a task's help if its name is provided 
  --max-memory       	The maximum amount of memory that Hardhat can use. 
  --network          	The network to connect to. 
  --show-stack-traces	Show stack traces (always enabled on CI servers). 
  --tsconfig         	A TypeScript config file. 
  --typecheck        	Enable TypeScript type-checking of your scripts/tests 
  --verbose          	Enables Hardhat verbose logging 
  --version          	Shows hardhat's version. 


AVAILABLE TASKS:

  check              	Check whatever you need
  clean              	Clears the cache and deletes all artifacts
  compile            	Compiles the entire project, building all artifacts
  console            	Opens a hardhat console
  coverage           	Generates a code coverage report for tests
  flatten            	Flattens and prints contracts and their dependencies. If no file is passed, all the contracts in the project will be flattened.
  gas-reporter:merge 	
  help               	Prints this message
  node               	Starts a JSON-RPC server on top of Hardhat Network
  run                	Runs a user-defined script after compiling the project
  test               	Runs mocha tests
  typechain          	Generate Typechain typings for compiled contracts
  verify             	Verifies a contract on Etherscan or Sourcify


AVAILABLE TASK SCOPES:

  vars               	Manage your configuration variables

To get help for a specific task run: npx hardhat help [SCOPE] <TASK>


