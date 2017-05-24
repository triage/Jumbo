//scheduleClassChanged
import { SCHEDULE_CLASS_CHANGED, SCHEDULE_SUBMIT, scheduleCreated, scheduleCreateError } from './ScheduleFormActions'
import { put, apply, select, call, takeEvery } from 'redux-saga/effects'
import { browserHistory } from 'react-router'
import Web3 from 'web3'
import ScheduleContract from 'contracts/Schedule.json'
import StudioContract from 'contracts/Studio.json'

const provider = new Web3.providers.HttpProvider('http://localhost:8545')
const web3 = new Web3(provider)
const contract = require('truffle-contract')

const Schedule = contract(ScheduleContract)
Schedule.setProvider(provider)

const Studio = contract(StudioContract)
Studio.setProvider(provider)

const getSchedule = (state) => state.schedule
const getStudio = (state) => state.studio
const getUser = (state) => state.user

export function* scheduleClassChangedSaga(action) {
  try {
    if (!action.class) {
      yield call(browserHistory.push, '/class/new')
    }
  } catch (error) {
    console.log(error)
    yield put({ type: "CLASS_CREATE_FAILED", error })
  }
}

export function* scheduleSubmitSaga(action) {

  const coinbase = web3.eth.coinbase

  try {
    const submission = yield select(getSchedule)
    const schedule = yield apply(
      Schedule,
      Schedule.new,
      [
        submission.class,
        submission.instructor,
        submission.date.start.toDate().valueOf(),
        submission.date.end.toDate().valueOf(),
        submission.spots.total,
        submission.spots.reseller,
        submission.price.individual,
        submission.price.reseller,
        { from: coinbase, gas: 4700000 }
      ]
    )

    const userObj = yield select(getUser)
    const studio = Studio.at(userObj.data)
    yield apply(studio.scheduleAdded, { from: coinbase, gas: 4700000 })
    yield put(scheduleCreated(schedule))
    yield call(browserHistory.push, '/dashboard')
  } catch (error) {
    yield put (scheduleCreateError(error))
  }
}


export function* watchScheduleClassChanged() {
  yield takeEvery(SCHEDULE_CLASS_CHANGED, scheduleClassChangedSaga)
}

export function* watchScheduleSubmit() {
  yield takeEvery(SCHEDULE_SUBMIT, scheduleSubmitSaga)
}