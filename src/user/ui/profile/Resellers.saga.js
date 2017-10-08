import { put, apply, takeEvery } from 'redux-saga/effects'
import { RESELLER_ADD, resellerAdded, RESELLER_REMOVE, resellerRemoved } from './ResellerActions'
import eth from 'src/util/eth'

function* doResellerAdd(action) {

  const Studio = eth.Studio()
  const { address } = action;

  try {
    const studio = yield Studio.deployed()
    yield apply(studio, studio.addReseller.sendTransaction, [address, eth.from()])
    yield put(resellerAdded(address))
  } catch (error) {
    console.log(`error:${error}`)
    debugger
  }
}

function* doResellerRemove(action) {
  
    const Studio = eth.Studio()
    const { address } = action;
  
    try {
      const studio = yield Studio.deployed()
      yield apply(studio, studio.removeReseller.sendTransaction, [address, eth.from()])
      yield put(resellerRemoved(address))
    } catch (error) {
      console.log(`error:${error}`)
      debugger
    }
  }

export function* watchResellers() {
  yield takeEvery(RESELLER_ADD, doResellerAdd)
  yield takeEvery(RESELLER_REMOVE, doResellerRemove)
}