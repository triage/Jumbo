import Web3 from 'web3'
import AuthenticationContract from 'contracts/Authentication.json'
import contract from 'truffle-contract'

export const start = callback => {
  return new Promise((fulfill, reject) => {
    window.addEventListener('load', () => {

      const web3 = new Web3()
      web3.provider = window.web3.currentProvider

      const Authentication = contract(AuthenticationContract)
      Authentication.setProvider(window.web3.currentProvider)
      const authentication = Authentication.deployed()
      authentication.login().then(() => {
        fulfill(authentication)
      }).catch(error => {
        reject(error)
      })
    })
  })
}
