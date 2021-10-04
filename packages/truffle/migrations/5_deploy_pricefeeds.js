const PricefeedsKovan = artifacts.require("chainlink/pricefeeds/PricefeedsKovan")


module.exports = async function(deployer, network, [defaultAccount]) {
  // deployer.deploy(PricefeedsKovan);

  // We want to store the deployed contract address
  // into the appropirate Angular environment 
  // file.
  try {
    await deployer.deploy(PricefeedsKovan, { from: defaultAccount });
  } catch (err) {
    console.error(err);
  }

};