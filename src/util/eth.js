import Web3 from 'web3'
import ClassContract from 'contracts/Class.json'
import StudioContract from 'contracts/Studio.json'
import ScheduleContract from 'contracts/Schedule.json'
import AuthenticationContract from 'contracts/Authentication.json'
import ResellerContract from 'contracts/Reseller.json'
import IndividualContract from 'contracts/Individual.json'
import contract from 'truffle-contract'
import UserType from 'src/user/model/UserType'

export const addresses = {
  blank: '0x0000000000000000000000000000000000000000'
}

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

  Reseller: () => {
    const Reseller = contract(ResellerContract)
    Reseller.setProvider(eth.provider())
    return Reseller
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
      
      let authentication
      const account = {}

      eth.getDefaultAccount().then(defaultAccount => {
        account.address = defaultAccount
        return eth.Authentication().deployed()
      }).then(instance => {
        authentication = instance
        return authentication.login(eth.from())
      }).then(loggedIn => {
        if (!loggedIn) {
          reject(SigninError.unauthorized)
          return
        }
        return authentication.userType(eth.from())
      }).then(type => {
        account.type = type
        console.log(`type for ${account.address}: ${type}`)
        switch (type) {
          case UserType.studio:
            return eth.Studio().deployed()
          case UserType.individual:
            return eth.Individual().deployed()
          case UserType.reseller:
            return eth.Reseller().deployed()
          default:
            return null
        }
      }).then(deployed => {
        return deployed.name.call(account.address)
      }).then(name => {
        account.name = name
        return eth.getBalance(account.address)
      }).then(balance => {
        account.balance = balance
        fulfill(account)
      }).catch(error => {
        reject(SigninError.unauthorized)
      })
    })
  })
}
