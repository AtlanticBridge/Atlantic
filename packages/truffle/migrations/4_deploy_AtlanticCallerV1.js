const AtlanticCallerV1 = artifacts.require("AtlanticCallerV1")

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
       await deployer.deploy(AtlanticCallerV1)

       AtlanticCallerV1Instance = await AtlanticCallerV1.deployed()

       console.log('---------------------------------')
       console.log('Atlantic Reciever v1 Address: ')
       console.log(AtlanticCallerV1Instance.address)
       console.log('---------------------------------')

       console.log(' --- KOVAN NETWORK SUCCESS --- ')
       // --- Save Data to File ---
       let data = {
            "name": "AtlanticCallerV1",
            "address": AtlanticCallerV1.address,
            "network": network,
            "owner": accounts[0]
        }
        var jsonData = JSON.stringify(data);
            fs.writeFileSync("outputs/4_kovan_AtlanticCallerV1.json", jsonData, function(err) {
                if (err) {
                    console.log(err);
                }
            });
    } else {
        console.log('Can only deploy to Kovan Network')
    }
}