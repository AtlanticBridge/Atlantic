// const { Validator } = require('@chainlink/external-adapter')

const { Binance } = require('./endpoint/binance')

// const axios = require('axios')

// var Web3 = require('web3')
// const { Requester, Validator } = require('@chainlink/external-adapter')

// Define custom error scenarios for the API.
// Return true for the adapter to retry.
// const customError = (data) => {
//   if (data.Response === 'Error') return true
//   return false
// }

// Define custom parameters to be used by the adapter.
// Extra parameters can be stated in the extra object,
// with a Boolean value indicating whether or not they
// should be required.

// THIS SHOULD BE THE MESSAGE STRUCTURE!
/*
struct Message {
    bytes _chainId;
    address _address;
    string _method;
    bool _callback;
    int _amount
    BufferChainlink.buffer buf;
}

*/
// const customParams = {
//   chainId: false,
//   address: false,
//   method: false,
//   callback: false,
//   amount: false
// }

const createRequest = async (input, callback) => {
  console.log('The Incoming Data: ', input)
  // console.log("callback is this! ", callback)

  // var buffer = ArrayBuffer(input.key.length)

  // var data = {
  //   _id: input.data.
  //   _address: input.data.address,
  //   _amount: input.data.amount,
  //   _chainId: input.data.chainId,
  //   _destination: input.data.destination,
  //   _method: input.data.method
  // }

  var binance = new Binance()

  // Get Data

  // eslint-disable-next-line no-undef
  switch (input.data.chainId) {
    case 'ethereum':
      console.log('run ethereum')
      break
    case 'binance':
      var id = await binance.sendData(input.data)
      var dat = {
        data: { payload: id }
      }
      return callback(400, dat)
    default:
      throw new Error('no valid chain id')
  }
}

// This is a wrapper to allow the function to work with
// GCP Functions
exports.gcpservice = (req, res) => {
  createRequest(req.body, (statusCode, data) => {
    res.status(statusCode).send(data)
  })
}

// This is a wrapper to allow the function to work with
// AWS Lambda
exports.handler = (event, context, callback) => {
  createRequest(event, (statusCode, data) => {
    callback(null, data)
  })
}

// This is a wrapper to allow the function to work with
// newer AWS Lambda implementations
exports.handlerv2 = (event, context, callback) => {
  createRequest(JSON.parse(event.body), (statusCode, data) => {
    callback(null, {
      statusCode: statusCode,
      body: JSON.stringify(data),
      isBase64Encoded: false
    })
  })
}

// This allows the function to be exported for testing
// or for running in express
module.exports.createRequest = createRequest
