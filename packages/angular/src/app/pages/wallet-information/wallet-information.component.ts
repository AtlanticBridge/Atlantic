import { Component, OnInit } from '@angular/core';
import { providers, utils } from "ethers";
import { environment } from "../../../environments/environment";

@Component({
  selector: 'app-wallet-information',
  templateUrl: './wallet-information.component.html',
  styleUrls: ['./wallet-information.component.scss']
})
export class WalletInformationComponent implements OnInit {

  constructor() {
    // var wsProvider = new providers.WebSocketProvider(environment.Ws_Moralis_Bsc_Testnet)
    var filter = {
      address: '0xEaed3B434d0FFf6D6d7AA80D72a3B47dD86A3617',
      topics: [
        utils.id("FunctionExecuted(string,address,uint32,address)")
      ]
    }

    // wsProvider.on(filter, (event) => {
    //   console.log(event)
    // })
  }

  ngOnInit(): void {
  }

}
