import contract from 'truffle-contract'
import Web3 from 'web3'
import ClassContract from '../contracts/Class.json'
import StudioContract from '../contracts/Studio.json'
import ScheduleContract from '../contracts/Schedule.json'
import AuthenticationContract from '../contracts/Authentication.json'
import ResellerContract from '../contracts/Reseller.json'
import IndividualContract from '../contracts/Individual.json'
import UserType from '../user/model/UserType'

export const addresses = {
  blank: '0x0000000000000000000000000000000000000000',
}

export const SigninError = {
  unsupported: 'BROWSER UNSUPPORTED',
  anonymous: 'ANONYMOUS',
  unauthorized: 'UNAUTHORIZED',
  general: 'GENERAL',
}

const eth = {
  provider: () => (window.web3 ? window.web3.currentProvider : null),

  defaultAccount: null,

  getDefaultAccount: () => new Promise((fulfill, reject) => {
    window.web3.eth.getAccounts((error, accounts) => {
      if (error) {
        reject(SigninError.general)
      } else if (accounts.length > 0) {
        const [defaultAccount] = accounts
        fulfill(defaultAccount)
      } else {
        reject(SigninError.anonymous)
      }
    })
  }),

  web3: () => window.web3,

  getBalance: address => new Promise(fulfill => {
    eth.web3().eth.getBalance(address, (error, balance) => {
      if (error) {
        fulfill(0)
      } else {
        fulfill(balance.valueOf())
      }
    })
  }),

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

  from: () => ({ from: eth.defaultAccount, gas: 3000000 }),
}
export default eth

export const start = () => new Promise((fulfill, reject) => {
  window.addEventListener('load', () => {
    if (!window.web3) {
      reject(SigninError.unsupported)
      return
    }

    let authentication
    const account = {}
    let contractInstance

    eth.getDefaultAccount().then(defaultAccount => {
      account.address = defaultAccount
      return eth.Authentication().deployed()
    }).then(instance => {
      authentication = instance
      return authentication.login(eth.from())
    }).then(loggedIn => {
      if (!loggedIn) {
        reject(SigninError.unauthorized)
        return null
      }
      return authentication.userType(eth.from())
    })
      .then(type => {
        account.type = type
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
      })
      .then(deployed => {
        contractInstance = deployed
        return deployed.name.call(account.address)
      })
      .then(name => {
        account.name = name
        return contractInstance.contactDetails.call(account.address)
      })
      .then(contactDetails => {
        account.contactDetails = contactDetails
        return eth.getBalance(account.address)
      })
      .then(balance => {
        account.balance = balance
        fulfill(account)
      })
      .catch(() => {
        reject(SigninError.unauthorized)
      })
  })
})
