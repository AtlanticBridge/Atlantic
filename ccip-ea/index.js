const { Binance } = require('./endpoint/binance')

const createRequest = async (input, callback) => {
  var binance = new Binance()

  // Get Data

  // eslint-disable-next-line no-undef
  switch (input.data.chainId) {
    case 'ethereum':
      console.log('run ethereum')
      break
    case 'binance':
      var id = await binance.sendData(input.data)

      return callback(200, { result: id })
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
