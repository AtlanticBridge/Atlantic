const FunctionCallerV3 = artifacts.require("FunctionCallerV3")
const TestContract = artifacts.require("TestContract")
// truffle test ./test/test_functionCallerV3.js --network ganache

contract("Test FunctionCallerV3 contract", async accounts => {

    const owner = accounts[0]
    var funcCallerInstance 

    before('Setup Contract', async function() {
        testContractInstance = await TestContract.deployed()
        funcCallerInstance = await FunctionCallerV3.deployed()  
    })
    
    it("Should return a message Id of 1", async () => {
        const create_message = await funcCallerInstance.initializeMessage.call(
            'test_func', 
            '0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7', 
            10, 
            '0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2'
        )
        console.log(create_message);
        assert.equal(create_message, 1);
    });

    it("Should successfully call the getFoo function of TestContract", async () => {
        const destination_address = testContractInstance.address
        console.log("destination", destination_address)
        const execute_message = await funcCallerInstance.receiveFromRemoteChain.call(
            'setFoo',
            '0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7',
            1,
            destination_address
        )
        
        const get_foo = await testContractInstance.getFoo.call()
        console.log(get_foo)
        assert.equal(get_foo, 10)
    })
}
)