var Web3 = require('web3')
require('dotenv').config()

const receiveMessageAbi = require('../ccip-ea/abi/ReceiveMessage.json')
const web3BscProvider_Ws = new Web3(new Web3.providers.WebsocketProvider(process.env.BSC_TESTNET_MORALIS_WS))
const WsAtlanticReceiverContract = new web3BscProvider_Ws.eth.Contract(
    receiveMessageAbi.abi,
    '0xEaed3B434d0FFf6D6d7AA80D72a3B47dD86A3617'
)

const init = async () => {
    WsAtlanticReceiverContract.events.FunctionExecuted()
      .on('data', event => {
        console.log('The event: ', event)
      })
      .on('changed', changed => console.log('The changed: ', changed))
      .on('error', err => console.error('The error: ', err))
      .on('connected', str => console.log('The string: ', str))
}


init()