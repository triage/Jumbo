import { put, takeEvery, call } from 'redux-saga/effects'
import { watchCreateClass } from './user/ui/dashboard/class/CreateClassSaga'

export function* rootSaga() {
  yield [
    watchCreateClass()
  ]
}