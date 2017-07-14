import { put, call, select, apply, takeEvery } from 'redux-saga/effects'
import eth from 'src/util/eth'
import { schedulesLoad, scheduleLoad } from 'user/model/ScheduleActions'
import { SCHEDULE_CANCEL, SPOT_PURCHASE, SPOT_CANCEL } from './ScheduleDetailActions'

export function* doCancelSchedule(action) {

  const Schedule = eth.Schedule()
  const Studio = eth.Studio()
  const from = eth.from()

  try {
    const studioAddress = yield select(state => state.user.data.address);
    
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

export function* doSpotCancel(action) {
  const Schedule = eth.Schedule()
  try {
    const schedule = Schedule.at(action.schedule.address)
    yield apply(schedule, schedule.spotCancel.sendTransaction, [action.individual, eth.from()])
    yield put(scheduleLoad(action.schedule.address))
  } catch(error) {
    console.log(error)
    debugger
  }
}

export function* doSpotPurchase(action) {
  const Schedule = eth.Schedule()
  try {
    const schedule = Schedule.at(action.schedule.address)
    const from = Object.assign({}, eth.from(), {
      value: parseInt(action.schedule.price.individual, 10),
    })
    yield apply(schedule, schedule.spotPurchase.sendTransaction, [action.individual, from])
    yield put(scheduleLoad(action.schedule.address))
  } catch(error) {
    console.log(error)
  }
}

export function* watchScheduleCancel() {
  yield takeEvery(SCHEDULE_CANCEL, doCancelSchedule)
  yield takeEvery(SPOT_PURCHASE, doSpotPurchase)
  yield takeEvery(SPOT_CANCEL, doSpotCancel)
}
