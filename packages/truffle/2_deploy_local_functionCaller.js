const FunctionCallerV3 = artifacts.require("FunctionCallerV3");

module.exports = function (deployer) {
  deployer.deploy(FunctionCallerV3, '0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae');
};