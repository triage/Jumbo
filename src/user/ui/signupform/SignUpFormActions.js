import Web3 from 'web3'
import StudioContract from 'contracts/Studio.json'
import AuthenticationContract from 'contracts/Authentication.json'
import { loginUser } from '../loginbutton/LoginButtonActions'
import { browserHistory } from 'react-router'

const provider = new Web3.providers.HttpProvider('http://localhost:8545')
const web3 = new Web3(provider)
const contract = require('truffle-contract')

export const USER_SIGNED_UP = 'USER_SIGNED_UP'
function userSignedUp(user) {
  return {
    type: USER_SIGNED_UP,
    payload: user
  }
}

export function signUpUser(name) {
  return function(dispatch) {
    // Using truffle-contract we create the authentication object.

    const authentication = contract(AuthenticationContract)
    authentication.setProvider(provider)

    const studio = contract(StudioContract)
    studio.setProvider(provider)

    var studioInstance
    var authenticationInstance

    // Get current ethereum wallet.
    var coinbase = web3.eth.coinbase;

    studio.new(name, { from: coinbase, gas: 4700000 }).then((instance) => {
      studioInstance = instance
      return authentication.deployed()
    }).catch((error) => {
      console.log(`error creating new studio:${error}`)
    }).then((instance) => {
      authenticationInstance = instance
      return authenticationInstance.signup(studioInstance.address, { from: coinbase })
    }).catch((error) => {
      console.log(`error registering studio:${error}`)
    }).then((result) => {
      if(result) {
        dispatch(loginUser())
      } else {
        //todo: handle error
      }
    })
  }
}
