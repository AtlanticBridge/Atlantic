const AtlanticReceiverV1 = artifacts.require("AtlanticReceiverV1")
const TestContract = artifacts.require("TestContract")
// truffle test ./test/test_functionCallerV3.js --network ganache

contract("Test FunctionCallerV3 contract", async accounts => {

    const owner = accounts[0]
    // var funcCallerInstance 

    before('Setup Contract', async function() {
        atlanticReceiverInstance = await AtlanticReceiverV1.deployed({ overwrite: false })
        testContractInstance = await TestContract.deployed({ overwrite: false })
    })
    
    it("Should return a message Id of 1", async () => {
        const create_message = await AtlanticReceiverV1.receiveFromRemoteChain(
            'setFoo', 
            atlanticReceiverInstance.address, 
            10, 
            testContractInstance.address,
            0,
            { from: owner }
        )
        console.log(create_message);
        // assert.equal(create_message, 1);
    });
})