import Web3 from 'web3'
import ClassContract from 'contracts/Class.json'
import StudioContract from 'contracts/Studio.json'
import ScheduleContract from 'contracts/Schedule.json'
import AuthenticationContract from 'contracts/Authentication.json'
import IndividualContract from 'contracts/Individual.json'
import contract from 'truffle-contract'
import UserType from 'src/user/model/UserType'

export const SigninError = {
  unsupported: 'BROWSER UNSUPPORTED',
  anonymous: 'ANONYMOUS',
  unauthorized: 'UNAUTHORIZED',
  general: 'GENERAL'
}

const eth = {
  provider: () => {
    if (!window.web3) {
      console.warn(`web3 not injected`)
    }
    return window.web3 ? window.web3.currentProvider : new Web3.providers.HttpProvider('http://localhost:8545')
  },

  defaultAccount: null,

  getDefaultAccount: () => {
    return new Promise((fulfill, reject) => {
      window.web3.eth.getAccounts((error, accounts) => {
        if (error) {
          reject(SigninError.general)
        } else {
          if (accounts.length > 0) {
            eth.defaultAccount = accounts[0]
            fulfill(accounts[0])
          } else {
            reject(SigninError.anonymous)
          }
        }
      })
    })
  },

  web3: () => {
    return window.web3
  },

  getBalance: address => {
    return new Promise((fulfill, reject) => {
      eth.web3().eth.getBalance(address, (error, balance) => {
        if (error) {
          fulfill(0)
        } else {
          fulfill(balance.valueOf())
        }
      })
    })
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

  Individual: () => {
    const Individual = contract(IndividualContract)
    Individual.setProvider(eth.provider())
    return Individual
  },

  Schedule: () => {
    const Schedule = contract(ScheduleContract)
    Schedule.setProvider(eth.provider())
    return Schedule
  },

  from: () => {
    return { from: eth.defaultAccount, gas: 4476768 }
  }
}
export default eth

export const start = callback => {
  return new Promise((fulfill, reject) => {
    window.addEventListener('load', () => {
      if (!window.web3) {
        reject(SigninError.unsupported)
        return
      }
      
      let userAddress
      let authentication

      eth.getDefaultAccount().then(account => {
        return eth.Authentication().deployed()
      }).then(instance => {
        authentication = instance
        return authentication.login()
      }).then(address => {
        if (parseInt(address, 16) === 0) {
          reject(SigninError.unauthorized)
          return
        }
        userAddress = address
        return authentication.userType()
      }).then(type => {
        console.log(`type for ${userAddress}: ${type}`)
        const entity = (type === UserType.studio) ? eth.Studio() : eth.Individual()
        const user = entity.at(userAddress)
        user.name.call().then(name => {
          fulfill({
            name,
            type: type,
            address: userAddress
          })
        })
      }).catch(error => {
        reject(error)
      })
    })
  })
}
