# Simple NFT Contract

This project is a training for using ERC721.sol, ERC721Enumerable.sol, Ownable.sol and use of metadata.
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


