import { put, takeEvery, call } from 'redux-saga/effects'
// import ClassContract from '../../../../build/contracts/Class.json'
import ClassContract from '/build/contracts/Class.json'
import Web3 from 'web3'
const provider = new Web3.providers.HttpProvider('http://localhost:8545')
const web3 = new Web3(provider)
const contract = require('truffle-contract')

export function* createClassSaga(studio, name, description) {

  try {
    const Class = contract(ClassContract)
    Class.setProvider(provider)
    const classInstance = yield call(Class.new, studio, name, description)

  } catch (error) {
    yield put({ type: "CLASS_CREATE_FAILED", error })
  }
   // try {
   //    const data = yield call(Api.fetchUser, action.payload.url)
   //    yield put({type: "FETCH_SUCCEEDED", data})
   // } catch (error) {
   //    yield put({type: "FETCH_FAILED", error})
   // }
}


// export function signUpUser(name) {
//   return function(dispatch) {
//     // Using truffle-contract we create the authentication object.

//     const authentication = contract(AuthenticationContract)
//     authentication.setProvider(provider)

//     const studio = contract(StudioContract)
//     studio.setProvider(provider)

//     var studioInstance
//     var authenticationInstance

//     // Get current ethereum wallet.
//     var coinbase = web3.eth.coinbase;

//     studio.new(name, { from: coinbase, gas: 4700000 }).then((instance) => {
//       studioInstance = instance
//       return authentication.deployed()
//     }).catch((error) => {
//       console.log(`error creating new studio:${error}`)
//     }).then((instance) => {
//       authenticationInstance = instance
//       return authenticationInstance.signup(studioInstance.address, { from: coinbase })
//     }).catch((error) => {
//       console.log(`error registering studio:${error}`)
//     }).then((result) => {
//       if(result) {
//         dispatch(loginUser())
//       } else {
//         //todo: handle error
//       }
//     })
//   }
// }
