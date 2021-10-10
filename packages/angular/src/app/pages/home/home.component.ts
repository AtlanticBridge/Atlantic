import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { base64 } from 'ethers/lib/utils';
import { FunctionCallerV3Injectable } from "../../core/injectables/contract-injectables/function-callerV3.injectable";
import { ReceiveMessageInjectable } from "../../core/injectables/contract-injectables/receive-message.injectable";


interface EthMessage {
  id: number;
  method: string;
  callback: string;
  amount: number;
  destination: string;
}

interface BscMessage {
  id: number;
  method: string;
  callback: string;
  amount: number;
  destination: string;
}


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private functionCallerV3Injectable: FunctionCallerV3Injectable,
    private receiveMessageInjectable: ReceiveMessageInjectable,
    private formBuilder: FormBuilder
  ) {
    this.functionCallerV3Injectable.on("MessageId", (_id) => {
      this.messageIds.push(parseInt(_id, 16));
      alert(`Your messageId: ${_id}`)
      this.functionCallerV3Injectable.callFunction(+_id, "binance");
    })
  }

  showInitializeMessage: boolean = true;
  showBuildParameters: boolean = false;
  showCallFunction: boolean = false;
  showSuccessCard: boolean = false;
  showLoadingCard: boolean = false;
  showErrorCard: boolean = false;

  // ** CONTRACT VARIABLES ** //
  messageIds:  number[] = [];
  bscMessage:  string[] = [];
  ethMessage:  string[] = [];
  messageForm:   FormGroup;
  messageIdForm: FormGroup;
  ethMessageInterface: EthMessage = {
    id: null,
    method: null,
    callback: null,
    amount: null,
    destination: null
  };
  bscMessageInterface: BscMessage = {
    id: null,
    method: null,
    callback: null,
    amount: null,
    destination: null
  };

  ngOnInit(): void {
    this.messageForm = this.formBuilder.group({
      method: ['', [
        Validators.required
      ]],
      callback: ['', [
        Validators.required,
        Validators.minLength(42),
        Validators.maxLength(42)
      ]],
      amount: ['', [
        Validators.required
      ]],
      destination: ['', [
        Validators.required,
        Validators.minLength(42),
        Validators.maxLength(42)
      ]]
    })

    this.messageIdForm = this.formBuilder.group({
      id: [0, [
        Validators.required
      ]]
    })
  }

  toggleBuildParameters() {
    this.showBuildParameters = !this.showBuildParameters;
    this.showInitializeMessage = !this.showInitializeMessage;
  }

  toggleCallFunction() {
    this.showBuildParameters = !this.showBuildParameters;
    this.showCallFunction = !this.showCallFunction;
  }

  async toggleSuccessCard() {
    this.showCallFunction = !this.showCallFunction;
    this.showLoadingCard = !this.showLoadingCard;

    this.initializeMessage().then(tx => {
      console.log(tx);
      alert(`Your initialize message transaction hash: ${tx.hash}`)
      this.showLoadingCard = !this.showLoadingCard;
      this.showSuccessCard = !this.showSuccessCard;
    }).catch(error => {
      console.error(error);
      this.showLoadingCard = !this.showLoadingCard;
      this.showErrorCard = !this.showErrorCard;
    })
  }

  backToStart() {
    this.showInitializeMessage = true;
    this.showBuildParameters = false;
    this.showCallFunction = false;
    this.showSuccessCard = false;
    this.showErrorCard = false;
    this.showLoadingCard = false;
  }

  printForm() {
    const _method      = this.messageForm.controls['method'].value;
    const _callback    = this.messageForm.controls['callback'].value;
    const _amount      = this.messageForm.controls['amount'].value;
    const _destination = this.messageForm.controls['destination'].value;

    console.log('Method: ', _method);
    console.log('Callback: ', _callback);
    console.log('Amount: ', _amount);
    console.log('Destination: ', _destination);
  }

  getMessage() {
    var _messageId = this.messageIdForm.controls['id'].value;
    this.getBscMessage(+_messageId);
    this.getEthMessage(+_messageId);
  }


  // ** BINANCE FUNCTIONS ** //
  private async getBscMessage(_messageId: number) {
    this.bscMessage = await this.receiveMessageInjectable.getMessage(_messageId);
    this.bscMessageInterface.amount = parseInt(this.bscMessage[0], 16);
    this.bscMessageInterface.callback = this.bscMessage[1];
    this.bscMessageInterface.destination = this.bscMessage[2];
    this.bscMessageInterface.id = parseInt(this.bscMessage[3], 16);
    this.bscMessageInterface.method = this.bscMessage[4];
    console.log('From Binance: ', this.bscMessage);
  }


  // ** ETHEREUM FUNCTIONS ** //
  private async getEthMessage(_messageId: number) {
    this.ethMessage = await this.functionCallerV3Injectable.getMessage(_messageId);
    console.log('GET THE BINANCE MESSAGE: ', this.bscMessage)
    this.ethMessageInterface.amount = parseInt(this.ethMessage[0], 16);
    this.ethMessageInterface.callback = this.ethMessage[1];
    this.ethMessageInterface.destination = this.ethMessage[2];
    this.ethMessageInterface.id = parseInt(this.ethMessage[3], 16);
    this.ethMessageInterface.method = this.ethMessage[4];
    console.log('From Ethereum: ', this.ethMessage);
  }

  private async initializeMessage() {
    const _method      = this.messageForm.controls['method'].value;
    const _callback    = this.messageForm.controls['callback'].value;
    const _amount      = this.messageForm.controls['amount'].value;
    const _destination = this.messageForm.controls['destination'].value;

    const tx = await this.functionCallerV3Injectable.initializeMessage(_method, _callback, +_amount, _destination);

    console.log('Method: ', _method);
    console.log('Callback: ', _callback);
    console.log('Amount: ', _amount);
    console.log('Destination: ', _destination);

    return tx
  }
}
