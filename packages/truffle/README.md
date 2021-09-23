# Angular Truffle Boilerplate Project
This boilerplate project will get you up and running with smart contract (Truffle) and client-side (Angular) developement.

Here are some key features that this box includes:

    - Truffle Framework (v5.1.67)
    - Angular (v11.2.1)
    - Chainlink
    - The Graph

## Quick Start

### Prerequisites 

```
npm install -g truffle
npm install -g @angular/cli
npm install -g ganache-cli
```

Angular unfortunately has problems with both stream and crypto running in the browser. The fix is simple and you are likely to run into this issue. If you do, please check out the Potential Issues section to resolve.

### Install Packages

The first thing is to install the client node packages for both the Truffle side and Client side.

```
npm install
cd client
npm install
```

### Deploy Smart Contracts

Next, we need to deploy the smart contracts. Depending on the environment you deploy to (Kovan, Ganache, etc.),
the Angular client will automatically determine the source of the deployed smart contract.

Note that if you try to run the client before compiling and deploying the smart contracts, Angular will not compile fully.

```
truffle migrate --network development .OR. npm run deploy:dev
```


## Running Different Environments

### Development

Run `npm run dev` to run the development environment.

### Kovan

Run `npm run kovan` to run the development environment that contains the kovan provider and kovan key information.


## Potential Issues

You may run into a ```Module not found: Error: Can't resolve 'crypto' in ...``` This could also include ```Can't resolve 'stream' in ...```. 

The problem stems from the *browser.js* file in the @angular-devkit. The solution is simple: 

    1. Open the file 
        i. ( <v11 ) node_modules/@angular-devkit/build-angular/src/angular-cli-files/models/webpack-configs/browser.js
        ii. ( v11 ) node_modules/@angular-devkit/build-angular/src/webpack/configs/browser.js
    2. Change " node: false " to " node: { crypto: true, stream: true } "

### VS Code Settings

If you are using VS Code, you may need to setup your environment to use Juan Blanco's *solidity* extension. Follow his steps to ensure your **local** and **global** solidity compiler versions coincide with the selected compiler version
in the actual smart contracts.