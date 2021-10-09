import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReceiveMessageInjectable } from "src/app/core/injectables/contract-injectables/receive-message.injectable";
import { FunctionCallerV3Injectable } from "src/app/core/injectables/contract-injectables/function-callerV3.injectable";


// interface EthMessage {
//   id: number,
//   method: string
// }

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  message: string;
  ethMessage: string;
  messageForm: FormGroup;
  messageId: number[];
  // ethMessage: EthMessage;

  constructor(
    private receiveMessageInjectable: ReceiveMessageInjectable,
    private functionCallerV3Injectable: FunctionCallerV3Injectable,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getBscMessage(1)
    this.getEthMessage(1)

    this.messageForm = this.formBuilder.group({
      id: 1,            // uint 64
      method: '',       // string
      callback: '',     // address
      amount: 1,        // uint32
      destination: ''   // address
    })
  }

  // ** BINANCE SMART CONTRACT CALLS ** //

  async getBscMessage(_messageId: number) {
    this.message = await this.receiveMessageInjectable.getMessage(_messageId)
    // 1,w9023j09jf4,209fj4jf34,54
    // this.ethMessage.id = this.message[0].to
  }

  // ** ETHEREUM SMART CONTRACT CALLS ** //

  /**
   * Network: Kovan
   * Purpose: Receive the Message from ID on Kovan / Ethereum Smart Contract
   */
  async getEthMessage(_messageId: number) {
    this.ethMessage = await this.functionCallerV3Injectable.getMessage(_messageId)
  }

  async initializeMessage() {
    // const id = this.messageForm.controls['id']            // uint 64
    const method = this.messageForm.controls['method']        // string
    const callback = this.messageForm.controls['callback']      // address
    const amount = this.messageForm.controls['amount']        // uint32
    const destination = this.messageForm.controls['destination']   // address
    this.messageId = this.functionCallerV3Injectable.initializeMessage(method,callback,amount,destination)
  }

}
