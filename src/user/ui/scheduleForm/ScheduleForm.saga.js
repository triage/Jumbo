import { SCHEDULE_SUBMIT, scheduleCreateError } from './ScheduleFormActions'
import { put, apply, select, call, takeEvery } from 'redux-saga/effects'
import { schedulesLoad } from 'user/model/ScheduleActions'
import eth from 'src/util/eth'

function* doScheduleSubmit(action) {

  const Studio = eth.Studio()

  try {
    const values = action.values;
    const studio = yield Studio.deployed()
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
    yield put(schedulesLoad(user.address))
    yield call(action.history.push, '/dashboard')
  } catch (error) {
    console.log(`error:${error}`)
    yield put (scheduleCreateError(error))
  }
}

export function* watchScheduleSubmit() {
  yield takeEvery(SCHEDULE_SUBMIT, doScheduleSubmit)
}