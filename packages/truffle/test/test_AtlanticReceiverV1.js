const AtlanticReceiverV1 = artifacts.require("AtlanticReceiverV1")
const TestContract = artifacts.require("TestContract")
// truffle test ./test/test_functionCallerV3.js --network ganache

contract("Test AtlanticReceiverV1 contract", async accounts => {

    const owner = accounts[0]
    // var funcCallerInstance 

    before('Setup Contract', async function() {
        atlanticReceiverInstance = await AtlanticReceiverV1.deployed()
        testContractInstance = await TestContract.deployed()
        //{ overwrite: false }
    })
    
    it("Should return a message Id of 1", async () => {
        const create_message = await atlanticReceiverInstance.receiveFromRemoteChain(
            'setFoo', 
            atlanticReceiverInstance.address, 
            10, 
            testContractInstance.address,
            0
        )
        console.log(create_message);
        // assert.equal(create_message, 1);
    });
})