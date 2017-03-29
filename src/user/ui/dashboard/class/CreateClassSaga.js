import { put, takeEvery, call } from 'redux-saga/effects'
import ClassContract from '../../../../../build/contracts/Class.json'
// import StudioContract from '../../../../../build/contracts/Studio.json'
import Web3 from 'web3'
import { CLASS_CREATE, classCreated } from './CreateClassActions'

const provider = new Web3.providers.HttpProvider('http://localhost:8545')
const web3 = new Web3(provider)
const contract = require('truffle-contract')

const Class = contract(ClassContract)
Class.setProvider(provider)

export function* createClassSaga(action) {

  const coinbase = web3.eth.coinbase;

  try {
    const classInstance = yield call(Class.new, action.studio, action.name, action.description, { from: coinbase, gas: 4700000 })
    yield put(classCreated(classInstance.address))
  } catch (error) {
    console.log(error)
    debugger
    yield put({ type: "CLASS_CREATE_FAILED", error })
  }
}

export function* watchCreateClass() {
  yield takeEvery(CLASS_CREATE, createClassSaga)
}
