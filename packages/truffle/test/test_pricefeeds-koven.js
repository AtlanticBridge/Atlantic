const PricefeedsKovan = artifacts.require("PricefeedsKovan");

contract('[pricefeed Kovan] Basic Contract Features', (accounts) => {
    const owner = accounts[0];
    const acct2 = accounts[2];
    var PricefeedsKovanInstance ;
    
    before('Setup Contract', async function() {
        PricefeedsKovanInstance = await PricefeedsKovan.deployed();
    })

    // --- TESTS ---
    it('Case #1: Link Price Feed', async () => {
        // const rep = await PricefeedsKovanInstance.getEthLatestPrice();
        console.log('===========')
        console.log(owner)
        console.log('===========')
        // console.log(rep);
        assert.equal('hello', 'hello')
    })
})