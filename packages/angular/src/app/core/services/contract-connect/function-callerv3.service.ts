import { Injectable } from '@angular/core';
import { ethers } from 'ethers';
import { FunctionCallerV3Injectable } from '../../injectables/contract-injectables/function-callerV3.injectable';

@Injectable({
  providedIn: 'root'
})
export class FunctionCallerV3Service {

  constructor(
    private contractInjectable: FunctionCallerV3Injectable
  ) {
    // 42 is the Kovan Network
    // 7776 is the Truffle Network 6A5ACD
  }

  async testCcip(): Promise<string> {
    var jobId = "36e66178f36e4117b77cb5fa8c1f3669";

    let Gwei_price = '0.000000229';
    let Gwei_limit = '0.00000000000071';
    return await this.contractInjectable.testCcip(jobId, {
      gasPrice: ethers.utils.parseEther(Gwei_price),
      gasLimit: ethers.utils.parseEther(Gwei_limit)
    });
  }

  async name(): Promise<string> {
    return await this.contractInjectable.name();
  }

  async balanceOf(addrs:string): Promise<string> {
    return await this.contractInjectable.addressOf(addrs);
  }

  // deposit()
  async deposit(amount:string): Promise<any> {
    let Gwei_price = '0.000000229';
    let Gwei_limit = '0.00000000000071';

    let transaction = this.contractInjectable.deposit({
      value: ethers.utils.parseEther(amount),
      gasPrice: ethers.utils.parseEther(Gwei_price),
      gasLimit: ethers.utils.parseEther(Gwei_limit)
    })

    return transaction
  }


  // widthdraw()


  // balanceOf()
}
