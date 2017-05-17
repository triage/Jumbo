//scheduleClassChanged
import { SCHEDULE_CLASS_CHANGED, SCHEDULE_SUBMIT } from './ScheduleFormActions'
import { put, apply, select, call, takeEvery } from 'redux-saga/effects'
import { browserHistory } from 'react-router'
import Web3 from 'web3'
import ScheduleContract from 'contracts/Schedule.json'

const provider = new Web3.providers.HttpProvider('http://localhost:8545')
const web3 = new Web3(provider)
const contract = require('truffle-contract')

const Schedule = contract(ScheduleContract)
Schedule.setProvider(provider)

export const getSchedule = (state) => state.schedule

export function* scheduleClassChangedSaga(action) {
  try {
    if (action.class === undefined) {
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
    //function Schedule(address _class, string _instructor, uint _dateStart, uint _dateEnd, uint _nSpots, uint _nSpotsReseller, uint priceIndividual, uint priceReseller) {
    const schedule = yield apply(
      Schedule,
      Schedule.new,
      [
        submission.class,
        submission.instructor,
        submission.date.start,
        submission.date.end,
        submission.spots.total,
        submission.spots.reseller,
        submission.price.individual,
        submission.price.reseller,
        { from: coinbase, gas: 4700000 }
      ]
    )
  } catch (error) {

  }
}


export function* watchScheduleClassChanged() {
  yield takeEvery(SCHEDULE_CLASS_CHANGED, scheduleClassChangedSaga)
}

export function* watchScheduleSubmit() {
  yield takeEvery(SCHEDULE_SUBMIT, scheduleSubmitSaga)
}