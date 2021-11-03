import { config } from "dotenv";
// We want to import the ethereum address to transmit the message back

config();

function callbackEth(event: any) {
    console.log('This is the callback eth function...', process.env.KOVAN_PRIVATE_KEY)
}

export { callbackEth }