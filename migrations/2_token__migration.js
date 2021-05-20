const PiggyContract = artifacts.require("PiggyContract");

module.exports = function (deployer) {
  deployer.deploy(PiggyContract);
};
