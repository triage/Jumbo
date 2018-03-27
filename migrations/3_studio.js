const Studio = artifacts.require("./Studio.sol");

module.exports = function(deployer) {
  deployer.deploy(Studio);
};
