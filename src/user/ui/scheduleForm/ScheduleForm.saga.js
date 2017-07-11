import { SCHEDULE_SUBMIT, scheduleCreateError } from './ScheduleFormActions'
import { put, apply, select, call, takeEvery } from 'redux-saga/effects'
import { schedulesLoad } from 'user/model/ScheduleActions'
import { Studio, Schedule, from } from 'src/util/eth'

function* doScheduleSubmit(action) {
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
    const user = yield select(state => state.user.data)
    const studio = Studio.at(user.address)
    // const estimateScheduleAdded = web3.eth.estimateGas({ data: Schedule.scheduleAdded })
    yield apply(studio, studio.scheduleAdded, [schedule.address, from])
    yield put(schedulesLoad(user))
    yield call(action.history.push, '/dashboard')
  } catch (error) {
    console.log(`error:${error}`)
    yield put (scheduleCreateError(error))
  }
}

export function* watchScheduleSubmit() {
  yield takeEvery(SCHEDULE_SUBMIT, doScheduleSubmit)
}