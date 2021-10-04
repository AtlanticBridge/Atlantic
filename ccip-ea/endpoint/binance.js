var Web3 = require('web3')

require('dotenv').config()

const web3Bsc = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545')

const bridgeBsc = new web3Bsc.eth.Contract(
  'abi',
  '<address>'
)

const { address: admin } = web3Bsc.eth.accounts.wallet.add(process.env.BSC_TESTNET_PRIVATE_KEY)

class Binance {
  constructor () {
    this.privateKey = Buffer.from(process.env.BSC_TESTNET_PRIVATE_KEY, 'hex')
    this.contractAddress = ''
  }

  async sendData (senddata) {
    const tx = bridgeBsc.methods.sendData(senddata)

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
    const receipt = await web3Bsc.eth.sendTransaction(txData)
    console.log(`Transaction hash: ${receipt.transactionHash}`)
    // console.log(`
    //   Processed transfer:
    //   - from ${from}
    //   - to ${to}
    //   - amount ${amount} tokens
    //   - date ${date}
    // `)
  }

  getTransactionCount (addressFrom) {
    return web3Bsc.eth.getTransactionCount(addressFrom)
  }
}

exports.Binance = Binance
