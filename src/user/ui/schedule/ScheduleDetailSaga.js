import { put, call, takeEvery } from 'redux-saga/effects'
import ScheduleContract from 'contracts/Schedule.json'
import Web3 from 'web3'
import { SCHEDULE_CANCEL } from './ScheduleDetailActions'

const provider = new Web3.providers.HttpProvider('http://localhost:8545')
const web3 = new Web3(provider)
const contract = require('truffle-contract')

const Schedule = contract(ScheduleContract)
Schedule.setProvider(provider)

export function* doCancelSchedule(action) {
  try {
    const coinbase = web3.eth.coinbase
    const schedule = Schedule.at(action.address)
    yield call(schedule.cancel, 'canceled by owner', { from: coinbase, gas: 470000 })
  } catch (error) {
    console.log(error)
    yield put({ type: "CLASS_CREATE_FAILED", error })
  }
}

export function* watchScheduleCancel() {
  yield takeEvery(SCHEDULE_CANCEL, doCancelSchedule)
}
