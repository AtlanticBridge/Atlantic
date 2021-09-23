import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChainlinkContractsComponent } from './pages/chainlink-contracts/chainlink-contracts.component';
import { EthStablecoinComponent } from './pages/eth-stablecoin/eth-stablecoin.component';
import { HomeComponent } from './pages/home/home.component';
import { WalletInformationComponent } from './pages/wallet-information/wallet-information.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: {
      title: 'Home Component '
    }
  },
  {
    path: 'walletinfo',
    component: WalletInformationComponent,
    data: {
      title: 'Wallet Information Component'
    }
  },
  {
    path: 'chainlink',
    component: ChainlinkContractsComponent,
    data: {
      title: 'ChainLink Contract Component'
    }
  },
  {
    path: 'ethstablecoin',
    component: EthStablecoinComponent,
    data: {
      title: 'Ethereum Mintable Stablecoin Component'
    }
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
