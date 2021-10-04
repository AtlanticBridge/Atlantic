const OracleContract = artifacts.require("chainlink/Oracle.sol")


var fs = require("fs")

module.exports = async function(deployer, network, accounts) {

    const chainlink_address = "0xa36085F69e2889c224210F603D836748e7dC0088";
    const node_address = "0xA47C2b721354005B52C7b24a33C085eAB43272a2";
    await deployer.deploy(OracleContract, chainlink_address);

    OracleInstance = await OracleContract.deployed();

    console.log('---------------------------------')
    console.log('NETWORK: ')
    console.log(network)
    console.log('---------------------------------')
    console.log('ACCOUNTS: ')
    console.log(accounts)
    console.log('---------------------------------')
    console.log('Address: ')
    console.log(OracleContract.address)
    console.log('---------------------------------')

    console.log()
    await OracleInstance.setFulfillmentPermission(node_address,true);

    // --- Save Data to File ---
    let data = {
        "oracle": OracleContract.address,
        "network": network,
        "addresses": accounts
    }
    var jsonData = JSON.stringify(data);

    fs.writeFileSync("outputs/7_deploy_oracle.json", jsonData, function(err) {
        if (err) {
            console.log(err);
        }
    });
    // TODO: We want to automatically save the deployment information.
    // NOTE: We may also need / want to send automatic funds to the contract as well.
}