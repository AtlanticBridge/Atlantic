require("dotenv").config()
const HDWalletProvider = require("@truffle/hdwallet-provider")


module.exports = {
  // Uncommenting the defaults below 
  // provides for an easier quick-start with Ganache.
  // You can also follow this format for other networks;
  // see <http://truffleframework.com/docs/advanced/configuration>
  // for more details on how to specify configuration options!
  //
  networks: {
    ganache: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*",
      websockets: true
    },
    develop: {
      host: "127.0.0.1",
      port: 9545,
      network_id: "*"
    },
    kovan: {
      provider: function() {
        // Can replace the Private Key with either a MNEMONIC or list of [ Private Key #1, Private Key #2 ].
        return new HDWalletProvider(process.env.KOVAN_PRIVATE_KEY, process.env.KOVAN_HTTP_URL)
     },
     network_id: 42,
     gasPrice: 20000000000, // 20 GWEI
     gas: 3716887,          // gas limit, set any number you want,
     skipDryRun: true
   }
  },
  // contracts_directory: './contracts',
  contracts_build_directory: './client/src/app/artifacts/abis',
  // Set default mocha options here, use special reporters etc.
  mocha: {
    timeout: 100000,
    useColors: true
  },
  compilers: {
    solc: {
      version: "0.7.6",                                     // Fetch exact version from solc-bin (default: truffle's version)
      docker: false,                                        // Use "0.5.1" you've installed locally with docker (default: false)
      settings: {                                           // See the solidity docs for advice about optimization and evmVersion
       optimizer: {
         enabled: false,
         runs: 200
       },
       evmVersion: "byzantium"
      }
    },
  },
  //
};
