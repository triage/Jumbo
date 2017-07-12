import { put, call, select, apply, takeEvery } from 'redux-saga/effects'
import { from, Schedule, Studio } from 'src/util/eth/contracts'
import { schedulesLoad } from 'user/model/ScheduleActions'
import { SCHEDULE_CANCEL } from './ScheduleDetailActions'

export function* doCancelSchedule(action) {
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

export function* watchScheduleCancel() {
  yield takeEvery(SCHEDULE_CANCEL, doCancelSchedule)
}
