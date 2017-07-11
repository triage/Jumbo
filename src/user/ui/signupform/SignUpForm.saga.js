import { apply, call, takeEvery } from 'redux-saga/effects'
import Web3 from 'web3'
import StudioContract from 'contracts/Studio.json'
import AuthenticationContract from 'contracts/Authentication.json'
import { USER_SIGNUP } from './SignUpFormActions'

const provider = new Web3.providers.HttpProvider('http://localhost:8545')
const web3 = new Web3(provider)
const contract = require('truffle-contract')

const coinbase = web3.eth.coinbase;
const gas = 4700000
const from = { from: coinbase, gas }
const Authentication = contract(AuthenticationContract)
Authentication.setProvider(provider)

const Studio = contract(StudioContract)
Studio.setProvider(provider)

function* doUserSignup(action) {
  try {
    const {
      name,
      history
    } = action

    const studio = yield apply(Studio, Studio.new, [name, from])
    const authentication = yield call(Authentication.deployed)
    yield apply(authentication, authentication.signup, [studio.address, from])
    yield apply(authentication, authentication.login, [coinbase, from])
    history.push('/dashboard')
  } catch (error) {
    console.log(error)
    history.push('/signup')
  }
}

export function* watchUserSignup() {
  yield takeEvery(USER_SIGNUP, doUserSignup)
}