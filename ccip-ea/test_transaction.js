const Web3 = require('web3');
require('dotenv').config()

const receiveMessageFile = require("./abi/ReceiveMessage.json");
// const { BSC_TESTNET_PRIVATE_KEY, BSC_TESTNET_PRIVATE_KEY } = process.env;
const web3Bsc = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545');
const bridgeBsc = new web3Bsc.eth.Contract(
  receiveMessageFile.abi,
  '0xEaed3B434d0FFf6D6d7AA80D72a3B47dD86A3617'
);
const { address: admin } = web3Bsc.eth.accounts.wallet.add(process.env.BSC_TESTNET_PRIVATE_KEY);


const init = async () => {
  const options = {
    from: "0x57F645660bCf2EE76AC570dEe6772758B410c10F",
    gas: 1000000,
    gasPrice: web3Bsc.utils.toWei('20', 'gwei').toString()
  }
    const tx = await bridgeBsc.methods.receiveFromRemoteChain("executeFunction","0x86577a2EB86f38d63bcd2B20AfFFa843824D5BFc",24,"0xEaed3B434d0FFf6D6d7AA80D72a3B47dD86A3617",1).send(options)
    console.log(tx)
}

init()