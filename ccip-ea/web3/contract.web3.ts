import Web3 from "web3";

class Contract<T> {

    web3: Web3;
    contract: any;
    wallet: any;
    admin: any;

    constructor(provider: string, address: string, abi: any, wallet: string) {
        this.web3 = new Web3(provider);
        this.contract = new this.web3.eth.Contract(
            abi,
            address
        )
        this.admin = this.web3.eth.accounts.wallet.add(wallet);
    }


    send(params:any): string {
        return ''
    }
}

export { Contract }