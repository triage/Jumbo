import { put, call, takeEvery } from 'redux-saga/effects'
import StudioContract from 'contracts/Studio.json'
import Web3 from 'web3'
import { STUDIO_INFO_LOAD, studioInfoError, studioInfoLoaded } from './StudioActions'
import { scheduleLoadDetails } from './ScheduleActions'

const provider = new Web3.providers.HttpProvider('http://localhost:8545')
const contract = require('truffle-contract')

const Studio = contract(StudioContract)
Studio.setProvider(provider)

function* studioInfoSaga(action) {
  try {
    debugger
    const studioInstance = Studio.at(action.studio)
    const name = yield call(studioInstance.name.call)
    const contactDetails = yield call(studioInstance.contactDetails.call)
    const schedules = yield call(studioInstance.schedules.call)
    yield put(studioInfoLoaded(name, contactDetails))
    for (const schedule in schedules) {
      debugger
      yield put(scheduleLoadDetails(schedule))
    }
  } catch (error) {
    yield put(studioInfoError(error))
  }
}

export function* watchStudioLoad() {
  yield takeEvery(STUDIO_INFO_LOAD, studioInfoSaga)
}
