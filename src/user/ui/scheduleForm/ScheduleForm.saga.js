import { put, apply, select, call, take, takeEvery } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import { stopSubmit, startSubmit } from 'redux-form'
import { schedulesLoad, SCHEDULES_LOADED } from 'user/model/ScheduleActions'
import eth from 'util/eth'
import { SCHEDULE_SUBMIT } from './ScheduleFormActions'
import { formName } from './ScheduleForm'

function* doScheduleSubmit(action) {
  const Studio = eth.Studio()

  startSubmit(formName)
  try {
    const { values } = action
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
        eth.from(),
      ],
    )
    const user = yield select(state => state.user.data)
    let schedulesCount = schedulesCountBefore
    while (schedulesCount === schedulesCountBefore) {
      const countAfter = yield studio.schedulesCount.call(eth.defaultAccount)
      schedulesCount = parseInt(countAfter.valueOf(10), 10)
      if (schedulesCount !== schedulesCountBefore + 1) {
        yield delay(200)
      }
    }
    yield put(schedulesLoad(user.address))
    yield take(SCHEDULES_LOADED)
    yield call(action.history.push, '/dashboard')
  } catch (error) {
    yield put(stopSubmit(formName))
  }
}

/* eslint-disable import/prefer-default-export */
export function* watchScheduleSubmit() {
  yield takeEvery(SCHEDULE_SUBMIT, doScheduleSubmit)
}
