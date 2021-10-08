# Atlantic Smart Contracts
The Atlantic Smart Contracts are a message protocol that utilize Chainlink to transmit commands, information and instructions cross-chain. 

This mock example uses the ChainlinkClient contract and an External Adapter to relay information from Ethereum to Binance Smart Chain. The final goal is to implement this protocol utilizing the Chainlink Cross Chain Interoperability Protocol (CCIP).

Here are some key features that this project includes:

    - Truffle Framework
    - Chainlink Contracts

## Install Packages

Install packages `npm install` from the root directory.

## Deploying Atlantic Smart Contracts

The deploy scripts are in the migrations directory. To deploy and fully setup the smart contracts, the follow steps are needed:

1. truffle migrate -f 1 --to 1 --network kovan
2. truffle migrate -f 1 --to 1 --network bsc_testnet
3. Deploy the `ccip_runlog_job.json` on the Chainlink Node and include the Oracle address.
4. Using Remix, execute the `setJobId(_jobId)` method by passing the jobId from Step 3.


## VS Code Settings

If you are using VS Code, you may need to setup your environment to use Juan Blanco's *solidity* extension. Follow his steps to ensure your **local** and **global** solidity compiler versions coincide with the selected compiler version
in the actual smart contracts.