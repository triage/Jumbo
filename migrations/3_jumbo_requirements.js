const Studio = artifacts.require("./Studio.sol");
const Class = artifacts.require("./Class.sol");
const Individual = artifacts.require("./Individual.sol");
const Reseller = artifacts.require("./Reseller.sol");

module.exports = function(deployer) {
  deployer.deploy(Studio);
  deployer.deploy(Class);
  deployer.deploy(Individual);
  deployer.deploy(Reseller);
};
