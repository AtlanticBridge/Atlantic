import { config } from "dotenv";
// We want to import the ethereum address to transmit the message back

config();

function callbackEth(event: any) {
    console.log('This is the callback eth function...', process.env.KOVAN_PRIVATE_KEY);

    /**
     * We want to take the event parameter information (bytes) and pass that back to ethereum.
     * The bytes information should be decoded in Ethereum.
     */
}

export { callbackEth };