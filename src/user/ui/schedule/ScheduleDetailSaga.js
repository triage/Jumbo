import { put, call, select, apply, takeEvery } from 'redux-saga/effects'
import Web3 from 'web3'
import ScheduleContract from 'contracts/Schedule.json'
import StudioContract from 'contracts/Studio.json'
import { schedulesLoad } from 'user/model/ScheduleActions'
import { SCHEDULE_CANCEL } from './ScheduleDetailActions'

const provider = new Web3.providers.HttpProvider('http://localhost:8545')
const web3 = new Web3(provider)
const contract = require('truffle-contract')

const coinbase = web3.eth.coinbase
const Studio = contract(StudioContract)
Studio.setProvider(provider)

const gas = 4700000
const from = { from: coinbase, gas }

const Schedule = contract(ScheduleContract)
Schedule.setProvider(provider)

export function* doCancelSchedule(action) {
  try {
    const studioAddress = yield select(state => state.user.data);
    
    const schedule = Schedule.at(action.schedule)
    const studio = Studio.at(studioAddress)
    yield apply(schedule, schedule.cancel, [action.reason, from])
    // const estimateScheduleAdded = web3.eth.estimateGas({ data: Schedule.scheduleAdded })
    yield apply(studio, studio.scheduleRemoved, [schedule.address, from])
    yield put(schedulesLoad(studioAddress))
    yield call(action.history.push, '/dashboard')
  } catch (error) {
    console.log(error)
    yield put({ type: "SCHEDULE_CANCEL_FAILED", error })
  }
}

export function* watchScheduleCancel() {
  yield takeEvery(SCHEDULE_CANCEL, doCancelSchedule)
}
