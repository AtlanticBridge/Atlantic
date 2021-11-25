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
import { WalletInformationComponent }  from './pages/wallet-information/wallet-information.component';
import { ChainlinkContractsComponent } from './pages/chainlink-contracts/chainlink-contracts.component';
import { HomeComponent }               from './pages/home/home.component';
import { EthStablecoinComponent }      from './pages/eth-stablecoin/eth-stablecoin.component';
import { OverviewComponent } from './pages/overview/overview.component';
import { TheTeamComponent } from './pages/the-team/the-team.component';
import { AtlanticTokenComponent } from './pages/atlantic-token/atlantic-token.component';
import { FaqComponent } from './pages/faq/faq.component';
import { RoadmapComponent } from './pages/roadmap/roadmap.component';




@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    WalletInformationComponent,
    ChainlinkContractsComponent,
    HomeComponent,
    EthStablecoinComponent,
    OverviewComponent,
    TheTeamComponent,
    AtlanticTokenComponent,
    FaqComponent,
    RoadmapComponent
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
