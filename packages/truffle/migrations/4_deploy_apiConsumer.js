const DittoEth = artifacts.require("chainlink/apiConsumer")

module.exports = function(deployer) {
  deployer.deploy(DittoEth);

  // We want to store the deployed contract address
  // into the appropirate Angular environment 
  // file.
};