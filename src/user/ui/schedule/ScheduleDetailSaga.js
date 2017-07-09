import { put, call, select, takeEvery } from 'redux-saga/effects'
import ScheduleContract from 'contracts/Schedule.json'
import Web3 from 'web3'
import { SCHEDULE_CANCEL } from './ScheduleDetailActions'

const provider = new Web3.providers.HttpProvider('http://localhost:8545')
const web3 = new Web3(provider)
const contract = require('truffle-contract')

const coinbase = web3.eth.coinbase
const Studio = contract(StudioContract)
Studio.setProvider(provider)

const getSchedule = (state) => state.schedule
const getUser = (state) => state.user
const gas = 4700000
const from = { from: coinbase, gas }

const Schedule = contract(ScheduleContract)
Schedule.setProvider(provider)

export function* doCancelSchedule(action) {
  try {
    debugger
    const coinbase = web3.eth.coinbase
    const schedule = Schedule.at(action.address)

    const studioAddress = yield select(state => state.user.data);

    const studio = Studio.at(action.studioAddress)

    yield call(schedule.cancel, [action.reason, from])
    
    // const estimateScheduleAdded = web3.eth.estimateGas({ data: Schedule.scheduleAdded })
    yield call(studio, studio.scheduleRemoved, [schedule.address, from])
    yield put(schedulesLoad(studioAddress))

  } catch (error) {
    console.log(error)
    yield put({ type: "SCHEDULE_CANCEL_FAILED", error })
  }
}

export function* watchScheduleCancel() {
  yield takeEvery(SCHEDULE_CANCEL, doCancelSchedule)
}
