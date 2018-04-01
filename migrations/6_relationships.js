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
    authentication = deployed
    return Individual.deployed()
  }).then(deployed => {
    individual = deployed
    return Studio.deployed()
  }).then(deployed => {
    studio = deployed
    return Reseller.deployed()
  }).then(deployed => {
    reseller = deployed
    return individual.setAuthentication(authentication.address)
  }).then(() => {
    return studio.setAuthentication(authentication.address)
  }).then(() => {
    return reseller.setAuthentication(authentication.address)
  }).then(() => {
    return authentication.setIndividual(individual.address)
  }).then(() => {
    return authentication.setStudio(studio.address)
  }).then(() => {
    return authentication.setReseller(reseller.address)
  }).then(() => {
    return reseller.setStudio(studio.address)
  }).then(() => {
    return studio.setReseller(reseller.address)
  }).catch(error => {
    console.log(`error:${error}`)
  })
};
