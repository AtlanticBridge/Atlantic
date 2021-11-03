import express from "express";
// import request from "request";
import { mainRoutes } from "./routes/main.routes";
import { callbackEth } from "./ethereum/ethereum.callback";
import Web3 from "web3";
import { config } from "dotenv";
import receiveMessageAbi from "./abi/ReceiveMessage.json";

config();

// Define some constants
// const CHAINLINK_ACCESS_KEY = ""
// const CHAINLINK_ACCESS_SECRET = ""
// const CHAINLINK_IP = ""

// const receiveMessageAbi = require('../ccip-ea/abi/ReceiveMessage.json')
const web3BscProviderWs = new Web3(new Web3.providers.WebsocketProvider(process.env.BSC_TESTNET_MORALIS_WS as string))
const wsAtlanticReceiverContract = new web3BscProviderWs.eth.Contract(
  receiveMessageAbi.abi as any,
  '0xEaed3B434d0FFf6D6d7AA80D72a3B47dD86A3617'
)


const startServer = async () => {
  // config();


  const app = express();

  // Apply Middleware to Include Your REST API Routes
  app.use('/', mainRoutes)

  app.listen(process.env.PORT || 3002, () => {
    console.log('express server started at port: ', process.env.PORT || 3002);
  })

}



/** Function to call the chainlink node and run a job */
// function callChainlinkNode(job_id: string) {
//     var url_addon = '/v2/specs/'+ job_id + '/runs'
//     request.post({
//         headers: {'content-type' : 'application/json', 'X-Chainlink-EA-AccessKey': CHAINLINK_ACCESS_KEY,
//         'X-Chainlink-EA-Secret': CHAINLINK_ACCESS_SECRET},
//         url:     CHAINLINK_IP+url_addon,
//         body:    ""
//       }, function(error: any, response: any, body: any){
//         // updateCurrentActiveJob()
//       });
//     console.log("Job Sent")
// }

// DEFINE SOME POLLING FUNCTION / SUBSCRIBE TO SOME WEBHOOK / DEFINE WHEN TO CALL CHAINLINK NODE
const init = async () => {
  wsAtlanticReceiverContract.events.FunctionExecuted()
    .on('data', (event: any) => {
      console.log('The event: ', event)
      callbackEth(event)
      // callChainlinkNode("")
    })
    .on('changed', (changed: any) => console.log('The changed: ', changed))
    .on('error', (err: any) => console.error('The error: ', err))
    .on('connected', (str: any) => console.log('The address: ', str))
}

init();
startServer();