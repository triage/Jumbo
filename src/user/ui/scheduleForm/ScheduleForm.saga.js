import { SCHEDULE_CLASS_CHANGED, SCHEDULE_SUBMIT, scheduleCreateError } from './ScheduleFormActions'
import { put, apply, select, call, takeEvery } from 'redux-saga/effects'
import { schedulesLoad } from 'user/model/ScheduleActions'
import Web3 from 'web3'
import ScheduleContract from 'contracts/Schedule.json'
import StudioContract from 'contracts/Studio.json'

const provider = new Web3.providers.HttpProvider('http://localhost:8545')
const web3 = new Web3(provider)
const coinbase = web3.eth.coinbase
const contract = require('truffle-contract')

const Schedule = contract(ScheduleContract)
Schedule.setProvider(provider)

const Studio = contract(StudioContract)
Studio.setProvider(provider)

const getUser = (state) => state.user
const gas = 4700000
const from = { from: coinbase, gas }

export function* scheduleClassChangedSaga(action) {
  try {
    if (!action.class) {
      yield call(action.history.push, '/class/new')
    }
  } catch (error) {
    console.log(error)
    yield put({ type: "CLASS_CREATE_FAILED", error })
  }
}

export function* scheduleSubmitSaga(action) {
  try {

    // const estimateScheduleNew = web3.eth.estimateGas({ data: Schedule.new })
    const values = action.values;
    const schedule = yield apply(
      Schedule,
      Schedule.new,
      [
        values.class.address,
        values.instructor,
        new Date(values.date.start).valueOf(),
        new Date(values.date.end).valueOf(),
        values.spots.total,
        values.spots.reseller,
        values.price.individual,
        values.price.reseller,
        from
      ]
    )
    const userObj = yield select(getUser)
    const studio = Studio.at(userObj.data)
    // const estimateScheduleAdded = web3.eth.estimateGas({ data: Schedule.scheduleAdded })
    yield apply(studio, studio.scheduleAdded, [schedule.address, from])
    yield put(schedulesLoad(userObj.data))
    yield call(action.history.push, '/dashboard')
  } catch (error) {
    console.log(`error:${error}`)
    yield put (scheduleCreateError(error))
  }
}


export function* watchScheduleClassChanged() {
  yield takeEvery(SCHEDULE_CLASS_CHANGED, scheduleClassChangedSaga)
}

export function* watchScheduleSubmit() {
  yield takeEvery(SCHEDULE_SUBMIT, scheduleSubmitSaga)
}