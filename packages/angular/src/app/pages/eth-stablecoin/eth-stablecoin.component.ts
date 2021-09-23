import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DittoEthInjectable } from 'src/app/core/injectables/contract-injectables/ditto-eth.injectable';

@Component({
  selector: 'app-eth-stablecoin',
  templateUrl: './eth-stablecoin.component.html',
  styleUrls: ['./eth-stablecoin.component.scss']
})
export class EthStablecoinComponent implements OnInit {

  contractName: string;
  balanceOf: string;
  balanceOfForm: FormGroup;
  sendTokensForm: FormGroup;

  constructor(
    private dittoEthInjectable: DittoEthInjectable,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.balanceOfForm = this.formBuilder.group({
      balanceOfAddress: ['', [
        Validators.required,
        Validators.minLength(42),
        Validators.maxLength(42)
      ]]
    })
    
    // Get the Contract name
    this._getContractName();
    
  }

  async getBalanceOf() {
    this.balanceOf = await this.dittoEthInjectable.balanceOf(this.balanceOfForm.controls['balanceOfAddress'].value);
  }

  private async _getContractName() {
    this.contractName = await this.dittoEthInjectable.name();
  }

}
