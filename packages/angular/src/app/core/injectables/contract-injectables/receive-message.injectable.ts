import { Inject, Injectable } from "@angular/core";
import { Contract, ethers, providers } from "ethers";
import { environment } from "../../../../environments/environment";

// --- THE CONTRACT DATA ---
import * as ReceiveMessageContract from '../../../artifacts/abis/ReceiveMessage.json';
// import { MetaMaskProvider } from "../ethers/ethers.injectable";

// const provider = 

@Injectable({
    providedIn: 'root'
})
export class ReceiveMessageInjectable extends Contract {

    constructor() {
        // --- Get Network Id ---
        const networkId = Object.keys(ReceiveMessageContract.networks)[0];

        // --- Set Provider ---
        const provider = new ethers.providers.JsonRpcProvider(environment.Moralis_Bsc_Testnet_SpeedyNode)
        
        // --- Contract Address ---
        const receiveMessageAddress = ReceiveMessageContract.networks[networkId].address;    // This should come from one of the environment files.

        // --- MetaMask Signer ---
        // const signer = provider.getSigner();
        const signer = new ethers.Wallet(environment.Bsc_Testnet_PrivateKey, provider)

        // --- Ethers Contract Class Initialized Parameters ---
        super(receiveMessageAddress, ReceiveMessageContract.abi, signer);
    }
}