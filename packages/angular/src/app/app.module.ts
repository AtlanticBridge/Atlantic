import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


// --- MODULES ---
import { AppRoutingModule }        from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule }       from '@fortawesome/angular-fontawesome';
import { MaterialModule }          from "./modules/material.module";



// --- COMPONENTS ---
import { AppComponent }                from './app.component';
import { ToolbarComponent }            from './core/components/toolbar/toolbar.component';
import { CardComponent }               from './core/components/card/card.component';
import { WalletInformationComponent }  from './pages/wallet-information/wallet-information.component';
import { ChainlinkContractsComponent } from './pages/chainlink-contracts/chainlink-contracts.component';
import { HomeComponent }               from './pages/home/home.component';
import { EthStablecoinComponent }      from './pages/eth-stablecoin/eth-stablecoin.component';
import { EthFaucetComponent }          from './core/components/eth-faucet/eth-faucet.component';




@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    CardComponent,
    WalletInformationComponent,
    ChainlinkContractsComponent,
    HomeComponent,
    EthStablecoinComponent,
    EthFaucetComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
