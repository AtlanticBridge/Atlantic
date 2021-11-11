const AtlanticReceiverV1 = artifacts.require("AtlanticReceiverV1")

var fs = require("fs")

module.exports = async function(deployer, network, accounts) {
    console.log('---------------------------------')
    console.log('NETWORK: ')
    console.log(network)
    console.log('---------------------------------')
    console.log('ACCOUNTS: ')
    console.log(accounts)
    console.log('---------------------------------')

    if (network == 'kovan') {
        /*
        ================================================

        DEPLOY ATLANTIC_RECEIVER v1 CONTRACT

        ================================================
        */
       await deployer.deploy(AtlanticReceiverV1)

       AtlanticReveiverV1Instance = await AtlanticReceiverV1.deployed()

       console.log('---------------------------------')
       console.log('Atlantic Reciever v1 Address: ')
       console.log(AtlanticReceiverV1.address)
       console.log('---------------------------------')

       console.log(' --- KOVAN NETWORK SUCCESS --- ')
    } else if (network == 'bsc_testnet') {
        /*
        ================================================

        DEPLOY ATLANTIC_RECEIVER v1 CONTRACT

        ================================================
        */
        await deployer.deploy(AtlanticReceiverV1)
 
        AtlanticReveiverV1Instance = await AtlanticReceiverV1.deployed()
 
        console.log('---------------------------------')
        console.log('Atlantic Reciever v1 Address: ')
        console.log(AtlanticReceiverV1.address)
        console.log('---------------------------------')
 
        console.log(' --- BINANCE TESTNET SUCCESS --- ')

        // --- Save Data to File ---
        let data = {
            "name": "AtlanticReceiverV1",
            "address": AtlanticReceiverV1.address,
            "network": network,
            "addresses": accounts
        }
        var jsonData = JSON.stringify(data);
            fs.writeFileSync("outputs/3_integration_test_callback.json", jsonData, function(err) {
                if (err) {
                    console.log(err);
                }
            });
    } else {
        console.log('Unspecified network!')
    }
}