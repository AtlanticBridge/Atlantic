const FunctionCaller = artifacts.require("FunctionCaller")


constract('[CCIP Call] Basic test function call for CCIP', (accounts) => {

    const owner = accounts[0]
    var funcCallerInstance

    before('Setup Contract', async function() {
        funcCallerInstance = await FunctionCaller.deployed()
    })

    it('Case #1: testCcip() should send EA message', async function() {
        
        var jobid = "36e66178f36e4117b77cb5fa8c1f3669"

        var tx = await funcCallerInstance.testCcip(jobid, {
            from: owner
        })

        console.log(tx)
    })
})