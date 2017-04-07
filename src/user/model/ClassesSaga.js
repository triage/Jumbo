import { put, takeEvery, apply } from 'redux-saga/effects'
import ClassContract from '../../../build/contracts/Class.json'
import StudioContract from '../../../build/contracts/Studio.json'
import Web3 from 'web3'
import { CLASSES_LOAD } from './ClassesActions'

const provider = new Web3.providers.HttpProvider('http://localhost:8545')
// const web3 = new Web3(provider)
const contract = require('truffle-contract')

const Class = contract(ClassContract)
Class.setProvider(provider)

const Studio = contract(StudioContract)
Studio.setProvider(provider)

export function* studioSaga(action) {
  try {
    debugger
    const studioInstance = Studio.at(action.studio)
    const classes = yield apply(studioInstance, studioInstance.classes)
    debugger

  } catch (error) {
    console.log(error)
    yield put({ type: "CLASS_CREATE_FAILED", error })
  }
}

export function* watchClassesLoad() {
  yield takeEvery(CLASSES_LOAD, studioSaga)
}
