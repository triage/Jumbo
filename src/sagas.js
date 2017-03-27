import { put, takeEvery, call } from 'redux-saga/effects'

export default function* rootSaga() {
  yield [
    createClassSaga()
  ]
}