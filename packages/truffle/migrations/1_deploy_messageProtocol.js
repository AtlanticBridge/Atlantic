const OracleContract = artifacts.require("Oracle.sol")
const FunctionCallerV3 = artifacts.require("FunctionCallerV3")
const ReceiveMessage = artifacts.require("ReceiveMessage")

var fs = require("fs")

module.exports = async function(deployer, network, accounts) {

    console.log('---------------------------------')
    console.log('NETWORK: ')
    console.log(network)
    console.log('---------------------------------')
    console.log('ACCOUNTS: ')
    console.log(accounts)
    console.log('---------------------------------')

       
    // TODO: We want to automatically save the deployment information.
    // NOTE: We may also need / want to send automatic funds to the contract as well.


    if (network == 'kovan') {

        /*
        ================================================

        DEPLOY ORACLE CONTRACT

        ================================================
        */
        const chainlink_address = "0xa36085F69e2889c224210F603D836748e7dC0088";
        const node_address = "0xA47C2b721354005B52C7b24a33C085eAB43272a2";
        await deployer.deploy(OracleContract, chainlink_address);

        OracleInstance = await OracleContract.deployed();

        console.log('---------------------------------')
        console.log('Oracle Address: ')
        console.log(OracleContract.address)
        console.log('---------------------------------')

        console.log("// ** Setting Fulfillment Permission ** //")

        await OracleInstance.setFulfillmentPermission(node_address,true);

        console.log(' --- SUCCESS --- ')

        /*
        ================================================

        DEPLOY FUNCTION_CALLER CONTRACT

        ================================================
        */

        await deployer.deploy(FunctionCallerV3, OracleInstance.address);

        console.log('---------------------------------')
        console.log('FunctionCaller Address: ')
        console.log(FunctionCallerV3.address)
        console.log('---------------------------------')


        // --- Save Data to File ---
        let data = {
            "oracle": OracleContract.address,
            "functionCaller": FunctionCallerV3.address,
            "network": network,
            "addresses": accounts
        }
        var jsonData = JSON.stringify(data);
        fs.writeFileSync("outputs/6_kovan_oracle.json", jsonData, function(err) {
            if (err) {
                console.log(err);
            }
        });
    }

    if (network == "bsc_testnet") {

        /*
        ================================================

        DEPLOY ReceiveMessage CONTRACT

        ================================================
        */

        await deployer.deploy(ReceiveMessage);

        console.log('---------------------------------')
        console.log('ReceiveMessage Address: ')
        console.log(ReceiveMessage.address)
        console.log('---------------------------------')
        
        
        // --- Save Data to File ---
        let data = {
            "receiveMessage": ReceiveMessage.address,
            "network": network,
            "addresses": accounts
        }
        var jsonData = JSON.stringify(data);
            fs.writeFileSync("outputs/6_bsc-testnet_ccip.json", jsonData, function(err) {
                if (err) {
                    console.log(err);
                }
            });
        }    
}