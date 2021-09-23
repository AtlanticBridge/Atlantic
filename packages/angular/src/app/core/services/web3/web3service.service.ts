import { Injectable } from '@angular/core';

declare let require: any;
declare let window: any;
const Web3 = require('web3');
const tokenABI = require('../../../../../../build/contracts/MetaCoin.json');
const contract = require('@truffle/contract');

const provider = new Web3.providers.HttpProvider("http://127.0.0.1:7545");


@Injectable({
  providedIn: 'root'
})
export class Web3serviceService {

  // === LOCAL VARIABLES ===
  private web3Provider: any;
  accounts: any;
  web3: any;
  // MetaContract: any;

  constructor() {

    if (typeof window.web3 === 'undefined' || (typeof window.ethereum !== 'undefined')) {
      console.log('MetaMask is installed!!')
      // this.web3Provider = window.ethereum || window.web3;
      this.web3Provider = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:7545'));
      window.web3 = new Web3(this.web3Provider);
      console.log('=====================================')
      console.log(this.web3Provider)
    } else {
      this.web3Provider = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:7545'));
      // if you are using linux or ganche cli maybe the port is  http://localhost:8545
      //   Web3.providers.HttpProvider.prototype.sendAsync = Web3.providers.HttpProvider.prototype.send;
      //   this.web3Provider = new Web3(new Web3.providers.HttpProvider('https://rinkeby.infura.io/v3/Private_key'));
      // Change with your credentials as the test network and private key in infura.io
    }

    this.web3 = this.web3Provider;

  }

  async getAccounts() {
    return new Promise((resolve, reject) => {
      // this.web3.request({ method: 'eth_requestAccounts' }).then((acc) => {
      this.web3Provider.eth.getAccounts().then((acc) => {
        return resolve(acc)
      }).catch((err) => {
        return reject(err)
      })
    });
  }

  getEtherBalance(account: string) {    

    return new Promise( function ethBalance (resolve, reject) {
      let deployed;

      const MetaContract = contract(tokenABI);

      MetaContract.setProvider(provider);

      MetaContract.deployed().then(function resolver(instance) {
        deployed = instance;
        return instance.getBalanceInEth(account)
      }).then((result) => {
        console.log(result)
        return resolve(result)
      }).catch(err => {
        reject(err);
      })
    })
  }

}
