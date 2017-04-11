import { put, call, takeEvery } from 'redux-saga/effects'
import StudioContract from '../../../build/contracts/Studio.json'
import Web3 from 'web3'
import { STUDIO_INFO_LOAD, studioInfoLoaded } from './StudioActions'

const provider = new Web3.providers.HttpProvider('http://localhost:8545')
const contract = require('truffle-contract')

const Studio = contract(StudioContract)
Studio.setProvider(provider)

function* studioInfoSaga(action) {
  try {
    const studioInstance = Studio.at(action.address)
    const name = yield call(studioInstance.name.call)
    const contactDetails = yield call(studioInstance.contactDetails.call)
    yield put(studioInfoLoaded(name, contactDetails))
  } catch (error) {
    yield put({ type: "CLASS_CREATE_FAILED", error })
  }
}

export function* watchStudioLoad() {
  yield takeEvery(STUDIO_INFO_LOAD, studioInfoSaga)
}
