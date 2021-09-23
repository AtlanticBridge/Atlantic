# Angular & Truffle Boilerplate

## Pre-Requisites

Node.js and npm 7+ are required.

```npm install -g ganache-cli```

```npm install -g @angular/cli``` ..not required but recommended.

```npm install -g truffle```

## Getting Started




## Angular

### Understanding the Angular Environments


### Things to Know About Angular

**First**, building a decentralized application with Angular requires the use of ```crypto``` and ```stream```
which are Node.JS build-in APIs. Angular's intent is to serve Angular applications in the browser were
these types of APIs do not exist. As such, upon the initial ```npm install```, you will not be able to
run the Angular application out of the box. 

As such, you may run into a ```Module not found: Error: Can't resolve 'crypto' in ...``` This could also 
include ```Can't resolve 'stream' in ...```. 

The problem stems from the *browser.js* file in the @angular-devkit. The solution is simple: 

    1. Open the file 
        i. ( <v11 ) node_modules/@angular-devkit/build-angular/src/angular-cli-files/models/webpack-configs/browser.js
        ii. ( v11 ) node_modules/@angular-devkit/build-angular/src/webpack/configs/browser.js
    2. Change " node: false " to " node: { crypto: true, stream: true } "


**Second**, when building and running Angular in the npm workspace, there are some necessary changes
required to ensure Angular knows (1) where the node_modules directory and packages are installed, and (2) what the root directory the Angular application are located.

These should come pre-fixed when you clone this repo, but in case you have any problems, you need to make sure that your **"$schema"** path is in the correct location, that your CSS **"styles"** have the correct 
directory path, and that your **"root"** directory is from *packages/angular*.