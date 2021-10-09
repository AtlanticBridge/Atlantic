import { Inject, Injectable } from "@angular/core";
import { Contract, ethers, providers } from "ethers";

// --- THE CONTRACT DATA ---
import * as FunctionCallerV3Contract from '../../../artifacts/abis/FunctionCallerV3.json';
import { MetaMaskProvider } from "../ethers/ethers.injectable";

@Injectable({
    providedIn: 'root'
})
export class FunctionCallerV3Injectable extends Contract {

    constructor(
        @Inject(MetaMaskProvider) provider: providers.Web3Provider
    ) {
        const networkId = Object.keys(FunctionCallerV3Contract.networks)[0];

        // --- Contract Address ---
        const dittoEthAddress = FunctionCallerV3Contract.networks[networkId].address;    // This should come from one of the environment files.

        // --- MetaMask Signer ---
        const signer = provider.getSigner();

        // --- Ethers Contract Class Initialized Parameters ---
        super(dittoEthAddress, FunctionCallerV3Contract.abi, signer);
    }
}