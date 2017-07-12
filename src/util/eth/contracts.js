import Web3 from 'web3'
import ClassContract from 'contracts/Class.json'
import StudioContract from 'contracts/Studio.json'
import ScheduleContract from 'contracts/Schedule.json'
import AuthenticationContract from 'contracts/Authentication.json'
import contract from 'truffle-contract'

if (typeof window.web3 === 'undefined') {
  debugger
  console.error("Please use a web3 browser");
}
const provider = window.web3.currentProvider

export const web3 = new Web3(provider); 
web3.eth.defaultAccount = window.web3.eth.defaultAccount;

console.log(`xxx default:${window.web3.eth.defaultAccount}`)

export const defaultAccount = window.web3.eth.defaultAccount

export const coinbase = web3.eth.coinbase
export const from = { from: defaultAccount, gas: 4700000 }

export const Class = contract(ClassContract)
Class.setProvider(provider)

export const Studio = contract(StudioContract)
Studio.setProvider(provider)

export const Schedule = contract(ScheduleContract)
Schedule.setProvider(provider)

export const Authentication = contract(AuthenticationContract)
Authentication.setProvider(provider)
