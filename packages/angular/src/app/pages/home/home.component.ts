import { Component, Injectable, OnInit } from '@angular/core';

import { FunctionCallerV3Injectable } from "../../core/injectables/contract-injectables/function-callerV3.injectable";
import { ReceiveMessageInjectable } from "../../core/injectables/contract-injectables/receive-message.injectable";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private functionCallerV3Injectable: FunctionCallerV3Injectable
  ) { }

  showInitializeMessage: boolean = true;
  showBuildParameters: boolean = false;
  showCallFunction: boolean = false;
  showSuccessCard: boolean = false;

  ngOnInit(): void {
  }

  toggleBuildParameters() {
    this.showBuildParameters = !this.showBuildParameters;
    this.showInitializeMessage = !this.showInitializeMessage;
  }

  toggleCallFunction() {
    this.showBuildParameters = !this.showBuildParameters;
    this.showCallFunction = !this.showCallFunction;
  }

  toggleSuccessCard() {;
    this.showCallFunction = !this.showCallFunction;
    this.showSuccessCard = !this.showSuccessCard;
  }

  backToStart() {
    this.showInitializeMessage = true;
    this.showBuildParameters = false;
    this.showCallFunction = false;
    this.showSuccessCard = false;
  }


  // ** BINANCE FUNCTIONS ** //


  // ** ETHEREUM FUNCTIONS ** //

}
