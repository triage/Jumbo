const Studio = artifacts.require("./Studio.sol");
const Individual = artifacts.require("./Individual.sol");
const Authentication = artifacts.require("./Authentication.sol");
const Reseller = artifacts.require("./Reseller.sol");

let authentication
let individual
let studio
let reseller

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
    return Reseller.deployed()
  }).then(deployed => {
    reseller = deployed.address
    return Individual.at(individual).setAuthentication(authentication)
  }).then(() => {
    return Studio.at(studio).setAuthentication(authentication)
  }).then(() => {
    return Reseller.at(reseller).setAuthentication(authentication)
  }).then(() => {
    return Authentication.at(authentication).setIndividual(individual)
  }).then(() => {
    return Authentication.at(authentication).setStudio(studio)
  }).then(() => {
    return Authentication.at(authentication).setReseller(reseller)
  })
};
