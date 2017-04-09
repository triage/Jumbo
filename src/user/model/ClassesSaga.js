import { put, call, takeEvery } from 'redux-saga/effects'
import ClassContract from '../../../build/contracts/Class.json'
import StudioContract from '../../../build/contracts/Studio.json'
import Web3 from 'web3'
import { CLASSES_LOAD, CLASS_LOAD, classLoad, classNameLoaded } from './ClassesActions'

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
      yield put(classLoad(classAddress))
    }
  } catch (error) {
    yield put({ type: "CLASS_CREATE_FAILED", error })
  }
}

export function* classSaga(action) {
  try {
    const classInstance = Class.at(action.address)
    const name = yield call(classInstance.name)
    yield put(classNameLoaded(action.address, name))
  } catch (error) {
    debugger
  }
}

export function* watchClassesLoad() {
  yield takeEvery(CLASSES_LOAD, classesSaga)
}

export function* watchClassLoad() {
  yield takeEvery(CLASS_LOAD, classSaga)
}


//0xf718027656f88f73aa62b725d4e2f0b962084aa9