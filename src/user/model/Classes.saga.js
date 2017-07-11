import { put, call, takeEvery } from 'redux-saga/effects'
import ClassContract from '../../../build/contracts/Class.json'
import StudioContract from '../../../build/contracts/Studio.json'
import Web3 from 'web3'
import { CLASSES_LOAD, classesLoaded } from './ClassesActions'

const provider = new Web3.providers.HttpProvider('http://localhost:8545')
const contract = require('truffle-contract')

const Class = contract(ClassContract)
Class.setProvider(provider)

const Studio = contract(StudioContract)
Studio.setProvider(provider)

export function* doClassesLoad(action) {
  try {
    const studio = Studio.at(action.studio)

    const classesCount = yield call(studio.classesCount.call)
    let classes = []
    for(let classIndex = 0; classIndex < classesCount.toNumber(); classIndex++) {
      const address = yield call(studio.classAtIndex.call, classIndex)
      const instance = Class.at(address)
      const name = yield call(instance.name.call)
      const description = yield call(instance.description.call)
      const classObject = {
        address,
        name,
        description,
        instance
      }
      classes.push(classObject)
    }
    yield put(classesLoaded(classes))
  } catch (error) {
    // yield put({ type: "CLASS_CREATE_FAILED", error })
    console.log(`error:${error}`)
  }
}

export function* watchClassesLoad() {
  yield takeEvery(CLASSES_LOAD, doClassesLoad)
}
