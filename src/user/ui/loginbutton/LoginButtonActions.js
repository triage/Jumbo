import Web3 from 'web3'
import AuthenticationContract from '../../../../build/contracts/Authentication.json'
import StudioContract from '../../../../build/contracts/Studio.json'

import { browserHistory } from 'react-router'

const provider = new Web3.providers.HttpProvider('http://localhost:8545')
const web3 = new Web3(provider)
const contract = require('truffle-contract')

export const USER_LOGGED_IN = 'USER_LOGGED_IN'
export function userLoggedIn(user) {
  return {
    type: USER_LOGGED_IN,
    payload: user
  }
}

export function loginUser() {
  return function(dispatch) {
    debugger
    // Using truffle-contract we create the authentication object.
    const authentication = contract(AuthenticationContract)
    authentication.setProvider(provider)

    // Declaring this for later so we can chain functions on Authentication.
    var authenticationInstance

    const Studio = web3.eth.contract(StudioContract.abi)

    debugger
    // Get current ethereum wallet.
    var coinbase = web3.eth.coinbase;

    authentication.deployed().then((instance) => {
      authenticationInstance = instance

      // Attempt to login user.
      return authenticationInstance.login({ from: coinbase })
    }).catch((result) => {
        // If error, go to signup page.
        console.log('Wallet ' + coinbase + ' does not have an account!')

        return browserHistory.push('/signup')
    }).then((result) => {
      debugger
       return Studio.at(result)
    }).then((studio) => {
        // If no error, login user.
        debugger
      dispatch(userLoggedIn({"user": studio}))

      // Used a manual redirect here as opposed to a wrapper.
      // This way, once logged in a user can still access the home page.
      var currentLocation = browserHistory.getCurrentLocation()

      if ('redirect' in currentLocation.query)
      {
        return browserHistory.push(decodeURIComponent(currentLocation.query.redirect))
      }

      return browserHistory.push('/dashboard')
    })
  }
}
