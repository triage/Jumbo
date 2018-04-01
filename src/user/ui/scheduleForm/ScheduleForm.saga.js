import { put, apply, select, call, take, takeEvery } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import { schedulesLoad, SCHEDULES_LOADED } from 'user/model/ScheduleActions'
import eth from 'src/util/eth'
import { SCHEDULE_SUBMIT, scheduleCreateError } from './ScheduleFormActions'

function* doScheduleSubmit(action) {

  const Studio = eth.Studio()

  try {
    const values = action.values;
    const studio = yield Studio.deployed()
    const count = yield studio.schedulesCount.call(eth.defaultAccount)
    const schedulesCountBefore = parseInt(count.valueOf(10), 10)
    yield apply(
      studio,
      studio.scheduleCreate,
      [
        values.class.address,
        values.instructor,
        new Date(values.date.start).valueOf(10),
        new Date(values.date.end).valueOf(10),
        values.spots.total,
        values.spots.reseller,
        eth.web3().toWei(values.price.individual),
        eth.web3().toWei(values.price.reseller),
        eth.from()
      ]
    )
    const user = yield select(state => state.user.data)
    let schedulesCount = schedulesCountBefore
    while (schedulesCount === schedulesCountBefore) {
      const count = yield studio.schedulesCount.call(eth.defaultAccount)
      schedulesCount = parseInt(count.valueOf(10), 10)
      if (schedulesCount !== schedulesCountBefore + 1) {
        console.log('retrying')
        yield delay(200)
      }
    }
    yield put(schedulesLoad(user.address))
    yield take(SCHEDULES_LOADED)
    yield call(action.history.push, '/dashboard')
  } catch (error) {
    console.log(`error:${error}`)
    yield put (scheduleCreateError(error))
  }
}

export function* watchScheduleSubmit() {
  yield takeEvery(SCHEDULE_SUBMIT, doScheduleSubmit)
}