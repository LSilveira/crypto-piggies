const PiggyContract = artifacts.require("PiggyContract");
const PiggyMarketPlace = artifacts.require("PiggyMarketPlace");

module.exports = function (deployer) {
  deployer.deploy(PiggyMarketPlace, PiggyContract.address);
};
