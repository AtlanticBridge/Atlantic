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
        assert.equal(create_message, 1);
    });

    it("Should successfully call the getFoo function of TestContract", async () => {
        const destination_address = testContractInstance.address
        // await testContractInstance.send(web3.utils.toWei("5", "ether"), {from: accounts[1]});
        // await funcCallerInstance.send(web3.utils.toWei("5", "ether"), {from: accounts[1]});
        const execute_message = await funcCallerInstance.receiveFromRemoteChain(
            'setFoo',
            '0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7',
            1,
            destination_address,
            {from: accounts[0], gas: 300000}
        )
        const get_foo = await testContractInstance.getFoo()
        assert.equal(get_foo, 99)
    })

    it("Should successfully initialize a chainlink buffer object in a message", async () => {
        const create_message = await funcCallerInstance.initializeMessage(
            'test_func', 
            '0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7', 
            10, 
            '0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2'
        )
        await funcCallerInstance.add(1, "s", "value1");
        await funcCallerInstance.addInt(1, "uint", 10)
        // await funcCallerInstance.add(1, "param3", "value3");
        const params = await funcCallerInstance.getParams(1);
        const destination = await funcCallerInstance.getMessage(1);
        console.log(destination)
        console.log(params);
    })
}
)