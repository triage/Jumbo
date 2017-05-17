import { put, call, takeEvery, apply } from 'redux-saga/effects'
import ClassContract from 'contracts/Class.json'
import StudioContract from 'contracts/Studio.json'
import { browserHistory } from 'react-router'
import Web3 from 'web3'
import { CLASS_CREATE, classCreated } from 'src/user/model/ClassesActions'

const provider = new Web3.providers.HttpProvider('http://localhost:8545')
const web3 = new Web3(provider)
const contract = require('truffle-contract')

const Class = contract(ClassContract)
Class.setProvider(provider)

const Studio = contract(StudioContract)
Studio.setProvider(provider)

export function* createClassSaga(action) {

  const coinbase = web3.eth.coinbase;

  try {
    //create the class
    const classInstance = yield apply(Class, Class.new, [action.studio, action.name, action.description, { from: coinbase, gas: 4700000 }])
    const studioInstance = Studio.at(action.studio)

    //add the class to the studio
    yield apply(studioInstance, studioInstance.classAdded, [classInstance.address, { from: coinbase, gas: 4700000 }])

    //dispatch
    yield put(classCreated({ address: classInstance.address, name: action.name, description: action.description }))

    yield call(browserHistory.push, '/schedule/new')

  } catch (error) {
    console.log(error)
    yield put({ type: "CLASS_CREATE_FAILED", error })
  }
}

export function* watchCreateClass() {
  yield takeEvery(CLASS_CREATE, createClassSaga)
}
