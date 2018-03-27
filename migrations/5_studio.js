const Studio = artifacts.require("./Studio.sol");
const Array = artifacts.require("./Array.sol");
const ClassFactory = artifacts.require("./ClassFactory.sol");
const ScheduleFactory = artifacts.require("./ScheduleFactory.sol");

module.exports = function(deployer) {
  deployer.deploy(Array);
  deployer.link(Array, Studio);

  deployer.deploy(ClassFactory);
  deployer.link(ClassFactory, Studio);

  deployer.deploy(ScheduleFactory);
  deployer.link(ScheduleFactory, Studio);
  
  deployer.deploy(Studio);
};
