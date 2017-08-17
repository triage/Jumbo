const Studio = artifacts.require("./Studio.sol");
const Individual = artifacts.require("./Individual.sol");
const Authentication = artifacts.require("./Authentication.sol");

let authentication
let individual
let studio

module.exports = function(deployer) {
  deployer.then(() => {
    return Authentication.deployed()
  }).then(deployed => {
    authentication = deployed.address
    return Individual.deployed()
  }).then(deployed => {
    individual = deployed.address
    return Studio.deployed()
  }).then(deployed => {
    studio = deployed.address
    return Individual.at(individual).setAuthentication(authentication)
  }).then(() => {
    return Studio.at(studio).setAuthentication(authentication)
  })
};
