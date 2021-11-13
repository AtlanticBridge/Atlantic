const AtlanticCallerV1 = artifacts.require("AtlanticCallerV1")

module.exports = async function(deployer, network, accounts) {
    if (network == "ganache") {
        deployer.deploy(AtlanticCallerV1);
    }
}