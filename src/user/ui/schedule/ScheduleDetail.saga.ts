import { put, call, apply, select, takeEvery } from 'redux-saga/effects'
import { eth } from 'util/eth'
import { schedulesLoad } from 'user/data/schedule/ScheduleActions'
import UserType from 'user/data/user/UserType'
import {
  SCHEDULE_CANCEL,
  SCHEDULE_COMPLETE,
  SPOT_PURCHASE,
  SPOT_CANCEL,
  spotPurchased,
  spotCancelled,
  scheduleCompleted,
  scheduleCancelled,
  ScheduleCancel,
  SpotCancel,
  SpotPurchase,
  ScheduleComplete,
} from './ScheduleDetailActions'

export function* doScheduleCancel(action: ScheduleCancel) {
  const Schedule = eth.Schedule()
  const Studio = eth.Studio()
  const from = eth.from()

  try {
    const schedule = Schedule.at(action.schedule)
    const studio = yield Studio.deployed()
    yield apply(schedule, schedule.cancel, [action.reason, from])
    yield apply(studio, studio.scheduleRemoved, [schedule.address, from])
    yield put(schedulesLoad(eth.defaultAccount))
    yield put(scheduleCancelled(action.schedule))
    yield call(action.history.push, '/dashboard')
  } catch (error) {
    /* tslint:disable-next-line */
    console.log(error)
    yield put({ type: 'SCHEDULE_CANCEL_FAILED', error })
  }
}

function* doScheduleComplete(action: ScheduleComplete) {
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
    /* tslint:disable-next-line */
    console.log(`error completing schedule:${error}`)
  }
}

function* doSpotCancel(action: SpotCancel) {
  try {
    const { schedule } = action
    const individual = yield eth.Individual().deployed()
    yield apply(individual, individual.spotCancel.sendTransaction, [schedule, eth.from()])
    yield put(spotCancelled(action.schedule, action.history))
  } catch (error) {
    /* tslint:disable-next-line */
    console.log(error)
  }
}

function* doSpotPurchase(action: SpotPurchase) {
  try {
    const userType = yield select((state: { user: { data: { type: string }}}) => state.user.data.type)
    const { schedule, price } = action 
    const from = Object.assign({}, eth.from(), {
      value: parseInt(price, 10),
    })
    if (userType === UserType.individual) {
      const Individual = eth.Individual()
      const individual = yield Individual.deployed()
      yield apply(individual, individual.spotPurchase.sendTransaction, [schedule, from])
    } else {
      const Reseller = eth.Reseller()
      const reseller = yield Reseller.deployed()
      const { individual } = action
      yield apply(reseller, reseller.spotPurchase.sendTransaction, [schedule, individual, from])
    }

    yield put(spotPurchased(action.schedule, action.history))
  } catch (error) {
    /* tslint:disable-next-line */
    console.log(error)
  }
}

export function* watchScheduleCancel() {
  yield takeEvery(SCHEDULE_CANCEL, doScheduleCancel)
  yield takeEvery(SPOT_PURCHASE, doSpotPurchase)
  yield takeEvery(SPOT_CANCEL, doSpotCancel)
  yield takeEvery(SCHEDULE_COMPLETE, doScheduleComplete)
}
