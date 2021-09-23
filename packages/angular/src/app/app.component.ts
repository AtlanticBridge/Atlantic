import { Component } from '@angular/core';

// --- FORT AWESOME ---
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

// --- SERVICES ---
import { WalletConnectService } from './core/services/wallet-connect/wallet-connect.service';

declare let require: any;
declare let window: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  // --- Local Variables ---
  title: string     = 'angular-truffle-boilerplate';
  loggedIn: boolean = false;
  ammount: any;
  account: any;
  faTimesCircle = faTimesCircle;

  constructor(
    private walletConnectService: WalletConnectService
  ) {

    // --- Check MetaMask Login ---
    this.walletConnectService.checkMetaMaskConnection();
    this.walletConnectService.isConnected$.subscribe(
      (res:any) => this.loggedIn = res)

  }


  closeFaucet() {
    alert('You closed the Faucet')
  }

}
