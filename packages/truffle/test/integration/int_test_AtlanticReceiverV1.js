const fs = require('fs')
const Web3 = require('web3')

require('dotenv').config({ path: '../../.env' })

const AtlanticReceiver = require('../../../angular/src/app/artifacts/abis/AtlanticReceiverV1.json')

const init = async () => {
    const callbackOutputs = trycatch()

    console.log(callbackOutputs)

    // --- Connect to Contract on BSC Testnet ---
    const web3Bsc = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545');
    const AtlanticReceiverContract = new web3Bsc.eth.Contract(
        AtlanticReceiver.abi,
        callbackOutputs.address
    );
    const { address: admin } = web3Bsc.eth.accounts.wallet.add(process.env.BSC_TESTNET_PRIVATE_KEY);
    

    // --- Send Message ---
    const bufHex = web3Bsc.utils.toHex('param1value1')
    const bufBytes = web3Bsc.utils.hexToBytes(bufHex)
    const capacity = 10
    const messageId = 1

    console.log('creating transaction . . .')
    const tx = AtlanticReceiverContract.methods.sendCallback(bufBytes, capacity, messageId)
    console.log('getting gas price and cost . . .')
    // const gasPrice = await web3Bsc.eth.getGasPrice()
    const [gasPrice, gas] = await Promise.all([
        web3Bsc.eth.getGasPrice(),
        tx.estimateGas({ from: admin })
    ])
    console.log('creating transaction data . . .')
    const data = tx.encodeABI()
    console.log('on txData')
    const txData = {
        from: admin,
        to: AtlanticReceiverContract.options.address,
        data,
        gasPrice,
        gas
    }
    console.log('sending transaction to BSC testnet . . .')
    const receipt = await web3Bsc.eth.sendTransaction(txData)
    console.log(`Transaction hash: ${receipt.transactionHash}`)
}

function trycatch() {
    try {
        const jsonString = fs.readFileSync('../../outputs/3_integration_test_callback.json')
        var callbackOutputs = JSON.parse(jsonString)
        return callbackOutputs
    } catch(err) {
        console.log(err)
        return
    }
}

init();