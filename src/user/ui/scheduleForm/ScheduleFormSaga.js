//scheduleClassChanged
import { SCHEDULE_CLASS_CHANGED } from './ScheduleFormActions'
import { put, call, takeEvery } from 'redux-saga/effects'
import { browserHistory } from 'react-router'

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

export function* watchScheduleClassChanged() {
  yield takeEvery(SCHEDULE_CLASS_CHANGED, scheduleClassChangedSaga)
}
