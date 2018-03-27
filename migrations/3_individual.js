const Individual = artifacts.require("./Individual.sol");

module.exports = function(deployer) {
  deployer.deploy(Individual);
};
