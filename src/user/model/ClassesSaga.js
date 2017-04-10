import { put, call, takeEvery } from 'redux-saga/effects'
import ClassContract from '../../../build/contracts/Class.json'
import StudioContract from '../../../build/contracts/Studio.json'
import Web3 from 'web3'
import { CLASSES_LOAD, classLoaded } from './ClassesActions'

const provider = new Web3.providers.HttpProvider('http://localhost:8545')
const contract = require('truffle-contract')

const Class = contract(ClassContract)
Class.setProvider(provider)

const Studio = contract(StudioContract)
Studio.setProvider(provider)

export function* classesSaga(action) {

  try {
    const studioInstance = Studio.at(action.address)
    const classesCount = yield call(studioInstance.classesCount.call)
    for(let classIndex = 0; classIndex < classesCount.toNumber(); classIndex++) {
      const classAddress = yield call(studioInstance.classAtIndex.call, classIndex)
      const classInstance = Class.at(classAddress)
      const name = yield call(classInstance.name.call)
      const description = yield call(classInstance.description.call)
      const classObject = {address: classAddress, name, description}
      yield put(classLoaded(classObject))
    }
  } catch (error) {
    yield put({ type: "CLASS_CREATE_FAILED", error })
  }
}

export function* watchClassesLoad() {
  yield takeEvery(CLASSES_LOAD, classesSaga)
}
