import { config } from "dotenv";
import Web3 from "web3";
// We want to import the ethereum address to transmit the message back
import AtlanticCallerAbi from "../../packages/angular/src/app/artifacts/abis/AtlanticCallerV1.json";
import AtlanticCallerJson from "../../packages/truffle/outputs/6_bsc-testnet_ccip.json"
// import AtlanticReceiverAbi from "../../packages/angular/src/app/artifacts/abis/AtlanticReceiverV1.json";
// import AtlanticReceiverJson from "../../packages/truffle/outputs/3_integration_test_callback.json"
config();

function fulfillEth(event: any) {
    const method = event.returnValues._method;
    const callback = event.returnValues._callback;
    const amount = event.returnValues._amount;
    const destination = event.returnValues._destination;
    console.log(method, callback, amount, destination)

    // const web3Kovan = new Web3(process.env.KOVAN_HTTP_INFURA as string);
    // const AtlanticCallerContract = new web3Kovan.eth.Contract(
    //     AtlanticCallerAbi.abi as any,
    //     AtlanticCallerJson.address
    // );
    // console.log('The results (_method): ', event.returnValues._method);
    // const { address: admin } = web3Kovan.eth.accounts.wallet.add(process.env.KOVAN_PRIVATE_KEY as string);
    // /**
    //  * We want to take the event parameter information (bytes) and pass that back to ethereum.
    //  * The bytes information should be decoded in Ethereum.
    //  */

    // // Get data from event.
    // const tx = AtlanticCallerContract.methods.sendCallback(message, capacity, messageId)
    // const [gasPrice, gas] = await Promise.all([
    //     web3Kovan.eth.getGasPrice(),
    //     tx.estimateGas({ from: admin })
    // ])
    // const data = tx.encodeABI()
    // const txData = {
    //     from: admin,
    //     to: AtlanticCallerContract.options.address,
    //     data,
    //     gasPrice,
    //     gas
    // }
    // const receipt = await web3Kovan.eth.sendTransaction(txData)
    // console.log(`Transaction hash: ${receipt.transactionHash}`)
}

async function callbackEth(event: any) {
    
    // Web3 Setup -- This should be moved into an abstract class type
    const web3Kovan = new Web3(process.env.KOVAN_HTTP_INFURA as string);
    const AtlanticCallerContract = new web3Kovan.eth.Contract(
        AtlanticCallerAbi.abi as any,
        AtlanticCallerJson.address
    );
    console.log('The results (_method): ', event.returnValues._method);
    const { address: admin } = web3Kovan.eth.accounts.wallet.add(process.env.KOVAN_PRIVATE_KEY as string);
    // --- Message Info ---
    const message = event.returnValues.success;      // Bytes data
    const capacity = event.returnValues.returnD;  // Capacity - Should be the size of the bytes data
    const messageId = event.returnValues._amount;      // The Message ID of the original request.
    /**
     * We want to take the event parameter information (bytes) and pass that back to ethereum.
     * The bytes information should be decoded in Ethereum.
     */

    // Get data from event.
    const tx = AtlanticCallerContract.methods.sendCallback(message, capacity, messageId)
    const [gasPrice, gas] = await Promise.all([
        web3Kovan.eth.getGasPrice(),
        tx.estimateGas({ from: admin })
    ])
    const data = tx.encodeABI()
    const txData = {
        from: admin,
        to: AtlanticCallerContract.options.address,
        data,
        gasPrice,
        gas
    }
    const receipt = await web3Kovan.eth.sendTransaction(txData)
    console.log(`Transaction hash: ${receipt.transactionHash}`)
}

export { callbackEth, fulfillEth };


/**
 * --- Only Show This at Chainlink Hackathon ---
 * USER CONTRACT <=> ATLANTIC CONTRACT (Blockchain X) <==> BRIDGE <==> ATLANTIC CONTRACT (Blockchain Y) <==> USER CONTRACT
 *
 * Third Party => own Messages => charge small fee other users use Message
 *
 * Road Map
 * [1] Messages Market
 * [2] Block Explorer for Messages
 * [3] Charge goes to Message owners
 * [4] Data Analytics Platform <==> The Graph
 *
 * Streams of Revenue
 * [1] Message Creating Fee
 * [2] Building out Atlantic Products on Top of Message Protocol
 *
 * NOTES:
 * [1] Extract bytes parameter information
 * [2] Message Market
 * [2a] Needs a place to trade messages
 * [3] NFT - own royality share of that Message.
 * [4] Add flag on Message for *private* or *public*
 * [5] How could someone "attack" the message / message protocol.
 *
 * IDEAS:
 * [1] Private Messages for Message Owners
 * [2] Smart Contract Audit
 * [3] Token Sale before Launch
 * [4] Deploy Contracts?
 *
 */