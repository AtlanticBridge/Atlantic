const OracleContract = artifacts.require("chainlink/Oracle.sol")
const FunctionCaller = artifacts.require("CCIP/FunctionCaller")

var fs = require("fs")

module.exports = async function(deployer, network, accounts) {

    console.log('---------------------------------')
    console.log('NETWORK: ')
    console.log(network)
    console.log('---------------------------------')
    console.log('ACCOUNTS: ')
    console.log(accounts)
    console.log('---------------------------------')

    /*
    ================================================

    DEPLOY ORACLE CONTRACT

    ================================================
    */

    const chainlink_address = "0xa36085F69e2889c224210F603D836748e7dC0088";
    const node_address = "0xA47C2b721354005B52C7b24a33C085eAB43272a2";
    await deployer.deploy(OracleContract, chainlink_address);

    OracleInstance = await OracleContract.deployed();

    await OracleInstance.setFulfillmentPermission(node_address,true);

    // TODO: We want to automatically save the deployment information.
    // NOTE: We may also need / want to send automatic funds to the contract as well.


    /*
    ================================================

    DEPLOY FUNCTINO_CALLER CONTRACT

    ================================================
    */
    await deployer.deploy(FunctionCaller, OracleInstance.address);

    console.log('---------------------------------')
    console.log('NETWORK: ')
    console.log(network)
    console.log('---------------------------------')
    console.log('ACCOUNTS: ')
    console.log(accounts)
    console.log('---------------------------------')
    console.log('FunctionCaller Address: ')
    console.log(FunctionCaller.address)
    console.log('---------------------------------')


    // --- Save Data to File ---
    let data = {
        "oracle": OracleContract.address,
        "functionCaller": FunctionCaller.address,
        "network": network,
        "addresses": accounts
    }
    var jsonData = JSON.stringify(data);

    fs.writeFileSync("outputs/6_deploy_oracle.json", jsonData, function(err) {
        if (err) {
            console.log(err);
        }
    });
}