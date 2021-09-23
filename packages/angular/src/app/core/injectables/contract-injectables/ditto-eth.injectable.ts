import { Inject, Injectable } from "@angular/core";
import { Contract, ethers, providers } from "ethers";

// --- THE CONTRACT DATA ---
import * as DittoEthContract from '../../../artifacts/abis/DittoEth.json';
import { MetaMaskProvider } from "../ethers/ethers.injectable";

@Injectable({
    providedIn: 'root'
})
export class DittoEthInjectable extends Contract {

    constructor(
        @Inject(MetaMaskProvider) provider: providers.Web3Provider
    ) {
        const networkId = Object.keys(DittoEthContract.networks)[0];
        // console.log('=======================================');
        // console.log(DittoEthContract.networks['5777'].address);
        // console.log(Object.keys(DittoEthContract.networks)[0]);
        // console.log('=======================================');

        // Get the network key to determine what the 

        // --- Contract Address ---
        const dittoEthAddress = DittoEthContract.networks[networkId].address;    // This should come from one of the environment files.

        // --- MetaMask Signer ---
        const signer = provider.getSigner();

        // --- Ethers Contract Class Initialized Parameters ---
        super(dittoEthAddress, DittoEthContract.abi, signer);
    }
}