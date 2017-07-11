import Web3 from 'web3'
import ClassContract from 'contracts/Class.json'
import StudioContract from 'contracts/Studio.json'
import ScheduleContract from 'contracts/Schedule.json'
import AuthenticationContract from 'contracts/Authentication.json'

const provider = new Web3.providers.HttpProvider('http://localhost:8545')
const web3 = new Web3(provider)
const contract = require('truffle-contract')
const coinbase = web3.eth.coinbase
export const from = { from: coinbase, gas: 4700000 }

export const Class = contract(ClassContract)
Class.setProvider(provider)

export const Studio = contract(StudioContract)
Studio.setProvider(provider)

export const Schedule = contract(ScheduleContract)
Schedule.setProvider(provider)

export const Authentication = contract(AuthenticationContract)
Authentication.setProvider(provider)