import { put, call, select, apply, takeEvery } from 'redux-saga/effects'
import eth from 'src/util/eth'
import { schedulesLoad, scheduleLoad } from 'user/model/ScheduleActions'
import {
  SCHEDULE_CANCEL,
  SCHEDULE_COMPLETE,
  SPOT_PURCHASE,
  SPOT_CANCEL,
  spotPurchased,
  spotCancelled,
  scheduleCompleted
} from './ScheduleDetailActions'

export function* doScheduleCancel(action) {

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
function* doScheduleComplete(action) {
  const Schedule = eth.Schedule()
  const Studio = eth.Studio()

  try {
    const schedule = Schedule.at(action.schedule)
    yield apply(schedule, schedule.complete.sendTransaction, [eth.from()])
    yield put(scheduleCompleted(action.schedule, action.history))
    const studioAddress = yield select(state => state.user.data.address);
    const studio = Studio.at(studioAddress)
    yield apply(studio, studio.scheduleRemoved, [studioAddress, eth.from()])
    yield put(schedulesLoad(studioAddress))
    action.history.push('/dashboard')
  } catch (error) {
    console.log(`error completing schedule:${error}`)
    debugger
  }
}

function* doSpotCancel(action) {
  const Schedule = eth.Schedule()
  try {
    const schedule = Schedule.at(action.schedule.address)
    yield apply(schedule, schedule.spotCancel.sendTransaction, [action.individual, eth.from()])
    yield put(spotCancelled(action.schedule.address, action.history))
    debugger
  } catch(error) {
    console.log(error)
    debugger
  }
}

function* doSpotPurchase(action) {
  const Schedule = eth.Schedule()
  try {
    debugger
    const schedule = Schedule.at(action.schedule.address)
    const from = Object.assign({}, eth.from(), {
      value: parseInt(action.schedule.price.individual, 10),
    })
    yield apply(schedule, schedule.spotPurchase.sendTransaction, [action.individual, from])
    yield put(spotPurchased(action.schedule, action.history))
    
  } catch(error) {
    console.log(error)
  }
}

export function* watchScheduleCancel() {
  yield takeEvery(SCHEDULE_CANCEL, doScheduleCancel)
  yield takeEvery(SPOT_PURCHASE, doSpotPurchase)
  yield takeEvery(SPOT_CANCEL, doSpotCancel)
  yield takeEvery(SCHEDULE_COMPLETE, doScheduleComplete)
}
