import { USER_UPDATE, userUpdated } from './ProfileActions'
import { put, apply, takeEvery } from 'redux-saga/effects'
import eth from 'src/util/eth'

function* doUserUpdate(action) {

  const Studio = eth.Studio()
  const { name, contactDetails } = action;

  try {
    const studio = yield Studio.deployed()
    yield apply(studio, studio.updateContactDetails.sendTransaction, [contactDetails, eth.from()])
    yield put(userUpdated(name, contactDetails))
  } catch (error) {
    console.log(`error:${error}`)
    debugger
  }
}


export function* watchUserUpdate() {
  yield takeEvery(USER_UPDATE, doUserUpdate)
}