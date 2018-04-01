const Reseller = artifacts.require("./Reseller.sol");

module.exports = function(deployer) {
  deployer.deploy(Reseller);
};
