import { put, call, apply, takeEvery } from 'redux-saga/effects'
import eth from 'src/util/eth'
import { schedulesLoad } from 'user/model/ScheduleActions'
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
    const schedule = Schedule.at(action.schedule)
    const studio = yield Studio.deployed()
    yield apply(schedule, schedule.cancel, [action.reason, from])
    // const estimateScheduleAdded = web3.eth.estimateGas({ data: Schedule.scheduleAdded })
    yield apply(studio, studio.scheduleRemoved, [schedule.address, from])
    yield put(schedulesLoad())
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
    const studio = yield Studio.deployed()
    yield apply(studio, studio.scheduleRemoved, [action.schedule, eth.from()])
    yield put(schedulesLoad())
    action.history.push('/dashboard')
  } catch (error) {
    console.log(`error completing schedule:${error}`)
    debugger
  }
}

function* doSpotCancel(action) {
  try {
    const individual = yield eth.Individual().deployed()
    yield apply(individual, individual.spotCancel.sendTransaction, [action.schedule.address, eth.from()])
    yield put(spotCancelled(action.schedule, action.history))
  } catch(error) {
    console.log(error)
    debugger
  }
}

function* doSpotPurchase(action) {
  const Individual = eth.Individual()
  try {
    const from = Object.assign({}, eth.from(), {
      value: parseInt(action.schedule.price.individual, 10),
    })
    const individual = yield Individual.deployed()
    yield apply(individual, individual.spotPurchase.sendTransaction, [action.schedule.address, from])
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
