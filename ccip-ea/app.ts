import express from "express";
import {json} from "body-parser";
import { routes } from "./routes/routes";

import Web3 from "web3";
import { config } from "dotenv";
import { callbackEth, fulfillEth } from "./callback/eth.callback";
// import receiveMessageAbi from "./abi/ReceiveMessage.json";
import AtlanticReceiver from "../packages/angular/src/app/artifacts/abis/AtlanticReceiverV1.json"
import jsonString from "../packages/truffle/outputs/3_integration_test_callback.json"

config();
const web3BscProviderWs = new Web3(new Web3.providers.WebsocketProvider(process.env.BSC_TESTNET_MORALIS_WS as string));
const wsAtlanticReceiverContract = new web3BscProviderWs.eth.Contract(
  AtlanticReceiver.abi as any,
  jsonString.address
);

const startServer = async () => {
  const app = express();

  app.use(json());

  app.use('/', routes);

  app.listen(process.env.PORT || 8081, () => {
    console.log('Express Server Listening on PORT: ', process.env.PORT || 8081);
  });
};

// DEFINE SOME POLLING FUNCTION / SUBSCRIBE TO SOME WEBHOOK / DEFINE WHEN TO CALL CHAINLINK NODE
const init = async () => {
  wsAtlanticReceiverContract.events.FunctionExecuted()
    .on('data', (event: any) => {
      console.log('The event: ', event);
      fulfillEth(event);
      // callChainlinkNode("")
    })
    .on('changed', (changed: any) => console.log('The changed: ', changed))
    .on('error', (err: any) => console.error('The error: ', err))
    .on('connected', (str: any) => console.log(`Connected to Smart Contract | ${jsonString.address} | on Binance Smart Chain Testnet`));

    wsAtlanticReceiverContract.events.CallbackMessage()
    .on('data', (event: any) => {
      console.log('The event: ', event);
      // callbackEth(event);
      // callChainlinkNode("")
    })
    .on('changed', (changed: any) => console.log('The changed: ', changed))
    .on('error', (err: any) => console.error('The error: ', err))
    .on('connected', (str: any) => console.log(`Connected to Smart Contract | ${jsonString.address} | on Binance Smart Chain Testnet. \n//** Watching CallbackMessage **//`));
  };

init();
startServer();
