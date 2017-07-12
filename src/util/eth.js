import Web3 from 'web3'
import ClassContract from 'contracts/Class.json'
import StudioContract from 'contracts/Studio.json'
import ScheduleContract from 'contracts/Schedule.json'
import AuthenticationContract from 'contracts/Authentication.json'
import contract from 'truffle-contract'


const eth = {
  provider: () => {
    if (!window.web3) {
      console.warn(`web3 not injected`)
    }
    return window.web3 ? window.web3.currentProvider : new Web3.providers.HttpProvider('http://localhost:8545')
  },

  defaultAccount: () => {
    const defaultAccount =  window.web3 ? window.web3.eth.defaultAccount : null
    console.log(`defaultAccount:${defaultAccount}`)
    return defaultAccount
  },

  web3: () => {
    const web3 =  new Web3(eth.provider())
    web3.defaultAccount = eth.defaultAccount()
  },

  coinbase: () => {
    return eth.web3().eth.coinbase
  },

  Authentication: () => {
    const Authentication = contract(AuthenticationContract)
    Authentication.setProvider(eth.provider())
    return Authentication
  },

  Class: () => {
    const Class = contract(ClassContract)
    Class.setProvider(eth.provider())
    return Class
  },

  Studio: () => {
    const Studio = contract(StudioContract)
    Studio.setProvider(eth.provider())
    return Studio
  },

  Schedule: () => {
    const Schedule = contract(ScheduleContract)
    Schedule.setProvider(eth.provider())
    return Schedule
  },

  from: () => {
    return { from: eth.defaultAccount(), gas: 4476768 }
  }

}
export default eth

export const start = callback => {
  return new Promise((fulfill, reject) => {
    window.addEventListener('load', () => {

      const web3 = new Web3()
      web3.provider = window.web3.currentProvider

      eth.Authentication().deployed().then(authentication => {
        return authentication.login()
      }).then(loggedIn => {
        fulfill(loggedIn)
      }).catch(error => {
        reject(error)
      })
    })
  })
}
