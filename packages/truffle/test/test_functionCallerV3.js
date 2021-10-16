const FunctionCaller = artifacts.require("FunctionCallerV3")

contract("Test FunctionCallerV3 contract", async accounts => {

    const owner = accounts[0]
    var funcCallerInstance 

    before('Setup Contract', async function() {
        // funcCallerInstance = await FunctionCaller.deployed()
    })
    
    it("Should return a message Id of 1", async () => {
        funcCallerInstance = await FunctionCaller.deployed()
        const create_message = await funcCallerInstance.initializeMessage(
            'test_func', 
            '0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7', 
            10, 
            '0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2'
        )
        assert.equal(create_message, 1);
    })
}
)