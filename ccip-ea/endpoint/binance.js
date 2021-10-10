var Web3 = require('web3')

require('dotenv').config()

const receiveMessage = require('../abi/ReceiveMessage.json')
// const bscContractInfo = require('../../packages/truffle/outputs/6_bsc-testnet_ccip.json')

const web3Bsc = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545')

const bridgeBsc = new web3Bsc.eth.Contract(
  receiveMessage.abi,
  '0xEaed3B434d0FFf6D6d7AA80D72a3B47dD86A3617'
)

const { address: admin } = web3Bsc.eth.accounts.wallet.add(process.env.BSC_TESTNET_PRIVATE_KEY)

class Binance {
  constructor () {
    this.privateKey = Buffer.from(process.env.BSC_TESTNET_PRIVATE_KEY, 'hex')
    this.contractAddress = ''
    this.customParams = {
      chainId: false,
      address: false,
      method: false,
      callback: false,
      amount: false
    }
  }

  async sendData (senddata) {
    console.log('// ** RECEIVED DATA ** //')
    console.log(senddata, '\n\n')
    var _id = senddata.id
    var _amount = senddata.amount
    var _destination = '0x'.concat(senddata.destination)
    var _method = senddata.method
    var _callback = '0x'.concat(senddata.callback)

    const tx = bridgeBsc.methods.receiveFromRemoteChain(_method, _callback, _amount, _destination, _id)

    console.log('...creating promise')
    const [gasPrice, gasCost] = await Promise.all([
      web3Bsc.eth.getGasPrice(),
      tx.estimateGas({ from: admin })
    ])

    const data = tx.encodeABI()
    const txData = {
      from: admin,
      to: bridgeBsc.options.address,
      data,
      gas: gasCost,
      gasPrice
    }

    console.log('--------------------------------------------------')
    console.log('\t Sending Transaction to Binance Testnet...')
    console.log('--------------------------------------------------')
    const receipt = await web3Bsc.eth.sendTransaction(txData)
    console.log(`Transaction hash: ${receipt.transactionHash}`)
    console.log(`
      Processed transfer:
        -   from: ${receipt.from}
        -     to: ${receipt.to}
        - amount: ${receipt.amount} tokens
        -   date: ${receipt.date}
    `)

    return _id
  }

  getTransactionCount (addressFrom) {
    return web3Bsc.eth.getTransactionCount(addressFrom)
  }
}

exports.Binance = Binance
