import { put, apply, takeEvery } from 'redux-saga/effects'
import { RESELLER_ADD, resellerAdded, RESELLER_REMOVE, resellerRemoved } from './ResellerActions'
import eth from 'util/eth'
import { reset } from 'redux-form'
import { formName } from './Resellers'

function* doResellerAdd(action) {
  const Studio = eth.Studio()
  const { address, name } = action

  try {
    const studio = yield Studio.deployed()
    yield apply(studio, studio.addReseller.sendTransaction, [address, eth.from()])
    yield put(resellerAdded(address, name))
    yield put(reset(formName))
  } catch (error) {
    console.log(`error:${error}`)
  }
}

function* doResellerRemove(action) {
  const Studio = eth.Studio()
  const { address } = action

  try {
    const studio = yield Studio.deployed()
    yield apply(studio, studio.removeReseller.sendTransaction, [address, eth.from()])
    yield put(resellerRemoved(address))
  } catch (error) {
    console.log(`error:${error}`)
  }
}

export function* watchResellers() {
  yield takeEvery(RESELLER_ADD, doResellerAdd)
  yield takeEvery(RESELLER_REMOVE, doResellerRemove)
}
