import Web3 from 'web3'
import AuthenticationContract from '../../../../build/contracts/Authentication.json'

import { browserHistory } from 'react-router-dom'

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
    // Using truffle-contract we create the authentication object.
    const authentication = contract(AuthenticationContract)
    authentication.setProvider(provider)

    // Declaring this for later so we can chain functions on Authentication.
    var authenticationInstance

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
    }).then((user) => {
      dispatch(userLoggedIn({"user": user}))

      // Used a manual redirect here as opposed to a wrapper.
      // This way, once logged in a user can still access the home page.
      var currentLocation = browserHistory.getCurrentLocation()

      if ('replace' in currentLocation.query)
      {
      console.log(currentLocation)
        return browserHistory.push(decodeURIComponent(currentLocation.query.replace))
      }

      return browserHistory.push('/dashboard')
    })
  }
}
