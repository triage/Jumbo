const Studio = artifacts.require("./Studio.sol")
const Class = artifacts.require("./Class.sol")
const Schedule = artifacts.require("./Schedule.sol")
const Individual = artifacts.require("./Individual.sol")
const Authentication = artifacts.require("./Authentication.sol")
const Reseller = artifacts.require("./Reseller.sol")

let individual
let studio
let reseller
const asspass = { from: "0x0B49aB1C4Ae05e89c74C762653a9518e72CD6636" }
const eric = { from: "0x84B6430474bBcEd2E7DEEC997eb8Be12620832C5" }
const barrys = { from: "0x527a21E88F3B5859751f2F1f5CC6D2890e5c8675" }
const legsAss = {}

module.exports = function(deployer) {
  deployer.then(() => {
    return Individual.deployed()
  }).then(deployed => {
    individual = deployed
    return Studio.deployed()
  }).then(deployed => {
    studio = deployed
    return Reseller.deployed()
  }).then(deployed => {
    reseller = deployed
    return reseller.signup("Asspass", { from: asspass.from })
  }).then(() => {
    return studio.signup("Barrys", { from: barrys.from })
  }).then(() => {
    return individual.signup("Eric", { from: eric.from })
  }).then(() => {
    return Class.new("Legs & Ass", "Booty", { from: barrys.from })
  }).then(instance => {
    legsAss.instance = instance
    return studio.addReseller(asspass.from, { from: barrys.from })
  })
};
