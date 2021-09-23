import { Injectable } from '@angular/core';
import { ethers } from 'ethers';
import { DittoEthInjectable } from '../../injectables/contract-injectables/ditto-eth.injectable';

@Injectable({
  providedIn: 'root'
})
export class DittoEthService {

  constructor(
    private dittoEthInjectable: DittoEthInjectable
  ) {
    // 42 is the Kovan Network
    // 7776 is the Truffle Network
  }

  async name(): Promise<string> {
    return await this.dittoEthInjectable.name();
  }

  async balanceOf(addrs:string): Promise<string> {
    return await this.dittoEthInjectable.addressOf(addrs);
  }

  // deposit()
  async deposit(amount:string): Promise<any> {
    let Gwei_price = '0.000000229';
    let Gwei_limit = '0.00000000000071';

    let transaction = this.dittoEthInjectable.deposit({
      value: ethers.utils.parseEther(amount),
      gasPrice: ethers.utils.parseEther(Gwei_price),
      gasLimit: ethers.utils.parseEther(Gwei_limit)
    })

    return transaction
  }


  // widthdraw()


  // balanceOf()
}
