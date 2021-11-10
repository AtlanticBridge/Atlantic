import { Binance } from "./endpoint/binance";

async function createRequest(input: any, callback: { (statusCode: any, data: any): void; (statusCode: any, data: any): void; (statusCode: any, data: any): void }) {
  const binance = new Binance();
  switch (input.data.chainId) {
    case 'ethereum':
      console.log('run ethereum');
      break;
    case 'binance':
      const id = await binance.sendData(input.data);

      return callback(200, { result: id });
    default:
      throw new Error('no valid chain id');
  }
}

// This is a wrapper to allow the function to work with
// GCP Functions
exports.gcpservice = (req: { body: any }, res: { status: (arg0: any) => { (): any; new(): any; send: { (arg0: any): void; new(): any } } }) => {
  createRequest(req.body, (statusCode: any, data: any) => {
    res.status(statusCode).send(data);
  });
};

// This is a wrapper to allow the function to work with
// AWS Lambda
exports.handler = (event: any, context: any, callback: (arg0: null, arg1: any) => void) => {
  createRequest(event, (statusCode: any, data: any) => {
    callback(null, data);
  });
};

// This is a wrapper to allow the function to work with
// newer AWS Lambda implementations
exports.handlerv2 = (event: { body: string }, context: any, callback: (arg0: null, arg1: { statusCode: any; body: string; isBase64Encoded: boolean }) => void) => {
  createRequest(JSON.parse(event.body), (statusCode: any, data: any) => {
    callback(null, {
      statusCode,
      body: JSON.stringify(data),
      isBase64Encoded: false
    });
  });
};

// This allows the function to be exported for testing
// or for running in express
// module.exports.createRequest = createRequest
export { createRequest };
