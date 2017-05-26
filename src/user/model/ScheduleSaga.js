import { put, call, takeEvery } from 'redux-saga/effects'
import ScheduleContract from 'contracts/Schedule.json'
import Web3 from 'web3'
import { SCHEDULE_LOAD_DETAILS } from './ScheduleActions'

const provider = new Web3.providers.HttpProvider('http://localhost:8545')
const contract = require('truffle-contract')

const Schedule = contract(ScheduleContract)
Schedule.setProvider(provider)

function* scheduleLoadDetailsSaga(action) {
  try {
    debugger
    const schedule = Schedule.at(action.address)
    const instructor = yield call(schedule.instructor.call)
    const dates = yield call(schedule.dates.call)
    const klass = yield call(schedule.class.call)

    debugger
  } catch (error) {
      debugger
    // yield put({ type: STUDIO_INFO_ERROR, error })
  }
}

export function* watchScheduleLoadDetails() {
  yield takeEvery(SCHEDULE_LOAD_DETAILS, scheduleLoadDetailsSaga)
}
