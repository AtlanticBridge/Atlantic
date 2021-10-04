const { Validator } = require('@chainlink/external-adapter')

const { Binance } = require('./endpoint/binance')

const axios = require('axios')

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
const customParams = {
  chainId: false,
  address: false,
  method: false,
  callback: false,
  amount: false
}

const createRequest = (input, callback) => {
  console.log('The Incoming Data: ', input)
  // console.log("callback is this! ", callback)

  // var buffer = ArrayBuffer(input.key.length)

  var binance = new Binance()
  const endpoint = input.data.endpoint || 'binance'
  const jobRunID = input.id
  const message = input.data.message

  // Get Data

  // eslint-disable-next-line no-undef
  switch (endpoint) {
    case 'ethereum':
      console.log('run ethereum')

      break
    case 'binance':
      binance.sendData(message)

      break
    default:
      throw new Error('no valid chain id')
  }

  const validator = new Validator(callback, input, customParams)

  console.log('The Validator: ', validator)

  var resp = {
    '1',
    data: 
  }

  // If successfull
  callback(400, Requester.success(jobRunID, response))
  // const chainId = validator.validated.data.chainId || ''
  // const chainId = validator.validated.data.address || ''
  // const chainId = validator.validated.data.method || ''
  // const chainId = validator.validated.data.callback || ''
  // const chainId = validator.validated.data.amount || ''

  // const chainId =
  // // The Validator helps you validate the Chainlink request data
  // const validator = new Validator(callback, input, customParams)
  // const jobRunID = validator.validated.id
  // const endpoint = validator.validated.data.endpoint || 'price'
  // const url = `https://min-api.cryptocompare.com/data/${endpoint}`
  // const fsym = validator.validated.data.base.toUpperCase()
  // const tsyms = validator.validated.data.quote.toUpperCase()

  // const params = {
  //   fsym,
  //   tsyms
  // }

  // // This is where you would add method and headers
  // // you can add method like GET or POST and add it to the config
  // // The default is GET requests
  // // method = 'get'
  // // headers = 'headers.....'
  // const config = {
  //   url,
  //   params
  // }

  // // The Requester allows API calls be retry in case of timeout
  // // or connection failure
  // Requester.request(config, customError)
  //   .then(response => {

  //     // ----------------------------------------------
  //     var s = Uint8Array();
  //     // ----------------------------------------------

  //     // It's common practice to store the desired value at the top-level
  //     // result key. This allows different adapters to be compatible with
  //     // one another.
  //     response.data.result = Requester.validateResultNumber(response.data, [tsyms])
  //     callback(response.status, Requester.success(jobRunID, response))
  //   })
  //   .catch(error => {
  //     callback(500, Requester.errored(jobRunID, error))
  //   })
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
